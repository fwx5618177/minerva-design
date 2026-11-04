// Registers <minerva-quadrant-task-board> (and the elements it renders:
// <minerva-quadrant-chart>, <minerva-modal>, <minerva-confirm-dialog>,
// <minerva-icon-button>, <minerva-input>, <minerva-select>, <minerva-button>).
// Optional entry: not part of the all-in-one entry nor of cdn/minerva.js,
// since it loads the chart engine (minerva-design/charts/core, shared with
// the chart entry and the other renderers); its CDN file is
// cdn/quadrant-task-board.js.
import { MinervaQuadrantTaskBoard } from "../components/quadrant-task-board/quadrant-task-board";
import { defineElement } from "../internal/define";

defineElement(MinervaQuadrantTaskBoard);

export * from "../components/quadrant-task-board/quadrant-task-board";
// the engine types used with the element (the rest: minerva-design/charts/core)
export type {
  QuadrantAxisLabels,
  QuadrantCorner,
  QuadrantPoint,
  QuadrantRegions,
} from "minerva-design/charts/core";
