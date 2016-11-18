const path = require('path');
const mkdirp = require('mkdirp-promise');
const fs = require('fs-promise');
const glob = require('glob-promise');
const svg2png = require('svg2png');

const pattern = './src/img/*.svg';
const dist = path.join(__dirname, './dist/img/');

mkdirp(dist)
.then(() => glob(pattern, { nodir: true }))
.then(files => Promise.all(
  files
  .map(file => [file, file.split('/').pop().replace(/.svg$/, '.png')])
  .map(([file, fileName]) =>
    fs.readFile(file)
    .then(svg2png)
    .then(buffer => fs.writeFile(path.join(dist, fileName), buffer))
    .then(() => console.log(`svg to png  ${fileName}`))
    .catch(err => console.error(err)))))
.then(() => console.log('\ncomplete!'))
.catch(err => console.error(err));
