const path = require("path");
const CWD = process.cwd();

const config = {
  mode: "production",
  entry: [path.join(CWD, "/client/main.js")],
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
      {
        test: /\.(jpeg|jpg|svg)/,
        use: ["file-loader"],
      },
    ],
  },
};

module.exports = config;
