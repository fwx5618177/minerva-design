// @vitest-environment happy-dom
import React, { useEffect } from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getDefaultChartRenderer } from "minerva-design/charts/core";
import { SiteProviders, setupI18n } from "../../test/utils";
import DemoBlock from "../components/DemoBlock";
import { ChartRendererContext } from "./context";
import RendererBadge from "./RendererBadge";
import RendererBar from "./RendererBar";
import { sameScan, scanRenderers } from "./scan";
import {
  RENDERER_STORAGE_KEY,
  parseRenderer,
  resetChartRenderer,
  restoreChartRenderer,
  setChartRenderer,
  useChartRenderer,
} from "./store";
import { autoPick, type BackendsSupport } from "./support";

const support = vi.hoisted(() => ({
  current: {
    webgpu: "missing",
    webgl2: "hardware",
    webgl: "software",
    canvas2d: "hardware",
  } as Record<string, string>,
}));

vi.mock("./support", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./support")>()),
  probeBackends: () => Promise.resolve({ ...support.current }),
}));

beforeAll(setupI18n);
beforeEach(() => {
  localStorage.clear();
  resetChartRenderer();
  support.current = {
    webgpu: "missing",
    webgl2: "hardware",
    webgl: "software",
    canvas2d: "hardware",
  };
});
afterEach(() => resetChartRenderer());

const chartRoot = (kind?: string, className = "minerva-chart") => {
  const root = document.createElement("div");
  root.className = className;
  if (kind) root.dataset.renderer = kind;
  return root;
};

describe("scanRenderers", () => {
  it("counts the charts per backend, shape charts apart", () => {
    const host = document.createElement("div");
    host.append(
      chartRoot("webgl2"),
      chartRoot("webgl2"),
      chartRoot("canvas2d"),
      chartRoot(undefined, "minerva-chart minerva-shape-chart"),
      chartRoot(), // still starting
      chartRoot("bogus"),
    );
    const scan = scanRenderers(host);
    expect(scan.kinds).toEqual({ webgl2: 2, canvas2d: 1 });
    expect(scan.shapes).toBe(1);
    expect(scan.roots).toEqual([]);
  });

  it("looks into open shadow roots and reports undefined custom elements", () => {
    const host = document.createElement("div");
    const element = document.createElement("div");
    const shadow = element.attachShadow({ mode: "open" });
    shadow.append(chartRoot("webgpu"));
    host.append(element, document.createElement("minerva-not-defined-yet"));
    const scan = scanRenderers(host);
    expect(scan.kinds).toEqual({ webgpu: 1 });
    expect(scan.roots).toEqual([shadow]);
    expect(scan.pending).toEqual(["minerva-not-defined-yet"]);
  });

  it("compares counts", () => {
    expect(
      sameScan(
        { kinds: { webgl: 1 }, shapes: 0 },
        { kinds: { webgl: 1 }, shapes: 0 },
      ),
    ).toBe(true);
    expect(
      sameScan(
        { kinds: { webgl: 1 }, shapes: 0 },
        { kinds: { webgl: 2 }, shapes: 0 },
      ),
    ).toBe(false);
    expect(sameScan({ kinds: {}, shapes: 1 }, { kinds: {}, shapes: 0 })).toBe(
      false,
    );
  });
});

describe("store", () => {
  it("parses the stored values", () => {
    expect(parseRenderer("webgl")).toBe("webgl");
    expect(parseRenderer("webgl3")).toBeNull();
    expect(parseRenderer(null)).toBeNull();
  });

  it("restores the stored renderer once and persists the choice", () => {
    localStorage.setItem(RENDERER_STORAGE_KEY, "canvas2d");
    restoreChartRenderer();
    expect(getDefaultChartRenderer()).toBe("canvas2d");
    localStorage.setItem(RENDERER_STORAGE_KEY, "webgl");
    restoreChartRenderer(); // already restored
    expect(getDefaultChartRenderer()).toBe("canvas2d");

    setChartRenderer("webgl2");
    expect(getDefaultChartRenderer()).toBe("webgl2");
    expect(localStorage.getItem(RENDERER_STORAGE_KEY)).toBe("webgl2");
    setChartRenderer("auto");
    expect(localStorage.getItem(RENDERER_STORAGE_KEY)).toBeNull();
  });

  it("ignores an invalid stored value", () => {
    localStorage.setItem(RENDERER_STORAGE_KEY, "vulkan");
    restoreChartRenderer();
    expect(getDefaultChartRenderer()).toBe("auto");
  });

  it("re-renders on changes, from this tab or another one", () => {
    const Probe = () => <output>{useChartRenderer()}</output>;
    render(<Probe />);
    expect(screen.getByRole("status")).toHaveTextContent("auto");
    act(() => setChartRenderer("webgl"));
    expect(screen.getByRole("status")).toHaveTextContent("webgl");
    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: RENDERER_STORAGE_KEY,
          newValue: "canvas2d",
        }),
      );
    });
    expect(screen.getByRole("status")).toHaveTextContent("canvas2d");
  });

  it("knows what auto picks", () => {
    const all = (value: string) =>
      ({
        webgpu: value,
        webgl2: value,
        webgl: value,
        canvas2d: "hardware",
      }) as BackendsSupport;
    expect(autoPick(all("hardware"))).toBe("webgpu");
    expect(autoPick(all("software"))).toBe("canvas2d");
    expect(autoPick({ ...all("missing"), webgl: "hardware" })).toBe("webgl");
  });
});

