// The chart components with a fake engine (the real one needs a GPU /
// canvas browser; it is exercised on the docs site): lifecycle (created on
// mount, options replaced when a prop changes, destroyed on unmount), the
// option presets of the named components, emitted engine events and the
// template ref handle.
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick, reactive, ref } from "vue";

type Listener = (event: unknown) => void;
interface FakeEngine {
  kind: "chart" | "shape";
  container: HTMLElement;
  options: Record<string, unknown>;
  setOptions: ReturnType<typeof vi.fn>;
  destroy: ReturnType<typeof vi.fn>;
  resetZoom: ReturnType<typeof vi.fn>;
  toggle: ReturnType<typeof vi.fn>;
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
        toggle: vi.fn(),
        fire: (type, event) =>
          listeners.get(type)?.forEach((listener) => listener(event)),
      };
      engines.push(engine);
      return {
        ...engine,
        getView: () => ({ x: [0, 1], y: [0, 1] }),
        getRenderer: () => "webgl2",
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

const {
  BarChart,
  Chart,
  DonutChart,
  GaugeChart,
  LineChart,
  QuadrantChart,
  ShapeChart,
  Sparkline,
  useChartEngine,
} = await import(".");

const series = [{ name: "Visits", data: [1, 3, 2] }];

beforeEach(() => {
  engines.length = 0;
});

describe("Chart", () => {
  it("mounts the engine into a sized box, updates it and destroys it on unmount", async () => {
    const wrapper = mount(Chart, {
      props: { series, height: 200, legend: false },
      attachTo: document.body,
    });
    expect(engines).toHaveLength(1);
    const root = wrapper.element as HTMLElement;
    expect(root.style.height).toBe("200px");
    expect(root.style.width).toBe("100%");
    expect(engines[0].container.parentElement).toBe(root);
    expect(engines[0].options).toMatchObject({
      legend: false,
      series: [{ ...series[0], type: "line" }],
    });

    await wrapper.setProps({ stackMode: "percent" });
    expect(engines[0].setOptions).toHaveBeenCalledTimes(1);
    expect(engines[0].options.stackMode).toBe("percent");

    wrapper.unmount();
    expect(engines[0].destroy).toHaveBeenCalledTimes(1);
  });

  it("passes raw (non-reactive) data to the engine; `deep` follows in-place mutations", async () => {
    const data = reactive([1, 2, 3]);
    const Host = defineComponent({
      props: { deep: Boolean },
      setup: (props) => () =>
        h(Chart, { series: [{ name: "A", data }], deep: props.deep }),
    });
    mount(Host);
    const sent = (engines[0].options.series as Array<{ data: unknown }>)[0];
    expect(sent.data).not.toBe(data);
    expect(sent.data).toEqual([1, 2, 3]);

    engines.length = 0;
    const list = reactive([{ name: "A", data: [1, 2] }]);
    mount(Chart, { props: { series: list, deep: true } });
    list[0].data.push(3);
    await nextTick();
    expect(engines[0].setOptions).toHaveBeenCalledTimes(1);
  });

  it("emits the engine events and exposes the handle", async () => {
    const chart = ref<InstanceType<typeof Chart>>();
    const wrapper = mount(
      defineComponent({
        setup: () => () => h(Chart, { series, ref: chart }),
      }),
    );
    const inner = wrapper.findComponent(Chart);
    const hover = { x: 1, xLabel: "1", items: [] };
    engines[0].fire("hover", hover);
    engines[0].fire("click", hover);
    engines[0].fire("plotClick", { x: 1, y: 2 });
    engines[0].fire("zoom", { x: [0, 1], y: [0, 1] });
    engines[0].fire("renderer", "webgl2");
    expect(inner.emitted("hover")).toEqual([[hover]]);
    expect(inner.emitted("pointClick")).toEqual([[hover]]);
    expect(inner.emitted("plotClick")).toEqual([[{ x: 1, y: 2 }]]);
    expect(inner.emitted("zoom")).toHaveLength(1);
    expect(inner.emitted("rendererChange")).toEqual([["webgl2"]]);
    chart.value!.resetZoom();
    expect(engines[0].resetZoom).toHaveBeenCalled();
    expect(chart.value!.getRenderer()).toBe("webgl2");
    expect(chart.value!.getInstance()).not.toBeNull();
  });
});

describe("named charts", () => {
  it("LineChart types, stacks and curves its series", () => {
    mount(LineChart, {
      props: { series, area: true, percent: true, curve: "step" },
    });
    expect(engines[0].options).toMatchObject({
      stackMode: "percent",
      series: [{ type: "area", stack: "stack", curve: "step" }],
    });
  });

  it("BarChart labels its bars", () => {
    mount(BarChart, { props: { series, labels: true } });
    expect(engines[0].options.series).toEqual([
      { ...series[0], type: "bar", showLabels: true },
    ]);
  });

  it("Sparkline is 48px high", () => {
    const wrapper = mount(Sparkline, { props: { data: [1, 2, 3] } });
    expect((wrapper.element as HTMLElement).style.height).toBe("48px");
    expect(engines[0].options.legend).toBe(false);
  });

  it("QuadrantChart emits the clicked point and quadrant, and drags with a pointDrop listener", () => {
    const points = [{ x: 8, y: 9, label: "A" }];
    const onPointDrop = vi.fn();
    const wrapper = mount(QuadrantChart, { props: { points, onPointDrop } });
    expect(JSON.stringify(engines[0].options)).toContain('"dragPoints":true');
    engines[0].fire("click", { items: [{ index: 0 }] });
    engines[0].fire("plotClick", { x: 1, y: 9 });
    expect(wrapper.emitted("pointClick")).toEqual([[points[0], 0]]);
    expect(wrapper.emitted("quadrantClick")).toEqual([
      ["topLeft", { x: 1, y: 9 }],
    ]);
  });

  it("shape charts build the options of their type", () => {
    const data = [{ name: "A", value: 1 }];
    mount(DonutChart, { props: { data, centerValue: "42" } });
    const gauge = mount(GaugeChart, { props: { value: 72 } });
    expect(engines.map((e) => e.kind)).toEqual(["shape", "shape"]);
    expect(engines[0].options).toMatchObject({
      type: "pie",
      innerRadius: 0.62,
      centerValue: "42",
    });
    expect(engines[1].options).toMatchObject({ type: "gauge", value: 72 });
    expect((gauge.element as HTMLElement).style.height).toBe("240px");
  });

  it("ShapeChart forwards hover, click and toggle", () => {
    const wrapper = mount(ShapeChart, {
      props: { options: { type: "pie", data: [{ name: "A", value: 1 }] } },
    });
    engines[0].fire("hover", null);
    engines[0].fire("click", { index: 0 });
    engines[0].fire("toggle", { index: 0, hidden: true, hiddenIndexes: [0] });
    expect(Object.keys(wrapper.emitted())).toEqual(
      expect.arrayContaining(["hover", "click", "toggle"]),
    );
  });
});

describe("useChartEngine", () => {
  it("wraps any engine factory", async () => {
    const instance = { setOptions: vi.fn(), destroy: vi.fn() };
    const factory = vi.fn(() => instance);
    const Engine = defineComponent({
      props: { value: Number },
      setup(props) {
        const { setContainer } = useChartEngine(factory, props, () => ({
          value: props.value,
        }));
        return () => h("div", { ref: setContainer });
      },
    });
    const wrapper = mount(Engine, { props: { value: 1 } });
    expect(factory).toHaveBeenCalledWith(wrapper.element, { value: 1 });
    await wrapper.setProps({ value: 2 });
    expect(instance.setOptions).toHaveBeenCalledWith({ value: 2 });
    wrapper.unmount();
    expect(instance.destroy).toHaveBeenCalled();
  });
});
