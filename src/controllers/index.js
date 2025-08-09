import Router from '../micro-router.js';
import indexTemplate from '../views/index.js';
import editTemplate from '../views/edit.js';
import deleteTemplate from '../views/delete.js';

const app = new Router();

app.get('/', (_, res) => {
  const items = [
    { id: 1, title: "First item" },
    { id: 2, title: "Second one" },
    { id: 3, title: "Third and last" }
  ]
  return res.render(indexTemplate({ items }));
});

app.post('/', async (req, res) => {
  const name = req.form.get('name');
  const headers = new Headers({ 'X-Form-Processed': 'true' });
  return res.render(`<h2>Thanks, ${name}!</h2><a href="/">Go back</a>`, headers);
});

app.put('/', async (req, res) => {
  const id = req.form.get('id');
  const content = req.form.get('content');
  return res.send(`Updated item ${id} - ${content}`);
});

app.delete('/', (req, res) => {
  return res.send(`Deleted item ${req.form.get('id')}`);
});

app.get('/:id/edit', (req, res) => {
  return res.render(editTemplate({ id: req.params.id }));
});

app.get('/:id/delete', (req, res) => {
  return res.render(deleteTemplate({ id: req.params.id }));
});

export default app;
