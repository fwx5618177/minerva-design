import {
  CubeIcon,
  LayersIcon,
  BrandAngularIcon,
  BrandHtml5Icon,
  BrandReactIcon,
  BrandSolidIcon,
  BrandSvelteIcon,
  BrandVueIcon,
  BrandWechatIcon,
} from "minerva-design/icons";
import type { CSSProperties } from "react";

export const frameworkBrands = {
  react: {
    name: "React",
    Icon: BrandReactIcon,
    color: "#0898bb",
    guide: "installation",
  },
  vue: { name: "Vue", Icon: BrandVueIcon, color: "#269b70", guide: "vue" },
  "react-native": {
    name: "React Native",
    Icon: BrandReactIcon,
    color: "#0898bb",
    guide: "react-native",
  },
  angular: {
    name: "Angular",
    Icon: BrandAngularIcon,
    color: "#ed426b",
    guide: "angular",
  },
  taro: {
    name: "Taro",
    Icon: CubeIcon,
    color: "#6388f0",
    guide: "platform-support",
  },
  uni: {
    name: "uni-app",
    Icon: LayersIcon,
    color: "#36a76b",
    guide: "platform-support",
  },
  weapp: {
    name: "WeChat",
    Icon: BrandWechatIcon,
    color: "#18ad63",
    guide: "platform-support",
  },
  svelte: {
    name: "Svelte",
    Icon: BrandSvelteIcon,
    color: "#ef653d",
    guide: "wc-svelte",
  },
  solid: {
    name: "Solid",
    Icon: BrandSolidIcon,
    color: "#589bd1",
    guide: "web-components",
  },
  html: {
    name: "HTML",
    Icon: BrandHtml5Icon,
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
