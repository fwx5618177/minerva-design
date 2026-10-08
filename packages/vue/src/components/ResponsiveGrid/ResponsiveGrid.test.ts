import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { GridItem, ResponsiveGrid } from ".";

const vars = (el: Element) => {
  const style = (el as HTMLElement).style;
  return (name: string) => style.getPropertyValue(name);
};

describe("ResponsiveGrid", () => {
  it("renders the query container and the grid layout", () => {
    const wrapper = mount(ResponsiveGrid, {
      attrs: { class: "consumer", "aria-label": "Cards" },
      slots: { default: () => h(GridItem, null, () => "A") },
    });
    expect(wrapper.element.tagName).toBe("DIV");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["root", "consumer"]),
    );
    expect(wrapper.attributes("data-minerva")).toBe("responsive-grid");
    const layout = wrapper.get('[data-part="layout"]');
    expect(layout.classes()).toContain("layout");
    expect(layout.text()).toBe("A");
    const get = vars(wrapper.element);
    expect(get("--grid-columns-base")).toBe("1");
    expect(get("--grid-columns-lg")).toBe("1");
    expect(get("--grid-row-gap")).toBe("var(--space-4)");
    expect(get("--grid-column-gap")).toBe("var(--space-4)");
  });

  it("inherits missing breakpoints from the previous one", () => {
    const wrapper = mount(ResponsiveGrid, {
      props: {
        as: "section",
        columns: { sm: 2, lg: 4 },
        gap: "8px",
        rowGap: 2,
      },
    });
    expect(wrapper.element.tagName).toBe("SECTION");
    const get = vars(wrapper.element);
    expect(get("--grid-columns-base")).toBe("1");
    expect(get("--grid-columns-sm")).toBe("2");
    expect(get("--grid-columns-md")).toBe("2");
    expect(get("--grid-columns-lg")).toBe("4");
    expect(get("--grid-row-gap")).toBe("var(--space-2)");
    expect(get("--grid-column-gap")).toBe("8px");
  });

  it("uses a single number for every breakpoint and a column gap", () => {
    const wrapper = mount(ResponsiveGrid, {
      props: { columns: 3, columnGap: 1 },
    });
    const get = vars(wrapper.element);
    expect(get("--grid-columns-md")).toBe("3");
    expect(get("--grid-column-gap")).toBe("var(--space-1)");
  });

  it.each([0, 13, 1.5, { md: 20 }])(
    "throws a RangeError for columns %o",
    (columns) => {
      vi.spyOn(console, "warn").mockImplementation(() => {});
      expect(() => mount(ResponsiveGrid, { props: { columns } })).toThrow(
        RangeError,
      );
    },
  );
});

describe("GridItem", () => {
  it("renders a div item, full width when asked", () => {
    const item = mount(GridItem, { slots: { default: "A" } });
    expect(item.element.tagName).toBe("DIV");
    expect(item.classes()).toContain("item");
    expect(item.classes()).not.toContain("fullWidth");
    expect(item.attributes("data-minerva")).toBe("grid-item");
    const full = mount(GridItem, {
      props: { fullWidth: true },
      attrs: { class: "x" },
    });
    expect(full.classes()).toEqual(
      expect.arrayContaining(["item", "fullWidth", "x"]),
    );
  });

  it("merges into its single child with asChild", () => {
    const wrapper = mount(GridItem, {
      props: { asChild: true, fullWidth: true },
      slots: { default: () => h("section", { class: "own" }, "A") },
    });
    expect(wrapper.element.tagName).toBe("SECTION");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["own", "item", "fullWidth"]),
    );
    expect(wrapper.attributes("data-part")).toBe("root");
  });
});
