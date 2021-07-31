/*
 * Desc:
 * File: /src/components/main.js
 * Project: anchor-ui-vue
 * File Created: Saturday, 31st July 2021 12:29:26 pm
 * Author: luxuemin2108@gmail.com
 * -----
 * Copyright (c) 2020 Camel Lu
 */

import anchorDialog from "./components/anchor-dialog/index.vue";
import anchorLayout from "./components/anchor-layout/index.vue";
import anchorSeparater from "./components/anchor-separater/index.vue";
import anchorTable from "./components/anchor-table/index.vue";

const components = [anchorDialog, anchorSeparater, anchorLayout, anchorTable];

// const components = [];
// const contexts = require.context(
//   "./",
//   true,
//   /^\.\/(components)\/\S+\/index\.vue$/
// );
// contexts.keys().forEach((component) => {
//   const componentEntity = contexts(component).default;
//   /* ts class 类型组件, build 之后 变量名会变, 所以根据路径指定名字 */
//   if (componentEntity instanceof Function) {
//     const componentName = component.replace(
//       /^\.\/(components)\/(\S+)\/index\.vue$/,
//       (match, $1, $2) => $2
//     );
//     Object.defineProperty(componentEntity, "name", {
//       value: componentName,
//     });
//   }

//   components.push(componentEntity);
// });

const install = async function(Vue, opts = {}) {
  // const elementUI = await import("element-ui");
  // Vue.use(elementUI);
  components.forEach((component) => {
    component.name && Vue.component(component.name, component);
  });
};

const AnchorUI = {
  install,
};

export default AnchorUI;
