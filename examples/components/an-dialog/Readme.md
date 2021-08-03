## 示例

### 基础用法

::: demo an-dialog 组件示例,内置默认 footer 插槽内容

```html
<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">
      点击打开Dialog
    </el-button>
    <an-dialog
      :visible.sync="dialogVisible"
      @confirm="dialogVisible = false"
    ></an-dialog>
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

### 自定义 footer slot

::: demo 替换 footer 插槽默认内容

```html
<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">
      点击打开Dialog
    </el-button>
    <an-dialog :visible.sync="dialogVisible">
      <template v-slot:footer>
        <p>这里是你自定义的footer插槽内容</p>
      </template>
    </an-dialog>
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

### confirm 事件

::: demo 监听`confirm`确认事件

```html
<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">
      点击打开Dialog
    </el-button>
    <an-dialog :visible.sync="dialogVisible" @confirm="handleConfirm">
    </an-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
      };
    },
    methods: {
      handleConfirm(e) {
        console.log("e", e);
        this.$message({
          showClose: true,
          message: "恭喜你，这是一条成功消息",
          type: "success",
        });
        this.dialogVisible = false;
      },
    },
  };
</script>
```

:::

## 其他

> 其他属性，事件与[el-dialog](https://element.eleme.cn/#/zh-CN/component/dialog) 一致
