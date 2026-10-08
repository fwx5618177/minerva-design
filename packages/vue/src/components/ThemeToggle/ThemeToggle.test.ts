import { afterEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import ConfigProvider from "../../config/ConfigProvider.vue";
import { PaletteToggle, ThemeToggle } from ".";

const root = document.documentElement;

afterEach(() => {
  delete root.dataset.theme;
  delete root.dataset.palette;
});

const pressed = (wrapper: ReturnType<typeof mount>) =>
  wrapper
    .findAll("button")
    .filter((b) => b.attributes("aria-pressed") === "true")
    .map((b) => b.text());

describe("ThemeToggle", () => {
  it("renders light / dark / system toggle buttons in a labelled group", () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: "light" },
      slots: { default: () => h(ThemeToggle, { class: "mine", id: "tt" }) },
    });
    const group = wrapper.get('[role="group"]');
    expect(group.attributes("aria-label")).toBe("Current theme light");
    expect(group.attributes("id")).toBe("tt");
    expect(group.classes()).toEqual(expect.arrayContaining(["group", "mine"]));
    expect(group.attributes("data-minerva")).toBe("theme-toggle");
    const buttons = wrapper.findAll("button");
    expect(buttons.map((b) => b.text())).toEqual(["Light", "Dark", "System"]);
    for (const button of buttons) {
      expect(button.attributes("type")).toBe("button");
      expect(button.classes()).toContain("item");
    }
    expect(pressed(wrapper)).toEqual(["Light"]);
    expect(buttons[0].attributes("data-state")).toBe("active");
    expect(buttons[1].attributes("data-state")).toBe("inactive");
  });

  it("switches the theme of the closest ConfigProvider", async () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: "light" },
      slots: { default: () => h(ThemeToggle) },
      attachTo: document.body,
    });
    await wrapper.findAll("button")[1].trigger("click");
    await nextTick();
    expect(pressed(wrapper)).toEqual(["Dark"]);
    expect(wrapper.emitted("update:theme")).toEqual([["dark"]]);
    expect(wrapper.get('[role="group"]').attributes("aria-label")).toBe(
      "Current theme dark",
    );
    expect(root.dataset.theme).toBe("dark");
    await wrapper.findAll("button")[2].trigger("click");
    expect(pressed(wrapper)).toEqual(["System"]);
  });

  it("hides the system option and accepts custom labels", () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: "dark" },
      slots: {
        default: () =>
          h(ThemeToggle, {
            showSystem: false,
            labels: { dark: "Night" },
            "aria-label": "Mode",
          }),
      },
    });
    expect(wrapper.findAll("button").map((b) => b.text())).toEqual([
      "Light",
      "Night",
    ]);
    expect(wrapper.get('[role="group"]').attributes("aria-label")).toBe("Mode");
  });

  it("throws outside of a ConfigProvider", () => {
    expect(() => mount(ThemeToggle)).toThrow(/ConfigProvider/);
  });
});

describe("PaletteToggle", () => {
  it("renders the palettes without an active one by default", () => {
    const wrapper = mount(ConfigProvider, {
      slots: { default: () => h(PaletteToggle) },
    });
    const group = wrapper.get('[role="group"]');
    expect(group.attributes("data-minerva")).toBe("palette-toggle");
    expect(group.attributes("aria-label")).toBe("Current palette Default");
    expect(wrapper.findAll("button").map((b) => b.text())).toEqual([
      "Editorial",
      "Tech",
      "Graphite",
      "Cool",
    ]);
    expect(pressed(wrapper)).toEqual([]);
  });

  it("switches the palette of the closest ConfigProvider", async () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: "light" },
      slots: { default: () => h(PaletteToggle, { showDefault: true }) },
      attachTo: document.body,
    });
    const buttons = () => wrapper.findAll("button");
    expect(buttons()[0].text()).toBe("Default");
    expect(pressed(wrapper)).toEqual(["Default"]);
    await buttons()[2].trigger("click");
    await nextTick();
    expect(pressed(wrapper)).toEqual(["Tech"]);
    expect(buttons()[2].attributes("data-state")).toBe("active");
    expect(wrapper.emitted("update:palette")).toEqual([["tech"]]);
    expect(wrapper.get('[role="group"]').attributes("aria-label")).toBe(
      "Current palette tech",
    );
    expect(root.dataset.palette).toBe("tech");
    await buttons()[0].trigger("click");
    expect(pressed(wrapper)).toEqual(["Default"]);
  });

  it("offers a subset of palettes with custom labels", () => {
    const wrapper = mount(ConfigProvider, {
      props: { palette: "cool" },
      slots: {
        default: () =>
          h(PaletteToggle, {
            palettes: ["cool", "tech"],
            showDefault: true,
            labels: { default: "None", cool: "Ice" },
          }),
      },
    });
    expect(wrapper.findAll("button").map((b) => b.text())).toEqual([
      "None",
      "Ice",
      "Tech",
    ]);
    expect(pressed(wrapper)).toEqual(["Ice"]);
  });
});
