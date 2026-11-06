// @vitest-environment happy-dom
import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { createOrderBookHeatmap } from "minerva-design/charts/core";
import { HistoryNavigator } from "./HistoryNavigator";
import type { OrderBookHeatmapHandle } from "minerva-design/charts";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
afterEach(() => {
  vi.restoreAllMocks();
  document.body.textContent = "";
});
const frame = () =>
  act(
    () =>
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve())),
  );
it("tracks the engine time ratio, manual view and reset events without a summary update", async () => {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(600);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(400);
  // happy-dom has no Canvas2D implementation; keep engine/layout/event logic real.
  const context = new Proxy(
    {},
    {
      get: (_, key) =>
        key === "measureText"
          ? (text: string) => ({ width: text.length * 6 })
          : key === "createLinearGradient"
            ? () => ({ addColorStop() {} })
            : () => {},
      set: () => true,
    },
  );
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(((
    kind: string,
  ) => (kind === "2d" ? context : null)) as never);
  const host = document.createElement("div");
  document.body.append(host);
  const engine = createOrderBookHeatmap(host, {
    renderer: "canvas2d",
    interval: 1000,
    window: 6000,
    maxColumns: 30,
  });
  const handle: OrderBookHeatmapHandle = {
    ...engine,
    getInstance: () => engine,
  };
  const ui = render(
    <HistoryNavigator heatmap={{ current: handle }} summary={null} />,
  );
  try {
    await frame();
    expect(
      ui
        .getAllByRole("slider")
        .every(
          (slider) =>
            slider.getAttribute("aria-disabled") === "true" ||
            slider.hasAttribute("disabled"),
        ),
    ).toBe(true);
    engine.setBook({ time: 1000, bids: [[99, 2]], asks: [[101, 3]] });
    engine.applyDeltas({ time: 11000, bids: [[99, 3]] });
    await frame();
    await frame();
    act(() => engine.setView({ time: [3000, 7000] }));
    await frame();
    const view = engine.getView();
    const available = view.availableTime!;
    const expected = view.view.time.map((time) =>
      Math.round(((time - available[0]) / (available[1] - available[0])) * 100),
    );
    expect(
      ui
        .getAllByRole("slider")
        .map((slider) => Number(slider.getAttribute("aria-valuenow"))),
    ).toEqual(expected);
    expect(ui.getByTestId("heatmap-history-navigator").dataset.follow).toBe(
      "false",
    );
    fireEvent.click(ui.getByTestId("heatmap-follow"));
    await frame();
    expect(ui.getByTestId("heatmap-history-navigator").dataset.follow).toBe(
      "true",
    );
    const reset = engine.getView();
    const bounds = reset.availableTime!;
    expect(
      ui
        .getAllByRole("slider")
        .map((slider) => Number(slider.getAttribute("aria-valuenow"))),
    ).toEqual(
      reset.view.time.map((time) =>
        Math.max(
          0,
          Math.min(
            100,
            Math.round(((time - bounds[0]) / (bounds[1] - bounds[0])) * 100),
          ),
        ),
      ),
    );
  } finally {
    ui.unmount();
    engine.destroy();
  }
});
