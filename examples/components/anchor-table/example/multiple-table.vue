<template>
  <div>
    <anchor-table
      ref="multipleTable"
      :column="tableData.column"
      :data="tableData.data"
      @selection-change="handleSelectionChange"
    >
    </anchor-table>
    <div style="margin-top: 20px">
      <el-button
        @click="toggleSelection([tableData.data[1], tableData.data[2]])"
        >切换第二、第三行的选中状态</el-button
      >
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: {
        column: [
          {
            type: "selection",
            width: "50px",
          },
          {
            prop: "date",
            label: "日期",
          },
          {
            prop: "name",
            label: "姓名",
          },
          {
            prop: "address",
            label: "地址",
          },
        ],
        data: [
          {
            date: "2016-05-02",
            name: "王小虎1",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-02",
            name: "王小虎2",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-02",
            name: "王小虎3",
            address: "上海市普陀区金沙江路 1518 弄",
          },
        ],
      },
      multipleSelection: [],
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.log(
        `🚀 ~ file: multiple-table.vue ~ line 75 ~ handleSelectionChange ~ val`,
        val
      );
      this.multipleSelection = val;
    },
  },
};
</script>
