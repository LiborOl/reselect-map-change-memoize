import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  format: 'umd',
  plugins: [ babel() ],
  dest: 'dist/reselect-map-change-memoize.js',
  moduleId: 'reselect-map-change-memoize',
  moduleName: 'ReselectMapChangeMemoize',
  globals: {
    reselect: 'Reselect',
    'reselect-change-memoize': 'ReselectChangeMemoize'
  }
}
