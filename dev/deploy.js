const path = require('path');
const prompt = require('prompt-promise');
const scp = require('scp2');
const ssh = require('ssh2-client');

const folder = path.resolve(__dirname, '../dist/top.html');
const host = 'tusedt000.ed.tus.ac.jp';
const username = 'tuscom';

const promptPassword = () => {
  console.log('[ tuscom_web_ridaisai_2016 ]\n');
  console.log('./dist/以下をtuscomのwww/ridaisai2016/にコピーします．');
  console.log('tuscomアカウントのパスワードを入力してください...');
  return prompt.password('password: ');
};

const pass = (() => {
  let password = '';
  return {
    set(newpass) { password = newpass; },
    get: () => ({ password }),
  };
})();

const exec = cmd => (() => {
  console.log(`command: ${cmd}`);
  ssh.exec(`${username}@${host}`, cmd, pass.get());
});

const send = () => (
  () => new Promise((resolve, reject) => {
    console.log('start sending files...');
    scp.scp(path.resolve(__dirname, '../dist/'), {
      host,
      username,
      password: pass.get(),
      path: 'www/ridaisai2016',
    }, (err) => {
      if (err) reject(err);
      console.log('finish!');
      resolve();
    });
  })
);

const deploy = () => Promise.resolve()
.then(promptPassword)
.then(pass.set)
.then(exec('rm www/ridaisai2016/ -rf'))
.then(exec('mkdir www/ridaisai2016 -p'))
.then(send())
.then(exec('chmod -R o+rx www'))
.catch(err => console.log(err));


deploy();
