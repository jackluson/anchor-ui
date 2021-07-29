<template>
  <anchor-table :column="tableData.column" :data="tableData.data">
    <template v-slot:headerSlotName="{ column }">
      <el-input
        v-model="search"
        size="mini"
        placeholder="输入关键字搜索"
        @input="handleInput($event, column)"
      />
    </template>
  </anchor-table>
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
            renderHeader: (h, scope) => {
              return (
                <span>
                  <i class="el-icon-time">{scope.column.label}</i>
                </span>
              );
            },
          },
          {
            prop: "name",
            label: "姓名",
          },
          {
            label: "操作",
            slotHeaderName: "headerSlotName",
            render: (h, scope) => {
              return (
                <div>
                  <el-button
                    size="mini"
                    onClick={() => {
                      this.handleEdit(scope.$index, scope.row);
                    }}
                  >
                    编辑
                  </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    onClick={() => {
                      this.handleDelete(scope.$index, scope.row);
                    }}
                  >
                    删除
                  </el-button>
                </div>
              );
            },
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
      search: "",
    };
  },
  watch: {
    search(newVal, oldVal) {
      console.log(
        `🚀 ~ file: render-header-table.vue ~ line 88 ~ search ~ newVal, oldVal`,
        newVal,
        oldVal
      );
    },
  },
  methods: {
    handleInput(val, row) {
      console.log(
        row,
        `🚀 ~ file: slot-header-table.vue ~ line 93 ~ handleInput ~ val`,
        val
      );
      // this.search = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$message(`点击的了编辑，索引：${index}`);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$message(`点击的了删除，索引：${index}`);
    },
  },
};
</script>
