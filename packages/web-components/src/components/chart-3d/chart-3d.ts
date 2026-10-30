import { property } from "lit/decorators.js";
import {
  createChart3D,
  type Bar3DSeries,
  type Chart3DCameraState,
  type Chart3DInstance,
  type Chart3DOptions,
  type Chart3DSeries,
  type ChartRendererKind,
  type Line3DSeries,
  type Scatter3DSeries,
  type Surface3DContourOptions,
  type Surface3DSeries,
  type Surface3DWireframeOptions,
} from "minerva-design/charts/core";
import { MinervaEngineElement } from "../chart/engine-element";

/** Engine options other than the series (axes, camera, color scale, legend, tooltip...) */
export type Chart3DBaseOptions = Partial<Omit<Chart3DOptions, "series">>;

/**
 * Base of the 3D chart elements (engine `createChart3D` of
 * `minerva-design/charts/core`): forwards the engine events as `minerva-*`
 * events and exposes the camera.
 *
 * @fires minerva-hover - The hovered point, cell or bar changed; detail: { seriesIndex, seriesName, type, index, x, y, z, value, color, label }, `null` when nothing is hovered
 * @fires minerva-point-click - A point, cell or bar was clicked; detail: { seriesIndex, seriesName, type, index, x, y, z, value, color, label }
 * @fires minerva-camera-change - The user rotated, zoomed, panned or reset the camera; detail: { azimuth, elevation, zoom, pan, projection }
 * @fires minerva-renderer-change - The backend is ready (or fell back after a GPU loss); detail: { renderer }
 */
export abstract class MinervaChart3DElement<
  S extends Chart3DSeries,
> extends MinervaEngineElement<Chart3DOptions, Chart3DInstance> {
  /** Height of the chart, the legend included: pixels or any CSS length */
  @property()
  override height?: string | number = 400;

  /** Data series; replace the array (or a data array) to update the chart; property only */
  @property({ attribute: false })
  series?: readonly S[];

  /** Other engine options (`Chart3DOptions`: xAxis, yAxis, zAxis, camera, autoRotate, colorScale, colorBar, legend, tooltip, locale...); property only */
  @property({ attribute: false })
  options?: Chart3DBaseOptions;

  protected abstract typed(series: readonly S[]): Chart3DSeries[];

  protected createEngine(
    container: HTMLElement,
    options: Chart3DOptions,
  ): Chart3DInstance {
    return createChart3D(container, options);
  }

  protected engineOptions(): Chart3DOptions | null {
    if (!this.series) return null;
    return { ...this.options, series: this.typed(this.series) };
  }

  protected override bindEngine(chart: Chart3DInstance): Array<() => void> {
    return [
      chart.on("hover", (e) => this.emit("minerva-hover", e)),
      chart.on("click", (e) => this.emit("minerva-point-click", e)),
      chart.on("camera", (camera) =>
        this.emit("minerva-camera-change", camera),
      ),
      chart.on("renderer", (renderer) =>
        this.emit("minerva-renderer-change", { renderer }),
      ),
    ];
  }

  /** Restores the camera of the options */
  resetCamera(): void {
    this.instance?.resetCamera();
  }

  /** Current camera, `null` before the engine is created */
  getCamera(): Chart3DCameraState | null {
    return this.instance?.getCamera() ?? null;
  }

  /** Moves the camera */
  setCamera(camera: Partial<Chart3DCameraState>): void {
    this.instance?.setCamera(camera);
  }

  /** Backend in use (`webgpu`, `webgl2`, `webgl`, `canvas2d`), `null` until ready */
  getRenderer(): ChartRendererKind | null {
    return this.instance?.getRenderer() ?? null;
  }
}

/**
 * 3D scatter plot of `minerva-design/charts/core` (the `<Scatter3DChart>`
 * of React): point clouds of up to millions of points on the GPU, colored
 * per series, per point or through a color scale; orbit camera, hover
 * picking and color bar.
 *
 * Published as the optional entry `minerva-design/web-components/chart-3d`.
 *
 * @summary GPU 3D point clouds with an orbit camera.
 * @tag minerva-scatter-3d-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaScatter3DChart extends MinervaChart3DElement<Scatter3DSeries> {
  static override tagName = "minerva-scatter-3d-chart";

  protected typed(series: readonly Scatter3DSeries[]): Chart3DSeries[] {
    return series.map((s) => ({ ...s, type: "scatter" as const }));
  }
}

/**
 * 3D polylines of `minerva-design/charts/core` (the `<Line3DChart>` of
 * React): trajectories and paths, optionally colored along the line.
 *
 * Published as the optional entry `minerva-design/web-components/chart-3d`.
 *
 * @summary GPU 3D polylines (trajectories, paths).
 * @tag minerva-line-3d-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaLine3DChart extends MinervaChart3DElement<Line3DSeries> {
  static override tagName = "minerva-line-3d-chart";

  protected typed(series: readonly Line3DSeries[]): Chart3DSeries[] {
    return series.map((s) => ({ ...s, type: "line" as const }));
  }
}

/**
 * 3D surface `z = f(x, y)` of `minerva-design/charts/core` (the
 * `<Surface3DChart>` of React) over a regular grid: lit, colored by a
 * color map, with an optional wireframe, contour lines and transparency.
 *
 * Published as the optional entry `minerva-design/web-components/chart-3d`.
 *
 * @summary GPU 3D surface with wireframe and contour lines.
 * @tag minerva-surface-3d-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaSurface3DChart extends MinervaChart3DElement<Surface3DSeries> {
  static override tagName = "minerva-surface-3d-chart";

  /** Wireframe of the series that do not set one; property only */
  @property({ attribute: false })
  wireframe?: boolean | Surface3DWireframeOptions;

  /** Contour lines of the series that do not set them; property only */
  @property({ attribute: false })
  contours?: boolean | Surface3DContourOptions;

  protected typed(series: readonly Surface3DSeries[]): Chart3DSeries[] {
    return series.map((s) => ({
      ...s,
      type: "surface" as const,
      wireframe: s.wireframe ?? this.wireframe,
      contours: s.contours ?? this.contours,
    }));
  }
}

/**
 * 3D bars of `minerva-design/charts/core` (the `<Bar3DChart>` of React)
 * over an x × y category grid, lit, stacked across series.
 *
 * Published as the optional entry `minerva-design/web-components/chart-3d`.
 *
 * @summary GPU 3D bars over a category grid.
 * @tag minerva-bar-3d-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaBar3DChart extends MinervaChart3DElement<Bar3DSeries> {
  static override tagName = "minerva-bar-3d-chart";

  /** Width of the bars of the series that do not set one, as a fraction of a cell */
  @property({ type: Number, attribute: "bar-width" })
  barWidth = 0.7;

  protected typed(series: readonly Bar3DSeries[]): Chart3DSeries[] {
    return series.map((s) => ({
      ...s,
      type: "bar" as const,
      barWidth: s.barWidth ?? this.barWidth,
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-scatter-3d-chart": MinervaScatter3DChart;
    "minerva-line-3d-chart": MinervaLine3DChart;
    "minerva-surface-3d-chart": MinervaSurface3DChart;
    "minerva-bar-3d-chart": MinervaBar3DChart;
  }
}
