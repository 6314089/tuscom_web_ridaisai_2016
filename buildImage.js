const path = require('path');
const fs = require('fs-promise');
const glob = require('glob-promise');
const mkdirp = require('mkdirp-promise');
const imagemin = require('imagemin');
const svg2png = require('svg2png');


const src = path.join(__dirname, './src/img/');
const dist = path.join(__dirname, './dist/img/');
const pattern = ext => `${src}**/*.${ext}`;


const eachFiles = (pat, func) =>
  glob(pat)
  .then(files => files.map(file => ({
    file,
    temp: path.relative(src, file).replace(/.svg$/, '.png'),
  })))
  .then(files => files.map(({ file, temp }) => ({
    file,
    out: path.join(dist, temp),
  })))
  .then(files => files.map(func))
  .then(pendings => Promise.all(pendings));

const other = () => eachFiles(
  pattern('{png,jpg}'),
  ({ file, out }) => mkdirp(path.dirname(out))
    .then(() => fs.readFile(file))
    .then(imagemin.buffer)
    .then(buffer => fs.writeFile(out, buffer))
    .then(() => console.log(`complete ${out}`))
    .catch(err => console.error(err))
);

const svg = () => eachFiles(
  pattern('svg'),
  ({ file, out }) => mkdirp(path.dirname(out))
    .then(() => fs.readFile(file))
    .then(svg2png)
    .then(imagemin.buffer)
    .then(buffer => fs.writeFile(out, buffer))
    .then(() => console.log(`complete ${out}`))
    .catch(err => console.error(err))
);


Promise.resolve(console.log('build images start\n'))
.then(() => Promise.all([other(), svg()]))
.then(() => console.log('\nbuild images complete!'))
.catch(err => console.error(err));
