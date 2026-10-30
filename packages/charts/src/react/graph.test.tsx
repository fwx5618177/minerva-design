import { act, render } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DependencyGraph, GraphChart, TreeChart } from "../index";
import type { GraphEdge, GraphNode } from "../engine/graph/types";
import type { GraphChartHandle } from "./graph";

const flush = () =>
  act(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => setTimeout(resolve, 0)),
      ),
  );

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(600);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(400);
});

afterEach(() => {
  vi.restoreAllMocks();
});

const NODES: GraphNode[] = [
  { id: "root", label: "Root" },
  { id: "a", label: "A" },
  { id: "b", label: "B" },
  { id: "a1", label: "A1" },
];
const EDGES: GraphEdge[] = [
  { source: "root", target: "a" },
  { source: "root", target: "b" },
  { source: "a", target: "a1" },
];

describe("graph components", () => {
  it("renders a sized network and exposes an imperative handle", async () => {
    const ref = createRef<GraphChartHandle>();
    const onLayoutEnd = vi.fn();
    const onSelectionChange = vi.fn();
    const { container, unmount } = render(
      <GraphChart
        ref={ref}
        height={320}
        nodes={NODES}
        edges={EDGES}
        force={{ animate: false }}
        ariaLabel="Network"
        onLayoutEnd={onLayoutEnd}
        onSelectionChange={onSelectionChange}
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.height).toBe("320px");
    expect(root.style.width).toBe("100%");
    expect(container.querySelector('[aria-label="Network"]')).not.toBeNull();
    await flush();
    await flush();
    expect(onLayoutEnd).toHaveBeenCalledWith({ layout: "force" });
    const handle = ref.current!;
    expect(Object.keys(handle.getPositions())).toEqual([
      "root",
      "a",
      "b",
      "a1",
    ]);
    act(() => handle.select(["a"]));
    expect(handle.getSelection()).toEqual(["a"]);
    expect(onSelectionChange).toHaveBeenCalledWith(["a"]);
    act(() => {
      handle.fit(false);
      handle.focusNode("b", { animate: false });
      handle.relayout();
      handle.expand();
      handle.collapse();
      handle.toggle("a");
      handle.setData({ nodes: NODES.slice(0, 2), edges: EDGES.slice(0, 1) });
    });
    expect(Object.keys(handle.getPositions())).toEqual(["root", "a"]);
    expect(handle.getRenderer()).toBeNull();
    expect(handle.getInstance()).not.toBeNull();
    unmount();
    expect(container.querySelector(".minerva-chart-graph")).toBeNull();
    // a handle without an instance
    expect(handle.getSelection()).toEqual([]);
    expect(handle.getPositions()).toEqual({});
    expect(handle.getRenderer()).toBeNull();
  });

  it("keeps the engine options while inline props describe the same chart", async () => {
    const ref = createRef<GraphChartHandle>();
    const { rerender, unmount } = render(
      <DependencyGraph
        ref={ref}
        nodes={NODES}
        edges={EDGES}
        dag={{ nodeGap: 20 }}
        criticalPath
        palette={["#123456"]}
      />,
    );
    await flush();
    const instance = ref.current!.getInstance()!;
    const setOptions = vi.spyOn(instance, "setOptions");
    rerender(
      <DependencyGraph
        ref={ref}
        nodes={[...NODES]}
        edges={EDGES}
        dag={{ nodeGap: 20 }}
        criticalPath
        palette={["#123456"]}
      />,
    );
    await flush();
    expect(setOptions).not.toHaveBeenCalled();
    rerender(
      <DependencyGraph
        ref={ref}
        nodes={NODES}
        edges={EDGES}
        direction="LR"
        dag={{ nodeGap: 30 }}
        palette={["#123456"]}
      />,
    );
    await flush();
    expect(setOptions).toHaveBeenCalledTimes(1);
    expect(setOptions.mock.calls[0][0]).toMatchObject({
      layout: "dag",
      direction: "LR",
      dag: { nodeGap: 30 },
    });
    unmount();
  });

  it("renders trees and forwards the events", async () => {
    const ref = createRef<GraphChartHandle>();
    const onToggle = vi.fn();
    const onHover = vi.fn();
    const onItemClick = vi.fn();
    const onGroupToggle = vi.fn();
    const onRendererChange = vi.fn();
    const { container, rerender, unmount } = render(
      <TreeChart
        ref={ref}
        nodes={NODES.map((n, i) => ({ ...n, group: i % 2 ? "x" : "y" }))}
        edges={EDGES}
        layout="org"
        width={500}
        className="org"
        style={{ border: "1px solid" }}
        onToggle={onToggle}
        onHover={onHover}
        onItemClick={onItemClick}
        onGroupToggle={onGroupToggle}
        onRendererChange={onRendererChange}
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toBe("org");
    expect(root.style.width).toBe("500px");
    await flush();
    act(() => ref.current!.toggle("a"));
    expect(onToggle).toHaveBeenCalledWith({ id: "a", collapsed: true });
    const legend = container.querySelectorAll<HTMLButtonElement>(
      ".minerva-chart-legend button",
    );
    act(() => legend[0].click());
    expect(onGroupToggle).toHaveBeenCalled();
    const stage = container.querySelector<HTMLElement>(".minerva-chart-stage")!;
    act(() => {
      stage.dispatchEvent(new FocusEvent("focus"));
      stage.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
      );
      stage.dispatchEvent(
        new KeyboardEvent("keydown", { key: " ", bubbles: true }),
      );
    });
    expect(onHover).toHaveBeenCalled();
    expect(onItemClick).toHaveBeenCalled();
    rerender(
      <TreeChart nodes={NODES} edges={EDGES} layout="mindmap" ref={ref} />,
    );
    await flush();
    rerender(<TreeChart nodes={NODES} edges={EDGES} ref={ref} height="50vh" />);
    await flush();
    expect((container.firstElementChild as HTMLElement).style.height).toBe(
      "50vh",
    );
    unmount();
  });
});
