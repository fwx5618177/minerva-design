import { mount } from "@vue/test-utils";
import { expect, it } from "vitest";
import { h } from "vue";
import * as M from "./index";
it("DatePicker selects bounded calendar days, closes and clears through native taps", async () => {
  expect(M).toHaveProperty("DatePicker");
  const w = mount(M.DatePicker, {
    props: {
      defaultValue: "2026-10-15",
      minDate: "2026-10-10",
      maxDate: "2026-10-20",
      label: "Start",
    },
  });
  await w.find("input").trigger("click");
  expect(w.emitted("openChange")).toEqual([[true]]);
  await w.find('[data-day="2026-10-09"]').trigger("click");
  expect(w.emitted("change")).toBeUndefined();
  await w.find('[data-day="2026-10-16"]').trigger("click");
  expect(w.emitted("change")).toEqual([["2026-10-16"]]);
  expect(w.emitted("openChange")).toEqual([[true], [false]]);
  expect((w.find("input").element as HTMLInputElement).value).toBe(
    "2026-10-16",
  );
  await w.find('[aria-label="Clear date"]').trigger("click");
  expect(w.emitted("change")?.at(-1)).toEqual([""]);
  expect(w.emitted("update:modelValue")?.at(-1)).toEqual([""]);
});
it("DatePicker rejects invalid dates and keeps null controlled, including inherited locks", async () => {
  expect(M).toHaveProperty("DatePicker");
  const w = mount(M.DatePicker, {
    props: { value: null, defaultValue: "2026-10-15" },
  });
  const input = w.find("input");
  expect((input.element as HTMLInputElement).value).toBe("");
  await input.trigger("input", { detail: { value: "2026-02-30" } });
  await input.trigger("blur");
  expect(w.emitted("change")).toBeUndefined();
  await input.trigger("input", { detail: { value: "2026-10-17" } });
  expect(w.emitted("change")?.[0]).toEqual(["2026-10-17"]);
  await input.trigger("blur");
  expect((input.element as HTMLInputElement).value).toBe("");
  const locked = mount(M.FormControl, {
    props: { readOnly: true },
    slots: { default: () => h(M.DatePicker) },
  });
  await locked.find("input").trigger("click");
  expect(locked.find('[role="grid"]').exists()).toBe(false);
});
it("DatePicker closes when reselecting its current day and normalizes short typed dates within bounds", async () => {
  const w = mount(M.DatePicker, {
    props: {
      defaultValue: "2026-10-15",
      minDate: "2026-10-10",
      maxDate: "2026-10-20",
    },
  });
  await w.find("input").trigger("click");
  await w.find('[data-day="2026-10-15"]').trigger("click");
  expect(w.emitted("openChange")?.at(-1)).toEqual([false]);
  await w.find("input").trigger("input", { detail: { value: "2026-10-9" } });
  await w.find("input").trigger("blur");
  expect((w.find("input").element as HTMLInputElement).value).toBe(
    "2026-10-15",
  );
  await w.find("input").trigger("input", { detail: { value: "2026-10-19" } });
  expect(w.emitted("change")?.at(-1)).toEqual(["2026-10-19"]);
});
it("DatePicker supports explicit false form overrides and modelValue owner rejection and refresh", async () => {
  const form = mount(M.FormControl, {
    props: { disabled: true, readOnly: true },
    slots: {
      default: () =>
        h(M.DatePicker, {
          disabled: false,
          readOnly: false,
          defaultValue: "2026-10-15",
        }),
    },
  });
  await form.find("input").trigger("click");
  expect(form.find('[role="grid"]').exists()).toBe(true);
  const w = mount(M.DatePicker, {
    props: { modelValue: "", defaultValue: "2026-10-15" },
  });
  await w.find("input").trigger("input", { detail: { value: "2026-10-16" } });
  await w.find("input").trigger("blur");
  expect((w.find("input").element as HTMLInputElement).value).toBe("");
  await w.find("input").trigger("input", { detail: { value: "draft" } });
  await w.setProps({ modelValue: "2026-11-01" });
  expect((w.find("input").element as HTMLInputElement).value).toBe(
    "2026-11-01",
  );
});
