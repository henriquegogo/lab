export default class {
  constructor() {
    this.middlewares = [];
    this.routes = [];
  }

  use(fn) { this.middlewares.push(fn); }

  route({ middlewares, routes }) {
    this.middlewares = [...this.middlewares, ...middlewares];
    this.routes = [...this.routes, ...routes];
  }

  get(path, handler, method = "GET") {
    const keys = [];
    const regex = new RegExp('^' + path
      .replace(/:([^/]+)/g, (_, k) => (keys.push(k), '([^/]+)'))
      .replace(/\*/g, '.*') + '$');
    this.routes.push({ method, regex, keys, handler });
  }

  post(path, handler) { this.get(path, handler, "POST"); }
  put(path, handler) { this.get(path, handler, "PUT"); }
  patch(path, handler) { this.get(path, handler, "PATCH"); }
  delete(path, handler) { this.get(path, handler, "DELETE"); }

  async fetch(req) {
    const url = new URL(req.url);
    req.query = url.searchParams;
    req.path = url.pathname;
    req.params = {};

    const res = {
      send(body, headers = new Headers(), status = 200) {
        headers.set("Content-Type", "text/plain");
        return new Response(body, { status, headers });
      },
      render(body, headers = new Headers(), status = 200) {
        headers.set("Content-Type", "text/html");
        return new Response(body, { status, headers });
      },
      json(json, headers = new Headers(), status = 200) {
        headers.set("Content-Type", "application/json");
        return new Response(JSON.stringify(json), { status, headers });
      },
      redirect(location, headers = new Headers(), status = 302) {
        headers.set("Location", location);
        return new Response(null, { status, headers });
      }
    };

    for (const middleware of this.middlewares) {
      const ret = await middleware(req, res);
      if (ret instanceof Response) return ret;
    }

    for (const route of this.routes) {
      if (route.method !== req.method) continue;
      const method = req.path.match(route.regex);
      if (method) {
        route.keys.forEach((k, i) =>
          req.params[k] = decodeURIComponent(method[i + 1]));
        return await route.handler(req, res);
      }
    }

    return new Response("Not Found", { status: 404 });
  }
}

// This is useful for template literals
Array.prototype.toString = function() { return this.join(''); }
