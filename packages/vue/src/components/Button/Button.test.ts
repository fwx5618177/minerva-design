import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { Button } from ".";

describe("Button", () => {
  it("renders a type=button with the default classes and hooks", () => {
    const wrapper = mount(Button, { slots: { default: "Save" } });
    const button = wrapper.get("button");
    expect(button.attributes("type")).toBe("button");
    expect(button.classes()).toEqual(
      expect.arrayContaining([
        "customButton",
        "primary",
        "variant-solid",
        "medium",
      ]),
    );
    expect(button.attributes("data-minerva")).toBe("button");
    expect(button.attributes("data-part")).toBe("root");
    expect(button.attributes("data-state")).toBe("inactive");
    expect(button.get('[data-part="label"]').text()).toBe("Save");
  });

  it("emits click, not while disabled or loading", async () => {
    const wrapper = mount(Button, { slots: { default: "Go" } });
    await wrapper.get("button").trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
    await wrapper.setProps({ disabled: true });
    await wrapper.get("button").trigger("click");
    await wrapper.setProps({ disabled: false, loading: true });
    await wrapper.get("button").trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
    expect(wrapper.get("button").attributes("aria-busy")).toBe("true");
    expect(wrapper.get("button").attributes("aria-disabled")).toBe("true");
    expect(wrapper.find('[data-part="spinner"]').exists()).toBe(true);
  });

  it("renders icons, loading text, shapes and radius", () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
        loadingText: "Saving",
        shape: "circle",
        borderRadius: 4,
      },
      slots: { default: "Save" },
    });
    expect(wrapper.text()).toBe("Saving");
    expect(wrapper.get("button").classes()).toContain("circle");
    expect(wrapper.get("button").attributes("style")).toContain("4px");
    const icons = mount(Button, {
      props: { borderRadius: "large", fullWidth: true, active: true },
      slots: {
        default: "Next",
        "start-icon": () => h("i", "<"),
        "end-icon": () => h("i", ">"),
      },
    });
    expect(icons.find('[data-part="start-icon"]').exists()).toBe(true);
    expect(icons.find('[data-part="end-icon"]').exists()).toBe(true);
    expect(icons.get("button").classes()).toEqual(
      expect.arrayContaining(["borderRadiusLarge", "fullWidth", "active"]),
    );
  });

  it("forwards attributes but keeps its styling hooks", () => {
    const wrapper = mount(Button, {
      attrs: { class: "mine", "data-part": "x", "aria-label": "Close" },
    });
    const button = wrapper.get("button");
    expect(button.classes()).toContain("mine");
    expect(button.attributes("data-part")).toBe("root");
    expect(button.attributes("aria-label")).toBe("Close");
  });
});
