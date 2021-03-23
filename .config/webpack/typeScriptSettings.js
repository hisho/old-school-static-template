const path = require(`path`); // 安全にパスを解決する
const Settings = require(path.resolve(__dirname, `../settings`)); // 初期設定はsettings.jsonにまとめる

const TEST =  /\.(tsx?|jsx?)$/;

const TS_LOADER = {
  loader: 'ts-loader',
  options: {
    transpileOnly: true,
    experimentalWatchApi: true,
  }
};

const typeScriptSettings = [
  {
    test: TEST,
    exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
    use: [
      TS_LOADER,
    ],
  }
];

module.exports = typeScriptSettings;
