import simulate from "miniprogram-simulate";
import { expect, it } from "vitest";
import { button, input, toggle } from "./index";

function mount(
  component: typeof button | typeof input | typeof toggle,
  props: Record<string, unknown> = {},
) {
  const id = simulate.load<
    WechatMiniprogram.Component.DataOption,
    WechatMiniprogram.Component.PropertyOption,
    WechatMiniprogram.Component.MethodOption
  >({
    tagName: "mn-control",
    template: component.template,
    ...component.definition,
  });
  const wrapper = simulate.render(id, props);
  wrapper.attach(document.createElement("div"));
  return wrapper;
}

it("Button emits click once and guards disabled/loading states", async () => {
  const w = mount(button, { label: "Save" });
  const events: unknown[] = [];
  w.addEventListener("click", (e) => events.push(e.detail));
  w.querySelector(".mn-button")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(events).toHaveLength(1);
  w.setData({ loading: true });
  w.querySelector(".mn-button")!.dispatchEvent("tap");
  await simulate.sleep(0);
  w.setData({ loading: false, disabled: true });
  w.querySelector(".mn-button")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(events).toHaveLength(1);
});

it("Input reports detail.value without overwriting the controlled property", async () => {
  const w = mount(input, { value: "first" });
  const events: unknown[] = [];
  w.addEventListener("change", (e) => events.push(e.detail));
  w.querySelector(".mn-input")!.dispatchEvent("input", {
    detail: { value: "next" },
  });
  await simulate.sleep(0);
  expect(events).toEqual([{ value: "next" }]);
  expect(w.data.value).toBe("first");
  w.setData({ value: "server", disabled: true });
  w.querySelector(".mn-input")!.dispatchEvent("input", {
    detail: { value: "blocked" },
  });
  await simulate.sleep(0);
  expect(events).toHaveLength(1);
});

it("Switch reports detail.checked and ignores readonly changes", async () => {
  const w = mount(toggle, { checked: false });
  const events: unknown[] = [];
  w.addEventListener("change", (e) => events.push(e.detail));
  w.querySelector(".mn-switch")!.dispatchEvent("change", {
    detail: { value: true },
  });
  await simulate.sleep(0);
  expect(events).toEqual([{ checked: true }]);
  w.setData({ readOnly: true });
  w.querySelector(".mn-switch")!.dispatchEvent("change", {
    detail: { value: false },
  });
  await simulate.sleep(0);
  expect(events).toHaveLength(1);
});

it("controls participate in enclosing native forms", () => {
  expect(button.definition.behaviors).toContain("wx://form-field-button");
  expect(input.definition.behaviors).toContain("wx://form-field");
  expect(toggle.definition.behaviors).toContain("wx://form-field-group");
});
