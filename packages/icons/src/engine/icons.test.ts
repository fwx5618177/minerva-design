import { describe, expect, it } from "vitest";
import * as core from "../core";
import * as react from "../index";
import { flattenIconPath, parseIconPath } from "./path";
import { getIcon, iconCategories, icons, searchIcons } from "./registry";

const pascal = (name: string) =>
  name.replace(/(^|-)([a-z0-9])/g, (_, __, c: string) => c.toUpperCase());
const camel = (name: string) =>
  name.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());

describe("built-in icons", () => {
  it("has a large set with unique kebab-case names", () => {
    expect(icons.length).toBeGreaterThanOrEqual(200);
    const names = icons.map((icon) => icon.name);
    expect(new Set(names).size).toBe(names.length);
    for (const name of names) expect(name).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("files every icon in a known category, with search tags", () => {
    for (const icon of icons) {
      expect(iconCategories).toContain(icon.category);
      expect(icon.tags?.length ?? 0).toBeGreaterThan(0);
      expect(icon.paths.length).toBeGreaterThan(0);
    }
    // every category has icons
    for (const category of iconCategories) {
      expect(icons.some((icon) => icon.category === category)).toBe(true);
    }
  });

  it("has valid path data that stays inside the 24×24 grid", () => {
    const outside: string[] = [];
    for (const icon of icons) {
      for (const d of icon.paths) {
        expect(() => parseIconPath(d)).not.toThrow();
        for (const line of flattenIconPath(d, 0.01)) {
          for (let i = 0; i < line.points.length; i++) {
            const v = line.points[i]!;
            // the 2px stroke must not be clipped by the viewBox
            if (v < 0.99 || v > 23.01) outside.push(`${icon.name}: ${v}`);
          }
        }
      }
    }
    expect(outside).toEqual([]);
  });

  it("exports each icon as a constant named after it", () => {
    const exported = core as unknown as Record<string, unknown>;
    for (const icon of icons) {
      expect(exported[`${camel(icon.name)}Icon`]).toBe(icon);
    }
    const constants = Object.entries(core).filter(
      ([key, value]) => /^[a-z]\w*Icon$/.test(key) && typeof value === "object",
    );
    expect(constants.length).toBe(icons.length);
  });

  it("has a React component per icon (src/react/icons.ts is up to date: pnpm gen)", () => {
    const exported = react as unknown as Record<
      string,
      { displayName?: string }
    >;
    const missing = icons
      .map((icon) => `${pascal(icon.name)}Icon`)
      .filter((name) => typeof exported[name] !== "function");
    expect(missing).toEqual([]);
    expect(exported.ArrowUpIcon?.displayName).toBe("ArrowUpIcon");
  });

  it("finds icons by name, tag and category", () => {
    expect(getIcon("arrow-up")?.name).toBe("arrow-up");
    expect(getIcon("nope")).toBeUndefined();
    expect(searchIcons("").length).toBe(icons.length);
    expect(searchIcons("arrow up").map((icon) => icon.name)).toContain(
      "arrow-up",
    );
    expect(searchIcons("trash").map((icon) => icon.name)).toContain("trash");
    const devices = searchIcons("devices");
    expect(devices.length).toBeGreaterThan(5);
    expect(searchIcons("zzzz")).toEqual([]);
  });
});
