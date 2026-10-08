// Committed generated files: src/theme/tokens.css is the unlayered stylesheet
// behind `@minerva/core/tokens.css` (bundled by @minerva/react, read by the
// test suites). It cannot drift from the token data: regenerate it with
// `pnpm --filter @minerva/core tokens:generate`.
import { describe, expect, it } from "vitest";
import { generateTokensCss } from "./css";

describe("generated files", () => {
  it("src/theme/tokens.css equals generateTokensCss({ layer: false })", async () => {
    await expect(generateTokensCss({ layer: false })).toMatchFileSnapshot(
      "../theme/tokens.css",
    );
  });
});
