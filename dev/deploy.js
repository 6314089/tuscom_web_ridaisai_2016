const prompt = require('prompt-promise');
const scp = require('scp2');
const ssh = require('ssh2-client');

const test = password => ssh
.exec('tuscom@tusedt000.ed.tus.ac.jp', 'mkdir test', { password });


const promptMessage = () => {
  console.log('[ tuscom_web_ridaisai_2016 ]\n');
  console.log('./dist/ 以下をtuscomアカウントのwww/ridaisai2016にコピーします．');
  console.log('tuscomアカウントのパスワードを入力してください...');
  return Promise.resolve();
};

const promptPassword = () => prompt.password('password: ');

const promptScp = password => new Promise((resolve, reject) => {
  const file = './dist/';
  const scpOptions = {
    host: 'tusedt000.ed.tus.ac.jp',
    username: 'tuscom',
    path: 'www/ridaisai2016/',
    password,
  };
  scp.scp(
    file,
    scpOptions,
    (err) => {
      if (err) reject(err);
      resolve();
    });
});

Promise.resolve()
.then(promptMessage)
.then(promptPassword)
// .then(promptScp)
.then(test)
.catch(err => console.log('error:', err.stack));
