module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: "node-loader"
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@marshallofsound/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules"
      }
    }
  },
  {
    test: /\.(ts|tsx)$/,
    exclude: /(node_modules)/,
    loaders: [
      {
        loader: "ts-loader",
        options: {
          transpileOnly: false
        }
      }
    ]
  },
  {
    test: /\.(scss|css)$/,
    use: ["style-loader", "css-loader"]
  },
  {
    test: /\.(jpg|png|svg|ico|icns)$/,
    loader: "file-loader",
    options: {
      name: "[path][name].[ext]"
    }
  }
];
