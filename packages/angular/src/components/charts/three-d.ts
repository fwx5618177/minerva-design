import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  input,
  output,
} from "@angular/core";
import {
  createChart3D,
  type Bar3DSeries,
  type Chart3DAxisOptions,
  type Chart3DCameraOptions,
  type Chart3DCameraState,
  type Chart3DColorBarOptions,
  type Chart3DColorScale,
  type Chart3DHoverEvent,
  type Chart3DInstance,
  type Chart3DLegendOptions,
  type Chart3DOptions,
  type Chart3DSeries,
  type Chart3DTooltipOptions,
  type ChartRendererKind,
  type Line3DSeries,
  type Scatter3DSeries,
  type Surface3DContourOptions,
  type Surface3DSeries,
  type Surface3DWireframeOptions,
} from "minerva-design/charts/core";
import { CHART_SURFACE, MnChartEngine } from "./engine";

/**
 * Base of the 3D chart components (engine `createChart3D`): common inputs,
 * hover / click / camera / renderer outputs and the camera methods
 */
@Directive()
export abstract class MnChart3DBase<
  S extends Chart3DSeries,
> extends MnChartEngine<Chart3DOptions, Chart3DInstance> {
  /** Data series; replace the array (or a data array) to update the chart */
  readonly series = input.required<readonly S[]>();
  /** X axis (width of the box) */
  readonly xAxis = input<Chart3DAxisOptions | undefined>(undefined);
  /** Y axis (depth of the box) */
  readonly yAxis = input<Chart3DAxisOptions | undefined>(undefined);
  /** Z axis (height of the box) */
  readonly zAxis = input<Chart3DAxisOptions | undefined>(undefined);
  /** Initial camera, also restored by a double click */
  readonly camera = input<Chart3DCameraOptions | undefined>(undefined);
  /** Turns the camera around the box: `true` at 12°/s or a speed in degrees per second */
  readonly autoRotate = input<boolean | number | undefined>(undefined);
  /** Colors of `colorBy: "z"` / `"value"`: a built-in ramp or CSS colors (default `viridis`) */
  readonly colorScale = input<Chart3DColorScale | undefined>(undefined);
  /** Color bar; shown by default when a visible series uses the color scale */
  readonly colorBar = input<boolean | Chart3DColorBarOptions | undefined>(
    undefined,
  );
  /** Legend; shown by default when several series have a name */
  readonly legend = input<boolean | Chart3DLegendOptions | undefined>(
    undefined,
  );
  /** Tooltip; `false` disables it */
  readonly tooltip = input<boolean | Chart3DTooltipOptions | undefined>(
    undefined,
  );
  /** BCP 47 locale of the texts and numbers the engine writes; the runtime's default locale by default */
  readonly locale = input<string | undefined>(undefined);
  /** Other engine options (`Chart3DOptions`: aspect, box, valueRange, interaction, lighting, renderer, palette...) */
  readonly options = input<Partial<Omit<Chart3DOptions, "series">> | undefined>(
    undefined,
  );

  /** The hovered point, cell or bar changed (`null`: none) */
  readonly hover = output<Chart3DHoverEvent | null>();
  /** A point, cell or bar was clicked */
  readonly pointClick = output<Chart3DHoverEvent>();
  /** The user rotated, zoomed, panned or reset the camera */
  readonly cameraChange = output<Chart3DCameraState>();
  /** The backend is ready (or fell back after a GPU loss) */
  readonly rendererChange = output<ChartRendererKind>();

  protected abstract typed(series: readonly S[]): Chart3DSeries[];

  protected override defaultHeight(): number {
    return 400;
  }

  protected createEngine(
    container: HTMLElement,
    options: Chart3DOptions,
  ): Chart3DInstance {
    return createChart3D(container, options);
  }

  protected engineOptions(): Chart3DOptions {
    return {
      ...this.options(),
      series: this.typed(this.series()),
      xAxis: this.xAxis() ?? this.options()?.xAxis,
      yAxis: this.yAxis() ?? this.options()?.yAxis,
      zAxis: this.zAxis() ?? this.options()?.zAxis,
      camera: this.camera() ?? this.options()?.camera,
      autoRotate: this.autoRotate() ?? this.options()?.autoRotate,
      colorScale: this.colorScale() ?? this.options()?.colorScale,
      colorBar: this.colorBar() ?? this.options()?.colorBar,
      legend: this.legend() ?? this.options()?.legend,
      tooltip: this.tooltip() ?? this.options()?.tooltip,
      locale: this.locale() ?? this.options()?.locale,
    };
  }

  protected override bindEngine(chart: Chart3DInstance) {
    return [
      chart.on("hover", (e) => this.hover.emit(e)),
      chart.on("click", (e) => this.pointClick.emit(e)),
      chart.on("camera", (c) => this.cameraChange.emit(c)),
      chart.on("renderer", (r) => this.rendererChange.emit(r)),
    ];
  }

  /** Restores the camera of the `camera` input */
  resetCamera(): void {
    this.instance()?.resetCamera();
  }

  /** Current camera, `null` before the first render */
  getCamera(): Chart3DCameraState | null {
    return this.instance()?.getCamera() ?? null;
  }

  /** Moves the camera */
  setCamera(camera: Partial<Chart3DCameraState>): void {
    this.instance()?.setCamera(camera);
  }

  /** Backend in use, `null` until ready */
  getRenderer(): ChartRendererKind | null {
    return this.instance()?.getRenderer() ?? null;
  }
}

