import { afterEach, beforeEach, expect, it, vi, type Mock } from "vitest";

const counts = vi.hoisted(() => ({ hits: 0 }));
vi.mock("./scene", async (original) => {
  const actual = await original<typeof import("./scene")>();
  return {
    ...actual,
    hitTest: (...args: Parameters<typeof actual.hitTest>) => {
      counts.hits++;
      return actual.hitTest(...args);
    },
  };
});
import { createChart } from "./chart";
import type { ChartInstance, ChartHoverEvent } from "./types";

const frame = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
let chart: ChartInstance;
let host: HTMLDivElement;
let stage: HTMLElement;
let renders: Mock<() => string>;
let hover: Mock<(event: ChartHoverEvent | null) => void>;
const move = (index: number, type = "pointermove") => {
  const at = chart.toPixel(index, index ? 8 : 2)!;
  stage.dispatchEvent(
    new PointerEvent(type, {
      bubbles: true,
      pointerId: 1,
      button: 0,
      clientX: at.x,
      clientY: at.y,
    }),
  );
};
beforeEach(async () => {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(600);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(400);
  host = document.createElement("div");
  document.body.append(host);
  renders = vi.fn(() => "point");
  chart = createChart(host, {
    series: [
      {
        type: "scatter",
        data: [
          { x: 0, y: 2 },
          { x: 1, y: 8 },
        ],
      },
    ],
    tooltip: { render: renders },
  });
  await chart.ready;
  await frame();
  stage = host.querySelector(".minerva-chart-stage")!;
  hover = vi.fn();
  chart.on("hover", hover);
  counts.hits = 0;
});
afterEach(() => {
  chart.destroy();
  host.remove();
  vi.restoreAllMocks();
});
it("coalesces a 240-move burst into one real hit test and tooltip render at the latest point", async () => {
  const start = performance.now();
  for (let i = 0; i < 240; i++) move(i % 2);
  const synchronousMs = performance.now() - start;
  const beforeFrame = { hits: counts.hits, renders: renders.mock.calls.length };
  await frame();
  process.stdout.write(
    `Cartesian hover burst ${JSON.stringify({ synchronousMs, beforeFrame, afterFrame: { hits: counts.hits, renders: renders.mock.calls.length } })}\n`,
  );
  expect(counts.hits).toBe(1);
  expect(renders).toHaveBeenCalledTimes(1);
  expect(
    hover.mock.calls[hover.mock.calls.length - 1]?.[0]?.items[0].index,
  ).toBe(1);
});
it.each([
  "pointerleave",
  "pointercancel",
  "lostpointercapture",
  "blur",
  "windowblur",
  "destroy",
])("discards pending hover on %s", async (type) => {
  move(1);
  if (type === "destroy") chart.destroy();
  else if (type === "windowblur") window.dispatchEvent(new Event("blur"));
  else stage.dispatchEvent(new Event(type, { bubbles: true }));
  const before = renders.mock.calls.length;
  await frame();
  expect(renders.mock.calls.length).toBe(before);
  expect(counts.hits).toBe(0);
});
it("keeps a click synchronous and discards an older pending hover", async () => {
  const click = vi.fn();
  chart.on("click", click);
  move(0);
  move(1, "pointerdown");
  move(1, "pointerup");
  expect(click.mock.calls[0]?.[0]?.items[0].index).toBe(1);
  await frame();
  expect(hover).not.toHaveBeenCalled();
});
