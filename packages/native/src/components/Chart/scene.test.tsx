import { act, createRef, type ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { StyleSheet, View } from "react-native";
import { describe, expect, it } from "vitest";
import {
  createChartController,
  type ChartOptions,
  type ChartScene,
} from "@minerva/charts/canvas";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { hostElements, queryPart, type Host } from "../../../test/queries";
import { BarChart, Chart, type ChartHandle } from "./index";
import { measureChartText } from "./measure";
import { drawHover, hasVisibleLines } from "./scene";

const W = 360;
const H = 240;

async function mount(ui: ReactElement) {
  const result = await render(
    <MinervaProvider theme="light">{ui}</MinervaProvider>,
  );
  await fireEvent(queryPart("root", "chart")!, "layout", {
    nativeEvent: { layout: { x: 0, y: 0, width: W, height: H } },
  });
  return result;
}

const part = (name: string, root?: Host) => queryPart(name, "chart", root);

const touch = (x: number, y: number) => ({
  nativeEvent: {
    identifier: 1,
    pageX: x,
    pageY: y,
    locationX: x,
    locationY: y,
    touches: [] as unknown[],
    changedTouches: [{ identifier: 1, pageX: x, pageY: y }],
  },
  touchHistory: { numberActiveTouches: 0 },
});

/** Touches (x, y) and lifts the finger: the tooltip and marks stay */
async function tap(x: number, y: number) {
  const surface = () => part("surface")!.props;
  await act(async () => {
    const e = touch(x, y);
    e.nativeEvent.touches = [{ identifier: 1, pageX: x, pageY: y }];
    surface().onResponderGrant(e);
  });
  await act(async () => {
    surface().onResponderEnd(touch(x, y));
    surface().onResponderRelease(touch(x, y));
  });
  await act(() => new Promise<void>((resolve) => setTimeout(resolve, 40)));
}

const zOf = (el: Host) =>
  (StyleSheet.flatten(el.props.style) as { zIndex?: number } | undefined)
    ?.zIndex ?? 0;

/**
 * Parts drawn by the drawing view, bottom to top: its children sorted by
 * `zIndex` (stable: the tree order between equal ones), like the platforms
 */
function paintOrder(): string[] {
  const drawing = hostElements(part("surface")!).find(
    (el) => el.props.pointerEvents === "none",
  )!;
  const layers = drawing.children
    .filter((c): c is Host => typeof c !== "string")
    .map((el, i) => ({ el, i, z: zOf(el) }))
    .sort((a, b) => a.z - b.z || a.i - b.i);
  const out: string[] = [];
  for (const { el } of layers)
    for (const host of hostElements(el)) {
      const name = host.props.dataSet?.part;
      if (name && host.props.dataSet?.minerva === "chart") out.push(name);
    }
  return out;
}

const below = (order: string[], a: string, b: string) => {
  expect(order).toContain(a);
  expect(order).toContain(b);
  return order.indexOf(a) < order.indexOf(b);
};

describe("chart scene: layers of the hover state", () => {
  it("combo chart: the lifted bar below the data, no veil, the hovered point on top", async () => {
    const ref = createRef<ChartHandle>();
    await mount(
      <Chart
        ref={ref}
        yAxis2={{ title: "Growth" }}
        series={[
          {
            type: "bar",
            name: "Revenue",
            data: [
              ["Q1", 120],
              ["Q2", 180],
              ["Q3", 150],
            ],
          },
          {
            type: "line",
            name: "Growth",
            yAxis: "right",
            data: [
              ["Q1", 0.05],
              ["Q2", 0.12],
              ["Q3", 0.08],
            ],
          },
        ]}
      />,
    );
    const scene = ref.current!.getController()!.getScene()!;
    expect(hasVisibleLines(scene)).toBe(true);
    const p = ref.current!.getController()!.toPixel(1, 60)!;
    await tap(p.x, p.y);
    const hover = ref.current!.getController()!.getScene()!.hover!;
    expect(hover.marks.some((m) => m.kind === "bar")).toBe(true);
    expect(hover.marks.some((m) => m.kind === "dot")).toBe(true);

    expect(part("veil")).toBeNull();
    const under = part("hover-under")!;
    expect(under).not.toBeNull();
    // the lifted bar is drawn in the layer under the data
    const lifted = hostElements(under)
      .slice(1)
      .map((el) => StyleSheet.flatten(el.props.style))
      .filter((s) => s?.borderWidth);
    expect(lifted.length).toBeGreaterThan(0);

    const order = paintOrder();
    expect(below(order, "hover-under", "data")).toBe(true);
    expect(below(order, "data", "hover-points")).toBe(true);
    expect(below(order, "labels", "hover-points")).toBe(true);
    // the hovered points: above every mark but the tooltip
    const rest = order.slice(order.indexOf("hover-points") + 1);
    expect(rest.filter((name) => name !== "tooltip")).toEqual([]);
    if (part("tooltip"))
      expect(below(order, "hover-points", "tooltip")).toBe(true);

    // the point marker: a 10% glow, a 20% halo, then the ringed dot
    const dots = hostElements(part("hover-points")!)
      .slice(1)
      .map((el) => StyleSheet.flatten(el.props.style));
    const [glow, halo, marker] = dots;
    expect(glow.opacity).toBe(0.5);
    expect(glow.width).toBe((marker.width as number) + 18);
    expect(halo.width).toBe((marker.width as number) + 10);
    expect(marker.borderWidth).toBe(2);
  });

  it("bar chart: the plot is veiled and the lifted bar drawn above the data", async () => {
    const ref = createRef<ChartHandle>();
    await mount(<BarChart ref={ref} series={[{ data: [3, 5, 2, 8] }]} />);
    expect(hasVisibleLines(ref.current!.getController()!.getScene()!)).toBe(
      false,
    );
    const p = ref.current!.getController()!.toPixel(1, 2)!;
    await tap(p.x, p.y);
    expect(part("veil")).not.toBeNull();
    expect(part("hover-under")).toBeNull();
    const order = paintOrder();
    expect(below(order, "data", "veil")).toBe(true);
    expect(below(order, "labels", "veil")).toBe(true);
    // the lifted bar comes after the veil, in the same layer
    const hover = hostElements(part("hover")!).slice(1);
    const veil = hover.findIndex((el) => el.props.dataSet?.part === "veil");
    const bar = hover.findIndex(
      (el) => StyleSheet.flatten(el.props.style)?.borderWidth,
    );
    expect(veil).toBeGreaterThanOrEqual(0);
    expect(bar).toBeGreaterThan(veil);
  });
});

describe("chart scene: dragged point", () => {
  const sceneOf = (options: ChartOptions): ChartScene => {
    const controller = createChartController({
      options,
      measureText: measureChartText,
    });
    controller.setSize(W, H);
    return controller.getScene()!;
  };
  const base = sceneOf({
    series: [
      {
        type: "scatter",
        data: [
          [2, 8],
          [8, 2],
        ],
      },
    ],
  });
  const draw = async (dragging: Record<string, unknown>) =>
    render(
      <View>
        {drawHover(
          { ...base, dragging } as unknown as ChartScene,
          undefined,
          false,
        )}
      </View>,
    );

  it("draws the placeholder, the drop target, the lifted point and its label", async () => {
    await draw({
      x: 120,
      y: 90,
      size: 14,
      color: "#4f46e5",
      label: "Fix login",
      origin: { x: 60, y: 160 },
      target: { x: 100, y: 20, width: 120, height: 90, color: "#10b981" },
    });
    const drag = part("drag")!;
    expect(drag).not.toBeNull();

    const placeholder = StyleSheet.flatten(
      part("drag-placeholder", drag)!.props.style,
    );
    expect(placeholder).toMatchObject({ borderStyle: "dashed" });
    expect(placeholder.left! + placeholder.width! / 2).toBe(60);
    expect(placeholder.top! + placeholder.height! / 2).toBe(160);

    const [fill, ring] = part("drag-target", drag)!
      .children.filter((c): c is Host => typeof c !== "string")
      .map((el) => StyleSheet.flatten(el.props.style));
    expect(fill).toMatchObject({ backgroundColor: "#10b981", opacity: 0.12 });
    expect(ring).toMatchObject({
      borderWidth: 2,
      borderColor: "#10b981",
      opacity: 0.7,
    });

    const pill = part("drag-label", drag)!;
    expect(screen.getByText("Fix login")).toBeTruthy();
    const pillStyle = StyleSheet.flatten(pill.props.style);
    expect(pillStyle.borderWidth).toBe(1);
    expect(pillStyle.left).toBeGreaterThan(120);

    // the shadow (3px lower) comes before the point, ringed and larger
    const views = hostElements(drag).map((el) =>
      StyleSheet.flatten(el.props.style),
    );
    const shadow = views.findIndex(
      (s) => s?.backgroundColor === "rgba(0, 0, 0, 0.18)",
    );
    const point = views.findIndex((s) => s?.backgroundColor === "#4f46e5");
    expect(shadow).toBeGreaterThan(0);
    expect(point).toBeGreaterThan(shadow);
    expect(views[shadow].top! + views[shadow].height! / 2).toBe(93);
    expect(views[point]).toMatchObject({ width: 16, borderWidth: 2 });
  });

  it("puts the label on the left near the right edge", async () => {
    await draw({ x: W - 20, y: 90, size: 14, color: "#4f46e5", label: "Q" });
    const pill = StyleSheet.flatten(part("drag-label")!.props.style);
    expect(pill.left).toBeUndefined();
    expect(pill.right).toBeGreaterThan(20);
  });

  it("without the optional fields: only the lifted point", async () => {
    await draw({ x: 120, y: 90, size: 14, color: "#4f46e5" });
    expect(part("drag")).not.toBeNull();
    expect(part("drag-placeholder")).toBeNull();
    expect(part("drag-target")).toBeNull();
    expect(part("drag-label")).toBeNull();
  });
});
