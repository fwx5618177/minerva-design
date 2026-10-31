// <minerva-icon> and <minerva-icon-canvas> on the real icon core, with a
// recording 2D context standing in for the canvas (happy-dom has none; the
// GPU backends are exercised in the browser): SVG output and accessibility,
// canvas mode through createIconSurface, and the createIconCanvas lifecycle.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { IconCanvasItem } from "minerva-design/icons/core";
import type { MinervaIconCanvas } from "./icon-canvas";

vi.mock("minerva-design/icons/core", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("minerva-design/icons/core")>();
  return {
    ...actual,
    createIconSurface: vi.fn(actual.createIconSurface),
    createIconCanvas: vi.fn(actual.createIconCanvas),
  };
});

const core = await import("minerva-design/icons/core");
const { MinervaIcon } = await import("../../elements/icon");
const { $, mount, settle } = await import("../../../tests/utils");

const createIconSurface = vi.mocked(core.createIconSurface);
const createIconCanvas = vi.mocked(core.createIconCanvas);

/** 2D context double recording the drawing calls */
const fake2d = () => {
  const calls: string[] = [];
  const state: Record<string, unknown> = { globalAlpha: 1 };
  const ctx = new Proxy(state, {
    get: (target, key: string) =>
      key in target ? target[key] : () => calls.push(key),
    set: (target, key: string, value) => {
      target[key] = value;
      return true;
    },
  });
  return { ctx, calls };
};

let drawing: ReturnType<typeof fake2d>;
let listening: AbortController;

/** Details of the minerva-renderer-change events reaching the document */
const rendererChanges = () => {
  const details: unknown[] = [];
  document.addEventListener(
    "minerva-renderer-change",
    (event) => details.push((event as CustomEvent).detail),
    { signal: listening.signal },
  );
  return details;
};

beforeEach(() => {
  listening = new AbortController();
  drawing = fake2d();
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(((
    kind: string,
  ) =>
    kind === "2d"
      ? drawing.ctx
      : null) as unknown as HTMLCanvasElement["getContext"]);
});

afterEach(() => {
  listening.abort();
  document.body.innerHTML = "";
  vi.restoreAllMocks();
  createIconSurface.mockClear();
  createIconCanvas.mockClear();
  core.setDefaultIconRenderer("auto");
});

