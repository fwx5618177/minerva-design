import simulate from "miniprogram-simulate";
import { afterEach, expect, it } from "vitest";
import {
  formControl,
  formField,
  input,
  checkbox,
  select,
  toggle,
  confirmProvider,
  toastProvider,
} from "./index";
const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => mounted.splice(0).forEach((w) => w.detach()));
const tick = () => simulate.sleep(0);
const load = (c: {
  template: string;
  definition: WechatMiniprogram.IAnyObject;
}) =>
  simulate.load({
    tagName: "provider-case",
    template: c.template,
    ...c.definition,
  });
function mount(
  c: { template: string; definition: WechatMiniprogram.IAnyObject },
  props: Record<string, unknown> = {},
) {
  const w = simulate.render(load(c), props);
  w.attach(document.createElement("div"));
  mounted.push(w);
  return w;
}
it("native FormControl relations inherit flags, update reactively and allow explicit false on nested fields", async () => {
  const host = simulate.load({
    tagName: "form-host",
    usingComponents: {
      "mn-field": load(formField),
      "mn-form": load(formControl),
      "mn-input": load(input),
      "mn-check": load(checkbox),
      "mn-select": load(select),
      "mn-switch": load(toggle),
    },
    template:
      '<mn-field id="outer" disabled="{{disabled}}" read-only="{{readOnly}}" required invalid><mn-input id="input"/><mn-check id="check"/><mn-select id="select" options="{{options}}"/><mn-switch id="switch"/><mn-form disabled="{{false}}"><mn-check id="enabled"/></mn-form></mn-field>',
    data: {
      disabled: true,
      readOnly: false,
      options: [{ value: "a", label: "Alpha" }],
    },
  });
  const w = simulate.render(host);
  w.attach(document.createElement("div"));
  mounted.push(w);
  await tick();
  expect(w.querySelector("#input")!.data.disabled).toBe(true);
  expect({
    outer: w.querySelector("#outer")!.instance.getFormState(),
    check: w.querySelector("#check")!.instance.getFormState(),
    error: w.querySelector("#check")!.data.error,
  }).toEqual({
    outer: { disabled: true, readOnly: false, required: true, invalid: true },
    check: { disabled: true, readOnly: false, required: true, invalid: true },
    error: true,
  });
  expect(w.querySelector("#select")!.data.required).toBe(true);
  expect(w.querySelector("#switch")!.data.disabled).toBe(true);
  const changes: unknown[] = [];
  w.querySelector("#check")!.addEventListener("change", (e) =>
    changes.push(e.detail),
  );
  w.querySelector("#check")!.querySelector(".mn-choice")!.dispatchEvent("tap");
  await tick();
  expect(changes).toHaveLength(0);
  expect(w.querySelector("#enabled")!.data.disabled).toBe(false);
  w.querySelector("#enabled")!
    .querySelector(".mn-choice")!
    .dispatchEvent("tap");
  await tick();
  expect(w.querySelector("#enabled")!.data.effectiveChecked).toBe(true);
  w.setData({ disabled: false, readOnly: true });
  await tick();
  expect(w.querySelector("#input")!.data.disabled).toBe(false);
  expect(w.querySelector("#check")!.data.readOnly).toBe(true);
  w.querySelector("#check")!.setData({ readOnly: false });
  w.querySelector("#check")!.querySelector(".mn-choice")!.dispatchEvent("tap");
  await tick();
  expect(changes).toHaveLength(1);
});
it("local confirmation hosts isolate queues and teardown cancels only their own requests", async () => {
  const a = mount(confirmProvider, { scope: "local" }),
    b = mount(confirmProvider, { scope: "local" });
  const first = a.instance.request({ title: "A" }),
    second = b.instance.request({ title: "B" });
  expect(a.data.current.title).toBe("A");
  expect(b.data.current.title).toBe("B");
  a.querySelector(".mn-confirm-accept")!.dispatchEvent("tap");
  await tick();
  await expect(first).resolves.toBe(true);
  expect(b.data.current.title).toBe("B");
  b.querySelector(".mn-confirm-cancel")!.dispatchEvent("tap");
  await tick();
  await expect(second).resolves.toBe(false);
});
it("local toast hosts isolate entries, actions, updates and promise transitions", async () => {
  const a = mount(toastProvider, { scope: "local" }),
    b = mount(toastProvider, { scope: "local" });
  const id = a.instance.show({ title: "A", duration: 0 });
  b.instance.show({ title: "B", duration: 0 });
  expect(a.data.entries.map((e: { title: string }) => e.title)).toEqual(["A"]);
  expect(b.data.entries.map((e: { title: string }) => e.title)).toEqual(["B"]);
  a.instance.update(id, { title: "Updated" });
  expect(a.data.entries[0].title).toBe("Updated");
  let resolve!: (value: number) => void;
  const promise = new Promise<number>((r) => {
    resolve = r;
  });
  a.instance.promise(
    promise,
    {
      loading: "Wait",
      success: (value: number) => `Done ${value}`,
      error: "Error",
    },
    { duration: 0 },
  );
  expect(a.data.entries[1].loading).toBe(true);
  resolve(7);
  await tick();
  expect(a.data.entries[1]).toMatchObject({ title: "Done 7", loading: false });
  a.instance.dismiss();
  expect(a.data.entries).toEqual([]);
  expect(b.data.entries).toHaveLength(1);
});
