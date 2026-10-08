import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { Badge } from ".";

describe("Badge", () => {
  it("renders a status badge with default classes", () => {
    const wrapper = mount(Badge, {
      props: { content: 5 },
      attrs: { "aria-label": "5 notifications" },
    });
    const badge = wrapper.get('[role="status"]');
    expect(badge.attributes("aria-label")).toBe("5 notifications");
    expect(badge.text()).toBe("5");
    expect(badge.classes()).toEqual(
      expect.arrayContaining(["badge", "primary", "medium", "standalone"]),
    );
    expect(badge.classes()).not.toContain("dot");
    expect(badge.classes()).not.toContain("top-right");
    expect(badge.attributes("data-part")).toBe("root");
  });

  it("renders a zero count and text children as its content", () => {
    expect(mount(Badge, { props: { content: 0 } }).text()).toBe("0");
    const text = mount(Badge, { slots: { default: "New" } });
    expect(text.element.tagName).toBe("SPAN");
    expect(text.classes()).toContain("standalone");
    expect(text.text()).toBe("New");
  });

  it("wraps element children and shows content on the badge", () => {
    const wrapper = mount(Badge, {
      props: { content: 3 },
      slots: { default: () => h("button", { type: "button" }, "Inbox") },
    });
    expect(wrapper.attributes("data-part")).toBe("root");
    expect(wrapper.classes()).toContain("badgeWrapper");
    const button = wrapper.get("button");
    expect(button.element.parentElement!.className).toContain("content");
    const badge = wrapper.get('[role="status"]');
    expect(badge.text()).toBe("3");
    expect(badge.attributes("data-part")).toBe("badge");
    expect(badge.classes()).toContain("top-right");
  });

  it("uses text children with content as attached content", () => {
    const wrapper = mount(Badge, {
      props: { content: "9" },
      slots: { default: "Inbox" },
    });
    expect(wrapper.classes()).toContain("badgeWrapper");
    expect(wrapper.get('[role="status"]').text()).toBe("9");
  });

  it("falls back to a default label for element children without content", () => {
    const wrapper = mount(Badge, {
      slots: { default: () => h("span", "Icon") },
    });
    expect(wrapper.get('[role="status"]').text()).toBe("Badge");
  });

  it("renders as an empty dot when dot is set", () => {
    const wrapper = mount(Badge, { props: { dot: true, content: 9 } });
    expect(wrapper.classes()).toContain("dot");
    expect(wrapper.text()).toBe("");
    const attached = mount(Badge, {
      props: { dot: true },
      slots: { default: () => h("i", "x") },
    });
    expect(attached.get('[role="status"]').text()).toBe("");
  });

  it.each([
    ["success", "small", "bottom-left"],
    ["danger", "large", "top-left"],
    ["neutral", "medium", "bottom-right"],
  ] as const)(
    "applies color %s, size %s and position %s",
    (color, size, position) => {
      const wrapper = mount(Badge, {
        props: { content: "x", color, size, position, variant: "subtle" },
        attrs: { class: "custom" },
        slots: { default: () => h("span", "Icon") },
      });
      expect(wrapper.get('[role="status"]').classes()).toEqual(
        expect.arrayContaining([color, size, position, "custom", "subtle"]),
      );
      expect(wrapper.attributes("data-color")).toBe(color);
    },
  );

  it("renders an icon, a content slot, borders and a custom role", () => {
    const wrapper = mount(Badge, {
      props: { borderRadius: "2px", borderWidth: "3px", role: "presentation" },
      attrs: { style: { color: "red" } },
      slots: { icon: () => h("svg", { id: "star" }), content: () => "Pro" },
    });
    expect(wrapper.get("#star").element.parentElement!.className).toContain(
      "icon",
    );
    expect(wrapper.attributes("role")).toBe("presentation");
    expect(wrapper.text()).toBe("Pro");
    const style = (wrapper.element as HTMLElement).style;
    expect(style.borderRadius).toBe("2px");
    expect(style.borderWidth).toBe("3px");
    expect(style.color).toBe("red");
    const attached = mount(Badge, {
      slots: { default: () => h("i"), icon: () => h("svg", { id: "s2" }) },
    });
    expect(attached.find('[data-part="icon"] #s2').exists()).toBe(true);
  });
});
