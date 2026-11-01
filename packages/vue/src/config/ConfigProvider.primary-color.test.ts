// `primaryColor`: a brand color that keeps the explicit light / dark mode
// semantics (data-theme, ThemeToggle) and recomputes the primary tokens.
import { afterEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createSSRApp, defineComponent, h, nextTick } from "vue";
import { renderToString } from "vue/server-renderer";
import { derivePrimaryDark } from "@minerva/core";
import ConfigProvider from "./ConfigProvider.vue";
import ThemeProvider from "./ThemeProvider.vue";
import { useConfig } from "./context";
import { ThemeToggle } from "../components/ThemeToggle";

const html = document.documentElement;
const htmlVar = (name: string) => html.style.getPropertyValue(`--${name}`);

const Show = defineComponent({
  props: { id: { type: String, default: "config" } },
  setup(props) {
    const config = useConfig();
    return () =>
      h(
        "output",
        { "data-testid": props.id },
        [
          config.mode ?? "-",
          config.resolvedMode ?? "-",
          config.primaryColor
            ? `${config.primaryColor.light}/${config.primaryColor.dark}`
            : "none",
        ].join("|"),
      );
  },
});

const scopeOf = (wrapper: ReturnType<typeof mount>, id: string) =>
  wrapper
    .get(`[data-testid="${id}"]`)
    .element.closest<HTMLElement>("[data-minerva-theme-scope]");

afterEach(() => {
  vi.restoreAllMocks();
  html.removeAttribute("style");
  html.removeAttribute("data-theme");
  html.removeAttribute("data-palette");
  document.body.innerHTML = "";
});

describe("ConfigProvider primaryColor (Vue)", () => {
  it("keeps an explicit mode and applies the brand color", async () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: "light", primaryColor: "#4f46e5" },
      slots: { default: () => h(Show) },
      attachTo: document.body,
    });
    await nextTick();
    expect(html).toHaveAttribute("data-theme", "light");
    expect(htmlVar("primary-color")).toBe("#4f46e5");
    expect(htmlVar("primary-color-hover")).toContain("var(--primary-color)");
    expect(wrapper.get("output").text()).toBe("light|light|#4f46e5/#7b85f2");
    const sheet = document.querySelector("style[data-minerva-primary-color]");
    expect(sheet?.textContent).toContain(
      ":root[data-theme=dark]{--primary-color:#7b85f2;",
    );
    await wrapper.setProps({ theme: "dark" });
    expect(html).toHaveAttribute("data-theme", "dark");
    expect(htmlVar("primary-color")).toBe("#7b85f2");
    wrapper.unmount();
    expect(htmlVar("primary-color")).toBe("");
  });

  it("uses a { light, dark } pair and wins over the palette", async () => {
    const wrapper = mount(ConfigProvider, {
      props: {
        theme: "dark",
        palette: "tech",
        primaryColor: { light: "#4f46e5", dark: "#818cf8" },
      },
      attachTo: document.body,
    });
    await nextTick();
    expect(html).toHaveAttribute("data-palette", "tech");
    expect(htmlVar("primary-color")).toBe("#818cf8");
    expect(htmlVar("background-color")).toBe("");
    wrapper.unmount();
  });

  it("ThemeToggle keeps the mode explicit and the brand follows", async () => {
    const wrapper = mount(ThemeProvider, {
      props: {
        defaultTheme: "light",
        primaryColor: "#4f46e5",
        disableStorage: true,
      },
      slots: { default: () => [h(ThemeToggle), h(Show)] },
      attachTo: document.body,
    });
    await wrapper.findAll("button")[1].trigger("click");
    await nextTick();
    expect(html).toHaveAttribute("data-theme", "dark");
    expect(htmlVar("primary-color")).toBe("#7b85f2");
    expect(wrapper.get("output").text()).toBe("dark|dark|#4f46e5/#7b85f2");
    wrapper.unmount();
  });

  it("nested: scopes an override, inherits, and resets with null", async () => {
    const wrapper = mount(ConfigProvider, {
      props: { theme: "dark", primaryColor: "#4f46e5" },
      slots: {
        default: () => [
          h(ConfigProvider, { primaryColor: "#0d9488" }, () =>
            h(Show, { id: "own" }),
          ),
          h(ConfigProvider, { theme: "light" }, () =>
            h(Show, { id: "inherited" }),
          ),
          h(ConfigProvider, { primaryColor: null }, () =>
            h(Show, { id: "reset" }),
          ),
        ],
      },
      attachTo: document.body,
    });
    await nextTick();
    expect(htmlVar("primary-color")).toBe("#7b85f2");
    const own = scopeOf(wrapper, "own")!;
    expect(own).toHaveAttribute("data-theme", "dark");
    expect(own.style.getPropertyValue("--primary-color")).not.toBe("");
    expect(own.style.getPropertyValue("--primary-color")).not.toBe("#7b85f2");
    const inherited = scopeOf(wrapper, "inherited")!;
    expect(inherited.style.getPropertyValue("--primary-color")).toBe("#4f46e5");
    expect(wrapper.get('[data-testid="reset"]').text()).toBe("dark|dark|none");
    expect(
      document.querySelectorAll("style[data-minerva-primary-color]"),
    ).toHaveLength(1);
    const host = [
      ...document.querySelectorAll<HTMLElement>("[data-minerva-portal-host]"),
    ].find((el) => el.style.getPropertyValue("--primary-color") === "#4f46e5");
    expect(host).toBeDefined();
    wrapper.unmount();
  });

  it("ignores an invalid color with a development warning", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const wrapper = mount(ConfigProvider, {
      props: { theme: "light", primaryColor: "vue-not-a-color" },
      slots: { default: () => h(Show) },
      attachTo: document.body,
    });
    await nextTick();
    expect(wrapper.get("output").text()).toBe("light|light|none");
    expect(
      error.mock.calls.filter(([message]) =>
        String(message).includes("vue-not-a-color"),
      ),
    ).toHaveLength(1);
    wrapper.unmount();
  });

  it("renders the brand color style sheet on the server", async () => {
    const markup = await renderToString(
      createSSRApp({
        render: () =>
          h(ConfigProvider, { theme: "dark", primaryColor: "#4f46e5" }, () =>
            h(ConfigProvider, { primaryColor: "#0d9488" }, () => h("p", "x")),
          ),
      }),
    );
    expect(markup).toContain("<style data-minerva-primary-color>");
    expect(markup).toContain(
      ":root:not([data-theme=dark]){--primary-color:#4f46e5;",
    );
    expect(markup).toContain(":root[data-theme=dark]{--primary-color:#7b85f2;");
    expect(markup).not.toContain("&gt;");
    expect(markup).toContain(
      `--primary-color:${derivePrimaryDark("#0d9488")};`,
    );
    expect(markup).toMatch(
      /<div data-minerva-theme-scope[^>]*data-theme="dark"/,
    );
  });
});
