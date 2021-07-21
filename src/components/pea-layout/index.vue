<!--
 * Desc: main 自动撑起页面剩余高度
 * File: \src\shared\pea-layout\index.vue
 * Project: personnel
 * File Created: Thursday, 5th November 2020 8:57:20 pm
-->

<template>
  <div class="pea-layout">
    <header v-if="this.$scopedSlots.header">
      <!--
        @slot header 头部插槽内容
       -->
      <slot name="header"></slot>
    </header>
    <main class="pea-layout-main" :style="`align-items: ${this.alignItems}`">
      <!-- @slot 默认插槽内容，中心main区域 -->
      <slot></slot>
    </main>
    <footer v-if="this.$scopedSlots.footer">
      <!-- @slot footer 脚部插槽内容 -->
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
/**
 * 利用flex 自适应，main 插槽撑起剩余高度
 * @displayName pea-layout
 */
export default {
  name: "PeaLayout",
  props: {
    /**
     * 中心main 区域的align-items属性配置
     */
    alignItems: {
      type: String,
      default: "self-start",
    },
  },
  mounted() {
    console.log("this", this);
  },
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
    // align-items: self-start; // TODO: 后来设置prop 控制
    align-items: center;
  }
}
</style>
