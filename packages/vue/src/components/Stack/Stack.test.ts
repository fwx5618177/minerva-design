import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { HStack, Stack, VStack } from ".";

describe("Stack", () => {
  it("defaults to a column div without inline alignment", () => {
    const el = mount(Stack, { slots: { default: "x" } }).element as HTMLElement;
    expect(el.tagName).toBe("DIV");
    expect(el.className).toContain("stack");
    expect(el.className).toContain("column");
    expect(el.className).not.toContain("wrap");
    expect(el.style.alignItems).toBe("");
    expect(el.style.justifyContent).toBe("");
    expect(el.style.gap).toBe("");
    expect(el.getAttribute("data-minerva")).toBe("stack");
    expect(el.getAttribute("data-orientation")).toBe("vertical");
    expect(el.getAttribute("role")).toBeNull();
  });

  it.each(["row", "row-reverse", "column-reverse"] as const)(
    "applies direction %s as a class",
    (direction) => {
      const wrapper = mount(Stack, { props: { direction } });
      expect(wrapper.classes()).toContain(direction);
      expect(wrapper.attributes("data-orientation")).toBe(
        direction.startsWith("row") ? "horizontal" : "vertical",
      );
    },
  );

  it.each([
    ["start", "flex-start"],
    ["center", "center"],
    ["end", "flex-end"],
    ["stretch", "stretch"],
    ["baseline", "baseline"],
  ] as const)("maps align=%s to align-items %s", (align, css) => {
    const el = mount(Stack, { props: { align } }).element as HTMLElement;
    expect(el.style.alignItems).toBe(css);
  });

  it.each([
    ["start", "flex-start"],
    ["center", "center"],
    ["end", "flex-end"],
    ["between", "space-between"],
    ["around", "space-around"],
    ["evenly", "space-evenly"],
  ] as const)("maps justify=%s to justify-content %s", (justify, css) => {
    const el = mount(Stack, { props: { justify } }).element as HTMLElement;
    expect(el.style.justifyContent).toBe(css);
  });

  it("resolves the gap to a spacing token, not when attached", () => {
    const el = mount(Stack, { props: { gap: 2 } }).element as HTMLElement;
    expect(el.style.gap).toBe("var(--space-2)");
    const attached = mount(Stack, {
      props: { gap: 2, attached: true },
      attrs: { "aria-label": "Actions" },
    });
    expect((attached.element as HTMLElement).style.gap).toBe("");
    expect(attached.attributes("role")).toBe("group");
    expect(attached.classes()).toContain("attached");
    const custom = mount(Stack, {
      props: { attached: true },
      attrs: { role: "toolbar" },
    });
    expect(custom.attributes("role")).toBe("toolbar");
  });

  it("adds the wrap class and renders as a custom element with attributes", () => {
    const wrapper = mount(Stack, {
      props: { as: "ul", wrap: true },
      attrs: { class: "consumer", "aria-label": "Items" },
      slots: { default: () => h("li", "a") },
    });
    expect(wrapper.element.tagName).toBe("UL");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["stack", "wrap", "consumer"]),
    );
    expect(wrapper.attributes("aria-label")).toBe("Items");
    for (const attr of ["wrap", "direction", "as"]) {
      expect(wrapper.attributes(attr)).toBeUndefined();
    }
  });

  it("interleaves a text separator between non-empty children", () => {
    const wrapper = mount(Stack, {
      props: { separator: "·" },
      slots: {
        default: () => [h("span", "a"), null, [h("span", "b"), h("span", "c")]],
      },
    });
    expect(wrapper.text()).toBe("a·b·c");
    expect(wrapper.findAll("span")).toHaveLength(3);
  });

  it("renders the separator slot between children", () => {
    const wrapper = mount(Stack, {
      slots: {
        default: () => [h("span", "a"), h("span", "b")],
        separator: () => h("hr"),
      },
    });
    expect(wrapper.html()).toMatch(/<span>a<\/span>\s*<hr>\s*<span>b<\/span>/);
    expect(wrapper.findAll("hr")).toHaveLength(1);
  });

  it("does not add separators around a single child", () => {
    const wrapper = mount(Stack, {
      props: { separator: "|" },
      slots: { default: () => [h("span", "only"), " "] },
    });
    expect(wrapper.text()).toBe("only");
  });
});

describe("HStack / VStack", () => {
  it("HStack is a row centered on the cross axis by default", () => {
    const wrapper = mount(HStack);
    expect(wrapper.classes()).toContain("row");
    expect((wrapper.element as HTMLElement).style.alignItems).toBe("center");
    expect(wrapper.attributes("data-minerva")).toBe("hstack");
    expect(wrapper.attributes("data-orientation")).toBeUndefined();
  });

  it("VStack is a column stretched on the cross axis by default", () => {
    const wrapper = mount(VStack);
    expect(wrapper.classes()).toContain("column");
    expect((wrapper.element as HTMLElement).style.alignItems).toBe("stretch");
    expect(wrapper.attributes("data-minerva")).toBe("vstack");
  });

  it("lets consumers override the default alignment", () => {
    const hstack = mount(HStack, { props: { align: "start" } });
    const vstack = mount(VStack, { props: { align: "end" } });
    expect((hstack.element as HTMLElement).style.alignItems).toBe("flex-start");
    expect((vstack.element as HTMLElement).style.alignItems).toBe("flex-end");
  });

  it("forwards separators and attributes", () => {
    const wrapper = mount(HStack, {
      attrs: { id: "h" },
      slots: {
        default: () => [h("b", "1"), h("b", "2")],
        separator: () => h("i", "/"),
      },
    });
    expect(wrapper.attributes("id")).toBe("h");
    expect(wrapper.text()).toBe("1/2");
    const vstack = mount(VStack, {
      props: { separator: "-" },
      slots: { default: () => [h("b", "1"), h("b", "2")] },
    });
    expect(vstack.text()).toBe("1-2");
  });
});
