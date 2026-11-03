// MnQuadrantChart with the real chart engine (Canvas2D fallback under
// happy-dom): the point card replaces the engine tooltip; hover, leave,
// actions and the card of the selected point.
import { Component, signal, viewChild } from "@angular/core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  QUADRANT_CARD_LINGER_MS,
  type ChartHoverEvent,
} from "minerva-design/charts/core";
import { render, settle } from "../../testing";
import { MnQuadrantChart } from ".";

const frame = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => setTimeout(resolve, 0)),
  );

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(500);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(300);
});

afterEach(() => {
  vi.restoreAllMocks();
});

@Component({
  imports: [MnQuadrantChart],
  template: `<mn-quadrant-chart
      [points]="points"
      locale="en"
      [quadrants]="{ topLeft: { label: 'Delegate', badge: 'Q3' } }"
      [selectedIndex]="selected()"
      [pointActions]="withActions() ? actions : null"
      (pointClick)="clicks.push($event.index)"
      (hover)="hovers.push($event)"
    />
    <ng-template #actions let-point let-index="index">
      <button type="button" class="edit">Edit {{ point.label }}</button>
    </ng-template>`,
})
class Host {
  readonly chart = viewChild.required(MnQuadrantChart);
  points = [
    { x: 2, y: 8, label: "Book travel" },
    { x: 9, y: 2, label: "Archive" },
  ];
  readonly selected = signal<number | null>(null);
  readonly withActions = signal(true);
  clicks: number[] = [];
  hovers: Array<ChartHoverEvent | null> = [];
}

/** Renders the chart and waits for its first frame (the plot is laid out) */
async function renderChart() {
  const fixture = await render(Host);
  await settle(fixture);
  await frame();
  await settle(fixture);
  const host = fixture.nativeElement as HTMLElement;
  const engine = fixture.componentInstance.chart().instance()!;
  const stage = host.querySelector(".minerva-chart-stage")!;
  const fire = (type: string, x: number, y: number) => {
    const at = engine.toPixel(x, y)!;
    stage.dispatchEvent(
      new PointerEvent(type, {
        clientX: at.x,
        clientY: at.y,
        pointerId: 1,
        button: 0,
      }),
    );
  };
  const card = () => host.querySelector<HTMLElement>("[data-point-preview]");
  return { fixture, host, engine, fire, card };
}

describe("MnQuadrantChart point card", () => {
  it("shows one point card on hover with the name, the quadrant and the actions; leaving removes it", async () => {
    const { fixture, host, engine, fire, card } = await renderChart();
    const hide = vi.spyOn(engine, "setLabelHidden");
    expect(card()).toBeNull();

    fire("pointermove", 2, 8);
    await settle(fixture);
    expect(card()!.dataset["pointPreview"]).toBe("0");
    expect(card()!.textContent).toContain("Book travel");
    expect(card()!.textContent).toContain("Q3 · Delegate");
    // the hover output is still emitted
    expect(fixture.componentInstance.hovers.at(-1)?.items[0]?.index).toBe(0);
    // no second surface: the engine tooltip stays hidden, the drawn label
    // of the point gives way to the card
    const tip = host.querySelector<HTMLElement>(".minerva-chart-tooltip");
    expect(tip?.style.display ?? "none").toBe("none");
    expect(hide).toHaveBeenLastCalledWith({ seriesIndex: 0, index: 0 });
    // the actions template renders inside the card
    const actions = card()!.querySelector<HTMLElement>("[data-card-actions]")!;
    expect(actions.querySelector(".edit")!.textContent).toBe(
      "Edit Book travel",
    );
    // a click on the name acts like a click on the dot
    card()!
      .querySelector<HTMLElement>("strong")!
      .closest<HTMLElement>("[aria-hidden]")!
      .click();
    expect(fixture.componentInstance.clicks).toEqual([0]);

    // another point takes the card and its actions
    fire("pointermove", 9, 2);
    await settle(fixture);
    expect(card()!.dataset["pointPreview"]).toBe("1");
    expect(host.querySelectorAll(".edit")).toHaveLength(1);
    expect(host.querySelector(".edit")!.textContent).toBe("Edit Archive");

    // off the points: the card lingers a moment, then goes
    fire("pointermove", 5, 5);
    await settle(fixture);
    expect(card()).not.toBeNull();
    await settle(fixture, QUADRANT_CARD_LINGER_MS + 70);
    expect(card()).toBeNull();
    expect(host.querySelector(".edit")).toBeNull();
    expect(hide).toHaveBeenLastCalledWith(null);
  });

  it("shows the card of the selected point only with pointActions", async () => {
    const { fixture, fire, card } = await renderChart();
    fixture.componentInstance.withActions.set(false);
    fixture.componentInstance.selected.set(0);
    await settle(fixture);
    // a plain chart rings its selected point: no card
    expect(card()).toBeNull();

    fixture.componentInstance.withActions.set(true);
    await settle(fixture);
    expect(card()!.dataset["pointPreview"]).toBe("0");
    expect(
      card()!.querySelector("[data-card-actions]")!.textContent!.trim(),
    ).toBe("Edit Book travel");

    // a hover shows another point; the selection comes back after it
    fire("pointermove", 9, 2);
    await settle(fixture);
    expect(card()!.dataset["pointPreview"]).toBe("1");
    fire("pointermove", 5, 5);
    await settle(fixture, QUADRANT_CARD_LINGER_MS + 70);
    expect(card()!.dataset["pointPreview"]).toBe("0");

    // Escape closes it until another point is hovered or selected
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await settle(fixture);
    expect(card()).toBeNull();
    fixture.componentInstance.selected.set(1);
    await settle(fixture);
    expect(card()!.dataset["pointPreview"]).toBe("1");

    fixture.componentInstance.withActions.set(false);
    await settle(fixture);
    expect(card()).toBeNull();
  });
});
