const DIST_PATH = `./dist/`;

// Webpackの設定
const WebpackSettings = {
  // JSとSCSSのエントリーポイントの設定
  entries: {
    // [DIST_PATH + "assets/js/main"]: "./src/typescript/main",
  },
  vendor: ['gsap'] //npm経由のlibraryを外部切り出しする場合は名前を指定する
};

// コピーするディレクトリの設定
const copyDirectory = [
  // {
  //   from: "static/favicon/*.+(png|svg)",
  //   to: DIST_PATH
  // },
];

const settings = {
  DIST_PATH: DIST_PATH,
  //初回に掘るディレクトリの設定
  mkdirPath: [
    ".env",
    "src/images",
    "static/fonts",
    "static/favicon",
    "static/pdf",
    "static/video",
  ],
  basedir: DIST_PATH,
  ejs: {
    "src": "src/",
    "dest": DIST_PATH
  },
  js: {
    "src": "src/typescript/",
    "dest": [DIST_PATH] + "assets/js/"
  },
  scss: {
    "src": "src/styles/",
    "dest": [DIST_PATH] + "assets/css/"
  },
  img: {
    "src": "src/images/",
    "dest": [DIST_PATH] + "assets/img/"
  },
  copyDirectory: [
    {
      from: "static/favicon/*.+(png|svg)",
      to: DIST_PATH
    },
    {
      from: "static/pdf/**/*.pdf",
      to: [DIST_PATH] + "assets/pdf"
    },
    {
      from: "static/video/*.mp4",
      to: [DIST_PATH] + "assets/video"
    },
    {
      from: "static/fonts/**/*.+(woff|ttf|truetype|svg)",
      to: [DIST_PATH] + "assets/fonts"
    },
    {
      from: "src/**/.json",
      to: [DIST_PATH] + "assets"
    },
    {
      from: "static/**/*.php",
      to: DIST_PATH
    },
    ...copyDirectory
  ],
  webpack: {
    entries: {
      [DIST_PATH + "assets/js/main"]: "./src/typescript/main",
      [DIST_PATH + "assets/js/ie"]: "./src/typescript/ie",
      [DIST_PATH + "assets/css/common"]: "./src/styles/common",
      [DIST_PATH + "assets/css/utilities"]: "./src/styles/utilities",
      ...WebpackSettings.entries
    },
    vendor: WebpackSettings.vendor
  }
};

module.exports = settings;
