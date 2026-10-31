// @vitest-environment node
// src/icon/icons.ts (one component per built-in icon) is up to date.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { icons } from "minerva-design/icons/core";
import {
  ICON_COMPONENTS_OUTPUT,
  generateIconComponents,
  iconComponentNames,
} from "../../scripts/generate-icon-components.mjs";

describe("named icon components", () => {
  it("has one per icon (else: node scripts/generate-icon-components.mjs)", async () => {
    expect(iconComponentNames()).toHaveLength(icons.length);
    expect(readFileSync(ICON_COMPONENTS_OUTPUT, "utf8")).toBe(
      await generateIconComponents(),
    );
  });
});
