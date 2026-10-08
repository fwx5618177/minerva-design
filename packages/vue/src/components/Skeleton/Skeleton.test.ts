import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { Skeleton, SkeletonText } from ".";

describe("Skeleton", () => {
  it("renders a busy status region with one line", () => {
    const wrapper = mount(Skeleton, { attrs: { class: "mine", id: "s" } });
    expect(wrapper.attributes("role")).toBe("status");
    expect(wrapper.attributes("aria-busy")).toBe("true");
    expect(wrapper.attributes("aria-label")).toBe("Loading");
    expect(wrapper.attributes("id")).toBe("s");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["skeletonRoot", "mine"]),
    );
    expect(wrapper.attributes("data-variant")).toBe("text");
    const lines = wrapper.findAll('[data-part="line"]');
    expect(lines).toHaveLength(1);
    expect(lines[0].classes()).toEqual(
      expect.arrayContaining(["skeleton", "text", "animation-pulse"]),
    );
  });

  it("sizes the lines, applies the style attribute to them", () => {
    const wrapper = mount(Skeleton, {
      props: {
        lines: 3,
        width: 100,
        height: "1em",
        borderRadius: 4,
        animation: "wave",
        variant: "rounded",
      },
      attrs: { style: { opacity: "0.5" }, "aria-label": "Loading posts" },
    });
    expect(wrapper.attributes("aria-label")).toBe("Loading posts");
    expect((wrapper.element as HTMLElement).style.opacity).toBe("");
    const lines = wrapper.findAll('[data-part="line"]');
    expect(lines).toHaveLength(3);
    const style = (lines[0].element as HTMLElement).style;
    expect(style.width).toBe("100px");
    expect(style.height).toBe("1em");
    expect(style.borderRadius).toBe("4px");
    expect(style.opacity).toBe("0.5");
    expect(lines[0].classes()).toEqual(
      expect.arrayContaining(["rounded", "animation-wave"]),
    );
  });

  it.each([-1, 1.7, Number.NaN])("guards the line count %s", (lines) => {
    const wrapper = mount(Skeleton, { props: { lines } });
    expect(wrapper.findAll('[data-part="line"]').length).toBe(
      Number.isFinite(lines) ? Math.max(0, Math.floor(lines)) : 0,
    );
  });

  it("renders the avatar, title and paragraph", () => {
    const wrapper = mount(Skeleton, {
      props: {
        avatar: true,
        avatarSize: "3rem",
        avatarShape: "square",
        title: true,
        paragraph: true,
      },
    });
    expect(wrapper.classes()).toContain("withAvatar");
    const avatar = wrapper.get('[data-part="avatar"]');
    expect(avatar.classes()).toContain("avatar-square");
    expect((avatar.element as HTMLElement).style.width).toBe("3rem");
    expect(wrapper.find('[data-part="title"]').exists()).toBe(true);
    // the paragraph replaces the lines
    expect(wrapper.findAll('[data-part="line"]')).toHaveLength(4);
  });

  it("renders the card variant", () => {
    const wrapper = mount(Skeleton, {
      props: {
        variant: "card",
        avatar: true,
        title: true,
        paragraph: true,
        active: true,
      },
    });
    const card = wrapper.get(".card");
    expect(card.classes()).toContain("active");
    expect(
      (wrapper.get('[data-part="avatar"]').element as HTMLElement).style.width,
    ).toBe("40px");
    expect(card.find(".cardContent [data-part='title']").exists()).toBe(true);
    expect(wrapper.findAll('[data-part="line"]')).toHaveLength(4);
    const bare = mount(Skeleton, { props: { variant: "card" } });
    expect(bare.find('[data-part="avatar"]').exists()).toBe(false);
    expect(bare.find('[data-part="line"]').exists()).toBe(false);
  });

  it("renders the slot once loaded", () => {
    const wrapper = mount(Skeleton, {
      props: { loading: false },
      slots: { default: () => h("p", "Content") },
    });
    expect(wrapper.html()).toBe("<p>Content</p>");
  });

  it("renders a decorative block", () => {
    const circle = mount(Skeleton, {
      props: { decorative: true, variant: "circular", size: 24 },
      attrs: { class: "mine", style: { opacity: "0.3" } },
    });
    expect(circle.element.tagName).toBe("SPAN");
    expect(circle.attributes("aria-hidden")).toBe("true");
    expect(circle.attributes("role")).toBeUndefined();
    expect(circle.classes()).toEqual(
      expect.arrayContaining(["skeleton", "decorative", "circular", "mine"]),
    );
    const style = (circle.element as HTMLElement).style;
    expect(style.width).toBe("24px");
    expect(style.height).toBe("24px");
    expect(style.opacity).toBe("0.3");
    const fallback = mount(Skeleton, {
      props: { decorative: true, variant: "circular" },
    });
    expect((fallback.element as HTMLElement).style.width).toBe("32px");
    const rect = mount(Skeleton, {
      props: {
        decorative: true,
        variant: "rectangular",
        width: "50%",
        height: 8,
      },
    });
    expect((rect.element as HTMLElement).style.width).toBe("50%");
    expect((rect.element as HTMLElement).style.height).toBe("8px");
  });
});

describe("SkeletonText", () => {
  it("renders decorative lines with a shortened last line", () => {
    const wrapper = mount(SkeletonText, { attrs: { class: "mine" } });
    expect(wrapper.attributes("aria-hidden")).toBe("true");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["skeletonText", "mine"]),
    );
    expect((wrapper.element as HTMLElement).style.gap).toBe("var(--space-2)");
    const lines = wrapper.findAll('[data-part="line"]');
    expect(lines).toHaveLength(3);
    expect((lines[0].element as HTMLElement).style.width).toBe("100%");
    expect((lines[2].element as HTMLElement).style.width).toBe("70%");
    expect((lines[2].element as HTMLElement).style.height).toBe("1em");
  });

  it("supports line height, gap, no shrink and guards the count", () => {
    const wrapper = mount(SkeletonText, {
      props: {
        lines: 2,
        lineHeight: 12,
        gap: "4px",
        shrinkLast: false,
        animation: "false",
      },
    });
    const lines = wrapper.findAll('[data-part="line"]');
    expect((lines[1].element as HTMLElement).style.width).toBe("100%");
    expect((lines[1].element as HTMLElement).style.height).toBe("12px");
    expect((wrapper.element as HTMLElement).style.gap).toBe("4px");
    expect(
      mount(SkeletonText, { props: { lines: Number.NaN } }).findAll("span"),
    ).toHaveLength(0);
  });
});
