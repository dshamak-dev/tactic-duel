const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    "postcss-preset-env",
    require('tailwindcss/nesting')(require('postcss-nesting')),
    tailwindcss("./tailwind.config.js"),
    autoprefixer,
  ],
};
