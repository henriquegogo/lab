export default ({ name }) => `
<link rel="stylesheet" href="style.css" />

<h2>Success</h2>
<p>Your form has been successfully submitted ${name}</p>
<ul>
  ${[1, 2, 3].map(i => `
    <li>${i}</li>
  `)}
</ul>
`
