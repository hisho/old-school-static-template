const path = require(`path`); // 安全にパスを解決する
const fs = require('fs-extra');
const Settings = require(`../settings`) // 初期設定はsettings.jsonにまとめる
const gulp = require('gulp');
const gulpImagemin = require('gulp-imagemin');
const ImageMinMozjpeg = require('imagemin-mozjpeg');
const ImageMinPngquant = require('imagemin-pngquant');
const ImageMinSvgo = require('imagemin-svgo');
const gulpWebp = require('gulp-webp');
const rename = require('gulp-rename');
const through = require("through2"); // through2オブジェクトを使用する
const timeLog = require('./log');
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

const imageMin = (done) => {
  gulp.src(
    [
      `${Settings.img.src}**/*.png`,
      `${Settings.img.src}**/*.jpg`,
      `${Settings.img.src}**/*.svg`,
    ], {
      allowEmpty: true
    }
  )
    .pipe(
      through.obj((file, enc, callback) => {
        const srcFileName = file.path.replace(path.join(__dirname, `../../${Settings.img.src}`), '');
        const distFileName = `${Settings.img.dest}${srcFileName}`;
        const srcFileStat = file.stat;
        const distFileStat = getFileStat(distFileName);
        const formatSrcFileTime = dayjs(srcFileStat.mtime).format();
        const formatDistFileTime = distFileStat ? dayjs(distFileStat.mtime).format() : undefined;

        const from = file.path.replace(path.join(__dirname, '../../'), '');
        const to = `${Settings.img.dest}${srcFileName}`;
        if (distFileStat && dayjs(formatSrcFileTime).isBefore(formatDistFileTime)) {
          file = null;
        } else {
          timeLog(from,to);
          file.stat.mtime = new Date();
        }
        callback(null, file);
      })
    )
    .pipe(gulpImagemin([
      ImageMinMozjpeg({quality: 80}),
      ImageMinPngquant({quality: [0.6, 0.9]}),
      ImageMinSvgo({
        plugins: [{removeViewBox: false}],
      })
    ]))

    .pipe(gulp.dest(Settings.img.dest));
  done();
}

const webp = (done) => {
  gulp.src(
    [
      `${Settings.img.src}**/*.png`,
      `${Settings.img.src}**/*.jpg`,
    ], {
      allowEmpty: true
    }
  )
    .pipe(
      through.obj((file, enc, callback) => {
        const srcFileName = file.path.replace(path.join(__dirname, `../../${Settings.img.src}`), '');
        const distFileName = `${Settings.img.dest}${srcFileName}.webp`;
        const srcFileStat = file.stat;
        const distFileStat = getFileStat(distFileName);
        const formatSrcFileTime = dayjs(srcFileStat.mtime).format();
        const formatDistFileTime = distFileStat ? dayjs(distFileStat.mtime).format() : undefined;

        const from = file.path.replace(path.join(__dirname, '../../'), '');
        const to = `${Settings.img.dest}${srcFileName}.webp`;
        if (distFileStat && dayjs(formatSrcFileTime).isBefore(formatDistFileTime)) {
          file = null;
        } else {
          timeLog(from,to);
          file.stat.mtime = new Date();
        }
        callback(null, file);
      })
    )
    .pipe(rename((path) => {
      path.basename += path.extname;
    }))
    .pipe(gulpWebp({
        quality: 80
      })
    )
    .pipe(gulp.dest(Settings.img.dest));
  done();
}


const image = gulp.parallel(imageMin, webp);
module.exports = image;
