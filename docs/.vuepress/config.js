const path = require("path");
const glob = require("globby");
const cwd = path.join(__dirname, "..");

const genComponentSidebar = (dir) => {
  const reg = new RegExp(`^${dir}\\/(\\S+)\\/index.md$`, "g");

  const componentList = glob.sync(`${dir}/**/index.md`, { cwd }).map((f) =>
    f.replace(reg, (ms, $1) => {
      return $1;
    })
  );
  return componentList.map((componentName) => ({
    title: componentName,
    path: `${componentName}/`,
  }));
};

const basePath = "/anchor-ui/";

const isDev = process.env.NODE_ENV === "development";

module.exports = async () => {
  // const sidebar = glob.sync('shared/**/index.md', { cwd }).map(f => f.replace(/^shared\/(\S+\/)
  return {
    base: basePath,
    head: [
      ["link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      [
        "script",
        {
          src: "/lib/vue/2.6.14-vue.min.js",
        },
      ],
      ["script", { src: "/lib/element-ui/2-15-3/index.min.js" }],
      [
        "link",
        {
          rel: "stylesheet",
          href:
            "https://cdn.jsdelivr.net/npm/element-ui@2.15.3/lib/theme-chalk/index.css",
        },
      ],
    ].concat(
      isDev ? [] : [["script", { src: `/lib/anchor-ui/anchor-ui.umd.min.js` }]]
    ),
    dest: path.join(__dirname, "../../dist"),
    title: "Anchor UI Toolkit",
    locales: {
      "/": {
        lang: "zh-CN",
      },
    },
    themeConfig: {
      // displayAllHeaders: true,
      nav: [
        { text: "首页", link: "/" },
        { text: "组件", link: "/components/" },
        { text: "Github", link: "https://github.com/jackluson/anchor-ui" },
      ],
      sidebarDepth: 2,
      sidebar: {
        "/components/": [
          { title: "快速入手", path: "/components/" },
          ...genComponentSidebar("components"),
        ],
      },
      // sidebar
    },
    plugins: [
      "@vuepress/back-to-top",
      "@vuepress/nprogress",
      //[
      //  "typescript",
      //  {
      //    tsLoaderOptions: {
      //      // ts-loader 的所有配置项
      //    },
      //  },
      //],
      [
        require("../../@vuepress/demo-show/src"),
        {
          component: "DemoBlock",
          locales: [
            {
              lang: "zh-CN",
              "demo-block": {
                "hide-text": "隐藏",
                "show-text": "显示",
                "copy-text": "复制",
                "copy-success": "成功",
              },
            },
            {
              lang: "en-US",
              "demo-block": {
                "hide-text": "Hide",
                "show-text": "Expand",
                "copy-text": "Copy",
                "copy-success": "Successful",
              },
            },
          ],
        },
      ],
    ],

    chainWebpack: (config, isServer) => {
      console.log(
        `🚀 ~ file: config.js ~ line 109 ~ module.exports= ~ isServer`,
        isServer
      );
      //config.resolve.alias.set("core-js/library/fn", "core-js/features");
      // config 是 ChainableConfig 的一个实例
      config.externals({
        vue: "Vue",
        "element-ui": "ELEMENT",
        "anchor-ui": "AnchorUI",
      });
    },
  };
};