describe("<minerva-icon> (SVG)", () => {
  it("renders the named icon as a decorative inline SVG", async () => {
    const el = await mount<InstanceType<typeof MinervaIcon>>(
      `<minerva-icon name="search"></minerva-icon>`,
    );
    expect(el).toBeInstanceOf(MinervaIcon);
    const svg = $(el, "svg[part=icon]");
    expect(svg.getAttribute("viewBox")).toBe("0 0 24 24");
    expect(svg.getAttribute("width")).toBe("24");
    expect(svg.getAttribute("height")).toBe("24");
    expect(svg.getAttribute("fill")).toBe("none");
    expect(svg.getAttribute("stroke")).toBe("currentColor");
    expect(svg.getAttribute("stroke-width")).toBe("2");
    expect(svg.getAttribute("stroke-linecap")).toBe("round");
    expect(svg.getAttribute("stroke-linejoin")).toBe("round");
    expect(svg.getAttribute("data-icon")).toBe("search");
    expect(svg.getAttribute("aria-hidden")).toBe("true");
    expect(svg.hasAttribute("role")).toBe(false);
    expect(svg.querySelector("title")).toBeNull();
    const paths = [...svg.querySelectorAll("path")];
    expect(paths.map((p) => p.getAttribute("d"))).toEqual([
      ...core.searchIcon.paths,
    ]);
    expect(paths[0]!.hasAttribute("vector-effect")).toBe(false);
    expect(createIconSurface).not.toHaveBeenCalled();
    expect(el.hasAttribute("data-renderer")).toBe(false);
    expect(el.getRenderer()).toBeNull();
  });

  it("applies size, color and stroke width", async () => {
    const el = await mount(
      `<minerva-icon name="search" size="32" color="#f00" stroke-width="1.5" absolute-stroke-width></minerva-icon>`,
    );
    const svg = $(el, "svg");
    expect(svg.getAttribute("width")).toBe("32");
    expect(svg.getAttribute("height")).toBe("32");
    expect(svg.getAttribute("stroke")).toBe("#f00");
    expect(svg.getAttribute("stroke-width")).toBe("1.5");
    for (const path of svg.querySelectorAll("path")) {
      expect(path.getAttribute("vector-effect")).toBe("non-scaling-stroke");
    }
  });

  it("is an image named by its label", async () => {
    const el = await mount(
      `<minerva-icon name="search" label="Search"></minerva-icon>`,
    );
    const svg = $(el, "svg");
    expect(svg.getAttribute("role")).toBe("img");
    expect(svg.getAttribute("aria-label")).toBe("Search");
    expect(svg.hasAttribute("aria-hidden")).toBe(false);
    expect(svg.querySelector("title")?.textContent).toBe("Search");
  });

  it("draws the icon property over the name (custom icons)", async () => {
    const custom = core.defineIcon({
      name: "custom-dot",
      paths: ["M12 12h.01", "M4 4h16"],
    });
    const el = await mount<InstanceType<typeof MinervaIcon>>(
      `<minerva-icon name="search"></minerva-icon>`,
    );
    el.icon = custom;
    await settle();
    const svg = $(el, "svg");
    expect(svg.getAttribute("data-icon")).toBe("custom-dot");
    expect(
      [...svg.querySelectorAll("path")].map((p) => p.getAttribute("d")),
    ).toEqual(["M12 12h.01", "M4 4h16"]);
  });

  it("renders nothing for an unknown name", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await mount(`<minerva-icon name="no-such-icon"></minerva-icon>`);
    expect(el.shadowRoot!.querySelector("svg, canvas")).toBeNull();
    expect(error).toHaveBeenCalledWith(
      expect.stringContaining('unknown icon name "no-such-icon"'),
    );
  });
});

describe("<minerva-icon> (canvas)", () => {
  it("draws on a canvas through createIconSurface and reports the backend", async () => {
    const changes = rendererChanges();
    const el = await mount<InstanceType<typeof MinervaIcon>>(
      `<minerva-icon name="search" size="48" stroke-width="3" absolute-stroke-width color="#00f" renderer="canvas2d" label="Search"></minerva-icon>`,
    );
    expect(el.shadowRoot!.querySelector("svg")).toBeNull();
    const canvas = $<HTMLCanvasElement>(el, "canvas[part=icon]");
    expect(canvas.style.width).toBe("48px");
    expect(canvas.style.height).toBe("48px");
    expect(canvas.getAttribute("role")).toBe("img");
    expect(canvas.getAttribute("aria-label")).toBe("Search");
    expect(createIconSurface).toHaveBeenCalledTimes(1);
    expect(createIconSurface.mock.calls[0]![0]).toBe(canvas);
    expect(createIconSurface.mock.calls[0]![1]).toMatchObject({
      icon: core.searchIcon,
      size: 48,
      color: "#00f",
      strokeWidth: (3 * 24) / 48,
      renderer: "canvas2d",
    });
    await vi.waitFor(() =>
      expect(el.getAttribute("data-renderer")).toBe("canvas2d"),
    );
    expect(el.getRenderer()).toBe("canvas2d");
    expect(changes).toEqual([{ renderer: "canvas2d" }]);
    expect(drawing.calls).toContain("stroke");

    const surface = createIconSurface.mock.results[0]!.value as ReturnType<
      typeof core.createIconSurface
    >;
    const update = vi.spyOn(surface, "update");
    const destroy = vi.spyOn(surface, "destroy");
    el.size = 20;
    await settle();
    expect(createIconSurface).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({ size: 20, strokeWidth: (3 * 24) / 20 }),
    );

    el.remove();
    expect(destroy).toHaveBeenCalledTimes(1);
    expect(el.hasAttribute("data-renderer")).toBe(false);
  });

  it("goes back to SVG and releases the surface", async () => {
    const el = await mount<InstanceType<typeof MinervaIcon>>(
      `<minerva-icon name="search" renderer="canvas2d"></minerva-icon>`,
    );
    await vi.waitFor(() =>
      expect(el.getAttribute("data-renderer")).toBe("canvas2d"),
    );
    const surface = createIconSurface.mock.results[0]!.value as ReturnType<
      typeof core.createIconSurface
    >;
    const destroy = vi.spyOn(surface, "destroy");
    el.renderer = "svg";
    await settle();
    expect(destroy).toHaveBeenCalledTimes(1);
    expect(el.hasAttribute("data-renderer")).toBe(false);
    expect($(el, "svg")).toBeTruthy();
  });
});

