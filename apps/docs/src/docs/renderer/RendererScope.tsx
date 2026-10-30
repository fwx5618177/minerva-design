import type { ReactNode } from "react";
import RendererBar from "./RendererBar";
import { ChartRendererContext } from "./context";
import { restoreChartRenderer, useChartRenderer } from "./store";

// before the first chart of the page reads the default
restoreChartRenderer();

/**
 * Body of a chart page: the sticky renderer bar, then the content, whose
 * demo blocks remount their preview when the renderer changes. Loaded lazily
 * by DocPage so that other pages don't load the chart engine.
 */
export default function RendererScope({ children }: { children: ReactNode }) {
  const renderer = useChartRenderer();
  return (
    <ChartRendererContext.Provider value={renderer}>
      <RendererBar value={renderer} />
      {children}
    </ChartRendererContext.Provider>
  );
}
