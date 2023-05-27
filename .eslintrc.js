// Utilise Airbnb's ESLint config with TypeScript Support
module.exports = {
  root: true,
  extends: ['airbnb-base', 'airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.js'],
};
