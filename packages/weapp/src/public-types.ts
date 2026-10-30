/** Pure types for native WeChat hosts. No runtime entry or WeChat SDK globals. */
export type NativeRowKey = string | number;
export type NativeRow = Record<string, unknown>;
export type NativePalette = "editorial" | "tech" | "graphite" | "cool" | null;
export type Messages = { [key: string]: Messages | string };
export type TranslateOptions = {
  count?: number;
  defaultValue?: string;
  [name: string]: unknown;
};
export interface NativeConfiguration {
  mode: string;
  resolvedMode: "light" | "dark";
  theme: unknown;
  palette: NativePalette;
  design: {
    preset?: string;
    density?: string;
    radius?: string;
    shadow?: string;
    fontScale?: string;
  };
  locale: { language: string };
  dir: string;
  messages: Record<string, Messages>;
}
export interface NativeConfigConsumer {
  getConfig(): NativeConfiguration;
  translate(key: string, options?: TranslateOptions): string;
  /** Explicit alternative to the automatic native ancestor relation. */
  bindConfig(provider: NativeConfigProviderInstance): void;
}
export interface NativeConfigProviderInstance extends NativeConfigConsumer {
  configure(config: { messages?: Record<string, Messages> }): void;
  setTheme(theme: string | Record<string, unknown>): void;
  setPalette(palette: NativePalette): void;
  subscribeConfig(
    listener: (configuration: NativeConfiguration) => void,
  ): () => void;
}
export interface NativeCascadeOption {
  value: string;
  label: string | number;
  disabled?: boolean;
  isLeaf?: boolean;
  loading?: boolean;
  children?: NativeCascadeOption[];
}
export interface NativeCascadeConfig {
  filter?: (input: string, path: NativeCascadeOption[]) => boolean;
  loadData?: (path: NativeCascadeOption[]) => void | Promise<void>;
  optionRender?: (option: NativeCascadeOption, level: number) => string;
}
export interface NativeCascaderInstance extends NativeConfigConsumer {
  configure(config: NativeCascadeConfig): void;
}
export interface CalendarConfig {
  disabledDate?: (day: string) => boolean;
  getDayLabel?: (day: string, count: number) => string;
  getEventsLabel?: (day: string) => string;
}
export interface NativeCalendarInstance extends NativeConfigConsumer {
  configure(config: CalendarConfig): void;
}
export interface PaginationConfig {
  totalRender?: (total: number, range: [number, number]) => string;
  itemRender?: (page: number, type: string) => string;
}
export interface NativePaginationInstance extends NativeConfigConsumer {
  configure(config: PaginationConfig): void;
}
export interface NativeMenuEntry {
  key?: string;
  value?: string;
  label?: string;
  type?: "checkbox" | "radio-group" | "separator" | "group";
  children?: NativeMenuEntry[];
  items?: NativeMenuEntry[];
  checked?: boolean;
  defaultChecked?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  closeOnSelect?: boolean;
  icon?: string;
  shortcut?: string;
  danger?: boolean;
}
export interface MenuConfig {
  onSelect?: (item: NativeMenuEntry) => void;
  onCheckedChange?: (key: string, checked: boolean) => void;
  onValueChange?: (group: string, value: string) => void;
}
export interface NativeMenuInstance extends NativeConfigConsumer {
  configure(config: MenuConfig): void;
}
export interface TreeItem {
  id?: string;
  value?: string;
  label: string;
  description?: string;
  href?: string;
  icon?: string;
  endContent?: string;
  disabled?: boolean;
  children?: TreeItem[];
}
export interface NativeNavTreeInstance extends NativeConfigConsumer {
  configure(config: {
    filter?: (query: string, item: TreeItem) => boolean;
  }): void;
}
export interface NativeTableColumn {
  key: string;
  header?: string;
  width?: number | string;
  align?: "left" | "center" | "right";
  ellipsis?: boolean;
  fixed?: "left" | "right";
  sortable?: boolean;
  filters?: Array<{ value: string; text: string }>;
}
export interface NativeRichTextNode {
  type?: "node" | "text";
  name?: string;
  attrs?: Record<string, string>;
  children?: NativeRichTextNode[];
  text?: string;
}
export interface NativeTableCell {
  primary?: string;
  secondary?: string;
  monospace?: boolean;
  image?: string;
  icon?: string;
  action?: string;
  disabled?: boolean;
  richText?: NativeRichTextNode[] | string;
}
export interface NativeTableConfig<Row extends object = NativeRow> {
  rowKey?: (row: Row, index: number) => NativeRowKey;
  comparators?: Record<string, (a: Row, b: Row) => number>;
  cellRender?: (
    row: Row,
    column: NativeTableColumn,
    index: number,
  ) => NativeTableCell | string;
  getCheckboxProps?: (row: Row) => { disabled?: boolean };
  getRowLabel?: (row: Row, index: number) => string;
  filter?: (row: Row, filters: Record<string, string[]>) => boolean;
}
export interface NativeTableInstance<
  Row extends object = NativeRow,
