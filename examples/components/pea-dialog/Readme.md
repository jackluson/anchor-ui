## 示例

::: demo `PeaUI` pea-dialog 组件示例，**请注意 xxx**

```html
<template>
  <div>
    <el-button type="text" @click="dialogVisible = true"
      >点击打开 Dialog</el-button
    >
    <pea-dialog :visible.sync="dialogVisible"></pea-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
      };
    },
  };
</script>
```

:::
