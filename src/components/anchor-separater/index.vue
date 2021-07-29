<template>
  <div
    class="separate"
    :style="{ background: color, height: height + 'px', width: width + 'px' }"
  ></div>
</template>

<script>
/**
 * 分隔符
 * @displayName anchor-separater
 */
export default {
  name: "anchor-separater",
  props: {
    /**
     * 高度
     */
    height: {
      type: Number,
      default: 32,
    },
    /**
     * 宽度
     */
    width: {
      type: Number,
      default: 1,
    },
    /**
     * 颜色
     */
    color: {
      type: String,
      default: "#d7dae2",
    },
  },
};
</script>

<style lang="scss" scoped>
.separate {
  display: inline-block;
  width: 1px;
  height: 32px;
  background: #d7dae2;
}
</style>
