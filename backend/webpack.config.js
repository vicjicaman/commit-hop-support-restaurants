const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/index.ts",
  target: "node",

  externals: [nodeExternals()],

  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, "src/utils"),
      data: path.resolve(__dirname, "src/data"),
      model: path.resolve(__dirname, "src/model"),
      entities: path.resolve(__dirname, "src/entities"),
    },
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
  },
};
