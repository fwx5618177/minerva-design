import { act, render } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  Bar3DChart,
  Line3DChart,
  Scatter3DChart,
  Surface3DChart,
} from "../index";
import type { Chart3DHandle } from "./three-d";

const flush = () =>
  act(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => setTimeout(resolve, 0)),
      ),
  );

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(500);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(400);
});

afterEach(() => {
  vi.restoreAllMocks();
});

const POINTS = [
  [0, 0, 0],
  [1, 2, 3],
] as const;

describe("3D chart components", () => {
  it("renders a sized container and exposes a camera handle", async () => {
    const ref = createRef<Chart3DHandle>();
    const { container, unmount } = render(
      <Scatter3DChart
        ref={ref}
        height={300}
        series={[{ name: "A", data: POINTS }]}
        ariaLabel="Cloud"
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.height).toBe("300px");
    expect(root.style.width).toBe("100%");
    expect(container.querySelector('[aria-label="Cloud"]')).not.toBeNull();
    await flush();
    expect(ref.current?.getCamera()).toMatchObject({ azimuth: 35, zoom: 1 });
    act(() => ref.current?.setCamera({ azimuth: 10 }));
    expect(ref.current?.getCamera()?.azimuth).toBe(10);
    act(() => ref.current?.resetCamera());
    expect(ref.current?.getCamera()?.azimuth).toBe(35);
    expect(ref.current?.getRenderer()).toBeNull();
    expect(ref.current?.getInstance()).not.toBeNull();
    unmount();
    expect(container.querySelector(".minerva-chart-3d")).toBeNull();
  });

  it("keeps the engine options while inline props describe the same chart", async () => {
    const ref = createRef<Chart3DHandle>();
    const data = { rows: 2, cols: 2, z: [0, 1, 2, 3] };
    const { rerender, unmount } = render(
      <Surface3DChart
        ref={ref}
        series={[{ data }]}
        camera={{ azimuth: 20 }}
        aspect={[1, 1, 0.5]}
        wireframe
      />,
    );
    await flush();
    const instance = ref.current!.getInstance()!;
    const setOptions = vi.spyOn(instance, "setOptions");
    rerender(
      <Surface3DChart
        ref={ref}
        series={[{ data }]}
        camera={{ azimuth: 20 }}
        aspect={[1, 1, 0.5]}
        wireframe
      />,
    );
    await flush();
    expect(setOptions).not.toHaveBeenCalled();
    rerender(
      <Surface3DChart
        ref={ref}
        series={[{ data }]}
        camera={{ azimuth: 20 }}
        aspect={[1, 1, 0.5]}
        wireframe={false}
      />,
    );
    await flush();
    expect(setOptions).toHaveBeenCalledTimes(1);
    const series = setOptions.mock.calls[0]![0].series[0]!;
    expect(series).toMatchObject({ type: "surface", wireframe: false });
    unmount();
  });

  it("sets the series type of every component", async () => {
    const ref = createRef<Chart3DHandle>();
    const { container, unmount } = render(
      <Bar3DChart
        ref={ref}
        barWidth={0.5}
        series={[{ name: "Sales", data: [["a", "x", 1]] }]}
      />,
    );
    await flush();
    const summary = container.querySelector(".minerva-chart-stage")!;
    const text = document.getElementById(
      summary.getAttribute("aria-describedby")!,
    )!.textContent;
    expect(text).toContain("Sales (bar): 1 bars");
    unmount();
    const line = render(
      <Line3DChart series={[{ name: "Path", data: POINTS }]} />,
    );
    await flush();
    const stage = line.container.querySelector(".minerva-chart-stage")!;
    expect(
      document.getElementById(stage.getAttribute("aria-describedby")!)!
        .textContent,
    ).toContain("Path (line): 2 vertices");
    line.unmount();
  });
});
