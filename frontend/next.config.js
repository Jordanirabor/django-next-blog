
// next.config.js

require("dotenv").config();                // add this
const path = require("path");              // add this
const Dotenv = require("dotenv-webpack");  // add this
const withCss = require("@zeit/next-css");

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => { }
}

module.exports = withCss({    // add this object in withCSS() 
  webpack(config) {
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,
      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];
    return config;
  },
});