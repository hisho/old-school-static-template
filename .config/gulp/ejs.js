const path = require(`path`); // 安全にパスを解決する
const Settings = require(path.resolve(__dirname, `../settings`)); // 初期設定はsettings.jsonにまとめる
const notifyError = require('./gulpError');
const fs = require('fs-extra'); // ファイルを操作するrequire(`fs`); // ファイルを操作する
const plumber = require(`gulp-plumber`); //gulpをエラーで止めないために必要
const gulp = require(`gulp`); //gulp本体
const gulpEjs = require(`gulp-ejs`); //gulpでejsを扱うために必要
const data = require('gulp-data');
const rename = require(`gulp-rename`); //gulpでファイル名を変更するために必要
const prettyHtml = require(`gulp-pretty-html`); //ejsでコンパイルしたhtmlを整形する
const htmlHint = require(`gulp-htmlhint`); //ejsでコンパイルしたhtmlの品質をチェックする
const _ = require('lodash');
const deepmerge = require('deepmerge');

const pageConfig = require('../../src/data/page-config.json');
const siteMeta = require('../../src/data/siteMeta.json');
const variables = require('../../src/data/variables.json');
const OGPSettings = require('../../src/data/site-ogp-settings.json');
const company = require('../../src/data/company.json');

const ejs = (done) => {
  gulp
    .src(`${Settings.ejs.src}/pages/**/!(_)*.ejs`,{
      ignore: process.env.NODE_ENV === 'production' && `${Settings.ejs.src}/pages/template/**/*.ejs`
    })
    .pipe(plumber({errorHandler: notifyError()}))
    .pipe(data((file) => {
      const replaceDirectories = /\.config\/gulp\//;
      const pageRootPath = path.resolve(__dirname, Settings.ejs.src + '/pages').replace(replaceDirectories, '');
      const ejsRootPath = path.resolve(__dirname, Settings.ejs.src).replace(replaceDirectories, '');
      const currentPath = file.path.replace(/\/[^\/]*.ejs$/, '');
      const includePath = `${path.relative(currentPath, ejsRootPath) || '.'}/`;
      const relativePath = `${path.relative(currentPath, pageRootPath) || '.'}/`;
      const absolutePath = `/${path.relative(pageRootPath, currentPath) ? `${path.relative(pageRootPath, currentPath)}/` : ''}`;
      return {
        includePath,
        path: relativePath
      };
    }))
    .pipe(gulpEjs({
        ENV: process.env.NODE_ENV,
        ogp: OGPSettings,
        site: siteMeta.site,
        variables: variables,
        pages: pageConfig.pages,
        sns: pageConfig.sns,
        company,
        _,
        deepmerge,
        initPage: ($page_id) => {
          return pageConfig.pages.find(page => page.page_id === $page_id);
        }
      }),
      {root: Settings.ejs.src})
    .pipe(rename({extname: '.html'}))
    .pipe(prettyHtml({
      indent_size: 2,
      indent_char: ' ',
      preserve_newlines: false,
      unformatted: ['code', 'pre', 'em', 'strong', 'script', 'i', 'b', 'br']
    }))
    .pipe(htmlHint({
      "tagname-lowercase": false,
      "attr-lowercase": false
    }))
    .pipe(htmlHint.reporter())
    .pipe(htmlHint.failOnError())
    .pipe(gulp.dest(Settings.ejs.dest));
  done();
};

module.exports = ejs;
