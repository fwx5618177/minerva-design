import { Component, signal } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { afterEach, expect, it, vi } from "vitest";
import { MnConfig, provideMinerva } from "./config";
import { render } from "../testing";
import { renderToString } from "../testing/ssr";

const html = document.documentElement;
const brandStyle = () =>
  document.head.querySelector("style[data-minerva-primary-color]");

afterEach(() => {
  TestBed.resetTestingModule();
  vi.restoreAllMocks();
});

@Component({
  imports: [MnConfig],
  template: `<mn-config [theme]="theme()" primaryColor="#4f46e5"
    ><span>content</span></mn-config
  >`,
})
class RootHost {
  readonly theme = signal<"light" | "dark">("dark");
}

it("keeps the explicit mode and derives the dark brand value at the root", async () => {
  const f = await render(RootHost);
  expect(html).toHaveAttribute("data-theme", "dark");
  expect(html.style.getPropertyValue("--primary-color")).toBe("#7b85f2");
  expect(brandStyle()?.textContent).toContain("--primary-color:#4f46e5");
  expect(brandStyle()?.textContent).toContain("--primary-color:#7b85f2");

  f.componentInstance.theme.set("light");
  await f.whenStable();
  expect(html).toHaveAttribute("data-theme", "light");
  expect(html.style.getPropertyValue("--primary-color")).toBe("#4f46e5");

  f.destroy();
  expect(brandStyle()).toBeNull();
  expect(html.style.getPropertyValue("--primary-color")).not.toBe("#4f46e5");
});

@Component({
  imports: [MnConfig],
  template: `<mn-config theme="light" primaryColor="#4f46e5">
    <mn-config theme="dark" id="inherit"><span>a</span></mn-config>
    <mn-config primaryColor="#0d9488" id="own"><span>b</span></mn-config>
    <mn-config [primaryColor]="null" id="reset"><span>c</span></mn-config>
    <mn-config
      [primaryColor]="{ light: '#4f46e5', dark: '#a5b4fc' }"
      theme="dark"
      id="pair"
      ><span>d</span></mn-config
    >
  </mn-config>`,
})
class NestedHost {}

it("inherits, scopes, resets and accepts a light/dark pair in nested scopes", async () => {
  const f = await render(NestedHost);
  const scope = (id: string) =>
    (f.nativeElement as HTMLElement).querySelector<HTMLElement>(`#${id}`)!;
  const primary = (id: string) =>
    scope(id).style.getPropertyValue("--primary-color");

  // a nested theme override keeps the inherited brand (derived dark value)
  expect(scope("inherit")).toHaveAttribute("data-theme", "dark");
  expect(primary("inherit")).toBe("#7b85f2");
  // an own brand scopes its content only
  expect(scope("own")).toHaveAttribute("data-minerva-theme-scope");
  expect(primary("own")).toBe("#0d9488");
  expect(html.style.getPropertyValue("--primary-color")).toBe("#4f46e5");
  // null: the theme's own primary
  expect(primary("reset")).not.toBe("#4f46e5");
  expect(primary("reset")).not.toBe("");
  // explicit dark value
  expect(primary("pair")).toBe("#a5b4fc");

  f.destroy();
});

@Component({
  imports: [MnConfig],
  template: `<mn-config theme="light" primaryColor="nope"
    ><span>x</span></mn-config
  >`,
})
class InvalidHost {}

it("ignores an invalid brand color with a development warning", async () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  const f = await render(InvalidHost);
  expect(error).toHaveBeenCalledTimes(1);
  expect(String(error.mock.calls[0]?.[0])).toContain("primaryColor");
  expect(html.style.getPropertyValue("--primary-color")).not.toBe("nope");
  expect(brandStyle()).toBeNull();
  f.destroy();
});

@Component({ selector: "brand-app", template: `<span>app</span>` })
class SsrApp {}

it("server-renders the brand style sheet (no flash)", async () => {
  const out = await renderToString(SsrApp, [
    provideMinerva({ theme: "dark", primaryColor: "#4f46e5" }),
  ]);
  expect(out).toContain("data-minerva-primary-color");
  expect(out).toContain("--primary-color:#4f46e5");
  expect(out).toContain("--primary-color:#7b85f2");
});
