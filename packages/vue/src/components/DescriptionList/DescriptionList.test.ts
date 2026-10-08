import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { DescriptionList } from ".";

const items = [
  { key: "a", label: "Status", value: "Active" },
  { key: "b", label: "Count", value: 0 },
];

describe("DescriptionList", () => {
  it("renders a dl with one row per item", () => {
    const wrapper = mount(DescriptionList, {
      props: { items },
      attrs: { class: "mine", "aria-label": "Details" },
    });
    expect(wrapper.element.tagName).toBe("DL");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["descriptionList", "mine"]),
    );
    const rows = wrapper.findAll('[data-part="row"]');
    expect(rows).toHaveLength(2);
    expect(rows[0].classes()).toContain("row");
    expect(rows[0].get("dt").text()).toBe("Status");
    expect(rows[0].get("dd").text()).toBe("Active");
    expect(rows[1].get("dd").text()).toBe("0");
    expect(rows[0].get("dt").attributes("data-part")).toBe("term");
    expect(rows[0].get("dd").attributes("data-part")).toBe("description");
  });

  it("supports bordered, striped and the label / value slots", () => {
    const wrapper = mount(DescriptionList, {
      props: { items, bordered: true, striped: true },
      slots: {
        label: ({ item }: { item: { label: string } }) => h("em", item.label),
        value: ({ item }: { item: { key: string } }) => h("code", item.key),
      },
    });
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["bordered", "striped"]),
    );
    expect(wrapper.get("dt em").text()).toBe("Status");
    expect(wrapper.get("dd code").text()).toBe("a");
  });
});
