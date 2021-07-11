const webpack = require("webpack");
const { name } = require("./package.json");
const argv = require("yargs").argv;
const TerserPlugin = require("terser-webpack-plugin");
const isTargetLib = argv.target === "lib";

const IS_DEV_ENV = process.env.NODE_ENV === "development";
console.log("IS_DEV_ENV", IS_DEV_ENV);

/* BannerPlugin 插件配置函数  */
const bannerConfigFun = (compilation) => {
  const { chunk, hash } = compilation;
  const buildTimestamp = chunk.entryModule && chunk.entryModule.buildTimestamp;
  const buildTimeString = (
    (buildTimestamp && new Date(buildTimestamp)) ||
    new Date()
  ).toLocaleString();

  const nodeVersion = process.version;
  const version = process.VUE_CLI_SERVICE.pkg.version;
  const moduleName = process.VUE_CLI_SERVICE.pkg.name;
  const webpackVersion = process.env.npm_package_devDependencies_webpack; // 在vue-cli中 webpack信息不在package.json中
  const consoleList = [
    {
      label: "Module Name",
      labelBgColor: "#606060",
      value: moduleName,
      valueBgColor: "#42c02e",
    },
    {
      label: "Environment",
      labelBgColor: "#606060",
      value: process.env.NODE_ENV,
      valueBgColor: "#42c02e",
    },
    {
      label: "Version",
      value: version,
    },
    {
      label: "Hash",
      value: hash,
    },
    {
      label: "Webpack Version",
      value: webpackVersion,
    },
    {
      label: "Node Version",
      value: nodeVersion,
    },
    {
      label: "Built at",
      value: buildTimeString,
    },
  ];
  let badgeStr = `${IS_DEV_ENV ? "console.clear();" : ""}`;
  consoleList.forEach((item) => {
    if (!item.value) return;
    badgeStr += `
      console.info(
      '%c ${item.label}: %c ${item.value} %c',
      'background:${item.labelBgColor ||
        "#35495e"} ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:${item.valueBgColor ||
        "#41b883"} ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
      'background:transparent'
      );
    `;
  });
  return badgeStr;
};

module.exports = {
  publicPath: IS_DEV_ENV ? `/${name}/` : "/",
  assetsDir: IS_DEV_ENV ? "" : name,
  productionSourceMap: false,
  filenameHashing: false,
  css: {
    extract: false,
  },
  configureWebpack: () => {
    return {
      plugins: [
        new webpack.BannerPlugin({
          banner: bannerConfigFun,
          raw: true,
          entryOnly: true,
        }),
      ],
    };
  },
  chainWebpack: (config) => {
    config.output
      .library(isTargetLib ? "PeaUI" : name)
      .libraryTarget("umd")
      .libraryExport("default");
    config.externals({
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      "element-ui": "ELEMENT",
    });

    config.plugins
      .delete("html")
      .delete("preload")
      .delete("prefetch");

    config.optimization.minimizer("terser").use(TerserPlugin, [
      {
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            pure_funcs: ["console.log"],
          },
        },
        extractComments: false,
      },
    ]);
  },
};
