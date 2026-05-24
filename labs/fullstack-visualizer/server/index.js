import express from 'express';
import workflowRoutes from './routes/workflows.js';
import stepRoutes from './routes/steps.js';
import taskRoutes from './routes/tasks.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/workflows', workflowRoutes);
app.use('/steps', stepRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
