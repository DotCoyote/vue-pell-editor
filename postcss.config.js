module.exports = ({ file, options, env }) => ({
  parser: 'postcss-scss',
  plugins: {
    'postcss-custom-selectors': {},
    'postcss-custom-media': {},
    'postcss-pseudo-class-any-link': {},
    'postcss-custom-properties': {
      warnings: false
    },
    'postcss-calc': {},
    'postcss-aspect-ratio': {},
    'postcss-easings': {},
    'postcss-assets': {
      basePath: './',
      loadPaths: ['dist/assets/img/']
    },
    'autoprefixer': {
      cascade: false,
      grid: true
    },
    'postcss-svg': {},
    'postcss-short-size': {},
    'postcss-flexbugs-fixes': {},
    'cssnano': env !== 'production' ? false : {
      zindex: false,
      discardUnused: false,
      reduceIdents: false,
      mergeIdents: false
    },
    'rucksack-css': {
      autoprefixer: false,
      hexRGBA: false,
      easings: false,
      fontPath: false
    }
  }
})
