import Vue from "vue";
//import PeaUI from "./addons/register";

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

const isDev = process.env.NODE_ENV === "development";

if (isDev) {
  Vue.prototype.$log = console.log; // 便于在开发阶段在template上log信息
}
export default async ({ isServer }) => {
  if (!isServer) {
    const elementUI = await import("element-ui");
    Vue.use(elementUI);
    const peaUI = await import("@jackluson/ui");
    console.log("peaUI", peaUI);
    Vue.use(peaUI);
  }
};
