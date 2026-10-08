import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { List, ListItem } from ".";

describe("List", () => {
  it("is a native ul with list semantics and dividers", () => {
    const wrapper = mount(List, {
      attrs: { "aria-label": "Members", class: "mine" },
      slots: { default: () => h(ListItem, { primary: "Ada" }) },
    });
    expect(wrapper.element.tagName).toBe("UL");
    expect(wrapper.attributes("role")).toBe("list");
    expect(wrapper.attributes("aria-label")).toBe("Members");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["list", "dividers", "mine"]),
    );
    expect(wrapper.attributes("data-minerva")).toBe("list");
    expect(wrapper.findAll("li")).toHaveLength(1);
  });

  it.each([
    ["compact", "compact"],
    ["comfortable", "comfortable"],
  ] as const)("applies the %s density", (density, cls) => {
    const wrapper = mount(List, {
      props: { density, bordered: true, dividers: false, role: "listbox" },
    });
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([cls, "bordered"]),
    );
    expect(wrapper.classes()).not.toContain("dividers");
    expect(wrapper.attributes("role")).toBe("listbox");
  });
});

describe("ListItem", () => {
  it("renders the primary text only", () => {
    const wrapper = mount(ListItem, {
      props: { primary: "Ada" },
      attrs: { class: "row" },
    });
    expect(wrapper.element.tagName).toBe("LI");
    expect(wrapper.classes()).toEqual(expect.arrayContaining(["item", "row"]));
    expect(wrapper.get('[data-part="label"]').text()).toBe("Ada");
    for (const part of ["icon", "description", "actions"]) {
      expect(wrapper.find(`[data-part="${part}"]`).exists()).toBe(false);
    }
    expect(
      mount(ListItem, { props: { primary: "x", secondary: "" } })
        .find('[data-part="description"]')
        .exists(),
    ).toBe(false);
  });

  it("renders the secondary text (0 included), icon and actions", () => {
    const wrapper = mount(ListItem, {
      props: { primary: "Ada", secondary: 0 },
      slots: { icon: () => h("svg"), actions: () => h("button", "Edit") },
    });
    expect(wrapper.get('[data-part="description"]').text()).toBe("0");
    expect(wrapper.get('[data-part="icon"]').attributes("aria-hidden")).toBe(
      "true",
    );
    expect(wrapper.get('[data-part="actions"] button').text()).toBe("Edit");
    const slots = mount(ListItem, {
      slots: { primary: () => h("b", "P"), secondary: () => "S" },
    });
    expect(slots.get('[data-part="label"] b').text()).toBe("P");
    expect(slots.get('[data-part="description"]').text()).toBe("S");
  });
});
