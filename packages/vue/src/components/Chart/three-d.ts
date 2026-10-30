import type { PropType } from "vue";
import {
  createChart3D,
  type Chart3DAxisOptions,
  type Chart3DCameraOptions,
  type Chart3DCameraState,
  type Chart3DColorBarOptions,
  type Chart3DColorScale,
  type Chart3DHoverEvent,
  type Chart3DInstance,
  type Chart3DInteractionOptions,
  type Chart3DLegendOptions,
  type Chart3DLightingOptions,
  type Chart3DOptions,
  type Chart3DSeries,
  type Chart3DTooltipOptions,
  type ChartRendererKind,
  type ChartRendererPreference,
} from "minerva-design/charts/core";
import { raw, useChartEngine, useRootStyle } from "./engine";
import { chartFrameProps } from "./props";
import type { Chart3DHandle } from "./types";

/** Props shared by the 3D chart components (engine `createChart3D`) */
export const chart3DCommonProps = {
  ...chartFrameProps,
  /** X axis (width of the box) */
  xAxis: Object as PropType<Chart3DAxisOptions>,
  /** Y axis (depth of the box) */
  yAxis: Object as PropType<Chart3DAxisOptions>,
  /** Z axis (height of the box) */
  zAxis: Object as PropType<Chart3DAxisOptions>,
  /** Initial camera, also restored by a double click (changing it moves the camera) */
  camera: Object as PropType<Chart3DCameraOptions>,
  /** Turns the camera around the box: `true` at 12°/s or a speed in degrees per second (default `false`) */
  autoRotate: {
    type: [Boolean, Number] as PropType<boolean | number>,
    default: undefined,
  },
  /** Proportions of the box (x, y, z; default `[1, 1, 0.7]`) */
  aspect: Array as unknown as PropType<readonly [number, number, number]>,
  /** Draws the axis box: back walls, grid lines, tick labels and axis titles (default `true`) */
  box: { type: Boolean, default: undefined },
  /** Colors of `colorBy: "z"` / `"value"`: a built-in ramp or CSS colors (default `viridis`) */
  colorScale: [String, Array] as PropType<Chart3DColorScale>,
  /** Values mapped to the ends of the color scale; the data range by default */
  valueRange: Array as unknown as PropType<readonly [number, number]>,
  /** Color bar; shown by default when a visible series uses the color scale */
  colorBar: {
    type: [Boolean, Object] as PropType<boolean | Chart3DColorBarOptions>,
    default: undefined,
  },
  /** Legend; shown by default when several series have a name */
  legend: {
    type: [Boolean, Object] as PropType<boolean | Chart3DLegendOptions>,
    default: undefined,
  },
  /** Tooltip; `false` disables it */
  tooltip: {
    type: [Boolean, Object] as PropType<boolean | Chart3DTooltipOptions>,
    default: undefined,
  },
  /** Drag rotates, right / Shift + drag pans, Ctrl / ⌘ + wheel and pinch zoom; `false` makes the chart static (default `true`) */
  interaction: {
    type: [Boolean, Object] as PropType<boolean | Chart3DInteractionOptions>,
    default: undefined,
  },
  /** Lighting of the surfaces and bars */
  lighting: Object as PropType<Chart3DLightingOptions>,
  /** Backend of the data layer: WebGPU, then WebGL2, WebGL, Canvas2D (default `auto`) */
  renderer: String as PropType<ChartRendererPreference>,
  /** Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors) */
  palette: Array as PropType<readonly string[]>,
  /** Accessible name of the chart */
  ariaLabel: String,
  /** BCP 47 locale of the texts and numbers the engine writes (tooltip, axes); the page language by default */
  locale: String,
  /** Overrides of the built-in texts of the `locale` */
  labels: Object as PropType<Chart3DOptions["labels"]>,
};

/** Engine events forwarded by a 3D chart */
export interface Chart3DHandlers {
  hover: (event: Chart3DHoverEvent | null) => void;
  click: (event: Chart3DHoverEvent) => void;
  camera: (camera: Chart3DCameraState) => void;
  renderer: (renderer: ChartRendererKind) => void;
}

interface Common3DProps {
  deep?: boolean;
  width?: number | string;
  height?: number | string;
  xAxis?: Chart3DAxisOptions;
  yAxis?: Chart3DAxisOptions;
  zAxis?: Chart3DAxisOptions;
  camera?: Chart3DCameraOptions;
  autoRotate?: boolean | number;
  aspect?: readonly [number, number, number];
  box?: boolean;
  colorScale?: Chart3DColorScale;
  valueRange?: readonly [number, number];
  colorBar?: boolean | Chart3DColorBarOptions;
  legend?: boolean | Chart3DLegendOptions;
  tooltip?: boolean | Chart3DTooltipOptions;
  interaction?: boolean | Chart3DInteractionOptions;
  lighting?: Chart3DLightingOptions;
  renderer?: ChartRendererPreference;
  palette?: readonly string[];
  ariaLabel?: string;
  locale?: string;
  labels?: Chart3DOptions["labels"];
}

/** Engine (`createChart3D`), root style and template handle of a 3D chart */
export function useChart3D(
  props: Common3DProps,
  series: () => Chart3DSeries[],
  handlers: Chart3DHandlers,
) {
  const { setContainer, instance } = useChartEngine<
    Chart3DOptions,
    Chart3DInstance
  >(
    createChart3D,
    props,
    () => ({
      series: series(),
      xAxis: raw(props.xAxis),
      yAxis: raw(props.yAxis),
      zAxis: raw(props.zAxis),
      camera: raw(props.camera),
      autoRotate: props.autoRotate,
      aspect: raw(props.aspect),
      box: props.box,
      colorScale: raw(props.colorScale),
      valueRange: raw(props.valueRange),
      colorBar: raw(props.colorBar),
      legend: raw(props.legend),
      tooltip: raw(props.tooltip),
      interaction: raw(props.interaction),
      lighting: raw(props.lighting),
      renderer: props.renderer,
      palette: raw(props.palette),
      ariaLabel: props.ariaLabel,
      locale: props.locale,
      labels: raw(props.labels),
    }),
    (chart) => [
      chart.on("hover", (e) => handlers.hover(e)),
      chart.on("click", (e) => handlers.click(e)),
      chart.on("camera", (c) => handlers.camera(c)),
      chart.on("renderer", (r) => handlers.renderer(r)),
    ],
  );
  const handle: Chart3DHandle = {
    resetCamera: () => instance.value?.resetCamera(),
    getCamera: () => instance.value?.getCamera() ?? null,
    setCamera: (camera) => instance.value?.setCamera(camera),
    getRenderer: () => instance.value?.getRenderer() ?? null,
    getInstance: () => instance.value,
  };
  return { setContainer, rootStyle: useRootStyle(props, 400), handle };
}
