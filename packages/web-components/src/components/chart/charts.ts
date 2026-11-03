import { css, html, nothing, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  QUADRANT_CORNERS,
  createQuadrantPointCard,
  createQuadrantPointLayer,
  heatmapChartOptions,
  quadrantChartOptions,
  quadrantOf,
  sparklineOptions,
  withQuadrantCard,
  type ChartDragEvent,
  type ChartHoverEvent,
  type ChartInstance,
  type ChartOptions,
  type ChartPlotClickEvent,
  type ChartRect,
  type ChartSeries,
  type HeatmapCell,
  type QuadrantAxisLabels,
  type QuadrantConfig,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantPointCard,
  type QuadrantPointCardOptions,
  type QuadrantPointLayer,
  type QuadrantRegions,
} from "minerva-design/charts/core";
import { MinervaCartesianChartElement } from "./chart";
import { MinervaEngineElement } from "./engine-element";
import { withSeriesType } from "./series";

/** Engine options other than the series (axes, legend, tooltip, annotations...) */
export type ChartBaseOptions = Partial<ChartOptions>;

/** Base of the elements drawing `series` with a default series type */
export abstract class SeriesChartElement extends MinervaCartesianChartElement {
  /** Data series (`ChartSeries[]`); each may set its own `type`. Replace the array (or a `data` array) to update the chart; property only */
  @property({ attribute: false })
  series?: readonly ChartSeries[];

  /** Other engine options (`ChartOptions` of minerva-design/charts/core: axes, legend, tooltip, annotations...); property only */
  @property({ attribute: false })
  options?: ChartBaseOptions;

  protected abstract typed(series: readonly ChartSeries[]): ChartSeries[];

  protected stackMode(): ChartOptions["stackMode"] {
    return this.options?.stackMode;
  }

  protected engineOptions(): ChartOptions | null {
    const series = this.series ?? this.options?.series;
    if (!series) return null;
    return {
      ...this.options,
      series: this.typed(series),
      stackMode: this.stackMode(),
    };
  }
}

/**
 * Line chart (or area chart with `area`) of `minerva-design/charts/core`,
 * handling millions of points on the GPU: the `<LineChart>` of React. The
 * series without a `type` are drawn as lines.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU line chart: straight, smooth or stepped, stacked or 100%.
 * @tag minerva-line-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaLineChart extends SeriesChartElement {
  static override tagName = "minerva-line-chart";

  /** Fills the area under the lines */
  @property({ type: Boolean })
  area = false;

  /** Shape of the lines: straight, smooth (monotone) or steps */
  @property()
  curve: "linear" | "smooth" | "step" = "linear";

  /** Stacks the series on top of each other */
  @property({ type: Boolean })
  stacked = false;

  /** Scales the stacks to 100% (implies `stacked`) */
  @property({ type: Boolean })
  percent = false;

  protected typed(series: readonly ChartSeries[]): ChartSeries[] {
    return withSeriesType(
      series,
      this.area ? "area" : "line",
      this.stacked || this.percent ? "stack" : undefined,
      this.curve,
    );
  }

  protected override stackMode(): ChartOptions["stackMode"] {
    return this.percent ? "percent" : super.stackMode();
  }
}

/**
 * Area chart of `minerva-design/charts/core`: smooth by default, stacked or
 * 100% stacked (the `<AreaChart>` of React). The series without a `type`
 * are drawn as areas.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU area chart: smooth, stacked or 100% stacked.
 * @tag minerva-area-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaAreaChart extends SeriesChartElement {
  static override tagName = "minerva-area-chart";

  /** Shape of the edges: straight, smooth (monotone) or steps */
  @property()
  curve: "linear" | "smooth" | "step" = "smooth";

  /** Stacks the areas on top of each other */
  @property({ type: Boolean })
  stacked = false;

  /** Scales the stacks to 100% (implies `stacked`) */
  @property({ type: Boolean })
  percent = false;

  protected typed(series: readonly ChartSeries[]): ChartSeries[] {
    return withSeriesType(
      series,
      "area",
      this.stacked || this.percent ? "stack" : undefined,
      this.curve,
    );
  }

  protected override stackMode(): ChartOptions["stackMode"] {
    return this.percent ? "percent" : super.stackMode();
  }
}

