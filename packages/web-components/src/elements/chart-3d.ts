// Registers the 3D chart elements (<minerva-scatter-3d-chart>,
// <minerva-line-3d-chart>, <minerva-surface-3d-chart>,
// <minerva-bar-3d-chart>). Optional entry: not part of the all-in-one entry
// nor of the CDN bundle, since it loads the 3D engine of
// minerva-design/charts/core (shared with the other renderers).
import {
  MinervaBar3DChart,
  MinervaLine3DChart,
  MinervaScatter3DChart,
  MinervaSurface3DChart,
} from "../components/chart-3d/chart-3d";
import { defineElement } from "../internal/define";

for (const element of [
  MinervaScatter3DChart,
  MinervaLine3DChart,
  MinervaSurface3DChart,
  MinervaBar3DChart,
]) {
  defineElement(element);
}

export * from "../components/chart-3d/chart-3d";
// the engine types used with the elements (the rest: minerva-design/charts/core)
export type {
  Bar3DSeries,
  Chart3DCameraState,
  Chart3DHoverEvent,
  Chart3DInstance,
  Chart3DOptions,
  Line3DSeries,
  Scatter3DSeries,
  Surface3DSeries,
} from "minerva-design/charts/core";
