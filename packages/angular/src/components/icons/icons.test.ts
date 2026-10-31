// The Angular icon components: SVG output (server and client),
// accessibility, MnDynamicIcon names, the canvas mode on the shared surface
// (Canvas2D, faked context) and MnIconCanvas on the canvas controller.
import { Component, signal, viewChild } from "@angular/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  arrowUpIcon,
  defineIcon,
  searchIcon,
  setDefaultIconRenderer,
  type IconCanvasItem,
} from "minerva-design/icons/core";
import { render, settle } from "../../testing";
import { renderToString } from "../../testing/ssr";
import { MnDynamicIcon, MnIcon, MnIconCanvas, type IconRenderer } from ".";

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

/** The server HTML of the body (without the hydration annotations) */
const serverBody = (html: string) =>
  html
    .slice(html.indexOf("<body"), html.indexOf("</body>"))
    .replace(/ ngh="[^"]*"/g, "");

afterEach(() => {
  vi.restoreAllMocks();
  setDefaultIconRenderer("auto");
  document.body.innerHTML = "";
});

describe("MnIcon (SVG)", () => {
  it("server-renders a decorative inline SVG", async () => {
    @Component({
      selector: "mn-test-icon-ssr",
      imports: [MnIcon],
      template: `<mn-icon [icon]="icon" />`,
    })
    class Host {
      icon = searchIcon;
    }
    const html = serverBody(await renderToString(Host));
    expect(html).toContain('<mn-icon style="display: contents;"><svg');
    for (const attribute of [
      'xmlns="http://www.w3.org/2000/svg"',
      'width="24"',
      'height="24"',
      'viewBox="0 0 24 24"',
      'fill="none"',
      'stroke="currentColor"',
      'stroke-width="2"',
      'stroke-linecap="round"',
      'stroke-linejoin="round"',
      'data-icon="search"',
      'class="minerva-icon"',
      'aria-hidden="true"',
    ])
      expect(html).toContain(attribute);
    expect(html).not.toContain("role=");
    expect(html.match(/<path /g)).toHaveLength(searchIcon.paths.length);
  });

  it("is labelled by title or aria-label", async () => {
    @Component({
      imports: [MnIcon],
      template: `<mn-icon [icon]="search" title="Search" /><mn-icon
          [icon]="up"
          aria-label="Up"
        />`,
    })
    class Host {
      search = searchIcon;
      up = arrowUpIcon;
    }
    const fixture = await render(Host);
    const [titled, labelled] = Array.from<SVGSVGElement>(
      fixture.nativeElement.querySelectorAll("svg"),
    );
    expect(titled).toHaveAttribute("role", "img");
    expect(titled.querySelector("title")?.textContent).toBe("Search");
    expect(titled).not.toHaveAttribute("aria-hidden");
    expect(labelled).toHaveAttribute("role", "img");
    expect(labelled).toHaveAttribute("aria-label", "Up");
    // the host attributes move to the svg (no native tooltip on the host)
    for (const host of fixture.nativeElement.querySelectorAll("mn-icon")) {
      expect(host).not.toHaveAttribute("title");
      expect(host).not.toHaveAttribute("aria-label");
    }
  });

  it("passes size, color and stroke, and keeps strokes absolute", async () => {
    @Component({
      imports: [MnIcon],
      template: `<mn-icon
        [icon]="icon"
        size="1.5em"
        color="red"
        strokeWidth="1.5"
        absoluteStrokeWidth
      />`,
    })
    class Host {
      icon = searchIcon;
    }
    const fixture = await render(Host);
    const svg = fixture.nativeElement.querySelector("svg") as SVGSVGElement;
    expect(svg).toHaveAttribute("width", "1.5em");
    expect(svg).toHaveAttribute("height", "1.5em");
    expect(svg).toHaveAttribute("stroke", "red");
    expect(svg).toHaveAttribute("stroke-width", "1.5");
    expect(svg.querySelector("path")).toHaveAttribute(
      "vector-effect",
      "non-scaling-stroke",
    );
  });

  it("draws custom icons and follows a new icon", async () => {
    @Component({
      imports: [MnIcon],
      template: `<mn-icon [icon]="icon()" size="32" />`,
    })
    class Host {
      icon = signal(
        defineIcon({ name: "sparkle", paths: ["M12 3v18", "M3 12h18"] }),
      );
    }
    const fixture = await render(Host);
    const svg = () => fixture.nativeElement.querySelector("svg") as SVGElement;
    expect(svg()).toHaveAttribute("data-icon", "sparkle");
    expect(svg()).toHaveAttribute("width", "32");
    expect(svg().querySelectorAll("path")).toHaveLength(2);
    fixture.componentInstance.icon.set(arrowUpIcon);
    await settle(fixture);
    expect(svg()).toHaveAttribute("data-icon", "arrow-up");
  });
});