/**
 * Bar chart of `minerva-design/charts/core`: grouped side by side, stacked
 * or 100% stacked, with optional value labels (the `<BarChart>` of React).
 * The series without a `type` are drawn as bars (set `type: "line"` on a
 * series for an overlay).
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU bar chart: grouped, stacked or 100%, with value labels.
 * @tag minerva-bar-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaBarChart extends SeriesChartElement {
  static override tagName = "minerva-bar-chart";

  /** Stacks the bars of every series (otherwise they are grouped side by side) */
  @property({ type: Boolean })
  stacked = false;

  /** Scales the stacks to 100% (implies `stacked`) */
  @property({ type: Boolean })
  percent = false;

  /** Writes the value above every bar */
  @property({ type: Boolean })
  labels = false;

  protected typed(series: readonly ChartSeries[]): ChartSeries[] {
    return withSeriesType(
      series,
      "bar",
      this.stacked || this.percent ? "stack" : undefined,
    ).map((s) =>
      this.labels && s.type === "bar"
        ? { ...s, showLabels: s.showLabels ?? true }
        : s,
    );
  }

  protected override stackMode(): ChartOptions["stackMode"] {
    return this.percent ? "percent" : super.stackMode();
  }
}

/**
 * Scatter chart of `minerva-design/charts/core`: zooms on both axes, hit
 * testing through a spatial index (the `<ScatterChart>` of React). The
 * series without a `type` are drawn as dots.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU scatter chart zooming on both axes.
 * @tag minerva-scatter-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaScatterChart extends SeriesChartElement {
  static override tagName = "minerva-scatter-chart";

  protected typed(series: readonly ChartSeries[]): ChartSeries[] {
    return withSeriesType(series, "scatter");
  }
}

/**
 * Candlestick (OHLC) chart of `minerva-design/charts/core` (the
 * `<CandlestickChart>` of React): data points carry `open`, `high`, `low`
 * and `y` (the close). The series without a `type` are drawn as candles
 * (e.g. add a moving average with `type: "line"`).
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU candlestick chart of rising and falling candles.
 * @tag minerva-candlestick-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaCandlestickChart extends SeriesChartElement {
  static override tagName = "minerva-candlestick-chart";

  protected typed(series: readonly ChartSeries[]): ChartSeries[] {
    return withSeriesType(series, "candlestick");
  }
}

/**
 * Heatmap of `minerva-design/charts/core` (the `<HeatmapChart>` of React):
 * a grid of cells colored by value, categories (or numbers) on both axes.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary GPU heatmap: a grid of cells colored by value.
 * @tag minerva-heatmap-chart
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaHeatmapChart extends MinervaCartesianChartElement {
  static override tagName = "minerva-heatmap-chart";

  /** Cells `{ x, y, value }`; property only */
  @property({ attribute: false })
  data?: readonly HeatmapCell[];

  /** Column names in order (collected from the data when omitted); property only */
  @property({ attribute: false })
  xCategories?: readonly string[];

  /** Row names from bottom to top (collected from the data when omitted); property only */
  @property({ attribute: false })
  yCategories?: readonly string[];

  /** Colors from the lowest to the highest value (interpolated in OKLab), or a built-in theme-aware ramp of the first palette color (`sequential` by default, or `diverging`); an array is property only */
  @property({ attribute: "color-scale" })
  colorScale: readonly string[] | "sequential" | "diverging" = "sequential";

  /** Values at the ends of the color scale (the data range by default); property only */
  @property({ attribute: false })
  valueRange?: readonly [number, number];

  /** Value at the middle of the color scale (diverging data; 0 for `diverging` ramps spanning it, else the middle of the range, by default) */
  @property({ type: Number, attribute: "color-midpoint" })
  colorMidpoint?: number;

  /** Name of the value in the tooltip */
  @property({ attribute: "value-name" })
  valueName?: string;

  /** Corner radius of the cells, in pixels */
  @property({ type: Number })
  radius?: number;

  /** Formats the values in the tooltip; property only */
  @property({ attribute: false })
  format?: (value: number) => string;

  /** Other engine options (axes, legend, tooltip, padding...); property only */
  @property({ attribute: false })
  options?: ChartBaseOptions;

  protected engineOptions(): ChartOptions | null {
    if (!this.data) return null;
    return heatmapChartOptions(
      {
        data: this.data,
        xCategories: this.xCategories,
        yCategories: this.yCategories,
        colorScale: this.colorScale,
        valueRange: this.valueRange,
        colorMidpoint: this.colorMidpoint,
        name: this.valueName,
        radius: this.radius,
        format: this.format,
      },
      this.options,
    );
  }
}

