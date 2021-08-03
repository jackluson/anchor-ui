<template>
  <an-table align="center" :column="column" :data="tableData">
    <template v-slot="{ row }">
      <div>
        <button-counter />
        <span>插槽</span>
      </div>
    </template>
  </an-table>
</template>
<script>
export default {
  components: {
    "button-counter": {
      data: function() {
        return {
          count: 0,
        };
      },
      template:
        '<button v-on:click="count++">You clicked me {{ count }} times.</button>',
    },
  },
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