describe("MnDynamicIcon", () => {
  it("resolves built-in names and renders nothing for unknown ones", async () => {
    @Component({
      imports: [MnDynamicIcon],
      template: `<mn-dynamic-icon [name]="name()" title="Icon" />`,
    })
    class Host {
      name = signal("arrow-up");
    }
    const fixture = await render(Host);
    const host = fixture.nativeElement.querySelector("mn-dynamic-icon");
    expect(host.querySelector("svg")).toHaveAttribute("data-icon", "arrow-up");
    expect(host.querySelector("svg")).toHaveAttribute("role", "img");
    fixture.componentInstance.name.set("nope");
    await settle(fixture);
    expect(host.querySelector("svg, canvas")).toBeNull();
  });
});

describe("MnIcon (canvas)", () => {
  it("server-renders an empty canvas of the right size", async () => {
    @Component({
      selector: "mn-test-icon-canvas-ssr",
      imports: [MnIcon],
      template: `<mn-icon
        [icon]="icon"
        renderer="webgl2"
        [size]="32"
        title="Search"
      />`,
    })
    class Host {
      icon = searchIcon;
    }
    const html = serverBody(await renderToString(Host));
    expect(html).toContain("<canvas");
    expect(html).toContain("width: 32px");
    expect(html).toContain('class="minerva-icon"');
    expect(html).toContain('aria-label="Search"');
    expect(html).toContain('role="img"');
    expect(html).not.toContain("<svg");
  });

  it("draws with the shared backend, reports it and switches back to SVG", async () => {
    const strokes = fake2d();
    @Component({
      imports: [MnIcon],
      template: `<mn-icon
        [icon]="icon"
        [renderer]="renderer()"
        [size]="20"
        (rendererChange)="changed($event)"
      />`,
    })
    class Host {
      icon = searchIcon;
      renderer = signal<IconRenderer>("canvas2d");
      changed = vi.fn();
    }
    const fixture = await render(Host);
    const canvas = fixture.nativeElement.querySelector(
      "canvas",
    ) as HTMLCanvasElement;
    expect(canvas).toHaveClass("minerva-icon");
    expect(canvas).toHaveAttribute("aria-hidden", "true");
    expect(canvas.style.width).toBe("20px");
    await vi.waitFor(() =>
      expect(fixture.componentInstance.changed).toHaveBeenCalledWith(
        "canvas2d",
      ),
    );
    expect(canvas.dataset.renderer).toBe("canvas2d");
    expect(strokes.length).toBeGreaterThan(0);
    fixture.componentInstance.renderer.set("svg");
    await settle(fixture);
    expect(fixture.nativeElement.querySelector("canvas")).toBeNull();
    expect(fixture.nativeElement.querySelector("svg")).not.toBeNull();
  });
});

describe("MnIconCanvas", () => {
  it("server-renders its sized container", async () => {
    @Component({
      selector: "mn-test-icon-canvas-host-ssr",
      imports: [MnIconCanvas],
      template: `<mn-icon-canvas [items]="[]" [height]="120" title="Icons" />`,
    })
    class Host {}
    const html = serverBody(await renderToString(Host));
    expect(html).toContain('role="img"');
    expect(html).toContain('aria-label="Icons"');
    expect(html).toContain("height: 120px");
    expect(html).toContain('class="minerva-icon-canvas"');
    expect(html).not.toContain("<canvas");
  });

  it("draws the items, follows the default renderer and exposes its methods", async () => {
    const strokes = fake2d();
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(200);
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(100);
    setDefaultIconRenderer("canvas2d");
    @Component({
      imports: [MnIconCanvas],
      template: `<mn-icon-canvas
        [items]="items()"
        (rendererChange)="changed($event)"
      />`,
    })
    class Host {
      items = signal<IconCanvasItem[]>([{ icon: searchIcon, x: 0, y: 0 }]);
      changed = vi.fn();
      canvas = viewChild.required(MnIconCanvas);
    }
    const fixture = await render(Host);
    const handle = fixture.componentInstance.canvas();
    await expect(handle.ready()).resolves.toBe("canvas2d");
    expect(fixture.componentInstance.changed).toHaveBeenCalledWith("canvas2d");
    const host = fixture.nativeElement.querySelector(
      "mn-icon-canvas",
    ) as HTMLElement;
    expect(host).toHaveClass("minerva-icon-canvas");
    expect(host).toHaveAttribute("data-renderer", "canvas2d");
    expect(host).toHaveAttribute("aria-hidden", "true");
    expect(host.style.position).toBe("relative");
    expect(host.style.width).toBe("100%");
    expect(host.style.height).toBe("240px");
    expect(handle.getRenderer()).toBe("canvas2d");
    expect(handle.getCanvas()).toBe(host.querySelector("canvas"));
    const drawn = strokes.length;
    expect(drawn).toBeGreaterThan(0);
    fixture.componentInstance.items.update((items) => [
      ...items,
      { icon: searchIcon, x: 30, y: 0 },
    ]);
    await settle(fixture);
    await handle.ready();
    expect(strokes.length).toBeGreaterThan(drawn);
    fixture.destroy();
    expect(host.querySelector("canvas")).toBeNull();
    expect(handle.getCanvas()).toBeNull();
  });

  it("rejects ready() before it is mounted in the browser", async () => {
    const canvas = Object.create(MnIconCanvas.prototype) as MnIconCanvas;
    await expect(canvas.ready()).rejects.toThrow("not mounted");
  });
});
