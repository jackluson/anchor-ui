<template>
  <el-table-column
    v-if="isTypeColumn || column.openDefaultFormatter"
    v-bind="{
      formatter: column.openDefaultFormatter
        ? (...args) => {
            return formatter(...args, column.splitSymbol);
          }
        : undefined,
      ...$attrs,
      ...column,
    }"
    v-on="$listeners"
    :align="column.align || align || 'left'"
    :header-align="headerAlign || column.align || align || 'left'"
  >
  </el-table-column>
  <el-table-column
    v-else
    v-bind="{
      ...$attrs,
      ...column,
    }"
    v-on="$listeners"
    :align="column.align || align || 'left'"
    :header-align="headerAlign || column.align || align || 'left'"
  >
    <template v-slot="scope">
      <div v-if="column.slot || column.slotName">
        <slot
          :row="scope.row"
          :$index="scope.$index"
          :name="column.slotName || 'default'"
        >
        </slot>
      </div>
      <an-render
        v-else-if="column.render"
        :scope="scope"
        :render="column.render"
      ></an-render>
      <div v-else>
        {{
          scope.column.type === "index"
            ? scope.$index + 1
            : scope.row[scope.column.property]
        }}
      </div>
    </template>

    <!-- 绑定el-table的slot：header -->
    <template
      v-if="column.slotHeaderName || column.renderHeader"
      v-slot:header="scope"
    >
      <span v-if="column.slotHeaderName">
        <!-- 提供插槽name给an-table -->
        <slot
          :name="column.slotHeaderName"
          :column="scope.column"
          :$index="scope.$index"
        />
      </span>
      <an-render
        v-else-if="column.renderHeader"
        :scope="scope"
        :render="column.renderHeader"
      ></an-render>
      <span v-else>{{ column.label }}</span>
    </template>
    <!-- 嵌套 el-table-column，就可以实现多级表头。 -->
    <template v-if="column.children">
      <an-column
        v-for="(col, index) in column.children"
        v-bind="{
          ...$attrs,
          ...col,
        }"
        :key="index"
        :column="col"
      ></an-column>
    </template>
  </el-table-column>
</template>

<script>
import AnRender from "./an-render";
export default {
  name: "AnColumn",
  props: {
    column: Object,
    headerAlign: String,
    align: String,
    formatter: {
      type: Function,
      default: (row, column, val, index, splitSymbol) => {
        if (val === null || val === undefined || val === "") {
          return splitSymbol;
        }
        return val;
      },
    },
  },
  components: {
    AnRender,
  },
  computed: {
    // 判断type是否是selection, index类型
    isTypeColumn() {
      return ["selection", "index"].includes(this.column.type);
    },
  },
};
</script>
