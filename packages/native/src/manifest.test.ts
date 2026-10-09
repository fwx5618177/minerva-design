import { describe, expect, it } from "vitest";
import * as Native from "./index";
import { NATIVE_COMPONENTS } from "./manifest";

describe("component manifest", () => {
  it("every listed component and alias is exported", () => {
    const missing = NATIVE_COMPONENTS.flatMap((c) => [
      c.name,
      ...(c.aliases ?? []),
    ]).filter((name) => !(name in Native));
    expect(missing).toEqual([]);
  });

  it("every exported component is listed", () => {
    const listed = new Set(
      NATIVE_COMPONENTS.flatMap((c) => [c.name, ...(c.aliases ?? [])]),
    );
    // PascalCase values: components (hooks, helpers and the toast API are camelCase)
    const components = Object.entries(Native)
      .filter(([name, value]) => /^[A-Z]/.test(name) && value)
      .map(([name]) => name);
    expect(components.filter((name) => !listed.has(name))).toEqual([]);
  });

  it("names are unique", () => {
    const names = NATIVE_COMPONENTS.flatMap((c) => [
      c.name,
      ...(c.aliases ?? []),
    ]);
    expect(new Set(names).size).toBe(names.length);
  });
});
