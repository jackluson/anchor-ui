## 示例

### 基础用法

::: demo

```html
<template>
  <div>
    <p>垂直分隔线 |</p>
    <anchor-separater width="2"></anchor-separater>
    <br />
    <anchor-separater width="2" color="green"></anchor-separater>
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
        <anchor-separater width="200" height="1" /> &nbsp; 你好 &nbsp;
        <anchor-separater width="200" height="1" />
      </div>
      <br />
      <anchor-separater
        width="200"
        height="1"
        color="#9400ff"
      ></anchor-separater>
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
