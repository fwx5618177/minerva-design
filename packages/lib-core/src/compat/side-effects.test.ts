import { describe, expect, it } from "vitest";
import i18n from "../config/i18n";

describe("@minerva/lib-core/compat", () => {
  it("is side-effect free: importing it does not change lib-core's locale", async () => {
    const before = i18n.language;
    await import("./index");
    await import("./theme-utils");
    expect(i18n.language).toBe(before);
    expect(before).toBe("en");
  });
});
