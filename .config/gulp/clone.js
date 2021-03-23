const path = require('path'); // 安全にパスを解決する
const fs = require('fs-extra'); //fsの上位互換
const timeLog = require('./log');
const gulp = require('gulp'); //gulp本体
const Settings = require(path.resolve(__dirname, '../settings')); // 初期設定はsettings.jsonにまとめる
const through = require("through2"); // through2オブジェクトを使用する
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

function getFileStat(path) {
  try {
    return fs.statSync(path);
  } catch (err) {
    if (err.code === "ENOENT") {
      return null;
    } else {
      emit("error", err);
      return 1;
    }
  }
}

const clone = (done) => {
  Settings.copyDirectory.forEach((item) => {
    gulp.src(item.from)
      .pipe(
        through.obj((file, enc, callback) => {
          const srcFileName = file.path.replace(path.join(__dirname, `../../`), '');
          const t = new RegExp(item.from.replace(/\/(!?\*).+$/,''));
          const name = srcFileName.replace(t,'').replace(/^\//,'');
          console.log(name)
          const distFileName = `${item.to}${name}`;
          const srcFileStat = file.stat;
          const distFileStat = getFileStat(distFileName);
          const formatSrcFileTime = dayjs(srcFileStat.mtime).format();
          const formatDistFileTime = distFileStat ? dayjs(distFileStat.mtime).format() : undefined;

          const from = file.path.replace(path.join(__dirname, '../../'), '');
          const to = `${item.to}${name}`;
          if (distFileStat && dayjs(formatSrcFileTime).isBefore(formatDistFileTime)) {
            file = null;
          } else {
            timeLog(from,to);
            file.stat.mtime = new Date();
          }
          callback(null, file);
        })
      )
      .pipe(gulp.dest(item.to))
  })
  done();
}
module.exports = clone;
