# an-dialog

> 基于 el-dialog 二次封装对话框，内置一些通用配置，比如 footer，close 事件的处理

## Props

| Prop name          | Description                                                                                                                | Type    | Values | Default         |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | --------------- |
| visible            | 是否显示 Dialog，支持 .sync 修饰符                                                                                         | boolean | -      | false           |
| title              | Dialog 的标题                                                                                                              | string  | -      | ""              |
| width              | Dialog 的宽度                                                                                                              | string  | -      | "500px"         |
| appendToBody       | Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true                                               | boolean | -      | true            |
| beforeClose        | 关闭前的回调，会暂停 Dialog 的关闭                                                                                         | func    | -      |                 |
| closeOnClickModal  | 是否可以通过点击 modal 关闭 Dialog                                                                                         | boolean | -      | false           |
| cancelButtonText   | 取消按钮文本，默认为“取消”，如果是["取消", "关闭"]其中之一，自动触发 `this.$refs.anDialog.$emit("update:visible", false);` | string  | -      | closeBtnText[0] |
| confirmlButtonText | 确认按钮文本                                                                                                               | string  | -      | "确定"          |

## Events

| Event name | Description  | Arguments                                     |
| ---------- | ------------ | --------------------------------------------- |
| confirm    | 弹窗确认事件 | MouseEvent: <code>e</code> — 点击事件对象<br> |

## Slots

| Name    | Description                              | slotProps |
| ------- | ---------------------------------------- | --------- |
| default | 内容区域                                 | -         |
| footer  | dialog footer 区域，默认有取消，确认按钮 | -         |

---

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
        dialogVisible: false
      };
    }
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
        dialogVisible: false
      };
    }
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
        dialogVisible: false
      };
    },
    methods: {
      handleConfirm(e) {
        console.log("e", e);
        this.$message({
          showClose: true,
          message: "恭喜你，这是一条成功消息",
          type: "success"
        });
        this.dialogVisible = false;
      }
    }
  };
</script>
```

:::

## 其他

> 其他属性，事件与[el-dialog](https://element.eleme.cn/#/zh-CN/component/dialog) 一致
