import simulate from "miniprogram-simulate";
import { afterEach, expect, it, vi } from "vitest";
import { configProvider, themeProvider, themeToggle, table } from "./index";
const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => {
  mounted.splice(0).forEach((w) => w.detach());
  vi.unstubAllGlobals();
});
const tick = () => simulate.sleep(0);
function load(c: typeof configProvider) {
  return simulate.load({
    tagName: "theme-case",
    template: c.template,
    ...c.definition,
  });
}
it("native provider relation propagates locale and theme to actual descendants and preserves nested overrides", async () => {
  const p = load(configProvider),
    t = load(themeToggle);
  const host = simulate.load({
    tagName: "theme-host",
    usingComponents: { "mn-provider": p, "mn-toggle": t },
    template:
      '<mn-provider id="outer" mode="{{mode}}" palette="tech" locale="{{locale}}"><mn-toggle id="outerToggle"/><mn-provider id="inner" design="{{design}}"><mn-toggle id="innerToggle"/></mn-provider></mn-provider>',
    data: {
      mode: "dark",
      locale: { language: "zh" },
      design: { density: "compact" },
    },
  });
  const w = simulate.render(host);
  w.attach(document.createElement("div"));
  mounted.push(w);
  await tick();
  const outer = w.querySelector("#outer")!,
    inner = w.querySelector("#inner")!,
    toggle = w.querySelector("#innerToggle")!;
  expect({
    outer: outer.instance.getConfig(),
    inner: inner.instance.getConfig(),
  }).toMatchObject({ outer: { mode: "dark" }, inner: { mode: "dark" } });
  expect(inner.data.resolvedMode).toBe("dark");
  expect(inner.data.themeClass).toContain("mn-palette-tech-dark");
  expect(toggle.dom!.textContent).toContain("跟随");
  expect(toggle.data.activeTheme).toBe("dark");
  w.setData({ mode: "light", locale: { language: "fr" } });
  await tick();
  expect(inner.data.resolvedMode).toBe("light");
  expect(toggle.dom!.textContent).toContain("Système");
  expect(inner.instance.translate("table.empty")).toBe("Aucune donnée");
  inner.setData({ palette: null, locale: { language: "en" } });
  expect(inner.data.themeClass).not.toContain("mn-palette-tech");
  expect(toggle.dom!.textContent).toContain("System");
  expect(outer.instance.getConfig().locale.language).toBe("fr");
});
it("ThemeToggle selects system/custom themes through provider and respects controlled refusal", async () => {
  const p = load(themeProvider),
    t = load(themeToggle);
  const host = simulate.load({
    tagName: "theme-host",
    usingComponents: { "mn-provider": p, "mn-toggle": t },
    template:
      '<mn-provider id="provider" disable-storage default-theme="light"><mn-toggle id="toggle" custom-themes="{{themes}}"/></mn-provider>',
    data: { themes: [{ value: "github-dark", label: "GitHub" }] },
  });
  const w = simulate.render(host);
  w.attach(document.createElement("div"));
  mounted.push(w);
  await tick();
  const provider = w.querySelector("#provider")!,
    toggle = w.querySelector("#toggle")!;
  toggle.querySelectorAll(".mn-theme-choice")[2].dispatchEvent("tap");
  await tick();
  expect(provider.instance.getConfig().mode).toBe("system");
  toggle.querySelectorAll(".mn-theme-choice")[3].dispatchEvent("tap");
  await tick();
  expect(provider.data.themeStyle).toContain("--background-color:");
  expect(provider.instance.getConfig().theme).toBe("github-dark");
  provider.setData({ mode: "light", theme: "light" });
  toggle.querySelectorAll(".mn-theme-choice")[1].dispatchEvent("tap");
  await tick();
  expect(provider.instance.getConfig().resolvedMode).toBe("light");
});
it("ConfigProvider localizes Table built-in text and translator updates with custom messages", async () => {
  const p = load(configProvider),
    t = load(table);
  const host = simulate.load({
    tagName: "locale-host",
    usingComponents: { "mn-provider": p, "mn-table": t },
    template:
      '<mn-provider id="provider" locale="{{locale}}"><mn-table id="table"/></mn-provider>',
    data: { locale: { language: "zh" } },
  });
  const w = simulate.render(host);
  w.attach(document.createElement("div"));
  mounted.push(w);
  await tick();
  expect(w.querySelector("#table")!.dom!.textContent).toContain("暂无数据");
  const provider = w.querySelector("#provider")!;
  provider.instance.configure({
    messages: { zh: { table: { empty: "没有记录" } } },
  });
  await tick();
  expect(w.querySelector("#table")!.dom!.textContent).toContain("没有记录");
});

it("system theme prefers getAppBaseInfo without invoking deprecated system info", async () => {
  const legacy = vi.fn(() => ({ theme: "light" }));
  const modern = vi.fn(() => ({ theme: "dark" }));
  vi.stubGlobal("wx", {
    ...wx,
    getAppBaseInfo: modern,
    getSystemInfoSync: legacy,
  });
  const w = simulate.render(load(themeProvider), {
    defaultTheme: "system",
    disableStorage: true,
  });
  w.attach(document.createElement("div"));
  mounted.push(w);
  await tick();
  expect(w.data.resolvedMode).toBe("dark");
  expect(modern).toHaveBeenCalled();
  expect(legacy).not.toHaveBeenCalled();
});
