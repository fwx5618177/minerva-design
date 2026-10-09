import path from "node:path";
export default {
  projectName: "minerva-taro-native",
  date: "2026-10-09",
  designWidth: 750,
  deviceRatio: { 750: 1 },
  sourceRoot: "src",
  outputRoot: "dist",
  framework: "react",
  compiler: "webpack5",
  plugins: ["@tarojs/plugin-platform-weapp"],
  cache: { enable: false },
  mini: {
    webpackChain(chain) {
      chain.resolve.alias.set(
        "@minerva/core",
        path.resolve(__dirname, "../src/core/index.ts"),
      );
      chain.resolve.alias.set(
        "@minerva/dom",
        path.resolve(__dirname, "../src/dom/index.ts"),
      );
      chain.resolve.alias.set(
        "@minerva/taro",
        path.resolve(__dirname, "../src/minerva/index.ts"),
      );
      chain.resolve.alias.set(
        "react",
        path.resolve(__dirname, "../node_modules/react"),
      );
      chain.resolve.alias.set(
        "@tarojs/taro",
        path.resolve(__dirname, "../node_modules/@tarojs/taro"),
      );
    },
  },
  defineConstants: {},
  copy: { patterns: [], options: {} },
};
