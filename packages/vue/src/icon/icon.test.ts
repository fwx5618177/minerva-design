// The Vue bindings of minerva-design/icons: SVG output (server and client),
// accessibility, attributes passed through, the named components, the canvas
// mode on the shared surface (Canvas2D, faked context) and IconCanvas on the
// canvas controller (src/icon/generated.test.ts: the named components).

import { mount } from "@vue/test-utils";
import { createSSRApp, h, nextTick, ref } from "vue";
import { renderToString } from "vue/server-renderer";
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
} from "../icons";

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

const ssr = (render: () => ReturnType<typeof h>) =>
  renderToString(createSSRApp({ render }));

afterEach(() => {
  vi.restoreAllMocks();
  setDefaultIconRenderer("auto");
});

describe("Icon (SVG)", () => {
  it("server-renders a decorative inline SVG", async () => {
    const html = await ssr(() => h(SearchIcon));
    expect(html).toMatch(/^<svg xmlns="http:\/\/www.w3.org\/2000\/svg"/);
    for (const attribute of [
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
    expect(html.match(/<path /g)).toHaveLength(searchIcon.paths.length);
  });

  it("is labelled by title or aria-label", async () => {
    const titled = await ssr(() =>
      h(Icon, { icon: searchIcon, title: "Search" }),
    );
    expect(titled).toContain('role="img"');
    expect(titled).toContain("<title>Search</title>");
    expect(titled).not.toContain("aria-hidden");
    const labelled = await ssr(() => h(ArrowUpIcon, { "aria-label": "Up" }));
    expect(labelled).toContain('role="img"');
    expect(labelled).toContain('aria-label="Up"');
  });

  it("passes size, color, stroke, class, attributes and listeners", async () => {
    const onClick = vi.fn();
    const wrapper = mount(SearchIcon, {
      props: {
        size: "1.5em",
        color: "red",
        strokeWidth: 1.5,
        absoluteStrokeWidth: true,
      },
      attrs: { class: "extra", "data-testid": "icon", onClick },
    });
    const svg = wrapper.find("svg");
    expect(svg.attributes("width")).toBe("1.5em");
    expect(svg.attributes("stroke")).toBe("red");
    expect(svg.attributes("stroke-width")).toBe("1.5");
    expect(svg.classes()).toEqual(["minerva-icon", "extra"]);
    expect(svg.attributes("data-testid")).toBe("icon");
    expect(svg.find("path").attributes("vector-effect")).toBe(
      "non-scaling-stroke",
    );
    await svg.trigger("click");
    expect(onClick).toHaveBeenCalled();
  });

  it("creates components for custom icons and resolves names", async () => {
    const Sparkle = createIcon(
      defineIcon({ name: "sparkle", paths: ["M12 3v18", "M3 12h18"] }),
    );
    expect(Sparkle.displayName).toBe("SparkleIcon");
    expect(await ssr(() => h(Sparkle))).toContain('data-icon="sparkle"');
    expect(await ssr(() => h(DynamicIcon, { name: "arrow-up" }))).toContain(
      'data-icon="arrow-up"',
    );
    expect(await ssr(() => h(DynamicIcon, { name: "nope" }))).toBe(
      "<!--v-if-->",
    );
  });
});

describe("Icon (canvas)", () => {
  it("server-renders an empty canvas of the right size", async () => {
    const html = await ssr(() =>
      h(SearchIcon, { renderer: "webgl2", size: 32, title: "Search" }),
    );
    expect(html).toContain("<canvas");
    expect(html).toContain("width:32px");
    expect(html).toContain('aria-label="Search"');
    expect(html).toContain('role="img"');
  });

  it("draws with the shared backend, reports it and switches back to SVG", async () => {
    const strokes = fake2d();
    const renderer = ref<"canvas2d" | "svg">("canvas2d");
    const onRendererChange = vi.fn();
    const wrapper = mount({
      setup: () => () =>
        h(SearchIcon, {
          renderer: renderer.value,
          size: 20,
          onRendererChange,
        }),
    });
    const canvas = wrapper.find("canvas").element as HTMLCanvasElement;
    await vi.waitFor(() =>
      expect(onRendererChange).toHaveBeenCalledWith("canvas2d"),
    );
    expect(canvas.dataset.renderer).toBe("canvas2d");
    expect(canvas.style.width).toBe("20px");
    expect(strokes.length).toBeGreaterThan(0);
    renderer.value = "svg";
    await nextTick();
    expect(wrapper.find("canvas").exists()).toBe(false);
    expect(wrapper.find("svg").exists()).toBe(true);
  });
});

describe("IconCanvas", () => {
  it("server-renders its sized container", async () => {
    const html = await ssr(() =>
      h(IconCanvas, { items: [], height: 120, title: "Icons" }),
    );
    expect(html).toContain('role="img"');
    expect(html).toContain("height:120px");
    expect(html).toContain('class="minerva-icon-canvas"');
  });

  it("draws the items, follows the default renderer and exposes a handle", async () => {
    const strokes = fake2d();
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(200);
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(100);
    setDefaultIconRenderer("canvas2d");
    const items = ref([{ icon: searchIcon, x: 0, y: 0 }]);
    const onRendererChange = vi.fn();
    const handle = ref<InstanceType<typeof IconCanvas> | null>(null);
    const wrapper = mount({
      setup: () => () =>
        h(IconCanvas, {
          ref: handle,
          items: items.value,
          onRendererChange,
        }),
    });
    await expect(handle.value!.ready()).resolves.toBe("canvas2d");
    expect(onRendererChange).toHaveBeenCalledWith("canvas2d");
    const host = wrapper.find(".minerva-icon-canvas");
    expect(host.attributes("data-renderer")).toBe("canvas2d");
    expect(host.attributes("aria-hidden")).toBe("true");
    expect(handle.value!.getRenderer()).toBe("canvas2d");
    expect(handle.value!.getCanvas()).toBe(host.find("canvas").element);
    const drawn = strokes.length;
    expect(drawn).toBeGreaterThan(0);
    items.value = [...items.value, { icon: searchIcon, x: 30, y: 0 }];
    await nextTick();
    await handle.value!.ready();
    expect(strokes.length).toBeGreaterThan(drawn);
    wrapper.unmount();
    expect(host.element.querySelector("canvas")).toBeNull();
  });
});
