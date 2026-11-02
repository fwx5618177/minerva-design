import { afterEach, describe, expect, it, vi } from "vitest";
import {
  QUADRANT_MOVE_SHORTCUTS,
  isQuadrantMoveKey,
  quadrantAccessibleGroups,
  quadrantHoverEvent,
  quadrantKeyTarget,
  quadrantMoveDrop,
  quadrantMoveTargets,
  quadrantNavTarget,
} from "./quadrant-keyboard";
import { createQuadrantPointLayer } from "./quadrant-layer";

const points = [
  { x: 8, y: 8, label: "Write report" },
  { x: 2, y: 2 },
  { x: 1, y: 9, label: "Call" },
];

describe("quadrant keyboard helpers", () => {
  it("maps Shift + arrows to the neighbouring quadrant", () => {
    const key = (k: string, extra = {}) => ({
      key: k,
      shiftKey: true,
      ...extra,
    });
    expect(quadrantKeyTarget(key("ArrowDown"), "topLeft")).toBe("bottomLeft");
    expect(quadrantKeyTarget(key("ArrowRight"), "topLeft")).toBe("topRight");
    expect(quadrantKeyTarget(key("ArrowUp"), "bottomRight")).toBe("topRight");
    expect(quadrantKeyTarget(key("ArrowLeft"), "bottomRight")).toBe(
      "bottomLeft",
    );
    // towards the outside, without Shift or with another modifier: nothing
    expect(quadrantKeyTarget(key("ArrowUp"), "topLeft")).toBeNull();
    expect(quadrantKeyTarget({ key: "ArrowDown" }, "topLeft")).toBeNull();
    expect(
      quadrantKeyTarget(key("ArrowDown", { ctrlKey: true }), "topLeft"),
    ).toBeNull();
    expect(isQuadrantMoveKey(key("ArrowUp"))).toBe(true);
    expect(isQuadrantMoveKey(key("Enter"))).toBe(false);
    expect(quadrantMoveTargets("topLeft")).toEqual(["bottomLeft", "topRight"]);
    expect(quadrantMoveTargets("bottomRight")).toEqual([
      "topRight",
      "bottomLeft",
    ]);
  });

  it("moves between the points with arrows, Home and End", () => {
    const order = [2, 0, 1];
    expect(quadrantNavTarget({ key: "ArrowDown" }, order, 2)).toBe(0);
    expect(quadrantNavTarget({ key: "ArrowRight" }, order, 0)).toBe(1);
    expect(quadrantNavTarget({ key: "ArrowDown" }, order, 1)).toBe(1);
    expect(quadrantNavTarget({ key: "ArrowUp" }, order, 0)).toBe(2);
    expect(quadrantNavTarget({ key: "End" }, order, 2)).toBe(1);
    expect(quadrantNavTarget({ key: "Home" }, order, 1)).toBe(2);
    expect(
      quadrantNavTarget({ key: "ArrowDown", shiftKey: true }, order, 2),
    ).toBeNull();
    expect(quadrantNavTarget({ key: "a" }, order, 2)).toBeNull();
  });

  it("names the points, their quadrant, values and moves", () => {
    const groups = quadrantAccessibleGroups(
      {
        points,
        reverseX: true,
        quadrants: { topLeft: { label: "Do first" } },
        xLabel: "Urgency",
      },
      "en",
    );
    expect(groups.map((g) => [g.quadrant, g.name])).toEqual([
      ["topLeft", "Do first"],
      ["topRight", "Top right quadrant"],
      ["bottomRight", "Bottom right quadrant"],
    ]);
    const [report] = groups[0]!.points;
    expect(report).toMatchObject({
      index: 0,
      name: "Write report",
      label: "Write report, Do first",
      description: "Write report, Do first, Urgency: 8, y: 8",
      moves: [
        { quadrant: "bottomLeft", label: "Move to Bottom left quadrant" },
        { quadrant: "topRight", label: "Move to Top right quadrant" },
      ],
    });
    expect(groups[2]!.points[0]!.name).toBe("Point 2");
    expect(
      quadrantAccessibleGroups({ points: [points[1]!] }, "zh")[0]!.points[0]!
        .moves[0]!.label,
    ).toBe("移到左上象限");
    expect(quadrantMoveDrop({ reverseX: true }, "bottomLeft")).toEqual({
      x: 7.5,
      y: 2.5,
      quadrant: "bottomLeft",
    });
  });

  it("builds the hover event of a focused point", () => {
    expect(quadrantHoverEvent({ points, name: "Tasks" }, 0, "en")).toEqual({
      items: [
        {
          seriesIndex: 0,
          seriesId: "0",
          seriesName: "Tasks",
          index: 0,
          x: 8,
          y: 8,
          color: "var(--primary-color, #4f46e5)",
          label: "Write report",
        },
      ],
      x: 8,
      xLabel: "8",
    });
    expect(quadrantHoverEvent({ points }, null)).toBeNull();
    expect(quadrantHoverEvent({ points }, 9)).toBeNull();
  });
});

