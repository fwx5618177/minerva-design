// The chart components with a fake engine (the real one needs a GPU /
// canvas browser; it is exercised on the docs site): created after the
// first render, options replaced when an input signal changes, destroyed
// with the component, engine events forwarded as outputs.
import { Component, signal, viewChild } from "@angular/core";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, settle } from "../../testing";
import {
  MnBarChart,
  MnDonutChart,
  MnGaugeChart,
  MnLineChart,
  MnQuadrantChart,
  MnShapeChart,
  MnSparkline,
} from ".";

type Listener = (event: unknown) => void;
interface FakeEngine {
  kind: "chart" | "shape";
  container: HTMLElement;
  options: Record<string, unknown>;
  setOptions: ReturnType<typeof vi.fn>;
  destroy: ReturnType<typeof vi.fn>;
  resetZoom: ReturnType<typeof vi.fn>;
  fire(type: string, event: unknown): void;
}
const engines: FakeEngine[] = [];

vi.mock("minerva-design/charts/core", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("minerva-design/charts/core")>();
  const create =
    (kind: FakeEngine["kind"]) =>
    (container: HTMLElement, options: Record<string, unknown>) => {
      const listeners = new Map<string, Set<Listener>>();
      const engine: FakeEngine = {
        kind,
        container,
        options,
        setOptions: vi.fn((next) => {
          engine.options = next;
        }),
        destroy: vi.fn(),
        resetZoom: vi.fn(),
        fire: (type, event) =>
          listeners.get(type)?.forEach((listener) => listener(event)),
      };
      engines.push(engine);
      return {
        ...engine,
        getView: () => ({ x: [0, 1], y: [0, 1] }),
        getRenderer: () => "webgl2",
        toggle: vi.fn(),
        setLabelHidden: vi.fn(),
        on: (type: string, listener: Listener) => {
          if (!listeners.has(type)) listeners.set(type, new Set());
          listeners.get(type)!.add(listener);
          return () => listeners.get(type)!.delete(listener);
        },
      };
    };
  return {
    ...actual,
    createChart: create("chart"),
    createShapeChart: create("shape"),
  };
});

const series = [{ name: "Visits", data: [1, 3, 2] }];

beforeEach(() => {
  engines.length = 0;
});

