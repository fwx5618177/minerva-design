import simulate from "miniprogram-simulate";
import { afterEach, expect, it } from "vitest";
import * as M from "./index";
const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => mounted.splice(0).forEach((w) => w.detach()));
function mount(props: Record<string, unknown> = {}) {
  expect(M).toHaveProperty("datePicker");
  const c = M.datePicker;
  const w = simulate.render(
    simulate.load({
      tagName: "date-picker",
      template: c.template,
      ...c.definition,
    }),
    props,
  );
  w.attach(document.createElement("div"));
  mounted.push(w);
  return w;
}
const tick = () => simulate.sleep(0);
it("native DatePicker selects valid bounded dates and emits open, change and clear events", async () => {
  const w = mount({
    defaultValue: "2026-10-15",
    minDate: "2026-10-10",
    maxDate: "2026-10-20",
  });
  const changes: unknown[] = [],
    opens: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  w.addEventListener("openchange", (e) => opens.push(e.detail));
  expect(w.instance.data.display).toBe("2026-10-15");
  w.querySelector(".mn-date-native")!.dispatchEvent("tap");
  await tick();
  expect(opens).toEqual([{ open: true }]);
  w.querySelector(".mn-date-native")!.dispatchEvent("change", {
    detail: { value: "2026-10-09" },
  });
  await tick();
  expect(changes).toEqual([]);
  w.querySelector(".mn-date-native")!.dispatchEvent("tap");
  await tick();
  w.querySelector(".mn-date-native")!.dispatchEvent("change", {
    detail: { value: "2026-10-16" },
  });
  await tick();
  expect(changes).toEqual([{ value: "2026-10-16" }]);
  expect(w.instance.data.display).toBe("2026-10-16");
  expect(opens.at(-1)).toEqual({ open: false });
  w.querySelector(".mn-clear")!.dispatchEvent("tap");
  await tick();
  expect(changes.at(-1)).toEqual({ value: "" });
  expect(w.instance.data.display).toBe("");
});
it("native DatePicker preserves null control, rejects invalid drafts and blocks readOnly", async () => {
  const w = mount({ value: null, defaultValue: "2026-10-15" });
  const changes: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  expect(w.instance.data.display).toBe("");
  w.querySelector(".mn-input")!.dispatchEvent("input", {
    detail: { value: "2026-02-30" },
  });
  w.querySelector(".mn-input")!.dispatchEvent("blur");
  await tick();
  expect(changes).toEqual([]);
  w.querySelector(".mn-date-native")!.dispatchEvent("change", {
    detail: { value: "2026-10-17" },
  });
  await tick();
  expect(changes).toEqual([{ value: "2026-10-17" }]);
  expect(w.instance.data.display).toBe("");
  w.setData({ readOnly: true });
  await tick();
  w.querySelector(".mn-date-native")!.dispatchEvent("tap");
  w.querySelector(".mn-date-native")!.dispatchEvent("change", {
    detail: { value: "2026-10-18" },
  });
  await tick();
  expect(changes).toHaveLength(1);
  expect(w.instance.data.opened).toBe(false);
});
it("native DatePicker keeps empty controlled, resets external drafts and reports cancellation", async () => {
  const w = mount({ value: "", defaultValue: "2026-10-15" });
  const changes: unknown[] = [],
    opens: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  w.addEventListener("openchange", (e) => opens.push(e.detail));
  w.querySelector(".mn-input")!.dispatchEvent("input", {
    detail: { value: "2026-10-16" },
  });
  await tick();
  w.querySelector(".mn-input")!.dispatchEvent("blur");
  await tick();
  expect(w.instance.data.display).toBe("");
  expect(changes[0]).toEqual({ value: "2026-10-16" });
  w.querySelector(".mn-input")!.dispatchEvent("input", {
    detail: { value: "draft" },
  });
  await tick();
  w.setData({ value: "2026-11-01" });
  await tick();
  expect(w.instance.data.display).toBe("2026-11-01");
  w.querySelector(".mn-date-native")!.dispatchEvent("tap");
  await tick();
  w.querySelector(".mn-date-native")!.dispatchEvent("cancel");
  await tick();
  expect(opens).toEqual([{ open: true }, { open: false }]);
});
it("native DatePicker inherits field locks while explicit false remains editable", async () => {
  const load = (c: typeof M.datePicker) =>
    simulate.load({
      tagName: "date-form-control",
      template: c.template,
      ...c.definition,
    });
  const host = simulate.load({
    tagName: "date-form-host",
    usingComponents: {
      "mn-form": load(M.formControl),
      "mn-date": load(M.datePicker),
    },
    template:
      '<mn-form disabled read-only><mn-date id="locked"/><mn-date id="editable" disabled="{{false}}" read-only="{{false}}"/></mn-form>',
  });
  const w = simulate.render(host);
  w.attach(document.createElement("div"));
  mounted.push(w);
  await tick();
  const locked = w.querySelector("#locked")!,
    editable = w.querySelector("#editable")!;
  locked.querySelector(".mn-date-native")!.dispatchEvent("tap");
  await tick();
  expect(locked.data.opened).toBe(false);
  const changes: unknown[] = [];
  editable.addEventListener("change", (e) => changes.push(e.detail));
  editable.querySelector(".mn-date-native")!.dispatchEvent("tap");
  await tick();
  expect(editable.data.opened).toBe(true);
  editable
    .querySelector(".mn-date-native")!
    .dispatchEvent("change", { detail: { value: "2026-10-17" } });
  await tick();
  expect(changes).toEqual([{ value: "2026-10-17" }]);
});
