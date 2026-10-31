import { afterEach, describe, expect, it, vi } from "vitest";
import { drawIcon } from "./canvas2d";
import { parseColor, resolveColor } from "./color";
import {
  getDefaultIconRenderer,
  setDefaultIconRenderer,
  subscribeDefaultIconRenderer,
} from "./defaults";
import { defineIcon } from "./define";
import { createIconCanvas } from "./icon-canvas";
import { searchIcon } from "./icons";
import { createIconSurface } from "./surface";
import { toSvg, toSvgDataUri } from "./svg";

/** 2D context double recording the drawing calls */
const fake2d = () => {
  const calls: { name: string; args: unknown[] }[] = [];
  const state: Record<string, unknown> = { globalAlpha: 1 };
  const ctx = new Proxy(state, {
    get: (target, key: string) => {
      if (key in target) return target[key];
      return (...args: unknown[]) => {
        calls.push({ name: key, args });
      };
    },
    set: (target, key: string, value) => {
      target[key] = value;
      calls.push({ name: `set:${key}`, args: [value] });
      return true;
    },
  });
  return {
    ctx,
    calls,
    named: (name: string) => calls.filter((c) => c.name === name),
  };
};

const flushFrames = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => setTimeout(resolve, 0)),
  );

afterEach(() => {
  vi.restoreAllMocks();
  setDefaultIconRenderer("auto");
  document.body.innerHTML = "";
});

describe("toSvg", () => {
  it("renders a standalone, decorative SVG by default", () => {
    const svg = toSvg(searchIcon);
    expect(svg).toMatch(
      /^<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="24" height="24" viewBox="0 0 24 24"/,
    );
    expect(svg).toContain('stroke="currentColor"');
    expect(svg).toContain('stroke-linecap="round"');
    expect(svg).toContain('aria-hidden="true"');
    expect(svg.match(/<path /g)).toHaveLength(searchIcon.paths.length);
  });

  it("labels, sizes and escapes", () => {
    const svg = toSvg(searchIcon, {
      size: "1em",
      color: "#f00",
      strokeWidth: 1.5,
      title: 'Find "<all>"',
      className: "a b",
      attributes: { "data-x": "1&2", "bad attr": "x" },
    });
    expect(svg).toContain('role="img"');
    expect(svg).toContain("<title>Find &quot;&lt;all&gt;&quot;</title>");
    expect(svg).toContain('width="1em"');
    expect(svg).toContain('stroke-width="1.5"');
    expect(svg).toContain('class="a b"');
    expect(svg).toContain('data-x="1&amp;2"');
    expect(svg).not.toContain("bad attr");
    expect(svg).not.toContain("aria-hidden");
  });

  it("encodes data URIs with an explicit color", () => {
    const uri = toSvgDataUri(searchIcon);
    expect(uri.startsWith("data:image/svg+xml,")).toBe(true);
    expect(decodeURIComponent(uri)).toContain('stroke="#000"');
  });
});

describe("colors", () => {
  it("parses hex, rgb and hsl", () => {
    expect(parseColor("#f80")).toEqual([1, 0x88 / 255, 0, 1]);
    expect(parseColor("#ff880080")).toEqual([1, 0x88 / 255, 0, 0x80 / 255]);
    expect(parseColor("rgb(255, 0, 0)")).toEqual([1, 0, 0, 1]);
    expect(parseColor("rgb(255 0 0 / 50%)")).toEqual([1, 0, 0, 0.5]);
    expect(parseColor("rgba(0,0,255,0.25)")).toEqual([0, 0, 1, 0.25]);
    const [r, g, b] = parseColor("hsl(120 100% 50%)")!;
    expect([r, g, b].map((v) => Math.round(v * 255))).toEqual([0, 255, 0]);
    expect(parseColor("transparent")).toEqual([0, 0, 0, 0]);
    expect(parseColor("nonsense")).toBeNull();
    expect(parseColor("#12")).toBeNull();
  });

  it("reads currentColor and CSS variables on the element", () => {
    const el = document.createElement("div");
    el.style.color = "rgb(0, 128, 0)";
    el.style.setProperty("--accent", "#0000ff");
    document.body.appendChild(el);
    expect(resolveColor("currentColor", el)).toEqual([0, 128 / 255, 0, 1]);
    expect(resolveColor(undefined, el)).toEqual([0, 128 / 255, 0, 1]);
    expect(resolveColor("var(--accent)", el)).toEqual([0, 0, 1, 1]);
    expect(resolveColor("var(--missing, #ff0000)", el)).toEqual([1, 0, 0, 1]);
  });
});

describe("default renderer", () => {
  it("notifies listeners of changes only", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeDefaultIconRenderer(listener);
    setDefaultIconRenderer("webgl2");
    setDefaultIconRenderer("webgl2");
    expect(getDefaultIconRenderer()).toBe("webgl2");
    expect(listener).toHaveBeenCalledTimes(1);
    setDefaultIconRenderer("bogus" as never);
    expect(getDefaultIconRenderer()).toBe("auto");
    unsubscribe();
    setDefaultIconRenderer("webgl");
    expect(listener).toHaveBeenCalledTimes(2);
  });
});

