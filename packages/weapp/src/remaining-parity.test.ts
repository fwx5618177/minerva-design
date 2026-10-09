import simulate from "miniprogram-simulate";
import { afterEach, expect, it, vi } from "vitest";
import {
  drawer,
  virtualList,
  upload,
  alert,
  box,
  commandDialog,
  contextMenu,
} from "./index";
const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => {
  mounted.splice(0).forEach((w) => w.detach());
  vi.restoreAllMocks();
});
const tick = () => simulate.sleep(0);
function mount(c: typeof drawer, p: Record<string, unknown>) {
  const id = simulate.load({
    tagName: "remaining-case",
    template: c.template,
    ...c.definition,
  });
  const w = simulate.render(id, p);
  w.attach(document.createElement("div"));
  mounted.push(w);
  return w;
}
it("Drawer defaults and trigger/close requests honor controlled rejection, outside veto, forceMount and side/size", async () => {
  const w = mount(drawer, {
    defaultOpen: true,
    side: "bottom",
    size: "large",
    forceMount: true,
    hideCloseButton: true,
  });
  expect(w.data.visible).toBe(true);
  expect(w.querySelector(".mn-drawer-close")).toBeFalsy();
  expect(w.querySelector(".mn-drawer")!.dom!.className).toContain(
    "mn-drawer-large",
  );
  w.instance.configure({ onInteractOutside: () => false });
  w.querySelector(".mn-backdrop")!.dispatchEvent("tap");
  await tick();
  expect(w.data.visible).toBe(true);
  w.instance.configure({});
  w.querySelector(".mn-backdrop")!.dispatchEvent("tap");
  await tick();
  expect(w.data.visible).toBe(false);
  expect(w.querySelector(".mn-drawer")).toBeTruthy();
  w.querySelector(".mn-drawer-trigger")!.dispatchEvent("tap");
  await tick();
  expect(w.data.visible).toBe(true);
  w.setData({ open: true, hideCloseButton: false });
  w.querySelector(".mn-drawer-close")!.dispatchEvent("tap");
  await tick();
  expect(w.data.visible).toBe(true);
});
it("VirtualList measures one content row, uses padded core ranges and locks async loadMore until completion", async () => {
  const w = mount(virtualList, {
    items: Array.from({ length: 20 }, (_, i) => ({
      id: i,
      metadata: { name: `Row ${i}` },
    })),
    maxHeight: 100,
    itemPadding: 5,
    overscan: 1,
  });
  let finish!: () => void;
  const load = vi.fn(
    () =>
      new Promise<void>((resolve) => {
        finish = resolve;
      }),
  );
  w.instance.configure({
    renderItem: (item: { id: number }) => `Item ${item.id}`,
    onLoadMore: load,
  });
  w.instance.measure({ itemContentHeight: 20, viewportHeight: 100 });
  expect(w.data.rowHeight).toBe(30);
  w.querySelector(".mn-virtual-list")!.dispatchEvent("scroll", {
    detail: { scrollTop: 450, scrollHeight: 600 },
  });
  await tick();
  expect({
    top: w.data.scrollTop,
    rowHeight: w.data.rowHeight,
    height: w.data.viewportHeight,
    length: w.data.items.length,
  }).toEqual({ top: 450, rowHeight: 30, height: 100, length: 20 });
  expect(w.data.visible[0].index).toBe(14);
  expect(load).toHaveBeenCalledTimes(1);
  w.querySelector(".mn-virtual-list")!.dispatchEvent("scroll", {
    detail: { scrollTop: 460, scrollHeight: 600 },
  });
  await tick();
  expect(load).toHaveBeenCalledTimes(1);
  finish();
  await tick();
  w.querySelector(".mn-virtual-list")!.dispatchEvent("scroll", {
    detail: { scrollTop: 470, scrollHeight: 600 },
  });
  await tick();
  expect(load).toHaveBeenCalledTimes(2);
});
it("Upload validates native document selections and preserves controlled files, retry/remove semantics and busy removal", async () => {
  const w = mount(upload, {
    label: "Document",
    value: [{ id: "old", name: "old.pdf", status: "error", error: "Offline" }],
    accept: ".pdf",
    replace: true,
    maxSize: 100,
  });
  const selected: unknown[] = [],
    removed: unknown[] = [],
    retry: unknown[] = [];
  w.addEventListener("filesselected", (e) => selected.push(e.detail));
  w.addEventListener("remove", (e) => removed.push(e.detail));
  w.addEventListener("retry", (e) => retry.push(e.detail));
  const picker = vi
    .spyOn(wx, "chooseMessageFile")
    .mockImplementation((options) => {
      options.success?.({
        tempFiles: [
          {
            name: "large.pdf",
            path: "/large.pdf",
            size: 101,
            type: "file",
            time: 0,
          },
        ],
        errMsg: "ok",
      });
    });
  w.querySelector(".mn-upload-select")!.dispatchEvent("tap");
  await tick();
  expect(picker).toHaveBeenCalledTimes(1);
  expect(w.data.errorMessage).toContain("size");
  expect(selected).toHaveLength(0);
  picker.mockImplementation((options) => {
    options.success?.({
      tempFiles: [
        { name: "new.pdf", path: "/new.pdf", size: 10, type: "file", time: 0 },
      ],
      errMsg: "ok",
    });
  });
  w.querySelector(".mn-upload-select")!.dispatchEvent("tap");
  await tick();
  expect(selected).toHaveLength(1);
  expect(w.data.value[0].id).toBe("old");
  w.querySelector(".mn-upload-retry")!.dispatchEvent("tap");
  await tick();
  expect(retry[0]).toMatchObject({ item: { id: "old" } });
  w.setData({ loading: true });
  w.querySelector(".mn-upload-retry")!.dispatchEvent("tap");
  w.querySelector(".mn-upload-remove")!.dispatchEvent("tap");
  await tick();
  expect(retry).toHaveLength(1);
  expect(removed[0]).toMatchObject({ item: { id: "old" } });
  expect(w.data.value).toHaveLength(1);
});
it("Alert controlled/uncontrolled expansion, semantic role, icons and close actions render full axes", async () => {
  const w = mount(alert, {
    title: "Warning",
    color: "warning",
    variant: "solid",
    size: "large",
    collapsible: true,
    defaultExpanded: false,
    closable: true,
    banner: true,
  });
  expect(w.data.effectiveRole).toBe("alert");
  expect(w.data.effectiveExpanded).toBe(false);
  expect(w.querySelector(".mn-alert-icon")!.dom!.textContent).toBe("!");
  w.querySelector(".mn-alert-expand")!.dispatchEvent("tap");
  await tick();
  expect(w.data.effectiveExpanded).toBe(true);
  w.setData({ expanded: false });
  w.querySelector(".mn-alert-expand")!.dispatchEvent("tap");
  await tick();
  expect(w.data.effectiveExpanded).toBe(false);
  w.querySelector(".mn-alert-close")!.dispatchEvent("tap");
  await tick();
  expect(w.querySelector(".mn-alert")).toBeFalsy();
});
it("Box shorthands resolve token precedence, sizes, backgrounds and authored style override", () => {
  const w = mount(box, {
    p: 4,
    px: 2,
    pl: 1,
    mx: "auto",
    w: 120,
    bg: "bg.canvas",
    rounded: "lg",
    boxShadow: "sm",
    customStyle: { paddingLeft: "7px" },
  });
  expect(w.data.boxStyle).toContain("padding:var(--space-4)");
  expect(w.data.boxStyle).toContain("padding-right:var(--space-2)");
  expect(w.data.boxStyle).toContain("padding-left:7px");
  expect(w.data.boxStyle).toContain("background:var(--canvas-color)");
  expect(w.data.boxStyle).toContain("width:120px");
});
it("CommandDialog applies configured ranking only to enabled items and can open itself", async () => {
  const w = mount(commandDialog, {
    defaultOpen: true,
    items: [
      { id: "a", title: "Alpha" },
      { id: "b", title: "Beta" },
      { id: "d", title: "Disabled", disabled: true },
    ],
  });
  const rank = vi.fn((items: { id: string }[]) => items.slice().reverse());
  w.instance.configure({ filter: rank });
  w.querySelector(".mn-command-input")!.dispatchEvent("input", {
    detail: { value: " x " },
  });
  await tick();
  expect(rank.mock.calls[0][0]).toHaveLength(2);
  expect(w.data.results.map((r: { id: string }) => r.id)).toEqual(["b", "a"]);
  w.querySelector(".mn-option")!.dispatchEvent("tap");
  await tick();
  expect(w.data.visible).toBe(false);
});
it("ContextMenu shares nested checkbox/radio/group schemas through native long press", async () => {
  const w = mount(contextMenu, {
    items: [
      {
        key: "group",
        type: "group",
        label: "Preferences",
        items: [
          {
            key: "check",
            type: "checkbox",
            label: "Enabled",
            defaultChecked: true,
          },
        ],
      },
    ],
  });
  w.querySelector(".mn-context-area")!.dispatchEvent("longpress");
  await tick();
  expect(w.data.effectiveOpen).toBe(true);
  expect(w.dom!.textContent).toContain("Preferences");
  w.querySelector(".mn-menu-item")!.dispatchEvent("tap");
  await tick();
  expect(
    w.data.menuRows.find((r: { key: string }) => r.key === "check").checked,
  ).toBe(false);
  expect(w.data.effectiveOpen).toBe(true);
});
it("Upload mixed media/document accepts use all-file picker and pure media uses both kinds", async () => {
  const choose = vi.fn();
  const media = vi.fn();
  Object.assign(wx, { chooseMessageFile: choose, chooseMedia: media });
  const w = mount(upload, {
    accept: "image/png,application/pdf",
    multiple: true,
  });
  w.querySelector(".mn-upload-select")!.dispatchEvent("tap");
  await tick();
  expect(choose.mock.calls[0][0].type).toBe("all");
  w.setData({ accept: "image/*,video/*" });
  w.querySelector(".mn-upload-select")!.dispatchEvent("tap");
  await tick();
  expect(media.mock.calls[0][0].mediaType).toEqual(["image", "video"]);
});
