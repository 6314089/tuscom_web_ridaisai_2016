const fs = require('fs');
const path = require('path');
const http = require('http');
const server = http.createServer();

const pfs = path =>
  new Promise((resolve, reject) =>
    fs.readFile(path, (err, data) => (err) ? reject(err) : resolve(data)));

server.on('request', (req, res) => {
  const reqPath = path.join('./dist/', req.url);
  console.log(reqPath);
  pfs(reqPath)
  .then(data => {
    res.writeHead(200);
    res.write(data);
    res.end();
  })
  .catch(err => {
    console.log(err);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write("Not Found");
    res.end();
  });
});

server.listen(3000);
