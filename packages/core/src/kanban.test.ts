import { describe, expect, it } from "vitest";
import {
  kanbanAccent,
  kanbanAccentValue,
  kanbanCount,
  kanbanLength,
} from "./kanban";

describe("kanban", () => {
  it("splits theme colors from custom CSS colors", () => {
    expect(kanbanAccent("success")).toEqual({ scheme: "success" });
    expect(kanbanAccent(" #7c3aed ")).toEqual({ custom: "#7c3aed" });
    expect(kanbanAccent("")).toEqual({});
    expect(kanbanAccent(undefined)).toEqual({});
    expect(kanbanAccentValue("danger")).toBe("var(--danger-color)");
    expect(kanbanAccentValue("neutral")).toBe("var(--text-muted-color)");
    expect(kanbanAccentValue("rgb(1, 2, 3)")).toBe("rgb(1, 2, 3)");
    expect(kanbanAccentValue(null)).toBe("");
  });

  it("keeps valid counts only", () => {
    expect(kanbanCount(3)).toBe(3);
    expect(kanbanCount(0)).toBe(0);
    expect(kanbanCount(2.7)).toBe(2);
    expect(kanbanCount("4")).toBe(4);
    expect(kanbanCount(-1)).toBeUndefined();
    expect(kanbanCount(Number.NaN)).toBeUndefined();
    expect(kanbanCount(undefined)).toBeUndefined();
    expect(kanbanCount("")).toBeUndefined();
  });

  it("resolves lengths", () => {
    expect(kanbanLength(280)).toBe("280px");
    expect(kanbanLength("18rem")).toBe("18rem");
    expect(kanbanLength("240")).toBe("240px");
    expect(kanbanLength("")).toBeUndefined();
    expect(kanbanLength(undefined)).toBeUndefined();
    expect(kanbanLength(Number.POSITIVE_INFINITY)).toBeUndefined();
  });
});
