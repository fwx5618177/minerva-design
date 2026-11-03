// @vitest-environment happy-dom
// The "renderers" demo of the charts overview: the radio group forces the
// backend of the chart and the status reports the one that actually drew.
// The chart is stubbed (happy-dom has no GPU); it reports the requested
// backend, or WebGL2 for "auto".
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, expect, it, vi } from "vitest";
import { SiteProviders, setupI18n } from "../test/utils";
import RenderersDemo from "./pages/charts/demos/renderers";

vi.mock("minerva-design/charts", async () => {
  const { useEffect } = await import("react");
  return {
    Chart: ({
      renderer,
      onRendererChange,
      ariaLabel,
    }: {
      renderer: string;
      onRendererChange: (kind: string) => void;
      ariaLabel: string;
    }) => {
      useEffect(() => {
        onRendererChange(renderer === "auto" ? "webgl2" : renderer);
      }, [renderer, onRendererChange]);
      return (
        <div
          className="minerva-chart"
          data-requested={renderer}
          aria-label={ariaLabel}
        />
      );
    },
  };
});

beforeAll(setupI18n);

it("forces each backend and reports what drew", async () => {
  const user = userEvent.setup();
  const { container } = render(
    <SiteProviders>
      <RenderersDemo />
    </SiteProviders>,
  );
  const status = screen.getByRole("status");
  expect(status).toHaveTextContent("Requested: auto · drawn with: webgl2");
  expect(screen.getAllByRole("radio")).toHaveLength(5);
  for (const renderer of ["canvas2d", "webgl2", "webgl"]) {
    await user.click(screen.getByRole("radio", { name: renderer }));
    expect(container.querySelector(".minerva-chart")).toHaveAttribute(
      "data-requested",
      renderer,
    );
    expect(status).toHaveTextContent(
      `Requested: ${renderer} · drawn with: ${renderer}`,
    );
  }
});
