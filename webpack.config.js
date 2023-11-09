const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const buildForlder = "docs";

module.exports = (env) => {
  const isDevMode = !env.production;

  return {
    entry: "./src/index.tsx",
    output: {
      chunkFilename: "[name].[contenthash].js",
      filename: "[name].[contenthash].js",
      assetModuleFilename: "[name].[contenthash][ext][query]",
      asyncChunks: true,
      path: path.resolve(__dirname, buildForlder),
      publicPath: isDevMode ? "/" : "./",
    },
    devServer: {
      static: {
        directory: path.join(__dirname, buildForlder),
      },
      port: 3003,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
        favicon: path.join(__dirname, "assets", "favicon.png"),
      }),
    ],
    module: {
      // exclude node_modules
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
      ],
    },
    resolve: {
      alias: {
        src: "/src",
      },
      modules: [path.resolve("./node_modules"), path.resolve("./src")],
      extensions: [".*", ".js", ".ts", ".tsx"],
    },
    stats: {
      children: true,
    },
    optimization: {
      usedExports: false,
      minimize: true,
      splitChunks: {
        chunks: "async",
      },
    },
  };
};
