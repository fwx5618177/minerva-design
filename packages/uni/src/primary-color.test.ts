import { mount } from "@vue/test-utils";
import { derivePrimaryDark } from "@minerva/core";
import { h } from "vue";
import { afterEach, expect, it, vi } from "vitest";
import ConfigProvider from "./ConfigProvider.vue";
import ThemeProvider from "./ThemeProvider.vue";

afterEach(() => vi.restoreAllMocks());

const primary = (el: Element) =>
  (el as HTMLElement).style.getPropertyValue("--primary-color");
const providers = (w: ReturnType<typeof mount>) =>
  w.findAll(".mn-provider").map((n) => n.element);

it("keeps the explicit mode and derives the dark brand value", async () => {
  const w = mount(ConfigProvider, {
    props: { mode: "dark", primaryColor: "#4f46e5" },
  });
  expect(w.classes()).toContain("mn-theme-dark");
  expect(primary(w.element)).toBe("#7b85f2");
  expect(
    (w.element as HTMLElement).style.getPropertyValue("--primary-color-hover"),
  ).not.toBe("");
  await w.setProps({ mode: "light" });
  expect(primary(w.element)).toBe("#4f46e5");
});

it("wins over the palette and a custom theme's primary", () => {
  const w = mount(ConfigProvider, {
    props: {
      mode: "light",
      palette: "editorial",
      theme: { "primary-color": "#ff0000" },
      primaryColor: "#4f46e5",
    },
  });
  expect(primary(w.element)).toBe("#4f46e5");
});

it("inherits, scopes, resets and accepts a light/dark pair in nested providers", () => {
  const w = mount(ConfigProvider, {
    props: { mode: "light", primaryColor: "#4f46e5" },
    slots: {
      default: () => [
        h(ConfigProvider, { mode: "dark" }),
        h(ConfigProvider, { primaryColor: "#0d9488", mode: "dark" }),
        h(ConfigProvider, { primaryColor: null }),
        h(ConfigProvider, {
          mode: "dark",
          primaryColor: { light: "#4f46e5", dark: "#a5b4fc" },
        }),
      ],
    },
  });
  const [root, inherit, own, reset, pair] = providers(w);
  expect(primary(root!)).toBe("#4f46e5");
  expect(primary(inherit!)).toBe("#7b85f2");
  expect(primary(own!)).toBe(derivePrimaryDark("#0d9488"));
  expect(primary(reset!)).not.toBe("#4f46e5");
  expect(primary(reset!)).not.toBe("");
  expect(primary(pair!)).toBe("#a5b4fc");
});

it("ignores an invalid brand color with a development warning", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  const w = mount(ConfigProvider, {
    props: { mode: "light", primaryColor: "not-a-colour" },
  });
  expect(error).toHaveBeenCalledTimes(1);
  expect(String(error.mock.calls[0]?.[0])).toContain("primaryColor");
  expect(primary(w.element)).toBe("");
});

it("ThemeProvider passes the brand color through", () => {
  const w = mount(ThemeProvider, {
    props: { disableStorage: true, mode: "dark", primaryColor: "#4f46e5" },
  });
  expect(primary(w.find(".mn-provider").element)).toBe("#7b85f2");
});
