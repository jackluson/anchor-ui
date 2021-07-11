const fs = require("fs");
const path = require("path");

module.exports = {
  componentsRoot: "src", // the folder where CLI will start searching for components.
  components: "{components,}/**/index.vue", // the glob to define what files should be documented as components (relative to componentRoot)
  outDir: "docs", // folder to save components docs in (relative to the current working directry)
  getDocFileName: (componentPath) => {
    const readMePath = path.resolve(
      path.dirname(componentPath.replace("src", "examples")), // “\”mac 与window 是不一样的
      "Readme.md"
    );
    console.log(readMePath);
    const isExistReadMeFile = fs.existsSync(readMePath);
    console.log(
      "🚀 ~ file: docgen.config.js ~ line 16 ~ isExistReadMeFile",
      isExistReadMeFile
    );
    return isExistReadMeFile ? readMePath : undefined;
  }, // specify the name of the input md file
  getDestFile: (file, config) => {
    return path.resolve(config.outDir, file).replace(/\.vue$/, ".md");
  },
  templates: {
    slots: require("./config/templates/slots"),
    events: require("./config/templates/events"),
  },
};
