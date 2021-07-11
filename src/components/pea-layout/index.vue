<!--
 * Desc: main 自动撑起页面剩余高度
 * File: \src\shared\pea-layout\index.vue
 * Project: personnel
 * File Created: Thursday, 5th November 2020 8:57:20 pm
-->

<template>
  <div class="pea-layout">
    <header>
      <slot name="header"></slot>
    </header>
    <main class="pea-layout-main">
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
/**
 * 利用flex 自适应，撑起main高度
 * @displayName pea-layout
 */
export default {
  name: "PeaLayout",
};
</script>

<style lang="scss" scoped>
.pea-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  &-main {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: self-start; // TODO: 后来设置prop 控制
  }
}
</style>
