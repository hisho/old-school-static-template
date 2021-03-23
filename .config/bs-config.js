const path = require('path'); // 安全にパスを解決する
const Settings = require(path.resolve(__dirname, './settings')); // 初期設定はsettings.jsにまとめる


const BROWSER_SYNC = {
  files: [
    `${Settings.DIST_PATH}assets/**/*`,
    `${Settings.DIST_PATH}**/*.html`,
    `${Settings.DIST_PATH}**/*.php`
  ],
  ghostMode: {
    clicks: false,
    scroll: false,
    forms: false
  },
  // open: 'external',
  server: {
    baseDir: Settings.basedir,
    middleware: [],
    proxy: 'http://127.0.0.1:9999/',
  },
  logFileChanges: false
};

module.exports = BROWSER_SYNC;
