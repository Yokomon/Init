const path = require("path");
const CWD = process.cwd();

const config = {
  mode: "development",
  entry: [path.join(CWD, "/server/main.js")],
  output: {
    filename: "bundle.js",
    path: path.join(CWD, "dist"),
    publicPath: "dist",
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
};

module.exports = config;
