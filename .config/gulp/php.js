const path = require('path'); // 安全にパスを解決する
const Settings = require(path.resolve(__dirname, '../settings')); // 初期設定はsettings.jsonにまとめる
const connect = require('gulp-connect-php');
const chalk = require('chalk'); //コンソールに色をつける

const php = (done) => {
  new connect().server({
    port: 9999,
    hostname: '127.0.0.1',
    base: Settings.DIST_PATH
  });
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const currentTime = `${hours}:${minutes}:${seconds}`;
  console.log(`[${chalk.gray(currentTime)}] ${chalk.blue(`🎉 make php server`)}`)
  done()
}

module.exports = php;
