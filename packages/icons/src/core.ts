// minerva-design/icons/core: the framework-free icon set. Importing it has no
// side effects and touches no browser API until something is drawn: icon
// data, SVG strings, Canvas2D drawing, and GPU canvases (WebGPU, WebGL2,
// WebGL, falling back to Canvas2D).

export * from "./engine/icons";
export { getIcon, iconCategories, icons, searchIcons } from "./engine/registry";
export { defineIcon } from "./engine/define";
export { iconPathData, toSvg, toSvgDataUri } from "./engine/svg";
export { drawIcon, type IconDrawingContext } from "./engine/canvas2d";
export {
  flattenIconPath,
  parseIconPath,
  type IconPathCommand,
  type IconPolyline,
} from "./engine/path";
export { tessellateIcon, type IconMeshOptions } from "./engine/tessellate";
export { createIconCanvas } from "./engine/icon-canvas";
export { createIconSurface } from "./engine/surface";
export {
  ICON_RENDERER_PREFERENCES,
  getDefaultIconRenderer,
  setDefaultIconRenderer,
  subscribeDefaultIconRenderer,
} from "./engine/defaults";
export {
  ICON_RENDERER_ORDER,
  iconRendererCandidates,
} from "./engine/renderers/detect";
export type {
  DrawIconOptions,
  IconCanvasController,
  IconCanvasItem,
  IconCanvasOptions,
  IconCategory,
  IconDefinition,
  IconRendererKind,
  IconRendererPreference,
  IconStyle,
  IconSurface,
  IconSurfaceOptions,
  IconSvgOptions,
} from "./engine/types";
