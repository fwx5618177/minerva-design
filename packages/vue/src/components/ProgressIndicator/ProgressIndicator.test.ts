import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { ProgressIndicator } from ".";

describe("ProgressIndicator", () => {
  it("is an indeterminate progressbar named Loading by default", () => {
    const wrapper = mount(ProgressIndicator, { attrs: { class: "mine" } });
    expect(wrapper.attributes("role")).toBe("progressbar");
    expect(wrapper.attributes("aria-label")).toBe("Loading");
    expect(wrapper.attributes("aria-valuenow")).toBeUndefined();
    expect(wrapper.attributes("tabindex")).toBeUndefined();
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["progressIndicator", "primary", "mine"]),
    );
    expect(wrapper.classes()).not.toContain("defaultWidth");
    const indicator = wrapper.get('[data-part="indicator"]');
    expect(indicator.element.tagName.toLowerCase()).toBe("svg");
    expect(indicator.classes()).toEqual(
      expect.arrayContaining(["spinner", "medium"]),
    );
    expect(wrapper.attributes("data-variant")).toBe("spinner");
  });

  it.each([
    ["bar", "barContainer"],
    ["wave", "waveContainer"],
    ["circle", "circle"],
    ["dottedBar", "dottedBarContainer"],
  ] as const)("renders the %s variant", (variant, cls) => {
    const wrapper = mount(ProgressIndicator, {
      props: { variant, size: "large" },
    });
    const indicator = wrapper.get('[data-part="indicator"]');
    expect(indicator.classes()).toEqual(expect.arrayContaining([cls, "large"]));
    expect(wrapper.attributes("data-variant")).toBe(
      variant === "dottedBar" ? "dotted-bar" : variant,
    );
    if (variant === "bar" || variant === "dottedBar") {
      expect(wrapper.classes()).toContain("defaultWidth");
    }
  });

  it("is named by its visible label, or by aria-label", () => {
    const labelled = mount(ProgressIndicator, {
      props: { label: "Uploading" },
    });
    const label = labelled.get('[data-part="label"]');
    expect(label.text()).toBe("Uploading");
    expect(labelled.attributes("aria-labelledby")).toBe(label.attributes("id"));
    expect(labelled.attributes("aria-label")).toBeUndefined();
    const named = mount(ProgressIndicator, {
      props: { label: "Uploading" },
      attrs: { "aria-label": "Uploading files" },
    });
    expect(named.attributes("aria-label")).toBe("Uploading files");
    expect(named.attributes("aria-labelledby")).toBeUndefined();
    const slot = mount(ProgressIndicator, {
      slots: { label: () => h("b", "Rich"), icon: () => h("svg", { id: "i" }) },
    });
    expect(slot.get('[data-part="label"] b').text()).toBe("Rich");
    expect(slot.find('[data-part="icon"] #i').exists()).toBe(true);
  });

  it("is purely visual when decorative", () => {
    const wrapper = mount(ProgressIndicator, {
      props: { decorative: true, color: "current" },
    });
    expect(wrapper.attributes("aria-hidden")).toBe("true");
    expect(wrapper.attributes("role")).toBeUndefined();
    expect(wrapper.attributes("aria-label")).toBeUndefined();
    expect(wrapper.attributes("data-color")).toBe("current");
  });

  it("supports a custom and a full width", () => {
    const custom = mount(ProgressIndicator, {
      props: { variant: "bar", width: "120px" },
      attrs: { style: { opacity: "0.5" } },
    });
    expect((custom.element as HTMLElement).style.width).toBe("120px");
    expect((custom.element as HTMLElement).style.opacity).toBe("0.5");
    expect(custom.classes()).not.toContain("defaultWidth");
    const full = mount(ProgressIndicator, {
      props: { variant: "bar", width: "120px", full: true },
    });
    expect(full.classes()).toContain("fullWidth");
    expect((full.element as HTMLElement).style.width).toBe("");
  });

  it("fills a determinate bar and exposes the clamped value", async () => {
    const wrapper = mount(ProgressIndicator, {
      props: {
        variant: "bar",
        value: 3,
        max: 4,
        showValue: true,
        color: "success",
      },
    });
    const root = wrapper.element as HTMLElement;
    expect(root.classList).toContain("success");
    expect(root.getAttribute("aria-label")).toBe("Progress");
    expect(root.getAttribute("aria-valuemin")).toBe("0");
    expect(root.getAttribute("aria-valuemax")).toBe("4");
    expect(root.getAttribute("aria-valuenow")).toBe("3");
    expect(root.hasAttribute("aria-valuetext")).toBe(false);
    const fill = root.querySelector(".bar") as HTMLElement;
    expect(fill.classList).toContain("determinate");
    expect(fill.style.width).toBe("75%");
    expect(root.querySelector(".value")?.textContent).toBe("75%");

    await wrapper.setProps({ value: 500, max: 0 });
    expect(root.getAttribute("aria-valuemax")).toBe("100");
    expect(root.getAttribute("aria-valuenow")).toBe("100");

    await wrapper.setProps({
      value: -2,
      format: (value: number, max: number) => `${value}/${max}`,
    });
    expect(root.getAttribute("aria-valuenow")).toBe("0");
    expect(root.getAttribute("aria-valuetext")).toBe("0/100");
    expect(root.querySelector(".value")?.textContent).toBe("0/100");
  });

  it("renders a value slot and a determinate arc for the circle", () => {
    const wrapper = mount(ProgressIndicator, {
      props: { variant: "circle", value: 25, showValue: true },
      slots: {
        value: ({ value, max }: { value: number; max: number }) =>
          h("b", `${value} of ${max}`),
      },
    });
    const root = wrapper.element as HTMLElement;
    expect(root.querySelector("svg.ring")).not.toBeNull();
    expect(
      root.querySelector(".ringArc")?.getAttribute("stroke-dasharray"),
    ).toBe("25 100");
    expect(root.querySelector(".value b")?.textContent).toBe("25 of 100");
  });

  it.each(["spinner", "wave", "dottedBar"] as const)(
    "ignores value for the %s variant",
    (variant) => {
      const root = mount(ProgressIndicator, {
        props: { variant, value: 50, showValue: true },
      }).element as HTMLElement;
      expect(root.hasAttribute("aria-valuenow")).toBe(false);
      expect(root.getAttribute("aria-label")).toBe("Loading");
      expect(root.querySelector(".value")).toBeNull();
    },
  );
});
