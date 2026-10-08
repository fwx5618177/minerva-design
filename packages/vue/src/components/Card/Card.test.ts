import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from ".";

describe("Card", () => {
  it("renders a div with the default classes and hooks", () => {
    const wrapper = mount(Card, {
      attrs: { class: "mine", "data-part": "x" },
      slots: { default: "Body" },
    });
    expect(wrapper.element.tagName).toBe("DIV");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["card", "default", "mine"]),
    );
    expect(wrapper.classes()).not.toContain("padded");
    expect(wrapper.attributes("data-minerva")).toBe("card");
    expect(wrapper.attributes("data-part")).toBe("root");
    expect(wrapper.attributes("data-variant")).toBe("default");
    expect(wrapper.attributes("data-disabled")).toBeUndefined();
    expect(wrapper.attributes("type")).toBeUndefined();
  });

  it("applies variant, padding and interactive", () => {
    const wrapper = mount(Card, {
      props: { variant: "elevated", padding: "small", interactive: true },
    });
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        "elevated",
        "padded",
        "pad-small",
        "interactive",
      ]),
    );
  });

  it("renders a button card with a default type and the disabled state", async () => {
    const onClick = vi.fn();
    const wrapper = mount(Card, {
      props: { as: "button" },
      attrs: { onClick },
      slots: { default: "Open" },
    });
    expect(wrapper.element.tagName).toBe("BUTTON");
    expect(wrapper.attributes("type")).toBe("button");
    await wrapper.trigger("click");
    expect(onClick).toHaveBeenCalledTimes(1);
    const submit = mount(Card, {
      props: { as: "button", type: "submit" },
      attrs: { disabled: "" },
    });
    expect(submit.attributes("type")).toBe("submit");
    expect(submit.attributes("data-disabled")).toBe("");
    const enabled = mount(Card, {
      props: { as: "button" },
      attrs: { disabled: false },
    });
    expect(enabled.attributes("data-disabled")).toBeUndefined();
  });

  it("renders a safe link card", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const wrapper = mount(Card, {
      props: { as: "a" },
      attrs: { href: "/docs", target: "_blank" },
    });
    expect(wrapper.element.tagName).toBe("A");
    expect(wrapper.attributes("href")).toBe("/docs");
    expect(wrapper.attributes("rel")).toBe("noopener noreferrer");
    const own = mount(Card, {
      props: { as: "a" },
      attrs: { href: "/x", rel: "me" },
    });
    expect(own.attributes("rel")).toBe("me");
    const unsafe = mount(Card, {
      props: { as: "a" },
      attrs: { href: "javascript:alert(1)" },
    });
    expect(unsafe.attributes("href")).toBeUndefined();
    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  it("renders the sections with their classes and hooks", () => {
    const wrapper = mount(Card, {
      slots: {
        default: () => [
          h(CardHeader, { padding: "large" }, () => [
            h(CardTitle, null, () => "Title"),
            h(CardDescription, null, () => "Desc"),
          ]),
          h(CardContent, { animation: "fadeIn", padding: "none" }, () => "C"),
          h(CardFooter, { padding: "medium" }, () => "F"),
        ],
      },
    });
    const header = wrapper.get('[data-minerva="card-header"]');
    expect(header.classes()).toEqual(
      expect.arrayContaining(["cardHeader", "pad-large"]),
    );
    const title = wrapper.get('[data-minerva="card-title"]');
    expect(title.element.tagName).toBe("H3");
    expect(title.classes()).toContain("cardTitle");
    const desc = wrapper.get('[data-minerva="card-description"]');
    expect(desc.element.tagName).toBe("P");
    expect(desc.classes()).toContain("cardDescription");
    const content = wrapper.get('[data-minerva="card-content"]');
    expect(content.classes()).toEqual(
      expect.arrayContaining(["cardContent", "fadeIn", "pad-none"]),
    );
    expect(wrapper.get('[data-minerva="card-footer"]').classes()).toEqual(
      expect.arrayContaining(["cardFooter", "pad-medium"]),
    );
  });

  it("renders the title at another heading level and sections without padding", () => {
    const title = mount(CardTitle, {
      props: { as: "h2" },
      attrs: { id: "t" },
      slots: { default: "T" },
    });
    expect(title.element.tagName).toBe("H2");
    expect(title.attributes("id")).toBe("t");
    for (const Section of [CardHeader, CardContent, CardFooter]) {
      const section = mount(Section);
      expect(section.classes().some((c) => c.startsWith("pad-"))).toBe(false);
    }
  });
});
