import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";
import { generateMiniTokensCss } from "../../packages/core/src/tokens/mini";

const styleDirectory = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../tools/styles",
);
function miniStyles() {
  const external = readdirSync(styleDirectory)
    .filter((name) => name.endsWith(".css"))
    .map((name) => ({
      name,
      css: readFileSync(join(styleDirectory, name), "utf8"),
    }));
  const uni = join(styleDirectory, "../../packages/uni/src");
  const scoped = readdirSync(uni)
    .filter((name) => name.endsWith(".vue"))
    .flatMap((name) =>
      [
        ...readFileSync(join(uni, name), "utf8").matchAll(
          /<style\b[^>]*>([\s\S]*?)<\/style>/g,
        ),
      ].map((match) => ({ name: `uni/${name}`, css: match[1] })),
    );
  return [...external, ...scoped];
}

// A misspelled token silently falls back to a fixed light-mode color, so a
// component can look correct initially and break when its theme changes.
it("mini styles reference existing tokens or documented component overrides", () => {
  const dir = styleDirectory;
  const tokens = generateMiniTokensCss();
  const shared = readFileSync(join(dir, "mini-controls.css"), "utf8");
  const react = join(dir, "../../packages/react/src/components");
  // Public overrides intentionally have no local declaration so ancestors can
  // supply them. Require an actual @css-var declaration and a CSS fallback.
  const overrides = new Set(
    readdirSync(react, { recursive: true })
      .filter((file) => String(file).endsWith(".scss"))
      .flatMap((file) =>
        [
          ...readFileSync(join(react, String(file)), "utf8").matchAll(
            /@css-var\s+(--[\w-]+)/g,
          ),
        ].map((match) => match[1]),
      ),
  );

  // Mini renderers also declare dynamic tokens in their actual style objects.
  const inlineDeclarations = new Set(
    ["taro", "uni", "weapp"].flatMap((platform) => {
      const source = join(dir, "../../packages", platform, "src");
      return readdirSync(source, { recursive: true })
        .map(String)
        .filter(
          (file) => /\.(?:tsx?|vue)$/.test(file) && !file.includes(".test."),
        )
        .flatMap((file) =>
          [
            ...readFileSync(join(source, file), "utf8").matchAll(
              /["'](--[\w-]+)["']\s*:/g,
            ),
          ].map((match) => match[1]),
        );
    }),
  );

  const errors: string[] = [];
  for (const { name, css } of miniStyles()) {
    const declarations = new Set(
      [...`${tokens}\n${shared}\n${css}`.matchAll(/(--[\w-]+)\s*:/g)].map(
        (match) => match[1],
      ),
    );
    for (const [, variable] of css.matchAll(/var\(\s*(--[\w-]+)/g)) {
      const publicOverride =
        overrides.has(variable) &&
        new RegExp(`var\\(\\s*${variable}\\s*,`).test(css);
      if (
        !declarations.has(variable) &&
        !inlineDeclarations.has(variable) &&
        !publicOverride
      )
        errors.push(`${name}: ${variable}`);
    }
  }
  expect([...new Set(errors)]).toEqual([]);
});

it("every mini stylesheet uses class selectors for component state", () => {
  const css = miniStyles()
    .map((style) => style.css)
    .join("\n");
  const selectors = [
    ...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{/g),
  ].map((match) => match[1]);
  expect(
    selectors.filter((selector) => /\[[^\]]+\]|\*/.test(selector)),
  ).toEqual([]);
});
