import { describe, expect, it } from "vitest";
import {
  placeQuadrantTaskPanel,
  quadrantTaskColor,
  quadrantTaskIconUri,
} from "./quadrant-tasks";

const board = { width: 600, height: 400 };
const panel = { width: 280, height: 180 };

describe("placeQuadrantTaskPanel", () => {
  it("opens below the anchor, centered on it", () => {
    const place = placeQuadrantTaskPanel(
      { x: 200, y: 40, width: 24, height: 24 },
      panel,
      board,
    );
    expect(place.placement).toBe("bottom");
    expect(place.y).toBe(40 + 24 + 8);
    expect(place.x).toBe(212 - 140);
    expect(place.origin).toEqual({ x: 140, y: 0 });
  });

  it("opens above when there is no room below", () => {
    const place = placeQuadrantTaskPanel(
      { x: 300, y: 330, width: 0, height: 0 },
      panel,
      board,
    );
    expect(place.placement).toBe("top");
    expect(place.y).toBe(330 - 8 - 180);
    expect(place.origin.y).toBe(180);
  });

  it("stays inside the board near its edges", () => {
    const left = placeQuadrantTaskPanel(
      { x: 4, y: 10, width: 16, height: 16 },
      panel,
      board,
    );
    expect(left.x).toBe(0);
    expect(left.origin.x).toBe(12);
    const right = placeQuadrantTaskPanel(
      { x: 590, y: 10, width: 0, height: 0 },
      panel,
      board,
    );
    expect(right.x).toBe(600 - 280);
    // a board shorter than the panel: the side with more room, from the top
    const short = placeQuadrantTaskPanel(
      { x: 100, y: 60, width: 0, height: 0 },
      panel,
      { width: 600, height: 150 },
    );
    expect(short.placement).toBe("bottom");
    expect(short.y).toBe(0);
  });
});

describe("quadrantTaskColor", () => {
  it("uses the color of the quadrant, else the default of its corner", () => {
    expect(quadrantTaskColor({ topLeft: { color: "#f00" } }, "topLeft")).toBe(
      "#f00",
    );
    expect(quadrantTaskColor(undefined, "topRight")).toContain(
      "--primary-color",
    );
  });
});

describe("quadrantTaskIconUri", () => {
  it("encodes a stroked SVG of the icon in base64", () => {
    const uri = quadrantTaskIconUri("add", '#123"456');
    expect(uri.startsWith("data:image/svg+xml;base64,")).toBe(true);
    const svg = Buffer.from(uri.split(",")[1]!, "base64").toString("utf8");
    expect(svg).toContain('stroke="#123456"');
    expect(svg).toContain('d="M12 5v14M5 12h14"');
  });
});
