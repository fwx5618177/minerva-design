import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { Tag } from ".";

describe("Tag", () => {
  it("renders a plain tag with the default classes and hooks", () => {
    const wrapper = mount(Tag, {
      attrs: { id: "t", class: "mine" },
      slots: { default: "Label" },
    });
    expect(wrapper.element.tagName).toBe("DIV");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["tag", "neutral", "medium", "rounded", "mine"]),
    );
    expect(wrapper.attributes("id")).toBe("t");
    expect(wrapper.attributes("data-component")).toBe("tag");
    expect(wrapper.attributes("data-state")).toBe("inactive");
    expect(wrapper.find("button").exists()).toBe(false);
    expect(wrapper.get('[data-part="label"]').text()).toBe("Label");
  });

  it("renders icon and avatar slots, an elevation", () => {
    const wrapper = mount(Tag, {
      props: { elevation: true },
      slots: {
        default: "x",
        icon: () => h("svg"),
        avatar: () => h("img", { alt: "" }),
      },
    });
    expect(wrapper.classes()).toContain("elevation");
    expect(wrapper.find('[data-part="icon"] svg').exists()).toBe(true);
    expect(wrapper.find('[data-part="avatar"] img').exists()).toBe(true);
  });

  it("is a native button when clickable, emits click and draws a ripple", async () => {
    vi.useFakeTimers();
    const wrapper = mount(Tag, {
      props: { clickable: true },
      slots: { default: "Go", icon: () => h("svg") },
    });
    const button = wrapper.get('[data-part="action"]');
    expect(button.element.tagName).toBe("BUTTON");
    expect(button.attributes("type")).toBe("button");
    expect(wrapper.classes()).toContain("clickable");
    expect(button.find('[data-part="icon"]').exists()).toBe(true);
    await button.trigger("click", { clientX: 5, clientY: 5, detail: 1 });
    expect(wrapper.emitted("click")).toHaveLength(1);
    expect(wrapper.findAll(".ripple")).toHaveLength(1);
    await button.trigger("click", { detail: 0 });
    expect(wrapper.findAll(".ripple")).toHaveLength(2);
    vi.advanceTimersByTime(600);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll(".ripple")).toHaveLength(0);
  });

  it("does not ripple without ripple, and clears timers on unmount", async () => {
    const wrapper = mount(Tag, {
      props: { clickable: true, ripple: false },
      slots: { default: "Go" },
    });
    await wrapper.get("button").trigger("click");
    expect(wrapper.findAll(".ripple")).toHaveLength(0);
    vi.useFakeTimers();
    const other = mount(Tag, {
      props: { clickable: true },
      slots: { default: "x" },
    });
    await other.get("button").trigger("click");
    other.unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("is a pressed toggle", () => {
    const wrapper = mount(Tag, {
      props: { clickable: true, pressed: true },
      slots: { default: "Filter" },
    });
    expect(wrapper.get("button").attributes("aria-pressed")).toBe("true");
    expect(wrapper.classes()).toContain("pressed");
    expect(wrapper.attributes("data-state")).toBe("active");
    const off = mount(Tag, {
      props: { clickable: true, pressed: false },
      slots: { default: "Filter" },
    });
    expect(off.get("button").attributes("aria-pressed")).toBe("false");
  });

  it("ignores clicks while disabled or loading", async () => {
    const wrapper = mount(Tag, {
      props: { clickable: true, disabled: true },
      slots: { default: "x" },
    });
    expect(wrapper.get("button").attributes("disabled")).toBeDefined();
    expect(wrapper.classes()).toEqual(expect.arrayContaining(["disabled"]));
    expect(wrapper.classes()).not.toContain("clickable");
    await wrapper.get("button").trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined();
    // a click event dispatched anyway (disabled buttons do not fire in browsers)
    const loading = mount(Tag, {
      props: { clickable: true, loading: true, closable: true },
      slots: { default: "x" },
    });
    expect(loading.attributes("aria-busy")).toBe("true");
    expect(loading.get('[data-part="spinner"]').attributes("aria-hidden")).toBe(
      "true",
    );
    expect(loading.find('[data-part="close-button"]').exists()).toBe(false);
    loading.get("button").element.removeAttribute("disabled");
    await loading.get("button").trigger("click");
    expect(loading.emitted("click")).toBeUndefined();
  });

  it("renders the close button named after the tag and emits close", async () => {
    const onClick = vi.fn();
    const wrapper = mount(Tag, {
      props: { closable: true },
      attrs: { onClick },
      slots: { default: () => [h("b", "Vue"), " js"] },
    });
    const close = wrapper.get('[data-part="close-button"]');
    expect(close.attributes("aria-label")).toBe("Remove Vue js");
    expect(close.attributes("title")).toBe("Remove Vue js");
    expect(close.find("svg").exists()).toBe(true);
    await close.trigger("click");
    expect(wrapper.emitted("close")).toHaveLength(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("supports custom close labels and icon, no close while disabled", async () => {
    const fn = mount(Tag, {
      props: { closable: true, closeLabel: (label: string) => `Drop ${label}` },
      slots: { default: "A", "close-icon": () => h("i", { id: "ci" }) },
    });
    expect(fn.get('[data-part="close-button"]').attributes("aria-label")).toBe(
      "Drop A",
    );
    expect(fn.find("#ci").exists()).toBe(true);
    const str = mount(Tag, {
      props: { closable: true, closeLabel: "Delete" },
      slots: { default: "A" },
    });
    expect(str.get('[data-part="close-button"]').attributes("aria-label")).toBe(
      "Delete",
    );
    const empty = mount(Tag, { props: { closable: true } });
    expect(
      empty.get('[data-part="close-button"]').attributes("aria-label"),
    ).toBe("Close");
    const disabled = mount(Tag, {
      props: { closable: true, disabled: true },
      slots: { default: "A" },
    });
    const button = disabled.get('[data-part="close-button"]');
    button.element.removeAttribute("disabled");
    await button.trigger("click");
    expect(disabled.emitted("close")).toBeUndefined();
  });
});
