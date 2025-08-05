import Router from '../micro-router.js';
import success from '../views/success.js';

const app = new Router();

app.get('/success', (_, res) => {
  return res.render(success({ name: "Henrique" }));
})

export default app;
