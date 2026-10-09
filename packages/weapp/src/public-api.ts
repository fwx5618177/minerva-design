interface Method {
  name: string;
  signature: string;
  description: string;
}
interface Event {
  name: string;
  detail: string;
  description: string;
}
type Control = { template: string; definition: WechatMiniprogram.IAnyObject };
const method = (
  name: string,
  signature: string,
  description: string,
): Method => ({ name, signature, description });
const event = (name: string, detail: string, description: string): Event => ({
  name,
  detail,
  description,
});
const value = event(
  "change",
  "{ value: unknown }",
  "Requested next value; a controlled owner must publish the accepted prop.",
);
const open = event(
  "openchange",
  "{ open: boolean }",
  "Requested visible state; controlled owners may reject it.",
);
const page = event(
  "pagechange",
  "{ current: number; pageSize: number }",
  "Requested page and page size.",
);
const configurations: Record<string, Method> = {
  modal: method(
    "configure",
    "configure(config: NativeDrawerConfig): void",
    "Return false from onInteractOutside to veto native modal backdrop dismissal.",
  ),
  drawer: method(
    "configure",
    "configure(config: NativeDrawerConfig): void",
    "onInteractOutside returns false to veto native backdrop dismissal.",
  ),
  virtualList: method(
    "configure",
    "configure(config: NativeVirtualConfig): void",
    "renderItem returns native row text; onLoadMore may return a Promise and is locked until settlement. Rich rows use the row-renderer native generic.",
  ),
  upload: method(
    "configure",
    "configure(config: NativeUploadConfig): void",
    "Configure translated validation/action labels and normalize native file MIME metadata before core accept/size validation.",
  ),
  commandDialog: method(
    "configure",
    "configure(config: NativeCommandConfig): void",
    "filter(enabledItems, trimmedQuery) returns ranked original items before maxResults is applied.",
  ),
  contextMenu: method(
    "configure",
    "configure(config: MenuConfig): void",
    "The same nested/action/checkbox/radio callbacks as Menu, opened by native long press.",
  ),
  autoComplete: method(
    "configure",
    "configure(config: NativeCompletionConfig): void",
    "filterOption(query,option), groupBy(option), sortOption(a,b) customize serialized suggestion processing.",
  ),
  cascader: method(
    "configure",
    "configure(config: NativeCascadeConfig): void",
    "filter(input,path), async loadData(selectedOptions), optionRender(option,level). Publish loaded children through options; pending paths coalesce and failed loads are retryable.",
  ),
  monthCalendar: method(
    "configure",
    "configure(config: CalendarConfig): void",
    "disabledDate(day), getDayLabel(day,count), getEventsLabel(day); dates are serialized YYYY-MM-DD.",
  ),
  pagination: method(
    "configure",
    "configure(config: PaginationConfig): void",
    "itemRender(page,type) and totalRender(total,[start,end]) return native text.",
  ),
  menu: method(
    "configure",
    "configure(config: MenuConfig): void",
    "onSelect(item), onCheckedChange(key,checked), onValueChange(group,value) callbacks. Serialized item definitions support nested groups, checkboxes and radio groups.",
  ),
  navTree: method(
    "configure",
    "configure(config: { filter?: (query: string, item: TreeItem) => boolean }): void",
    "Custom search predicate; matching descendants keep their ancestor paths.",
  ),
  table: method(
    "configure",
    "configure(config: NativeTableConfig): void",
    "rowKey(row,index), comparators by column key, cellRender(row,column,index), getCheckboxProps(row), getRowLabel(row,index), filter(row,filters). Native rich-cell return values are NativeTableCell or text; arbitrary components use generic:cell-renderer.",
  ),
  dataTable: method(
    "configure",
    "configure(config: NativeTableConfig): void",
    "Same callbacks as Table; pagination receives already paginated rows by default.",
  ),
  popover: method(
    "configure",
    "configure(config: NativePopoverConfig): void",
    "Optional measure() supplies native anchor/panel/viewport rectangles; onInteractOutside() returning false prevents dismissal.",
  ),
  configProvider: method(
    "configure",
    "configure(config: { messages?: Record<string, Messages> }): void",
    "Merge custom message trees per language into the inherited core translations and refresh descendants.",
  ),
  themeProvider: method(
    "configure",
    "configure(config: { messages?: Record<string, Messages> }): void",
    "Merge custom message trees per language into inherited translations.",
  ),
};
const tableEvents = [
  event(
    "sortchange",
    "{ sortState: { key: string; order: 'ascend' | 'descend' | null } }",
    "Requested sort state.",
  ),
  event(
    "selectionchange",
    "{ selectedRowKeys: Array<string | number>; selectedRows: Record<string, unknown>[] }",
    "Requested row selection, excluding disabled rows from select-all.",
  ),
  event(
    "filterchange",
    "{ filters: Record<string, string[]> }",
    "Requested column filters.",
  ),
  page,
  event(
    "rowclick",
    "{ row: Record<string, unknown>; key: string | number; index: number }",
    "Original row and source index.",
  ),
  event(
    "cellaction",
    "{ row: Record<string, unknown>; key: string | number; index: number; columnKey: string; detail: unknown }",
    "Action emitted from a native rich cell or custom cell-renderer Component.",
  ),
];
const events: Record<string, Event[]> = {
  drawer: [
    open,
    event(
      "close",
      "{ reason: 'trigger' | 'close' | 'overlay' }",
      "Close reason.",
    ),
    event(
      "interactoutside",
      "{}",
      "Native backdrop interaction before configured veto.",
    ),
  ],
  virtualList: [
    event("scroll", "{ scrollTop: number }", "Native scroll offset."),
    event(
      "itemclick",
      "{ item: Record<string, unknown>; index: number }",
      "Original row and absolute item index.",
    ),
    event(
      "loadmore",
      "{}",
      "Near-bottom downward scrolling requested more rows; completeLoadMore releases event-only requests.",
    ),
    event(
      "loaderror",
      "{ message: string }",
      "Configured asynchronous loader rejected; a later scroll may retry.",
    ),
  ],
  upload: [
    event(
      "filesselected",
      "{ files: NativeUploadFile[] }",
      "Validated native file paths; the consumer owns upload transport and value status.",
    ),
    event(
      "select",
      "{ files: NativeUploadFile[] }",
      "Compatibility alias for filesselected.",
    ),
    event(
      "error",
      "{ code: 'too-many' | 'invalid-type' | 'too-large' | 'picker'; message: string; files?: NativeUploadFile[] }",
      "Selection validation or native picker error; cancellations are ignored.",
    ),
    event(
      "remove",
      "{ id: string; item: NativeUploadItem }",
      "Requested removal; owner updates value.",
    ),
    event(
      "retry",
      "{ item: NativeUploadItem }",
      "Requested retry of an error item.",
    ),
  ],
  alert: [
    event(
      "expand",
      "{ expanded: boolean }",
      "Controlled or local collapse request.",
    ),
    event("close", "{}", "Dismissed alert."),
  ],
  commandDialog: [
    open,
    event(
      "select",
      "{ item: NativeCommandItem }",
      "Original chosen enabled command.",
    ),
  ],
  iconButton: [
    event("click", "{}", "Enabled activation."),
    event(
      "pressedchange",
      "{ pressed: boolean }",
      "Requested toggle state; controlled owners retain authority.",
    ),
  ],
  tooltip: [
    open,
    event("open", "{}", "Open requested by native touch or instance method."),
    event("close", "{}", "Close requested by native touch or instance method."),
  ],
  select: [value, open],
  jsonField: [
    event(
      "change",
      "{ value: string | Record<string, unknown> }",
      "Every edit/format emits text; legacy object value mode emits parsed valid JSON only.",
    ),
    event("error", "{ message: string }", "JSON syntax feedback."),
  ],
  tabs: [value],
  textarea: [
    value,
    event("focus", "{}", "Native input focus."),
    event("blur", "{}", "Native input blur."),
  ],
  cascader: [
    value,
    open,
    event(
      "load",
      "{ selectedOptions: unknown[] }",
      "Lazy branch expansion requested.",
    ),
    event(
      "loaderror",
      "{ message: string; selectedOptions: unknown[] }",
      "Lazy load failed; the branch can be retried.",
    ),
  ],
  monthCalendar: [
    value,
    event(
      "monthchange",
      "{ month: string }",
      "Requested YYYY-MM visible month.",
    ),
    event(
      "eventclick",
      "{ event: { id: string; date: string; title: string } }",
      "Original selected calendar event.",
    ),
  ],
  pagination: [
    event(
      "change",
      "{ current: number; pageSize: number }",
      "Requested page/size; changing size resets the requested page to one.",
    ),
  ],
  menu: [
    value,
    open,
    event(
      "select",
      "{ value: string; item: unknown }",
      "Original activated action item.",
    ),
    event(
      "checkedchange",
      "{ key: string; checked: boolean; item: unknown }",
      "Checkbox item state request.",
    ),
    event(
      "valuechange",
      "{ key: string; value: string; item: unknown }",
      "Radio group state request.",
    ),
  ],
  navTree: [
    value,
    event("select", "{ value: string; item: TreeItem }", "Original tree item."),
    event(
      "expandchange",
      "{ expandedKeys: string[]; expandedIds: string[] }",
      "Requested expanded node identifiers.",
    ),
  ],
  steps: [
    event(
      "change",
      "{ value: string; current: number }",
      "Requested step and its index; readOnly defaults true.",
    ),
  ],
  table: tableEvents,
  dataTable: [
    ...tableEvents,
    event("retry", "{}", "Retry requested from the error state."),
  ],
  timePicker: [
    event(
      "change",
      "{ value: string | null }",
      "Serialized HH:mm[:ss], or null on clear; Date is not transmitted across the native property boundary.",
    ),
    open,
  ],
  pageTabs: [
    value,
    event("select", "{ value: string }", "Page label activation."),
    event(
      "close",
      "{ value: string }",
      "Separate action activation; item.disabled disables the label, item.actionDisabled disables the action.",
    ),
  ],
  popover: [
    open,
    event("interactoutside", "{}", "Outside native tap before dismissal."),
    event(
      "positionchange",
      "{ side: string; left: number; top: number; availableWidth: number; availableHeight: number }",
      "Measured native placement after flip/shift.",
    ),
  ],
  appShell: [
    event(
      "sidebarmodechange",
      "{ mode: 'expanded' | 'compact' | 'floating' }",
      "Requested desktop sidebar mode.",
    ),
    event(
      "navigationstate",
      "{ mode: string; collapsed: boolean; isMobile: boolean; open: boolean }",
      "Current native navigation state for the navigation slot owner.",
    ),
  ],
  configProvider: [
    event(
      "themechange",
      "{ theme: unknown; mode: string; resolvedMode?: string; palette?: string | null }",
      "Theme request or OS theme update.",
    ),
    event("palettechange", "{ palette: string | null }", "Requested palette."),
  ],
  themeProvider: [
    event(
      "themechange",
      "{ theme: unknown; mode: string; resolvedMode?: string; palette?: string | null }",
      "Theme request or OS theme update.",
    ),
    event("palettechange", "{ palette: string | null }", "Requested palette."),
  ],
  themeToggle: [value],
  paletteToggle: [
    value,
    event(
      "paletterequest",
      "{ palette: string | null }",
      "Bubbling native palette request; the nearest provider is also updated.",
    ),
  ],
  avatar: [
    event(
      "error",
      "{ errMsg?: string }",
      "Native image load error; initials/fallback becomes visible.",
    ),
  ],
  avatarGroup: [
    event(
      "error",
      "{ index: number; item: unknown }",
      "A member image failed; only that source falls back.",
    ),
  ],
  formLayout: [
    event(
      "submit",
      "{ value: Record<string, unknown>; formId?: string }",
      "Native form values, forwarded once.",
    ),
    event("reset", "{}", "Native form reset, forwarded once."),
  ],
};
export function annotateNativeApi(controls: Record<string, Control>) {
  for (const [name, control] of Object.entries(controls)) {
    const methods: Method[] = [];
    if (control.definition.methods?.getFormState)
      methods.push(
        method(
          "getFormState",
          "getFormState(): NativeFormState",
          "Read inherited disabled/readOnly/required/invalid. Null props inherit the nearest FormControl/FormField; explicit false overrides it.",
        ),
      );
    if (name === "toastProvider")
      methods.push(
        method(
          "show",
          "show(options: NativeToastOptions): NativeToastId",
          "Show or upsert a toast in this host (scope=local isolates its store).",
        ),
        method(
          "update",
          "update(id: NativeToastId, options: NativeToastOptions): void",
          "Update an existing toast.",
        ),
        method(
          "dismiss",
          "dismiss(id?: NativeToastId): void",
          "Dismiss one or every toast in this host store.",
        ),
        method(
          "pause",
          "pause(id: NativeToastId): void",
          "Pause a running timer; native touch-down also pauses.",
        ),
        method(
          "resume",
          "resume(id: NativeToastId): void",
          "Resume with the remaining duration; native touch-end/cancel also resumes.",
        ),
        method(
          "promise",
          "promise<T>(promise: Promise<T>, messages: NativeToastMessages<T>, options?: NativeToastOptions): Promise<T>",
          "Display loading/success/error transitions and return the original promise.",
        ),
      );
    if (name === "virtualList")
      methods.push(
        method(
          "measure",
          "measure(metrics: { itemContentHeight?: number; viewportHeight?: number }): void",
          "Supply first-row content height (padding is added internally) or viewport height.",
        ),
        method(
          "reposition",
          "reposition(): void",
          "Query native viewport and first row content geometry.",
        ),
        method(
          "completeLoadMore",
          "completeLoadMore(): void",
          "Release a loadmore event-only request when no Promise callback is configured.",
        ),
        method(
          "scrollToIndex",
          "scrollToIndex(index: number): void",
          "Scroll to an absolute row, clamped to the available items.",
        ),
      );
    if (name === "upload")
      methods.push(
        method(
          "selectFiles",
          "selectFiles(files: NativeUploadFile[]): void",
          "Validate files from an application-owned native picker using the same accept/size/count rules.",
        ),
      );
    if (name === "commandDialog")
      methods.push(
        method(
          "setOpen",
          "setOpen(open: boolean): void",
          "Request command panel visibility; controlled owner may reject.",
        ),
      );
    if (name === "tooltip")
      for (const action of ["open", "close", "toggle"])
        methods.push(
          method(
            action,
            `${action}(): void`,
            "Immediate native tooltip visibility request; controlled owner may reject.",
          ),
        );
    if (name === "tagInput")
      methods.push(
        method(
          "paste",
          "paste(text: string, start?: number, end?: number): void",
          "Insert delimited clipboard text at the supplied draft selection; native input does not expose browser clipboard ranges.",
        ),
      );
    if (name === "confirmProvider")
      methods.push(
        method(
          "request",
          "request(options: NativeConfirmOptions): Promise<boolean>",
          "Queue a native confirmation and resolve on confirm/cancel or provider teardown.",
        ),
      );
    if (configurations[name]) methods.push(configurations[name]);
    if (
      ["responsiveGrid", "formLayout", "splitLayout", "appShell"].includes(name)
    )
      methods.push(
        method(
          "measure",
          "measure(width: number): void",
          "Publish measured container width (AppShell uses viewport width). ready/window-resize measurements are automatic; call after other host layout changes.",
        ),
      );
    if (name === "pageTabs")
      methods.push(
        method(
          "measure",
          "measure(metrics: { viewportWidth: number; contentWidth: number; scrollLeft?: number }): void",
          "Publish native scroll geometry.",
        ),
        method(
          "reposition",
          "reposition(): void",
          "Re-measure viewport and content through createSelectorQuery.",
        ),
      );
    if (name === "popover")
      methods.push(
        method(
          "reposition",
          "reposition(): Promise<void>",
          "Re-measure anchor and panel after host content/scroll changes.",
        ),
      );
    if (name === "appShell")
      for (const m of ["openNavigation", "closeNavigation", "expandNavigation"])
        methods.push(
          method(
            m,
            `${m}(): void`,
            "Update the native drawer or request expanded sidebar mode.",
          ),
        );
    if (name === "configProvider" || name === "themeProvider") {
      methods.push(
        method(
          "setTheme",
          "setTheme(theme: string | Record<string, unknown>): void",
          "Request light/dark/system/github-dark/custom or light-dark token pairs; controlled mode/theme owners retain final authority.",
        ),
        method(
          "setPalette",
          "setPalette(palette: 'editorial' | 'tech' | 'graphite' | 'cool' | null): void",
          "Request a palette; null selects the base palette.",
        ),
        method(
          "subscribeConfig",
          "subscribeConfig(listener: (config: NativeConfiguration) => void): () => void",
          "Receive initial/current inherited config changes; return value unsubscribes.",
        ),
      );
    }
    if (control.definition.methods?.getConfig)
      methods.push(
        method(
          "getConfig",
          "getConfig(): NativeConfiguration",
          "Read effective theme, mode, palette, design, locale, direction and message trees.",
        ),
        method(
          "translate",
          "translate(key: string, options?: TranslateOptions): string",
          "Core interpolation/plural-aware localized text in the closest provider scope.",
        ),
        method(
          "bindConfig",
          "bindConfig(provider: NativeConfigProviderInstance): void",
          "Explicit native provider binding when the view is outside an ancestor relation.",
        ),
      );
    Object.assign(control, {
      publicApi: {
        methods,
        events:
          events[
            name === "contextMenu" ? "menu" : name === "modal" ? "drawer" : name
          ] ?? [],
      },
    });
  }
}
