# pea-separater

> 分隔符

## Props

| Prop name | Description | Type   | Values | Default   |
| --------- | ----------- | ------ | ------ | --------- |
| height    | 高度        | number | -      | 32        |
| width     | 宽度        | number | -      | 1         |
| color     | 颜色        | string | -      | "#d7dae2" |

---

## 示例

### 基础用法

::: demo

```html
<template>
  <div>
    <p>垂直分隔线 |</p>
    <pea-separater width="2"></pea-separater>
    <br />
    <pea-separater width="2" color="green"></pea-separater>
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
        <pea-separater width="200" height="1" /> &nbsp; 你好 &nbsp;
        <pea-separater width="200" height="1" />
      </div>
      <br />
      <pea-separater width="200" height="1" color="#9400ff"></pea-separater>
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
