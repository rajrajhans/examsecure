module.exports = {
  plugins: ['jest'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'airbnb/hooks',
    'react-app',
    'plugin:jest/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
    serviceworker: true,
  },
  ignorePatterns: ['build', '.*.js', '*.config.js', 'node_modules'],
  rules: {
    'import/no-extraneous-dependencies': ['error'],
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
    'import/prefer-default-export': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
  },
};
