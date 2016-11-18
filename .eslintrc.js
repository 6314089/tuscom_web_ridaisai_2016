module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    es6: true,
    jquery: true
  },
  rules: {
    'linebreak-style': 'off',
    'no-console': 'off',
    'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
    }],
  },
};
