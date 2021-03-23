const path = require(`path`); // 安全にパスを解決する
const Settings = require(path.resolve(__dirname, `../settings`)); // 初期設定はsettings.jsonにまとめる
const del = require("del"); // ファイル削除

/**
 * ビルド前の掃除
 */
const clean = (done) => {
  const DEVELOPMENT = process.env.NODE_ENV === 'development';
  const PRODUCTION = process.env.NODE_ENV === 'production';
  const START = process.env.MODE === 'start';
  const BUILD = process.env.MODE === 'build';

  const start = DEVELOPMENT && START;
  const startPro = PRODUCTION && START;
  const build = PRODUCTION && BUILD;
  const buildDev = DEVELOPMENT && BUILD;

  const delPatterns = ['.cache/'];
  //start OR start-pro
  if (start || startPro) {
    console.log('start & start-pro');
    const productionDelItems = [`${Settings.baseDir}cache/`];
    productionDelItems.forEach((item) => {
      delPatterns.push(item);
    });
  }

  //build OR build-dev
  if (build || buildDev) {
    console.log('build & build dev');
    const productionDelItems = [String(Settings.baseDir)];
    productionDelItems.forEach((item) => {
      delPatterns.push(item);
    });
  }

  del(delPatterns, done());
};

module.exports = clean;
