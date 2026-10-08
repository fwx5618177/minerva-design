// color / variant -> design tokens: every value of the contract's `color`
// and `variant` enums renders a styling class whose rules resolve to CSS
// custom properties defined by the design tokens (@minerva/core tokens.css)
// or by the component's own stylesheet; semantic colors use their
// `--<color>-color` token family.
import { afterEach, describe, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { REPO_ROOT, contractOf } from "../harness/contracts";
import { contractTest } from "../harness/suite";
import { h, type Driver, type Handle } from "../harness/types";

let tokenNames: Set<string> | undefined;
/** Custom properties declared by the design tokens */
function tokens(): Set<string> {
  tokenNames ??= declared(
    readFileSync(join(REPO_ROOT, "packages/core/src/theme/tokens.css"), "utf8"),
  );
  return tokenNames;
}

const declared = (css: string) =>
  new Set(Array.from(css.matchAll(/(--[\w-]+)\s*:/g), (m) => m[1]));

/**
 * `var(--x)` references of the rules whose selector has `.className`;
 * `optional`: references with a fallback (`var(--override, var(--token))`),
 * public override hooks that need no definition
 */
function referencedBy(css: string, className: string) {
  const escaped = className.replace(/[-]/g, "\\-");
  const refs: string[] = [];
  const optional = new Set<string>();
  for (const [, selector, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!new RegExp(`\\.${escaped}(?![\\w-])`).test(selector)) continue;
    for (const [, name, fallback] of body.matchAll(
      /var\(\s*(--[\w-]+)\s*(,)?/g,
    )) {
      refs.push(name);
      if (fallback) optional.add(name);
    }
  }
  return Object.assign(refs, { optional });
}

export function tokenSuite(driver: Driver) {
  const SUITE = "Button color / variant tokens";
  const contract = contractOf("Button");
  const enumOf = (name: string) =>
    contract.props.find((p) => p.name === name)?.values ?? [];
  let handle: Handle | undefined;
  afterEach(() => handle?.unmount());

  describe(SUITE, () => {
    contractTest(
      driver,
      SUITE,
      "every color maps to its token family",
      async () => {
        const css = driver.stylesheet("Button");
        const local = declared(css);
        expect(enumOf("color").length).toBeGreaterThan(3);
        for (const color of enumOf("color")) {
          handle = await driver.render(h("Button", { color }, color));
          const classes = driver.classes(
            driver.getByRole("button", { name: color }),
          );
          expect(classes, color).toContain(color);
          const refs = referencedBy(css, color);
          expect(refs.length, color).toBeGreaterThan(0);
          // semantic colors use their token family (`--danger-color*`);
          // others (neutral) at least one design token
          const family = `--${color}-color`;
          const hasFamily = [...tokens()].some((t) => t.startsWith(family));
          expect(
            refs.some(
              (r) => tokens().has(r) && (!hasFamily || r.startsWith(family)),
            ),
            `${color}: no ${hasFamily ? family : "design"} token`,
          ).toBe(true);
          for (const ref of refs)
            expect(
              tokens().has(ref) || local.has(ref) || refs.optional.has(ref),
              `${color}: ${ref}`,
            ).toBe(true);
          await handle.unmount();
          handle = undefined;
        }
      },
    );

    contractTest(
      driver,
      SUITE,
      "every variant resolves to defined custom properties",
      async () => {
        const css = driver.stylesheet("Button");
        const local = declared(css);
        expect(enumOf("variant").length).toBeGreaterThan(2);
        for (const variant of enumOf("variant")) {
          handle = await driver.render(h("Button", { variant }, variant));
          const button = driver.getByRole("button", { name: variant });
          const variantClass = driver
            .classes(button)
            .find((c) => c === `variant-${variant}`);
          expect(variantClass, variant).toBeDefined();
          const refs = referencedBy(css, variantClass!);
          expect(refs.length, variant).toBeGreaterThan(0);
          for (const ref of refs)
            expect(
              tokens().has(ref) || local.has(ref) || refs.optional.has(ref),
              `${variant}: ${ref}`,
            ).toBe(true);
          await handle.unmount();
          handle = undefined;
        }
      },
    );
  });
}
