const fs = require('fs');
const path = require('path');
const pug = require('pug');
const html = require('html');

const htmlOpts = { unformatted: [] };
const dist = path.join(__dirname, '/dist');

const data = require('./src/data');

const top = pug.compileFile('./src/pug/top.pug');
const single = pug.compileFile('./src/pug/single.pug');

const compileTop = () => {
  const out = path.join(dist, 'top.html');
  const d = {
    htmlTitle: '理大祭2016 - TUSCOM',
    data,
  };

  fs.writeFile(
    out,
    html.prettyPrint(top(d), htmlOpts),
    (err) => {
      if (err) throw err;
      console.log('  compiled top.html');
    });
};

const compileSingles = () => {
  const length = data.length;
  data.forEach((obj, index, arr) => {
    const out = path.join(dist, obj.fileName);
    const d = Object.assign({
      htmlTitle: `${obj.title} : 理大祭2016 - TUSCOM`,
      prev: arr[((length + index) - 1) % length].fileName,
      next: arr[((length + index) + 1) % length].fileName,
    }, obj);

    fs.writeFile(
      out,
      html.prettyPrint(single(d), htmlOpts),
      (err) => {
        if (err) throw err;
        console.log(`  compiled ${obj.fileName}`);
      });
  });
};

compileTop();
compileSingles();