/**
 * Word-sized chart without axes (a trend in a table cell, a KPI card...) of
 * `minerva-design/charts/core`: the `<Sparkline>` of React.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary Small line, area or bar trend without axes.
 * @tag minerva-sparkline
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 */
export class MinervaSparkline extends MinervaCartesianChartElement {
  static override tagName = "minerva-sparkline";

  /** Height of the sparkline: pixels or any CSS length */
  @property()
  override height?: string | number = 48;

  /** Values (or `[x, y]` pairs, typed arrays...); property only */
  @property({ attribute: false })
  data?: ChartSeries["data"];

  /** How the values are drawn */
  @property()
  type: "line" | "area" | "bar" = "line";

  /** Color (any CSS color); the first palette color by default */
  @property()
  color?: string;

  /** Shape of the line */
  @property()
  curve: "linear" | "smooth" | "step" = "smooth";

  /** Draws a dashed reference line at this value (a target, the average...) */
  @property({ type: Number })
  reference?: number;

  /** Name of the value in the tooltip */
  @property({ attribute: "value-name" })
  valueName?: string;

  /** Formats the value in the tooltip; property only */
  @property({ attribute: false })
  format?: (value: number) => string;

  /** Other engine options (tooltip, palette, renderer...); property only */
  @property({ attribute: false })
  options?: ChartBaseOptions;

  protected engineOptions(): ChartOptions | null {
    if (!this.data) return null;
    return sparklineOptions(
      {
        data: this.data,
        type: this.type,
        color: this.color,
        curve: this.curve,
        name: this.valueName,
        reference: this.reference,
        format: this.format,
      },
      this.options,
    );
  }
}

/** Two clicks on the same dot within this delay count as a double click */
const DOUBLE_CLICK_MS = 400;

/** Slot of the header of each quadrant of `<minerva-quadrant-chart>` */
export const QUADRANT_HEADER_SLOTS: Readonly<Record<QuadrantCorner, string>> = {
  topLeft: "quadrant-header-top-left",
  topRight: "quadrant-header-top-right",
  bottomLeft: "quadrant-header-bottom-left",
  bottomRight: "quadrant-header-bottom-right",
};

const px = (value: number) => `${value}px`;
const fraction = (v: number, a: number, b: number) => (v - a) / (b - a || 1);

/**
 * Four-quadrant matrix (priority matrix, Eisenhower, BCG...) of
 * `minerva-design/charts/core` (the `<QuadrantChart>` of React): tinted
 * quadrants with titles, dividers and labelled dots placed without
 * overlapping labels. With `drag-points`, dots can be dragged to another
 * quadrant (`minerva-point-drop`; update `points` to move them).
 *
 * A visually hidden list of the dots per quadrant lets screen readers and
 * keyboards reach every dot: arrows move between them, Enter clicks
 * (`minerva-point-click`) and, with `drag-points`, Shift + arrows move the
 * focused dot to the neighbouring quadrant (`minerva-point-drop`, announced
 * in a live region). The focused dot is drawn with a focus ring and
 * reported by `minerva-hover`.
 *
 * One glass point card names the hovered, keyboard-focused or dragged dot
 * (its name and quadrant) in place of the engine tooltip; with slotted
 * `point-actions`, the card also shows them and stays on the
 * `selected-index` dot (read the dot they act on from `activeIndex`).
 *
 * Slotted content is placed over the plot: a header per quadrant (in its
 * outer corner, replacing the drawn title, badge, description and count)
 * and the actions in the point card. Both receive pointer events; the rest
 * of the plot stays interactive.
 *
 * Published as the optional entry `minerva-design/web-components/chart`.
 *
 * @summary Four-quadrant matrix of labelled, draggable dots.
 * @tag minerva-quadrant-chart
 * @slot quadrant-header-top-left - Header of the top left quadrant (replaces its drawn title and count)
 * @slot quadrant-header-top-right - Header of the top right quadrant
 * @slot quadrant-header-bottom-left - Header of the bottom left quadrant
 * @slot quadrant-header-bottom-right - Header of the bottom right quadrant
 * @slot point-actions - Actions shown in the point card of the active dot, beside its name (e.g. compact edit / delete buttons); the card then also stays on the selected dot
 * @csspart root - The sized box of the chart
 * @csspart surface - The element the engine renders into
 * @csspart overlay - The box over the plot holding the slotted headers and the point card
 * @csspart quadrant-header - The box of a quadrant header slot (in the outer corner of its quadrant)
 * @csspart point-card - The glass card of the hovered, focused, dragged (or, with actions, selected) dot
 * @csspart point-actions - The actions box in the point card, holding the `point-actions` slot
 * @fires minerva-point-click - A dot was clicked; detail: { point, index }
 * @fires minerva-point-double-click - The same dot was clicked twice in quick succession; detail: { point, index }
 * @fires minerva-quadrant-click - The empty area of a quadrant was clicked; detail: { quadrant, x, y }
 * @fires minerva-point-drag - A dot is being dragged (on every move); detail: { point, index, x, y, quadrant }
 * @fires minerva-point-drop - A dragged dot was released, or the focused dot was moved with Shift + an arrow key; detail: { point, index, x, y, quadrant }
 * @fires minerva-hover - The hovered (or keyboard-focused) dot changed; detail: { x, xLabel, items }, `null` when nothing is hovered
 */
