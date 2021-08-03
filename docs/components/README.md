## 安装

### 1. 使用 npm 或 yarn 安装

推荐使用 npm 或 yarn 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```shell
$ npm install anchor-ui-vue --save
```

```shell
$ yarn add anchor-ui-vue
```

### 2. 浏览器引入

在浏览器中使用 script 和 link 标签直接引入文件，并使用全局变量 `AnchorUI`。

> 注： `anchor-ui-vue` 是依赖 `element-ui` ,所以务必先要引入 element-ui 相关 js 与 css

## 示例

### 1. vue-cli 脚手架搭建项目 -- [github 地址](https://github.com/jackluson/anchor-ui-vue-demo)

```javascript
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import AnchorUI from "anchor-ui-vue";

import App from "./App.vue";

Vue.use(ElementUI);
Vue.use(AnchorUI);
```

[这是一个使用 vue-cli 搭建的 Anchor UI 在线 codesandbox 演示项目](https://codesandbox.io/embed/awesome-leaf-3vfbx?fontsize=14&hidenavigation=1&theme=dark)， 如下：

<iframe src="https://codesandbox.io/embed/awesome-leaf-3vfbx?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="awesome-leaf-3vfbx"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

### 2. 使用 CDN 静态页面

```html
<!-- import Vue before Element -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- import ELEMTN CSS -->
<link
  rel="stylesheet"
  href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"
/>
<!-- import ELMENT JavaScript -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<!-- anchor-ui  -->
<script src="https://cdn.jsdelivr.net/gh/jackluson/anchor-ui@main/build/anchor-ui.umd.min.js"></script>
```

[这是一个使用 CDN 引入的 Anchor UI 在线 codesandbox 演示项目](https://codesandbox.io/embed/nervous-taussig-u09hq?fontsize=14&hidenavigation=1&moduleview=1&theme=dark)， 如下：

<iframe src="https://codesandbox.io/embed/nervous-taussig-u09hq?fontsize=14&hidenavigation=1&moduleview=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="nervous-taussig-u09hq"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
