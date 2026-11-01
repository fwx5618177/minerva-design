import simulate from "miniprogram-simulate";
import { derivePrimaryDark } from "@minerva/core";
import { afterEach, expect, it, vi } from "vitest";
import { configProvider, themeProvider } from "./index";

const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => {
  mounted.splice(0).forEach((w) => w.detach());
  vi.restoreAllMocks();
});
const tick = () => simulate.sleep(0);
function load(c: typeof configProvider, tagName: string) {
  return simulate.load({ tagName, template: c.template, ...c.definition });
}
async function render(template: string, data: Record<string, unknown> = {}) {
  const host = simulate.load({
    tagName: "brand-host",
    usingComponents: {
      "mn-provider": load(configProvider, "brand-config"),
      "mn-theme": load(themeProvider, "brand-theme"),
    },
    template,
    data,
  });
  const w = simulate.render(host);
  w.attach(document.createElement("div"));
  mounted.push(w);
  await tick();
  return w;
}
const primary = (style: string) =>
  /(?:^|;)--primary-color:([^;]+)/.exec(style)?.[1];

it("keeps the explicit mode and derives the dark brand value", async () => {
  const w = await render(
    '<mn-provider id="root" mode="{{mode}}" primary-color="#4f46e5"/>',
    { mode: "dark" },
  );
  const root = w.querySelector("#root")!;
  expect(root.data.resolvedMode).toBe("dark");
  expect(root.data.themeClass).toContain("dark");
  expect(primary(root.data.themeStyle)).toBe("#7b85f2");
  expect(root.data.themeStyle).toContain("--primary-color-hover:");
  expect(root.instance.getConfig().primaryColor).toEqual({
    light: "#4f46e5",
    dark: "#7b85f2",
  });
  w.setData({ mode: "light" });
  await tick();
  expect(primary(root.data.themeStyle)).toBe("#4f46e5");
});

it("wins over the palette and a custom theme's primary", async () => {
  const w = await render(
    '<mn-provider id="root" mode="light" palette="tech" theme="{{theme}}" primary-color="#4f46e5"/>',
    { theme: { "primary-color": "#ff0000" } },
  );
  expect(primary(w.querySelector("#root")!.data.themeStyle)).toBe("#4f46e5");
});

it("inherits, scopes, resets and accepts a light/dark pair in nested providers", async () => {
  const w = await render(
    `<mn-provider mode="light" primary-color="#4f46e5">
      <mn-provider id="inherit" mode="dark"/>
      <mn-provider id="own" mode="dark" primary-color="#0d9488"/>
      <mn-provider id="reset" primary-color="{{null}}"/>
      <mn-provider id="pair" mode="dark" primary-color="{{pair}}"/>
    </mn-provider>`,
    { pair: { light: "#4f46e5", dark: "#a5b4fc" } },
  );
  const style = (id: string) =>
    primary(w.querySelector(`#${id}`)!.data.themeStyle);
  expect(style("inherit")).toBe("#7b85f2");
  expect(style("own")).toBe(derivePrimaryDark("#0d9488"));
  expect(style("reset")).toBeDefined();
  expect(style("reset")).not.toBe("#4f46e5");
  expect(style("pair")).toBe("#a5b4fc");
});

it("ignores an invalid brand color with a development warning", async () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  const w = await render(
    '<mn-provider id="root" mode="light" primary-color="not-a-colour"/>',
  );
  expect(error).toHaveBeenCalled();
  expect(String(error.mock.calls[0]?.[0])).toContain("primaryColor");
  expect(w.querySelector("#root")!.data.themeStyle).toBe("");
});

it("ThemeProvider accepts the brand color", async () => {
  const w = await render(
    '<mn-theme id="root" mode="dark" disable-storage primary-color="#4f46e5"/>',
  );
  expect(primary(w.querySelector("#root")!.data.themeStyle)).toBe("#7b85f2");
});
