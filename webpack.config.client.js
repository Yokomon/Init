const path = require("path");
const CWD = process.cwd();
const webpack = require("webpack");

const config = {
  name: "browser",
  devtool: "eval-source-map",
  mode: "development",
  entry: [
    "webpack-hot-middleware/client?reload=true",
    path.join(CWD, "/client/main.js"),
  ],
  output: {
    filename: "bundle.js",
    path: path.join(CWD, "/dist"),
    publicPath: "/dist",
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
};

module.exports = config;
