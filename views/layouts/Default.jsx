const React = require('react')

function Default(html) {
  return (
    <html>
    <head>
      <link rel="stylesheet" href="/main.css"></link>
      <title>Default</title>
    </head>
    <body>
  <div className="wrapper">
    <header>
      <h1><a href="/breads">BreadCRUD</a></h1>
    </header>
    <div className="container">
      {html.children}
    </div>
  </div>
</body>
    </html>
  )
}

module.exports = Default