describe("defineIcon", () => {
  it("validates and freezes custom icons", () => {
    const icon = defineIcon({
      name: "my-icon",
      paths: ["M4 4h16"],
      tags: ["x"],
    });
    expect(Object.isFrozen(icon)).toBe(true);
    expect(Object.isFrozen(icon.paths)).toBe(true);
    expect(() => defineIcon({ name: "My Icon", paths: ["M0 0"] })).toThrow(
      TypeError,
    );
    expect(() => defineIcon({ name: "empty", paths: [] })).toThrow(TypeError);
    expect(() => defineIcon({ name: "bad", paths: ["M0 0L"] })).toThrow(
      SyntaxError,
    );
  });
});

describe("drawIcon", () => {
  it("strokes the whole icon once, placed, scaled and rotated", () => {
    const { ctx, named } = fake2d();
    drawIcon(ctx as unknown as CanvasRenderingContext2D, searchIcon, {
      x: 10,
      y: 20,
      size: 48,
      rotation: 90,
      color: "red",
      opacity: 0.5,
    });
    expect(named("translate")[0]?.args).toEqual([34, 44]);
    expect(named("scale")[0]?.args).toEqual([2, 2]);
    expect(named("rotate")[0]?.args).toEqual([Math.PI / 2]);
    expect(named("stroke")).toHaveLength(1);
    expect(named("set:strokeStyle")[0]?.args).toEqual(["red"]);
    expect(named("set:lineCap")[0]?.args).toEqual(["round"]);
    expect(named("set:globalAlpha")[0]?.args).toEqual([0.5]);
    expect(named("restore")).toHaveLength(1);
  });

  it("flattens the paths where Path2D is missing", () => {
    vi.stubGlobal("Path2D", undefined);
    const { ctx, named } = fake2d();
    drawIcon(ctx as unknown as CanvasRenderingContext2D, searchIcon);
    expect(named("lineTo").length).toBeGreaterThan(10);
    expect(named("stroke")).toHaveLength(1);
    vi.unstubAllGlobals();
  });
});

describe("createIconCanvas", () => {
  const with2d = () => {
    const fake = fake2d();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(((
      kind: string,
    ) =>
      kind === "2d"
        ? fake.ctx
        : null) as unknown as HTMLCanvasElement["getContext"]);
    return fake;
  };

  it("draws every item and reports the backend on the container", async () => {
    const fake = with2d();
    const container = document.createElement("div");
    document.body.appendChild(container);
    const onRendererChange = vi.fn();
    const controller = createIconCanvas(container, {
      width: 100,
      height: 50,
      pixelRatio: 2,
      items: [
        { icon: searchIcon, x: 0, y: 0 },
        { icon: searchIcon, x: 30, y: 0, color: "#f00" },
      ],
      onRendererChange,
    });
    expect(await controller.ready()).toBe("canvas2d");
    expect(container.dataset.renderer).toBe("canvas2d");
    expect(onRendererChange).toHaveBeenCalledWith("canvas2d");
    expect(controller.canvas.width).toBe(200);
    expect(controller.canvas.style.width).toBe("100px");
    expect(fake.named("stroke")).toHaveLength(2);

    controller.setItems([{ icon: searchIcon, x: 0, y: 0 }]);
    await flushFrames();
    expect(fake.named("stroke")).toHaveLength(3);

    controller.destroy();
    expect(container.dataset.renderer).toBeUndefined();
    expect(container.querySelector("canvas")).toBeNull();
  });

  it("restarts when the global default changes", async () => {
    with2d();
    const container = document.createElement("div");
    const controller = createIconCanvas(container, { width: 10, height: 10 });
    await controller.ready();
    const before = controller.canvas;
    setDefaultIconRenderer("canvas2d");
    await controller.ready();
    expect(controller.canvas).not.toBe(before);
    expect(container.querySelectorAll("canvas")).toHaveLength(1);
    controller.destroy();
  });
});

describe("createIconSurface", () => {
  it("draws a single icon into its canvas with Canvas2D", async () => {
    const fake = fake2d();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(((
      kind: string,
    ) =>
      kind === "2d"
        ? fake.ctx
        : null) as unknown as HTMLCanvasElement["getContext"]);
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const onRendererChange = vi.fn();
    const surface = createIconSurface(canvas, {
      icon: searchIcon,
      size: 20,
      pixelRatio: 2,
      renderer: "canvas2d",
      onRendererChange,
    });
    await vi.waitFor(() => expect(surface.renderer).toBe("canvas2d"));
    expect(canvas.width).toBe(40);
    expect(canvas.dataset.renderer).toBe("canvas2d");
    expect(onRendererChange).toHaveBeenCalledWith("canvas2d");
    expect(fake.named("stroke")).toHaveLength(1);
    surface.update({
      icon: searchIcon,
      size: 32,
      pixelRatio: 1,
      renderer: "canvas2d",
    });
    await flushFrames();
    expect(canvas.width).toBe(32);
    surface.destroy();
  });
});
