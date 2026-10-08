import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { renderToString } from "vue/server-renderer";
import { createSSRApp, defineComponent, h } from "vue";
import { Box } from ".";

describe("Box", () => {
  it("renders a div by default and a custom element via as", () => {
    const div = mount(Box, { slots: { default: "x" } });
    expect(div.element.tagName).toBe("DIV");
    expect(div.attributes("data-minerva")).toBe("box");
    expect(div.attributes("data-part")).toBe("root");
    const section = mount(Box, {
      props: { as: "section" },
      attrs: { "aria-label": "Region" },
    });
    expect(section.element.tagName).toBe("SECTION");
    expect(section.attributes("aria-label")).toBe("Region");
  });

  it("renders a component via as", () => {
    const Custom = defineComponent({
      setup:
        (_, { slots }) =>
        () =>
          h("article", slots.default?.()),
    });
    const wrapper = mount(Box, {
      props: { as: Custom, p: 1 },
      slots: { default: "x" },
    });
    expect(wrapper.element.tagName).toBe("ARTICLE");
    expect(wrapper.text()).toBe("x");
  });

  it("forwards class and attributes without leaking style props", () => {
    const wrapper = mount(Box, {
      props: { p: 4, bg: "bg.subtle", rounded: "md" },
      attrs: { class: "consumer", id: "b", "data-part": "x" },
    });
    expect(wrapper.classes()).toContain("consumer");
    expect(wrapper.attributes("id")).toBe("b");
    expect(wrapper.attributes("data-part")).toBe("root");
    for (const attr of ["p", "bg", "rounded", "as"]) {
      expect(wrapper.attributes(attr)).toBeUndefined();
    }
  });

  it("maps padding and margin shorthands to spacing tokens", () => {
    const { style } = mount(Box, { props: { p: 2, mx: "auto", my: "3" } })
      .element as HTMLElement;
    expect(style.padding).toBe("var(--space-2)");
    expect(style.marginLeft).toBe("auto");
    expect(style.marginRight).toBe("auto");
    expect(style.marginTop).toBe("var(--space-3)");
    expect(style.marginBottom).toBe("var(--space-3)");
  });

  it("lets side props win over axis props over the shorthand", () => {
    const { style } = mount(Box, {
      props: {
        px: 1,
        py: 2,
        pt: 3,
        pr: 4,
        pb: 5,
        pl: 6,
        m: 1,
        mt: 2,
        mr: 3,
        mb: 4,
        ml: 5,
      },
    }).element as HTMLElement;
    expect(style.paddingTop).toBe("var(--space-3)");
    expect(style.paddingRight).toBe("var(--space-4)");
    expect(style.paddingBottom).toBe("var(--space-5)");
    expect(style.paddingLeft).toBe("var(--space-6)");
    expect(style.marginTop).toBe("var(--space-2)");
    expect(style.marginRight).toBe("var(--space-3)");
    expect(style.marginBottom).toBe("var(--space-4)");
    expect(style.marginLeft).toBe("var(--space-5)");
  });

  it("converts numeric sizes to px and passes strings through", () => {
    const { style } = mount(Box, {
      props: {
        w: 120,
        h: "50%",
        minW: 0,
        minH: "2rem",
        maxW: 720,
        maxH: "100vh",
      },
    }).element as HTMLElement;
    expect(style.width).toBe("120px");
    expect(style.height).toBe("50%");
    expect(style.minWidth).toBe("0px");
    expect(style.minHeight).toBe("2rem");
    expect(style.maxWidth).toBe("720px");
    expect(style.maxHeight).toBe("100vh");
  });

  it("maps surface, radius and shadow tokens, other values as-is", () => {
    const tokens = mount(Box, {
      props: {
        bg: "bg.canvas",
        rounded: "lg",
        boxShadow: "md",
        border: "1px solid red",
      },
    }).element as HTMLElement;
    expect(tokens.style.background).toContain("var(--canvas-color)");
    expect(tokens.style.borderRadius).toBe("var(--radius-lg)");
    expect(tokens.style.boxShadow).toBe("var(--shadow-md)");
    expect(tokens.style.border).toContain("1px solid");
    const raw = mount(Box, {
      props: { bg: "red", rounded: "3px", boxShadow: "none" },
    }).element as HTMLElement;
    expect(raw.style.background).toContain("red");
    expect(raw.style.borderRadius).toBe("3px");
    expect(raw.style.boxShadow).toBe("none");
  });

  it("lets the style attribute win over the generated declarations", () => {
    const { style } = mount(Box, {
      props: { p: 2 },
      attrs: { style: { padding: "1px" } },
    }).element as HTMLElement;
    expect(style.padding).toBe("1px");
  });

  it("renders on the server", async () => {
    const html = await renderToString(
      createSSRApp({ render: () => h(Box, { p: 2, as: "span" }, () => "x") }),
    );
    expect(html).toContain("<span");
    expect(html).toContain("padding:var(--space-2)");
    expect(html).toContain('data-minerva="box"');
  });
});
