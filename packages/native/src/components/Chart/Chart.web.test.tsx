import { act, fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { LineChart, QuadrantChart, ScatterChart } from "./index";

const q = (part: string) =>
  document.querySelector(`[data-minerva="chart"][data-part="${part}"]`);

const views = (part: string) => q(part)?.querySelectorAll("div").length ?? 0;

describe("charts on react-native-web", () => {
  it("renders the scene as positioned elements", () => {
    render(
      <MinervaProvider theme="light">
        <LineChart
          width={360}
          height={240}
          ariaLabel="Revenue"
          xAxis={{ title: "Month" }}
          series={[{ data: [3, 5, 2, 8, 6] }]}
        />
      </MinervaProvider>,
    );
    const surface = q("surface")!;
    expect(surface.getAttribute("role")).toBe("img");
    expect(surface.getAttribute("aria-label")).toBe("Revenue");
    expect(document.body.textContent).toContain("Month");
    expect(views("data")).toBeGreaterThan(3);
    expect(views("data")).toBeLessThan(40);
  });

  it("keeps large scatter plots bounded", () => {
    const n = 20_000;
    const x = Float64Array.from({ length: n }, (_, i) => (i * 7919) % 1000);
    const y = Float64Array.from({ length: n }, (_, i) => (i * 104729) % 1000);
    render(
      <MinervaProvider theme="dark">
        <ScatterChart width={360} height={240} series={[{ data: { x, y } }]} />
      </MinervaProvider>,
    );
    expect(views("data")).toBeGreaterThan(50);
    expect(views("data")).toBeLessThanOrEqual(800);
  });

  it("a tap through the responder system shows the tooltip and calls onPointClick", async () => {
    const onPointClick = vi.fn();
    render(
      <MinervaProvider theme="light">
        <QuadrantChart
          width={360}
          height={240}
          showTicks={false}
          points={[{ x: 5, y: 5, label: "Center" }]}
          xSplit={2}
          ySplit={2}
          onPointClick={onPointClick}
        />
      </MinervaProvider>,
    );
    // padding 4 on every side: (5, 5) is the center of the plot
    const surface = q("surface")!;
    const at = { clientX: 180, clientY: 120, pageX: 180, pageY: 120 };
    const touch = { identifier: 0, target: surface, ...at };
    await act(async () => {
      fireEvent.touchStart(surface, {
        touches: [touch],
        changedTouches: [touch],
        timeStamp: 1,
      });
      fireEvent.touchEnd(surface, {
        touches: [],
        changedTouches: [touch],
        timeStamp: 2,
      });
    });
    expect(onPointClick).toHaveBeenCalledWith(
      { x: 5, y: 5, label: "Center" },
      0,
    );
    expect(q("tooltip")).not.toBeNull();
  });
});
