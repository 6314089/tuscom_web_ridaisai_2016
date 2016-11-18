const mkdirp = require('mkdirp-promise');
const fs = require('fs-promise');
const path = require('path');
const stylus = require('stylus');

const src = path.resolve(__dirname, '../src/stylus/style.styl');
const dist = path.resolve(__dirname, '../dist');

mkdirp(dist)
.then(() => fs.readFile(src))
.then(data => new Promise((resolve, reject) => {
  stylus(data.toString())
  .set('filename', src)
  .set('include css', true)
  .set('inline', true)
  .set('compress', true)
  .render((err, css) => {
    if (err) reject(err);
    resolve(css);
  });
}))
.then(css => fs.writeFile(path.join(dist, './style.css'), css))
.catch(err => console.error(err));