> extends NativeConfigConsumer {
  configure(config: NativeTableConfig<Row>): void;
}
export interface NativePopoverRect {
  left: number;
  top: number;
  width: number;
  height: number;
}
export interface NativePopoverGeometry {
  anchor: NativePopoverRect;
  panel: NativePopoverRect;
  viewport: { width: number; height: number };
}
export interface NativePopoverConfig {
  measure?: () => NativePopoverGeometry | Promise<NativePopoverGeometry>;
  /** Return false to prevent dismissal from the outside native tap. */
  onInteractOutside?: () => boolean | void;
}
export interface NativePopoverInstance extends NativeConfigConsumer {
  configure(config: NativePopoverConfig): void;
  reposition(): Promise<void>;
}
export interface NativeMeasuredLayoutInstance extends NativeConfigConsumer {
  measure(width: number): void;
}
export interface NativePageTabsInstance extends NativeConfigConsumer {
  measure(metrics: {
    viewportWidth: number;
    contentWidth: number;
    scrollLeft?: number;
  }): void;
  reposition(): void;
}
export interface NativeAppShellInstance extends NativeMeasuredLayoutInstance {
  openNavigation(): void;
  closeNavigation(): void;
  expandNavigation(): void;
}
export interface NativeEvent<Detail> {
  detail: Detail;
}
export interface NativeTableEvents<Row extends object = NativeRow> {
  sortchange: {
    sortState: { key: string; order: "ascend" | "descend" | null };
  };
  selectionchange: { selectedRowKeys: NativeRowKey[]; selectedRows: Row[] };
  filterchange: { filters: Record<string, string[]> };
  pagechange: { current: number; pageSize: number };
  rowclick: { row: Row; key: NativeRowKey; index: number };
  cellaction: {
    row: Row;
    key: NativeRowKey;
    index: number;
    columnKey: string;
    detail: unknown;
  };
  retry: Record<string, never>;
}
export interface NativeControlEvents {
  change: { value: unknown };
  openchange: { open: boolean };
  monthchange: { month: string };
  eventclick: { event: { id: string; date: string; title: string } };
  expandchange: { expandedKeys: string[]; expandedIds: string[] };
  sidebarmodechange: { mode: "expanded" | "compact" | "floating" };
  navigationstate: {
    mode: string;
    collapsed: boolean;
    isMobile: boolean;
    open: boolean;
  };
  themechange: {
    theme: unknown;
    mode: string;
    resolvedMode?: string;
    palette?: NativePalette;
  };
  palettechange: { palette: NativePalette };
  positionchange: {
    side: string;
    left: number;
    top: number;
    availableWidth: number;
    availableHeight: number;
  };
}

export interface NativeCompletionOption {
  value: string | number;
  label: string;
  group?: string;
  disabled?: boolean;
  description?: string;
}
export interface NativeCompletionConfig {
  filterOption?: (query: string, option: NativeCompletionOption) => boolean;
  groupBy?: (option: NativeCompletionOption) => string;
  sortOption?: (a: NativeCompletionOption, b: NativeCompletionOption) => number;
}
export interface NativeAutoCompleteInstance extends NativeConfigConsumer {
  configure(config: NativeCompletionConfig): void;
}
export interface NativeTagInputInstance extends NativeConfigConsumer {
  paste(text: string, start?: number, end?: number): void;
}
export interface NativeConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  color?: "primary" | "danger" | "warning";
  loading?: boolean;
  confirmDisabled?: boolean;
}
export interface NativeConfirmProviderInstance extends NativeConfigConsumer {
  request(options: NativeConfirmOptions): Promise<boolean>;
}

export interface NativeDrawerConfig {
  onInteractOutside?: () => boolean | void;
}
export interface NativeDrawerInstance extends NativeConfigConsumer {
  configure(config: NativeDrawerConfig): void;
}
export interface NativeVirtualConfig<Row = Record<string, unknown>> {
  renderItem?: (item: Row, index: number) => string;
  onLoadMore?: () => void | Promise<void>;
}
export interface NativeVirtualInstance<
  Row = Record<string, unknown>,
