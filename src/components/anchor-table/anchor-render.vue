<script>
export default {
  name: "AnchorRender",
  functional: true,
  props: {
    scope: Object,
    render: Function,
  },
  render: (h, ctx) => {
    const renderResult = ctx.props.render(h, ctx.props.scope);
    const VNode = h("span", "").constructor; // get VNode constructor
    return renderResult instanceof VNode ? (
      renderResult
    ) : (
      <span>{renderResult}</span>
    );
  },
};
</script>
