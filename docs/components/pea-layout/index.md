# pea-layout

> 利用 flex 自适应，撑起 main 高度

## Slots

| Name    | Description | slotProps |
| ------- | ----------- | --------- |
| header  | -           | -         |
| default | -           | -         |
| footer  | -           | -         |

---

## 示例

::: demo `ElementUI` xxx 组件示例，**请注意 xxx**

```html
<template>
  <div style="height: 320px">
    <ClientOnly>
      <pea-layout>
        <template v-slot:header>
          <h3>
            header slot part
          </h3>
          <hr />
        </template>
        <section>
          <h3>default slot</h3>
          <div>
            利用flex布局, <code>flex: 1</code>, 默认插槽部分支撑起盒子高度
          </div>
          <hr />
        </section>
        <template v-slot:footer>
          <h3>
            footer slot part
          </h3>
        </template>
      </pea-layout>
    </ClientOnly>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped></style>
```

:::
