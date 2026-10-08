import { describe, expect, it } from "vitest";
import { render } from "@testing-library/vue";
import { Comment, createVNode, defineComponent, Fragment, h, Text } from "vue";
import { collectItems, nodeText } from "./context";
import { SelectItem, SelectLabel } from ".";

describe("Select option collection", () => {
  it("reads the plain text of slot content", () => {
    expect(nodeText("a")).toBe("a");
    expect(nodeText(1)).toBe("1");
    expect(nodeText(null)).toBe("");
    expect(nodeText(true)).toBe("");
    expect(nodeText(h(Comment, "x"))).toBe("");
    expect(nodeText(createVNode(Text, null, "t"))).toBe("t");
    expect(nodeText(h("b", ["x", h("i", "y")]))).toBe("xy");
    const Wrap = defineComponent({ setup: () => () => null });
    expect(nodeText(h(Wrap, null, { default: () => "slot" }))).toBe("slot");
    expect(nodeText(h(Wrap))).toBe("");
  });

  it("collects SelectItems in fragments, elements and components", () => {
    const Wrap = (
      _: unknown,
      { slots }: { slots: { default?: () => unknown } },
    ) => slots.default?.();
    const items = collectItems(
      [
        null,
        "text",
        [h(SelectItem, { value: "a" }, () => "Alpha")],
        h(Fragment, null, [
          h(SelectItem, {
            value: "b",
            "text-value": "Bee",
            disabled: "",
          } as never),
        ]),
        h("div", null, [
          h(SelectItem, { value: "c", disabled: false }, () => "C"),
        ]),
        h(Wrap as never, null, {
          default: () => h(SelectItem, { value: "d" }, () => h("b", "Dee")),
        }),
        h("span", null, "leaf"),
      ],
      SelectItem,
    );
    expect(
      items.map(({ value, disabled, text }) => ({ value, disabled, text })),
    ).toEqual([
      { value: "a", disabled: false, text: "Alpha" },
      { value: "b", disabled: true, text: "Bee" },
      { value: "c", disabled: false, text: "C" },
      { value: "d", disabled: false, text: "Dee" },
    ]);
    expect(items[1].label()).toBeUndefined();
  });

  it("renders a SelectLabel outside of a group without an id", () => {
    const { container } = render(SelectLabel, {
      slots: { default: () => "Lone" },
    });
    const label = container.querySelector('[data-minerva="select-label"]')!;
    expect(label).toHaveTextContent("Lone");
    expect(label).not.toHaveAttribute("id");
  });
});
