import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { LoadingState } from ".";

describe("LoadingState", () => {
  it("is a polite atomic status region with a decorative spinner", () => {
    const wrapper = mount(LoadingState, { attrs: { class: "mine" } });
    expect(wrapper.attributes("role")).toBe("status");
    expect(wrapper.attributes("aria-live")).toBe("polite");
    expect(wrapper.attributes("aria-atomic")).toBe("true");
    expect(wrapper.attributes("aria-busy")).toBeUndefined();
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["loadingState", "medium", "mine"]),
    );
    expect(wrapper.attributes("data-size")).toBe("medium");
    const spinner = wrapper.get('[data-part="spinner"]');
    const progress = spinner.get('[data-minerva="progress"]');
    expect(progress.attributes("aria-hidden")).toBe("true");
    expect(progress.attributes("role")).toBeUndefined();
    expect(progress.attributes("data-color")).toBe("current");
    expect(wrapper.get('[data-part="label"]').text()).toBe("Loading...");
  });

  it("shows a custom label and size", () => {
    const wrapper = mount(LoadingState, {
      props: { label: "Fetching orders", size: "small" },
    });
    expect(wrapper.text()).toBe("Fetching orders");
    expect(wrapper.classes()).toContain("small");
  });
});