describe("cartesian charts", () => {
  it("MnLineChart mounts after render, follows its inputs, forwards events and is destroyed with the view", async () => {
    @Component({
      imports: [MnLineChart],
      template: `<mn-line-chart
        [series]="series"
        [area]="area()"
        curve="step"
        [height]="200"
        (hover)="hovered = $event"
        (pointClick)="clicked = $event"
      />`,
    })
    class Host {
      series = series;
      area = signal(false);
      hovered: unknown = undefined;
      clicked: unknown = undefined;
      chart = viewChild.required(MnLineChart);
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(engines).toHaveLength(1);
    const host = fixture.nativeElement.querySelector(
      "mn-line-chart",
    ) as HTMLElement;
    expect(host.getAttribute("data-minerva")).toBe("chart");
    expect(host.style.height).toBe("200px");
    expect(host.style.width).toBe("100%");
    expect(engines[0].container.parentElement).toBe(host);
    expect(engines[0].options).toMatchObject({
      series: [{ type: "line", curve: "step" }],
    });

    fixture.componentInstance.area.set(true);
    await settle(fixture);
    expect(engines[0].setOptions).toHaveBeenCalledTimes(1);
    expect(engines[0].options).toMatchObject({
      series: [{ type: "area" }],
    });

    const hover = { x: 1, xLabel: "1", items: [] };
    engines[0].fire("hover", hover);
    engines[0].fire("click", hover);
    expect(fixture.componentInstance.hovered).toBe(hover);
    expect(fixture.componentInstance.clicked).toBe(hover);

    const chart = fixture.componentInstance.chart();
    chart.resetZoom();
    expect(engines[0].resetZoom).toHaveBeenCalled();
    expect(chart.getRenderer()).toBe("webgl2");
    expect(chart.instance()).not.toBeNull();

    fixture.destroy();
    expect(engines[0].destroy).toHaveBeenCalledTimes(1);
  });

  it("MnBarChart stacks and labels; MnSparkline is 48px high", async () => {
    @Component({
      imports: [MnBarChart, MnSparkline],
      template: `<mn-bar-chart
          [series]="series"
          stacked
          [labels]="true"
        /><mn-sparkline [data]="[1, 2, 3]" />`,
    })
    class Host {
      series = series;
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(engines[0].options.series).toEqual([
      { ...series[0], type: "bar", stack: "stack", showLabels: true },
    ]);
    const sparkline = fixture.nativeElement.querySelector(
      "mn-sparkline",
    ) as HTMLElement;
    expect(sparkline.style.height).toBe("48px");
    expect(engines[1].options.legend).toBe(false);
  });

  it("MnQuadrantChart emits points and quadrants", async () => {
    @Component({
      imports: [MnQuadrantChart],
      template: `<mn-quadrant-chart
        [points]="points"
        draggable
        (pointClick)="events.push($event)"
        (quadrantClick)="events.push($event)"
        (pointDrag)="events.push($event)"
        (pointDrop)="events.push($event)"
        (pointDoubleClick)="events.push({ double: $event.index })"
      />`,
    })
    class Host {
      points = [{ x: 8, y: 9, label: "A" }];
      events: unknown[] = [];
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(JSON.stringify(engines[0].options)).toContain('"dragPoints":true');
    // the point card replaces the engine tooltip, label chip and drag pill
    expect(engines[0].options.tooltip).toBe(false);
    expect(engines[0].options.interaction).toMatchObject({
      dragLabel: false,
      hoverLabel: false,
    });
    engines[0].fire("layout", { x: 0, y: 0, width: 100, height: 100 });
    await settle(fixture);
    engines[0].fire("click", { items: [{ index: 0 }] });
    engines[0].fire("plotClick", { x: 1, y: 9 });
    const point = fixture.componentInstance.points[0];
    expect(fixture.componentInstance.events).toEqual([
      { point, index: 0 },
      { quadrant: "topLeft", x: 1, y: 9 },
    ]);
    fixture.componentInstance.events = [];
    engines[0].fire("click", { items: [{ index: 0 }] });
    // the dragged point shows its card (no actions), following the drag
    const card = () =>
      (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
        "[data-point-preview]",
      );
    engines[0].fire("dragStart", { item: { index: 0 }, x: 8, y: 9 });
    expect(card()!.dataset["pointPreview"]).toBe("0");
    expect(card()!.hasAttribute("data-dragging")).toBe(true);
    const before = card()!.style.transform;
    engines[0].fire("drag", { item: { index: 0 }, x: 2, y: 2 });
    await new Promise((resolve) => requestAnimationFrame(resolve));
    expect(card()!.style.transform).not.toBe(before);
    engines[0].fire("drop", { item: { index: 0 }, x: 2, y: 2 });
    engines[0].fire("dragEnd", { item: { index: 0 }, cancelled: false });
    expect(card()).toBeNull();
    engines[0].fire("drop", { item: { index: 4 }, x: 2, y: 2 });
    expect(fixture.componentInstance.events).toEqual([
      { point, index: 0 },
      { double: 0 },
      { point, index: 0, x: 2, y: 2, quadrant: "bottomLeft" },
      { point, index: 0, x: 2, y: 2, quadrant: "bottomLeft" },
    ]);
  });

  it("MnQuadrantChart lists its points for keyboards and screen readers, moves them with Shift + arrows", async () => {
    @Component({
      imports: [MnQuadrantChart],
      template: `<mn-quadrant-chart
        [points]="points()"
        locale="en"
        [quadrants]="{ topLeft: { label: 'Do first' } }"
        [selectedIndex]="1"
        draggable
        [accessiblePoints]="accessible()"
        (hover)="hovers.push($event)"
        (pointClick)="events.push($event)"
        (pointDrop)="events.push($event)"
      />`,
    })
    class Host {
      points = signal([
        { x: 2, y: 8, label: "Write report" },
        { x: 8, y: 2 },
      ]);
      accessible = signal(true);
      hovers: unknown[] = [];
      events: unknown[] = [];
    }
    const fixture = await render(Host);
    await settle(fixture);
    const host = fixture.nativeElement.querySelector(
      "mn-quadrant-chart",
    ) as HTMLElement;
    const lists = host.querySelectorAll('[role="list"]');
    expect([...lists].map((l) => l.getAttribute("aria-label"))).toEqual([
      "Do first",
      "Bottom right quadrant",
    ]);
    const button = (index: number) =>
      host.querySelector<HTMLButtonElement>(
        `button[data-point-index="${index}"]`,
      )!;
    expect(button(0).getAttribute("aria-label")).toBe("Write report, Do first");
    expect(button(0).getAttribute("aria-keyshortcuts")).toContain(
      "Shift+ArrowDown",
    );
    expect(button(1).getAttribute("aria-current")).toBe("true");
    const ids = () =>
      (engines[0].options.series as Array<{ id?: string }>).map((s) => s.id);
    const { hovers, events } = fixture.componentInstance;
    engines[0].fire("layout", { x: 0, y: 0, width: 100, height: 100 });
    await settle(fixture);
    const card = () => host.querySelector<HTMLElement>("[data-point-preview]");
    // without actions the selected point shows a ring, not a card
    expect(card()).toBeNull();

    button(0).focus();
    await settle(fixture);
    expect(hovers.at(-1)).toMatchObject({
      x: 2,
      items: [{ index: 0, label: "Write report" }],
    });
    expect(ids()).toContain("quadrant:focus");
    // the focused point shows its card
    expect(card()!.dataset["pointPreview"]).toBe("0");
    expect(card()!.textContent).toContain("Write report");
    expect(card()!.textContent).toContain("Do first");

    button(0).dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
    );
    expect(document.activeElement).toBe(button(1));
    button(1).click();
    const [first, second] = fixture.componentInstance.points();
    expect(events).toEqual([{ point: second, index: 1 }]);

    button(1).dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowLeft",
        shiftKey: true,
        bubbles: true,
      }),
    );
    expect(events.at(-1)).toEqual({
      point: second,
      index: 1,
      x: 2.5,
      y: 2.5,
      quadrant: "bottomLeft",
    });
    expect(host.querySelector('[role="status"]')!.textContent).toBe(
      "Point 2 moved to Bottom left quadrant",
    );

    // the app moves the point: its button keeps the focus
    fixture.componentInstance.points.set([first!, { x: 2.5, y: 2.5 }]);
    await settle(fixture);
    expect(document.activeElement).toBe(button(1));
    expect(
      button(1).closest('[role="list"]')!.getAttribute("data-quadrant"),
    ).toBe("bottomLeft");

    fixture.componentInstance.accessible.set(false);
    await settle(fixture);
    expect(host.querySelector('[role="list"]')).toBeNull();
    expect(hovers.at(-1)).toBeNull();
    expect(ids()).not.toContain("quadrant:focus");
    fixture.destroy();
  });
});