export class MinervaQuadrantChart extends MinervaCartesianChartElement {
  static override tagName = "minerva-quadrant-chart";
  static override styles = [
    MinervaEngineElement.styles,
    css`
      .overlay,
      .quadrant,
      .card-host {
        position: absolute;
        pointer-events: none;
      }
      .card-host {
        left: 0;
        top: 0;
      }
      .quadrant-header {
        position: absolute;
        display: flex;
        box-sizing: border-box;
        max-width: 100%;
        padding: 8px;
        pointer-events: none;
      }
      .quadrant-header.top {
        top: 0;
      }
      .quadrant-header.bottom {
        bottom: 0;
      }
      .quadrant-header.left {
        left: 0;
        justify-content: flex-start;
      }
      .quadrant-header.right {
        right: 0;
        justify-content: flex-end;
      }
      .quadrant-header ::slotted(*) {
        pointer-events: auto;
      }
    `,
  ];

  /** Points `{ x, y, label, color, size }` to place; property only */
  @property({ attribute: false })
  points?: readonly QuadrantPoint[];

  /** Titles and colors of the quadrants (`topLeft`, `topRight`, `bottomLeft`, `bottomRight`); property only */
  @property({ attribute: false })
  quadrants?: QuadrantRegions;

  /** Title of the horizontal axis */
  @property({ attribute: "x-label" })
  xLabel?: string;

  /** Title of the vertical axis */
  @property({ attribute: "y-label" })
  yLabel?: string;

  /** Texts at the ends of the dividers, drawn inside the plot; property only */
  @property({ attribute: false })
  axisLabels?: QuadrantAxisLabels;

  /** Range of the horizontal axis (default [0, 10]); property only */
  @property({ attribute: false })
  xDomain?: [number, number];

  /** Range of the vertical axis (default [0, 10]); property only */
  @property({ attribute: false })
  yDomain?: [number, number];

  /** X value of the vertical divider (the middle of the x domain by default) */
  @property({ type: Number, attribute: "x-split" })
  xSplit?: number;

  /** Y value of the horizontal divider (the middle of the y domain by default) */
  @property({ type: Number, attribute: "y-split" })
  ySplit?: number;

  /** Reverses the horizontal axis (e.g. "urgent" on the left) */
  @property({ type: Boolean, attribute: "reverse-x" })
  reverseX = false;

  /** Hides the numeric ticks of the axes (only the matrix remains) */
  @property({ type: Boolean, attribute: "hide-ticks" })
  hideTicks = false;

  /** Hides the labels next to the dots */
  @property({ type: Boolean, attribute: "hide-labels" })
  hideLabels = false;

  /** Dot diameter in pixels */
  @property({ type: Number, attribute: "point-size" })
  pointSize = 12;

  /** Lets the user drag the dots (`minerva-point-drag`, `minerva-point-drop`) */
  @property({ type: Boolean, attribute: "drag-points" })
  dragPoints = false;

  /** Shows the number of points of each quadrant after its title; as a property, a function `(count, points) => text` returns the text */
  @property({ type: Boolean, attribute: "show-counts" })
  showCounts: QuadrantConfig["showCounts"] = false;

