const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  //加载很慢的JS放在头部
  if (req.url === "/header") {
    fs.readFile("./js-header.html", "utf8", (err, data) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  }

  //加载很慢的JS放在尾部
  if (req.url === "/bottom") {
    fs.readFile("./js-bottom.html", "utf8", (err, data) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  }

  if (req.url === "/slow.js") {
    fs.readFile("./slow.js", "utf8", (err, data) => {
      setTimeout(() => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/javascript");
        res.end(data);
      }, 2000);
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`加载很慢的JS放在头部 http://${hostname}:${port}/header`);
  console.log(`加载很慢的JS放在尾部 http://${hostname}:${port}/bottom`);
});