describe("shape charts", () => {
  it("named shape charts build the options of their type", async () => {
    @Component({
      imports: [MnDonutChart, MnGaugeChart],
      template: `<mn-donut-chart
          [data]="data"
          centerValue="42"
        /><mn-gauge-chart [value]="72" label="CPU" />`,
    })
    class Host {
      data = [{ name: "A", value: 1 }];
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(engines.map((e) => e.kind)).toEqual(["shape", "shape"]);
    expect(engines[0].options).toMatchObject({
      type: "pie",
      innerRadius: 0.62,
      centerValue: "42",
    });
    expect(engines[1].options).toMatchObject({
      type: "gauge",
      value: 72,
      label: "CPU",
    });
    const gauge = fixture.nativeElement.querySelector(
      "mn-gauge-chart",
    ) as HTMLElement;
    expect(gauge.style.height).toBe("240px");
  });

  it("pass the renderer input to the engine and expose getRenderer", async () => {
    @Component({
      imports: [MnDonutChart],
      template: `<mn-donut-chart [data]="data" [renderer]="renderer()" />`,
    })
    class Host {
      data = [{ name: "A", value: 1 }];
      renderer = signal<"webgl" | "canvas2d">("webgl");
      chart = viewChild.required(MnDonutChart);
    }
    const fixture = await render(Host);
    await settle(fixture);
    expect(engines[0].options).toMatchObject({ renderer: "webgl" });
    expect(fixture.componentInstance.chart().getRenderer()).toBe("webgl2");
    fixture.componentInstance.renderer.set("canvas2d");
    await settle(fixture);
    expect(engines[0].options).toMatchObject({ renderer: "canvas2d" });
  });

  it("MnShapeChart forwards hover, itemClick and visibilityChange", async () => {
    @Component({
      imports: [MnShapeChart],
      template: `<mn-shape-chart
        [options]="options"
        (hover)="events.push('hover')"
        (itemClick)="events.push('click')"
        (visibilityChange)="events.push('toggle')"
      />`,
    })
    class Host {
      options = { type: "funnel" as const, data: [{ name: "A", value: 1 }] };
      events: string[] = [];
    }
    const fixture = await render(Host);
    await settle(fixture);
    engines[0].fire("hover", null);
    engines[0].fire("click", { index: 0 });
    engines[0].fire("toggle", { index: 0, hidden: true, hiddenIndexes: [0] });
    expect(fixture.componentInstance.events).toEqual([
      "hover",
      "click",
      "toggle",
    ]);
  });
});
