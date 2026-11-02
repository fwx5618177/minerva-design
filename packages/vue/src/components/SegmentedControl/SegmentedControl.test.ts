import { defineComponent, h, nextTick, ref } from "vue";
import { fireEvent, render } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { SegmentedControl } from ".";

type Props = Record<string, unknown>;
const renderControl = (props: Props = {}) =>
  render(SegmentedControl, {
    props: { "aria-label": "View", ...props } as never,
  });

const radios = () =>
  Array.from(document.querySelectorAll<HTMLElement>('[role="radio"]'));
const group = () => document.querySelector<HTMLElement>('[role="radiogroup"]')!;

describe("SegmentedControl (Vue)", () => {
  it("renders a radiogroup of radio segments from strings and objects", () => {
    renderControl({
      options: [
        "Day",
        { value: "week", label: "Week" },
        { value: "grid", icon: () => h("svg"), "aria-label": "Grid" },
      ],
      defaultValue: "week",
    });
    expect(group()).toHaveAttribute("aria-label", "View");
    expect(group()).toHaveAttribute("data-minerva", "segmented-control");
    expect(radios().map((radio) => radio.textContent)).toEqual([
      "Day",
      "Week",
      "",
    ]);
    expect(radios()[2]).toHaveAttribute("aria-label", "Grid");
    expect(radios()[2]!.querySelector('[data-part="icon"] svg')).not.toBeNull();
    expect(radios().map((radio) => radio.getAttribute("aria-checked"))).toEqual(
      ["false", "true", "false"],
    );
    expect(radios().map((radio) => radio.tabIndex)).toEqual([-1, 0, -1]);
    expect(group().style.getPropertyValue("--_segmented-control-index")).toBe(
      "1",
    );
  });

  it("selects by click, emits update:modelValue and change, ignores disabled segments", async () => {
    const { emitted } = renderControl({
      options: ["a", "b", { value: "c", disabled: true }],
      defaultValue: "a",
    });
    await fireEvent.click(radios()[1]!);
    expect(emitted()["update:modelValue"]).toEqual([["b"]]);
    expect(emitted().change).toEqual([["b"]]);
    expect(radios()[1]).toHaveAttribute("aria-checked", "true");
    await fireEvent.click(radios()[2]!);
    expect(emitted().change).toHaveLength(1);
  });

  it("moves and selects with the arrow keys, skipping disabled segments, Home / End", async () => {
    const { emitted } = renderControl({
      options: ["a", { value: "b", disabled: true }, "c"],
      defaultValue: "a",
    });
    radios()[0]!.focus();
    await fireEvent.keyDown(radios()[0]!, { key: "ArrowRight" });
    await nextTick();
    expect(radios()[2]).toHaveFocus();
    expect(radios()[2]).toHaveAttribute("aria-checked", "true");
    await fireEvent.keyDown(radios()[2]!, { key: "ArrowRight" });
    await nextTick();
    expect(radios()[0]).toHaveFocus();
    await fireEvent.keyDown(radios()[0]!, { key: "End" });
    await nextTick();
    expect(radios()[2]).toHaveFocus();
    expect(emitted().change).toEqual([["c"], ["a"], ["c"]]);
  });

  it("works with v-model", async () => {
    const Host = defineComponent({
      setup() {
        const value = ref("list");
        return () => [
          h(SegmentedControl, {
            "aria-label": "View",
            options: ["list", "grid"],
            modelValue: value.value,
            "onUpdate:modelValue": (next: string) => (value.value = next),
          }),
          h("output", value.value),
        ];
      },
    });
    render(Host);
    await fireEvent.click(radios()[1]!);
    expect(document.querySelector("output")).toHaveTextContent("grid");
    expect(radios()[1]).toHaveAttribute("aria-checked", "true");
  });

  it("blocks everything when disabled and fills a form through a hidden input", async () => {
    const { emitted } = renderControl({
      options: ["a", "b"],
      defaultValue: "a",
      disabled: true,
      name: "view",
    });
    expect(group()).toHaveAttribute("aria-disabled", "true");
    expect(radios().every((radio) => radio.tabIndex === -1)).toBe(true);
    await fireEvent.click(radios()[1]!);
    expect(emitted().change).toBeUndefined();
    const input = document.querySelector<HTMLInputElement>(
      'input[type="hidden"]',
    )!;
    expect(input.name).toBe("view");
    expect(input.value).toBe("a");
  });
});
