//初期設定
const Settings = require('./.config/settings');
//ファイルを削除する
const clean = require('./.config/gulp/clean');
//ディレクトリを作る
const mkdir = require('./.config/gulp/mkdir');
//ejsをコンパイルする
const ejs = require('./.config/gulp/ejs');
//ファイルをクローンする
const clone = require('./.config/gulp/clone');
//php serverを立てる
const php = require('./.config/gulp/php');
const image = require('./.config/gulp/image');
//gulp本体
const gulp = require('gulp');


exports.clean = clean;
exports.mkdir = mkdir;
exports.clone = clone;
exports.ejs = ejs;
exports.php = php;
exports.image = image;

exports.watch = () => {
  gulp.watch(`${Settings.ejs.src}**/*.ejs`, ejs);
  Settings.copyDirectory.forEach((item) => {
    gulp.watch(item.from, clone);
  })
  gulp.watch([
    `${Settings.img.src}**/*.png`,
    `${Settings.img.src}**/*.jpg`,
    `${Settings.img.src}**/*.svg`,
  ], image);
};
