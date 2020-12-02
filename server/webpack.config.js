const path = require("path");
const webpack = require("webpack");

const webpackConfig = {
  entry: "./server.js",
  mode: "production",
  target: "node",
  plugins: [new webpack.IgnorePlugin(/^pg-native$/)],
  output: {
    path: path.resolve(__dirname, "."),
    filename: "server.bundle.js",
  },
};

module.exports = webpackConfig;
