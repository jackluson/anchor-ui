## 示例

### 基础用法

::: demo 外盒子 360px, 中心 main 区域撑起剩余高度

```html
<template>
  <div style="height: 360px">
    <ClientOnly>
      <an-layout>
        <section>
          <h3>default slot</h3>
          <div>
            利用flex布局, <code>flex: 1</code>, 默认插槽main部分支撑起剩余高度
          </div>
          <hr />
        </section>
      </an-layout>
    </ClientOnly>
  </div>
</template>
```

:::

### 更多使用

::: demo 外盒子 360px, 除了头部，脚部外，中心 main 区域撑起剩余高度

```html
<template>
  <div style="height: 360px">
    <ClientOnly>
      <an-layout align-items="center">
        <template v-slot:header>
          <h3>
            header slot part
          </h3>
          <hr />
        </template>
        <section>
          <h3>default slot 居中排版</h3>
          <div>
            利用flex布局, <code>flex: 1</code>, 默认插槽main部分支撑起剩余高度
          </div>
          <hr />
        </section>
        <template v-slot:footer>
          <h3>
            footer slot part
          </h3>
        </template>
      </an-layout>
    </ClientOnly>
  </div>
</template>

<script>
  export default {};
</script>
```

:::
