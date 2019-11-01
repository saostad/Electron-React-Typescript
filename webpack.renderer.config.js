const rules = require("./webpack.rules");

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

module.exports = {
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: { "react-dom": "@hot-loader/react-dom" },
  },
  module: {
    rules,
  },
};
