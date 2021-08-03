## 示例

### 基础用法

::: demo

```html
<template>
  <div>
    <p>垂直分隔线 |</p>
    <an-separater width="2"></an-separater>
    <br />
    <an-separater width="2" color="green"></an-separater>
  </div>
</template>
```

:::

### 水平分割

::: demo 水平分割线

```html
<template>
  <div>
    <p class="separater-wrapper">水平分割线 ——————</p>
    <ClientOnly>
      <div class="separater-wrapper">
        <an-separater width="200" height="1" /> &nbsp; 你好 &nbsp;
        <an-separater width="200" height="1" />
      </div>
      <br />
      <an-separater width="200" height="1" color="#9400ff"></an-separater>
    </ClientOnly>
  </div>
</template>

<style>
  .separater-wrapper {
    display: flex;
    align-items: center;
  }
</style>
```

:::
