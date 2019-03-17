// ==UserScript==
// @name         hpc_jobs
// @version      0.0.1
// @match        http://219.217.238.193/jobs/
// @description  self mode
// @run-at       document-start
// @namespace    https://greasyfork.org/users/164996
// ==/UserScript==
window.stop()
document.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>jobs</title>
    <style>
      body {
        user-select: none;
        margin: 0;
      }
      #table {
        display: grid;
        grid-template-columns: repeat(9, auto);
        grid-column-gap: 1em;
      }
      #node{
        margin: 0;
      }
      .other {
        color: #bbb;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <pre id="node"></pre>
      <div id="table"></div>
    </div>

  </body>
</html>`)
const usr = 'bilabila'
const app = document.querySelector('#app')
const node = document.querySelector('#node')
const table = document.querySelector('#table')
const parse = s => {
  const t = document.implementation.createHTMLDocument()
  t.body.innerHTML = s
  return t
}
const main = async () => {
  let a = await fetch('http://219.217.238.193/jobs/')
  a = await a.text()
  a = parse(a)
  let b = [...a.querySelectorAll('tr')].map(i => [...i.children].map(j => j.textContent.trim()))
  let c = b.reduceRight(
    (a, c) =>
      c[1] === usr
        ? c.map(i => '<div>' + i + '</div>').join('') + a
        : a + c.map(i => '<div class=other>' + i + '</div>').join(''),
    ''
  )
  let d = a.querySelector('table').nextSibling.textContent.trim()
  d = d.slice(d.indexOf('\n') + 1, d.lastIndexOf('\n'))
  requestAnimationFrame(() => {
    node.innerHTML = d
    table.innerHTML = c
  })
}
main()
setInterval(main, 5000)
