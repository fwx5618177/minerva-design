import type { CSSProperties } from "react";
import { IoCubeOutline, IoLayersOutline } from "react-icons/io5";
import {
  SiAngular,
  SiHtml5,
  SiReact,
  SiSolid,
  SiSvelte,
  SiVuedotjs,
  SiWechat,
} from "react-icons/si";

export const frameworkBrands = {
  react: {
    name: "React",
    Icon: SiReact,
    color: "#0898bb",
    guide: "installation",
  },
  vue: { name: "Vue", Icon: SiVuedotjs, color: "#269b70", guide: "vue" },
  "react-native": {
    name: "React Native",
    Icon: SiReact,
    color: "#0898bb",
    guide: "react-native",
  },
  angular: {
    name: "Angular",
    Icon: SiAngular,
    color: "#ed426b",
    guide: "angular",
  },
  taro: {
    name: "Taro",
    Icon: IoCubeOutline,
    color: "#6388f0",
    guide: "platform-support",
  },
  uni: {
    name: "uni-app",
    Icon: IoLayersOutline,
    color: "#36a76b",
    guide: "platform-support",
  },
  weapp: {
    name: "WeChat",
    Icon: SiWechat,
    color: "#18ad63",
    guide: "platform-support",
  },
  svelte: {
    name: "Svelte",
    Icon: SiSvelte,
    color: "#ef653d",
    guide: "wc-svelte",
  },
  solid: {
    name: "Solid",
    Icon: SiSolid,
    color: "#589bd1",
    guide: "web-components",
  },
  html: {
    name: "HTML",
    Icon: SiHtml5,
    color: "#e87737",
    guide: "wc-plain-html",
  },
} as const;
export type FrameworkBrand = keyof typeof frameworkBrands;
export const nativeFrameworks = [
  "react",
  "vue",
  "react-native",
  "angular",
  "taro",
  "uni",
  "weapp",
] as const;
export const wcFrameworks = ["svelte", "solid", "html"] as const;
export const frameworkStyle = (id: FrameworkBrand) =>
  ({ "--framework-color": frameworkBrands[id].color }) as CSSProperties;
