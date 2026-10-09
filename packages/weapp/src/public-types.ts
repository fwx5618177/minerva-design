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
