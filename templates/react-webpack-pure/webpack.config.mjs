import HtmlWebpackPlugin from "html-webpack-plugin"

/** @type {import("webpack").Configuration & {devServer: import("webpack-dev-server").Configuration}} */
export default {
  mode: "development",
  entry: "./src/main.tsx",
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: "esbuild-loader",
        options: {
          tsconfig: "./tsconfig.json",
        },
      },
    ],
  },
  devServer: {
    port: 2077,
    open: true,
  },
}
