const BASE = 'http://localhost:3000';

// Single event bus - visualizer.js subscribes to this, app.js never touches it
export const apiEvents = new EventTarget();

// Single chokepoint for all HTTP traffic - instrumented here so visualizer sees everything
async function request(method, path, body) {
  const id = crypto.randomUUID();
  const url = `${BASE}${path}`;
  const startTime = performance.now();

  apiEvents.dispatchEvent(new CustomEvent('request:start', {
    detail: { id, method, url, requestBody: body, startTime }
  }));

  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body !== undefined) options.body = JSON.stringify(body);

  try {
    const res = await fetch(url, options);

    // Parse JSON regardless of status so error bodies are readable
    const data = await res.json();

    apiEvents.dispatchEvent(new CustomEvent('request:end', {
      detail: {
        id, method, url,
        status: res.status,
        ok: res.ok,
        responseBody: data,
        duration: performance.now() - startTime,
        responseHeaders: Object.fromEntries(res.headers.entries()),
      }
    }));

    if (!res.ok) {
      const err = new Error(data.error || `HTTP ${res.status}`);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;

  } catch (err) {
    // Only emit request:error if this is a network/fetch failure, not a re-throw from above
    if (!err.status) {
      apiEvents.dispatchEvent(new CustomEvent('request:error', {
        detail: {
          id, method, url,
          error: err.message,
          duration: performance.now() - startTime,
          status: undefined,
          responseBody: undefined,
        }
      }));
    }
    throw err;
  }
}

export const api = {
  workflows: {
    list:      ()           => request('GET',    '/workflows'),
    get:       (id)         => request('GET',    `/workflows/${id}`),
    create:    (name)       => request('POST',   '/workflows', { name }),
    update:    (id, name)   => request('PUT',    `/workflows/${id}`, { name }),
    remove:    (id)         => request('DELETE', `/workflows/${id}`),
    togglePin: (id)         => request('PATCH',  `/workflows/${id}/toggle-pin`),
  },

  steps: {
    listForWorkflow: (workflowId)          => request('GET',    `/workflows/${workflowId}/steps`),
    get:             (id)                  => request('GET',    `/steps/${id}`),
    create:          (workflowId, name)    => request('POST',   `/workflows/${workflowId}/steps`, { name }),
    update:          (id, fields)          => request('PUT',    `/steps/${id}`, fields),
    remove:          (id)                  => request('DELETE', `/steps/${id}`),
  },

  tasks: {
    listForStep: (stepId)        => request('GET',    `/steps/${stepId}/tasks`),
    get:         (id)            => request('GET',    `/tasks/${id}`),
    create:      (stepId, text)  => request('POST',   `/steps/${stepId}/tasks`, { text }),
    update:      (id, fields)    => request('PUT',    `/tasks/${id}`, fields),
    toggle:      (id)            => request('PATCH',  `/tasks/${id}/toggle`),
    remove:      (id)            => request('DELETE', `/tasks/${id}`),
  },
};
