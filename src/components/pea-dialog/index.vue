<!--
 * Desc: 基于el-dialog 封装弹窗组件, 自带取消, 确认
 * File: \src\shared\pea-dialog\index.vue
 * Project: personnel
 * File Created: Wednesday, 11th November 2020 2:27:41 pm
-->

<template>
  <el-dialog
    :title="title"
    :visible="visible"
    :width="width"
    :append-to-body="appendToBody"
    :close-on-click-modal="closeOnClickModal"
    @close="handleClose"
    ref="peaDialog"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div>
      <slot></slot>
    </div>
    <div slot="footer">
      <slot name="footer">
        <el-button @click="handleClose">{{ cancelButtonText }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{
          confirmlButtonText
        }}</el-button>
      </slot>
    </div>
  </el-dialog>
</template>

<script>
const closeBtnText = ["取消", "关闭"];
/**
 * 基于el-dialog二次封装对话框，内置一些通用配置
 * @displayName pea-dialog
 */
export default {
  name: "pea-dialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "500px",
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
    beforeClose: Function,
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    cancelButtonText: {
      type: String,
      default: closeBtnText[0],
    },
    confirmlButtonText: {
      type: String,
      default: "确定",
    },
  },
  methods: {
    handleClose() {
      if (this.$listeners.close) {
        this.$listeners.close();
      } else if (
        // 如果是默认关闭的文案，并且没有配置自己beforeClose逻辑
        this.visible === true &&
        closeBtnText.includes(this.cancelButtonText) &&
        !this.beforeClose
      ) {
        console.log("jiji");

        this.$refs.peaDialog.$emit("update:visible", false);
      }
    },
    handleConfirm(...arg) {
      this.$emit("confirm", ...arg);
    },
  },
};
</script>
