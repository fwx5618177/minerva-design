import { mount } from "@vue/test-utils";
import { expect, it } from "vitest";
import { Button, Input, Switch } from "./index";

it("Button emits click on tap and suppresses loading/disabled taps", async () => {
  const w = mount(Button, { slots: { default: "Save" } });
  await w.find("button").trigger("click");
  expect(w.emitted("click")).toHaveLength(1);
  await w.setProps({ loading: true });
  await w.find("button").trigger("click");
  await w.setProps({ loading: false, disabled: true });
  await w.find("button").trigger("click");
  expect(w.emitted("click")).toHaveLength(1);
});

it("Input supports v-model and emits string change values", async () => {
  const w = mount(Input, { props: { modelValue: "first" } });
  await w.find("input").trigger("input", { detail: { value: "next" } });
  expect(w.emitted("update:modelValue")).toEqual([["next"]]);
  expect(w.emitted("change")).toEqual([["next"]]);
  await w.setProps({ modelValue: "server", disabled: true });
  expect((w.find("input").element as HTMLInputElement).value).toBe("server");
  await w.find("input").trigger("input", { detail: { value: "blocked" } });
  expect(w.emitted("change")).toHaveLength(1);
});

it("Switch supports v-model:checked and disabled/readonly guards", async () => {
  const w = mount(Switch, { props: { checked: false } });
  await w
    .find("[data-minerva='switch']")
    .trigger("change", { detail: { value: true } });
  expect(w.emitted("update:checked")).toEqual([[true]]);
  expect(w.emitted("change")).toEqual([[true]]);
  await w.setProps({ checked: true, readOnly: true });
  await w
    .find("[data-minerva='switch']")
    .trigger("change", { detail: { value: false } });
  expect(w.emitted("change")).toHaveLength(1);
});
