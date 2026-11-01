// minerva-design/native/icons: the React Native components of the Minerva
// icon set (`Icon`, `DynamicIcon`, `createIcon` and one component per icon:
// `SearchIcon`…), drawn with react-native-svg, on top of the framework-free
// core (minerva-design/icons/core, re-exported here). Kept out of
// `minerva-design/native` so that apps without react-native-svg still bundle.

export { Icon } from "./icon/Icon";
export { DynamicIcon } from "./icon/DynamicIcon";
export { createIcon } from "./icon/createIcon";
export * from "./icon/icons";
export type { DynamicIconProps, IconProps, NamedIconProps } from "./icon/types";
export * from "@minerva/icons/core";
