import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { Prose } from ".";

describe("Prose", () => {
  it("wraps semantic HTML in a prose div", () => {
    const wrapper = mount(Prose, {
      attrs: { class: "mine", id: "p" },
      slots: { default: () => h("p", "Text") },
    });
    expect(wrapper.element.tagName).toBe("DIV");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["prose", "mine"]),
    );
    expect(wrapper.attributes("id")).toBe("p");
    expect(wrapper.attributes("data-minerva")).toBe("prose");
    expect(wrapper.get("p").text()).toBe("Text");
  });

  it("merges onto its child with asChild", () => {
    const wrapper = mount(Prose, {
      props: { asChild: true },
      slots: { default: () => h("article", { class: "own" }, "Text") },
    });
    expect(wrapper.element.tagName).toBe("ARTICLE");
    expect(wrapper.classes()).toEqual(expect.arrayContaining(["own", "prose"]));
    expect(wrapper.attributes("data-part")).toBe("root");
  });
});
