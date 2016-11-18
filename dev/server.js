const fs = require('fs-promise');
const path = require('path');
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  const reqPath = path.resolve(__dirname, '../dist/', req.url);
  console.log(reqPath);
  fs(reqPath)
  .then((data) => {
    res.writeHead(200);
    res.write(data);
    res.end();
  })
  .catch((err) => {
    console.log(err);
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Not Found');
    res.end();
  });
});

server.listen(3000);
