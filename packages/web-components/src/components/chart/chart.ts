import { property } from "lit/decorators.js";
import {
  createChart,
  type ChartDragEvent,
  type ChartHoverEvent,
  type ChartInstance,
  type ChartOptions,
  type ChartPlotClickEvent,
  type ChartRendererKind,
  type ChartView,
} from "minerva-design/charts/core";
import { MinervaEngineElement } from "./engine-element";

/**
 * Base of the cartesian chart elements (engine `createChart`): forwards the
 * engine events as `minerva-*` events and exposes the zoom methods.
 *
 * @fires minerva-hover - The hovered (or keyboard-focused) points changed; detail: { x, xLabel, items }, `null` when nothing is hovered
 * @fires minerva-point-click - A point or a bar was clicked; detail: { x, xLabel, items }
 * @fires minerva-plot-click - The plot area was clicked where there is no point; detail: { x, y }
 * @fires minerva-zoom - The user zoomed or panned; detail: { x, y } (the visible ranges)
 * @fires minerva-renderer-change - The backend is ready (or fell back after a GPU loss); detail: { renderer }
 */
export abstract class MinervaCartesianChartElement extends MinervaEngineElement<
  ChartOptions,
  ChartInstance
> {
  /** Height of the chart, the legend included: pixels or any CSS length */
  @property()
  override height?: string | number = 320;

  protected createEngine(
    container: HTMLElement,
    options: ChartOptions,
  ): ChartInstance {
    return createChart(container, options);
  }

  protected override bindEngine(chart: ChartInstance): Array<() => void> {
    return [
      chart.on("hover", (event) => this.emit("minerva-hover", event)),
      chart.on("click", (event) => this.pointClicked(event)),
      chart.on("plotClick", (event) => this.plotClicked(event)),
      chart.on("zoom", (view) => this.emit("minerva-zoom", view)),
      chart.on("renderer", (renderer) =>
        this.emit("minerva-renderer-change", { renderer }),
      ),
      chart.on("drag", (event) => this.pointDragged?.(event)),
      chart.on("drop", (event) => this.pointDropped?.(event)),
    ];
  }

  protected pointClicked(event: ChartHoverEvent): void {
    this.emit("minerva-point-click", event);
  }

  protected plotClicked(event: ChartPlotClickEvent): void {
    this.emit("minerva-plot-click", event);
  }

  protected pointDragged?(event: ChartDragEvent): void;

  protected pointDropped?(event: ChartDragEvent): void;

  /** Shows the whole data range */
  resetZoom(): void {
    this.instance?.resetZoom();
  }

  /** Visible range, `null` before the engine is created */
  getView(): ChartView | null {
    return this.instance?.getView() ?? null;
  }

  /** Sets the visible range */
  setView(view: Partial<ChartView>): void {
    this.instance?.setView(view);
  }

  /** Backend in use (`webgpu`, `webgl2`, `webgl`, `canvas2d`), `null` until ready */
  getRenderer(): ChartRendererKind | null {
    return this.instance?.getRenderer() ?? null;
  }
}

/**
 * GPU chart of `minerva-design/charts/core` (WebGPU, then WebGL2, WebGL,
 * Canvas2D) mixing line, area, bar, scatter, candlestick and heatmap
 * series: the `<Chart>` of React. Set the engine options (`ChartOptions`:
 * `series`, `xAxis`, `yAxis`, `legend`, `tooltip`, `annotations`...) as
 * the `options` property; replace the object (or a `data` array) to update
 * the chart. Zoomable, keyboard accessible and themed by the Minerva CSS
 * variables of its scope.
 *
 * Published as the optional entry `minerva-design/web-components/chart`
 * (not part of the all-in-one entry nor the CDN bundle: it loads the chart
 * engine `minerva-design/charts/core`).
 *
 * @summary GPU chart of any mix of series, configured by the engine options.
 * @tag minerva-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaChart extends MinervaCartesianChartElement {
  static override tagName = "minerva-chart";

  /** Engine options (`ChartOptions` of minerva-design/charts/core); property only */
  @property({ attribute: false })
  options?: ChartOptions;

  protected engineOptions(): ChartOptions | null {
    return this.options ?? null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-chart": MinervaChart;
  }
}
