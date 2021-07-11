const { mdclean, EMPTY_VALUE } = require("./utils");

const slotPropsTemplateString = `\`{name}\` : <span class="badge warning">{type}</span> —> {description}
`;

const slotFun = (slots, opt) => {
  return `
${opt.isSubComponent || opt.hasSubComponents ? "#" : ""}## Slots

| Name          | Description  | slotProps |
| ------------- | ------------ | -------- |
${slots
  .map((slot) => {
    const { description: d, bindings = [], name } = slot;
    let slotPropsString;
    const filterBindings = bindings.filter((binding) => {
      const { name = "", description } = binding;
      return (name !== "slot" || description) && name;
    });
    if (filterBindings && filterBindings.length > 0) {
      slotPropsString = filterBindings.map((binding) =>
        slotPropsTemplateString.replace(/{(\S+)}/g, (match, key) => {
          if (key === "type" && binding[key]) {
            return typeof binding[key]["name"] !== undefined
              ? binding[key]["name"]
              : EMPTY_VALUE;
          } else {
            return typeof binding[key] !== "undefined"
              ? binding[key]
              : EMPTY_VALUE;
          }
        })
      );
      slotPropsString = slotPropsString.join("");
    }
    const readableBindings = slotPropsString || EMPTY_VALUE;
    return `| ${mdclean(name)} | ${mdclean(d || EMPTY_VALUE)} | ${mdclean(
      readableBindings
    )} |`; // remplace returns by <br> to allow them in a table cell
  })
  .join("\n")}
`;
};

module.exports = slotFun;
