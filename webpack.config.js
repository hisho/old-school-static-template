const webpack = require('webpack'); //webpack本体
const path = require('path'); // 安全にパスを解決する
const chalk = require('chalk'); //コンソールに色をつける
const Settings = require(path.resolve(__dirname, '.config/settings')); // 初期設定はsettings.jsにまとめる
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin'); // CSSを取り出す
const ESLintPlugin = require('eslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin'); // stylelintを使う
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries'); // 余分なJSを出さない
const TerserPlugin = require('terser-webpack-plugin'); //JSの圧縮
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'); //TSの型チェックを別スレッドで実行するのに必要
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //CSSの圧縮
const ScssCompileSettings = require(path.resolve(__dirname, '.config/webpack/scssCompileSettings')); // SCSSのコンパイルの設定を外部にまとめる
const TypeScriptSettings = require(path.resolve(__dirname, '.config/webpack/typeScriptSettings')); // TSのトランスパイルの設定を外部にまとめる
const Dotenv = require('dotenv-webpack');

module.exports = () => {
  const MODE = process.env.NODE_ENV;
  const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
  const IS_PRODUCTION = process.env.NODE_ENV === 'production';

  console.log(`${chalk.yellow('webpack mode -> ')}${chalk.green(MODE)}`);
  return {
    mode: MODE,
    devtool: IS_DEVELOPMENT ? 'inline-source-map' : false,
    entry: Settings.webpack.entries,
    output: {
      filename: '[name].js',
      path: path.join(__dirname),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.jsx', '.js', '.scss'],
      alias: {
        '~': path.resolve('./src/typescript'),
      },
    },
    module: {
      rules: [...TypeScriptSettings, ...ScssCompileSettings],
    },
    plugins: [
      new FixStyleOnlyEntriesPlugin(),
      new ExtractCssChunks({
        filename: '[name].css',
        chunkFilename: '[id].css',
        orderWarning: true,
      }),
      new ESLintPlugin({
        overrideConfigFile: path.resolve('.config/.eslintrc.js'),
        files: ['./src/typescript/**/*.ts', './src/typescript/**/*.tsx'],
        extensions: ['ts', 'tsx'],
        fix: true,
      }),
      new StyleLintPlugin({
        configFile: path.resolve('.config/.stylelintrc.js'),
        fix: true,
      }),
      //typeScriptの型チェックを別スレッドでする
      new ForkTsCheckerWebpackPlugin(),
      //webpackの進捗をコンソールに表示する
      new webpack.ProgressPlugin(),
      new Dotenv({
        path: `./.env/.env.${MODE}`,
      }),
    ],
    optimization: {
      splitChunks: {
        name: `${Settings.js.dest}modules`,
        chunks(chunk) {
          return chunk.name === `${Settings.js.dest}main`;
        },
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              const vendor = Settings.webpack.vendor;
              for (let i = vendor.length - 1; i >= 0; i--) {
                if (packageName.match(vendor[i])) return `${Settings.js.dest}${vendor[i]}`;
              }
              return `${Settings.js.dest}vendor`;
            },
          },
        },
      },
      minimize: IS_PRODUCTION,
      minimizer: [
        new TerserPlugin({
          cache: path.resolve(__dirname, `.cache/terser`),
          parallel: true,
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessor: require('cssnano', {autoprefixer: false}),
          cssProcessorPluginOptions: {
            preset: ['default', {discardComments: {removeAll: true}}],
          },
          canPrint: true,
        }),
      ],
    }
  }
};
