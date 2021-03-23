const chalk = require('chalk'); //コンソールに色をつける

function timeLog($from,$to) {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const currentTime = `${hours}:${minutes}:${seconds}`;
  console.log(`[${chalk.gray(currentTime)}] from :${chalk.blue($from)}`);
  console.log(`[${chalk.gray(currentTime)}] to   :${chalk.green($to)}`)
}

module.exports = timeLog;
