## 示例

### 基本使用

::: demo `ElementUI` pea-table 组件示例

```html
<template>
  <pea-table
    border
    align="center"
    pagination
    :column="column"
    :data="tableData"
  ></pea-table>
</template>
<script>
  export default {
    data() {
      return {
        column: [
          {
            type: "index",
            width: "50px",
            label: "序号",
          },
          {
            prop: "name",
            label: "名字",
          },
          {
            prop: "date",
            label: "日期",
          },
          {
            prop: "address",
            label: "地址",
          },
        ],
        tableData: [
          {
            date: "2016-05-02",
            name: "佘太君",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ],
      };
    },
  };
</script>
```

:::

### 插槽模式

::: demo `ElementUI` 支持插槽作为某一列 column 配置

```html
<template>
  <pea-table
    border
    align="center"
    pagination
    :column="column"
    :data="tableData"
  >
    <template v-slot="{ row }">
      <div>
        插槽文字
      </div>
    </template>
  </pea-table>
</template>
<script>
  export default {
    data() {
      return {
        column: [
          {
            type: "index",
            width: "50px",
            label: "序号",
          },
          {
            //prop: "name",
            label: "名字",
            slotName: "default",
          },
          {
            prop: "date",
            label: "日期",
          },
          {
            prop: "address",
            label: "地址",
          },
        ],
        tableData: [
          {
            date: "2016-05-02",
            name: "佘太君",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ],
      };
    },
  };
</script>
```

:::

### render 模式

::: demo `ElementUI` column 配置支持自定义 render 模式

```html
<template>
  <pea-table
    border
    align="center"
    pagination
    :column="column"
    :data="tableData"
  >
  </pea-table>
</template>
<script>
  export default {
    data() {
      return {
        column: [
          {
            type: "index",
            width: "50px",
            label: "序号",
          },
          {
            label: "名字",
            prop: "name",
            render: (h, scope) => {
              const { row, column } = scope;
              const propKey = column.property;
              return <div> render 结果 -- {row[propKey]}</div>;
            },
          },
          {
            prop: "date",
            label: "日期",
          },
          {
            prop: "address",
            label: "地址",
          },
        ],
        tableData: [
          {
            date: "2016-05-02",
            name: "佘太君",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ],
      };
    },
  };
</script>
```

:::
