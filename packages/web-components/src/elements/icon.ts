// Registers <minerva-icon> and <minerva-icon-canvas>. Optional entry: not
// part of the all-in-one entry nor of the CDN bundle, since it loads the
// icon set (minerva-design/icons/core, shared with the React icons).
import { MinervaIcon } from "../components/icon/icon";
import { MinervaIconCanvas } from "../components/icon/icon-canvas";
import { defineElement } from "../internal/define";

defineElement(MinervaIcon);
defineElement(MinervaIconCanvas);

export * from "../components/icon/icon";
export * from "../components/icon/icon-canvas";
export type {
  IconCanvasRenderer,
  IconRenderer,
} from "../components/icon/renderer";
// the icon types used with the elements (the rest: minerva-design/icons/core)
export type {
  IconCanvasItem,
  IconDefinition,
  IconRendererKind,
  IconRendererPreference,
} from "minerva-design/icons/core";
