import { describe, expect, it } from "vitest";
import { compileScss, declarations } from "./css";

describe("documentation preview theme boundaries", () => {
  it("limits document theme mappings to the framework navigation", () => {
    const file = "apps/docs/src/docs/components/docs.module.scss";
    const mappings = declarations({ file, css: compileScss(file) }).filter(
      (declaration) =>
        [
          "--surface-color",
          "--surface-muted-color",
          "--text-color",
          "--text-secondary-color",
        ].includes(declaration.property),
    );
    expect(mappings.length).toBeGreaterThan(0);
    expect(
      mappings.every(({ selector }) => selector.includes(".frameworkBar")),
    ).toBe(true);
  });
});
