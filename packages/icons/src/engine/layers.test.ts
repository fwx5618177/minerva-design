import { describe, expect, it } from "vitest";
import { defineIcon } from "./define";
import { iconLayers } from "./layers";
import { frameItems } from "./icon-canvas";
import { icons } from "./registry";
import { toSvg } from "./svg";

const plain = defineIcon({
  name: "plain-test",
  paths: ["M4 4h16", "M4 12h16"],
});

describe("colored paths", () => {
  it("validates that colors match the paths", () => {
    expect(() =>
      defineIcon({
        name: "bad-colors",
        paths: ["M4 4h16", "M4 12h16"],
        colors: [undefined],
      }),
    ).toThrow(/1 colors for 2 paths/);
  });

  it("keeps the colors frozen with the icon", () => {
    const icon = defineIcon({
      name: "red-line",
      paths: ["M4 4h16"],
      colors: ["red"],
    });
    expect(icon.colors).toEqual(["red"]);
    expect(Object.isFrozen(icon.colors)).toBe(true);
  });

  it("is a single layer when no path has a color", () => {
    expect(iconLayers(plain)).toEqual([{ icon: plain, color: undefined }]);
    const uncolored = defineIcon({
      name: "uncolored-test",
      paths: ["M4 4h16"],
      colors: [undefined],
    });
    expect(iconLayers(uncolored)[0]?.icon).toBe(uncolored);
  });

  it("groups consecutive paths of one color into one layer", () => {
    const icon = defineIcon({
      name: "layered-test",
      paths: ["M1 1h2", "M3 3h2", "M5 5h2", "M7 7h2"],
      colors: ["red", "red", undefined, "blue"],
    });
    const layers = iconLayers(icon);
    expect(layers.map((layer) => layer.color)).toEqual([
      "red",
      undefined,
      "blue",
    ]);
    expect(layers.map((layer) => layer.icon.paths)).toEqual([
      ["M1 1h2", "M3 3h2"],
      ["M5 5h2"],
      ["M7 7h2"],
    ]);
  });

  it("treats currentColor as the drawing color", () => {
    const icon = defineIcon({
      name: "current-test",
      paths: ["M4 4h16"],
      colors: ["currentColor"],
    });
    expect(iconLayers(icon)[0]?.color).toBeUndefined();
  });

  it("writes a stroke attribute on each colored path of an SVG", () => {
    const icon = defineIcon({
      name: "svg-colors-test",
      paths: ["M4 4h16", "M4 12h16"],
      colors: [undefined, "#3e63dd"],
    });
    const svg = toSvg(icon);
    expect(svg).toContain('<path d="M4 4h16"/>');
    expect(svg).toContain('<path d="M4 12h16" stroke="#3e63dd"/>');
    expect(toSvg(plain)).not.toMatch(/<path [^>]*stroke=/);
  });

  it("draws a colored icon as one frame item per color layer", () => {
    const icon = defineIcon({
      name: "frame-test",
      paths: ["M4 4h16", "M4 12h16"],
      colors: ["#ff0000", undefined],
    });
    const items = frameItems(
      [{ icon, x: 1, y: 2, color: "#00ff00", opacity: 0.5 }],
      document.createElement("div"),
    );
    expect(items).toHaveLength(2);
    expect(items[0]?.icon.paths).toEqual(["M4 4h16"]);
    expect(items[0]?.color).toEqual([1, 0, 0, 0.5]);
    expect(items[1]?.color).toEqual([0, 1, 0, 0.5]);
    expect(items[1]?.x).toBe(1);
  });

  it("gives every built-in icon colors that match its paths", () => {
    const colored = icons.filter((icon) => icon.colors);
    expect(colored.length).toBeGreaterThan(0);
    for (const icon of colored) {
      expect(icon.colors?.length, icon.name).toBe(icon.paths.length);
    }
  });
});
