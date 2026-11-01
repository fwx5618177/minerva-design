import { describe, expect, it } from "vitest";

import { PALETTES } from "./mode";
import { paletteAccents } from "./palette-accents";
import { palettes } from "./palettes";

describe("paletteAccents", () => {
  it("matches the primary / accent colors of every palette and mode", () => {
    expect(Object.keys(paletteAccents).sort()).toEqual([...PALETTES].sort());
    for (const name of PALETTES) {
      for (const mode of ["light", "dark"] as const) {
        const tokens = palettes[name][mode] as Record<string, unknown>;
        expect(paletteAccents[name][mode]).toEqual({
          "primary-color": tokens["primary-color"],
          "accent-color": tokens["accent-color"],
        });
      }
    }
  });
});
