import { mount } from "@vue/test-utils";
import { expect, it } from "vitest";
import SegmentedControl from "./SegmentedControl.vue";

const radios = (w: ReturnType<typeof mount>) => w.findAll('[role="radio"]');

it("segmented control renders a radiogroup of segments with a sliding thumb", () => {
  const w = mount(SegmentedControl, {
    props: {
      ariaLabel: "View",
      options: [
        "day",
        { value: "week", label: "Week" },
        { value: "grid", icon: "▦", "aria-label": "Grid" },
      ],
      defaultValue: "week",
      size: "small",
      color: "primary",
    },
  });
  const root = w.find('[role="radiogroup"]');
  expect(root.attributes("aria-label")).toBe("View");
  expect(root.classes()).toEqual(
    expect.arrayContaining([
      "mn-segmented-control",
      "mn-size-small",
      "mn-color-primary",
    ]),
  );
  expect(radios(w).map((radio) => radio.text())).toEqual(["day", "Week", "▦"]);
  expect(radios(w)[2]!.attributes("aria-label")).toBe("Grid");
  expect(radios(w)[2]!.find(".mn-segmented-control__label").exists()).toBe(
    false,
  );
  expect(radios(w)[1]!.attributes("aria-checked")).toBe("true");
  expect(radios(w)[1]!.classes()).toContain("mn-selected");
  expect(radios(w).map((radio) => radio.attributes("tabindex"))).toEqual([
    "-1",
    "0",
    "-1",
  ]);
  const thumb = w.find(".mn-segmented-control__indicator");
  expect(thumb.attributes("style")).toContain("translateX(100%)");
});

it("segmented control selects on tap and keys, skipping disabled segments", async () => {
  const w = mount(SegmentedControl, {
    props: {
      options: ["a", { value: "b", disabled: true }, "c"],
      defaultValue: "a",
    },
  });
  await radios(w)[1]!.trigger("click");
  expect(w.emitted("change")).toBeUndefined();
  await radios(w)[2]!.trigger("click");
  expect(w.emitted("change")).toEqual([["c"]]);
  expect(w.emitted("update:modelValue")).toEqual([["c"]]);
  expect(radios(w)[2]!.attributes("aria-checked")).toBe("true");
  await radios(w)[2]!.trigger("keydown", { key: "ArrowRight" });
  expect(w.emitted("change")).toEqual([["c"], ["a"]]);
  await radios(w)[0]!.trigger("keydown", { key: "End" });
  expect(w.emitted("change")).toEqual([["c"], ["a"], ["c"]]);
});

it("segmented control keeps a controlled value and blocks when disabled", async () => {
  const w = mount(SegmentedControl, {
    props: { options: ["a", "b"], modelValue: "a" },
  });
  await radios(w)[1]!.trigger("click");
  expect(w.emitted("update:modelValue")).toEqual([["b"]]);
  expect(radios(w)[0]!.attributes("aria-checked")).toBe("true");
  await w.setProps({ disabled: true, fullWidth: true });
  expect(w.find('[role="radiogroup"]').classes()).toContain("mn-full-width");
  expect(w.find('[role="radiogroup"]').attributes("aria-disabled")).toBe(
    "true",
  );
  await radios(w)[1]!.trigger("click");
  expect(w.emitted("update:modelValue")).toHaveLength(1);
});
