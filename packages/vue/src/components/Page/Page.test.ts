import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import { Page, PageHeader, PageSection, StatCard, Toolbar } from ".";

describe("Page", () => {
  it("renders the page column with a max width", () => {
    const wrapper = mount(Page, {
      props: { maxWidth: 960 },
      attrs: { class: "consumer" },
      slots: { default: "Content" },
    });
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["page", "consumer"]),
    );
    expect((wrapper.element as HTMLElement).style.maxWidth).toBe("960px");
    expect(wrapper.attributes("data-minerva")).toBe("page");
    const css = mount(Page, {
      props: { maxWidth: "40rem" },
      attrs: { style: { maxWidth: "10px" } },
    });
    expect((css.element as HTMLElement).style.maxWidth).toBe("10px");
    const none = mount(Page);
    expect((none.element as HTMLElement).style.maxWidth).toBe("");
  });
});

describe("PageHeader", () => {
  it("renders the h1 with description and actions", () => {
    const wrapper = mount(PageHeader, {
      props: { title: "Projects", description: "All projects" },
      slots: { actions: () => h("button", "New") },
    });
    expect(wrapper.element.tagName).toBe("HEADER");
    expect(wrapper.get("h1").text()).toBe("Projects");
    expect(wrapper.get("h1").attributes("data-part")).toBe("title");
    expect(wrapper.get('[data-part="description"]').text()).toBe(
      "All projects",
    );
    expect(wrapper.get('[data-part="actions"] button').text()).toBe("New");
  });

  it("omits empty description and actions, renders 0 and slots", () => {
    const empty = mount(PageHeader, { props: { title: "T", description: "" } });
    expect(empty.find('[data-part="description"]').exists()).toBe(false);
    expect(empty.find('[data-part="actions"]').exists()).toBe(false);
    const zero = mount(PageHeader, { props: { title: "T", description: 0 } });
    expect(zero.get('[data-part="description"]').text()).toBe("0");
    const slots = mount(PageHeader, {
      slots: { title: () => h("em", "Rich"), description: () => "Desc" },
    });
    expect(slots.get("h1 em").text()).toBe("Rich");
    expect(slots.get('[data-part="description"]').text()).toBe("Desc");
  });
});

describe("PageSection", () => {
  it("is a region named by its h2", () => {
    const wrapper = mount(PageSection, {
      props: { title: "Usage", description: "Monthly" },
      slots: {
        default: "Body",
        icon: () => h("svg"),
        actions: () => h("button", "Export"),
      },
    });
    const section = wrapper.get("section");
    const h2 = wrapper.get("h2");
    expect(section.attributes("aria-labelledby")).toBe(h2.attributes("id"));
    expect(h2.text()).toBe("Usage");
    const icon = wrapper.get('[data-part="icon"]');
    expect(icon.attributes("aria-hidden")).toBe("true");
    expect(h2.element.contains(icon.element)).toBe(true);
    expect(wrapper.get('[data-part="header"]').classes()).toContain(
      "sectionHeader",
    );
    expect(wrapper.get('[data-part="description"]').text()).toBe("Monthly");
    expect(wrapper.get('[data-part="actions"]').text()).toBe("Export");
    expect(section.text()).toContain("Body");
  });

  it("omits the optional parts and accepts a title slot", () => {
    const wrapper = mount(PageSection, {
      slots: { title: () => "Slot title" },
    });
    expect(wrapper.get("h2").text()).toBe("Slot title");
    for (const part of ["icon", "description", "actions"]) {
      expect(wrapper.find(`[data-part="${part}"]`).exists()).toBe(false);
    }
  });
});

describe("Toolbar", () => {
  it("is a wrapping group by default", () => {
    const wrapper = mount(Toolbar, {
      attrs: { "aria-label": "Filters" },
      slots: { default: () => h("button", "A") },
    });
    expect(wrapper.attributes("role")).toBe("group");
    expect(wrapper.attributes("aria-label")).toBe("Filters");
    expect(wrapper.classes()).toContain("toolbar");
    expect(wrapper.classes()).not.toContain("nowrap");
    expect(wrapper.classes()).not.toContain("compact");
    expect(wrapper.attributes("data-minerva")).toBe("toolbar");
  });

  it("supports compact density, nowrap, a custom role and asChild", () => {
    const wrapper = mount(Toolbar, {
      props: { density: "compact", wrap: false },
      attrs: { role: "toolbar" },
    });
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["compact", "nowrap"]),
    );
    expect(wrapper.attributes("role")).toBe("toolbar");
    const child = mount(Toolbar, {
      props: { asChild: true },
      slots: { default: () => h("nav", { class: "own" }, "x") },
    });
    expect(child.element.tagName).toBe("NAV");
    expect(child.classes()).toEqual(expect.arrayContaining(["own", "toolbar"]));
    expect(child.attributes("role")).toBe("group");
  });
});

describe("StatCard", () => {
  it("renders the metric as a description list", () => {
    const wrapper = mount(StatCard, {
      props: { label: "Users", value: 0, description: "Last 30 days" },
      slots: { icon: () => h("svg") },
    });
    expect(wrapper.classes()).toContain("statCard");
    expect(wrapper.get("dt").text()).toBe("Users");
    expect(wrapper.get("dd").text()).toBe("0");
    expect(wrapper.get('[data-part="icon"]').attributes("aria-hidden")).toBe(
      "true",
    );
    expect(wrapper.get('[data-part="description"]').text()).toBe(
      "Last 30 days",
    );
  });

  it("omits the icon and description, accepts slots", () => {
    const wrapper = mount(StatCard, {
      slots: {
        label: () => "L",
        value: () => h("strong", "9"),
        description: () => "D",
      },
    });
    expect(wrapper.find('[data-part="icon"]').exists()).toBe(false);
    expect(wrapper.get("dd strong").text()).toBe("9");
    expect(wrapper.get('[data-part="description"]').text()).toBe("D");
    const bare = mount(StatCard, { props: { label: "a", value: "b" } });
    expect(bare.find('[data-part="description"]').exists()).toBe(false);
  });
});
