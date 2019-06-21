module.exports = {
  // Put your normal webpack config below here
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: require("./webpack.rules")
  }
};
