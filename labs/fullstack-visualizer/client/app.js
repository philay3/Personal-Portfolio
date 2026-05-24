import { api } from './api.js';

async function init() {
  const workflows = await api.workflows.list();
  console.log('workflows from API:', workflows);
}

init();
