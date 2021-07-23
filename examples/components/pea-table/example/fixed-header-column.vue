<template>
  <pea-table maxHeight="250" :column="tableData.column" :data="tableData.data">
  </pea-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: {
        column: [
          {
            prop: "date",
            label: "日期",
            width: "150",
            fixed: true,
          },
          {
            prop: "name",
            label: "姓名",
            width: "120",
          },
          {
            prop: "province",
            label: "省份",
            width: "120",
          },
          {
            prop: "city",
            label: "市区",
            width: "120",
          },
          {
            prop: "address",
            label: "地址",
            width: "300",
          },
          {
            prop: "zip",
            label: "邮编",
            width: "120",
            fixed: "right",
          },
        ],
        data: [],
      },
    };
  },
  created() {
    for (let i = 0; i < 20; i++) {
      this.tableData.data.push({
        date: `2016-05-${i + 1}`,
        province: `省份${i + 1}`,
        city: `城市${i + 1}`,
        zip: `邮编${i + 1}`,
        name: `王小虎${i + 1}`,
        address: `上海市普陀区金沙江路 ${i + 1} 弄`,
      });
    }
  },
};
</script>