> extends NativeConfigConsumer {
  configure(config: NativeVirtualConfig<Row>): void;
  measure(metrics: {
    itemContentHeight?: number;
    viewportHeight?: number;
  }): void;
  reposition(): void;
  completeLoadMore(): void;
  scrollToIndex(index: number): void;
}
export interface NativeUploadFile {
  name: string;
  path: string;
  size: number;
  type: string;
}
export interface NativeUploadConfig {
  labels?: {
    tooMany?: (max: number) => string;
    invalidType?: (name: string) => string;
    tooLarge?: (name: string) => string;
    retry?: (name: string) => string;
    remove?: (name: string) => string;
  };
  normalizeFile?: (file: NativeUploadFile) => NativeUploadFile;
}
export interface NativeUploadInstance extends NativeConfigConsumer {
  configure(config: NativeUploadConfig): void;
  selectFiles(files: NativeUploadFile[]): void;
}
export interface NativeCommandItem {
  id: string;
  title: string;
  description?: string;
  group?: string;
  keywords?: string;
  disabled?: boolean;
}
export interface NativeCommandConfig {
  filter?: (items: NativeCommandItem[], query: string) => NativeCommandItem[];
}
export interface NativeCommandInstance extends NativeConfigConsumer {
  configure(config: NativeCommandConfig): void;
  setOpen(open: boolean): void;
}
export interface NativeTooltipInstance extends NativeConfigConsumer {
  open(): void;
  close(): void;
  toggle(): void;
}
export interface NativeVirtualEvents<Row = Record<string, unknown>> {
  scroll: { scrollTop: number };
  loadmore: Record<string, never>;
  loaderror: { message: string };
  itemclick: { item: Row; index: number };
}
export interface NativeUploadItem {
  id: string;
  name: string;
  status: "uploading" | "done" | "error";
  error?: string;
  previewUrl?: string;
}
export interface NativeUploadEvents {
  filesselected: { files: NativeUploadFile[] };
  select: { files: NativeUploadFile[] };
  error: {
    code: "too-many" | "invalid-type" | "too-large" | "picker";
    message: string;
    files?: NativeUploadFile[];
  };
  remove: { id: string; item: NativeUploadItem };
  retry: { item: NativeUploadItem };
}
export interface NativeSelectOption {
  value?: string;
  label?: string;
  disabled?: boolean;
  type?: "group" | "separator" | "label";
  items?: NativeSelectOption[];
  textValue?: string;
  group?: string;
  description?: string;
  icon?: string;
}

export type NativeModalInstance = NativeDrawerInstance;
export interface NativeFormState {
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  invalid: boolean;
}
export interface NativeFormConsumer extends NativeConfigConsumer {
  getFormState(): NativeFormState;
}
export type NativeToastId = string | number;
export interface NativeToastOptions {
  id?: NativeToastId;
  title?: string;
  description?: string;
  color?: "info" | "success" | "warning" | "danger";
  loading?: boolean;
  duration?: number;
  closable?: boolean;
  action?: { label: string; onClick: () => void };
  onClose?: (id: NativeToastId) => void;
}
export interface NativeToastMessages<T> {
  loading: string;
  success: string | ((value: T) => string);
  error: string | ((error: unknown) => string);
}
export interface NativeToastProviderInstance extends NativeConfigConsumer {
  show(options: NativeToastOptions): NativeToastId;
  update(id: NativeToastId, options: NativeToastOptions): void;
  dismiss(id?: NativeToastId): void;
  pause(id: NativeToastId): void;
  resume(id: NativeToastId): void;
  promise<T>(
    promise: Promise<T>,
    messages: NativeToastMessages<T>,
    options?: NativeToastOptions,
  ): Promise<T>;
}

/*
 * Charts: chart, line-chart, bar-chart, scatter-chart and quadrant-chart draw
 * on a `<canvas type="2d">`. Properties are serialized by setData, so data is
 * JSON (timestamps instead of Date objects) and functions go through
 * `configure()`.
 */
export type NativeChartSeriesType = "line" | "area" | "bar" | "scatter";
/** X value: a number (timestamps on `time` axes) or a category name */
export type NativeChartXValue = number | string;
export interface NativeChartPointDatum {
  /** X value; the datum index when omitted */
  x?: NativeChartXValue;
  /** Y value; `null` leaves a gap */
  y: number | null;
  /** Dot diameter in px (scatter) */
  size?: number;
  /** Dot color (scatter); any CSS color */
  color?: string;
  /** Text next to the dot (scatter with `showLabels`) and in the tooltip */
  label?: string;
}
/** Column-oriented data */
export interface NativeChartColumnData {
  x?: readonly NativeChartXValue[];
  y: readonly (number | null)[];
  size?: readonly number[];
}
export type NativeChartSeriesData =
  | readonly (number | null)[]
  | readonly (readonly [NativeChartXValue, number | null])[]
  | readonly NativeChartPointDatum[]
  | NativeChartColumnData;
