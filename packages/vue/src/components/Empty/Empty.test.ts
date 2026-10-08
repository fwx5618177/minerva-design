import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { Empty } from ".";

describe("Empty", () => {
  it("renders the default icon and description, named by the description", () => {
    const wrapper = mount(Empty, { attrs: { class: "mine" } });
    expect(wrapper.attributes("role")).toBe("status");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["empty", "mine"]),
    );
    expect(wrapper.classes()).not.toContain("sized");
    const icon = wrapper.get('[data-part="icon"] svg');
    expect(icon.attributes("aria-hidden")).toBe("true");
    expect(icon.attributes("width")).toBe("40");
    const description = wrapper.get('[data-part="description"]');
    expect(description.text()).toBe("No Data");
    expect(wrapper.attributes("aria-labelledby")).toBe(
      description.attributes("id"),
    );
    expect(wrapper.attributes("aria-describedby")).toBeUndefined();
    for (const part of ["title", "actions", "footer"]) {
      expect(wrapper.find(`[data-part="${part}"]`).exists()).toBe(false);
    }
  });

  it("is named by its title and described by its description", () => {
    const wrapper = mount(Empty, {
      props: { title: "No orders", description: "Create one", size: "large" },
      slots: {
        default: "Footer",
        action: () => h("button", "New"),
        "secondary-action": () => h("a", { href: "/help" }, "Help"),
      },
    });
    const title = wrapper.get('[data-part="title"]');
    expect(wrapper.attributes("aria-labelledby")).toBe(title.attributes("id"));
    expect(wrapper.attributes("aria-describedby")).toBe(
      wrapper.get('[data-part="description"]').attributes("id"),
    );
    expect(wrapper.get('[data-part="actions"]').text()).toBe("NewHelp");
    expect(wrapper.get('[data-part="footer"]').text()).toBe("Footer");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["sized", "size-large"]),
    );
    expect(wrapper.attributes("data-size")).toBe("large");
  });

  it("hides the description with null and the icon with null / false", () => {
    for (const icon of [null, false] as const) {
      const wrapper = mount(Empty, { props: { icon, description: null } });
      expect(wrapper.find('[data-part="icon"]').exists()).toBe(false);
      expect(wrapper.find('[data-part="description"]').exists()).toBe(false);
      expect(wrapper.attributes("aria-labelledby")).toBeUndefined();
    }
  });

  it("supports the svg illustration, slots, sizes and an explicit name", () => {
    const svg = mount(Empty, {
      props: { useSvg: true, width: 300, height: "10rem", showShadow: true },
      attrs: { "aria-label": "Nothing here" },
    });
    expect(svg.get('[data-part="icon"] svg').attributes("viewBox")).toBe(
      "0 0 64 41",
    );
    expect(svg.attributes("aria-labelledby")).toBeUndefined();
    expect(svg.attributes("aria-label")).toBe("Nothing here");
    expect(svg.classes()).toContain("showShadow");
    const style = (svg.element as HTMLElement).style;
    expect(style.width).toBe("300px");
    expect(style.height).toBe("10rem");
    const slots = mount(Empty, {
      slots: {
        icon: () => h("i", { id: "custom" }),
        title: () => h("strong", "T"),
        description: () => "D",
      },
    });
    expect(slots.find("#custom").exists()).toBe(true);
    expect(slots.get('[data-part="title"] strong').text()).toBe("T");
    expect(slots.get('[data-part="description"]').text()).toBe("D");
  });
});
