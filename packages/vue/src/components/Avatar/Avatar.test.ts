import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { Avatar, AvatarGroup } from ".";

describe("Avatar", () => {
  it("renders the image with the name as alt text", () => {
    const wrapper = mount(Avatar, {
      props: { src: "a.png", name: "Ada Lovelace" },
      attrs: { class: "mine", "aria-label": "ignored on root" },
    });
    const img = wrapper.get("img");
    expect(img.attributes("alt")).toBe("ignored on root");
    expect(img.attributes("draggable")).toBe("false");
    expect(img.attributes("data-part")).toBe("image");
    expect(wrapper.attributes("aria-label")).toBeUndefined();
    expect(wrapper.attributes("role")).toBeUndefined();
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["avatar", "circle", "medium", "mine"]),
    );
    const named = mount(Avatar, { props: { src: "a.png", name: "Ada" } });
    expect(named.get("img").attributes("alt")).toBe("Ada");
    const decorative = mount(Avatar, { props: { src: "a.png", alt: "" } });
    expect(decorative.get("img").attributes("alt")).toBe("");
  });

  it("falls back to initials when the image fails, retries a new src", async () => {
    const wrapper = mount(Avatar, {
      props: { src: "bad.png", name: "Ada Lovelace" },
    });
    await wrapper.get("img").trigger("error");
    expect(wrapper.find("img").exists()).toBe(false);
    expect(wrapper.attributes("role")).toBe("img");
    expect(wrapper.attributes("aria-label")).toBe("Ada Lovelace");
    const fallback = wrapper.get('[data-part="fallback"]');
    expect(fallback.text()).toBe("AL");
    expect(fallback.attributes("aria-hidden")).toBe("true");
    await wrapper.setProps({ src: "good.png" });
    expect(wrapper.find("img").exists()).toBe(true);
  });

  it("uses the first CJK character, the fallback and the default slot", () => {
    expect(mount(Avatar, { props: { name: "张三" } }).text()).toBe("张");
    expect(mount(Avatar, { props: { name: "  " } }).text()).toBe("");
    const fallback = mount(Avatar, { props: { name: "Ada", fallback: "?" } });
    expect(fallback.text()).toBe("?");
    const slot = mount(Avatar, { slots: { fallback: () => h("i", "F") } });
    expect(slot.get("i").text()).toBe("F");
    const icon = mount(Avatar, { slots: { default: () => h("svg") } });
    expect(icon.find('[data-part="fallback"] svg').exists()).toBe(true);
    expect(icon.attributes("aria-label")).toBe("avatar");
  });

  it("supports shapes, preset and pixel sizes, stacked", () => {
    const preset = mount(Avatar, {
      props: { name: "A", shape: "square", size: "small", stacked: true },
    });
    expect(preset.classes()).toEqual(
      expect.arrayContaining(["square", "small", "stacked"]),
    );
    expect(preset.attributes("data-size")).toBe("small");
    expect(preset.attributes("data-shape")).toBe("square");
    const px = mount(Avatar, { props: { name: "A", size: 40 } });
    const style = (px.element as HTMLElement).style;
    expect(style.width).toBe("40px");
    expect(style.height).toBe("40px");
    expect(style.getPropertyValue("--avatar-size")).toBe("40px");
    expect(px.attributes("data-size")).toBeUndefined();
  });
});

describe("AvatarGroup", () => {
  const avatars = (n: number) => () =>
    Array.from({ length: n }, (_, i) =>
      h(Avatar, { name: `User ${i}`, key: i }),
    );

  it("is a labelled group of avatar items", () => {
    const wrapper = mount(AvatarGroup, { slots: { default: avatars(2) } });
    expect(wrapper.attributes("role")).toBe("group");
    expect(wrapper.attributes("aria-label")).toBe("Avatar group");
    expect(wrapper.classes()).toContain("avatarGroup");
    expect(wrapper.findAll('[data-part="item"]')).toHaveLength(2);
    expect(wrapper.find('[data-part="count"]').exists()).toBe(false);
  });

  it("limits the visible avatars and shows +N with count", () => {
    const wrapper = mount(AvatarGroup, {
      props: { max: 2, count: 3 },
      slots: { default: () => [...avatars(4)(), null] },
    });
    expect(wrapper.findAll('[data-part="item"]')).toHaveLength(2);
    const count = wrapper.get('[data-part="count"]');
    expect(count.text()).toBe("+5");
    expect(count.attributes("aria-hidden")).toBe("true");
    expect(wrapper.attributes("aria-label")).toBe("Avatar group with 5 more");
    const labelled = mount(AvatarGroup, {
      attrs: { "aria-label": "Team" },
      slots: { default: avatars(1) },
    });
    expect(labelled.attributes("aria-label")).toBe("Team");
    expect(labelled.attributes("data-minerva")).toBe("avatar-group");
  });
});
