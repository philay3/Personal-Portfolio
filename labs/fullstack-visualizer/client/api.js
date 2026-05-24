const BASE = 'http://localhost:3000';

// Single chokepoint for all HTTP traffic - Phase 5 instruments this function
async function request(method, path, body) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body !== undefined) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE}${path}`, options);

  // Parse JSON regardless of status so error bodies are readable
  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data.error || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  workflows: {
    list:   ()           => request('GET',    '/workflows'),
    get:    (id)         => request('GET',    `/workflows/${id}`),
    create: (name)       => request('POST',   '/workflows', { name }),
    update: (id, name)   => request('PUT',    `/workflows/${id}`, { name }),
    remove: (id)         => request('DELETE', `/workflows/${id}`),
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
