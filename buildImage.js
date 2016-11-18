const path = require('path');
const fs = require('fs-promise');
const glob = require('glob-promise');
const mkdirp = require('mkdirp-promise');
const imagemin = require('imagemin');
const svg2png = require('svg2png');

const src = path.join(__dirname, './src/img/');
const dist = path.join(__dirname, './dist/img/');
const pattern = ext => `${src}**/*.${ext}`;

const other = () =>
  imagemin([pattern('png'), pattern('jpg')], dist)
  .then(files => files.map(
    file => console.log(`complete ${file.path}`)
  ));

const svg = () =>
  glob(pattern('svg'))
  .then(files => files.map(
    file => [file, path.relative(src, file).replace(/.svg$/, '.png')]
  ))
  .then(files => files.map(
    ([file, temp]) => [file, path.join(dist, temp)]
  ))
  .then(files => files.map(
    ([file, out]) => mkdirp(path.dirname(out))
      .then(() => fs.readFile(file))
      .then(svg2png)
      .then(imagemin.buffer)
      .then(buffer => fs.writeFile(out, buffer))
      .then(() => console.log(`complete ${out}`))
      .catch(err => console.error(err))
  ))
  .then(pendings => Promise.all(pendings))


Promise.resolve(console.log('build images'))
.then(() => Promise.all([other(), svg()]))
.then(() => console.log('\ncomplete!'))
.catch(err => console.error(err));
