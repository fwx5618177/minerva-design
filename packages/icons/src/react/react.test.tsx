import { act, render } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ArrowUpIcon,
  DynamicIcon,
  Icon,
  IconCanvas,
  SearchIcon,
  createIcon,
  defineIcon,
  searchIcon,
  setDefaultIconRenderer,
  type IconCanvasHandle,
} from "../index";

const fake2d = () => {
  const strokes: unknown[] = [];
  const ctx = new Proxy({ globalAlpha: 1 } as Record<string, unknown>, {
    get: (target, key: string) =>
      key in target
        ? target[key]
        : (...args: unknown[]) => {
            if (key === "stroke") strokes.push(args);
          },
    set: (target, key: string, value) => {
      target[key] = value;
      return true;
    },
  });
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(((
    kind: string,
  ) =>
    kind === "2d" ? ctx : null) as unknown as HTMLCanvasElement["getContext"]);
  return strokes;
};

afterEach(() => {
  vi.restoreAllMocks();
  setDefaultIconRenderer("auto");
});

describe("Icon (SVG)", () => {
  it("server-renders a decorative inline SVG", () => {
    const html = renderToString(<SearchIcon />);
    expect(html).toMatch(
      /^<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-icon="search" aria-hidden="true" class="minerva-icon">/,
    );
    expect(html.match(/<path /g)).toHaveLength(searchIcon.paths.length);
  });

  it("is labelled by title or aria-label", () => {
    const titled = renderToString(<Icon icon={searchIcon} title="Search" />);
    expect(titled).toContain('role="img"');
    expect(titled).toContain("<title>Search</title>");
    expect(titled).not.toContain("aria-hidden");
    const labelled = renderToString(<ArrowUpIcon aria-label="Up" />);
    expect(labelled).toContain('role="img"');
  });

  it("passes size, color, stroke, class and DOM props", () => {
    const ref = createRef<SVGSVGElement | HTMLCanvasElement>();
    const onClick = vi.fn();
    const { container } = render(
      <SearchIcon
        ref={ref}
        size="1.5em"
        color="red"
        strokeWidth={1.5}
        absoluteStrokeWidth
        className="extra"
        onClick={onClick}
        data-testid="icon"
      />,
    );
    const svg = container.querySelector("svg")!;
    expect(ref.current).toBe(svg);
    expect(svg.getAttribute("width")).toBe("1.5em");
    expect(svg.getAttribute("stroke")).toBe("red");
    expect(svg.getAttribute("stroke-width")).toBe("1.5");
    expect(svg.getAttribute("class")).toBe("minerva-icon extra");
    expect(svg.querySelector("path")?.getAttribute("vector-effect")).toBe(
      "non-scaling-stroke",
    );
    svg.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(onClick).toHaveBeenCalled();
  });

  it("creates components for custom icons and resolves names", () => {
    const Sparkle = createIcon(
      defineIcon({ name: "sparkle", paths: ["M12 3v18", "M3 12h18"] }),
    );
    expect(Sparkle.displayName).toBe("SparkleIcon");
    expect(renderToString(<Sparkle />)).toContain('data-icon="sparkle"');
    expect(renderToString(<DynamicIcon name="arrow-up" />)).toContain(
      'data-icon="arrow-up"',
    );
    expect(renderToString(<DynamicIcon name="nope" />)).toBe("");
  });
});

describe("Icon (canvas)", () => {
  it("server-renders an empty canvas of the right size", () => {
    const html = renderToString(
      <SearchIcon renderer="webgl2" size={32} title="Search" />,
    );
    expect(html).toContain("<canvas");
    expect(html).toContain("width:32px");
    expect(html).toContain('aria-label="Search"');
    expect(html).toContain('role="img"');
  });

  it("draws with the shared backend and reports it", async () => {
    const strokes = fake2d();
    const onRendererChange = vi.fn();
    const ref = createRef<SVGSVGElement | HTMLCanvasElement>();
    const { container, unmount } = render(
      <SearchIcon
        ref={ref}
        renderer="canvas2d"
        size={20}
        onRendererChange={onRendererChange}
      />,
    );
    const canvas = container.querySelector("canvas")!;
    expect(ref.current).toBe(canvas);
    await vi.waitFor(() =>
      expect(onRendererChange).toHaveBeenCalledWith("canvas2d"),
    );
    expect(canvas.dataset.renderer).toBe("canvas2d");
    expect(strokes.length).toBeGreaterThan(0);
    unmount();
  });
});

describe("IconCanvas", () => {
  it("server-renders its sized container", () => {
    const html = renderToString(
      <IconCanvas items={[]} height={120} title="Icons" />,
    );
    expect(html).toContain('role="img"');
    expect(html).toContain("height:120px");
    expect(html).toContain('class="minerva-icon-canvas"');
  });

  it("draws the items, follows the default renderer and exposes a handle", async () => {
    const strokes = fake2d();
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(200);
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(100);
    const ref = createRef<IconCanvasHandle>();
    const onRendererChange = vi.fn();
    const items = [
      { icon: searchIcon, x: 0, y: 0 },
      { icon: searchIcon, x: 40, y: 0, size: 32 },
    ];
    const { container, rerender, unmount } = render(
      <IconCanvas
        ref={ref}
        items={items}
        onRendererChange={onRendererChange}
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    await act(async () => {
      expect(await ref.current!.ready()).toBe("canvas2d");
    });
    expect(root.dataset.renderer).toBe("canvas2d");
    expect(ref.current!.getRenderer()).toBe("canvas2d");
    expect(ref.current!.getCanvas()).toBe(root.querySelector("canvas"));
    expect(strokes).toHaveLength(2);
    expect(onRendererChange).toHaveBeenCalledWith("canvas2d");

    rerender(
      <IconCanvas
        ref={ref}
        items={items.slice(0, 1)}
        onRendererChange={onRendererChange}
      />,
    );
    await act(async () => {
      await ref.current!.ready();
    });
    expect(strokes).toHaveLength(3);
    unmount();
    expect(root.querySelector("canvas")).toBeNull();
  });
});
