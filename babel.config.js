// To ensure that when jest runs, the code is transformed properly by Babel

module.exports = {
  env: {
    test: {
      plugins: ['transform-es2015-modules-commonjs', '@babel/plugin-proposal-class-properties'],
      presets: ['@babel/preset-react'],
    },
  },
};
