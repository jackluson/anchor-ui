## 示例

### 基础用法

::: demo pea-table 组件示例

<<< @/examples/components/pea-table/example/basic-table.vue

:::

### 插槽模式

::: demo 支持使用插槽作为某一列 column 配置

<<< @/examples/components/pea-table/example/basic-slot-table.vue

:::

### render 模式

::: demo column 配置支持自定义 render 模式, 但要注意一点，如果要render自定义的组件的话，注册在当前组件是渲染不了，可以用插槽模式，或者全局注册该组件

<<< @/examples/components/pea-table/example/basic-render-table.vue

:::

### 集成分页

::: demo 用`el-pagination`集成了分页功能，设置`pagination` 开始分页功能, `el-pagination`的`current-change`事件名与table的事件名冲突，重新命名为`p-current-change`, 其他属性与事件同`el-pagination` 一样

<<< @/examples/components/pea-table/example/pagination-integrated-table.vue

:::

### 格式化默认值

::: demo 利用`formatter`功能，实现空值时候显示默认值, `openDefaultFormatter` 开始该功能， 使用`splitSymbol` 修改默认值， 也可以column的openDefaultFormatter关闭该功能, 或者使用column的formatter属性覆盖默认formatter函数

<<< @/examples/components/pea-table/example/formatter-table.vue

:::

### 带状态表格

可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。

::: demo 可以通过指定 Table 组件的 row-class-name 属性来为 Table 中的某一行添加 class，表明该行处于某种状态。

<<< @/examples/components/pea-table/example/status-table.vue

:::

### 固定表头

纵向内容过多时，可选择固定表头。这里用`max-height`, 与**el-table**的`height`不太一样， 其实是结合流体高度特性，当数据量动态变化时，可以为 Table 设置一个最大高度。

::: demo  通过设置max-height属性为 Table 指定最大高度与设置固定表头。此时若表格所需的高度大于最大高度，则会显示一个滚动条。

<<< @/examples/components/pea-table/example/fixed-header-table.vue

:::

### 固定列

横向内容过多时，可选择固定列。

::: demo 固定列需要使用fixed属性，它接受 Boolean 值或者leftright，表示左边固定还是右边固定。

<<<  @/examples/components/pea-table/example/fixed-column-table.vue

:::

### 固定列和表头

横纵内容过多时，可选择固定列和表头

::: demo 固定列和表头可以同时使用，只需要将上述两个属性分别设置好即可。

<<<  @/examples/components/pea-table/example/fixed-header-column.vue

:::

### 多级表头

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

::: demo 只需要在 el-table-column 里面嵌套 el-table-column，就可以实现多级表头。

<<<  @/examples/components/pea-table/example/multi-header-table.vue

:::

### 单选

选择单行数据时使用色块表示。

::: demo 同 `El-Table` 组件，只需要配置`highlight-current-row`属性即可实现单选。之后由current-change事件来管理选中时触发的事件，它会传入`currentRow`，`oldCurrentRow`。如果需要显示索引，可设置索引列`type`属性为`index`即可显示从 1 开始的索引号。

<<<  @/examples/components/pea-table/example/radio-table.vue

:::

### 多选

选择多行数据时使用 Checkbox。

::: demo 设置`type`为`selection`即可。

<<<  @/examples/components/pea-table/example/multiple-table.vue

:::

### 排序

对表格进行排序，可快速查找或对比数据

::: demo 在列中设置sortable属性即可实现以该列为基准的排序，接受一个Boolean，默认为false。可以通过 Table 的default-sort属性设置默认的排序列和排序顺序。

<<<  @/examples/components/pea-table/example/sort-table.vue

:::

自定义排序

::: demo 可以使用sort-method或者sort-by使用自定义的排序规则。如果需要后端排序，需将sortable设置为custom，同时在 Table 上监听sort-change事件，在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据。在本例中，我们还使用了formatter属性，它用于格式化指定列的值，接受一个Function，会传入两个参数：row和column，可以根据自己的需求进行处理。

<<<  @/examples/components/pea-table/example/sort-custom-table.vue

:::

### 筛选

对表格进行筛选，可快速查找到自己想看的数据。

::: demo 在列中设置 `filters` `filter-method`属性即可开启该列的筛选，`filters` 是一个数组，`filter-method` 是一个方法，它用于决定某些数据是否显示，会传入三个参数：`value`, `row` 和 `column`。

<<<  @/examples/components/pea-table/example/filter-table.vue

:::

### 自定义列模板

使用render函数, 自定义列的显示内容，可组合其他组件使用。

