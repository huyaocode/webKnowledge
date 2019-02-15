const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.url)
  if(req.url === '/') {
     fs.readFile('./index.html', 'utf8', (err, data)=> {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    })
  }
  if(req.url === '/slow.js') {
    fs.readFile('./slow.js','utf8', (err,data)=>{
      setTimeout(() => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/javascript');
        res.end(data)
      }, 2000)
    })
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})