<template>
  <el-table-column
    v-bind="{
      ...$attrs,
      ...column,
    }"
    v-on="$listeners"
    :align="column.align || align || 'left'"
    :header-align="headerAlign || column.align || align || 'left'"
  >
    <template v-if="!isTypeColumn" v-slot="scope">
      <div v-if="column.slot || column.slotName">
        <slot
          :row="scope.row"
          :$index="scope.$index"
          :name="column.slotName || 'default'"
        >
        </slot>
      </div>
      <pea-render
        v-else-if="column.render"
        :scope="scope"
        :render="column.render"
      ></pea-render>
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
      v-if="!isTypeColumn && (column.slotHeaderName || column.renderHeader)"
      v-slot:header="scope"
    >
      <span v-if="column.slotHeaderName">
        <!-- 提供插槽name给pea-table -->
        <slot
          :name="column.slotHeaderName"
          :column="scope.column"
          :$index="scope.$index"
        />
      </span>
      <pea-render
        v-else-if="column.renderHeader"
        :scope="scope"
        :render="column.renderHeader"
      ></pea-render>
      <span v-else>{{ column.label }}</span>
    </template>
    <template v-if="column.children">
      <pea-column
        v-for="(col, index) in column.children"
        v-bind="{
          ...$attrs,
          ...col,
        }"
        :key="index"
        :column="col"
      ></pea-column>
    </template>
  </el-table-column>
</template>

<script>
import PeaRender from "./pea-render";
export default {
  name: "PeaColumn",
  props: {
    column: Object,
    headerAlign: String,
    align: String,
  },
  components: {
    PeaRender,
  },

  computed: {
    isTypeColumn() {
      return this.column.type && !this.column.label;
    },
  },
};
</script>
