const e = ["取消", "关闭"];
function n(e, n, t, a, r, o, l, i, s, d) {
  "boolean" != typeof l && ((s = i), (i = l), (l = !1));
  const c = "function" == typeof t ? t.options : t;
  let p;
  if (
    (e &&
      e.render &&
      ((c.render = e.render),
      (c.staticRenderFns = e.staticRenderFns),
      (c._compiled = !0),
      r && (c.functional = !0)),
    a && (c._scopeId = a),
    o
      ? ((p = function(e) {
          (e =
            e ||
            (this.$vnode && this.$vnode.ssrContext) ||
            (this.parent &&
              this.parent.$vnode &&
              this.parent.$vnode.ssrContext)) ||
            "undefined" == typeof __VUE_SSR_CONTEXT__ ||
            (e = __VUE_SSR_CONTEXT__),
            n && n.call(this, s(e)),
            e && e._registeredComponents && e._registeredComponents.add(o);
        }),
        (c._ssrRegister = p))
      : n &&
        (p = l
          ? function(e) {
              n.call(this, d(e, this.$root.$options.shadowRoot));
            }
          : function(e) {
              n.call(this, i(e));
            }),
    p)
  )
    if (c.functional) {
      const e = c.render;
      c.render = function(n, t) {
        return p.call(t), e(n, t);
      };
    } else {
      const e = c.beforeCreate;
      c.beforeCreate = e ? [].concat(e, p) : [p];
    }
  return t;
}
const t = {
  name: "an-dialog",
  props: {
    visible: { type: Boolean, default: !1 },
    title: { type: String, default: "" },
    width: { type: String, default: "500px" },
    appendToBody: { type: Boolean, default: !0 },
    beforeClose: Function,
    closeOnClickModal: { type: Boolean, default: !1 },
    cancelButtonText: { type: String, default: e[0] },
    confirmlButtonText: { type: String, default: "确定" },
  },
  methods: {
    handleClose() {
      this.$listeners.close
        ? this.$listeners.close()
        : !0 === this.visible &&
          e.includes(this.cancelButtonText) &&
          !this.beforeClose &&
          this.$refs.anDialog.$emit("update:visible", !1);
    },
    handleConfirm(e) {
      this.$emit("confirm", e);
    },
  },
};
var a = function() {
  var e = this,
    n = e.$createElement,
    t = e._self._c || n;
  return t(
    "el-dialog",
    e._g(
      e._b(
        {
          ref: "anDialog",
          attrs: {
            title: e.title,
            visible: e.visible,
            width: e.width,
            "append-to-body": e.appendToBody,
            "close-on-click-modal": e.closeOnClickModal,
          },
          on: { close: e.handleClose },
        },
        "el-dialog",
        e.$attrs,
        !1
      ),
      e.$listeners
    ),
    [
      t("div", [e._t("default")], 2),
      e._v(" "),
      t(
        "div",
        { attrs: { slot: "footer" }, slot: "footer" },
        [
          e._t("footer", function() {
            return [
              t("el-button", { on: { click: e.handleClose } }, [
                e._v(e._s(e.cancelButtonText)),
              ]),
              e._v(" "),
              t(
                "el-button",
                { attrs: { type: "primary" }, on: { click: e.handleConfirm } },
                [e._v(e._s(e.confirmlButtonText))]
              ),
            ];
          }),
        ],
        2
      ),
    ]
  );
};
a._withStripped = !0;
const r = n(
  { render: a, staticRenderFns: [] },
  undefined,
  t,
  undefined,
  false,
  undefined,
  !1,
  void 0,
  void 0,
  void 0
);
var o = {
  name: "an-layout",
  props: { "align-items": { type: String, default: "self-start" } },
};
const l =
  "undefined" != typeof navigator &&
  /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function i(e) {
  return (e, n) =>
    (function(e, n) {
      const t = l ? n.media || "default" : e,
        a = d[t] || (d[t] = { ids: new Set(), styles: [] });
      if (!a.ids.has(e)) {
        a.ids.add(e);
        let t = n.source;
        if (
          (n.map &&
            ((t += "\n/*# sourceURL=" + n.map.sources[0] + " */"),
            (t +=
              "\n/*# sourceMappingURL=data:application/json;base64," +
              btoa(unescape(encodeURIComponent(JSON.stringify(n.map)))) +
              " */")),
          a.element ||
            ((a.element = document.createElement("style")),
            (a.element.type = "text/css"),
            n.media && a.element.setAttribute("media", n.media),
            void 0 === s &&
              (s = document.head || document.getElementsByTagName("head")[0]),
            s.appendChild(a.element)),
          "styleSheet" in a.element)
        )
          a.styles.push(t),
            (a.element.styleSheet.cssText = a.styles
              .filter(Boolean)
              .join("\n"));
        else {
          const e = a.ids.size - 1,
            n = document.createTextNode(t),
            r = a.element.childNodes;
          r[e] && a.element.removeChild(r[e]),
            r.length
              ? a.element.insertBefore(n, r[e])
              : a.element.appendChild(n);
        }
      }
    })(e, n);
}
let s;
const d = {};
const c = o;
var p = function() {
  var e = this,
    n = e.$createElement,
    t = e._self._c || n;
  return t("div", { staticClass: "an-layout" }, [
    e.$scopedSlots.header ? t("header", [e._t("header")], 2) : e._e(),
    e._v(" "),
    t(
      "main",
      {
        staticClass: "an-layout-main",
        style: "align-items: " + e.alignItems,
      },
      [e._t("default")],
      2
    ),
    e._v(" "),
    e.$scopedSlots.footer ? t("footer", [e._t("footer")], 2) : e._e(),
  ]);
};
p._withStripped = !0;
const u = n(
  { render: p, staticRenderFns: [] },
  function(e) {
    e &&
      e("data-v-25b8210f_0", {
        source:
          ".an-layout[data-v-25b8210f] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.an-layout-main[data-v-25b8210f] {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  align-items: center;\n}\n\n/*# sourceMappingURL=index.vue.map */",
        map: {
          version: 3,
          sources: [
            "/Users/admin/personal/coding/aurora-ui/src/components/an-layout/index.vue",
            "index.vue",
          ],
          names: [],
          mappings:
            "AA4CA;EACA,YAAA;EACA,aAAA;EACA,sBAAA;AC3CA;AD4CA;EACA,aAAA;EACA,OAAA;EACA,sBAAA;EAEA,mBAAA;AC3CA;;AAEA,oCAAoC",
          file: "index.vue",
          sourcesContent: [
            '\x3c!--\r\n * Desc: main 自动撑起页面剩余高度\r\n * File Created: Thursday, 5th November 2020 8:57:20 pm\r\n--\x3e\r\n\r\n<template>\r\n  <div class="an-layout">\r\n    <header v-if="$scopedSlots.header">\r\n      \x3c!--\r\n        @slot header 头部插槽内容\r\n       --\x3e\r\n      <slot name="header"></slot>\r\n    </header>\r\n    <main class="an-layout-main" :style="`align-items: ${alignItems}`">\r\n      \x3c!-- @slot 默认插槽内容，中心main区域 --\x3e\r\n      <slot></slot>\r\n    </main>\r\n    <footer v-if="$scopedSlots.footer">\r\n      \x3c!-- @slot footer 脚部插槽内容 --\x3e\r\n      <slot name="footer"></slot>\r\n    </footer>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\n/**\r\n * 利用flex 自适应，main 插槽撑起剩余高度\r\n * @displayName an-layout\r\n */\r\nexport default {\r\n  name: "an-layout",\r\n  props: {\r\n    /**\r\n     * 中心main 区域的align-items属性配置\r\n     */\r\n    "align-items": {\r\n      type: String,\r\n      default: "self-start",\r\n    },\r\n  },\r\n};\r\n</script>\r\n\r\n<style lang="scss" scoped>\r\n.an-layout {\r\n  height: 100%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  &-main {\r\n    display: flex;\r\n    flex: 1;\r\n    flex-direction: column;\r\n    // align-items: self-start; // TODO: 后来设置prop 控制\r\n    align-items: center;\r\n  }\r\n}\r\n</style>\r\n',
            ".an-layout {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.an-layout-main {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  align-items: center;\n}\n\n/*# sourceMappingURL=index.vue.map */",
          ],
        },
        media: void 0,
      });
  },
  c,
  "data-v-25b8210f",
  false,
  undefined,
  !1,
  i,
  void 0,
  void 0
);
const m = {
  name: "an-separater",
  props: {
    height: { type: Number, default: 32 },
    width: { type: Number, default: 1 },
    color: { type: String, default: "#d7dae2" },
  },
};
var h = function() {
  var e = this,
    n = e.$createElement;
  return (e._self._c || n)("div", {
    staticClass: "separate",
    style: {
      background: e.color,
      height: e.height + "px",
      width: e.width + "px",
    },
  });
};
h._withStripped = !0;
const g = n(
  { render: h, staticRenderFns: [] },
  function(e) {
    e &&
      e("data-v-20cafa38_0", {
        source:
          ".separate[data-v-20cafa38] {\n  display: inline-block;\n  width: 1px;\n  height: 32px;\n  background: #d7dae2;\n}\n\n/*# sourceMappingURL=index.vue.map */",
        map: {
          version: 3,
          sources: [
            "/Users/admin/personal/coding/aurora-ui/src/components/an-separater/index.vue",
            "index.vue",
          ],
          names: [],
          mappings:
            "AAyCA;EACA,qBAAA;EACA,UAAA;EACA,YAAA;EACA,mBAAA;ACxCA;;AAEA,oCAAoC",
          file: "index.vue",
          sourcesContent: [
            '<template>\n  <div\n    class="separate"\n    :style="{ background: color, height: height + \'px\', width: width + \'px\' }"\n  ></div>\n</template>\n\n<script>\n/**\n * 分隔符\n * @displayName an-separater\n */\nexport default {\n  name: "an-separater",\n  props: {\n    /**\n     * 高度\n     */\n    height: {\n      type: Number,\n      default: 32,\n    },\n    /**\n     * 宽度\n     */\n    width: {\n      type: Number,\n      default: 1,\n    },\n    /**\n     * 颜色\n     */\n    color: {\n      type: String,\n      default: "#d7dae2",\n    },\n  },\n};\n</script>\n\n<style lang="scss" scoped>\n.separate {\n  display: inline-block;\n  width: 1px;\n  height: 32px;\n  background: #d7dae2;\n}\n</style>\n',
            ".separate {\n  display: inline-block;\n  width: 1px;\n  height: 32px;\n  background: #d7dae2;\n}\n\n/*# sourceMappingURL=index.vue.map */",
          ],
        },
        media: void 0,
      });
  },
  m,
  "data-v-20cafa38",
  false,
  undefined,
  !1,
  i,
  void 0,
  void 0
);
const f = {
  name: "AnchorColumn",
  props: {
    column: Object,
    headerAlign: String,
    align: String,
    formatter: {
      type: Function,
      default: (e, n, t, a, r) => (null == t || "" === t ? r : t),
    },
  },
  components: {
    AnchorRender: {
      name: "AnchorRender",
      functional: !0,
      props: { scope: Object, render: Function },
      render: (e, n) => {
        const t = n.props.render(e, n.props.scope);
        return t instanceof e("span", "").constructor ? t : e("span", [t]);
      },
    },
  },
  computed: {
    isTypeColumn() {
      return ["selection", "index"].includes(this.column.type);
    },
  },
};
var A = function() {
  var e = this,
    n = e.$createElement,
    t = e._self._c || n;
  return e.isTypeColumn || e.column.openDefaultFormatter
    ? t(
        "el-table-column",
        e._g(
          e._b(
            {
              attrs: {
                align: e.column.align || e.align || "left",
                "header-align":
                  e.headerAlign || e.column.align || e.align || "left",
              },
            },
            "el-table-column",
            Object.assign(
              {},
              {
                formatter: e.column.openDefaultFormatter
                  ? function() {
                      for (var n = [], t = arguments.length; t--; )
                        n[t] = arguments[t];
                      return e.formatter.apply(
                        void 0,
                        n.concat([e.column.splitSymbol])
                      );
                    }
                  : void 0,
              },
              e.$attrs,
              e.column
            ),
            !1
          ),
          e.$listeners
        )
      )
    : t(
        "el-table-column",
        e._g(
          e._b(
            {
              attrs: {
                align: e.column.align || e.align || "left",
                "header-align":
                  e.headerAlign || e.column.align || e.align || "left",
              },
              scopedSlots: e._u(
                [
                  {
                    key: "default",
                    fn: function(n) {
                      return [
                        e.column.slot || e.column.slotName
                          ? t(
                              "div",
                              [
                                e._t(e.column.slotName || "default", null, {
                                  row: n.row,
                                  $index: n.$index,
                                }),
                              ],
                              2
                            )
                          : e.column.render
                          ? t("anchor-render", {
                              attrs: { scope: n, render: e.column.render },
                            })
                          : t("div", [
                              e._v(
                                "\n      " +
                                  e._s(
                                    "index" === n.column.type
                                      ? n.$index + 1
                                      : n.row[n.column.property]
                                  ) +
                                  "\n    "
                              ),
                            ]),
                      ];
                    },
                  },
                  e.column.slotHeaderName || e.column.renderHeader
                    ? {
                        key: "header",
                        fn: function(n) {
                          return [
                            e.column.slotHeaderName
                              ? t(
                                  "span",
                                  [
                                    e._t(e.column.slotHeaderName, null, {
                                      column: n.column,
                                      $index: n.$index,
                                    }),
                                  ],
                                  2
                                )
                              : e.column.renderHeader
                              ? t("anchor-render", {
                                  attrs: {
                                    scope: n,
                                    render: e.column.renderHeader,
                                  },
                                })
                              : t("span", [e._v(e._s(e.column.label))]),
                          ];
                        },
                      }
                    : null,
                ],
                null,
                !0
              ),
            },
            "el-table-column",
            Object.assign({}, e.$attrs, e.column),
            !1
          ),
          e.$listeners
        ),
        [
          e._v(" "),
          e._v(" "),
          e.column.children
            ? e._l(e.column.children, function(n, a) {
                return t(
                  "anchor-column",
                  e._b(
                    { key: a, attrs: { column: n } },
                    "anchor-column",
                    Object.assign({}, e.$attrs, n),
                    !1
                  )
                );
              })
            : e._e(),
        ],
        2
      );
};
A._withStripped = !0;
const b = {
  name: "an-table",
  props: {
    column: Array,
    data: { type: Array, default: () => [] },
    openDefaultFormatter: { type: Boolean, default: !1 },
    splitSymbol: { type: String, default: "-" },
    maxHeight: { type: [String, Number] },
    pagination: { type: Boolean, default: !1 },
    border: { type: Boolean, default: !0 },
    stripe: { type: Boolean, default: !0 },
    paginationTop: { type: String, default: "15px" },
    paginationAlign: { type: String, default: "right" },
    pageSize: { type: Number, default: 10 },
    currentPage: { type: Number, default: 1 },
    spanMethod: Function,
    merge: Array,
  },
  components: {
    AnchorColumn: n(
      { render: A, staticRenderFns: [] },
      undefined,
      f,
      undefined,
      false,
      undefined,
      !1,
      void 0,
      void 0,
      void 0
    ),
  },
  data: () => ({ mergeLine: {}, mergeIndex: {}, tableData: [] }),
  created() {
    this.getMergeArr(this.data, this.merge), this.updateTableData();
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
    toggleRowSelection(e, n) {
      this.$refs.elTable.toggleRowSelection(e, n);
    },
    toggleAllSelection() {
      this.$refs.elTable.toggleAllSelection();
    },
    toggleRowExpansion(e, n) {
      this.$refs.elTable.toggleRowExpansion(e, n);
    },
    setCurrentRow(e) {
      this.$refs.elTable.setCurrentRow(e);
    },
    clearSort() {
      this.$refs.elTable.clearSort();
    },
    clearFilter(e) {
      this.$refs.elTable.clearFilter(e);
    },
    doLayout() {
      this.$refs.elTable.doLayout();
    },
    sort(e, n) {
      this.$refs.elTable.sort(e, n);
    },
    getMergeArr(e, n) {
      n &&
        ((this.mergeLine = {}),
        (this.mergeIndex = {}),
        n.forEach((n) => {
          e.forEach((t, a) => {
            0 === a
              ? ((this.mergeIndex[n] = this.mergeIndex[n] || []),
                this.mergeIndex[n].push(1),
                (this.mergeLine[n] = 0))
              : t[n] === e[a - 1][n]
              ? ((this.mergeIndex[n][this.mergeLine[n]] += 1),
                this.mergeIndex[n].push(0))
              : (this.mergeIndex[n].push(1), (this.mergeLine[n] = a));
          });
        }));
    },
    mergeMethod({ row: e, column: n, rowIndex: t, columnIndex: a }) {
      const r = this.merge.indexOf(n.property);
      if (r > -1) {
        const e = this.mergeIndex[this.merge[r]][t];
        return { rowspan: e, colspan: e > 0 ? 1 : 0 };
      }
    },
    paginationCurrentChange(e) {
      this.$emit("p-current-change", e);
    },
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
var x = function() {
  var e = this,
    n = e.$createElement,
    t = e._self._c || n;
  return t(
    "div",
    { staticClass: "an-table-wrapper" },
    [
      t(
        "el-table",
        e._g(
          e._b(
            {
              ref: "elTable",
              staticClass: "an-table",
              class: { "an-table-no-overflow-y": !!e.maxHeight },
              attrs: {
                stripe: e.stripe,
                border: e.border,
                data:
                  e.pagination && e.data.length > e.pageSize
                    ? e.tableData
                    : e.data,
                "span-method": e.merge ? e.mergeMethod : e.spanMethod,
                "max-height": e.maxHeight,
              },
            },
            "el-table",
            e.$attrs,
            !1
          ),
          e.$listeners
        ),
        e._l(e.column, function(n, a) {
          return t(
            "anchor-column",
            e._b(
              {
                key: a,
                attrs: {
                  column: Object.assign(
                    {},
                    {
                      splitSymbol: e.splitSymbol,
                      openDefaultFormatter: e.openDefaultFormatter,
                    },
                    n
                  ),
                },
                scopedSlots: e._u(
                  [
                    n.slotHeaderName
                      ? {
                          key: n.slotHeaderName,
                          fn: function(t) {
                            return [
                              e._t(n.slotHeaderName, null, {
                                column: t.column,
                                $index: t.$index,
                              }),
                            ];
                          },
                        }
                      : null,
                    n.slotName
                      ? {
                          key: n.slotName,
                          fn: function(t) {
                            return [
                              e._t(n.slotName, null, {
                                row: t.row,
                                $index: t.$index,
                              }),
                            ];
                          },
                        }
                      : {
                          key: "default",
                          fn: function(n) {
                            return [
                              e._t("default", null, {
                                row: n.row,
                                $index: n.$index,
                              }),
                            ];
                          },
                        },
                  ],
                  null,
                  !0
                ),
              },
              "anchor-column",
              e.$attrs,
              !1
            )
          );
        }),
        1
      ),
      e._v(" "),
      t(
        "div",
        { staticClass: "an-table-footer" },
        [
          t("div", [e._t("footer")], 2),
          e._v(" "),
          e.pagination
            ? t(
                "el-pagination",
                e._g(
                  e._b(
                    {
                      staticClass: "an-table-pagination",
                      style: {
                        "margin-top": e.paginationTop,
                        "text-align": e.paginationAlign,
                      },
                      attrs: {
                        layout:
                          e.$attrs.layout || "sizes, prev, pager, next, total",
                        "page-size": e.pageSize,
                        "current-page": e.currentPage,
                      },
                      on: { "current-change": e.paginationCurrentChange },
                    },
                    "el-pagination",
                    e.$attrs,
                    !1
                  ),
                  e.$listeners
                )
              )
            : e._e(),
        ],
        1
      ),
    ],
    1
  );
};
x._withStripped = !0;
const y = [
    r,
    g,
    u,
    n(
      { render: x, staticRenderFns: [] },
      function(e) {
        e &&
          e("data-v-2959deb9_0", {
            source:
              ".an-table-wrapper[data-v-2959deb9] {\n  width: 100%;\n  flex: 1;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n}\n.an-table-wrapper .an-table[data-v-2959deb9] {\n  flex: 1;\n  overflow-y: auto;\n}\n.an-table-wrapper .an-table-no-overflow-y[data-v-2959deb9] {\n  overflow-y: hidden;\n}\n.an-table-wrapper .an-table-footer[data-v-2959deb9] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.an-table-wrapper .an-table[data-v-2959deb9]  table {\n  margin: 0;\n}\n.an-table-wrapper .an-table[data-v-2959deb9]  table .cell {\n  display: flex;\n  flex-wrap: wrap;\n}\n.an-table-wrapper .an-table[data-v-2959deb9]  table .el-table__expand-column .cell {\n  display: block;\n}\n\n/*# sourceMappingURL=index.vue.map */",
            map: {
              version: 3,
              sources: [
                "/Users/admin/personal/coding/aurora-ui/src/components/an-table/index.vue",
                "index.vue",
              ],
              names: [],
              mappings:
                "AA2TA;EACA,WAAA;EACA,OAAA;EACA,gBAAA;EACA,aAAA;EACA,sBAAA;AC1TA;AD2TA;EACA,OAAA;EACA,gBAAA;ACzTA;AD0TA;EACA,kBAAA;ACxTA;AD0TA;EACA,aAAA;EACA,8BAAA;EACA,mBAAA;ACxTA;AD2TA;EACA,SAAA;ACzTA;AD2TA;EACA,aAAA;EACA,eAAA;ACzTA;AD2TA;EACA,cAAA;ACzTA;;AAEA,oCAAoC",
              file: "index.vue",
              sourcesContent: [
                '<template>\n  <div class="an-table-wrapper">\n    <el-table\n      ref="elTable"\n      class="an-table"\n      :class="{ \'an-table-no-overflow-y\': !!maxHeight }"\n      v-bind="$attrs"\n      v-on="$listeners"\n      :stripe="stripe"\n      :border="border"\n      :data="pagination && data.length > pageSize ? tableData : data"\n      :span-method="merge ? mergeMethod : spanMethod"\n      :max-height="maxHeight"\n    >\n      <anchor-column\n        v-bind="$attrs"\n        v-for="(item, index) in column"\n        :key="index"\n        :column="{\n          splitSymbol: splitSymbol,\n          openDefaultFormatter: openDefaultFormatter,\n          ...item,\n        }"\n      >\n        \x3c!-- template 填充anchor-column 的插槽 --\x3e\n        <template\n          v-if="item.slotHeaderName"\n          v-slot:[item.slotHeaderName]="scope"\n        >\n          \x3c!--暴露slot给外部组件用 --\x3e\n\n          \x3c!--\n              @slot 提供给列表头部，列配置的插槽\n              @binding {string} name 指定插槽名字（没指定的话，默认default）\n              @binding {number} $index 第几列\n              @binding {object} column 列配置数据\n           --\x3e\n          <slot\n            :name="item.slotHeaderName"\n            :column="scope.column"\n            :$index="scope.$index"\n          />\n        </template>\n\n        <template v-if="item.slotName" v-slot:[item.slotName]="scope">\n          \x3c!--\n              @slot 提供给列表头部，列配置的插槽\n              @binding {string} name 指定插槽名字（没指定的话，默认default）\n              @binding {number} $index 第几列\n              @binding {object} row 列配置数据\n           --\x3e\n          <slot :name="item.slotName" :row="scope.row" :$index="scope.$index" />\n        </template>\n        <template v-else v-slot="scope">\n          \x3c!--\n              @slot 提供给列表头部，列配置的插槽\n              @binding {string} name 指定插槽名字（没指定的话，默认default）\n              @binding {number} $index 第几列\n              @binding {object} row     列配置数据\n           --\x3e\n          <slot :name="\'default\'" :row="scope.row" :$index="scope.$index" />\n        </template>\n      </anchor-column>\n    </el-table>\n    <div class="an-table-footer">\n      <div>\n        \x3c!-- @slot 列表底部操作，一般用于列表下面操作，与分页一排 --\x3e\n        <slot name="footer" />\n      </div>\n      <el-pagination\n        class="an-table-pagination"\n        v-if="pagination"\n        v-bind="$attrs"\n        :layout="$attrs[\'layout\'] || \'sizes, prev, pager, next, total\'"\n        v-on="$listeners"\n        @current-change="paginationCurrentChange"\n        :page-size="pageSize"\n        :current-page="currentPage"\n        :style="{ \'margin-top\': paginationTop, \'text-align\': paginationAlign }"\n      ></el-pagination>\n    </div>\n  </div>\n</template>\n\n<script>\nimport AnchorColumn from "./anchor-column";\n\n/**\n * 基于el-table二次封装的表格组件, 通过column配置,自带分页功能\n * @displayName an-table\n */\nexport default {\n  name: "an-table",\n  props: {\n    /**\n     * 列配置, 每个数组元素参照element-ui Table-column Attributes\n     */\n    column: Array,\n    /**\n     * 数据源\n     */\n    data: {\n      type: Array,\n      default() {\n        return [];\n      },\n    },\n    /**\n     *  是否开始空值是否默认值，空值包括`null`, 空字符串, `undefined`,\n     */\n    openDefaultFormatter: {\n      type: Boolean,\n      default: false,\n    },\n\n    /**\n     *  默认格式化字符\n     */\n    splitSymbol: {\n      type: String,\n      default: "-",\n    },\n    /**\n     * Table 的最大高度。合法的值为数字或者单位为 px 的高度, 参照el-table\n     */\n    maxHeight: {\n      type: [String, Number],\n    },\n    /**\n     * 是否显示分页\n     */\n    pagination: {\n      type: Boolean,\n      default: false,\n    },\n\n    /**\n     * 是否带有纵向边框\n     */\n    border: {\n      type: Boolean,\n      default: true,\n    },\n\n    /**\n     * 是否为斑马纹 table\n     */\n    stripe: {\n      type: Boolean,\n      default: true,\n    },\n\n    /**\n     * 距离列表底部的margin-top 距离\n     */\n    paginationTop: {\n      type: String,\n      default: "15px",\n    },\n\n    /**\n     * 分页对齐方式\n     *  @values right, left, center\n     */\n    paginationAlign: {\n      type: String,\n      default: "right",\n    },\n    /**\n     * 分页大小\n     */\n    pageSize: {\n      type: Number,\n      default: 10,\n    },\n    /**\n     * 当前页\n     */\n    currentPage: {\n      type: Number,\n      default: 1,\n    },\n    /**\n     * 合并行或列的计算方法， 同`el-table`\n     */\n    spanMethod: Function,\n    /**\n     * 需要合并prop数组,如果配置了此值，默认计算`spanMethod`方法\n     */\n    merge: Array,\n  },\n  components: {\n    AnchorColumn,\n  },\n  data() {\n    return {\n      mergeLine: {},\n      mergeIndex: {},\n      tableData: [],\n    };\n  },\n  created() {\n    this.getMergeArr(this.data, this.merge);\n    this.updateTableData();\n  },\n\n  computed: {\n    dataLength() {\n      return this.data.length;\n    },\n  },\n\n  methods: {\n    clearSelection() {\n      this.$refs.elTable.clearSelection();\n    },\n    toggleRowSelection(row, selected) {\n      this.$refs.elTable.toggleRowSelection(row, selected);\n    },\n    toggleAllSelection() {\n      this.$refs.elTable.toggleAllSelection();\n    },\n    toggleRowExpansion(row, expanded) {\n      this.$refs.elTable.toggleRowExpansion(row, expanded);\n    },\n    setCurrentRow(row) {\n      this.$refs.elTable.setCurrentRow(row);\n    },\n    clearSort() {\n      this.$refs.elTable.clearSort();\n    },\n    clearFilter(columnKey) {\n      this.$refs.elTable.clearFilter(columnKey);\n    },\n    doLayout() {\n      this.$refs.elTable.doLayout();\n    },\n    sort(prop, order) {\n      this.$refs.elTable.sort(prop, order);\n    },\n\n    getMergeArr(tableData, merge) {\n      if (!merge) return;\n      this.mergeLine = {};\n      this.mergeIndex = {};\n      merge.forEach((item) => {\n        tableData.forEach((data, i) => {\n          if (i === 0) {\n            this.mergeIndex[item] = this.mergeIndex[item] || [];\n            this.mergeIndex[item].push(1);\n            this.mergeLine[item] = 0;\n          } else {\n            if (data[item] === tableData[i - 1][item]) {\n              this.mergeIndex[item][this.mergeLine[item]] += 1;\n              this.mergeIndex[item].push(0);\n            } else {\n              this.mergeIndex[item].push(1);\n              this.mergeLine[item] = i;\n            }\n          }\n        });\n      });\n    },\n\n    // eslint-disable-next-line no-unused-vars\n    mergeMethod({ row, column, rowIndex, columnIndex }) {\n      const index = this.merge.indexOf(column.property);\n      if (index > -1) {\n        const _row = this.mergeIndex[this.merge[index]][rowIndex];\n        const _col = _row > 0 ? 1 : 0;\n        return {\n          rowspan: _row,\n          colspan: _col,\n        };\n      }\n    },\n\n    /* el-pagination 的 current-change事件和table 的事件冲突, 重命名*/\n    paginationCurrentChange(val) {\n      /**\n       * el-pagination 的current-change事件\n       * @arg {number} page 当前页\n       */\n      this.$emit("p-current-change", val);\n    },\n\n    /* change tableData */\n    updateTableData() {\n      this.tableData = this.data.slice(\n        (this.currentPage - 1) * this.pageSize,\n        this.currentPage * this.pageSize\n      );\n    },\n  },\n  watch: {\n    data() {\n      this.updateTableData();\n    },\n    pageSize() {\n      this.updateTableData();\n    },\n    currentPage() {\n      this.updateTableData();\n    },\n    merge() {\n      this.getMergeArr(this.data, this.merge);\n    },\n    dataLength() {\n      this.getMergeArr(this.data, this.merge);\n    },\n  },\n};\n</script>\n\n<style lang="scss" scoped>\n.an-table-wrapper {\n  width: 100%;\n  flex: 1;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  .an-table {\n    flex: 1;\n    overflow-y: auto;\n    &-no-overflow-y {\n      overflow-y: hidden;\n    }\n    &-footer {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n    }\n\n    ::v-deep table {\n      margin: 0;\n\n      .cell {\n        display: flex;\n        flex-wrap: wrap;\n      }\n      .el-table__expand-column .cell {\n        display: block;\n      }\n    }\n  }\n}\n</style>\n',
                ".an-table-wrapper {\n  width: 100%;\n  flex: 1;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n}\n.an-table-wrapper .an-table {\n  flex: 1;\n  overflow-y: auto;\n}\n.an-table-wrapper .an-table-no-overflow-y {\n  overflow-y: hidden;\n}\n.an-table-wrapper .an-table-footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.an-table-wrapper .an-table ::v-deep table {\n  margin: 0;\n}\n.an-table-wrapper .an-table ::v-deep table .cell {\n  display: flex;\n  flex-wrap: wrap;\n}\n.an-table-wrapper .an-table ::v-deep table .el-table__expand-column .cell {\n  display: block;\n}\n\n/*# sourceMappingURL=index.vue.map */",
              ],
            },
            media: void 0,
          });
      },
      b,
      "data-v-2959deb9",
      false,
      undefined,
      !1,
      i,
      void 0,
      void 0
    ),
  ],
  v = {
    install: async function(e, n = {}) {
      const { isUseElement: t } = n;
      if (t) {
        const n = await import("element-ui");
        e.use(n);
      }
      y.forEach((n) => {
        n.name && e.component(n.name, n);
      });
    },
  };
export { v as default };
