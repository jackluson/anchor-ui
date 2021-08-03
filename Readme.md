## Anchor-UI-Vue

> 基于 Element-UI 二次封装组件库, 简洁至上，灵活性高，99%支持原有属性

[![npm version](https://badge.fury.io/js/anchor-ui-vue.svg)](https://badge.fury.io/js/anchor-ui-vue)
![NPM Downloads](https://badgen.net/npm/dt/anchor-ui-vue)
[![Build Status](https://travis-ci.com/jackluson/anchor-ui.svg?branch=main)](https://travis-ci.com/jackluson/anchor-ui)
[![MIT](https://img.shields.io/github/license/jackluson/anchor-ui?style=plastic)](https://github.com/jackluson/anchor-ui/blob/main/LICENSE)

## Component Kanban

> 目前提供如下组件

| Components   | 快捷入口                                                               |
| ------------ | ---------------------------------------------------------------------- |
| an-table     | [文档实例](https://jackluson.github.io/an-ui/components/an-table/)     |
| an-dialog    | [文档实例](https://jackluson.github.io/an-ui/components/an-dialog/)    |
| an-layout    | [文档实例](https://jackluson.github.io/an-ui/components/an-layout/)    |
| an-separater | [文档实例](https://jackluson.github.io/an-ui/components/an-separater/) |

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

[这是一个使用 vue-cli 搭建的 Anchor UI 在线 codesandbox 演示项目](https://codesandbox.io/embed/awesome-leaf-3vfbx?fontsize=14&hidenavigation=1&theme=dark)

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

[这是一个使用 CDN 引入的 Anchor UI 在线 codesandbox 演示项目](https://codesandbox.io/embed/nervous-taussig-u09hq?fontsize=14&hidenavigation=1&moduleview=1&theme=dark)。

## 关于组件库文档

组件库文档先利用 `vue-docgen`从源码注释中提取组件文档，然后结合组件示例文档，最终生成最终文档。利用`vuepress`结合自定义插件（文档示例代码不用写两次）渲染出来。 这样做的好处有：

1. 既规范，写好写全组件源码的注释，有利后续的维护。也可以从源码的注释中提取组件文档。
2. 组件的示例 demo 与源码解偶开来，有利于各自的维护
3. 自定义 vuepress 插件可以使写组件示例时，不用重复写两遍一样的代码

### 文档开发遗留问题

- [] 偶尔出现源码改动，文档不会自动刷新问题
- [] `Failed to execute 'appendChild' on 'Node'` 问题 目前用 ClientOnly 解决， 可参考[这篇文章](https://wxsm.space/posts/2020-10-25-a-difficult-debug-note.html)
