import { apiEvents } from './api.js';

const MAX_ROWS = 100;

// Log entries - array of plain objects, newest last (reversed on render)
const log = [];

// Correlate start/end by id to capture requestBody alongside response data
const pending = new Map();

// Currently expanded row id for the detail view
let expandedId = null;

// --- DOM refs (panel HTML lives in index.html, owned by this file) ---
const panel     = document.getElementById('viz-panel');
const body      = document.getElementById('viz-body');
const totalEl   = document.getElementById('viz-total');
const errorsEl  = document.getElementById('viz-errors');
const toggleBtn = document.getElementById('viz-toggle');
const clearBtn  = document.getElementById('viz-clear');
const closeBtn  = document.getElementById('viz-close');

// --- Panel open/close ---
toggleBtn.addEventListener('click', () => panel.classList.toggle('viz-panel--closed'));
closeBtn.addEventListener('click',  () => panel.classList.add('viz-panel--closed'));

clearBtn.addEventListener('click', () => {
  log.length = 0;
  expandedId = null;
  render();
});

// Click delegation - clicking a row toggles its detail view
body.addEventListener('click', (e) => {
  const row = e.target.closest('.viz-row');
  if (!row) return;
  expandedId = expandedId === row.dataset.id ? null : row.dataset.id;
  render();
});

// --- Helpers ---

function pathFrom(url) {
  return url.replace('http://localhost:3000', '');
}

function timeLabel(ts) {
  return new Date(ts).toLocaleTimeString('en-US', {
    hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}

function statusClass(row) {
  if (row.error)         return 'viz-status--error';
  if (!row.status)       return 'viz-status--pending';
  if (row.status >= 500) return 'viz-status--5xx';
  if (row.status >= 400) return 'viz-status--4xx';
  return 'viz-status--2xx';
}

// Escape HTML so JSON bodies in <pre> blocks don't break the page
function esc(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function prettyJSON(val) {
  if (val === undefined || val === null) return '';
  return esc(JSON.stringify(val, null, 2));
}

// --- Row HTML ---

function detailHTML(row) {
  const reqBody  = row.requestBody  != null ? `<pre class="viz-pre">${prettyJSON(row.requestBody)}</pre>`  : '<span class="viz-detail-none">none</span>';
  const resBody  = row.responseBody != null ? `<pre class="viz-pre">${prettyJSON(row.responseBody)}</pre>` : '<span class="viz-detail-none">none</span>';
  const headers  = row.responseHeaders != null ? `<pre class="viz-pre">${prettyJSON(row.responseHeaders)}</pre>` : '<span class="viz-detail-none">none</span>';
  const duration = row.duration != null ? `${Math.round(row.duration)}ms` : '-';
  const errorLine = row.error ? `<div class="viz-detail-field"><span class="viz-detail-label">Error</span><span class="viz-detail-error">${esc(row.error)}</span></div>` : '';

  return `<div class="viz-detail">
    <div class="viz-detail-col">
      <div class="viz-detail-heading">Request</div>
      <div class="viz-detail-field"><span class="viz-detail-label">URL</span><span class="viz-detail-value">${esc(row.url)}</span></div>
      <div class="viz-detail-field"><span class="viz-detail-label">Method</span><span class="viz-detail-value">${row.method}</span></div>
      <div class="viz-detail-field"><span class="viz-detail-label">Body</span>${reqBody}</div>
    </div>
    <div class="viz-detail-col">
      <div class="viz-detail-heading">Response</div>
      <div class="viz-detail-field"><span class="viz-detail-label">Status</span><span class="viz-detail-value">${row.status ?? '-'}</span></div>
      <div class="viz-detail-field"><span class="viz-detail-label">Duration</span><span class="viz-detail-value">${duration}</span></div>
      ${errorLine}
      <div class="viz-detail-field"><span class="viz-detail-label">Body</span>${resBody}</div>
      <div class="viz-detail-field"><span class="viz-detail-label">Headers</span>${headers}</div>
    </div>
  </div>`;
}

function rowHTML(row) {
  const path      = pathFrom(row.url);
  const time      = timeLabel(row.ts);
  const status    = row.error ? 'ERR' : (row.status ?? '...');
  const duration  = row.duration != null ? `${Math.round(row.duration)}ms` : '';
  const errClass  = row.error ? ' viz-row--error' : '';
  const openClass = row.id === expandedId ? ' viz-row--open' : '';

  return `<div class="viz-row-wrap">
    <div class="viz-row${errClass}${openClass}" data-id="${row.id}">
      <span class="viz-time">${time}</span>
      <span class="viz-method viz-method--${row.method.toLowerCase()}">${row.method}</span>
      <span class="viz-path" title="${row.url}">${path}</span>
      <span class="viz-status ${statusClass(row)}">${status}</span>
      <span class="viz-duration">${duration}</span>
    </div>
    ${row.id === expandedId ? detailHTML(row) : ''}
  </div>`;
}

// --- Full render ---

function render() {
  const errorCount = log.filter(r => r.error || (r.status && r.status >= 400)).length;

  totalEl.textContent  = `${log.length} req`;
  errorsEl.textContent = `${errorCount} err`;
  errorsEl.hidden      = errorCount === 0;

  body.innerHTML = log.length === 0
    ? '<p class="viz-empty">No requests yet. Interact with the app.</p>'
    : [...log].reverse().map(rowHTML).join('');
}

// --- Event subscriptions ---

// Store request body on start so it's available when end arrives
apiEvents.addEventListener('request:start', (e) => {
  const { id, method, url, requestBody } = e.detail;
  pending.set(id, { id, method, url, requestBody });
});

apiEvents.addEventListener('request:end', (e) => {
  const { id, method, url, status, responseBody, duration, responseHeaders } = e.detail;
  const started = pending.get(id) ?? {};
  pending.delete(id);

  log.push({
    ...started, id,
    method: started.method ?? method,
    url:    started.url    ?? url,
    status, responseBody, duration, responseHeaders,
    ts: Date.now(),
  });
  if (log.length > MAX_ROWS) log.shift();
  render();
});

apiEvents.addEventListener('request:error', (e) => {
  const { id, method, url, error, duration, status, responseBody } = e.detail;
  const started = pending.get(id) ?? {};
  pending.delete(id);

  log.push({
    ...started, id,
    method: started.method ?? method,
    url:    started.url    ?? url,
    error, duration, status, responseBody,
    ts: Date.now(),
  });
  if (log.length > MAX_ROWS) log.shift();
  render();
});
