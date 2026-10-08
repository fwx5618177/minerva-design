import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h } from "vue";
import { TextLink } from ".";

describe("TextLink", () => {
  it("renders a styled native anchor", () => {
    const wrapper = mount(TextLink, {
      attrs: { href: "/docs", class: "mine" },
      slots: { default: "Docs" },
    });
    expect(wrapper.element.tagName).toBe("A");
    expect(wrapper.attributes("href")).toBe("/docs");
    expect(wrapper.attributes("rel")).toBeUndefined();
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["textLink", "mine"]),
    );
    expect(wrapper.attributes("data-variant")).toBe("default");
    expect(wrapper.find("svg").exists()).toBe(false);
  });

  it("adds a safe rel for new tabs and drops unsafe URLs", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const blank = mount(TextLink, {
      attrs: { href: "https://x.dev", target: "_blank" },
    });
    expect(blank.attributes("rel")).toBe("noopener noreferrer");
    const unsafe = mount(TextLink, { attrs: { href: "javascript:void 0" } });
    expect(unsafe.attributes("href")).toBeUndefined();
    expect(console.warn).toHaveBeenCalled();
    const anchorOnly = mount(TextLink, { attrs: { rel: "me" } });
    expect(anchorOnly.attributes("rel")).toBe("me");
    expect(anchorOnly.attributes("href")).toBeUndefined();
  });

  it("appends a decorative chevron to the subtle variant", () => {
    const wrapper = mount(TextLink, {
      props: { variant: "subtle" },
      attrs: { href: "/x" },
      slots: { default: "More" },
    });
    expect(wrapper.classes()).toContain("subtle");
    expect(wrapper.get("svg").attributes("aria-hidden")).toBe("true");
  });

  it("slots the styling onto its child with asChild", () => {
    const wrapper = mount(TextLink, {
      props: { asChild: true, variant: "action" },
      slots: { default: () => h("a", { href: "/own", class: "own" }, "Docs") },
    });
    expect(wrapper.element.tagName).toBe("A");
    expect(wrapper.attributes("href")).toBe("/own");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["own", "textLink", "action"]),
    );
    expect(wrapper.attributes("data-part")).toBe("root");
  });

  it("appends the chevron inside an element or component child", () => {
    const element = mount(TextLink, {
      props: { asChild: true, variant: "subtle" },
      slots: { default: () => h("a", { href: "/e" }, ["Docs"]) },
    });
    expect(element.element.tagName).toBe("A");
    expect(element.text()).toBe("Docs");
    expect(element.find("svg").exists()).toBe(true);
    const RouterLink = defineComponent({
      props: { to: String },
      setup:
        (props, { slots }) =>
        () =>
          h("a", { href: props.to }, slots.default?.()),
    });
    const component = mount(TextLink, {
      props: { asChild: true, variant: "subtle" },
      slots: { default: () => h(RouterLink, { to: "/r" }, () => "Route") },
    });
    expect(component.attributes("href")).toBe("/r");
    expect(component.classes()).toContain("subtle");
    expect(component.text()).toBe("Route");
    expect(component.find("svg").exists()).toBe(true);
    const text = mount(TextLink, {
      props: { asChild: true, variant: "subtle" },
      slots: { default: () => "plain" },
    });
    expect(text.text()).toBe("plain");
  });
});
