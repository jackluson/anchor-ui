# pea-dialog

> 基于 el-dialog 二次封装对话框，内置一些通用配置

## Props

| Prop name          | Description | Type    | Values | Default         |
| ------------------ | ----------- | ------- | ------ | --------------- |
| visible            |             | boolean | -      | false           |
| title              |             | string  | -      | ""              |
| width              |             | string  | -      | "500px"         |
| appendToBody       |             | boolean | -      | true            |
| beforeClose        |             | func    | -      |                 |
| closeOnClickModal  |             | boolean | -      | false           |
| cancelButtonText   |             | string  | -      | closeBtnText[0] |
| confirmlButtonText |             | string  | -      | "确定"          |

## Events

| Event name | Description | Arguments |
| ---------- | ----------- | --------- |
| confirm    | -           | -         |

## Slots

| Name    | Description | slotProps |
| ------- | ----------- | --------- |
| default | -           | -         |
| footer  | -           | -         |

---

## 示例

::: demo `PeaUI` pea-dialog 组件示例,内置默认 footer 插槽内容

```html
<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">
      点击打开Dialog
    </el-button>
    <pea-dialog :visible.sync="dialogVisible"></pea-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    }
  };
</script>
```

:::
