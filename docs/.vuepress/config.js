const path = require("path");
const glob = require("globby");
const cwd = path.join(__dirname, "..");

const genComponentSidebar = (dir) => {
  const reg = new RegExp(`^${dir}\\/(\\S+)\\/index.md$`, "g");

  const componentList = glob.sync(`${dir}/**/index.md`, { cwd }).map((f) => f.replace(reg, (ms, $1) => {
    return $1;
  })
  );
  return componentList.map((componentName) => ({
    title: componentName,
    path: `${componentName}/`
  }))
};

module.exports = async () => {
  // const sidebar = glob.sync('shared/**/index.md', { cwd }).map(f => f.replace(/^shared\/(\S+\/)
  return {
    base: "/",
    head: [
      ["link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],

      [
        "script",
        { src: "https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js" },
      ],
      [
        "script",
        {
          //src: "https://cdn.jsdelivr.net/npm/element-ui@2.15.3/lib/index.js",
          src: "/lib/element-ui/2.15.3.min.js",
        },
      ],
      [
        "link",
        {
          rel: "stylesheet",
          href:
            "https://cdn.jsdelivr.net/npm/element-ui@2.15.3/lib/theme-chalk/index.css",
        },
      ],
      ["script", { src: "/lib/pea-ui/pea-ui.umd.min.js" }],
    ],
    dest: path.join(__dirname, "../../dist"),
    title: "Pea UI Toolkit",
    locales: {
      '/': {
        lang: 'zh-CN',
      },
    },
    themeConfig: {
      displayAllHeaders: true,
      nav: [
        { text: "首页", link: "/" },
        { text: "基础公共组件", link: "/components/" },
      ],
      sidebarDepth: 2,
      sidebar: {
        //"/shared/": [
        //  { title: "介绍", path: "/shared/" },
        //  ...genComponentSidebar("shared"),
        //],
        "/components/": [
          { title: "介绍", path: "/components/" },
          ...genComponentSidebar("components"),
        ],
      },
      // sidebar
    },
    plugins: [
      '@vuepress/back-to-top',
      '@vuepress/nprogress',
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
      ]
    ],

    chainWebpack: (config, isServer) => {
      console.log(`🚀 ~ file: config.js ~ line 109 ~ module.exports= ~ isServer`, isServer);
      //config.resolve.alias.set("core-js/library/fn", "core-js/features");
      // config 是 ChainableConfig 的一个实例
      config.externals({
        vue: "Vue",
        "element-ui": "ELEMENT",
        "pea-ui": "PeaUI",
      });
    },
  };
};
