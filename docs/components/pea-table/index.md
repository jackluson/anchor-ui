# pea-table

> 基于 el-table 二次封装的表格组件, 通过 column 配置,自带分页功能

## Props

| Prop name       | Description                                                         | Type           | Values                    | Default |
| --------------- | ------------------------------------------------------------------- | -------------- | ------------------------- | ------- |
| column          | 列配置, 每个数组元素参照 element-ui Table-column Attributes         | array          | -                         |         |
| data            | 数据源                                                              | array          | -                         | []      |
| spanMethod      |                                                                     | func           | -                         |         |
| maxHeight       | Table 的最大高度。合法的值为数字或者单位为 px 的高度, 参照 el-table | string\|number | -                         |         |
| pagination      | 是否显示分页                                                        | boolean        | -                         | false   |
| paginationTop   | 距离列表底部的 margin-top 距离                                      | string         | -                         | "15px"  |
| paginationAlign | 分页对齐方式                                                        | string         | `right`, `left`, `center` | "right" |
| pageSize        | 分页大小                                                            | number         | -                         | 10      |
| currentPage     | 当前页                                                              | number         | -                         | 1       |
| merge           | 合并数组                                                            | array          | -                         |         |

## Events

| Event name       | Description                          | Arguments                              |
| ---------------- | ------------------------------------ | -------------------------------------- |
| p-current-change | el-pagination 的 current-change 事件 | page: <code>number</code> — 当前页<br> |

## Slots

| Name    | Description                                    | slotProps                                                                                                                                                                                                                     |
| ------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default | 提供给列表头部，列配置的插槽                   | `name` : <span class="badge warning">string</span> —> 指定插槽名字（没指定的话，默认 default）<br>`row` : <span class="badge warning">object</span> —> 列配置数据<br>`$index` : <span class="badge warning">-</span> —> -<br> |
| footer  | 列表底部操作，一般用于列表下面操作，与分页一排 | -                                                                                                                                                                                                                             |

---

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
            label: "序号"
          },
          {
            prop: "name",
            label: "名字"
          },
          {
            prop: "date",
            label: "日期"
          },
          {
            prop: "address",
            label: "地址"
          }
        ],
        tableData: [
          {
            date: "2016-05-02",
            name: "佘太君",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄"
          }
        ]
      };
    }
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
            label: "序号"
          },
          {
            //prop: "name",
            label: "名字",
            slotName: "default"
          },
          {
            prop: "date",
            label: "日期"
          },
          {
            prop: "address",
            label: "地址"
          }
        ],
        tableData: [
          {
            date: "2016-05-02",
            name: "佘太君",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄"
          }
        ]
      };
    }
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
            label: "序号"
          },
          {
            label: "名字",
            prop: "name",
            render: (h, scope) => {
              const { row, column } = scope;
              const propKey = column.property;
              return <div> render 结果 -- {row[propKey]}</div>;
            }
          },
          {
            prop: "date",
            label: "日期"
          },
          {
            prop: "address",
            label: "地址"
          }
        ],
        tableData: [
          {
            date: "2016-05-02",
            name: "佘太君",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄"
          }
        ]
      };
    }
  };
</script>
```

:::
