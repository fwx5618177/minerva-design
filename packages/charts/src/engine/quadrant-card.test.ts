import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  CARD_LINGER_MS,
  createQuadrantPointCard,
  withQuadrantCard,
  type QuadrantPointCard,
  type QuadrantPointCardOptions,
} from "./quadrant-card";
import type { ChartInstance } from "./types";

const points = [
  { x: 2, y: 8, label: "Report" },
  { x: 9, y: 8, label: "Offline sync" },
  { x: 3, y: 2, label: "Icons" },
];

let host: HTMLDivElement;
let card: QuadrantPointCard | null = null;

const mount = (extra: Partial<QuadrantPointCardOptions> = {}) => {
  const options: QuadrantPointCardOptions = {
    config: { points, quadrants: { topRight: { label: "Big bets" } } },
    locale: "en",
    ...extra,
  };
  card = createQuadrantPointCard(host, options);
  return { card, options };
};
const surfacePosition = () => {
  const match = card!.element.style.transform.match(
    /^translate\(([-\d.]+)px, ([-\d.]+)px\)$/,
  );
  expect(match).not.toBeNull();
  return { x: Number(match![1]), y: Number(match![2]) };
};
const shown = () =>
  host.querySelector<HTMLElement>("[data-point-preview]")?.dataset
    .pointPreview ?? null;

beforeEach(() => {
  vi.useFakeTimers();
  host = document.createElement("div");
  host.style.width = "400px";
  host.style.height = "200px";
  document.body.appendChild(host);
});

