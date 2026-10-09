import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import ThemeProvider from "./ThemeProvider.vue";
import { useTheme } from "./useTheme";

const Probe = defineComponent(() => {
  const theme = useTheme();
  return () =>
    h("button", { onClick: () => theme.setTheme("dark") }, theme.theme);
});

describe("ThemeProvider", () => {
  it("defaults the root to the system mode and reports mode changes", async () => {
    const wrapper = mount(ThemeProvider, {
      props: { disableStorage: true },
      slots: { default: () => h(Probe) },
      attachTo: document.body,
    });
    expect(wrapper.text()).toBe("system");
    await wrapper.get("button").trigger("click");
    await nextTick();
    expect(wrapper.text()).toBe("dark");
    expect(wrapper.emitted("themeChange")).toEqual([["dark"]]);
    wrapper.unmount();
  });

  it("nested: inherits the parent's mode unless set", () => {
    const wrapper = mount(ThemeProvider, {
      props: { defaultTheme: "light", disableStorage: true },
      slots: {
        default: () => h(ThemeProvider, null, () => h(Probe)),
      },
    });
    expect(wrapper.text()).toBe("light");
  });
});