describe("<minerva-icon-canvas>", () => {
  const items: IconCanvasItem[] = [
    { icon: core.searchIcon, x: 0, y: 0 },
    { icon: core.searchIcon, x: 30, y: 0, color: "#f00", size: 16 },
  ];

  it("draws its items with createIconCanvas and is released on disconnect", async () => {
    const changes = rendererChanges();
    const el = document.createElement(
      "minerva-icon-canvas",
    ) as MinervaIconCanvas;
    el.items = items;
    el.setAttribute("width", "100");
    el.setAttribute("height", "50");
    el.setAttribute("pixel-ratio", "2");
    el.setAttribute("renderer", "canvas2d");
    el.setAttribute("label", "Map");
    document.body.appendChild(el);
    await settle();

    const surface = $(el, "[part=surface]");
    expect(surface.getAttribute("role")).toBe("img");
    expect(surface.getAttribute("aria-label")).toBe("Map");
    expect(surface.style.width).toBe("100px");
    expect(surface.style.height).toBe("50px");
    expect(createIconCanvas).toHaveBeenCalledTimes(1);
    expect(createIconCanvas.mock.calls[0]![0]).toBe(surface);
    expect(createIconCanvas.mock.calls[0]![1]).toMatchObject({
      items,
      renderer: "canvas2d",
      pixelRatio: 2,
    });

    expect(await el.ready()).toBe("canvas2d");
    expect(el.getAttribute("data-renderer")).toBe("canvas2d");
    expect(el.getRenderer()).toBe("canvas2d");
    expect(el.canvas).toBeInstanceOf(HTMLCanvasElement);
    expect(el.canvas!.parentElement).toBe(surface);
    expect(changes).toEqual([{ renderer: "canvas2d" }]);

    const controller = createIconCanvas.mock.results[0]!.value as ReturnType<
      typeof core.createIconCanvas
    >;
    const setItems = vi.spyOn(controller, "setItems");
    const setOptions = vi.spyOn(controller, "setOptions");
    const destroy = vi.spyOn(controller, "destroy");
    const next = [items[0]!];
    el.items = next;
    await settle();
    expect(setItems).toHaveBeenCalledWith(next);
    expect(setOptions).not.toHaveBeenCalled();
    el.width = "50%";
    await settle();
    expect(surface.style.width).toBe("50%");
    expect(setOptions).not.toHaveBeenCalled();
    el.pixelRatio = 1;
    await settle();
    expect(setOptions).toHaveBeenCalledWith({
      renderer: "canvas2d",
      pixelRatio: 1,
    });

    el.remove();
    expect(destroy).toHaveBeenCalledTimes(1);
    expect(el.hasAttribute("data-renderer")).toBe(false);
    expect(el.canvas).toBeNull();
    await expect(el.ready()).rejects.toThrow(/not connected/);
  });

  it("is hidden from assistive technologies without a label", async () => {
    const el = await mount(`<minerva-icon-canvas></minerva-icon-canvas>`);
    const surface = $(el, "[part=surface]");
    expect(surface.getAttribute("aria-hidden")).toBe("true");
    // React IconCanvas defaults: 100% × 240 pixels
    expect(surface.style.width).toBe("100%");
    expect(surface.style.height).toBe("240px");
    expect(createIconCanvas.mock.calls[0]![1]).toMatchObject({
      items: [],
      renderer: "auto",
    });
  });
});
