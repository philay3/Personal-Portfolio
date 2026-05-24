import { apiEvents } from './api.js';

const MAX_ROWS = 100;

// Log entries - array of plain objects, newest last (reversed on render)
const log = [];

// --- DOM refs (panel HTML lives in index.html, owned by this file) ---
const panel    = document.getElementById('viz-panel');
const body     = document.getElementById('viz-body');
const totalEl  = document.getElementById('viz-total');
const errorsEl = document.getElementById('viz-errors');
const toggleBtn = document.getElementById('viz-toggle');
const clearBtn  = document.getElementById('viz-clear');
const closeBtn  = document.getElementById('viz-close');

// --- Panel open/close ---
toggleBtn.addEventListener('click', () => panel.classList.toggle('viz-panel--closed'));
closeBtn.addEventListener('click',  () => panel.classList.add('viz-panel--closed'));

clearBtn.addEventListener('click', () => {
  log.length = 0;
  render();
});

// --- Rendering ---

function pathFrom(url) {
  return url.replace('http://localhost:3000', '');
}

function timeLabel(ts) {
  return new Date(ts).toLocaleTimeString('en-US', {
    hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}

function statusClass(row) {
  if (row.error)           return 'viz-status--error';
  if (!row.status)         return 'viz-status--pending';
  if (row.status >= 500)   return 'viz-status--5xx';
  if (row.status >= 400)   return 'viz-status--4xx';
  return 'viz-status--2xx';
}

function rowHTML(row) {
  const path     = pathFrom(row.url);
  const time     = timeLabel(row.ts);
  const status   = row.error ? 'ERR' : row.status ?? '...';
  const duration = row.duration != null ? `${Math.round(row.duration)}ms` : '';
  const errClass = row.error ? ' viz-row--error' : '';

  return `<div class="viz-row${errClass}" data-id="${row.id}">
    <span class="viz-time">${time}</span>
    <span class="viz-method viz-method--${row.method.toLowerCase()}">${row.method}</span>
    <span class="viz-path" title="${row.url}">${path}</span>
    <span class="viz-status ${statusClass(row)}">${status}</span>
    <span class="viz-duration">${duration}</span>
  </div>`;
}

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

apiEvents.addEventListener('request:end', (e) => {
  const { id, method, url, status, duration } = e.detail;
  log.push({ id, method, url, status, duration, ts: Date.now() });
  if (log.length > MAX_ROWS) log.shift();
  render();
});

apiEvents.addEventListener('request:error', (e) => {
  const { id, method, url, error, duration, status } = e.detail;
  log.push({ id, method, url, error, duration, status, ts: Date.now() });
  if (log.length > MAX_ROWS) log.shift();
  render();
});
