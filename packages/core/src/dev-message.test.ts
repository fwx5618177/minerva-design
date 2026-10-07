import { describe, expect, it } from "vitest";
import { DEV_MESSAGE_PREFIX, formatDevMessage } from "./dev-message";

describe("formatDevMessage", () => {
  it("formats `[minerva] <subject>: <message>`", () => {
    expect(DEV_MESSAGE_PREFIX).toBe("[minerva]");
    expect(formatDevMessage("Tabs", "bad value.")).toBe(
      "[minerva] Tabs: bad value.",
    );
    expect(formatDevMessage("<minerva-tabs>", "bad value.")).toBe(
      "[minerva] <minerva-tabs>: bad value.",
    );
  });
});