::: demo 通过column render函数自定义render模板。

<<<  @/examples/components/pea-table/example/render-table.vue

:::

使用`slotName`插槽, 自定义列的显示内容，可组合其他组件使用。

::: demo 通过column render函数自定义render模板。

<<<  @/examples/components/pea-table/example/render-slot-table.vue

:::

### 展开行

当行内容过多并且不想显示横向滚动条时，可以使用 Table 展开行功能。

::: demo 通过设置 `type="expand"`可以开启展开行功能，展开行的内容可以通过`render`自定义

<<<  @/examples/components/pea-table/example/expand-row-table.vue

:::

### 树形数据与懒加载

::: demo 通过设置 `type="expand"`可以开启展开行功能，展开行的内容可以通过`render`自定义

<<<  @/examples/components/pea-table/example/tree-table.vue

:::

### 自定义表头

表头支持自定义--renderHeader。

::: demo 通过设置`renderHeader`来自定义表头，写法同`自定义列模板`

<<<  @/examples/components/pea-table/example/render-header-table.vue

:::

表头支持自定义--插槽模式

::: demo 通过设置`slotHeaderName`来自定义表头，写法同`自定义列模板`

<<<  @/examples/components/pea-table/example/slot-header-table.vue

:::

### 表尾合计行

若表格展示的是各类数字，可以在表尾显示各列的合计。

::: demo 将`show-summary`设置为`true`就会在表格尾部展示合计行。默认情况下，对于合计行，第一列不进行数据求合操作，而是显示「合计」二字（可通过`sum-text`配置），其余列会将本列所有数值进行求合操作，并显示出来。当然，你也可以定义自己的合计逻辑。使用`summary-method`并传入一个方法，返回一个数组，这个数组中的各项就会显示在合计行的各列中，具体可以参考本例中的第二个表格。

<<<  @/examples/components/pea-table/example/footer-total-table.vue

:::

### 合并行或列

多行或多列共用一个数据时，可以合并行或列。

::: demo 通过给`pea-table`传入`span-method`方法可以实现合并行或列，方法的参数是一个对象，里面包含当前行`row`、当前列`column`、当前行号`rowIndex`、当前列号`columnIndex`四个属性。该函数可以返回一个包含两个元素的数组，第一个元素代表`rowspan`，第二个元素代表`colspan`。 也可以返回一个键名为`rowspan`和`colspan`的对象。

<<<  @/examples/components/pea-table/example/merge-row-column-table.vue

:::

### 自定义索引

自定义 type=index 列的行号。

::: demo 通过给 type=index 的列传入 index 属性，可以自定义索引。该属性传入数字时，将作为索引的起始值。也可以传入一个方法，它提供当前行的行号（从 0 开始）作为参数，返回值将作为索引展示。

<<<  @/examples/components/pea-table/example/custom-index-table.vue

:::

## 拓展使用

### 普通形式表格编辑

数据简单的情况下，可以通过点击编辑按钮直接进行表格的编辑、保存、取消操作

::: demo 由于编辑模式下数据格式不统一，如日期数据通过`DatePicker`选择，普通的文本通过`Input`，下拉选择的通过`ElSelect`等，所以就不进行整合了，大家可以通过`render`自定义出任意效果的编辑模式，原理就是根据是否是编辑模式的字段，渲染不同的内容，如本例中的`_edit`,为`true`的情况下渲染相应的编辑模式下的组件，否则就是普通的文本。由于编辑模式中有取消，所以取消的时候得还原原数据，可以通过定义一个`defaultData`,该值为`JSON.parse(JSON.stringify(this.tableData.data))`,加`JSON.parse`和`JSON.stringify`防止`defaultData`数据随着`this.tableData.data`的改变而改变，取消的时候通过`$index`索引从`defaultData`中拿到原数据，然后根据`$index`索引修改`this.tableData.data`的数据

<<<  @/examples/components/pea-table/example/edit-table.vue

:::

### 弹窗形式表格编辑

数据复杂的情况，建议通过弹窗形式进行数据编辑的操作

::: demo 结合`pea-dialog`弹窗修改数据

<<<  @/examples/components/pea-table/example/edit-dialog-table.vue

:::

### 表格动态合并

支持表格动态合并

::: demo `pea-table`上配置`merge`,`merge`为一个包含需要合并的`column`中`prop`的数组，配置后会自动将值相同的项自动合并。

<<<  @/examples/components/pea-table/example/merge-table.vue

:::

## 其他

> 其他属性，事件与[el-table](https://element.eleme.cn/#/zh-CN/component/table) 一致
