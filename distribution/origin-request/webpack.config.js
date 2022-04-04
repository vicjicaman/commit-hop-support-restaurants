const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = (env = {}, argv) => {
  const mode = argv.mode;

  const __DEV__ = mode === "development";
  const __PROD__ = mode === "production";
  const plugins = [];

  return {
    entry: "./src/index.js",
    target: "node",
    devtool: __DEV__ ? "source-map" : undefined,

    externals: [nodeExternals(), "aws-sdk"],

    output: {
      path: path.join(__dirname, "/dist"),
      filename: "index.js",
      libraryTarget: "umd",
      library: "lib"
    },
    module: {
      rules: []
    },
    plugins,
    resolve: {
      alias: {

      },
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      extensions: [".js", ".json"]
    },
    stats: {
      hash: true
    }
  };
};