describe("RendererBar", () => {
  it("switches every chart and flags the backends of this browser", async () => {
    const user = userEvent.setup();
    render(
      <SiteProviders>
        <RendererBar value="auto" />
      </SiteProviders>,
    );
    const group = screen.getByRole("radiogroup", { name: "Chart renderer" });
    expect(group).toBeInTheDocument();
    expect(
      await screen.findByText(/Auto picks/, { selector: "[role=status]" }),
    ).toHaveTextContent("Auto picks WebGL2 on this device");
    const webgpu = screen.getByRole("radio", { name: /WebGPU/ });
    expect(webgpu).toBeDisabled();
    expect(webgpu).toHaveAccessibleDescription(
      "WebGPU is not available in this browser",
    );
    expect(
      screen.getByRole("radio", { name: /^WebGL$/ }),
    ).toHaveAccessibleDescription(/software GPU/);
    await user.click(screen.getByRole("radio", { name: "Canvas2D" }));
    expect(getDefaultChartRenderer()).toBe("canvas2d");
    expect(localStorage.getItem(RENDERER_STORAGE_KEY)).toBe("canvas2d");
  });

  it("describes a forced backend", async () => {
    render(
      <SiteProviders>
        <RendererBar value="webgl" />
      </SiteProviders>,
    );
    expect(
      await screen.findByText(/Every chart uses/, {
        selector: "[role=status]",
      }),
    ).toHaveTextContent("Every chart uses WebGL (software GPU: slow)");
  });

  it("resets a stored backend this browser lacks", async () => {
    setChartRenderer("webgpu");
    render(
      <SiteProviders>
        <RendererBar value="webgpu" />
      </SiteProviders>,
    );
    await waitFor(() => expect(getDefaultChartRenderer()).toBe("auto"));
    expect(localStorage.getItem(RENDERER_STORAGE_KEY)).toBeNull();
  });
});

describe("RendererBadge", () => {
  const Harness = ({
    requested,
    children,
  }: {
    requested: "auto" | "webgpu" | "webgl2";
    children?: React.ReactNode;
  }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    return (
      <SiteProviders>
        <div ref={ref} data-testid="preview">
          {children}
        </div>
        <RendererBadge targetRef={ref} requested={requested} />
      </SiteProviders>
    );
  };

  it("shows the backends in use and follows their changes", async () => {
    const { container } = render(
      <Harness requested="auto">
        <div className="minerva-chart" data-renderer="webgl2" />
        <div className="minerva-chart" data-renderer="webgl2" />
        <div className="minerva-chart minerva-shape-chart" />
      </Harness>,
    );
    const badge = () => container.querySelector("[data-renderer-badge]");
    await waitFor(() =>
      expect(badge()).toHaveTextContent("RendererWebGL2 ×2Canvas2D"),
    );
    expect(badge()).toHaveAttribute("data-renderer-badge", "webgl2 canvas2d");
    expect(badge()?.getAttribute("title")).toMatch(/Shape charts/);

    const preview = screen.getByTestId("preview");
    act(() => {
      preview.querySelectorAll("[data-renderer]").forEach((el) => {
        (el as HTMLElement).dataset.renderer = "webgl";
      });
    });
    await waitFor(() => expect(badge()).toHaveTextContent("WebGL ×2"));
  });

  it("flags a fallback and hides without charts", async () => {
    const { container, rerender } = render(
      <Harness requested="webgpu">
        <div className="minerva-chart" data-renderer="webgl2" />
      </Harness>,
    );
    await waitFor(() =>
      expect(container.querySelector("[data-fallback]")).toBeInTheDocument(),
    );
    expect(
      container.querySelector("[data-renderer-badge]")?.getAttribute("title"),
    ).toMatch(/WebGPU could not start here: fell back to WebGL2/);

    rerender(<Harness requested="webgpu" />);
    await waitFor(() =>
      expect(
        container.querySelector("[data-renderer-badge]"),
      ).not.toBeInTheDocument(),
    );
  });
});

describe("DemoBlock", () => {
  it("keeps its preview mounted when the page renderer changes (charts switch live)", () => {
    const mounted = vi.fn();
    const Demo = () => {
      useEffect(() => {
        mounted();
      }, []);
      return <p>demo</p>;
    };
    const Page = ({ renderer }: { renderer: "auto" | "webgl" }) => (
      <SiteProviders>
        <ChartRendererContext.Provider value={renderer}>
          <DemoBlock id="demo-x" title="X" source="">
            <Demo />
          </DemoBlock>
        </ChartRendererContext.Provider>
      </SiteProviders>
    );
    const { rerender } = render(<Page renderer="auto" />);
    expect(mounted).toHaveBeenCalledTimes(1);
    rerender(<Page renderer="auto" />);
    expect(mounted).toHaveBeenCalledTimes(1);
    rerender(<Page renderer="webgl" />);
    expect(mounted).toHaveBeenCalledTimes(1);
  });
});
