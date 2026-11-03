// QuadrantChart with the real engine (happy-dom, sized by mocked client
// sizes): the point card of the hovered, focused, dragged or (with the
// `point-actions` slot) selected point, in place of the engine tooltip.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import {
  QUADRANT_CARD_LINGER_MS,
  type ChartInstance,
  type QuadrantPoint,
} from "minerva-design/charts/core";
import { QuadrantChart } from ".";
import type { ChartHandle } from "./types";

/** A frame of the engine, then the Vue updates it caused */
const flush = async () => {
  await new Promise<void>((resolve) =>
    requestAnimationFrame(() => setTimeout(resolve, 0)),
  );
  await nextTick();
};
/** The card stays a moment after the pointer leaves its dot */
const linger = async () => {
  await new Promise((resolve) =>
    setTimeout(resolve, QUADRANT_CARD_LINGER_MS + 70),
  );
  await nextTick();
};

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(500);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(300);
});

afterEach(() => {
  vi.restoreAllMocks();
});

const actions = {
  "point-actions": ({ point }: { point: QuadrantPoint }) =>
    h("button", { type: "button" }, `Edit ${point.label}`),
};

const mountChart = async (
  props: { points: QuadrantPoint[] } & Record<string, unknown>,
  slots: Record<string, unknown> = {},
) => {
  const wrapper = mount(QuadrantChart, {
    props: { locale: "en", ...props },
    slots: slots as never,
    attachTo: document.body,
  });
  await flush();
  const root = wrapper.element as HTMLElement;
  const chart = (
    wrapper.vm as unknown as ChartHandle
  ).getInstance() as ChartInstance | null;
  const stage = root.querySelector(".minerva-chart-stage")!;
  let buttons = 0;
  const fire = (type: string, x: number, y: number) => {
    if (type === "pointerdown") buttons = 1;
    if (type === "pointerup" || type === "pointercancel") buttons = 0;
    const at = chart!.toPixel(x, y)!;
    stage.dispatchEvent(
      new PointerEvent(type, {
        clientX: at.x,
        clientY: at.y,
        pointerId: 1,
        button: 0,
        buttons,
      }),
    );
  };
  const card = () => root.querySelector<HTMLElement>("[data-point-preview]");
  return { wrapper, root, chart: chart!, fire, card };
};

