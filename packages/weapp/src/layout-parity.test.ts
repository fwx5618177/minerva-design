import simulate from "miniprogram-simulate";
import { afterEach, expect, it, vi } from "vitest";
import { responsiveGrid, formLayout, splitLayout, appShell } from "./index";
const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => {
  mounted.splice(0).forEach((w) => w.detach());
  vi.unstubAllGlobals();
});
function mount(c: typeof responsiveGrid, p: Record<string, unknown>) {
  const id = simulate.load({
    tagName: "layout-case",
    template: c.template,
    ...c.definition,
  });
  const w = simulate.render(id, p);
  w.attach(document.createElement("div"));
  mounted.push(w);
  return w;
}
const tick = () => simulate.sleep(0);
it("ResponsiveGrid follows measured container breakpoints and spacing tokens", () => {
  const w = mount(responsiveGrid, {
    columns: { base: 1, sm: 2, lg: 4 },
    gap: 4,
    rowGap: "2",
    columnGap: "10px",
  });
  w.instance.measure(479);
  expect(w.data.effectiveColumns).toBe(1);
  w.instance.measure(480);
  expect(w.data.effectiveColumns).toBe(2);
  w.instance.measure(1000);
  expect(w.data.effectiveColumns).toBe(2);
  w.instance.measure(1200);
  expect(w.data.effectiveColumns).toBe(4);
  expect(w.data.rowSpace).toBe("var(--space-2)");
  expect(w.data.columnSpace).toBe("10px");
  w.setData({ columns: 3 });
  expect(w.data.effectiveColumns).toBe(3);
});
it("FormLayout shares responsive columns and forwards native submitted values", async () => {
  const w = mount(formLayout, { columns: { base: 1, md: 3 } });
  w.instance.measure(800);
  expect(w.data.effectiveColumns).toBe(3);
  const submit: unknown[] = [];
  w.addEventListener("submit", (e) => submit.push(e.detail));
  w.querySelector(".mn-form-layout")!.dispatchEvent("submit", {
    detail: { value: { name: "Ada" } },
  });
  await tick();
  expect(submit).toEqual([{ value: { name: "Ada" } }]);
});
it("SplitLayout stacks below its container threshold, caps aside width and can omit aside", () => {
  const w = mount(splitLayout, {
    asideWidth: 700,
    collapseBelow: "lg",
    gap: 6,
  });
  w.instance.measure(1199);
  expect(w.data.stacked).toBe(true);
  w.instance.measure(1200);
  expect(w.data.stacked).toBe(false);
  expect(w.data.effectiveAsideWidth).toBe(600);
  expect(w.data.layoutGap).toBe("var(--space-6)");
  w.setData({ hasAside: false });
  expect(w.querySelector(".mn-split-sidebar")).toBeFalsy();
});
it("AppShell modes honor owner rejection and mobile drawer closes on navigation commits", async () => {
  const w = mount(appShell, {
    brand: "Console",
    defaultSidebarMode: "compact",
  });
  w.instance.measure(1200);
  expect(w.data.collapsed).toBe(true);
  const changes: unknown[] = [];
  w.addEventListener("sidebarmodechange", (e) => changes.push(e.detail));
  w.querySelector(".mn-shell-expand")!.dispatchEvent("tap");
  await tick();
  expect(w.data.effectiveMode).toBe("expanded");
  expect(changes).toEqual([{ mode: "expanded" }]);
  w.setData({ sidebarMode: "compact" });
  w.querySelector(".mn-shell-expand")!.dispatchEvent("tap");
  await tick();
  expect(w.data.effectiveMode).toBe("compact");
  w.instance.measure(768);
  expect(w.data.isMobile).toBe(true);
  w.querySelector(".mn-shell-open")!.dispatchEvent("tap");
  await tick();
  expect(w.data.navigationOpen).toBe(true);
  w.setData({ navigationKey: "/next" });
  expect(w.data.navigationOpen).toBe(false);
  w.querySelector(".mn-shell-open")!.dispatchEvent("tap");
  await tick();
  w.querySelector(".mn-shell-backdrop")!.dispatchEvent("tap");
  await tick();
  expect(w.data.navigationOpen).toBe(false);
});
it("AppShell floating mode has explicit native pin/expand actions", async () => {
  const w = mount(appShell, { defaultSidebarMode: "floating" });
  w.instance.measure(1200);
  expect(w.data.collapsed).toBe(true);
  w.querySelector(".mn-shell-pin")!.dispatchEvent("tap");
  await tick();
  expect(w.data.effectiveMode).toBe("compact");
  w.instance.expandNavigation();
  expect(w.data.effectiveMode).toBe("expanded");
});
