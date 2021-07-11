## 示例

### 基本使用

::: demo `ElementUI` pea-separater 组件示例

```html
<template>
  <div>
    <p>分隔符|</p>
    <ClientOnly>
      <pea-separater width="2"></pea-separater>
    </ClientOnly>
  </div>
</template>

<script>
  export default {
    mounted() {
      console.log("mounted");
    },
  };
</script>
```

:::
