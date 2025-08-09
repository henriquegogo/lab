export default ({ items = [] }) => `
<!DOCTYPE html>
<html lang>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>bareweb</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <header>
      <h1><a href="/">bareweb</a></h1>
      <nav>
        <a href="#">Home</a>
        <a href="about.html">About</a>
      </nav>
    </header>
    <main>
      <form method="GET" action="success.html" target="modal">
        <input type="text" name="content" placeholder="Type your thoughts..." />
        <button type="submit" style="margin-left: -1px">Send</button>
      </form>
      ${items.map(({ id, title }) => `
        <article>
          ${title}
          <footer>
            <a href="/${id}/edit" target="modal">Edit</a>
            <a href="/${id}/delete" target="modal">Delete</a>
          </footer>
        </article>
      `)}
    </main>
    <dialog onclick="this.close()">
      <iframe name="modal" onload="this.contentDocument.body.innerHTML.trim() ? (
        this.contentWindow.addEventListener('keydown',
          ({ key }) => key ==='Escape' && this.parentElement.close()),
        this.style.height = 0, this.parentElement.showModal(), 
        this.style.height = this.contentDocument.body.scrollHeight + 'px'
      ) : this.parentElement.close()"></iframe>
    </dialog>
  </body>
</html>
`
