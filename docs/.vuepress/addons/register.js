/*
 * Desc: 全局注册组件
 * File: \docs\.vuepress\addons\register.js
 * Project: pea-ui
 * File Created: Thursday, 26th November 2020 11:07:57 am
 */

const components = [];
const contexts = require.context(
  "../../../src/",
  true,
  /^\.\/(components)\/\S+\/index\.vue$/
);
contexts.keys().forEach((component) => {
  const componentEntity = contexts(component).default;
  /* ts class 类型组件, build 之后 变量名会变, 所以根据路径指定名字 */
  if (componentEntity instanceof Function) {
    const componentName = component.replace(
      /^\.\/(components)\/(\S+)\/index\.vue$/,
      (match, $1, $2) => $2
    );
    Object.defineProperty(componentEntity, "name", {
      value: componentName,
    });
  }

  components.push(componentEntity);
});

const install = function(Vue, opts = {}) {
  components.forEach((component) => {
    component.name && Vue.component(component.name, component);
  });
};

const PeaUI = {
  install,
};

export default PeaUI;
