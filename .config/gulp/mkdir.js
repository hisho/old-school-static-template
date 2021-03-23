const path = require(`path`); // 安全にパスを解決する
const chalk = require('chalk'); //コンソールに色をつける
const fs = require('fs-extra'); // ファイルを操作するrequire(`fs`); // ファイルを操作する
const Settings = require(path.resolve(__dirname, `../settings`)); // 初期設定はsettings.jsonにまとめる
const Pages = require('../../src/data/page-config.json');

function mkdirPagePath($path) {
  const mkdirPagePath = $path.replace(/\/$/, '');
  const mkdirPagePaths = Pages.pages.map((page) => {
    if(!/^https?:\/\//.test(page.permalink)) {
      return mkdirPagePath + `/${page.permalink}`
    }
  }).filter(Boolean);
  return [...new Set(mkdirPagePaths)]
}

/**
 *ディレクトリを掘る関数
 * @param done
 * @return void
 */
const mkdir = done => {
  const staticPaths = Settings.mkdirPath;
  const tests = [Settings.img.src,'src/data/'].flatMap((item) => {
    return mkdirPagePath(item);
  })
  const mkdirPaths = [...staticPaths, ...tests];
  mkdirPaths.forEach(mkdirPath => {
    fs.mkdirsSync(mkdirPath);
    console.log(chalk.blue(`🎉make directory: `) + chalk.green(`./${mkdirPath}`))
  });
  done();
};

module.exports = mkdir;
