const plugin = require("tailwindcss/plugin"); //Tailwindの自作classを生成するプラグイン
const {colors} = require('tailwindcss/defaultTheme');
const _ = require('lodash');
const variables = require('./src/data/variables.json');

function customizeObject($object, $func) {
  return Object.fromEntries(
    Object.entries($object).map(([key, value]) => $func(key, value))
  );
}

function rangeObject(start, end, step) {
  return _.range(start, end, step).reduce((obj, item) => {
    obj[item] = item;
    return obj;
  }, {});
}

// const colorList = Object.fromEntries(Object.entries(variables.colors).flatMap(([key, value]) => {
//   return Object.entries(value).map(([deepKey, deepValue]) => {
//     return [`--color-${key}-${deepKey}`, deepValue];
//   })
// }))

const test1 = [];
[2, 3, 4, 5, 6, 12].forEach((parent) => {
  _.range(1, parent + 1).forEach((child) => {
    if (parent !== child) {
      test1.push([`${child}/${parent}`, `${child / parent * 100}%`])
      test1.push([`-${child}/${parent}`, `${child / parent * 100 * -1}%`])
    }
  })
});

function makeWhiteList($key) {
  return [$key, ...Object.keys(variables.breakpoints).map(n => `${n}:${$key}`)];
}

const whiteList = [...makeWhiteList('block'), ...makeWhiteList('hidden')];

module.exports = {
  target: [
    'ie11',
    {
      objectFit: 'default',
      objectPosition: 'default',
      position: 'default',
    },
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  experimental: {
    // applyComplexClasses: true,
  },
  purge: {
    layers: ['utilities'],
    content: ['./dist/**/*.html', './src/typescript/**/*.ts', './src/typescript/**/*.tsx', './static/**/*.php'],
    options: {
      whitelist: whiteList,
    }
  },
  theme: {
    screens: customizeObject(variables.breakpoints, (key, value) => [key, `${value / 16}em`]),
    fontFamily: variables.fontFamily,
    zIndex: variables.zIndex,
    fontSize: customizeObject(rangeObject(10, 81, 1), (key, value) => [key, `${+value / 16}rem`,]),
    extend: {
      spacing: customizeObject(rangeObject(0, 211), (key, value) => [key / 2, `${value * 2 / 16}rem`]),
      maxWidth: {
        ...customizeObject(rangeObject(0, 1201, 4), (key, value) => [key, `${+value / 16}rem`]),
        ...customizeObject(variables.breakpoints, (key, value) => [`screen-${key}`, `${value}px`])
      },
      translate: Object.fromEntries(test1),
      inset: Object.fromEntries(test1),
      colors: {
        ...variables.colors,
        ...colors,
      },
      borderColor: {
        ...variables.colors,
        ...colors,
      },
      fill: {
        ...variables.colors,
        ...colors,
      },
      lineHeight: {
        ...customizeObject(rangeObject(100, 201, 5), (key, value) => [key / 100, value / 100])
      }
    },
  },
  plugins: [
    plugin(({addUtilities}) => {
      const newUtilities = {
        '.mx-full': {
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
        },
        '.ml-full': {
          marginLeft: 'calc(50% - 50vw)',
        },
        '.mr-full': {
          marginRight: 'calc(50% - 50vw)',
        },
        '.px-full': {
          paddingLeft: 'calc(50vw - 50%)',
          paddingRight: 'calc(50vw - 50%)',
        },
        '.pl-full': {
          paddingLeft: 'calc(50vw - 50%)',
        },
        '.pr-full': {
          paddingRight: 'calc(50vw - 50%)',
        },
        '.transform-none': {
          transform: 'none'
        },
        '.position': {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        },
        '.position-x': {
          left: '50%',
          transform: 'translateX(-50%)',
        },
        '.position-y': {
          top: '50%',
          transform: 'translateY(-50%)',
        },
      };
      addUtilities(newUtilities, ['responsive']);
    }),
    plugin(({addComponents}) => {
      const wrapperWidth = variables.breakpoints.lg / 16;
      const containerWidth = variables.breakpoints.md / 16;
      const wrapperPadding1 = 40 / 16;
      const wrapperPadding2 = 24 / 16;
      const newComponents = {
        '.wrapper': {
          maxWidth: `${wrapperWidth + wrapperPadding2 * 2}rem`,
          paddingLeft: `${wrapperPadding2}rem`,
          paddingRight: `${wrapperPadding2}rem`,
          width: `100%`,
          marginLeft: `auto`,
          marginRight: `auto`,
        },
        '.container': {
          maxWidth: `${containerWidth + wrapperPadding2 * 2}rem`,
          width: `100%`,
          paddingTop: `${50 / 16}rem`,
          paddingBottom: `${50 / 16}rem`,
          marginLeft: `auto`,
          marginRight: `auto`,
          '@screen sm': {
            paddingLeft: `${wrapperPadding2}rem`,
            paddingRight: `${wrapperPadding2}rem`,
            paddingTop: `${100 / 16}rem`,
            paddingBottom: `${100 / 16}rem`,
          }
        },
        // ':root': {
        //   ...customizeObject(variables.breakpoints, (key, value) => [`--breakpoint-${key}`, String(value)]),
        //   ...colorList
        // }
      }
      addComponents(newComponents)
    })
  ],
  important: true,
  corePlugins: {
    container: false,
  },
  variants: ['responsive', 'hover', 'focus'],
};