describe("createQuadrantPointLayer", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const setup = (movable = true) => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const onFocusChange = vi.fn();
    const onClick = vi.fn();
    const onMove = vi.fn();
    const options = (list: typeof points) => ({
      config: {
        points: list,
        reverseX: true,
        quadrants: { topLeft: { label: "Do first" } },
      },
      locale: "en",
      movable,
      selected: [2],
      onFocusChange,
      onClick,
      onMove,
    });
    const layer = createQuadrantPointLayer(host, options(points));
    const button = (index: number) =>
      host.querySelector<HTMLButtonElement>(
        `button[data-point-index="${index}"]`,
      )!;
    const key = (index: number, init: KeyboardEventInit) => {
      const event = new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        ...init,
      });
      button(index).dispatchEvent(event);
      return event;
    };
    return {
      host,
      layer,
      options,
      button,
      key,
      onFocusChange,
      onClick,
      onMove,
    };
  };

  it("renders the lists, buttons, hint and live region of the React layer", () => {
    const { host, button } = setup();
    const lists = host.querySelectorAll('[role="list"]');
    expect([...lists].map((l) => l.getAttribute("aria-label"))).toEqual([
      "Do first",
      "Top right quadrant",
      "Bottom right quadrant",
    ]);
    expect(button(0).getAttribute("aria-label")).toBe("Write report, Do first");
    expect(button(0).textContent).toBe("Write report");
    expect(button(0).getAttribute("aria-keyshortcuts")).toBe(
      QUADRANT_MOVE_SHORTCUTS,
    );
    const hint = document.getElementById(
      button(0).getAttribute("aria-describedby")!,
    )!;
    expect(hint.textContent).toBe(
      "Shift + arrow keys move it to another quadrant",
    );
    expect(button(2).getAttribute("aria-current")).toBe("true");
    expect(
      host.querySelector('[role="status"]')!.getAttribute("aria-live"),
    ).toBe("polite");
  });

  it("reports the focus, clicks and arrow navigation", () => {
    const { button, key, onFocusChange, onClick, layer } = setup();
    button(0).focus();
    expect(layer.focusedIndex).toBe(0);
    expect(onFocusChange).toHaveBeenLastCalledWith(
      0,
      expect.objectContaining({ x: 8, xLabel: "8" }),
    );
    // list order: topLeft (0), topRight (2), bottomRight (1)
    const down = key(0, { key: "ArrowDown" });
    expect(down.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(button(2));
    expect(onFocusChange).toHaveBeenLastCalledWith(2, expect.anything());
    key(2, { key: "End" });
    expect(document.activeElement).toBe(button(1));
    button(1).click();
    expect(onClick).toHaveBeenCalledWith(1);
    button(1).blur();
    expect(onFocusChange).toHaveBeenLastCalledWith(null, null);
    expect(onFocusChange).toHaveBeenCalledTimes(4);
  });

  it("moves the focused point with Shift + arrows, announces it and keeps the focus", () => {
    const { host, layer, options, button, key, onMove, onFocusChange } =
      setup();
    button(0).focus();
    const event = key(0, { key: "ArrowDown", shiftKey: true });
    expect(event.defaultPrevented).toBe(true);
    expect(onMove).toHaveBeenCalledWith(0, {
      x: 7.5,
      y: 2.5,
      quadrant: "bottomLeft",
    });
    expect(host.querySelector('[role="status"]')!.textContent).toBe(
      "Write report moved to Bottom left quadrant",
    );
    // towards the outside: prevented, no move
    expect(key(0, { key: "ArrowUp", shiftKey: true }).defaultPrevented).toBe(
      true,
    );
    expect(onMove).toHaveBeenCalledTimes(1);

    // the app moves the point: its button keeps the focus in its new list
    onFocusChange.mockClear();
    layer.update(
      options([{ ...points[0]!, x: 7.5, y: 2.5 }, ...points.slice(1)]),
    );
    expect(document.activeElement).toBe(button(0));
    expect(
      button(0).closest('[role="list"]')!.getAttribute("data-quadrant"),
    ).toBe("bottomLeft");
    expect(onFocusChange).not.toHaveBeenCalled();

    // removed point (not drawable): focus lost
    layer.update(options([{ x: NaN, y: NaN }, ...points.slice(1)]));
    expect(onFocusChange).toHaveBeenLastCalledWith(null, null);
  });

  it("does not move the points without `movable` and cleans up", () => {
    const { host, layer, button, key, onMove } = setup(false);
    expect(button(0).hasAttribute("aria-keyshortcuts")).toBe(false);
    button(0).focus();
    expect(key(0, { key: "ArrowDown", shiftKey: true }).defaultPrevented).toBe(
      false,
    );
    expect(onMove).not.toHaveBeenCalled();
    layer.destroy();
    expect(host.querySelector(".minerva-chart-quadrant-points")).toBeNull();
  });
});
