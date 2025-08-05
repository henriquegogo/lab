import Router from './micro-router.js';
import success from './controllers/success.js';

const app = new Router();
app.route(success);

app.use((req, _) => {
  console.log(`${req.method} ${req.path}`);
  const clientHeader = req.headers.get('x-client') || 'none';
  console.log('Client Header:', clientHeader);
});

app.get('/', (_, res) => {
  const headers = new Headers({ 'X-Powered-By': 'MicroFramework' });
  return res.render(`
    <h1>Welcome!</h1>
    <p>Try visiting <a href="/hello/John?q=test">/hello/John?q=test</a></p>
    <form method="POST" action="/">
      <input name="name" placeholder="Your name" />
      <button>Send</button>
    </form>
  `, headers);
});

app.post('/', async (req, res) => {
  const data = await req.formData();
  const name = data.get('name');
  const headers = new Headers({ 'X-Form-Processed': 'true' });
  return res.render(`<h2>Thanks, ${name}!</h2><a href="/">Go back</a>`, headers);
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