/**
 * 3D scatter plot: point clouds of up to millions of points on the GPU,
 * colored per series, per point or through a color scale; orbit camera,
 * hover picking and color bar
 */
@Component({
  selector: "mn-scatter-3d-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnScatter3DChart extends MnChart3DBase<Scatter3DSeries> {
  protected typed(series: readonly Scatter3DSeries[]): Chart3DSeries[] {
    return series.map((s) => ({ ...s, type: "scatter" as const }));
  }
}

/** 3D polylines (trajectories, paths), optionally colored along the line */
@Component({
  selector: "mn-line-3d-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnLine3DChart extends MnChart3DBase<Line3DSeries> {
  protected typed(series: readonly Line3DSeries[]): Chart3DSeries[] {
    return series.map((s) => ({ ...s, type: "line" as const }));
  }
}

/**
 * 3D surface `z = f(x, y)` over a regular grid: lit, colored by a color
 * map, with an optional wireframe, contour lines and transparency
 */
@Component({
  selector: "mn-surface-3d-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnSurface3DChart extends MnChart3DBase<Surface3DSeries> {
  /** Wireframe of the series that do not set one */
  readonly wireframe = input<boolean | Surface3DWireframeOptions | undefined>(
    undefined,
  );
  /** Contour lines of the series that do not set them */
  readonly contours = input<boolean | Surface3DContourOptions | undefined>(
    undefined,
  );

  protected typed(series: readonly Surface3DSeries[]): Chart3DSeries[] {
    const wireframe = this.wireframe();
    const contours = this.contours();
    return series.map((s) => ({
      ...s,
      type: "surface" as const,
      wireframe: s.wireframe ?? wireframe,
      contours: s.contours ?? contours,
    }));
  }
}

/** 3D bars over an x × y category grid, lit, stacked across series */
@Component({
  selector: "mn-bar-3d-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: CHART_SURFACE,
})
export class MnBar3DChart extends MnChart3DBase<Bar3DSeries> {
  /** Width of the bars of the series that do not set one, as a fraction of a cell */
  readonly barWidth = input(0.7);

  protected typed(series: readonly Bar3DSeries[]): Chart3DSeries[] {
    const barWidth = this.barWidth();
    return series.map((s) => ({
      ...s,
      type: "bar" as const,
      barWidth: s.barWidth ?? barWidth,
    }));
  }
}
