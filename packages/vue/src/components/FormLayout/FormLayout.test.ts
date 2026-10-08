import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { FormLayout } from ".";

describe("FormLayout", () => {
  it("renders a form with the responsive grid", async () => {
    const onSubmit = vi.fn((event: Event) => event.preventDefault());
    const wrapper = mount(FormLayout, {
      props: { columns: { base: 1, md: 2 }, gap: 2, rowGap: "8px" },
      attrs: { class: "mine", onSubmit, "aria-label": "Profile" },
      slots: { default: () => h("input", { "aria-label": "Name" }) },
    });
    const form = wrapper.get("form");
    expect(form.classes()).toEqual(expect.arrayContaining(["root", "mine"]));
    expect(form.attributes("data-minerva")).toBe("form-layout");
    expect(form.attributes("aria-label")).toBe("Profile");
    const grid = wrapper.get('[data-minerva="responsive-grid"]');
    const style = grid.attributes("style")!;
    expect(style).toContain("--grid-columns-base: 1");
    expect(style).toContain("--grid-columns-sm: 1");
    expect(style).toContain("--grid-columns-md: 2");
    expect(style).toContain("--grid-columns-lg: 2");
    expect(style).toContain("--grid-row-gap: 8px");
    expect(grid.get('[data-part="layout"]').find("input").exists()).toBe(true);
    await form.trigger("submit");
    expect(onSubmit).toHaveBeenCalled();
  });

  it("uses one column by default and a number of columns", () => {
    const wrapper = mount(FormLayout, { props: { columns: 3 } });
    expect(
      wrapper.get('[data-minerva="responsive-grid"]').attributes("style"),
    ).toContain("--grid-columns-lg: 3");
    expect(() => mount(FormLayout, { props: { columns: 13 } })).toThrow(
      RangeError,
    );
  });
});
