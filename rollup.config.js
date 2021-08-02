import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import vue from "rollup-plugin-vue";
import postcss from "rollup-plugin-postcss";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import args from "yargs";

import pkg from "./package.json";

const argv = args.argv;

const EXTERNAL = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
  "element-ui",
];
// const CJS_AND_ES_EXTERNALS = EXTERNAL.concat(/@babel\/runtime/);
const vuepressLibPath = "docs/.vuepress/public/lib/anchor-ui";
const outputDict = {
  browser: argv.lib
    ? pkg.browser.replace("build", vuepressLibPath)
    : pkg.browser,
  main: argv.lib ? pkg.main.replace("build", vuepressLibPath) : pkg.main,
  module: argv.lib ? pkg.module.replace("build", vuepressLibPath) : pkg.module,
};
export default [
  // browser-friendly UMD build
  {
    input: "src/main.js",
    output: [
      {
        name: "AnchorUI",
        file: outputDict.browser,
        format: "umd",
        globals: {
          vue: "Vue",
          "element-ui": "ELEMENT",
        },
      },
      { file: outputDict.main, format: "cjs" },
      { file: outputDict.module, format: "es" },
    ],
    external: EXTERNAL,
    plugins: [
      resolve({
        extensions: [".vue"],
      }),
      vue({
        // preprocessStyles: true,
        css: true,
        compileTemplate: true,
      }),
      postcss(),
      commonjs(),
      babel({
        babelHelpers: "runtime",
        presets: ["@vue/babel-preset-jsx"],
        plugins: ["@babel/plugin-transform-runtime"],
        exclude: "**/node_modules/**",
      }),
      terser(),
    ],
  },
  // {
  //   input: "src/main.js",
  //   external: EXTERNAL,
  //   output: [
  //     { file: pkg.main, format: "cjs" },
  //     { file: pkg.module, format: "es" },
  //   ],
  // },
];
