import { act, render } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  BarChart,
  Chart,
  LineChart,
  QuadrantChart,
  ScatterChart,
} from "../index";
import type { ChartHandle } from "./types";

const flush = () =>
  act(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => setTimeout(resolve, 0)),
      ),
  );

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(500);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(300);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("chart components", () => {
  it("renders a sized container and exposes a handle", async () => {
    const ref = createRef<ChartHandle>();
    const { container, unmount } = render(
      <Chart
        ref={ref}
        height={240}
        series={[{ data: [1, 2, 3] }]}
        ariaLabel="Demo"
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.height).toBe("240px");
    expect(root.style.width).toBe("100%");
    expect(container.querySelector('[aria-label="Demo"]')).not.toBeNull();
    await flush();
    expect(ref.current?.getView()?.x).toEqual([0, 2]);
    expect(ref.current?.getInstance()).not.toBeNull();
    unmount();
    expect(container.querySelector(".minerva-chart")).toBeNull();
  });

  it("applies new props without remounting", async () => {
    const { container, rerender } = render(
      <LineChart series={[{ name: "A", data: [1, 2] }]} />,
    );
    const root = container.querySelector(".minerva-chart");
    rerender(
      <LineChart
        area
        series={[
          { name: "A", data: [1, 2] },
          { name: "B", data: [2, 1] },
        ]}
      />,
    );
    await flush();
    expect(container.querySelector(".minerva-chart")).toBe(root);
    expect(
      container.querySelectorAll(".minerva-chart-legend button"),
    ).toHaveLength(2);
  });

  it("forwards hover events", async () => {
    const onHover = vi.fn();
    const { container } = render(
      <BarChart
        stacked
        onHover={onHover}
        series={[
          {
            data: [
              ["a", 1],
              ["b", 2],
            ],
          },
        ]}
      />,
    );
    await flush();
    const stage = container.querySelector(".minerva-chart-stage")!;
    stage.dispatchEvent(
      new PointerEvent("pointermove", { clientX: 400, clientY: 150 }),
    );
    expect(onHover).toHaveBeenCalled();
    expect(onHover.mock.calls[0][0].xLabel).toBe("b");
  });

  it("maps quadrant clicks to the points", async () => {
    const onPointClick = vi.fn();
    const points = [
      { x: 2, y: 8, label: "Write report" },
      { x: 8, y: 2, label: "Inbox" },
    ];
    const { container } = render(
      <QuadrantChart
        points={points}
        onPointClick={onPointClick}
        quadrants={{ topLeft: { label: "Do first" } }}
      />,
    );
    await flush();
    const handle = container.querySelector(".minerva-chart-stage")!;
    // probe the plot to find the first point
    let hit = false;
    for (let x = 0; x < 500 && !hit; x += 2) {
      for (let y = 0; y < 300 && !hit; y += 2) {
        handle.dispatchEvent(
          new PointerEvent("pointerdown", {
            clientX: x,
            clientY: y,
            button: 0,
            pointerId: 1,
          }),
        );
        handle.dispatchEvent(
          new PointerEvent("pointerup", {
            clientX: x,
            clientY: y,
            button: 0,
            pointerId: 1,
          }),
        );
        hit = onPointClick.mock.calls.length > 0;
      }
    }
    expect(hit).toBe(true);
    expect(points).toContain(onPointClick.mock.calls[0][0]);
  });

  it("drags quadrant points, reports quadrant clicks and renders overlays", async () => {
    const onPointDrop = vi.fn();
    const onQuadrantClick = vi.fn();
    const ref = createRef<ChartHandle>();
    const points = [{ x: 2, y: 8, label: "Write report" }];
    const { container, getByText } = render(
      <QuadrantChart
        ref={ref}
        points={points}
        reverseX
        showTicks={false}
        onPointDrop={onPointDrop}
        onQuadrantClick={onQuadrantClick}
        quadrantContent={{ topLeft: <button type="button">add</button> }}
        renderTooltip={(point) => <strong>{point.label}</strong>}
      />,
    );
    await flush();
    expect(getByText("add")).toBeTruthy();
    const chart = ref.current!.getInstance()!;
    const stage = container.querySelector(".minerva-chart-stage")!;
    const fire = (type: string, at: { x: number; y: number }) =>
      stage.dispatchEvent(
        new PointerEvent(type, {
          clientX: at.x,
          clientY: at.y,
          button: 0,
          pointerId: 1,
        }),
      );
    const from = chart.toPixel(2, 8)!;
    const to = chart.toPixel(8, 2)!;
    fire("pointermove", from);
    expect(
      container.querySelector(".minerva-chart-tooltip strong")?.textContent,
    ).toBe("Write report");
    fire("pointerdown", from);
    fire("pointermove", { x: from.x + 20, y: from.y + 20 });
    fire("pointermove", to);
    fire("pointerup", to);
    expect(onPointDrop).toHaveBeenCalledTimes(1);
    expect(onPointDrop.mock.calls[0][2].quadrant).toBe("bottomLeft");
    fire("pointerdown", to);
    fire("pointerup", to);
    expect(onQuadrantClick.mock.calls[0][0]).toBe("bottomLeft");
  });

  it("renders scatter charts", () => {
    const { container } = render(
      <ScatterChart series={[{ data: [[1, 2]] }]} />,
    );
    expect(container.querySelector(".minerva-chart-stage")).not.toBeNull();
  });

  it("skips the engine update when a re-render passes equal options", async () => {
    const ref = createRef<ChartHandle>();
    const data = [1, 3, 2];
    const view = (props: { name: string; tooltip?: boolean }) => (
      <LineChart
        ref={ref}
        // inline objects, as users write them
        series={[{ name: props.name, data }]}
        xAxis={{ title: "Day" }}
        palette={["#ff0000"]}
        renderTooltip={
          props.tooltip ? (e) => <em>{e.items[0].y}</em> : undefined
        }
      />
    );
    const { container, rerender } = render(view({ name: "A" }));
    await flush();
    const chart = ref.current!.getInstance()!;
    const setOptions = vi.spyOn(chart, "setOptions");
    rerender(view({ name: "A" }));
    rerender(view({ name: "A" }));
    await flush();
    expect(setOptions).not.toHaveBeenCalled();

    rerender(view({ name: "B" }));
    await flush();
    expect(setOptions).toHaveBeenCalledTimes(1);
    expect(setOptions.mock.calls[0][0].series[0].name).toBe("B");

    // a React tooltip installs a render callback once, not on every render
    rerender(view({ name: "B", tooltip: true }));
    rerender(view({ name: "B", tooltip: true }));
    await flush();
    expect(setOptions).toHaveBeenCalledTimes(2);
    const tooltip = setOptions.mock.calls[1][0].tooltip;
    expect(typeof tooltip === "object" && tooltip.render).toBeTypeOf(
      "function",
    );
    const stage = container.querySelector(".minerva-chart-stage")!;
    stage.dispatchEvent(
      new PointerEvent("pointermove", { clientX: 250, clientY: 150 }),
    );
    expect(container.querySelector(".minerva-chart-tooltip em")).not.toBeNull();
  });
});