describe("QuadrantChart point card", () => {
  it("shows the card of the hovered point in place of the engine tooltip, then lets it go", async () => {
    const points = [
      { x: 2, y: 8, label: "Book travel" },
      { x: 9, y: 2, label: "Archive" },
    ];
    const { wrapper, root, chart, fire, card } = await mountChart({
      points,
      quadrants: { topLeft: { label: "Delegate", badge: "Q3" } },
    });
    expect(chart).not.toBeNull();
    const hide = vi.spyOn(chart, "setLabelHidden");
    // the box of the card covers the plot, without catching the pointer
    const host = root.querySelector<HTMLElement>(
      ".minerva-chart-overlay > div:last-child",
    )!;
    expect(host.style.pointerEvents).toBe("none");
    expect(parseFloat(host.style.width)).toBeGreaterThan(0);
    expect(card()).toBeNull();

    fire("pointermove", 2, 8);
    await flush();
    expect(card()!.dataset.pointPreview).toBe("0");
    expect(card()!.textContent).toContain("Book travel");
    expect(card()!.textContent).toContain("Q3 · Delegate");
    expect(host.contains(card())).toBe(true);
    // still reported to the app
    expect(wrapper.emitted("hover")!.at(-1)![0]).toMatchObject({
      items: [{ index: 0 }],
    });
    // no second surface: no engine tooltip; the drawn label gives way
    const tip = root.querySelector<HTMLElement>(".minerva-chart-tooltip");
    expect(tip?.style.display ?? "none").toBe("none");
    expect(hide).toHaveBeenLastCalledWith({ seriesIndex: 0, index: 0 });
    // no slot: no actions
    expect(
      card()!.querySelector<HTMLElement>("[data-card-actions]")!.style.display,
    ).toBe("none");

    // a click on the name clicks the point
    card()!
      .querySelector("strong")!
      .closest<HTMLElement>("[aria-hidden]")!
      .click();
    expect(wrapper.emitted("pointClick")).toEqual([[points[0], 0]]);

    // off the dot: the card lingers a moment, then goes
    fire("pointermove", 5, 5);
    await flush();
    expect(card()).not.toBeNull();
    await linger();
    expect(card()).toBeNull();
    expect(hide).toHaveBeenLastCalledWith(null);
  });

  it("renders the point-actions slot in the card of the point", async () => {
    const points = [
      { x: 2, y: 8, label: "Report" },
      { x: 8, y: 2, label: "Archive" },
    ];
    const { root, fire, card } = await mountChart({ points }, actions);
    // no zero-size box at the dot any more
    expect(root.querySelector(".minerva-chart-quadrant-point")).toBeNull();

    fire("pointermove", 2, 8);
    await flush();
    const box = () =>
      card()!.querySelector<HTMLElement>("[data-card-actions]")!;
    expect(box().style.display).toBe("flex");
    expect(box().textContent).toBe("Edit Report");
    expect(box().closest('[aria-hidden="true"]')).toBeNull();

    // another point: its actions
    fire("pointermove", 8, 2);
    await flush();
    expect(card()!.dataset.pointPreview).toBe("1");
    expect(box().textContent).toBe("Edit Archive");
    expect(root.querySelectorAll("[data-card-actions] button")).toHaveLength(1);
  });

  it("keeps the card of the selected point only with the point-actions slot", async () => {
    const points = [
      { x: 2, y: 8, label: "Report" },
      { x: 8, y: 2, label: "Archive" },
    ];
    // a plain chart: the selection is a ring, no card
    const plain = await mountChart({ points, selectedIndex: 0 });
    expect(plain.card()).toBeNull();
    plain.wrapper.unmount();

    // a board: the actions of the selected point stay at hand
    const board = await mountChart({ points, selectedIndex: 0 }, actions);
    expect(board.card()!.dataset.pointPreview).toBe("0");
    expect(
      board.card()!.querySelector("[data-card-actions]")!.textContent,
    ).toBe("Edit Report");
    // a hover shows another point; the selection comes back after it
    board.fire("pointermove", 8, 2);
    await flush();
    expect(board.card()!.dataset.pointPreview).toBe("1");
    board.fire("pointermove", 5, 5);
    await linger();
    expect(board.card()!.dataset.pointPreview).toBe("0");
    // a new selection
    await board.wrapper.setProps({ selectedIndex: 1 });
    await flush();
    expect(board.card()!.dataset.pointPreview).toBe("1");
    expect(
      board.card()!.querySelector("[data-card-actions]")!.textContent,
    ).toBe("Edit Archive");
    await board.wrapper.setProps({ selectedIndex: null });
    await flush();
    expect(board.card()).toBeNull();
  });

  it("shows the card of the focused point button", async () => {
    const points = [{ x: 2, y: 8, label: "Report" }];
    const { root, card } = await mountChart({ points });
    const button = root.querySelector<HTMLButtonElement>(
      'button[data-point-index="0"]',
    )!;
    button.focus();
    await flush();
    expect(card()!.dataset.pointPreview).toBe("0");
    button.blur();
    await flush();
    expect(card()).toBeNull();
  });

  it("follows a dragged point without its actions, then shows them again", async () => {
    const points = [{ x: 2, y: 8, label: "Report" }];
    const onPointDrop = vi.fn();
    const { fire, card } = await mountChart({ points, onPointDrop }, actions);
    fire("pointermove", 2, 8);
    fire("pointerdown", 2, 8);
    fire("pointermove", 3, 7);
    fire("pointermove", 8, 2);
    await flush();
    expect(card()!.hasAttribute("data-dragging")).toBe(true);
    expect(
      card()!.querySelector<HTMLElement>("[data-card-actions]")!.style.display,
    ).toBe("none");
    // the quadrant under the pointer, live
    expect(card()!.textContent).toContain("Bottom right quadrant");
    fire("pointerup", 8, 2);
    await flush();
    expect(onPointDrop).toHaveBeenCalledTimes(1);
    expect(card()?.hasAttribute("data-dragging") ?? false).toBe(false);
  });

  it("destroys the card on unmount", async () => {
    const points = [{ x: 2, y: 8, label: "Report" }];
    const { wrapper, fire, card } = await mountChart({ points });
    fire("pointermove", 2, 8);
    await flush();
    expect(card()).not.toBeNull();
    wrapper.unmount();
    expect(document.querySelector("[data-point-preview]")).toBeNull();
  });
});
