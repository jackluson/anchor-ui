<!--
 * Desc: 基于el-dialog 封装弹窗组件, 自带取消, 确认
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
    ref="anDialog"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div>
      <!-- @slot 内容区域 -->
      <slot></slot>
    </div>
    <div slot="footer">
      <!--
        @slot dialog footer  区域，默认有取消，确认按钮

      -->
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
 * 基于el-dialog二次封装对话框，内置一些通用配置，比如footer，close事件的处理
 * @displayName an-dialog
 */
export default {
  name: "an-dialog",
  props: {
    /**
     * 是否显示 Dialog，支持 .sync 修饰符
     */
    visible: {
      type: Boolean,
      default: false,
    },
    /**
     * Dialog 的标题
     */
    title: {
      type: String,
      default: "",
    },
    /**
     * Dialog 的宽度
     */
    width: {
      type: String,
      default: "500px",
    },
    /**
     * Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
     */
    appendToBody: {
      type: Boolean,
      default: true,
    },
    /**
     * 关闭前的回调，会暂停 Dialog 的关闭
     */
    beforeClose: Function,
    /**
     * 是否可以通过点击 modal 关闭 Dialog
     */
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    /**
     * 取消按钮文本，默认为“取消”，如果是["取消", "关闭"]其中之一，自动触发 `this.$refs.anDialog.$emit("update:visible", false);`
     */
    cancelButtonText: {
      type: String,
      default: closeBtnText[0],
    },
    /**
     * 确认按钮文本
     */
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
        this.$refs.anDialog.$emit("update:visible", false);
      }
    },
    handleConfirm(e) {
      /**
       * 弹窗确认事件
       * @arg {e}  MouseEvent 点击事件对象
       */
      this.$emit("confirm", e);
    },
  },
};
</script>
