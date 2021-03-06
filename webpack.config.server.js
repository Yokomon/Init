const path = require("path");
const CWD = process.cwd();
const nodeExternals = require("webpack-node-externals");

const config = {
  name: "server",
  target: "node",
  entry: [path.join(CWD, "/server/server.js")],
  output: {
    filename: "server.generated.js",
    path: path.join(CWD, "/dist"),
    publicPath: "/dist",
    libraryTarget: "commonjs",
  },
  externals: [nodeExternals()],
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
