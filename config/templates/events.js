// eslint-disable-next-line @typescript-eslint/no-var-requires
const { mdclean, EMPTY_VALUE } = require("./utils");

const parameterTemplateString = `{name}: <code>{type}</code> — {description}
  `;

const tmpl = events => {
  let ret = "";
  events.forEach(evt => {
    const { description = "", properties = [], ...e } = evt;

    let parameterString = EMPTY_VALUE;
    if (properties && properties.length > 0) {
      const filterProperties = properties.filter(
        property => property.name && !property.name.includes("<anonymous1>") && property.name
      );

      parameterString = filterProperties.map(property =>
        parameterTemplateString.replace(/{(\S+)}/g, (match, key) => {
          if (key === "type" && property[key]) {
            return typeof property[key]["names"] !== undefined
              ? property[key]["names"]
              : EMPTY_VALUE;
          } else if (key === "description") {
            /* 取不到description 取 name */
            return typeof property[key] !== "undefined"
              ? property[key] || property.name
              : EMPTY_VALUE;
          } else {
            return typeof property[key] !== "undefined" ? property[key] : EMPTY_VALUE;
          }
        })
      );
      parameterString = parameterString.join("");
    }
    // const t = e.type && e.type.names ? e.type.names.join(' ') : ''
    ret += `| ${mdclean(e.name)} | ${mdclean(description) || EMPTY_VALUE} | ${mdclean(
      parameterString
    ) || EMPTY_VALUE} \n`;
  });
  return ret;
};

module.exports = (events, opt) => {
  return `
${opt.isSubComponent || opt.hasSubComponents ? "#" : ""}## Events

  | Event name | Description | Arguments |
  | ------------- | ------------- | -------------|
  ${tmpl(events)}
`;
};
