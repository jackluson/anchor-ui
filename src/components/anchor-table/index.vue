<template>
  <div class="anchor-table-wrapper">
    <el-table
      ref="elTable"
      class="anchor-table"
      :class="{ 'anchor-table-no-overflow-y': !!maxHeight }"
      v-bind="$attrs"
      v-on="$listeners"
      :stripe="stripe"
      :border="border"
      :data="pagination && data.length > pageSize ? tableData : data"
      :span-method="this.merge ? this.mergeMethod : this.spanMethod"
      :max-height="maxHeight"
    >
      <anchor-column
        v-bind="$attrs"
        v-for="(item, index) in column"
        :key="index"
        :column="{
          splitSymbol: splitSymbol,
          openDefaultFormatter: openDefaultFormatter,
          ...item,
        }"
      >
        <!-- template 填充anchor-column 的插槽 -->
        <template
          v-if="item.slotHeaderName"
          v-slot:[item.slotHeaderName]="scope"
        >
          <!--暴露slot给外部组件用 -->

          <!--
              @slot 提供给列表头部，列配置的插槽
              @binding {string} name 指定插槽名字（没指定的话，默认default）
              @binding {number} $index 第几列
              @binding {object} column 列配置数据
           -->
          <slot
            :name="item.slotHeaderName"
            :column="scope.column"
            :$index="scope.$index"
          />
        </template>

        <template v-if="item.slotName" v-slot:[item.slotName]="scope">
          <!--
              @slot 提供给列表头部，列配置的插槽
              @binding {string} name 指定插槽名字（没指定的话，默认default）
              @binding {number} $index 第几列
              @binding {object} row 列配置数据
           -->
          <slot :name="item.slotName" :row="scope.row" :$index="scope.$index" />
        </template>
        <template v-else v-slot="scope">
          <!--
              @slot 提供给列表头部，列配置的插槽
              @binding {string} name 指定插槽名字（没指定的话，默认default）
              @binding {number} $index 第几列
              @binding {object} row     列配置数据
           -->
          <slot :name="'default'" :row="scope.row" :$index="scope.$index" />
        </template>
      </anchor-column>
    </el-table>
    <div class="anchor-table-footer">
      <div>
        <!-- @slot 列表底部操作，一般用于列表下面操作，与分页一排 -->
        <slot name="footer" />
      </div>
      <el-pagination
        class="anchor-table-pagination"
        v-if="pagination"
        v-bind="$attrs"
        :layout="$attrs['layout'] || 'sizes, prev, pager, next, total'"
        v-on="$listeners"
        @current-change="paginationCurrentChange"
        :page-size="pageSize"
        :current-page="currentPage"
        :style="{ 'margin-top': paginationTop, 'text-align': paginationAlign }"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import AnchorColumn from "./anchor-column";

/**
 * 基于el-table二次封装的表格组件, 通过column配置,自带分页功能
 * @displayName anchor-table
 */