export interface NativeChartSeries {
  id?: string;
  name?: string;
  /** Defaults to the type of the component (`line` for chart) */
  type?: NativeChartSeriesType;
  data: NativeChartSeriesData;
  /** Any CSS color, `var(--token, fallback)` included */
  color?: string;
  lineWidth?: number;
  pointSize?: number;
  opacity?: number;
  stack?: string;
  hidden?: boolean;
  showLabels?: boolean;
}
/** Axis options; `format` is set with `configure({ xAxis: { format } })` */
export interface NativeChartAxisOptions {
  type?: "linear" | "time" | "category";
  min?: number;
  max?: number;
  title?: string;
  categories?: readonly string[];
  tickCount?: number;
  grid?: boolean;
  visible?: boolean;
  zero?: boolean;
  reverse?: boolean;
  nice?: boolean;
}
export type NativeChartLabelPosition =
  "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
export type NativeChartAnnotation =
  | {
      type: "rect";
      x0?: number;
      x1?: number;
      y0?: number;
      y1?: number;
      color?: string;
      opacity?: number;
      label?: string;
      labelPosition?: NativeChartLabelPosition;
      labelColor?: string;
    }
  | {
      type: "line";
      axis: "x" | "y";
      value: number;
      color?: string;
      width?: number;
      dash?: readonly number[];
      label?: string;
    }
  | {
      type: "text";
      x?: number;
      y?: number;
      text: string;
      anchor?: "center" | "top" | "bottom" | "left" | "right";
      color?: string;
      weight?: number;
    };
