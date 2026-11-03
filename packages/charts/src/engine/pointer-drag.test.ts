import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { createChart } from "./chart";
import { quadrantChartOptions } from "./presets";
import {
  createQuadrantPointCard,
  type QuadrantPointCard,
} from "./quadrant-card";
import type { ChartInstance } from "./types";

let host: HTMLDivElement;
let chart: ChartInstance;
let stage: HTMLElement;
let card: QuadrantPointCard;
const points = [
  { x: 2, y: 8, label: "A" },
  { x: 8, y: 2, label: "B" },
];
const start = vi.fn(),
  end = vi.fn(),
  drop = vi.fn(),
  click = vi.fn();
const send = (
  type: string,
  x = 2,
  y = 8,
  target: EventTarget = stage,
  buttons = 1,
  pointerId = 1,
) => {
  const at = chart.toPixel(x, y)!;
  target.dispatchEvent(
    new PointerEvent(type, {
      bubbles: true,
      pointerId,
      button: 0,
      buttons,
      clientX: at.x,
      clientY: at.y,
    }),
  );
};

beforeEach(async () => {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(600);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(400);
  host = document.createElement("div");
  document.body.appendChild(host);
  chart = createChart(host, quadrantChartOptions({ points, draggable: true }));
  await chart.ready;
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  stage = host.querySelector(".minerva-chart-stage")!;
  card = createQuadrantPointCard(host, { config: { points }, locale: "en" });
  start.mockClear();
  end.mockClear();
  drop.mockClear();
  click.mockClear();
  chart.on("dragStart", (event) => {
    start(event);
    card.drag(event.item.index);
  });
  chart.on("dragEnd", (event) => {
    end(event);
    card.drag(null);
  });
  chart.on("drop", drop);
  chart.on("click", click);
  chart.on("hover", (event) => card.hover(event?.items[0]?.index ?? null));
});
afterEach(() => {
  chart.destroy();
  card.destroy();
  host.remove();
  vi.restoreAllMocks();
});

it.each(["pointerup", "pointercancel"])(
  "clears a pending point press released outside the stage (%s)",
  (type) => {
    send("pointerdown");
    send("pointerleave");
    send(type, 2, 8, document.body, 0);
    // A later press outside the stage must not resume the old point.
    send("pointermove", 8, 2, stage, 1);
    expect(start).not.toHaveBeenCalled();
    expect(end).not.toHaveBeenCalled();
    expect(click).not.toHaveBeenCalled();
    expect(card.index).toBe(1);
  },
);

it("does not start a pending drag from a buttonless move after a missed release", () => {
  send("pointerdown");
  send("pointermove", 8, 2, stage, 0);
  expect(start).not.toHaveBeenCalled();
  expect(card.index).toBe(1);
});

it.each(["pointercancel", "lostpointercapture"])(
  "cancels an active drag exactly once on %s",
  (type) => {
    send("pointerdown");
    send("pointermove", 3, 7);
    expect(start).toHaveBeenCalledTimes(1);
    expect(card.index).toBe(0);
    send(type, 3, 7, stage, 0);
    send("pointerup", 3, 7, window, 0);
    expect(end).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ cancelled: true }),
    );
    expect(drop).not.toHaveBeenCalled();
    expect(
      [...host.querySelectorAll<HTMLElement>("[data-drag-mark]")].every(
        (el) => el.style.display === "none",
      ),
    ).toBe(true);
    send("pointermove", 8, 2, stage, 0);
    expect(card.index).toBe(1);
  },
);

it.each([0, 2])(
  "cancels an active drag when the primary button is no longer held (buttons=%s)",
  (buttons) => {
    send("pointerdown");
    send("pointermove", 3, 7);
    send("pointermove", 8, 2, stage, buttons);
    expect(end).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ cancelled: true }),
    );
    expect(drop).not.toHaveBeenCalled();
    expect(card.index).toBe(1);
  },
);

it("cancels on window blur even without a release event", () => {
  send("pointerdown");
  send("pointermove", 3, 7);
  window.dispatchEvent(new Event("blur"));
  expect(end).toHaveBeenCalledExactlyOnceWith(
    expect.objectContaining({ cancelled: true }),
  );
  send("pointermove", 8, 2, stage, 0);
  expect(card.index).toBe(1);
});

it("ends the old drag before accepting a new point press", () => {
  send("pointerdown");
  send("pointermove", 3, 7);
  send("pointerdown", 8, 2);
  expect(end).toHaveBeenCalledExactlyOnceWith(
    expect.objectContaining({
      cancelled: true,
      item: expect.objectContaining({ index: 0 }),
    }),
  );
  send("pointermove", 7, 3);
  expect(start).toHaveBeenCalledTimes(2);
  expect(card.index).toBe(1);
});

it("ignores releases and buttonless moves from another pointer", () => {
  send("pointerdown");
  send("pointermove", 3, 7);
  send("pointerup", 3, 7, window, 0, 2);
  send("lostpointercapture", 3, 7, stage, 0, 2);
  send("pointermove", 8, 2, stage, 0, 2);
  expect(end).not.toHaveBeenCalled();
  send("pointerup", 3, 7, stage, 0);
  expect(drop).toHaveBeenCalledTimes(1);
  expect(end).toHaveBeenCalledExactlyOnceWith(
    expect.objectContaining({ cancelled: false }),
  );
});

it("preserves a normal click and does not turn pointercancel into a click", () => {
  send("pointerdown");
  send("pointerup", 2, 8, stage, 0);
  expect(click).toHaveBeenCalledTimes(1);
  send("pointerdown");
  send("pointercancel", 2, 8, stage, 0);
  expect(click).toHaveBeenCalledTimes(1);
  expect(start).not.toHaveBeenCalled();
});

it("stops panning after a missed primary-button release", async () => {
  chart.setOptions({
    series: [{ type: "scatter", data: points }],
    xAxis: { min: 0, max: 10 },
    yAxis: { min: 0, max: 10 },
    interaction: { pan: true, zoom: true },
  });
  chart.setView({ x: [1, 9], y: [1, 9] });
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  send("pointerdown", 5, 5);
  send("pointermove", 5.5, 5);
  const view = chart.getView();
  send("pointermove", 6, 5, stage, 0);
  expect(chart.getView()).toEqual(view);
});

it("ends an active drag once on destruction", () => {
  send("pointerdown");
  send("pointermove", 3, 7);
  chart.destroy();
  expect(end).toHaveBeenCalledExactlyOnceWith(
    expect.objectContaining({ cancelled: true }),
  );
  window.dispatchEvent(new Event("blur"));
  send("pointerup", 3, 7, window, 0);
  expect(end).toHaveBeenCalledTimes(1);
});
