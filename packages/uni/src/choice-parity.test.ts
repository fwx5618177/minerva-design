import { mount } from "@vue/test-utils";
import { h } from "vue";
import { it, expect } from "vitest";
import Switch from "./Switch.vue";
import Radio from "./Radio.vue";
import RadioGroup from "./RadioGroup.vue";
it("Switch size/shape/color/labels and actual track/thumb style axes keep the real native widget", async () => {
  const w = mount(Switch, {
    props: {
      size: "large",
      shape: "square",
      color: "success",
      label: "Alerts",
      labelPlacement: "start",
      trackStyle: { backgroundColor: "red" },
      thumbStyle: { borderRadius: "3px" },
      icon: "✓",
    },
  });
  expect(w.classes()).toEqual(
    expect.arrayContaining([
      "mn-switch-large",
      "mn-switch-square",
      "mn-switch-success",
      "mn-switch-label-start",
    ]),
  );
  expect(w.find("[data-switch-track]").attributes("style")).toContain(
    "background-color: red",
  );
  expect(w.find("[data-switch-thumb]").attributes("style")).toContain(
    "border-radius: 3px",
  );
  expect(w.text()).toContain("Alerts");
  expect(w.find('input[role="switch"]').exists()).toBe(true);
  await w.setProps({ loading: true });
  expect(w.find('[role="progressbar"]').exists()).toBe(true);
  expect(w.find("input").attributes("disabled")).toBeDefined();
});
it("Switch bilateral slider actions and segmented pressed state respect controlled rejection", async () => {
  const w = mount(Switch, {
    props: {
      checked: false,
      offLabel: "Off",
      onLabel: "On",
      variant: "segmented",
      "aria-label": "Power",
    },
  });
  expect(w.find('[role="group"]').attributes("aria-label")).toBe("Power");
  await w.findAll("button")[1].trigger("click");
  expect(w.emitted("change")).toEqual([[true, expect.any(Object)]]);
  expect(w.findAll("button")[0].attributes("aria-pressed")).toBe("true");
  await w.setProps({ checked: true });
  expect(w.findAll("button")[1].attributes("aria-pressed")).toBe("true");
});
it("RadioGroup numeric/null values own checked state and visual/name/error/required props while skipping disabled choices", async () => {
  const w = mount(RadioGroup, {
    props: {
      value: null,
      name: "plan",
      size: "large",
      color: "warning",
      label: "Plan",
      required: true,
      error: true,
      helperText: "Choose one",
    },
    slots: {
      default: () => [
        h(Radio, { value: 0, label: "Free", checked: true, size: "small" }),
        h(Radio, { value: 1, label: "Pro", disabled: true }),
        h(Radio, { value: 2, label: "Team" }),
      ],
    },
    attachTo: document.body,
  });
  const radios = w.findAll('[role="radio"]');
  expect(radios[0].attributes("aria-checked")).toBe("false");
  expect(radios[0].attributes("tabindex")).toBe("0");
  expect(radios[2].attributes("tabindex")).toBe("-1");
  expect(radios[0].classes()).toContain("mn-radio-large");
  expect(radios[0].attributes("name")).toBe("plan");
  expect(w.find('[role="radiogroup"]').attributes("aria-required")).toBe(
    "true",
  );
  expect(w.find('[role="radiogroup"]').attributes("aria-invalid")).toBe("true");
  await radios[0].trigger("click");
  expect(w.emitted("change")?.[0][0]).toBe(0);
  expect(radios[0].attributes("aria-checked")).toBe("false");
  await w.setProps({ value: 0 });
  await radios[0].trigger("keydown", { key: "ArrowDown" });
  expect(w.emitted("change")?.at(-1)?.[0]).toBe(2);
  w.unmount();
});
it("standalone Radio reports checked boolean and associates error/helper content", async () => {
  const w = mount(Radio, {
    props: {
      value: "x",
      label: "Yes",
      error: true,
      errorMessage: "Required",
      helperText: "Help",
      required: true,
    },
  });
  expect(w.text()).toContain("Required");
  expect(w.text()).not.toContain("Help");
  expect(w.attributes("aria-describedby")).toBeTruthy();
  await w.trigger("click");
  expect(w.emitted("change")?.[0][0]).toBe(true);
  expect(w.attributes("aria-checked")).toBe("true");
});