  /** Index of the selected dot, drawn with a ring (`null`: none) */
  @property({ type: Number, attribute: "selected-index" })
  selectedIndex?: number | null;

  /** Indices of the selected dots; property only */
  @property({ attribute: false })
  selectedIndices?: readonly number[];

  /** Other engine options (legend, tooltip, padding, palette...); property only */
  @property({ attribute: false })
  options?: Omit<ChartOptions, "series">;

  /** Leaves out the visually hidden list of the dots (keyboard and screen reader access) */
  @property({ type: Boolean, attribute: "no-accessible-points" })
  noAccessiblePoints = false;

  private lastClick: { index: number; time: number } | null = null;
  private pointLayer: QuadrantPointLayer | null = null;
  private focusedPoint: number | null = null;
  /** Plot area (where the slots and the card are placed), known once the engine drew */
  private plot: ChartRect | null = null;
  private slotObserver: MutationObserver | null = null;
  /** Slots having content at the last check (header slots, point actions) */
  private slotted = "";
  private card: QuadrantPointCard | null = null;
  /** The box over the plot the card was mounted in */
  private cardHost: HTMLElement | null = null;
  /** The dot of the card, as last reported by it */
  private cardIndex: number | null = null;

  /**
   * Index of the active dot, the one whose point card shows the
   * `point-actions` slot (hovered, keyboard-focused, else `selectedIndex`
   * when actions are slotted); `null` while no card is shown or during a
   * drag
   */
  get activeIndex(): number | null {
    return this.cardIndex;
  }

  /** Whether a quadrant header slot has content */
  private hasHeaders(): boolean {
    const names = Object.values(QUADRANT_HEADER_SLOTS);
    return Array.from(this.children).some((child) =>
      names.includes(child.getAttribute("slot") ?? ""),
    );
  }

  private hasPointActions(): boolean {
    return Array.from(this.children).some(
      (child) => child.getAttribute("slot") === "point-actions",
    );
  }

  private geometry(): Pick<
    QuadrantConfig,
    "xDomain" | "yDomain" | "xSplit" | "ySplit" | "reverseX"
  > {
    return {
      xDomain: this.xDomain,
      yDomain: this.yDomain,
      xSplit: this.xSplit,
      ySplit: this.ySplit,
      reverseX: this.reverseX,
    };
  }

  protected engineOptions(): ChartOptions | null {
    if (!this.points) return null;
    const headers = this.hasHeaders();
    // the point card names the hovered, focused or dragged dot: no engine
    // tooltip, label chip or drag pill beside it
    const options = withQuadrantCard(
      quadrantChartOptions(
        {
          ...this.geometry(),
          points: this.points,
          quadrants: this.quadrants,
          xLabel: this.xLabel,
          yLabel: this.yLabel,
          axisLabels: this.axisLabels,
          showTicks: !this.hideTicks,
          showLabels: !this.hideLabels,
          pointSize: this.pointSize,
          draggable: this.dragPoints,
          showCounts: headers ? undefined : this.showCounts,
          selectedIndex: this.selectedIndex,
          selectedIndices: this.selectedIndices,
        },
        this.options,
        { focusedIndex: this.noAccessiblePoints ? null : this.focusedPoint },
      ),
    );
    if (headers)
      // the slotted headers replace the drawn titles (the first four areas)
      options.annotations = options.annotations?.map((a, i) =>
        i < 4 && a.type === "rect"
          ? {
              ...a,
              label: undefined,
              badge: undefined,
              description: undefined,
              detail: undefined,
            }
          : a,
      );
    return options;
  }

