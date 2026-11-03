// @vitest-environment happy-dom
// The icon pages: their renderer bar, the gallery filters and canvas mode,
// and the canvas icon / icon canvas demos reporting the backend that drew
// them (Canvas2D here: happy-dom has no GPU, the 2D context is faked).
import { act, render, screen, waitFor, within } from "@testing-library/react";
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
import { setDefaultIconRenderer } from "minerva-design/icons";
import { SiteProviders, setupI18n } from "../test/utils";
import VueDemo from "./components/VueDemo";
import { getDocPage } from "./registry";
import { RENDERER_CATEGORIES } from "./renderer/context";
import RendererScope from "./renderer/RendererScope";
import { resetChartRenderer } from "./renderer/store";
import { vueDemosOf } from "./vueDemos";
import { loadWcDemos } from "./wcDemos";
import Gallery from "./pages/icons/demos/gallery";
import IconCanvasDemo from "./pages/icon/demos/canvas";
import IconCanvasRenderers from "./pages/icon-canvas/demos/renderers";

vi.mock("./renderer/support", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./renderer/support")>()),
  probeBackends: () =>
    Promise.resolve({
      webgpu: "missing",
      webgl2: "missing",
      webgl: "missing",
      canvas2d: "hardware",
    }),
}));

const fake2d = () => {
  const ctx = new Proxy({ globalAlpha: 1 } as Record<string, unknown>, {
    get: (target, key: string) => (key in target ? target[key] : () => {}),
    set: (target, key: string, value) => {
      target[key] = value;
      return true;
    },
  });
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(((
    kind: string,
  ) =>
    kind === "2d" ? ctx : null) as unknown as HTMLCanvasElement["getContext"]);
};

beforeAll(setupI18n);
beforeEach(() => {
  fake2d();
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(256);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(160);
});
afterEach(() => {
  resetChartRenderer();
  setDefaultIconRenderer("auto");
});

const show = (content: React.ReactNode) => {
  const result = render(<SiteProviders>{content}</SiteProviders>);
  return { ...result, user: userEvent.setup() };
};

describe.each(["icons", "icon", "icon-canvas", "icons-core"])(
  "%s page",
  (id) => {
    it("gets the icon renderer bar with its five choices", async () => {
      const category = getDocPage(id)?.category;
      expect(category).toBe("icons");
      expect(RENDERER_CATEGORIES).toContain(category);
      show(
        <RendererScope topic="icons">
          <p>content</p>
        </RendererScope>,
      );
      const group = screen.getByRole("radiogroup", { name: "Icon renderer" });
      expect(within(group).getAllByRole("radio")).toHaveLength(5);
    });
  },
);

describe("icon gallery", () => {
  const icons = (root: HTMLElement) =>
    root.querySelectorAll("svg.minerva-icon");

  const pick = async (
    user: ReturnType<typeof userEvent.setup>,
    label: string,
    option: string,
  ) => {
    await user.click(screen.getByRole("combobox", { name: label }));
    await user.click(await screen.findByRole("option", { name: option }));
  };

  it("shows the whole set and keeps the own colors of multicolor icons", () => {
    const { container } = show(<Gallery />);
    expect(icons(container).length).toBeGreaterThan(150);
    const colored = container.querySelectorAll("svg.minerva-icon path[stroke]");
    expect(colored.length).toBeGreaterThan(0);
    expect(colored[0]!.getAttribute("stroke")).toMatch(/^#/);
  });

  it("filters by kind and recolors the monochrome icons", async () => {
    const { container, user } = show(<Gallery />);
    const all = icons(container).length;
    await pick(user, "Kind", "Multicolor");
    const multicolor = icons(container).length;
    expect(multicolor).toBeGreaterThan(0);
    expect(multicolor).toBeLessThan(all);
    for (const svg of icons(container)) {
      expect(svg.querySelector("path[stroke]")).not.toBeNull();
    }
    await pick(user, "Kind", "Monochrome");
    expect(icons(container)).toHaveLength(all - multicolor);
    expect(
      container.querySelectorAll("svg.minerva-icon path[stroke]"),
    ).toHaveLength(0);
    await pick(user, "Color", "Primary");
    expect(icons(container)[0]).toHaveAttribute(
      "stroke",
      "var(--primary-color)",
    );
  });

  it("draws every tile on a canvas in canvas mode", async () => {
    const { container, user } = show(<Gallery />);
    const count = icons(container).length;
    await user.click(screen.getByRole("radio", { name: "Canvas" }));
    const canvases = container.querySelectorAll<HTMLCanvasElement>(
      "canvas.minerva-icon",
    );
    expect(canvases).toHaveLength(count);
    expect(icons(container)).toHaveLength(0);
    await waitFor(() =>
      expect(
        new Set([...canvases].map((canvas) => canvas.dataset.renderer)),
      ).toEqual(new Set(["canvas2d"])),
    );
  });
});

it("icon canvas demo: one SVG and five canvases, each reporting its backend", async () => {
  const { container } = show(<IconCanvasDemo />);
  expect(container.querySelectorAll("svg.minerva-icon")).toHaveLength(1);
  const canvases = container.querySelectorAll<HTMLCanvasElement>(
    "canvas.minerva-icon",
  );
  expect(canvases).toHaveLength(5);
  // no GPU here: the forced GPU backends fall back, the canvas2d one keeps it
  await waitFor(() =>
    expect([...canvases].map((canvas) => canvas.dataset.renderer)).toEqual(
      Array(5).fill("canvas2d"),
    ),
  );
  expect(screen.getAllByText("canvas2d").length).toBeGreaterThanOrEqual(5);
});

it("icon-canvas renderers demo: one panel per backend, each drawn", async () => {
  const { container } = show(<IconCanvasRenderers />);
  const panels = container.querySelectorAll<HTMLElement>(
    ".minerva-icon-canvas",
  );
  expect(panels).toHaveLength(4);
  await waitFor(() => {
    for (const panel of panels) expect(panel.dataset.renderer).toBe("canvas2d");
  });
});

describe("other frameworks", () => {
  it("Vue icon canvas demo: five canvases, the forced canvas2d one reports it", async () => {
    const { container } = show(<VueDemo demo={vueDemosOf("icon").canvas!} />);
    await waitFor(
      () =>
        expect(container.querySelectorAll("canvas.minerva-icon")).toHaveLength(
          5,
        ),
      { timeout: 10000 },
    );
    const canvases = container.querySelectorAll<HTMLCanvasElement>(
      "canvas.minerva-icon",
    );
    await waitFor(() => expect(canvases[4]!.dataset.renderer).toBe("canvas2d"));
  });

  it("Vue icon canvas: the status names the backend that drew", async () => {
    show(<VueDemo demo={vueDemosOf("icon-canvas").basic!} />);
    const status = await screen.findByRole("status", {}, { timeout: 10000 });
    await waitFor(() =>
      expect(status).toHaveTextContent("Drawn with canvas2d"),
    );
  });

  it("Web Components icon canvas demo: five canvas icons with their renderers", async () => {
    const demo = (await loadWcDemos("icon")).canvas!;
    const root = document.createElement("div");
    root.innerHTML = demo.html;
    document.body.append(root);
    let cleanup: unknown;
    await act(async () => {
      cleanup = demo.setup?.(root);
    });
    const icons = root.querySelectorAll("minerva-icon[renderer]");
    expect([...icons].map((icon) => icon.getAttribute("renderer"))).toEqual([
      "auto",
      "webgpu",
      "webgl2",
      "webgl",
      "canvas2d",
    ]);
    if (typeof cleanup === "function") cleanup();
    root.remove();
  });
});
