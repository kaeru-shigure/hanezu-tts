import { rspack } from "@rspack/core";
import path from "node:path";
const config = {
  devtool: "source-map",
  entry: "./src/main.tsx",
  output: {
    path: path.resolve("dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    publicPath: "auto",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: { syntax: "typescript", tsx: true },
            transform: {
              react: { runtime: "automatic", importSource: "preact" },
            },
            target: "es2022",
          },
        },
      },
      { test: /\.css$/, type: "css" },
    ],
  },
  experiments: { css: true },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
      title: "朱華TTS",
    }),
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: "public",
          to: ".",
          noErrorOnMissing: true,
          globOptions: { ignore: ["**/runtime/**"] },
        },
      ],
    }),
  ],
  devServer: {
    host: "0.0.0.0",
    allowedHosts: ["mac-00070.local"],
    port: 5173,
    static: [{ directory: path.resolve("public"), watch: false }],
  },
  performance: { hints: false },
  watchOptions: {
    poll: 1000,
    ignored: ["**/node_modules/**", "**/public/**", "**/dist/**"],
  },
};
export default (_env, argv) => ({
  ...config,
  // Serve public files from disk in development so regenerated manifests are current.
  plugins: config.plugins.filter(
    (plugin) =>
      argv.mode !== "development" ||
      !(plugin instanceof rspack.CopyRspackPlugin),
  ),
});