export interface NativeChartLegendOptions {
  position?: "top" | "bottom";
  /** Tapping an entry toggles its series @default true */
  toggle?: boolean;
}
/** Tooltip options; the content is set with `configure({ renderTooltip })` */
export interface NativeChartTooltipOptions {
  mode?: "nearest" | "axis";
}
export interface NativeChartInteractionOptions {
  /** Axes that zoom (pinch) and pan (drag when zoomed) */
  zoom?: boolean | "x" | "y" | "xy";
  pan?: boolean;
  /** Scatter dots can be dragged (`pointdrag` / `pointdrop` events) */
  dragPoints?: boolean;
}
export interface NativeChartPadding {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}
export interface NativeChartCommonProperties {
  /** Numbers are px; any CSS length otherwise @default "100%" */
  width?: number | string;
  /** Numbers are px; any CSS length otherwise @default 320 */
  height?: number | string;
  legend?: boolean | NativeChartLegendOptions;
  tooltip?: boolean | NativeChartTooltipOptions;
  crosshair?: boolean;
  annotations?: readonly NativeChartAnnotation[];
  /** `false` makes the chart static */
  interaction?: boolean | NativeChartInteractionOptions;
  padding?: NativeChartPadding;
  palette?: readonly string[];
  ariaLabel?: string;
  /** Stops the page from scrolling while the canvas is touched @default false */
  disableScroll?: boolean;
}
export interface NativeChartProperties extends NativeChartCommonProperties {
  series: readonly NativeChartSeries[];
  xAxis?: NativeChartAxisOptions;
  yAxis?: NativeChartAxisOptions;
}
export interface NativeLineChartProperties extends NativeChartProperties {
  /** Fills the area under the lines @default false */
  area?: boolean;
}
export interface NativeBarChartProperties extends NativeChartProperties {
  /** Stacks the bars @default false */
  stacked?: boolean;
}
export type NativeScatterChartProperties = NativeChartProperties;
type NativeCurve = "linear" | "smooth" | "step";
export interface NativeAreaChartProperties extends NativeChartProperties {
  /** @default "smooth" */
  curve?: NativeCurve;
  stacked?: boolean;
  /** 100% stacks (implies `stacked`) */
  percent?: boolean;
}
export interface NativeHorizontalBarChartProperties extends NativeChartProperties {
  stacked?: boolean;
  percent?: boolean;
  /** Values at the end of the bars */
  labels?: boolean;
}
export type NativeCandlestickChartProperties = NativeChartProperties;
export interface NativeRangeAreaChartProperties extends NativeChartProperties {
  /** @default "smooth" */
  curve?: NativeCurve;
}
export interface NativeMixedChartProperties extends NativeChartProperties {
  /** Right value axis of the series with `yAxis: "right"` */
  yAxis2?: NativeChartAxisOptions;
  /** @default "normal" */
  stackMode?: "normal" | "percent";
  /** @default "vertical" */
  orientation?: "vertical" | "horizontal";
}
export interface NativeBubbleChartProperties extends NativeChartProperties {
  /** @default 6 */
  minSize?: number;
  /** @default 48 */
  maxSize?: number;
  maxValue?: number;
}
export interface NativeHeatmapCell {
  x: string | number;
  y: string | number;
  value: number | null;
}
export interface NativeHeatmapChartProperties extends NativeChartCommonProperties {
  data: readonly NativeHeatmapCell[];
  xAxis?: NativeChartAxisOptions;
  yAxis?: NativeChartAxisOptions;
  xCategories?: readonly string[];
  yCategories?: readonly string[];
  colorScale?: readonly string[];
  valueRange?: [number, number];
  name?: string;
  radius?: number;
}
export interface NativeSparklineProperties {
  data: readonly (number | [number, number])[];
  /** @default "line" */
  type?: "line" | "area" | "bar";
  color?: string;
  /** @default "smooth" */
  curve?: NativeCurve;
  name?: string;
  reference?: number;
  /** @default "100%" */
  width?: number | string;
  /** @default 48 */
  height?: number | string;
  tooltip?: boolean | NativeChartTooltipOptions;
  palette?: readonly string[];
  ariaLabel?: string;
  disableScroll?: boolean;
}
export interface NativeHistogramChartProperties extends NativeChartCommonProperties {
  values: readonly number[];
  /** @default "auto" */
  bins?: number | "auto" | "sturges" | "freedman-diaconis";
  domain?: [number, number];
  /** @default true */
  nice?: boolean;
  /** @default "Count" */
  name?: string;
  color?: string;
  /** More series drawn over the bins */
  series?: readonly NativeChartSeries[];
  xAxis?: NativeChartAxisOptions;
  yAxis?: NativeChartAxisOptions;
}
export interface NativeBoxplotGroup {
  x: string | number;
  values: readonly number[];
  color?: string;
}
export interface NativeBoxPlotChartProperties extends NativeChartCommonProperties {
  series?: readonly NativeChartSeries[];
  groups?: readonly NativeBoxplotGroup[];
  /** @default "Values" */
  name?: string;
  /** @default 1.5 */
  whisker?: number | "minmax";
  /** @default "vertical" */
  orientation?: "vertical" | "horizontal";
  xAxis?: NativeChartAxisOptions;
  yAxis?: NativeChartAxisOptions;
}
export interface NativeWaterfallStep {
  label: string;
  value?: number;
  /** @default "change" */
  kind?: "change" | "subtotal" | "total";
  color?: string;
}
export interface NativeWaterfallChartProperties extends NativeChartCommonProperties {
  steps: readonly NativeWaterfallStep[];
  name?: string;
  upColor?: string;
  downColor?: string;
  totalColor?: string;
  /** @default 0 */
  start?: number;
  /** @default true */
  labels?: boolean;
  locale?: string;
  /** @default "vertical" */
  orientation?: "vertical" | "horizontal";
  xAxis?: NativeChartAxisOptions;
  yAxis?: NativeChartAxisOptions;
}
export interface NativeGanttTask {
  name: string;
  /** Timestamp (ms) */
  start: number;
  /** Timestamp (ms); milestones omit it */
  end?: number;
  /** 0-1 */
  progress?: number;
  group?: string;
  color?: string;
  milestone?: boolean;
}
export interface NativeGanttChartProperties extends NativeChartCommonProperties {
  tasks: readonly NativeGanttTask[];
  colors?: readonly string[];
  taskName?: string;
  progressName?: string;
  milestoneName?: string;
  locale?: string;
  /** Line at this timestamp (`true`: now) @default false */
  today?: boolean | number;
  todayLabel?: string;
  xAxis?: NativeChartAxisOptions;
  yAxis?: NativeChartAxisOptions;
}
export interface NativeChartHoverItem {
  seriesIndex: number;
  seriesId: string;
  seriesName: string;
  /** Index of the point in the series data */
  index: number;
  x: number;
  y: number;
  color: string;
  label?: string;
}
export interface NativeChartHoverEvent {
  items: NativeChartHoverItem[];
  x: number;
  xLabel: string;
}
export interface NativeChartView {
  x: [number, number];
  y: [number, number];
}
/** Rectangle in px relative to the chart */
export interface NativeChartRect {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface NativeChartDragEvent {
  item: NativeChartHoverItem;
  /** Data coordinates under the finger */
  x: number;
  y: number;
}
/** `event.detail` of the chart, line-chart, bar-chart and scatter-chart events */
export interface NativeChartEvents {
  /** Highlighted points; `items` is empty and `x` null when cleared */
  hover: {
    items: NativeChartHoverItem[];
    x: number | null;
    xLabel: string;
  };
  pointclick: NativeChartHoverEvent;
  plotclick: { x: number; y: number };
  zoom: NativeChartView;
  layout: NativeChartRect;
  pointdrag: NativeChartDragEvent;
  pointdrop: NativeChartDragEvent;
}
export interface NativeChartConfig {
  xAxis?: { format?: (value: number) => string };
  yAxis?: { format?: (value: number) => string };
  /** Tooltip text (`\n` separates lines); `null` hides the tooltip */
  renderTooltip?: (event: NativeChartHoverEvent) => string | null;
  /** heatmap-chart, sparkline and waterfall-chart: formats the values */
  format?: (value: number) => string;
  /** histogram-chart: formats the edges of the bins (tooltip) */
  formatBin?: (value: number) => string;
  /** gantt-chart: formats the progress shares (tooltip) */
  formatProgress?: (share: number) => string;
}
interface NativeChartMethods extends NativeConfigConsumer {
  /** Measures the canvas again (after a host layout change) */
  resize(): void;
  resetZoom(): void;
  getView(): NativeChartView | null;
  setView(view: Partial<NativeChartView>): void;
  /** Plot area in px (`null` before the first frame) */
  getPlotRect(): NativeChartRect | null;
  /** Data coordinates -> px of the chart */
  toPixel(x: number, y: number): { x: number; y: number } | null;
  /** Px of the chart -> data coordinates */
  fromPixel(x: number, y: number): { x: number; y: number } | null;
}
export interface NativeChartInstance extends NativeChartMethods {
  configure(config: NativeChartConfig): void;
}
export interface NativeQuadrantPoint {
  x: number;
  y: number;
  label?: string;
  color?: string;
  size?: number;
}
export interface NativeQuadrantRegion {
  label?: string;
  color?: string;
}
export interface NativeQuadrantRegions {
  topLeft?: NativeQuadrantRegion;
  topRight?: NativeQuadrantRegion;
  bottomLeft?: NativeQuadrantRegion;
  bottomRight?: NativeQuadrantRegion;
}
export type NativeQuadrantCorner = keyof NativeQuadrantRegions;
export interface NativeQuadrantAxisLabels {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}
export interface NativeQuadrantChartProperties extends NativeChartCommonProperties {
  points: readonly NativeQuadrantPoint[];
  /** @default [0, 10] */
  xDomain?: [number, number];
  /** @default [0, 10] */
  yDomain?: [number, number];
  xSplit?: number;
  ySplit?: number;
  quadrants?: NativeQuadrantRegions;
  xLabel?: string;
  yLabel?: string;
  axisLabels?: NativeQuadrantAxisLabels;
  /** @default true */
  showTicks?: boolean;
  reverseX?: boolean;
  /** @default true */
  showLabels?: boolean;
  /** @default 12 */
  pointSize?: number;
  name?: string;
  /** Dots can be dragged (`pointdrag` / `pointdrop`) @default false */
  draggable?: boolean;
}
export interface NativeQuadrantDropTarget {
  x: number;
  y: number;
  quadrant: NativeQuadrantCorner;
}
/** `event.detail` of the quadrant-chart events */
export interface NativeQuadrantChartEvents {
  hover: NativeChartEvents["hover"];
  pointclick: { point: NativeQuadrantPoint; index: number };
  quadrantclick: { quadrant: NativeQuadrantCorner; x: number; y: number };
  pointdrag: {
    point: NativeQuadrantPoint;
    index: number;
    target: NativeQuadrantDropTarget;
  };
  pointdrop: {
    point: NativeQuadrantPoint;
    index: number;
    target: NativeQuadrantDropTarget;
  };
  zoom: NativeChartView;
  layout: NativeChartRect;
}
export interface NativeQuadrantChartConfig {
  /** Tooltip text of a point (`\n` separates lines); `null` hides it */
  renderTooltip?: (point: NativeQuadrantPoint, index: number) => string | null;
}
export interface NativeQuadrantChartInstance extends NativeChartMethods {
  configure(config: NativeQuadrantChartConfig): void;
}

/** A named value of a shape chart (pie slice, funnel stage) */
export interface NativeShapeDatum {
  name: string;
  /** Negative values count as 0 */
  value: number;
  /** Any CSS color, `var(--x)` included; the palette when omitted */
  color?: string;
}
export interface NativeTreemapNode {
  name: string;
  /** Leaves carry a value, parents sum their children */
  value?: number;
  color?: string;
  children?: readonly NativeTreemapNode[];
}
export interface NativeRadarIndicator {
  name: string;
  /** @default the largest value of the indicator */
  max?: number;
  /** @default 0 */
  min?: number;
}
export interface NativeRadarSeries {
  name?: string;
  /** One value per indicator */
  values: readonly number[];
  color?: string;
  /** Fill opacity */
  opacity?: number;
}
export interface NativeGaugeBand {
  /** Upper bound of the band */
  to: number;
  color: string;
}
export interface NativeShapeLegendOptions {
  /** @default "bottom" */
  position?: "top" | "bottom";
  /** Tapping an item hides / shows its entry @default true */
  toggle?: boolean;
}
/** Properties of every shape chart component */
export interface NativeShapeChartFrameProperties {
  /** Numbers are px; any CSS length otherwise @default "100%" */
  width?: number | string;
  /** Numbers are px; any CSS length otherwise @default 320 (gauge-chart: 240, radial-bar-chart: 300, sankey- and sunburst-chart: 360, calendar-heatmap and bullet-chart: from the data) */
  height?: number | string;
  /** Stops the page from scrolling while the canvas is touched @default false */
  disableScroll?: boolean;
}
/** Properties shared by pie-, donut-, radar-, gauge-, funnel- and treemap-chart */
export interface NativeShapeChartCommonProperties extends NativeShapeChartFrameProperties {
  palette?: readonly string[];
  /** Shown by default for pie, donut, funnel and multi-series radar charts */
  legend?: boolean | NativeShapeLegendOptions;
  /** Tooltip drawn on the canvas; `false` disables it */
  tooltip?: boolean;
  /** Hidden entries by index; set (even `[]`) it is controlled: legend taps only emit `toggle` */
  hidden?: readonly number[] | null;
  /** @default true */
  animation?: boolean;
  padding?: NativeChartPadding;
  ariaLabel?: string;
}
export interface NativePieChartProperties extends NativeShapeChartCommonProperties {
  data: readonly NativeShapeDatum[];
  /** Fraction of the outer radius @default 0 (donut-chart: 0.62) */
  innerRadius?: number;
  /** Degrees clockwise from 12 o'clock @default 0 */
  startAngle?: number;
  /** Gap between the slices in px */
  padAngle?: number;
  /** Corner radius of the slices in px */
  cornerRadius?: number;
  rose?: boolean;
  labels?: "outside" | "inside" | "none";
  labelContent?: readonly ("name" | "value" | "percent")[];
  centerValue?: string;
  centerLabel?: string;
}
export type NativeDonutChartProperties = NativePieChartProperties;
export interface NativeRadarChartProperties extends NativeShapeChartCommonProperties {
  indicators: readonly NativeRadarIndicator[];
  series: readonly NativeRadarSeries[];
  /** @default "polygon" */
  shape?: "polygon" | "circle";
  /** @default 4 */
  levels?: number;
  /** @default true */
  dots?: boolean;
}
export interface NativeGaugeChartProperties extends NativeShapeChartCommonProperties {
  value: number;
  /** @default 0 */
  min?: number;
  /** @default 100 */
  max?: number;
  label?: string;
  /** Degrees @default 240 */
  sweep?: number;
  /** Fraction of the radius @default 0.16 */
  thickness?: number;
  bands?: readonly NativeGaugeBand[];
  color?: string;
  needle?: boolean;
  /** @default true */
  ticks?: boolean;
}
export interface NativeFunnelChartProperties extends NativeShapeChartCommonProperties {
  data: readonly NativeShapeDatum[];
  /** @default "none" */
  sort?: "descending" | "ascending" | "none";
  /** @default 4 */
  gap?: number;
  /** @default true */
  conversion?: boolean;
  /** @default "trapezoid" */
  shape?: "trapezoid" | "bar";
}
export interface NativeTreemapChartProperties extends NativeShapeChartCommonProperties {
  data: readonly NativeTreemapNode[];
  /** @default 2 */
  gap?: number;
  /** @default true */
  headers?: boolean;
}
export interface NativeSankeyNode {
  name: string;
  color?: string;
  column?: number;
}
export interface NativeSankeyLink {
  source: string | number;
  target: string | number;
  value: number;
  color?: string;
}
export interface NativeSankeyChartProperties extends NativeShapeChartCommonProperties {
  nodes?: readonly NativeSankeyNode[];
  links: readonly NativeSankeyLink[];
  /** @default 12 */
  nodeWidth?: number;
  /** @default 12 */
  nodePadding?: number;
  /** @default "justify" */
  align?: "justify" | "left" | "right" | "center";
  /** @default 32 */
  iterations?: number;
  /** @default "gradient" */
  linkColor?: "gradient" | "source" | "target" | "neutral";
  /** @default 0.4 */
  linkOpacity?: number;
  /** @default true */
  labels?: boolean;
  /** @default true */
  labelValues?: boolean;
}
export interface NativeSunburstChartProperties extends NativeShapeChartCommonProperties {
  data: readonly NativeTreemapNode[];
  /** @default 0.26 */
  innerRadius?: number;
  levels?: number;
  /** @default 0 */
  startAngle?: number;
  /** @default 1 */
  padAngle?: number;
  /** @default 2 */
  cornerRadius?: number;
  /** @default "auto" */
  labels?: "auto" | "tangential" | "radial" | "none";
  /** Tapping a parent zooms into it, the center goes back up @default true */
  drill?: boolean;
  /** Controlled drill-down: taps only emit `drill` */
  drillPath?: readonly string[] | null;
}
export interface NativeRadialBarDatum extends NativeShapeDatum {
  max?: number;
}
export interface NativeRadialBarChartProperties extends NativeShapeChartCommonProperties {
  data: readonly NativeRadialBarDatum[];
  max?: number;
  /** @default 0.3 */
  innerRadius?: number;
  /** @default 0 */
  startAngle?: number;
  /** @default 270 */
  sweep?: number;
  /** @default 0.28 */
  gap?: number;
  /** @default true */
  track?: boolean;
  /** @default true */
  rounded?: boolean;
  labels?: boolean;
  labelContent?: readonly ("name" | "value" | "percent")[];
  centerValue?: string;
  centerLabel?: string;
}
export interface NativeCalendarDatum {
  /** `YYYY-MM-DD` or a timestamp */
  date: string | number;
  value: number;
}
export interface NativeCalendarHeatmapProperties extends NativeShapeChartCommonProperties {
  data: readonly NativeCalendarDatum[];
  /** A year or an inclusive `[start, end]` range */
  range?: number | [string | number, string | number];
  /** @default "weeks" */
  layout?: "weeks" | "months";
  weekStart?: number;
  locale?: string;
  color?: string;
  colors?: readonly string[];
  /** @default 4 */
  levels?: number;
  thresholds?: readonly number[];
  /** @default 3 */
  gap?: number;
  /** @default 2 */
  radius?: number;
  maxCellSize?: number;
  /** @default true */
  monthLabels?: boolean;
  /** @default true */
  weekdayLabels?: boolean;
}
export interface NativeBulletDatum {
  name: string;
  /** Small text under the name */
  subtitle?: string;
  value: number;
  target?: number;
  ranges?: readonly number[];
  min?: number;
  max?: number;
  color?: string;
}
export interface NativeBulletChartProperties extends NativeShapeChartCommonProperties {
  data: readonly NativeBulletDatum[];
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  ranges?: readonly number[];
  rangeLabels?: readonly string[];
  rangeColors?: readonly string[];
  /** @default 0.4 */
  barSize?: number;
  targetColor?: string;
  /** @default true */
  ticks?: boolean;
}
/** shape-chart: any shape type of the engine from its options */
export interface NativeShapeChartProperties extends NativeShapeChartFrameProperties {
  /** Options by `type` ("pie", "radar", "gauge", "funnel", "treemap"...) without functions (see `configure`) */
  options: { type: string; [option: string]: unknown };
}
export interface NativeShapeHoverEvent {
  /** Index of the slice / stage / series / leaf; -1 when the highlight is cleared (`hover`) */
  index: number;
  /** Radar: index of the closest indicator */
  indicator?: number;
  name: string;
  value: number;
  /** Share, 0-1 */
  percent: number;
  color: string;
  /** Treemap / sunburst: names from the root */
  path?: string[];
  /** Calendar heatmap: `YYYY-MM-DD` */
  date?: string;
  /** Sankey link ends */
  source?: string;
  target?: string;
}
export interface NativeShapeToggleEvent {
  index: number;
  /** Whether the entry is (or, controlled, would be) hidden */
  hidden: boolean;
  hiddenIndexes: number[];
}
/** `event.detail` of the shape chart events */
export interface NativeShapeChartEvents {
  hover: NativeShapeHoverEvent;
  click: NativeShapeHoverEvent;
  toggle: NativeShapeToggleEvent;
  /** sunburst-chart (and shape-chart with a sunburst): names from the root to the focused node */
  drill: { path: string[] };
}
/** Function options of the shape charts (not serializable as properties) */
export interface NativeShapeChartConfig {
  /** Values of the labels and the tooltip */
  format?: (value: number) => string;
  /** Shares (0-1) of the labels and the tooltip */
  percentFormat?: (share: number) => string;
  /** Tooltip text (`\n` separates lines); `null` hides the tooltip */
  renderTooltip?: (event: NativeShapeHoverEvent) => string | null;
}
export interface NativeShapeChartInstance extends NativeConfigConsumer {
  configure(config: NativeShapeChartConfig): void;
  /** Measures the canvas again (after a host layout change) */
  resize(): void;
  /** Hides / shows an entry (emits `toggle`) */
  toggle(index: number): void;
  /** Indexes of the hidden entries */
  getHidden(): number[];
  /** Removes the highlight and the tooltip */
  clearHover(): void;
  /** Sunburst: focuses the node at this path (`[]` = the root), emits `drill` */
  drill(path: readonly string[]): void;
  /** Sunburst: names from the root to the focused node */
  getDrillPath(): string[];
}

/** DatePicker data properties; omitted value is uncontrolled, null/empty stays controlled. */
export interface NativeDatePickerProperties {
  value?: string | null;
  defaultValue?: string;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  clearable?: boolean;
  label?: string;
  ariaLabel?: string;
  placeholder?: string;
  name?: string;
  id?: string;
  size?: "small" | "medium" | "large";
}
