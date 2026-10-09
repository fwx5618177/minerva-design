import type {
  NativeConfigProviderInstance,
  NativeTableInstance,
  NativeTableEvents,
  NativeCascaderInstance,
  NativePopoverInstance,
  NativeAppShellInstance,
  NativeEvent,
  NativeMenuInstance,
} from "minerva-design/weapp/types";
interface Member {
  id: string;
  name: string;
  score: number;
  disabled?: boolean;
}
declare const table: NativeTableInstance<Member>;
table.configure({
  rowKey: (row) => row.id,
  comparators: { score: (a, b) => a.score - b.score },
  cellRender: (row, column) => ({
    primary: String(row[column.key as keyof Member]),
    secondary: row.name,
    action: "Inspect",
  }),
  getCheckboxProps: (row) => ({ disabled: row.disabled }),
});
const selected = (
  event: NativeEvent<NativeTableEvents<Member>["selectionchange"]>,
) => event.detail.selectedRows.map((row) => row.name);
void selected;
// @ts-expect-error native comparator must return a number
table.configure({ comparators: { score: () => "invalid" } });
declare const cascader: NativeCascaderInstance;
cascader.configure({
  loadData: async (path) => {
    const leaf = path.at(-1);
    if (leaf) leaf.children = [{ value: "child", label: "Child" }];
  },
  filter: (query, path) =>
    path.some((option) => String(option.label).includes(query)),
});
declare const provider: NativeConfigProviderInstance;
provider.configure({ messages: { zh: { table: { empty: "暂无记录" } } } });
provider.setTheme({
  light: { "primary-color": "#123456" },
  dark: { "primary-color": "#abcdef" },
});
provider.setPalette(null);
const stop = provider.subscribeConfig((config) => {
  const mode: "light" | "dark" = config.resolvedMode;
  void mode;
});
stop();
table.bindConfig(provider);
table.translate("table.selectRow", { row: "Ada" });
declare const popover: NativePopoverInstance;
popover.configure({
  measure: () => ({
    anchor: { left: 1, top: 2, width: 10, height: 20 },
    panel: { left: 0, top: 0, width: 100, height: 120 },
    viewport: { width: 375, height: 667 },
  }),
  onInteractOutside: () => false,
});
void popover.reposition();
declare const shell: NativeAppShellInstance;
shell.measure(1024);
shell.openNavigation();
shell.expandNavigation();
declare const menu: NativeMenuInstance;
menu.configure({
  onCheckedChange: (key, checked) => {
    const state: boolean = checked;
    void [key, state];
  },
});

declare const virtualList: import("minerva-design/weapp/types").NativeVirtualInstance<Member>;
virtualList.configure({
  renderItem: (row, index) => `${index}: ${row.name}`,
  onLoadMore: async () => {},
});
virtualList.measure({ itemContentHeight: 24, viewportHeight: 320 });
virtualList.scrollToIndex(12);
declare const upload: import("minerva-design/weapp/types").NativeUploadInstance;
upload.configure({
  labels: { tooMany: (max) => `At most ${max}` },
  normalizeFile: (file) => ({
    ...file,
    type: file.name.endsWith(".pdf") ? "application/pdf" : file.type,
  }),
});
upload.selectFiles([
  {
    name: "file.pdf",
    path: "/tmp/file.pdf",
    size: 42,
    type: "application/pdf",
  },
]);
declare const command: import("minerva-design/weapp/types").NativeCommandInstance;
command.configure({
  filter: (items, query) =>
    items.filter((item) => item.title.includes(query)).reverse(),
});
command.setOpen(true);
declare const tooltip: import("minerva-design/weapp/types").NativeTooltipInstance;
tooltip.open();
tooltip.close();

declare const field: import("minerva-design/weapp/types").NativeFormConsumer;
const disabled: boolean = field.getFormState().disabled;
void disabled;
declare const notifications: import("minerva-design/weapp/types").NativeToastProviderInstance;
const toastId = notifications.show({
  title: "Saved",
  duration: 0,
  action: { label: "Undo", onClick: () => {} },
});
notifications.pause(toastId);
notifications.resume(toastId);
void notifications.promise(Promise.resolve(1), {
  loading: "Wait",
  success: (value) => `Done ${value}`,
  error: (error) => String(error),
});
