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
];

/**
 * The page-wide chart renderer (null outside chart pages). Demo blocks key
 * their preview by it, so every demo remounts with the new default.
 */
export const ChartRendererContext =
  createContext<ChartRendererPreference | null>(null);
