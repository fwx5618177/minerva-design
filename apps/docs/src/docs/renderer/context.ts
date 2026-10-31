// Kept free of engine imports: DemoBlock (on every page) reads the context,
// the engine is only loaded by the lazy RendererScope of chart pages.
import { createContext } from "react";
import type { ChartRendererPreference } from "minerva-design/charts/core";
import type { DocCategory } from "../registry";

/** Categories whose pages get the renderer bar and the per-demo badges */
export const RENDERER_CATEGORIES: readonly DocCategory[] = [
  "charts",
  "financeCharts",
  "charts3d",
  "graphCharts",
  "chartEngine",
  "icons",
];

/**
 * What the bar of a page switches: the charts, or the canvas icons (icon
 * pages; the same stored choice drives both, see store.ts)
 */
export type RendererTopic = "charts" | "icons";

export const RendererTopicContext = createContext<RendererTopic>("charts");

/**
 * The page-wide chart renderer (null outside chart pages), shown by the demo
 * badges. The charts follow it by themselves through the engine's default.
 */
export const ChartRendererContext =
  createContext<ChartRendererPreference | null>(null);