export default {
  name: "anchor-table",
  props: {
    /**
     * 列配置, 每个数组元素参照element-ui Table-column Attributes
     */
    column: Array,
    /**
     * 数据源
     */
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     *  是否开始空值是否默认值，空值包括`null`, 空字符串, `undefined`,
     */
    openDefaultFormatter: {
      type: Boolean,
      default: false,
    },

    /**
     *  默认格式化字符
     */
    splitSymbol: {
      type: String,
      default: "-",
    },
    /**
     * Table 的最大高度。合法的值为数字或者单位为 px 的高度, 参照el-table
     */
    maxHeight: {
      type: [String, Number],
    },
    /**
     * 是否显示分页
     */
    pagination: {
      type: Boolean,
      default: false,
    },

    /**
     * 是否带有纵向边框
     */
    border: {
      type: Boolean,
      default: true,
    },

    /**
     * 是否为斑马纹 table
     */
    stripe: {
      type: Boolean,
      default: true,
    },

    /**
     * 距离列表底部的margin-top 距离
     */
    paginationTop: {
      type: String,
      default: "15px",
    },

    /**
     * 分页对齐方式
     *  @values right, left, center
     */
    paginationAlign: {
      type: String,
      default: "right",
    },
    /**
     * 分页大小
     */
    pageSize: {
      type: Number,
      default: 10,
    },
    /**
     * 当前页
     */
    currentPage: {
      type: Number,
      default: 1,
    },
    /**
     * 合并行或列的计算方法， 同`el-table`
     */
    spanMethod: Function,
    /**
     * 需要合并prop数组,如果配置了此值，默认计算`spanMethod`方法
     */
    merge: Array,
  },
  components: {
    AnchorColumn,
  },
  data() {
    return {
      mergeLine: {},
      mergeIndex: {},
      tableData: [],
    };
  },
  created() {
    this.getMergeArr(this.data, this.merge);
    this.updateTableData();
  },

  computed: {
    dataLength() {
      return this.data.length;
    },
  },

  methods: {
    clearSelection() {
      this.$refs.elTable.clearSelection();
    },
    toggleRowSelection(row, selected) {
      this.$refs.elTable.toggleRowSelection(row, selected);
    },
    toggleAllSelection() {
      this.$refs.elTable.toggleAllSelection();
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.elTable.toggleRowExpansion(row, expanded);
    },
    setCurrentRow(row) {
      this.$refs.elTable.setCurrentRow(row);
    },
    clearSort() {
      this.$refs.elTable.clearSort();
    },
    clearFilter(columnKey) {
      this.$refs.elTable.clearFilter(columnKey);
    },
    doLayout() {
      this.$refs.elTable.doLayout();
    },
    sort(prop, order) {
      this.$refs.elTable.sort(prop, order);
    },

    getMergeArr(tableData, merge) {
      if (!merge) return;
      this.mergeLine = {};
      this.mergeIndex = {};
      merge.forEach((item) => {
        tableData.forEach((data, i) => {
          if (i === 0) {
            this.mergeIndex[item] = this.mergeIndex[item] || [];
            this.mergeIndex[item].push(1);
            this.mergeLine[item] = 0;
          } else {
            if (data[item] === tableData[i - 1][item]) {
              this.mergeIndex[item][this.mergeLine[item]] += 1;
              this.mergeIndex[item].push(0);
            } else {
              this.mergeIndex[item].push(1);
              this.mergeLine[item] = i;
            }
          }
        });
      });
    },

    // eslint-disable-next-line no-unused-vars
    mergeMethod({ row, column, rowIndex, columnIndex }) {
      const index = this.merge.indexOf(column.property);
      if (index > -1) {
        const _row = this.mergeIndex[this.merge[index]][rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },

    /* el-pagination 的 current-change事件和table 的事件冲突, 重命名*/
    paginationCurrentChange(val) {
      /**
       * el-pagination 的current-change事件
       * @arg {number} page 当前页
       */
      this.$emit("p-current-change", val);
    },

    /* change tableData */
    updateTableData() {
      this.tableData = this.data.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  watch: {
    data() {
      this.updateTableData();
    },
    pageSize() {
      this.updateTableData();
    },
    currentPage() {
      this.updateTableData();
    },
    merge() {
      this.getMergeArr(this.data, this.merge);
    },
    dataLength() {
      this.getMergeArr(this.data, this.merge);
    },
  },
};
</script>

<style lang="scss" scoped>
.anchor-table-wrapper {
  width: 100%;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  .anchor-table {
    flex: 1;
    overflow-y: auto;
    &-no-overflow-y {
      overflow-y: hidden;
    }
    &-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    ::v-deep table {
      margin: 0;

      .cell {
        display: flex;
        flex-wrap: wrap;
      }
      .el-table__expand-column .cell {
        display: block;
      }
    }
  }
}
</style>
