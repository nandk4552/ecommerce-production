const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  // ...
  resolve: {
    fallback: {
      os: require.resolve("os-browserify/browser"),
      util: require.resolve("util/"),
      os: false,
    },
  },
  plugins: [
    new NodePolyfillPlugin(),
    // ...
  ],
};
