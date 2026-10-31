import type { ReactNode } from "react";
import RendererBar from "./RendererBar";
import {
  ChartRendererContext,
  RendererTopicContext,
  type RendererTopic,
} from "./context";
import { restoreChartRenderer, useChartRenderer } from "./store";

// before the first chart of the page reads the default
restoreChartRenderer();

/**
 * Body of a chart or icon page: the sticky renderer bar, then the content.
 * Every chart and canvas icon with no explicit renderer switches backend
 * live when it changes. Loaded lazily by DocPage so that other pages don't
 * load the chart engine.
 */
export default function RendererScope({
  children,
  topic = "charts",
}: {
  children: ReactNode;
  /** What the bar switches (its wording) */
  topic?: RendererTopic;
}) {
  const renderer = useChartRenderer();
  return (
    <RendererTopicContext.Provider value={topic}>
      <ChartRendererContext.Provider value={renderer}>
        <RendererBar value={renderer} topic={topic} />
        {children}
      </ChartRendererContext.Provider>
    </RendererTopicContext.Provider>
  );
}
