import { act, createRef, type ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { describe, expect, it, vi } from "vitest";
import { MinervaProvider } from "../../theme/MinervaProvider";
import { hostElements, queryPart } from "../../../test/queries";
import {
  BulletChart,
  CalendarHeatmap,
  ChordChart,
  DonutChart,
  FunnelChart,
  GaugeChart,
  PieChart,
  RadarChart,
  RadialBarChart,
  SankeyChart,
  ShapeChart,
  SunburstChart,
  TreemapChart,
  type ShapeChartHandle,
} from "./index";

const W = 360;
const H = 240;
/** Page position of the chart (touches carry page coordinates) */
const PAGE = { x: 12, y: 30 };

async function mount(ui: ReactElement, theme: "light" | "dark" = "light") {
  const result = await render(
    <MinervaProvider theme={theme}>{ui}</MinervaProvider>,
  );
  await fireEvent(queryPart("root", "chart")!, "layout", {
    nativeEvent: { layout: { x: 0, y: 0, width: W, height: H } },
  });
  return result;
}

/** Lets the scheduled frames run */
const flush = () =>
  act(() => new Promise<void>((resolve) => setTimeout(resolve, 40)));

const surface = () => queryPart("surface", "chart")!.props;

const touch = (x: number, y: number) => ({
  nativeEvent: {
    identifier: 1,
    pageX: x + PAGE.x,
    pageY: y + PAGE.y,
    locationX: x,
    locationY: y,
    touches: [],
    changedTouches: [{ identifier: 1, pageX: x + PAGE.x, pageY: y + PAGE.y }],
  },
});

async function press(x: number, y: number) {
  await act(async () => surface().onResponderGrant(touch(x, y)));
  await flush();
}
async function release(x: number, y: number) {
  await act(async () => surface().onResponderRelease(touch(x, y)));
  await flush();
}
async function tap(x: number, y: number) {
  await press(x, y);
  await release(x, y);
}

const views = () =>
  hostElements(queryPart("surface", "chart")!).filter(
    (el) => el.type === "View",
  ).length;

/** Center of a drawn text (legend items are drawn last) */
const textCenter = (text: string) => {
  const all = screen.getAllByText(text);
  const style = Object.assign(
    {},
    ...[all[all.length - 1]!.props.style].flat(),
  ) as { left: number; top: number; lineHeight: number };
  return { x: style.left + 6, y: style.top + style.lineHeight / 2 };
};

const DATA = [
  { name: "Alpha", value: 3 },
  { name: "Beta", value: 1 },
];

describe("shape charts", () => {
  it("draws a pie with views: slices, labels, legend and an accessible name", async () => {
    await mount(<PieChart testID="pie" data={DATA} animation={false} />);
    expect(screen.getByTestId("pie")).toBeTruthy();
    expect(surface().accessibilityRole).toBe("image");
    expect(surface().accessibilityLabel).toBe("Pie chart");
    // legend + outside labels
    expect(screen.getAllByText("Alpha").length).toBeGreaterThan(0);
    expect(screen.getByText(/75(\.0)?%/)).toBeTruthy();
    expect(views()).toBeGreaterThan(6);
  });

  it("defaults the donut hole, the gauge height and the accessible names", async () => {
    const donut = await mount(
      <DonutChart
        data={DATA}
        centerValue="4"
        centerLabel="Total"
        animation={false}
      />,
    );
    expect(surface().accessibilityLabel).toBe("Donut chart");
    expect(screen.getByText("Total")).toBeTruthy();
    await donut.unmount();
    await render(
      <MinervaProvider>
        <GaugeChart value={42} label="CPU" animation={false} />
      </MinervaProvider>,
    );
    const root = queryPart("root", "chart")!;
    expect([root.props.style].flat()).toContainEqual(
      expect.objectContaining({ height: 240 }),
    );
    expect(surface().accessibilityLabel).toBe("Gauge: CPU");
  });

  it("highlights the pressed slice, shows the tooltip and reports taps", async () => {
    const onHover = vi.fn();
    const onClick = vi.fn();
    await mount(
      <PieChart
        data={DATA}
        legend={false}
        labels="none"
        animation={false}
        onHover={onHover}
        onClick={onClick}
      />,
    );
    // the first slice covers 12 to 9 o'clock, clockwise: the right side
    await press(W / 2 + 40, H / 2);
    expect(onHover).toHaveBeenLastCalledWith(
      expect.objectContaining({ index: 0, name: "Alpha", value: 3 }),
    );
    // the canvas tooltip: drawn with views too
    expect(screen.getAllByText("Alpha").length).toBeGreaterThan(0);
    await release(W / 2 + 40, H / 2);
    expect(onClick).toHaveBeenCalledWith(
      expect.objectContaining({ index: 0, name: "Alpha" }),
    );
    // a tap outside clears the highlight
    await tap(4, 4);
    expect(onHover).toHaveBeenLastCalledWith(null);
  });

  it("toggles entries from the legend (uncontrolled and controlled)", async () => {
    const onToggle = vi.fn();
    const ref = createRef<ShapeChartHandle>();
    const funnel = await mount(
      <FunnelChart
        ref={ref}
        data={[
          { name: "Visit", value: 100 },
          { name: "Cart", value: 40 },
          { name: "Buy", value: 10 },
        ]}
        animation={false}
        onToggle={onToggle}
      />,
    );
    const at = textCenter("Cart");
    await tap(at.x, at.y);
    expect(onToggle).toHaveBeenCalledWith({
      index: 1,
      hidden: true,
      hiddenIndexes: [1],
    });
    expect(ref.current!.getInstance()!.getHidden()).toEqual([1]);
    await funnel.unmount();

    const controlled = vi.fn();
    await mount(
      <PieChart
        data={DATA}
        hidden={[0]}
        animation={false}
        onToggle={controlled}
      />,
    );
    const beta = textCenter("Beta");
    await tap(beta.x, beta.y);
    expect(controlled).toHaveBeenCalledWith(
      expect.objectContaining({ index: 1, hiddenIndexes: [0, 1] }),
    );
  });

  it("renders a React tooltip with renderTooltip", async () => {
    await mount(
      <PieChart
        data={DATA}
        legend={false}
        labels="none"
        animation={false}
        renderTooltip={(e) => <Text>{`custom ${e.name}`}</Text>}
      />,
    );
    await press(W / 2 + 40, H / 2);
    expect(screen.getByText("custom Alpha")).toBeTruthy();
    expect(queryPart("tooltip", "chart")).toBeTruthy();
  });

  it("draws radar, gauge, funnel and treemap charts and any engine type", async () => {
    const charts: ReactElement[] = [
      <RadarChart
        key="radar"
        indicators={[{ name: "Speed" }, { name: "Power" }, { name: "Range" }]}
        series={[
          { name: "A", values: [3, 4, 2] },
          { name: "B", values: [2, 1, 4] },
        ]}
        animation={false}
      />,
      <GaugeChart key="gauge" value={64} label="Load" animation={false} />,
      <TreemapChart
        key="treemap"
        data={[
          { name: "Web", children: [{ name: "Docs", value: 4 }] },
          { name: "Mobile", value: 2 },
        ]}
        animation={false}
      />,
      <ShapeChart
        key="generic"
        options={{
          type: "funnel",
          data: [
            { name: "Lead", value: 10 },
            { name: "Won", value: 4 },
          ],
          animation: false,
        }}
      />,
    ];
    for (const chart of charts) {
      const result = await mount(chart);
      expect(views(), String(chart.key)).toBeGreaterThan(4);
      await result.unmount();
    }
  });

  it("draws sankey, sunburst, radial bar, calendar heatmap and bullet charts", async () => {
    const charts: ReactElement[] = [
      <SankeyChart
        key="sankey"
        links={[
          { source: "Ads", target: "Site", value: 6 },
          { source: "Search", target: "Site", value: 4 },
          { source: "Site", target: "Signup", value: 3 },
        ]}
        animation={false}
      />,
      <SunburstChart
        key="sunburst"
        data={[
          { name: "Web", children: [{ name: "Docs", value: 4 }] },
          { name: "Mobile", value: 2 },
        ]}
        animation={false}
      />,
      <RadialBarChart
        key="radial"
        data={[
          { name: "Move", value: 420, max: 500 },
          { name: "Stand", value: 9, max: 12 },
        ]}
        animation={false}
      />,
      <CalendarHeatmap
        key="calendar"
        data={[
          { date: "2026-03-02", value: 3 },
          { date: "2026-03-04", value: 8 },
        ]}
        range={["2026-03-01", "2026-04-30"]}
        animation={false}
      />,
      <BulletChart
        key="bullet"
        data={[
          { name: "Revenue", value: 270, target: 250, ranges: [150, 225, 300] },
        ]}
        animation={false}
      />,
    ];
    for (const chart of charts) {
      const result = await mount(chart);
      expect(views(), String(chart.key)).toBeGreaterThan(3);
      await result.unmount();
    }
  });

  it("drills into a sunburst parent and back up, reporting the path", async () => {
    const onDrill = vi.fn();
    const ref = createRef<ShapeChartHandle>();
    await mount(
      <SunburstChart
        ref={ref}
        data={[
          {
            name: "Web",
            children: [
              { name: "Docs", value: 4 },
              { name: "Blog", value: 2 },
            ],
          },
          { name: "Mobile", value: 6 },
        ]}
        labels="none"
        legend={false}
        animation={false}
        onDrill={onDrill}
      />,
    );
    await act(async () => ref.current!.getInstance()!.drill(["Web"]));
    await flush();
    expect(onDrill).toHaveBeenLastCalledWith({ path: ["Web"] });
    expect(ref.current!.getInstance()!.getDrillPath()).toEqual(["Web"]);
    // a tap on the center goes back up
    await tap(W / 2, H / 2);
    expect(onDrill).toHaveBeenLastCalledWith({ path: [] });
  });

  it("animates the entry through frames and follows the theme", async () => {
    await mount(<PieChart data={DATA} />, "dark");
    const first = views();
    await flush();
    await flush();
    expect(views()).toBeGreaterThan(0);
    expect(first).toBeGreaterThan(0);
  });

  it("draws a chord diagram (arcs, ribbons, labels) and reports presses", async () => {
    const onHover = vi.fn();
    const onToggle = vi.fn();
    const ref = createRef<ShapeChartHandle>();
    await mount(
      <ChordChart
        ref={ref}
        groups={["Apps", "Web", "Store"]}
        matrix={[
          [0, 5, 2],
          [3, 0, 4],
          [1, 2, 0],
        ]}
        legend={false}
        animation={false}
        onHover={onHover}
        onToggle={onToggle}
      />,
    );
    expect(surface().accessibilityLabel).toBe("Chord diagram");
    expect(screen.getAllByText("Apps").length).toBeGreaterThan(0);
    // arcs and ribbons are made of many views
    expect(views()).toBeGreaterThan(20);
    // from the label of a group toward the center: its arc, then its ribbons
    const label = textCenter("Apps");
    for (let t = 0.1; t < 0.9 && !onHover.mock.calls.length; t += 0.05)
      await press(
        label.x + (W / 2 - label.x) * t,
        label.y + (H / 2 - label.y) * t,
      );
    expect(onHover).toHaveBeenCalledWith(
      expect.objectContaining({ name: expect.any(String) }),
    );
    await act(async () => ref.current!.getInstance()!.toggle(1));
    expect(onToggle).toHaveBeenCalledWith(
      expect.objectContaining({ index: 1, hiddenIndexes: [1] }),
    );
  });

  it("forwards locale and texts to the engine", async () => {
    const zh = await mount(
      <PieChart data={[]} locale="zh-CN" animation={false} />,
    );
    expect(screen.getByText("暂无数据")).toBeTruthy();
    await zh.unmount();
    await mount(
      <PieChart
        data={[]}
        locale="fr"
        texts={{ noData: "Vide" }}
        animation={false}
      />,
    );
    expect(screen.getByText("Vide")).toBeTruthy();
  });

  it("names the chart in the provider's language unless it has a locale", async () => {
    const zh = await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <PieChart data={DATA} animation={false} />
      </MinervaProvider>,
    );
    expect(surface().accessibilityLabel).toBe("饼图");
    await zh.unmount();
    const ja = await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <ShapeChart
          options={{ type: "pie", data: [], locale: "ja", animation: false }}
        />
      </MinervaProvider>,
    );
    expect(surface().accessibilityLabel).toBe("円グラフ");
    await ja.unmount();
    const chord = await render(
      <MinervaProvider locale={{ language: "zh" }}>
        <ChordChart
          groups={["A", "B"]}
          matrix={[
            [0, 1],
            [2, 0],
          ]}
          animation={false}
        />
      </MinervaProvider>,
    );
    expect(surface().accessibilityLabel).toBe("弦图");
    await chord.unmount();
    await mount(
      <ChordChart
        groups={["A", "B"]}
        matrix={[
          [0, 1],
          [2, 0],
        ]}
        ariaLabel="Flows"
        animation={false}
      />,
    );
    expect(surface().accessibilityLabel).toBe("Flows");
  });
});
