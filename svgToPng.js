const path = require('path');
const fsp = require('fs-promise');
const glob = require('glob-promise');
const svg2png = require('svg2png');

const pattern = './src/img/*.svg';
const dist = path.join(__dirname, './dist/img/');

glob(pattern, { nodir: true })
.then(files => Promise.all(
  files
  .map(file => [file, file.split('/').pop().replace(/.svg$/, '.png')])
  .map(([file, fileName]) =>
    fsp.readFile(file)
    .then(svg2png)
    .then(buffer => fsp.writeFile(path.join(dist, fileName), buffer))
    .then(() => console.log(`svg to png  ${fileName}`))
    .catch(err => console.error(err)))))
.then(() => console.log('\ncomplete!'))
.catch(err => console.error(err));
