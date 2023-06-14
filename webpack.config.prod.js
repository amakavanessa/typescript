const path = require("path");

// This cleans up the dist folder after the project is successfully built
const CleanPlugin = require("clean-webpack-plugin");
// //webpack is a bundling tool, it helps reduce http request by bundling codes together,less imports required,  it optimizes the codes by minifying it.
//it is also able to transform ts to js codes and bundle it
module.exports = {
  mode: "production",
  entry: "./src/app.ts",
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        //a regular expression that checks for the file ext
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },

  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
