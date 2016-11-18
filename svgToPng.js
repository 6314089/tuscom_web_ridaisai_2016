const fs = require('fs');
const path = require('path');
const glob = require('glob');
const svg2png = require('svg2png');

const pattern = './src/img/*.svg';
const dist = path.join(__dirname, 'dist/');

glob(pattern, { nodir: true }, (err, maches) => {
  if (err) throw err;
  maches.forEach((file) => {
    const fileName = file.split('/').pop().replace(/.svg$/, '.png');
    const output = path.join(dist, fileName);

    fs.readFile(file, 'utf-8', (er, data) => {
      if (er) throw err;
      console.log(file);
      svg2png(data)
      .then(buffer => fs.writeFile(output, buffer))
      .catch(e => console.log(e));
    });
  });
});
