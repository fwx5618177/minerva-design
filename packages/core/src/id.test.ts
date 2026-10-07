import { describe, expect, it } from "vitest";
import { createId } from "./id";

describe("createId", () => {
  it("returns unique, monotonically increasing ids", () => {
    const a = createId();
    const b = createId();
    const n = (id: string) => Number(id.split("-").pop());
    expect(a).toMatch(/^minerva-\d+$/);
    expect(a).not.toBe(b);
    expect(n(b)).toBe(n(a) + 1);
  });

  it("uses the given prefix", () => {
    expect(createId("menu")).toMatch(/^menu-\d+$/);
  });
});
