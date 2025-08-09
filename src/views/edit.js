export default ({ id }) => `
<link rel="stylesheet" href="/style.css" />

<h3>Edit item ${id}</h3>
<form method="POST" action="/" target="_top">
  <input type="hidden" name="_method" value="PUT" />
  <input type="hidden" name="id" value="${id}" />
  <input type="text" name="content" autofocus />
  <select>
    <option value="1">First post</option>
    <option value="2">Second post</option>
    <option value="3">Third post</option>
  </select>
  <button type="submit">Submit</button>
</form>
<p>This is an example of edit form</p>
<p>This is an example of edit form</p>
<p>It's suppose to be opened in a modal</p>
<p>This is an example of edit form</p>
<p>It's suppose to be opened in a modal</p>
<p>It's suppose to be opened in a modal</p>
`
