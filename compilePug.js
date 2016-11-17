const fs = require('fs');
const path = require('path');
const pug = require('pug');
const data = require('./src/data');

const dist = path.join(__dirname, '/dist');
const option = {
  pretty: true,
};

const top = pug.compileFile('./src/pug/top.pug', option);
const single = pug.compileFile('./src/pug/single.pug', option);

fs.writeFile(
  path.join(dist, 'top.html'),
  top({}),
  (err) => {
    if (err) throw err;
    console.log('top.html 完了');
  });

data.forEach((obj) => {
  fs.writeFile(
    path.join(dist, obj.fileName),
    single(obj),
    (err) => {
      if (err) throw err;
      console.log(`${obj.fileName} 完了`);
    });
});
