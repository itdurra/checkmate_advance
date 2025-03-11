/** @type {import("prettier").Config} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  singleQuote: true,
  jsxSingleQuote: true,
  semi: true,
  tabWidth: 2,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  printWidth: 80,
};

module.exports = config;