  protected override bindEngine(chart: ChartInstance): Array<() => void> {
    return [
      ...super.bindEngine(chart),
      chart.on("hover", (event) =>
        this.card?.hover(event?.items?.[0]?.index ?? null),
      ),
      chart.on("layout", (rect) => {
        this.plot = rect;
        this.requestUpdate();
      }),
    ];
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.hasUpdated) this.syncPointLayer();
    this.slotted = this.slotState();
    if (typeof MutationObserver === "undefined") return;
    // slotted headers / actions added or removed: redraw without the titles
    this.slotObserver = new MutationObserver(() => {
      const next = this.slotState();
      if (next === this.slotted) return;
      this.slotted = next;
      this.requestUpdate();
      const options = this.engineOptions();
      if (options) this.instance?.setOptions(options);
    });
    this.slotObserver.observe(this, {
      childList: true,
      attributes: true,
      attributeFilter: ["slot"],
      subtree: true,
    });
  }

  override disconnectedCallback(): void {
    // before the engine goes: the card gives the drawn label back
    this.destroyCard();
    super.disconnectedCallback();
    this.pointLayer?.destroy();
    this.pointLayer = null;
    this.focusedPoint = null;
    this.plot = null;
    this.slotObserver?.disconnect();
    this.slotObserver = null;
  }

  private slotState(): string {
    return `${this.hasHeaders() ? "h" : ""}${this.hasPointActions() ? "a" : ""}`;
  }

  /** The slotted headers and the box of the point card, over the plot */
  protected override renderOverlay() {
    const headers = this.hasHeaders();
    const plot = this.plot;
    if (!plot) return nothing;
    const [x0, x1] = this.xDomain ?? [0, 10];
    const [y0, y1] = this.yDomain ?? [0, 10];
    const visual = (x: number, y: number) => {
      const fx = fraction(x, x0, x1);
      return { x: this.reverseX ? 1 - fx : fx, y: 1 - fraction(y, y0, y1) };
    };
    const split = visual(
      this.xSplit ?? (x0 + x1) / 2,
      this.ySplit ?? (y0 + y1) / 2,
    );
    const sx = plot.width * split.x;
    const sy = plot.height * split.y;
    const quadrant = (corner: QuadrantCorner) => {
      const left = corner.endsWith("Left");
      const top = corner.startsWith("top");
      return html`<div
        class="quadrant"
        style=${styleMap({
          left: px(left ? 0 : sx),
          top: px(top ? 0 : sy),
          width: px(left ? sx : plot.width - sx),
          height: px(top ? sy : plot.height - sy),
        })}
      >
        <div
          part="quadrant-header"
          class="quadrant-header ${top ? "top" : "bottom"} ${
            left ? "left" : "right"
          }"
          data-corner=${corner}
        >
          <slot name=${QUADRANT_HEADER_SLOTS[corner]}></slot>
        </div>
      </div>`;
    };
    return html`<div
      part="overlay"
      class="overlay"
      style=${styleMap({
        left: px(plot.x),
        top: px(plot.y),
        width: px(plot.width),
        height: px(plot.height),
      })}
    >
      ${headers ? QUADRANT_CORNERS.map(quadrant) : nothing}
      <div
        class="card-host"
        data-card-host
        style=${styleMap({ width: px(plot.width), height: px(plot.height) })}
      ></div>
    </div>`;
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    this.syncPointLayer();
    this.syncCard();
  }

  private cardOptions(): QuadrantPointCardOptions {
    const actions = this.hasPointActions();
    return {
      config: {
        ...this.geometry(),
        points: this.points ?? [],
        quadrants: this.quadrants,
        xLabel: this.xLabel,
        yLabel: this.yLabel,
      },
      locale: this.options?.locale,
      pointSize: this.pointSize,
      // the hovered dot shows its card unless the tooltip is off
      hover: this.options?.tooltip !== false,
      selectedIndex: this.selectedIndex,
      // with actions (a board), the selected dot keeps its card: its
      // actions stay at hand; otherwise a selection is only a ring
      showSelected: actions,
      hasActions: () => actions,
      chart: this.instance,
      onClick: (index) => this.clickPoint(index),
      onChange: (index) => {
        this.cardIndex = index;
      },
    };
  }

  /** Mounts the point card once the engine and its box exist, else updates it */
  private syncCard(): void {
    const host = this.isConnected
      ? this.renderRoot.querySelector<HTMLElement>("[data-card-host]")
      : null;
    const chart = this.instance;
    if (this.card && (host !== this.cardHost || !chart)) this.destroyCard();
    if (!host || !chart) return;
    if (this.card) {
      this.card.update(this.cardOptions());
      return;
    }
    const card = createQuadrantPointCard(host, this.cardOptions());
    this.card = card;
    this.cardHost = host;
    card.element.setAttribute("part", "point-card");
    card.actions.setAttribute("part", "point-actions");
    const slot = this.ownerDocument.createElement("slot");
    slot.name = "point-actions";
    card.actions.append(slot);
    if (this.focusedPoint !== null) card.focus(this.focusedPoint);
  }

  private destroyCard(): void {
    this.card?.destroy();
    this.card = null;
    this.cardHost = null;
    this.cardIndex = null;
  }

  /** Mounts, updates or removes the accessible list of the dots */
  private syncPointLayer(): void {
    const root = this.renderRoot.querySelector<HTMLElement>("[part=root]");
    if (this.noAccessiblePoints || !this.points || !root || !this.isConnected) {
      this.pointLayer?.destroy();
      this.pointLayer = null;
      if (this.focusedPoint !== null) this.focusPoint(null);
      return;
    }
    const options = {
      config: {
        ...this.geometry(),
        points: this.points,
        quadrants: this.quadrants,
        xLabel: this.xLabel,
        yLabel: this.yLabel,
      },
      locale: this.options?.locale,
      movable: this.dragPoints,
      selected: [
        ...(this.selectedIndices ?? []),
        ...(this.selectedIndex !== undefined && this.selectedIndex !== null
          ? [this.selectedIndex]
          : []),
      ],
      onFocusChange: (index: number | null, hover: ChartHoverEvent | null) => {
        this.focusPoint(index);
        this.emit("minerva-hover", hover);
      },
      onClick: (index: number) => {
        const point = this.points?.[index];
        if (point) this.emit("minerva-point-click", { point, index });
      },
      onMove: (
        index: number,
        target: { x: number; y: number; quadrant: string },
      ) => {
        const point = this.points?.[index];
        if (point) this.emit("minerva-point-drop", { point, index, ...target });
      },
    };
    if (this.pointLayer) this.pointLayer.update(options);
    else this.pointLayer = createQuadrantPointLayer(root, options);
  }

  /** Draws (or removes) the focus ring of the keyboard-focused dot, shows its card */
  private focusPoint(index: number | null): void {
    this.focusedPoint = index;
    const options = this.engineOptions();
    if (options) this.instance?.setOptions(options);
    if (index !== null) this.card?.focus(index);
    // the focus may be on its way from the dot to the actions of its card:
    // the card holds itself once they have it (their focusin comes next)
    else
      setTimeout(() => {
        if (this.focusedPoint === null) this.card?.focus(null);
      });
  }

  protected override pointClicked(event: ChartHoverEvent): void {
    const index = event.items[0]?.index;
    if (index !== undefined) this.clickPoint(index);
  }

  /**
   * A click on a dot or on the name in its card; two quick ones on the same
   * dot count as a double click
   */
  private clickPoint(index: number): void {
    const point = this.points?.[index];
    if (!point) return;
    const now = Date.now();
    const last = this.lastClick;
    const double = last?.index === index && now - last.time < DOUBLE_CLICK_MS;
    this.lastClick = double ? null : { index, time: now };
    this.emit("minerva-point-click", { point, index });
    if (double) this.emit("minerva-point-double-click", { point, index });
  }

  protected override plotClicked(event: ChartPlotClickEvent): void {
    this.emit("minerva-quadrant-click", {
      quadrant: quadrantOf(this.geometry(), event.x, event.y),
      x: event.x,
      y: event.y,
    });
  }

  private dropDetail(event: ChartDragEvent) {
    const index = event.item.index;
    const point = this.points?.[index];
    if (!point) return null;
    return {
      point,
      index,
      x: event.x,
      y: event.y,
      quadrant: quadrantOf(this.geometry(), event.x, event.y),
    };
  }

  protected override pointDragStarted(event: ChartDragEvent): void {
    this.card?.drag(event.item.index, { x: event.x, y: event.y });
  }

  protected override pointDragged(event: ChartDragEvent): void {
    this.card?.move({ x: event.x, y: event.y });
    const detail = this.dropDetail(event);
    if (detail) this.emit("minerva-point-drag", detail);
  }

  protected override pointDropped(event: ChartDragEvent): void {
    const detail = this.dropDetail(event);
    if (detail) this.emit("minerva-point-drop", detail);
  }

  protected override pointDragEnded(): void {
    this.card?.drag(null);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-line-chart": MinervaLineChart;
    "minerva-area-chart": MinervaAreaChart;
    "minerva-bar-chart": MinervaBarChart;
    "minerva-scatter-chart": MinervaScatterChart;
    "minerva-candlestick-chart": MinervaCandlestickChart;
    "minerva-heatmap-chart": MinervaHeatmapChart;
    "minerva-sparkline": MinervaSparkline;
    "minerva-quadrant-chart": MinervaQuadrantChart;
  }
}
