import simulate from "miniprogram-simulate";
import { afterEach, expect, it, vi } from "vitest";
import { timePicker, pageTabs, popover } from "./index";
const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => {
  mounted.splice(0).forEach((w) => w.detach());
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
function mount(c: typeof timePicker, p: Record<string, unknown>) {
  const id = simulate.load({
    tagName: "interaction-case",
    template: c.template,
    ...c.definition,
  });
  const w = simulate.render(id, p);
  w.attach(document.createElement("div"));
  mounted.push(w);
  return w;
}
const tick = () => simulate.sleep(0);
it("TimePicker commits strict/blur drafts, serializes seconds, preserves controlled null and guards readonly", async () => {
  const w = mount(timePicker, {
    defaultValue: "13:20:30",
    format: "hh:mm:ss a",
    use12Hours: true,
    minuteStep: 15,
    secondStep: 10,
  });
  const changes: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  expect(w.data.displayValue).toBe("01:20:30 PM");
  expect(
    w.data.timeColumns[1].items.map((i: { value: number }) => i.value),
  ).toEqual([0, 15, 30, 45]);
  w.querySelector(".mn-time-input")!.dispatchEvent("input", {
    detail: { value: "02:15:40 PM" },
  });
  await tick();
  expect(changes[0]).toEqual({ value: "14:15:40" });
  w.querySelector(".mn-time-input")!.dispatchEvent("input", {
    detail: { value: "3:2:1 AM" },
  });
  await tick();
  expect(changes).toHaveLength(1);
  w.querySelector(".mn-time-input")!.dispatchEvent("blur");
  await tick();
  expect(changes[1]).toEqual({ value: "03:02:01" });
  w.setData({ value: null });
  w.querySelector(".mn-time-input")!.dispatchEvent("input", {
    detail: { value: "02:15:40 PM" },
  });
  w.querySelector(".mn-time-input")!.dispatchEvent("blur");
  await tick();
  expect(w.data.displayValue).toBe("");
  w.setData({ readOnly: true });
  const n = changes.length;
  w.querySelector(".mn-time-input")!.dispatchEvent("input", {
    detail: { value: "02:15:40 PM" },
  });
  await tick();
  expect(changes).toHaveLength(n);
});
it("TimePicker seconds omission, boundary units and opening/clearing use real panel events", async () => {
  const w = mount(timePicker, {
    defaultValue: "10:30:00",
    showSecond: false,
    minTime: "10:15",
    maxTime: "11:45",
    minuteStep: 15,
  });
  const open: unknown[] = [];
  w.addEventListener("openchange", (e) => open.push(e.detail));
  w.querySelector(".mn-time-trigger")!.dispatchEvent("tap");
  await tick();
  expect(open).toEqual([{ open: true }]);
  expect(w.data.timeColumns).toHaveLength(2);
  expect(
    w.data.timeColumns[0].items.find((i: { value: number }) => i.value === 9)
      .disabled,
  ).toBe(true);
  w.querySelector(".mn-time-clear")!.dispatchEvent("tap");
  await tick();
  expect(w.data.displayValue).toBe("");
  w.querySelector(".mn-time-done")!.dispatchEvent("tap");
  await tick();
  expect(open).toEqual([{ open: true }, { open: false }]);
});
it("PageTabs measures overflow, scrolls active item into view and isolates disabled labels from actions", async () => {
  const w = mount(pageTabs, {
    activeValue: "b",
    items: [
      { value: "a", label: "One", disabled: true, closable: true },
      { value: "b", label: "Two", icon: "B" },
      { value: "c", label: "Three" },
    ],
  });
  await tick();
  w.instance.measure({ viewportWidth: 200, contentWidth: 600, scrollLeft: 0 });
  expect(w.data.canScrollRight).toBe(true);
  expect(w.data.scrollIntoView).toBe("mn-page-tab-1");
  const selects: unknown[] = [],
    closes: unknown[] = [];
  w.addEventListener("select", (e) => selects.push(e.detail));
  w.addEventListener("close", (e) => closes.push(e.detail));
  w.querySelectorAll(".mn-page-label")[0].dispatchEvent("tap");
  await tick();
  expect(selects).toHaveLength(0);
  w.querySelectorAll(".mn-close")[0].dispatchEvent("tap");
  await tick();
  expect(closes).toEqual([{ value: "a" }]);
  w.querySelector(".mn-pages-right")!.dispatchEvent("tap");
  await tick();
  expect(w.data.scrollLeft).toBeGreaterThan(0);
  w.setData({ activeValue: "c" });
  expect(w.data.scrollIntoView).toBe("mn-page-tab-2");
  w.querySelectorAll(".mn-page-label")[2].dispatchEvent("tap");
  await tick();
  expect(selects).toEqual([{ value: "c" }]);
});
it("Popover selectorQuery measurement flips, shifts and matches anchor width; owner rejection keeps it open", async () => {
  const w = mount(popover, {
    open: true,
    side: "bottom",
    align: "end",
    matchAnchorWidth: "exact",
    collisionPadding: 8,
  });
  await tick();
  const selections: string[] = [];
  const rects = [
    { left: 270, top: 560, width: 80, height: 30 },
    { left: 0, top: 0, width: 180, height: 120 },
  ];
  let n = 0;
  const query = {
    select(selector: string) {
      selections.push(selector);
      return this;
    },
    boundingClientRect(cb: (rect: object) => void) {
      cb(rects[n++ % 2]);
      return this;
    },
    exec() {},
  };
  vi.spyOn(w.instance, "createSelectorQuery").mockReturnValue(
    query as unknown as WechatMiniprogram.SelectorQuery,
  );
  const legacy = vi.spyOn(wx, "getSystemInfoSync").mockImplementation(() => {
    throw new Error(
      "Deprecated system info must not be used when getWindowInfo exists",
    );
  });
  vi.stubGlobal("wx", {
    ...wx,
    getWindowInfo: () => ({ windowWidth: 360, windowHeight: 640 }),
  });
  await w.instance.reposition();
  expect(legacy).not.toHaveBeenCalled();
  expect(selections).toEqual([".mn-popover-anchor", ".mn-popup"]);
  expect(w.data.actualSide).toBe("top");
  expect(w.data.panelStyle).toContain("width:80px");
  expect(w.data.panelStyle).toContain("left:270px");
  expect(w.data.panelStyle).toContain("top:434px");
  const changes: unknown[] = [];
  w.addEventListener("openchange", (e) => changes.push(e.detail));
  w.querySelector(".mn-popover-close")!.dispatchEvent("tap");
  await tick();
  expect(changes).toEqual([{ open: false }]);
  expect(w.data.visible).toBe(true);
});
