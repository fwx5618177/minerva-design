import { describe, expect, it } from "vitest";
import { compileScss, declarations } from "./css";

const file = "packages/react/src/components/Input/input.module.scss";
const rules = declarations({ file, css: compileScss(file) });
const autofill = rules.filter((rule) => rule.selector.includes(":autofill"));

describe("Input autofill surface", () => {
  it("gives the frame a surface only for its own autofilled native field", () => {
    const frame = autofill.find(
      (rule) =>
        rule.selector.startsWith(".root:has(> .field:is(") &&
        rule.property === "background-color",
    );
    expect(frame?.value).toBe("var(--_input-autofill-background)");
  });

  it("paints over the UA field background with the same opaque frame color", () => {
    const field = autofill.filter(
      (rule) =>
        rule.selector === ".root > .field:is(:autofill, :-webkit-autofill)",
    );
    expect(field.find((rule) => rule.property === "box-shadow")?.value).toBe(
      "inset 0 0 0 100vmax var(--_input-autofill-background)",
    );
    expect(
      field.find((rule) => rule.property === "-webkit-text-fill-color")?.value,
    ).toBe("var(--text-color)");
    expect(field.find((rule) => rule.property === "caret-color")?.value).toBe(
      "var(--text-color)",
    );
    expect(field.find((rule) => rule.property === "border-radius")?.value).toBe(
      "inherit",
    );
  });

  it("leaves system colors in charge in forced-colors mode", () => {
    expect(autofill.length).toBeGreaterThan(0);
    expect(
      autofill.every((rule) =>
        rule.context.includes("@media (forced-colors: none)"),
      ),
    ).toBe(true);
  });
});

describe("Input frame painting", () => {
  it("places its boundary outside the native field paint", () => {
    expect(
      rules.find(
        (rule) => rule.selector === ".root" && rule.property === "border",
      )?.value,
    ).toBe("1px solid var(--_input-border)");
    expect(
      rules.filter(
        (rule) => rule.selector === ".root" && rule.property === "box-shadow",
      ),
    ).toHaveLength(0);
  });
  it.each([".root:focus-within", ".invalid:focus-within"])(
    "keeps %s border separate from its outer focus ring",
    (selector) => {
      const focused = rules.filter(
        (rule) =>
          rule.selector === selector && !rule.context.includes("forced-colors"),
      );
      expect(
        focused.find((rule) => rule.property === "border-color")?.value,
      ).toBe("var(--_input-border)");
      expect(
        focused.find((rule) => rule.property === "box-shadow")?.value,
      ).not.toContain("inset");
    },
  );
  it("uses a softer theme-derived resting boundary without changing custom overrides", () => {
    expect(
      rules.find(
        (rule) =>
          rule.selector === ".root" && rule.property === "--_input-border",
      )?.value,
    ).toBe(
      "var(--input-border-color, color-mix(in srgb, var(--control-border-color) 85%, var(--surface-color)))",
    );
  });
});
