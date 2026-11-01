// minerva-design/taro/icons: the Taro components of the Minerva icon set
// (`Icon`, `DynamicIcon`, `createIcon` and one component per icon:
// `SearchIcon`…), drawn as base64 SVG images (mini programs have no inline
// SVG), on top of the framework-free core (minerva-design/icons/core,
// re-exported here). Kept out of `minerva-design/taro` so that apps without
// these icons never bundle the icon set.

export { Icon } from "./icon/Icon";
export { DynamicIcon } from "./icon/DynamicIcon";
export { createIcon } from "./icon/createIcon";
export * from "./icon/icons";
export type { DynamicIconProps, IconProps, NamedIconProps } from "./icon/types";
export * from "@minerva/icons/core";
