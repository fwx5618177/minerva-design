// The point card of <minerva-quadrant-chart> driven by the real engine
// (canvas fallback of happy-dom): pointer moves on the stage show one card
// per point in the shadow root, in place of the engine tooltip.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { QuadrantPoint } from "minerva-design/charts/core";
import type { MinervaQuadrantChart } from "./charts";

await import("../../elements/chart");
const { mount, settle, wait } = await import("../../../tests/utils");

/** A frame of the engine, then the updates it scheduled */
const flush = async () => {
  await new Promise<void>((resolve) =>
    requestAnimationFrame(() => setTimeout(resolve, 0)),
  );
  await settle();
};

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(500);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(300);
});
afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

const POINTS: QuadrantPoint[] = [
  { x: 2, y: 8, label: "Book travel" },
  { x: 8, y: 2, label: "Archive" },
];

const setup = async (markup = "", points = POINTS) => {
  const el = await mount<MinervaQuadrantChart>(
    `<minerva-quadrant-chart>${markup}</minerva-quadrant-chart>`,
  );
  el.points = points;
  el.quadrants = { topLeft: { label: "Delegate", badge: "Q3" } };
  el.options = { locale: "en" };
  await flush();
  await flush();
  const chart = el.instance!;
  const root = el.shadowRoot!;
  const stage = root.querySelector(".minerva-chart-stage")!;
  const fire = (type: string, x: number, y: number) => {
    const at = chart.toPixel(x, y)!;
    stage.dispatchEvent(
      new PointerEvent(type, {
        clientX: at.x,
        clientY: at.y,
        pointerId: 1,
        button: 0,
      }),
    );
  };
  const card = () => root.querySelector<HTMLElement>("[data-point-preview]");
  return { el, chart, root, fire, card };
};

describe("<minerva-quadrant-chart> point card", () => {
  it("shows one card on hover, with the name and the quadrant, instead of the engine tooltip", async () => {
    const { el, root, fire, card } = await setup();
    expect(root.querySelector("[data-card-host]")).not.toBeNull();
    expect(card()).toBeNull();
    const hovers: unknown[] = [];
    el.addEventListener("minerva-hover", (event) =>
      hovers.push((event as CustomEvent).detail),
    );

    fire("pointermove", 2, 8);
    await flush();
    expect(card()!.dataset.pointPreview).toBe("0");
    expect(card()!.getAttribute("part")).toBe("point-card");
    expect(card()!.closest("[data-card-host]")).not.toBeNull();
    expect(card()!.textContent).toContain("Book travel");
    expect(card()!.textContent).toContain("Q3 · Delegate");
    expect(el.activeIndex).toBe(0);
    // still reported
    expect(hovers.at(-1)).toMatchObject({ items: [{ index: 0 }] });
    // no second surface: the engine tooltip and label chip stay hidden
    const tip = root.querySelector<HTMLElement>(".minerva-chart-tooltip");
    expect(tip?.style.display ?? "none").toBe("none");
    const chip = root.querySelector<HTMLElement>('[data-hover-mark="label"]');
    expect(chip?.style.display ?? "none").toBe("none");
    // without slotted actions: no actions box
    expect(
      card()!.querySelector<HTMLElement>("[data-card-actions]")!.style.display,
    ).toBe("none");

    // a click on the name clicks the point
    const clicks: unknown[] = [];
    el.addEventListener("minerva-point-click", (event) =>
      clicks.push((event as CustomEvent).detail),
    );
    card()!
      .querySelector("strong")!
      .closest<HTMLElement>("[aria-hidden]")!
      .click();
    expect(clicks).toEqual([{ point: POINTS[0], index: 0 }]);

    // another point: the same card, its name
    fire("pointermove", 8, 2);
    await flush();
    expect(root.querySelectorAll("[data-point-preview]")).toHaveLength(1);
    expect(card()!.dataset.pointPreview).toBe("1");
    expect(card()!.textContent).toContain("Archive");

    // off the dots: it lingers a moment, then goes
    fire("pointermove", 5, 5);
    await flush();
    expect(card()).not.toBeNull();
    await wait(250);
    expect(card()).toBeNull();
    expect(el.activeIndex).toBeNull();
  });

  it("puts the slotted actions in the card, and keeps the card of the selected point", async () => {
    const { el, root, fire, card } = await setup(
      `<button slot="point-actions" type="button">Edit</button>`,
    );
    const button = el.querySelector("button")!;
    fire("pointermove", 2, 8);
    await flush();
    const actions = card()!.querySelector<HTMLElement>("[data-card-actions]")!;
    expect(actions.getAttribute("part")).toBe("point-actions");
    expect(actions.style.display).toBe("flex");
    const slot = actions.querySelector<HTMLSlotElement>(
      "slot[name=point-actions]",
    )!;
    expect(slot.assignedElements()).toEqual([button]);
    expect(el.activeIndex).toBe(0);

    // the selected point keeps its card (its actions at hand)
    el.selectedIndex = 1;
    await settle();
    fire("pointermove", 5, 5);
    await wait(250);
    expect(card()!.dataset.pointPreview).toBe("1");
    expect(el.activeIndex).toBe(1);
    expect(root.querySelector("[data-card-actions] slot")).toBe(slot);
  });

  it("shows no card for a selected point without actions", async () => {
    const { el, root, fire, card } = await setup();
    el.selectedIndex = 1;
    await flush();
    expect(root.querySelector("[data-card-host]")).not.toBeNull();
    expect(card()).toBeNull();
    expect(el.activeIndex).toBeNull();
    // a hover still shows it
    fire("pointermove", 8, 2);
    await flush();
    expect(card()!.dataset.pointPreview).toBe("1");
  });

  it("names the focused point button, and goes with the element", async () => {
    const { el, root, card } = await setup();
    const button = root.querySelector<HTMLButtonElement>(
      'button[data-point-index="1"]',
    )!;
    button.focus();
    await settle();
    expect(card()!.dataset.pointPreview).toBe("1");
    button.blur();
    await wait(10);
    expect(card()).toBeNull();
    button.focus();
    await settle();
    expect(card()).not.toBeNull();
    el.remove();
    expect(card()).toBeNull();
  });
});
