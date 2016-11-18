const fs = require('fs');
const path = require('path');
const pug = require('pug');
const html = require('html');
const data = require('./src/data');

const dist = path.join(__dirname, '/dist');

const top = pug.compileFile('./src/pug/top.pug');
const single = pug.compileFile('./src/pug/single.pug');

fs.writeFile(
  path.join(dist, 'top.html'),
  html.prettyPrint(top({})),
  (err) => {
    if (err) throw err;
    console.log('top.html 完了');
  });

data.forEach((obj) => {
  fs.writeFile(
    path.join(dist, obj.fileName),
    html.prettyPrint(single(obj)),
    (err) => {
      if (err) throw err;
      console.log(`${obj.fileName} 完了`);
    });
});
