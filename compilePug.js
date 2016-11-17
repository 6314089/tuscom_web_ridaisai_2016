const pug = require('pug');
const data = require('./src/data');

const option = {
  pretty: true,
};

const top = pug.compileFile('./src/pug/top.pug', option);
const single = pug.compileFile('./src/pug/single.pug', option);

console.log(top(data.top));
data.single.forEach(obj => console.log(single(obj)));