afterEach(() => {
  card?.destroy();
  card = null;
  host.remove();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("quadrant point card", () => {
  it("keeps small and large points outside a card of the same size", () => {
    mount({
      config: {
        points: [
          { x: 2, y: 8, label: "Small", size: 12 },
          { x: 2, y: 8, label: "Bubble", size: 36 },
        ],
      },
    });
    vi.spyOn(card!.element, "offsetWidth", "get").mockReturnValue(160);
    vi.spyOn(card!.element, "offsetHeight", "get").mockReturnValue(56);
    card!.hover(0);
    expect(surfacePosition().x).toBeCloseTo(96);
    expect(surfacePosition().y).toBeCloseTo(12);
    const padding = card!.element.style.paddingLeft;
    const dot = card!.element.querySelector<HTMLElement>("[data-card-dot]")!;
    expect(dot.style.width).toBe("12px");
    expect(dot.style.left).toBe("-23px");
    card!.hover(1);
    expect(surfacePosition().x).toBeCloseTo(108);
    expect(surfacePosition().y).toBeCloseTo(12);
    expect(card!.element.style.paddingLeft).toBe(padding);
    expect(dot.style.width).toBe("36px");
    expect(dot.style.left).toBe("-47px");
    // Surface x108 + border1 + dot offset -47 + radius18 = data x80.
    expect(108 + 1 + parseFloat(dot.style.left) + 18).toBe(80);
  });

  it("places the surface to the left at the right edge without reversing its actions", () => {
    mount({
      config: { points: [{ x: 9, y: 8, label: "Right", size: 36 }] },
      hasActions: () => true,
    });
    vi.spyOn(card!.element, "offsetWidth", "get").mockReturnValue(160);
    vi.spyOn(card!.element, "offsetHeight", "get").mockReturnValue(56);
    card!.hover(0);
    expect(surfacePosition().x).toBeCloseTo(172);
    expect(surfacePosition().y).toBeCloseTo(12);
    const dot = card!.element.querySelector<HTMLElement>("[data-card-dot]")!;
    expect(dot.style.left).toBe("169px");
    // Card right332, dot left342: exactly 10px of clear space.
    expect(card!.element.style.textAlign).toBe("left");
    expect(
      host.querySelector<HTMLElement>("[data-card-content]")!.style
        .gridTemplateAreas,
    ).toBe('"label actions" "meta meta"');
  });

  it("uses vertical space when a wide card cannot fit beside the bubble", () => {
    mount({ config: { points: [{ x: 5, y: 5, label: "Wide", size: 36 }] } });
    host.style.width = "220px";
    host.style.height = "200px";
    vi.spyOn(card!.element, "offsetWidth", "get").mockReturnValue(180);
    vi.spyOn(card!.element, "offsetHeight", "get").mockReturnValue(56);
    card!.hover(0);
    const coords = card!.element.style.transform.match(
      /^translate\(([-\d.]+)px, ([-\d.]+)px\)$/,
    );
    expect(coords).not.toBeNull();
    const x = Number(coords![1]),
      y = Number(coords![2]);
    expect(x).toBeGreaterThanOrEqual(6);
    expect(x + 180).toBeLessThanOrEqual(214);
    expect(y + 56 <= 72 || y >= 128).toBe(true);
  });

  it("refreshes cached drag dimensions when ResizeObserver reports a content resize", () => {
    let resize = () => {};
    vi.stubGlobal(
      "ResizeObserver",
      class {
        constructor(callback: () => void) {
          resize = callback;
        }
        observe() {}
        disconnect() {}
      },
    );
    mount();
    vi.spyOn(card!.element, "offsetWidth", "get").mockReturnValue(160);
    const height = vi
      .spyOn(card!.element, "offsetHeight", "get")
      .mockReturnValue(60);
    card!.drag(0, { x: 2, y: 8 });
    const before = card!.element.style.transform;
    height.mockReturnValue(250);
    resize();
    expect(card!.element.style.transform).not.toBe(before);
  });

  it("keeps live dimension reads when ResizeObserver is unavailable", () => {
    vi.stubGlobal("ResizeObserver", undefined);
    mount();
    const height = vi
      .spyOn(card!.element, "offsetHeight", "get")
      .mockReturnValue(60);
    card!.drag(0, { x: 2, y: 8 });
    const before = card!.element.style.transform;
    height.mockReturnValue(250);
    card!.move({ x: 2, y: 8 });
    vi.advanceTimersByTime(20);
    expect(card!.element.style.transform).not.toBe(before);
  });

  it("switches to another point immediately after leaving the card", () => {
    mount();
    card!.hover(0);
    const body = host.querySelector<HTMLElement>("[data-card-content]")!;
    body.dispatchEvent(new PointerEvent("pointerenter"));
    card!.hover(null);
    body.dispatchEvent(new PointerEvent("pointerleave"));
    card!.hover(1);
    expect(shown()).toBe("1");
    vi.advanceTimersByTime(CARD_LINGER_MS + 1);
    expect(shown()).toBe("1");
  });

  it("lets the card go after the pointer leaves an action it clicked", () => {
    mount();
    card!.hover(0);
    const body = host.querySelector<HTMLElement>("[data-card-content]")!;
    const button = document.createElement("button");
    card!.actions.appendChild(button);
    body.dispatchEvent(new PointerEvent("pointerenter"));
    // a mouse click: press, focus, release
    button.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    button.focus();
    button.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
    card!.hover(null);
    body.dispatchEvent(new PointerEvent("pointerleave"));
    expect(document.activeElement).toBe(button);
    vi.advanceTimersByTime(CARD_LINGER_MS + 1);
    expect(shown()).toBeNull();
  });

  it("keeps the card while keyboard focus is in its actions", () => {
    mount();
    card!.hover(0);
    const body = host.querySelector<HTMLElement>("[data-card-content]")!;
    const button = document.createElement("button");
    card!.actions.appendChild(button);
    body.dispatchEvent(new PointerEvent("pointerenter"));
    button.focus();
    card!.hover(null);
    body.dispatchEvent(new PointerEvent("pointerleave"));
    vi.advanceTimersByTime(CARD_LINGER_MS + 1);
    expect(shown()).toBe("0");
    button.blur();
    vi.advanceTimersByTime(CARD_LINGER_MS + 1);
    expect(shown()).toBeNull();
  });

  it("treats a clicked action as keyboard focus once a key is pressed on it", () => {
    mount();
    card!.hover(0);
    const body = host.querySelector<HTMLElement>("[data-card-content]")!;
    const button = document.createElement("button");
    card!.actions.appendChild(button);
    body.dispatchEvent(new PointerEvent("pointerenter"));
    button.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    button.focus();
    // released outside the card
    document.body.dispatchEvent(
      new PointerEvent("pointerup", { bubbles: true }),
    );
    button.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", bubbles: true }),
    );
    card!.hover(null);
    body.dispatchEvent(new PointerEvent("pointerleave"));
    vi.advanceTimersByTime(CARD_LINGER_MS + 1);
    expect(shown()).toBe("0");
  });

  it("lets a new hover replace a card whose action retains focus", () => {
    mount();
    card!.hover(0);
    const body = host.querySelector<HTMLElement>("[data-card-content]")!;
    const button = document.createElement("button");
    card!.actions.appendChild(button);
    body.dispatchEvent(new PointerEvent("pointerenter"));
    button.focus();
    card!.hover(null);
    body.dispatchEvent(new PointerEvent("pointerleave"));
    vi.advanceTimersByTime(CARD_LINGER_MS + 1);
    expect(shown()).toBe("0");
    expect(document.activeElement).toBe(button);
    card!.hover(1);
    expect(shown()).toBe("1");
    vi.advanceTimersByTime(CARD_LINGER_MS + 1);
    expect(shown()).toBe("1");
  });

  it("lets a new hover replace a focused card before linger expires", () => {
    mount();
    card!.hover(0);
    const body = host.querySelector<HTMLElement>("[data-card-content]")!;
    const button = document.createElement("button");
    card!.actions.appendChild(button);
    body.dispatchEvent(new PointerEvent("pointerenter"));
    button.focus();
    body.dispatchEvent(new PointerEvent("pointerleave"));
    card!.hover(1);
    expect(shown()).toBe("1");
  });

  it("keeps the card while its body owns the pointer", () => {
    mount();
    card!.hover(0);
    const body = host.querySelector<HTMLElement>("[data-card-content]")!;
    body.dispatchEvent(new PointerEvent("pointerenter"));
    card!.hover(1);
    expect(shown()).toBe("0");
  });

  it("reuses measured dimensions during drag frames and remeasures on explicit placement", () => {
    mount();
    const width = vi
      .spyOn(card!.element, "offsetWidth", "get")
      .mockReturnValue(160);
    const height = vi
      .spyOn(card!.element, "offsetHeight", "get")
      .mockReturnValue(60);
    card!.drag(0, { x: 2, y: 8 });
    width.mockClear();
    height.mockClear();
    for (let i = 0; i < 5; i++) {
      card!.move({ x: 3 + i, y: 7 });
      vi.advanceTimersByTime(20);
    }
    expect(width).not.toHaveBeenCalled();
    expect(height).not.toHaveBeenCalled();
    card!.place();
    expect(width).toHaveBeenCalledTimes(1);
    expect(height).toHaveBeenCalledTimes(1);
  });

  it("turns off the engine tooltip, label chip and drag pill", () => {
    const options = withQuadrantCard({
      series: [],
      interaction: { dragPoints: true },
    });
    expect(options.tooltip).toBe(false);
    expect(options.interaction).toMatchObject({
      dragPoints: true,
      dragLabel: false,
      hoverLabel: false,
    });
  });

  it("names the hovered point and its quadrant, then lingers and goes", () => {
    const setLabelHidden = vi.fn();
    const onChange = vi.fn();
    mount({
      chart: { setLabelHidden } as unknown as ChartInstance,
      onChange,
    });
    expect(shown()).toBeNull();
    card!.hover(1);
    expect(shown()).toBe("1");
    expect(host.textContent).toContain("Offline sync");
    expect(host.textContent).toContain("Big bets");
    expect(setLabelHidden).toHaveBeenLastCalledWith({
      seriesIndex: 0,
      index: 1,
    });
    expect(onChange).toHaveBeenLastCalledWith(1);
    // mirrored near the right edge (no layout in happy-dom: by position)
    expect(
      host.querySelector<HTMLElement>("[data-point-preview]")!.dataset.side,
    ).toBe("end");
    card!.hover(null);
    vi.advanceTimersByTime(CARD_LINGER_MS - 10);
    expect(shown()).toBe("1");
    vi.advanceTimersByTime(20);
    expect(shown()).toBeNull();
    expect(setLabelHidden).toHaveBeenLastCalledWith(null);
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it("is held while the pointer is in it, and goes after it leaves", () => {
    mount();
    card!.hover(0);
    card!.hover(null);
    const body = host.querySelector<HTMLElement>("[data-card-content]")!;
    body.dispatchEvent(new PointerEvent("pointerenter"));
    vi.advanceTimersByTime(1000);
    expect(shown()).toBe("0");
    body.dispatchEvent(new PointerEvent("pointerleave"));
    vi.advanceTimersByTime(CARD_LINGER_MS + 10);
    expect(shown()).toBeNull();
  });

  it("keeps its point through new arrays of the same points, drops a changed one", () => {
    const { options } = mount();
    card!.hover(0);
    card!.update({
      ...options,
      config: { ...options.config, points: points.map((p) => ({ ...p })) },
    });
    expect(shown()).toBe("0");
    card!.update({
      ...options,
      config: {
        ...options.config,
        points: [{ x: 5, y: 5, label: "Other" }, ...points.slice(1)],
      },
    });
    expect(shown()).toBeNull();
  });

  it("shows the selected point only on boards, and closes with Escape", () => {
    const onDismiss = vi.fn();
    const { options } = mount({ selectedIndex: 2 });
    expect(shown()).toBeNull();
    card!.update({
      ...options,
      selectedIndex: 2,
      showSelected: true,
      onDismiss,
    });
    expect(shown()).toBe("2");
    // a hover takes over, the selection comes back after it
    card!.hover(0);
    expect(shown()).toBe("0");
    card!.hover(null);
    vi.advanceTimersByTime(CARD_LINGER_MS + 10);
    expect(shown()).toBe("2");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(shown()).toBeNull();
    expect(onDismiss).toHaveBeenCalledTimes(1);
    // another hover shows a card again
    card!.hover(1);
    expect(shown()).toBe("1");
  });

  it("keeps the card while the focus moves from a point button into its actions", () => {
    mount({ hasActions: () => true });
    const button = document.createElement("button");
    card!.actions.appendChild(button);
    card!.focus(0);
    expect(shown()).toBe("0");
    // the button loses the focus, the action gets it in the same task
    card!.focus(null);
    button.focus();
    vi.advanceTimersByTime(CARD_LINGER_MS + 10);
    expect(shown()).toBe("0");
    button.blur();
    vi.advanceTimersByTime(CARD_LINGER_MS + 10);
    expect(shown()).toBeNull();
  });

  it("follows a dragged point without its actions and reports no point", () => {
    const onChange = vi.fn();
    mount({ hasActions: () => true, onChange });
    card!.drag(0, { x: 2, y: 8 });
    const el = host.querySelector<HTMLElement>("[data-point-preview]")!;
    expect(el.dataset.dragging).toBe("");
    expect(card!.actions.style.display).toBe("none");
    expect(onChange).not.toHaveBeenCalledWith(0);
    const before = el.style.transform;
    card!.move({ x: 8, y: 2 });
    vi.advanceTimersByTime(50);
    expect(el.style.transform).not.toBe(before);
    card!.drag(null);
    expect(shown()).toBeNull();
  });

  it("forwards a click on the name", () => {
    const onClick = vi.fn();
    mount({ onClick });
    card!.hover(2);
    host
      .querySelector<HTMLElement>("[data-card-content] > [aria-hidden]")!
      .click();
    expect(onClick).toHaveBeenCalledWith(2);
  });
});
