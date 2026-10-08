import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { h, nextTick, ref } from "vue";
import { SplitLayout } from ".";

describe("SplitLayout", () => {
  it("renders main then aside with the default variables", () => {
    const wrapper = mount(SplitLayout, {
      props: { aside: "Aside" },
      attrs: { class: "consumer" },
      slots: { default: "Main" },
    });
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["root", "consumer"]),
    );
    const style = (wrapper.element as HTMLElement).style;
    expect(style.getPropertyValue("--split-layout-aside-width")).toBe("320px");
    expect(style.getPropertyValue("--split-layout-gap")).toBe("var(--space-6)");
    const grid = wrapper.element.firstElementChild!;
    expect(grid.className).toContain("grid");
    expect(grid.className).toContain("md");
    expect(grid.className).toContain("hasAside");
    const parts = Array.from(grid.children).map((c) =>
      c.getAttribute("data-part"),
    );
    expect(parts).toEqual(["main", "aside"]);
    expect(wrapper.get('[data-part="aside"]').text()).toBe("Aside");
  });

  it("omits the aside without content, renders 0 and the aside slot", () => {
    const none = mount(SplitLayout, { props: { aside: null } });
    expect(none.find('[data-part="aside"]').exists()).toBe(false);
    expect(none.element.firstElementChild!.className).not.toContain("hasAside");
    const zero = mount(SplitLayout, { props: { aside: 0 } });
    expect(zero.get('[data-part="aside"]').text()).toBe("0");
    const slot = mount(SplitLayout, {
      props: { collapseBelow: "lg", asideWidth: 200, gap: "1rem" },
      slots: { aside: () => h("nav", "Nav") },
    });
    expect(slot.get('[data-part="aside"] nav').text()).toBe("Nav");
    expect(slot.element.firstElementChild!.className).toContain("lg");
    const style = (slot.element as HTMLElement).style;
    expect(style.getPropertyValue("--split-layout-aside-width")).toBe("200px");
    expect(style.getPropertyValue("--split-layout-gap")).toBe("1rem");
  });

  it("does not remount main when the aside toggles", async () => {
    const aside = ref<string | null>(null);
    const wrapper = mount({
      setup: () => () =>
        h(SplitLayout, { aside: aside.value }, () => h("input", { id: "m" })),
    });
    const input = wrapper.get("#m").element;
    aside.value = "Now";
    await nextTick();
    expect(wrapper.get("#m").element).toBe(input);
    expect(wrapper.find('[data-part="aside"]').exists()).toBe(true);
  });

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])(
    "throws a RangeError for asideWidth %s",
    (asideWidth) => {
      vi.spyOn(console, "warn").mockImplementation(() => {});
      expect(() =>
        mount(SplitLayout, { props: { aside: "A", asideWidth } }),
      ).toThrow(RangeError);
    },
  );
});
