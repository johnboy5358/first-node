const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  console.log(req.url)

  function writePipe (status, ct, url) {
    res.writeHead( status, Object.assign( {}, {['Content-Type']: ct} ) );
    fs.createReadStream(__dirname + url).pipe(res);
  }

  if (req.url === '/' || req.url === '/home') {
    writePipe(200, 'text/html', '/index.html')
  } else if (req.url === '/about') {
    writePipe(200, 'text/html', '/views/about.html')
  } else if (req.url === '/contact') {
    writePipe(200, 'text/html', '/views/contact.html')
  } else if (req.url === '/api/ninjas') {
    const ninjas = [
      {"name": "johnboy", "age": "63"},
      {"name": "shaun",   "age": "27"},
      {"name": "hamish",   "age": "270"}
    ]
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(ninjas))
  } else if (req.url.indexOf('.css') > -1) {
    res.writeHead(200, {'Content-Type': 'text/css'})
    console.log(req.url)
    fs.createReadStream(__dirname + req.url).pipe(res);
  } else {
    writePipe(404, 'text/html', '/views/404.html')
  }
});

server.listen(3000, '127.0.0.1')
console.log("listening on port:3000...")