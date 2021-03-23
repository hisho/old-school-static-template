/**
 * SCSSのコンパイルの設定
 * ローダーは通る順番に書いていく
 * */

const path = require('path'); // 安全にパスを解決する
const Settings = require(path.resolve(__dirname, '../settings')); // 初期設定はsettings.jsにまとめる
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin'); // CSSを取り出す
const jsonImporter = require('node-sass-json-importer');


const SCSS_LOADER = {
  loader: 'sass-loader',
  options: {
    //Dart SASSを使う
    implementation: require('sass', {
      outputStyle: 'expanded',
    }),
    sassOptions: {
      fiber: require('fibers'),
      importer: jsonImporter(),
    },
  }
};

const POSTCSS_LOADER = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    postcssOptions: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')({grid: 'no-autoplace'}),
        require('postcss-object-fit-images'),
      ],
    }
  }
};

const CSS_LOADER = {
  loader: 'css-loader',
  options: {
    url: false,
    sourceMap: true,
  },
};

const scssCompileSettings = [
  {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      {loader: ExtractCssChunks.loader},
      CSS_LOADER,
      POSTCSS_LOADER,
      SCSS_LOADER,
    ],
  },
];

module.exports = scssCompileSettings;
