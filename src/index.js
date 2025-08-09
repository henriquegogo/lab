import Router from './micro-router.js';
import index from './controllers/index.js';
import success from './controllers/success.js';

const app = new Router();
app.route(index);
app.route(success);

app.use((req, _) => {
  console.log(`${req.method} ${req.path}`);
  const clientHeader = req.headers.get('x-client') || 'none';
  console.log('Client Header:', clientHeader);
});

app.get('/hello/:name', (req, res) => {
  const query = req.query.get('q') || 'none';
  const headers = new Headers({ 'X-Custom': 'HelloRoute' });
  return res.render(`<h2>Hello ${req.params.name}!</h2><p>Query: ${query}</p>`, headers);
});

app.get('/redirect', (_, res) => {
  return res.redirect('/hello/John');
});

export default { fetch: (...args) => app.fetch(...args) };
