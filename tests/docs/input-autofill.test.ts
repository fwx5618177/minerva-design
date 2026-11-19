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
