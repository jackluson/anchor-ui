<template>
  <div>
    <pea-table
      v-loading="loading"
      ref="multipleTable"
      :column="tableData.column"
      :data="tableData.data"
       @sort-change="handleSortChange"
    >
    </pea-table>
  </div>
</template>

<script>
const mockData = [
    {
      date: "2016-05-01",
      name: "王小虎1",
      address: "上海市普陀区金沙江路 1511 弄",
    },
    {
      date: "2016-05-05",
      name: "王小虎2",
      address: "上海市普陀区金沙江路 1512 弄",
    },
    {
      date: "2016-05-02",
      name: "王小虎2",
      address: "上海市普陀区金沙江路 1512 弄",
    },
    {
      date: "2016-05-03",
      name: "王小虎3",
      address: "上海市普陀区金沙江路 1513 弄",
    },
]
export default {
  data() {
    return {
      loading: false,
      tableData: {
        column: [
          {
            prop: "date",
            label: "日期",
            sortable: 'custom',
          },
          {
            prop: "name",
            label: "姓名",
          },
          {
            prop: "address",
            label: "地址",
            formatter: this.formatter,
          },
        ],
        data: mockData,
      },
      multipleSelection: [],
    };
  },
  methods: {
    handleSortChange({column, prop, order }){
      this.loading = true;
      setTimeout(() => {
        this.tableData.data = mockData.sort((a,b) => order === 'ascending' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date))
        this.loading = false;
      }, 1000);

      
    },
    formatter(row) {
      return row.address + "-formatter";
    },
  },
};
</script>
