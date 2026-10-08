// E2E: theme / palette / design switching (incl. nested scopes) and i18n in a
// plain-HTML mini app built from Minerva elements.
//
// happy-dom does not inherit CSS custom properties, so token VALUES cannot be
// read here (the docs-site browser check covers them). Instead the tests
// assert what makes them resolve in browsers: the token rules of
// @minerva/core's tokens.css (same file as @minerva/lib-web-components/tokens.css)
// match the scope element that is the closest composed ancestor of each
// element, its shadow internals and its top-layer overlays.
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { compile } from "sass";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import "../../src/index";
import type {
  MinervaConfig,
  MinervaInput,
  MinervaModal,
} from "../../src/index";
import { closestComposed } from "../../src/internal/dom";
import { $, settle, wait } from "../utils";

const tokens = compile(
  join(
    dirname(fileURLToPath(import.meta.url)),
    "../../../core/src/theme/tokens.scss",
  ),
).css;

/** Selectors of the token rules (e.g. `[data-palette="tech"][data-theme="dark"]`) */
const tokenSelectors = [...tokens.matchAll(/^([^@\s{}][^{}]*)\{/gm)]
  .flatMap(([, selector]) => selector.split(","))
  .map((selector) => selector.trim())
  .filter((selector) => selector.startsWith("["));

/** Sass drops the quotes of attribute selectors: compare without them */
const unquote = (selector: string) => selector.replace(/"/g, "");

/** Token rules that apply to `el` through its closest themed scope */
const scopeRules = (el: Element) => {
  const scope = closestComposed(el, "[data-minerva-theme-scope], :root");
  return scope
    ? tokenSelectors.filter((s) => scope.matches(s)).map(unquote)
    : [];
};

const app = () => `
  <minerva-config id="root" theme="light">
    <minerva-button id="outer-btn">Outer</minerva-button>
    <minerva-config id="nested" theme="dark" palette="tech" locale="fr">
      <minerva-input id="nested-input" clearable value="x" aria-label="Nested"></minerva-input>
      <minerva-modal id="dialog" label="Réglages"><button id="inside">ok</button></minerva-modal>
    </minerva-config>
  </minerva-config>`;

describe("theming and i18n (e2e)", () => {
  it("nested scopes carry their own token rules; the outer scope is untouched", async () => {
    document.body.innerHTML = app();
    await settle();
    const outerBtn = document.getElementById("outer-btn")!;
    const nestedInput = document.getElementById("nested-input")!;
    expect(scopeRules(outerBtn)).toContain("[data-minerva-theme-scope]");
    expect(scopeRules(outerBtn)).not.toContain(
      "[data-palette=tech][data-theme=dark]",
    );
    expect(scopeRules(nestedInput)).toContain(
      "[data-palette=tech][data-theme=dark]",
    );
    // shadow internals resolve through the same scope
    expect(scopeRules($(nestedInput, ".root"))).toEqual(
      scopeRules(nestedInput),
    );
  });

  it("switching theme / palette at runtime switches the matching rules", async () => {
    document.body.innerHTML = app();
    await settle();
    const nested = document.getElementById("nested") as MinervaConfig;
    const input = document.getElementById("nested-input")!;
    nested.theme = "light";
    await settle();
    expect(scopeRules(input)).toContain(
      "[data-palette=tech]:not([data-theme=dark])",
    );
    nested.palette = "graphite";
    await settle();
    expect(scopeRules(input)).toContain(
      "[data-palette=graphite]:not([data-theme=dark])",
    );
    nested.removeAttribute("palette");
    nested.theme = "dark";
    await settle();
    expect(scopeRules(input)).toContain(
      "[data-theme=dark]:not([data-palette])",
    );
  });

  it("design presets and axes apply to the scope", async () => {
    document.body.innerHTML = `<minerva-config id="c"><minerva-button id="b">x</minerva-button></minerva-config>`;
    await settle();
    const config = document.getElementById("c") as MinervaConfig;
    const button = document.getElementById("b")!;
    config.density = "compact";
    await settle();
    expect(scopeRules(button)).toContain(
      "[data-density=compact][data-density]",
    );
    config.design = "editorial";
    config.density = undefined;
    await settle();
    expect(scopeRules(button)).toContain(
      "[data-palette=editorial]:not([data-theme=dark])",
    );
  });

  it("overlays opened in a nested scope stay in it (theme and language)", async () => {
    document.body.innerHTML = app();
    await settle();
    const dialog = document.getElementById("dialog") as MinervaModal;
    dialog.open = true;
    await settle();
    const panel = $(dialog, "[part=content]");
    expect(scopeRules(panel)).toEqual(
      scopeRules(document.getElementById("nested-input")!),
    );
    expect($(dialog, "[part=close-button]").getAttribute("aria-label")).toBe(
      "Fermer",
    );
    await userEvent.keyboard("{Escape}");
    await settle();
    await wait(5);
    expect(dialog.open).toBe(false);
  });

  it("built-in texts follow lang / locale changes at runtime", async () => {
    document.body.innerHTML = app();
    await settle();
    const input = document.getElementById("nested-input") as MinervaInput;
    expect($(input, "[part=clear-button]").getAttribute("aria-label")).toBe(
      "Effacer",
    );
    document.getElementById("nested")!.setAttribute("locale", "zh");
    await settle();
    expect($(input, "[part=clear-button]").getAttribute("aria-label")).toBe(
      "清除",
    );
    document.getElementById("nested")!.removeAttribute("locale");
    document.documentElement.lang = "ja";
    await settle();
    expect($(input, "[part=clear-button]").getAttribute("aria-label")).toBe(
      "クリア",
    );
  });
});
