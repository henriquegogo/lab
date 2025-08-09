export default ({ id }) => `
<link rel="stylesheet" href="/style.css" />

<h3>Do you really want to delete this post?</h3>
<form method="POST" action="/">
  <input type="hidden" name="_method" value="DELETE" />
  <input type="hidden" name="id" value="${id}" />
  <button type="submit" formtarget="_top">Yes</button>
  <a href="about:blank" target="modal">Cancel</a>
</form>
`
