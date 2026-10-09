import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { Divider } from ".";

describe("Divider", () => {
  it.each([0, 3])(
    "passes thickness %s to the rendered text lines",
    (thickness) => {
      const w = mount(Divider, {
        props: { variant: "dashed", thickness },
        slots: { default: "Chapter" },
      });
      expect(
        (w.element as HTMLElement).style.getPropertyValue(
          "--_divider-thickness",
        ),
      ).toBe(`${thickness}px`);
    },
  );
  it("renders a native hr with the default styles", () => {
    const wrapper = mount(Divider, { attrs: { class: "mine" } });
    expect(wrapper.element.tagName).toBe("HR");
    expect(wrapper.attributes("role")).toBeUndefined();
    expect(wrapper.attributes("aria-orientation")).toBe("horizontal");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["divider", "solid", "horizontal", "mine"]),
    );
    const style = (wrapper.element as HTMLElement).style;
    expect(style.borderWidth).toBe("1px");
    expect(style.marginTop).toBe("16px");
    expect(style.marginLeft).toBe("0px");
    expect(wrapper.attributes("data-orientation")).toBe("horizontal");
    expect(wrapper.attributes("data-align")).toBeUndefined();
  });

  it("renders text in a separator div", () => {
    const wrapper = mount(Divider, {
      props: { variant: "dashed", textAlign: "left", length: 200 },
      slots: { default: "Or" },
    });
    expect(wrapper.element.tagName).toBe("DIV");
    expect(wrapper.attributes("role")).toBe("separator");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["withText", "textLeft", "dashed"]),
    );
    expect(wrapper.get('[data-part="label"]').text()).toBe("Or");
    expect(wrapper.attributes("data-align")).toBe("left");
    expect((wrapper.element as HTMLElement).style.width).toBe("200px");
  });

  it("renders a vertical divider without text", () => {
    const wrapper = mount(Divider, {
      props: {
        orientation: "vertical",
        length: "2em",
        spacing: 8,
        thickness: 2,
        flexItem: true,
        elevation: true,
      },
      slots: { default: "ignored" },
    });
    expect(wrapper.element.tagName).toBe("HR");
    expect(wrapper.text()).toBe("");
    expect(wrapper.attributes("aria-orientation")).toBe("vertical");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["vertical", "flexItem", "elevation"]),
    );
    const style = (wrapper.element as HTMLElement).style;
    expect(style.height).toBe("2em");
    expect(style.marginLeft).toBe("8px");
    expect(style.marginTop).toBe("0px");
    expect(style.borderWidth).toBe("2px");
  });

  it("keeps the generated declarations over the style attribute", () => {
    const wrapper = mount(Divider, {
      props: { spacing: 4 },
      attrs: { style: { marginTop: "99px", color: "red" } },
    });
    const style = (wrapper.element as HTMLElement).style;
    expect(style.marginTop).toBe("4px");
    expect(style.color).toBe("red");
  });
});
