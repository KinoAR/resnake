import resolve from 'rollup-plugin-node-resolve';

export default {
  name: "resnake",
  input: 'lib/es6/src/index.js',
  output: {
    file: 'bundle.js',
    format: 'iife'
  },
  plugins: [resolve()]
};