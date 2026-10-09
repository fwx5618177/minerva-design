import simulate from "miniprogram-simulate";
import { afterEach, expect, it, vi } from "vitest";
import * as controls from "./index";
const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => {
  mounted.splice(0).forEach((w) => w.detach());
  vi.useRealTimers();
  vi.restoreAllMocks();
});
const tick = () => simulate.sleep(0);
function mount(
  name: keyof typeof controls,
  props: Record<string, unknown> = {},
) {
  const c = controls[name] as typeof controls.divider;
  const id = simulate.load({
    tagName: "basic-case",
    template: c.template,
    ...c.definition,
  });
  const w = simulate.render(id, props);
  w.attach(document.createElement("div"));
  mounted.push(w);
  return w;
}
it("Divider and Empty forward orientation geometry and actions", () => {
  const d = mount("divider", {
    orientation: "vertical",
    length: 90,
    thickness: 3,
    spacing: 4,
    flexItem: true,
    variant: "dotted",
    label: "Hidden",
  });
  expect(d.data.isVertical).toBe(true);
  expect(controls.divider.template).toContain(
    "aria-orientation=\"{{isVertical?'vertical':'horizontal'}}\"",
  );
  expect(d.data.dividerStyle).toContain("height:90px");
  expect(d.data.lineStyle).toContain("border-left:3px dotted");
  expect(d.querySelector(".mn-divider-label")).toBeFalsy();
  const e = mount("empty", {
    size: "large",
    width: 320,
    height: 240,
    description: null,
  });
  expect(e.data.emptyStyle).toContain("width:320px");
  expect(e.querySelector(".mn-muted")).toBeFalsy();
  expect(controls.empty.template).toContain('name="secondaryAction"');
});
it("IconButton toggles default state, rejects controlled updates, blocks loading and exposes tooltip", async () => {
  const w = mount("iconButton", {
    defaultPressed: true,
    label: "Mute",
    size: "large",
    color: "danger",
    shape: "square",
  });
  const events: unknown[] = [];
  w.addEventListener("pressedchange", (e) => events.push(e.detail));
  w.querySelector(".mn-icon-button")!.dispatchEvent("tap");
  await tick();
  expect(w.data.effectivePressed).toBe(false);
  expect(events).toEqual([{ pressed: false }]);
  w.setData({ pressed: true, loading: true });
  w.querySelector(".mn-icon-button")!.dispatchEvent("tap");
  await tick();
  expect(events).toHaveLength(1);
  w.setData({ loading: false });
  w.querySelector(".mn-icon-button")!.dispatchEvent("tap");
  await tick();
  expect(w.data.effectivePressed).toBe(true);
  w.querySelector(".mn-icon-button")!.dispatchEvent("longpress");
  await tick();
  expect(w.querySelector(".mn-tooltip")!.dom!.textContent).toContain("Mute");
});
it("JsonField text ownership, invalid edits, format indent, toolbar and readonly", async () => {
  const w = mount("jsonField", { defaultValue: '{"ok":true}', indent: 4 });
  const events: unknown[] = [];
  w.addEventListener("change", (e) => events.push(e.detail));
  w.querySelector(".mn-json-format")!.dispatchEvent("tap");
  await tick();
  expect(w.data.text).toBe('{\n    "ok": true\n}');
  w.querySelector(".mn-code")!.dispatchEvent("input", {
    detail: { value: "{" },
  });
  await tick();
  expect(events.at(-1)).toEqual({ value: "{" });
  expect(w.data.jsonValid).toBe(false);
  w.setData({ value: '{"owned":1}', readOnly: true });
  w.querySelector(".mn-code")!.dispatchEvent("input", {
    detail: { value: "[]" },
  });
  await tick();
  expect(w.data.text).toBe('{"owned":1}');
  w.setData({ hideToolbar: true });
  expect(w.querySelector(".mn-json-format")).toBeFalsy();
});
it("RadioGroup owns default value and maintains controlled rejection with helper/error axes", async () => {
  const w = mount("radioGroup", {
    defaultValue: "b",
    size: "large",
    color: "warning",
    error: true,
    helperText: "Required",
    options: [
      { value: "a", label: "A" },
      { value: "b", label: "B" },
    ],
  });
  expect(w.data.effectiveValue).toBe("b");
  w.querySelectorAll(".mn-choice")[0]!.dispatchEvent("tap");
  await tick();
  expect(w.data.effectiveValue).toBe("a");
  w.setData({ value: null });
  w.querySelectorAll(".mn-choice")[1]!.dispatchEvent("tap");
  await tick();
  expect(w.data.effectiveValue).toBe(null);
  expect(w.querySelector(".mn-radio-group")!.dom!.className).toContain(
    "mn-invalid",
  );
  expect(controls.radioGroup.template).toContain('aria-invalid="{{error}}"');
});
it("Select default and controlled open/value, grouped choices and disabled separators", async () => {
  const w = mount("select", {
    defaultValue: "a",
    defaultOpen: true,
    size: "large",
    invalid: true,
    options: [
      {
        type: "group",
        label: "Group",
        items: [
          { value: "a", label: "Alpha" },
          { value: "b", label: "Beta" },
        ],
      },
      { type: "separator" },
      { value: "c", label: "Disabled", disabled: true },
    ],
  });
  expect(w.data.selectedLabel).toBe("Alpha");
  expect(w.querySelector(".mn-select-group")).toBeTruthy();
  w.querySelectorAll(".mn-option")[1]!.dispatchEvent("tap");
  await tick();
  expect(w.data.effectiveValue).toBe("b");
  expect(w.data.expanded).toBe(false);
  w.setData({ value: "a", open: true });
  w.querySelectorAll(".mn-option")[1]!.dispatchEvent("tap");
  await tick();
  expect(w.data.effectiveValue).toBe("a");
  expect(w.data.expanded).toBe(true);
});
it("Tabs default selection, controlled rejection, vertical variants and retained hidden panels", async () => {
  const w = mount("tabs", {
    defaultValue: "b",
    orientation: "vertical",
    variant: "pills",
    items: [
      { value: "a", label: "A", content: "Alpha", forceMount: true },
      { value: "b", label: "B", content: "Beta" },
    ],
  });
  expect(w.data.effectiveValue).toBe("b");
  expect(w.querySelectorAll(".mn-tab-panel")).toHaveLength(2);
  w.querySelectorAll(".mn-option")[0]!.dispatchEvent("tap");
  await tick();
  expect(w.data.effectiveValue).toBe("a");
  w.setData({ value: "b" });
  w.querySelectorAll(".mn-option")[0]!.dispatchEvent("tap");
  await tick();
  expect(w.data.effectiveValue).toBe("b");
  expect(w.querySelector(".mn-tabs")!.dom!.className).toContain(
    "mn-tabs-vertical",
  );
  expect(controls.tabs.template).toContain(
    'aria-orientation="{{orientation}}"',
  );
});
it("Skeleton axes produce decorative circular geometry and switch to real content", () => {
  const w = mount("skeleton", {
    decorative: true,
    variant: "circular",
    size: 48,
    animation: "false",
    lines: 4,
  });
  expect(w.data.lineStyle).toContain("width:48px");
  expect(w.querySelectorAll(".mn-skeleton-line")).toHaveLength(1);
  expect(controls.skeleton.template).toContain('aria-hidden="{{decorative}}"');
  w.setData({ loading: false });
  expect(w.querySelector(".mn-skeleton-line")).toBeFalsy();
  const text = mount("skeletonText", {
    lines: 2,
    gap: 3,
    lineHeight: 18,
    shrinkLast: false,
  });
  expect(text.data.textStyle).toContain("gap:var(--space-3)");
  expect(text.data.lineStyle).toContain("height:18px");
});
it("Tooltip supports imperative owner requests, delays, disable close and native axes", async () => {
  const w = mount("tooltip", {
    content: "Help",
    enterDelay: 20,
    leaveDelay: 10,
    shape: "thought",
    animation: "scale",
  });
  w.instance.open();
  await tick();
  expect(w.data.visible).toBe(true);
  w.instance.close();
  await tick();
  expect(w.data.visible).toBe(false);
  w.setData({ open: true });
  w.instance.close();
  await tick();
  expect(w.data.visible).toBe(true);
  w.setData({ disabled: true });
  expect(w.querySelector(".mn-tooltip")).toBeFalsy();
});
it("CodeBlock limits/wrap and list density/description stripes are reflected in native view", () => {
  const code = mount("codeBlock", {
    code: "<tag>",
    wrap: false,
    maxHeight: 100,
  });
  expect(code.data.codeStyle).toContain("max-height:100px");
  expect(code.querySelector(".mn-code")!.dom!.getAttribute("style")).toContain(
    "white-space:pre",
  );
  const l = mount("list", {
    density: "compact",
    bordered: true,
    dividers: false,
    items: [{ primary: "Main", secondary: 0 }],
  });
  expect(l.querySelector(".mn-list")!.dom!.className).toContain(
    "mn-list-compact",
  );
  expect(l.querySelector(".mn-list-item")!.dom!.textContent).toContain("0");
  const dl = mount("descriptionList", {
    striped: true,
    bordered: true,
    items: [{ key: "n", label: "Count", value: 0 }],
  });
  expect(dl.querySelector(".mn-description-list")!.dom!.className).toContain(
    "mn-list-striped",
  );
});
it("Textarea supports default text, controlled rejection, invalid/size/variant and readonly", async () => {
  const w = mount("textarea", {
    defaultValue: "initial",
    invalid: true,
    size: "large",
    variant: "filled",
  });
  expect(w.data.text).toBe("initial");
  w.querySelector(".mn-textarea")!.dispatchEvent("input", {
    detail: { value: "next" },
  });
  await tick();
  expect(w.data.text).toBe("next");
  w.setData({ value: "owned" });
  w.querySelector(".mn-textarea")!.dispatchEvent("input", {
    detail: { value: "rejected" },
  });
  await tick();
  expect(w.data.text).toBe("owned");
  expect(w.querySelector(".mn-textarea")!.dom!.className).toContain(
    "mn-invalid",
  );
});
it("Switch segmented labels preserve widget rollback and loading/readonly guards with custom track", async () => {
  const w = mount("toggle", {
    defaultChecked: false,
    offLabel: "Off",
    onLabel: "On",
    variant: "segmented",
    shape: "square",
    size: "large",
    trackStyle: { backgroundColor: "purple" },
    thumbStyle: { borderRadius: 3 },
  });
  const events: unknown[] = [];
  w.addEventListener("change", (e) => events.push(e.detail));
  expect(w.data.trackCss).toContain("background-color:purple");
  w.querySelectorAll(".mn-switch-segment")[1]!.dispatchEvent("tap");
  await tick();
  expect(w.data.effectiveChecked).toBe(true);
  w.setData({ checked: false });
  w.querySelectorAll(".mn-switch-segment")[1]!.dispatchEvent("tap");
  await tick();
  expect(w.data.effectiveChecked).toBe(false);
  w.setData({ loading: true });
  w.querySelectorAll(".mn-switch-segment")[1]!.dispatchEvent("tap");
  await tick();
  expect(events).toHaveLength(2);
  expect(w.querySelector(".mn-spinner")).toBeTruthy();
  w.setData({ loading: false, readOnly: true });
  w.querySelectorAll(".mn-switch-segment")[1]!.dispatchEvent("tap");
  await tick();
  expect(events).toHaveLength(2);
});
it("Tooltip native press timers cancel on leave and unmount", async () => {
  const w = mount("tooltip", {
    content: "Timed",
    enterDelay: 30,
    leaveDelay: 5,
  });
  vi.useFakeTimers();
  w.instance.onEnter();
  expect(w.data.visible).toBe(false);
  vi.advanceTimersByTime(29);
  expect(w.data.visible).toBe(false);
  w.instance.onLeave();
  vi.advanceTimersByTime(10);
  expect(w.data.visible).toBe(false);
  w.instance.onEnter();
  vi.advanceTimersByTime(30);
  expect(w.data.visible).toBe(true);
  w.instance.onLeave();
  vi.advanceTimersByTime(5);
  expect(w.data.visible).toBe(false);
});
it("Input default text and native clear preserve controlled owner refusal", async () => {
  const w = mount("input", {
    defaultValue: "Ada",
    clearable: true,
    type: "password",
    showCharCount: true,
  });
  expect(w.data.text).toBe("Ada");
  w.querySelector(".mn-input-clear")!.dispatchEvent("tap");
  await tick();
  expect(w.data.text).toBe("");
  expect(w.data.focused).toBe(true);
  w.setData({ value: "Owned" });
  w.querySelector(".mn-input")!.dispatchEvent("input", {
    detail: { value: "Rejected" },
  });
  await tick();
  expect(w.data.text).toBe("Owned");
  w.querySelector(".mn-password-toggle")!.dispatchEvent("tap");
  await tick();
  expect(w.data.passwordVisible).toBe(true);
});
it("Modal carries local trigger/close, owner rejection, forceMount and outside veto", async () => {
  const w = mount("modal", {
    defaultOpen: true,
    size: "large",
    forceMount: true,
  });
  expect(w.data.visible).toBe(true);
  w.instance.configure({ onInteractOutside: () => false });
  w.querySelector(".mn-backdrop")!.dispatchEvent("tap");
  await tick();
  expect(w.data.visible).toBe(true);
  w.querySelector(".mn-modal-close")!.dispatchEvent("tap");
  await tick();
  expect(w.data.visible).toBe(false);
  expect(w.querySelector(".mn-dialog")).toBeTruthy();
  w.setData({ open: true });
  w.querySelector(".mn-modal-close")!.dispatchEvent("tap");
  await tick();
  expect(w.data.visible).toBe(true);
});
it("StatCard icon, LoadingState size and TextLink variant render native presentation", () => {
  const card = mount("statCard", { label: "Count", value: 0, icon: "★" });
  expect(card.dom!.textContent).toContain("★");
  expect(card.dom!.textContent).toContain("0");
  const loading = mount("loadingState", { size: "small" });
  expect(loading.querySelector(".mn-loading-state")!.dom!.className).toContain(
    "mn-loading-small",
  );
  const link = mount("textLink", {
    href: "/pages/detail/index",
    variant: "action",
    label: "Details",
  });
  expect(link.querySelector(".mn-text-link")!.dom!.className).toContain(
    "mn-text-link-action",
  );
});
it("CodeBlock copy feedback changes the button for two seconds and clears timers on detach", async () => {
  const w = mount("codeBlock", { copyable: true, code: "original" });
  let callbacks!: WechatMiniprogram.SetClipboardDataOption;
  vi.spyOn(wx, "setClipboardData").mockImplementation((options) => {
    callbacks = options;
  });
  const copied: unknown[] = [];
  w.addEventListener("copied", (e) => copied.push(e.detail));
  vi.useFakeTimers();
  w.querySelector(".mn-close")!.dispatchEvent("tap");
  await vi.advanceTimersByTimeAsync(0);
  expect(callbacks.data).toBe("original");
  w.setData({ code: "changed" });
  callbacks.success?.({ errMsg: "ok" });
  await vi.advanceTimersByTimeAsync(0);
  expect(w.querySelector(".mn-close")!.dom!.textContent).toContain("Copied");
  expect(copied).toEqual([{ text: "original" }]);
  await vi.advanceTimersByTimeAsync(1999);
  expect(w.data.copyLabel).toBe("Copied");
  await vi.advanceTimersByTimeAsync(1);
  expect(w.data.copyLabel).toBe("Copy code");
  w.querySelector(".mn-close")!.dispatchEvent("tap");
  await vi.advanceTimersByTimeAsync(0);
  callbacks.fail?.({ errMsg: "denied" });
  expect(w.data.copyLabel).toBe("Copy failed");
  w.detach();
  mounted.splice(mounted.indexOf(w), 1);
  expect(vi.getTimerCount()).toBe(0);
});
it("LoadingState retry uses the configured locale and explicit label override", () => {
  const w = mount("loadingState", { error: "Network unavailable" });
  w.setData({ localeLabels: { tableRetry: "重新尝试" } });
  expect(w.querySelector(".mn-button")!.dom!.textContent).toContain("重新尝试");
  w.setData({ retryLabel: "Try connection" });
  expect(w.querySelector(".mn-button")!.dom!.textContent).toContain(
    "Try connection",
  );
});
