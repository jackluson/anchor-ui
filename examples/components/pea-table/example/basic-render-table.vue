<template>
  <pea-table align="center" :column="column" :data="tableData"> </pea-table>
</template>
<script>
const Vue = require("vue");
Vue.component("button-counter", {
  data: function () {
    return {
      count: 0,
    };
  },
  template:
    '<button v-on:click="count++">You clicked me {{ count }} times.</button>',
});
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
            return (
              <div>
                {" "}
                <button-counter /> render 结果 -- {row[propKey]}
              </div>
            );
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