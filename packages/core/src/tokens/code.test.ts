import { describe, expect, it } from "vitest";
import { highlightTokenTypes } from "../highlight/types";
import { PALETTES } from "../theme/mode";
import { contrastRatio } from "./brand";
import { generateTokensCss } from "./css";
import { resolveTokens } from "./resolve";

describe("code token colors", () => {
  it("declares a light and a dark color for every token type", () => {
    const css = generateTokensCss({ layer: false });
    const dark = css.slice(css.indexOf("[data-theme=dark] {"));
    for (const type of highlightTokenTypes) {
      expect(css).toContain(`--code-token-${type}-color:`);
      expect(dark).toContain(`--code-token-${type}-color:`);
    }
  });

  it.each(
    [null, ...PALETTES].flatMap((palette) =>
      (["light", "dark"] as const).map(
        (mode) => [palette ?? "default", mode] as const,
      ),
    ),
  )(
    "contrast >= 4.5 on the code block background (%s, %s)",
    (palette, mode) => {
      const tokens = resolveTokens({
        mode,
        palette: palette === "default" ? null : palette,
      });
      // web code blocks use control-color, React Native surface-muted-color
      for (const surface of ["control-color", "surface-muted-color"]) {
        const background = tokens.colors[surface];
        for (const type of highlightTokenTypes) {
          const color = tokens.colors[`code-token-${type}-color`];
          expect(color, type).toBeDefined();
          expect(
            contrastRatio(color, background),
            `${type}: ${color} on ${surface} ${background}`,
          ).toBeGreaterThanOrEqual(4.5);
        }
      }
    },
  );
});
