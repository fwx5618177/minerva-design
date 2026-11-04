// MnQuadrantChart with a fake chart engine (the real one needs a GPU /
// canvas browser): the headers are templates of MnQuadrantChart placed over
// the plot area reported by the engine (`layout`), the actions of the active
// task are rendered in its point card; add / edit / delete happen in an
// inline panel inside the board (not a modal).
import { Component, signal } from "@angular/core";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { QuadrantPoint } from "minerva-design/charts/core";
import { QUADRANT_CARD_LINGER_MS } from "minerva-design/charts/core";
import { render, screen, settle, user, within } from "../../testing";
import { MnQuadrantChart, MnQuadrantTaskBoard } from ".";

type Listener = (event: unknown) => void;
interface FakeEngine {
  options: Record<string, unknown>;
  hiddenLabel?: unknown;
  fire(type: string, event: unknown): void;
}
const engines: FakeEngine[] = [];

vi.mock("minerva-design/charts/core", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("minerva-design/charts/core")>();
  return {
    ...actual,
    createChart: (
      _container: HTMLElement,
      options: Record<string, unknown>,
    ) => {
      const listeners = new Map<string, Set<Listener>>();
      const engine: FakeEngine = {
        options,
        fire: (type, event) =>
          listeners.get(type)?.forEach((listener) => listener(event)),
      };
      engines.push(engine);
      return {
        setOptions: (next: Record<string, unknown>) => {
          engine.options = next;
        },
        destroy: vi.fn(),
        resetZoom: vi.fn(),
        getView: () => null,
        getRenderer: () => "canvas2d",
        setLabelHidden: (point: unknown) => {
          engine.hiddenLabel = point;
        },
        // the plot of `layout` below: 400 x 300 at (40, 10), [0, 10] domains
        toPixel: (x: number, y: number) => ({
          x: 40 + 40 * x,
          y: 10 + 30 * (10 - y),
        }),
        on: (type: string, listener: Listener) => {
          if (!listeners.has(type)) listeners.set(type, new Set());
          listeners.get(type)!.add(listener);
          return () => listeners.get(type)!.delete(listener);
        },
      };
    },
  };
});

beforeEach(() => {
  engines.length = 0;
});

@Component({
  imports: [MnQuadrantTaskBoard],
  template: `<mn-quadrant-task-board
    [(points)]="points"
    locale="en"
    [quadrants]="{ topLeft: { label: 'Do first', badge: 'Q1' } }"
    (pointsChange)="changes.push($event)"
  />`,
})
class Board {
  readonly points = signal<QuadrantPoint[]>([
    { x: 8, y: 8, label: "Ship", color: "#f00", id: "ship" } as QuadrantPoint,
    { x: 2, y: 2, label: "Email" },
  ]);
  changes: QuadrantPoint[][] = [];
}

/** Renders the board and lays out the plot (the templates appear) */
async function renderBoard() {
  const fixture = await render(Board);
  await settle(fixture);
  engines[0]!.fire("layout", { x: 40, y: 10, width: 400, height: 300 });
  await settle(fixture);
  return fixture;
}

const dialog = () => screen.queryByRole("dialog");

describe("MnQuadrantTaskBoard", () => {
  it("shows a header per quadrant (title, count, add) instead of the drawn titles", async () => {
    const fixture = await renderBoard();
    const host = fixture.nativeElement as HTMLElement;
    const overlay = host.querySelector<HTMLElement>(".minerva-chart-overlay")!;
    expect(overlay.style.left).toBe("40px");
    expect(overlay.style.width).toBe("400px");
    const header = host.querySelector<HTMLElement>(
      '.minerva-chart-quadrant-header-topLeft [data-corner="topLeft"]',
    )!;
    expect(header.textContent).toContain("Q1");
    expect(header.textContent).toContain("Do first");
    expect(header.querySelector(".count")!.textContent).toBe("0");
    expect(
      host.querySelector('[data-corner="topRight"] .count')!.textContent,
    ).toBe("1");
    expect(
      within(header).getByRole("button", { name: "Add task · Do first" }),
    ).toBeTruthy();
    // the chart no longer draws the titles and counts
    const areas = engines[0]!.options.annotations as Array<{
      label?: string;
      badge?: string;
    }>;
    expect(areas.slice(0, 4).every((a) => !a.label && !a.badge)).toBe(true);
    expect(JSON.stringify(engines[0]!.options)).toContain('"dragPoints":true');
  });

  it("adds a task in an inline panel: Cancel leaves the data, Save emits the appended task", async () => {
    const fixture = await renderBoard();
    const host = fixture.nativeElement as HTMLElement;
    const u = user();
    const add = () =>
      screen.getByRole("button", { name: "Add task · Do first" });

    expect(add().getAttribute("aria-expanded")).toBe("false");
    await u.click(add());
    await settle(fixture);
    const panel = screen.getByRole("dialog", { name: "Add task" });
    // inline in the board, not a modal in a portal
    const board = host.querySelector<HTMLElement>("mn-quadrant-task-board")!;
    expect(panel.parentElement).toBe(board);
    expect(board.dataset["panel"]).toBe("draft");
    expect(panel.dataset["quadrantTaskPanel"]).toBe("add");
    expect(panel.style.left).toMatch(/px$/);
    expect(panel.dataset["placement"]).toMatch(/^(top|bottom)$/);
    expect(add().getAttribute("aria-expanded")).toBe("true");
    const name = within(panel).getByRole("textbox", { name: "Task name" });
    expect(document.activeElement).toBe(name);
    // the quadrant picker: a radio per quadrant, the add button's checked
    expect(
      within(panel)
        .getAllByRole("radio")
        .map((r) => r.closest("[data-corner]")!.getAttribute("data-corner")),
    ).toEqual(["topLeft", "topRight", "bottomLeft", "bottomRight"]);
    expect(
      within(panel).getByRole("radio", { name: "Do first" }),
    ).toBeChecked();
    await u.type(name, "Draft");
    await u.click(within(panel).getByRole("button", { name: "Cancel" }));
    await settle(fixture);
    expect(dialog()).toBeNull();
    expect(board.hasAttribute("data-panel")).toBe(false);
    expect(fixture.componentInstance.changes).toEqual([]);

    await u.click(add());
    await settle(fixture);
    const save = screen.getByRole("button", { name: "Save" });
    expect(save).toBeDisabled();
    await u.type(screen.getByRole("textbox", { name: "Task name" }), " Plan ");
    await settle(fixture);
    expect(save).toBeEnabled();
    await u.click(save);
    await settle(fixture);
    const [first, second] = fixture.componentInstance.changes[0]!.slice(0, 2);
    expect(fixture.componentInstance.changes).toHaveLength(1);
    expect(first!.label).toBe("Ship");
    expect(second!.label).toBe("Email");
    expect(fixture.componentInstance.changes[0]![2]).toEqual({
      x: 2.5,
      y: 7.5,
      label: "Plan",
    });
    // [(points)] took the new list; the new task is the active one
    expect(fixture.componentInstance.points()).toHaveLength(3);
    expect(dialog()).toBeNull();
    // the new task is selected: its card shows
    expect(
      (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
        "[data-point-preview]",
      )!.dataset["pointPreview"],
    ).toBe("2");
  });

  it("Escape closes the panel and gives the focus back (a press inside keeps it open)", async () => {
    const fixture = await renderBoard();
    const u = user();
    const add = screen.getByRole("button", { name: "Add task · Do first" });
    await u.click(add);
    await settle(fixture);
    expect(dialog()).not.toBeNull();
    await u.click(screen.getByRole("radio", { name: "Top right quadrant" }));
    await settle(fixture);
    expect(dialog()).not.toBeNull();
    await u.click(screen.getByRole("textbox", { name: "Task name" }));
    await u.keyboard("{Escape}");
    await settle(fixture);
    expect(dialog()).toBeNull();
    expect(document.activeElement).toBe(add);
    expect(fixture.componentInstance.changes).toEqual([]);
  });

  it("closes the panel on a press outside it", async () => {
    const fixture = await renderBoard();
    const u = user();
    await u.click(screen.getByRole("button", { name: "Add task · Do first" }));
    await settle(fixture);
    expect(dialog()).not.toBeNull();
    await u.click(document.body);
    await settle(fixture);
    expect(dialog()).toBeNull();
  });

  it("a click on the empty area of a quadrant adds a task there", async () => {
    const fixture = await renderBoard();
    engines[0]!.fire("plotClick", { x: 9, y: 1 });
    await settle(fixture);
    expect(within(dialog()!).getByText("Add task")).toBeTruthy();
    const u = user();
    await u.type(screen.getByRole("textbox", { name: "Task name" }), "Later");
    await u.click(screen.getByRole("button", { name: "Save" }));
    await settle(fixture);
    expect(fixture.componentInstance.changes[0]![2]).toEqual({
      x: 9,
      y: 1,
      label: "Later",
    });
  });

  it("edits the active task and keeps its other fields", async () => {
    const fixture = await renderBoard();
    const u = user();
    engines[0]!.fire("click", { items: [{ index: 0 }] });
    await settle(fixture);
    const toolbar = screen.getByRole("toolbar", { name: "Task actions" });
    // compact, in the card of the selected task
    const card = toolbar.closest<HTMLElement>("[data-point-preview]")!;
    expect(card.dataset["pointPreview"]).toBe("0");
    expect(card.textContent).toContain("Ship");
    expect(toolbar.parentElement!.hasAttribute("data-card-actions")).toBe(true);
    expect(toolbar.classList.contains("cardActions")).toBe(true);
    expect(engines[0]!.hiddenLabel).toEqual({ seriesIndex: 0, index: 0 });
    await u.click(within(toolbar).getByRole("button", { name: "Edit task" }));
    await settle(fixture);
    expect(within(dialog()!).getByText("Edit task")).toBeTruthy();
    const name = screen.getByRole("textbox", { name: "Task name" });
    expect((name as HTMLInputElement).value).toBe("Ship");
    await u.clear(name);
    await u.type(name, "Ship v2");
    await u.click(screen.getByRole("button", { name: "Save" }));
    await settle(fixture);
    expect(fixture.componentInstance.changes).toEqual([
      [
        { x: 8, y: 8, label: "Ship v2", color: "#f00", id: "ship" },
        { x: 2, y: 2, label: "Email" },
      ],
    ]);
  });

  it("a double click edits a task; picking another quadrant moves it to its center", async () => {
    const fixture = await renderBoard();
    const u = user();
    engines[0]!.fire("click", { items: [{ index: 1 }] });
    engines[0]!.fire("click", { items: [{ index: 1 }] });
    await settle(fixture);
    expect(within(dialog()!).getByText("Edit task")).toBeTruthy();
    expect(
      screen.getByRole("radio", { name: "Bottom left quadrant" }),
    ).toBeChecked();
    await u.click(screen.getByRole("radio", { name: "Do first" }));
    await settle(fixture);
    await u.click(screen.getByRole("button", { name: "Save" }));
    await settle(fixture);
    expect(fixture.componentInstance.changes.at(-1)![1]).toEqual({
      x: 2.5,
      y: 7.5,
      label: "Email",
    });
  });

  it("deletes a task after an inline confirmation", async () => {
    const fixture = await renderBoard();
    const u = user();
    engines[0]!.fire("click", { items: [{ index: 0 }] });
    await settle(fixture);
    await u.click(screen.getByRole("button", { name: "Delete task" }));
    await settle(fixture);
    const confirm = screen.getByRole("alertdialog", { name: "Delete task" });
    expect(confirm.dataset["quadrantTaskPanel"]).toBe("delete");
    expect((fixture.nativeElement as HTMLElement).contains(confirm)).toBe(true);
    expect(confirm).toHaveAccessibleDescription(
      "“Ship” will be removed from the board.",
    );
    // Cancel takes the focus
    expect(document.activeElement).toBe(
      within(confirm).getByRole("button", { name: "Cancel" }),
    );
    await u.click(within(confirm).getByRole("button", { name: "Cancel" }));
    await settle(fixture);
    expect(screen.queryByRole("alertdialog")).toBeNull();
    expect(fixture.componentInstance.changes).toEqual([]);

    await u.click(screen.getByRole("button", { name: "Delete task" }));
    await settle(fixture);
    await u.click(
      within(screen.getByRole("alertdialog")).getByRole("button", {
        name: "Delete",
      }),
    );
    await settle(fixture);
    expect(fixture.componentInstance.changes).toEqual([
      [{ x: 2, y: 2, label: "Email" }],
    ]);
    expect(screen.queryByRole("alertdialog")).toBeNull();
    // the deleted task was the selection: no actions left
    expect(screen.queryByRole("toolbar")).toBeNull();
  });

  it("a drop moves the task to the drop coordinates", async () => {
    const fixture = await renderBoard();
    engines[0]!.fire("drop", { item: { index: 1 }, x: 7, y: 6.5 });
    await settle(fixture);
    expect(fixture.componentInstance.changes).toEqual([
      [
        { x: 8, y: 8, label: "Ship", color: "#f00", id: "ship" },
        { x: 7, y: 6.5, label: "Email" },
      ],
    ]);
    expect(
      screen
        .getByRole("toolbar", { name: "Task actions" })
        .closest<HTMLElement>("[data-point-preview]")!.dataset["pointPreview"],
    ).toBe("1");
  });

  it("takes custom labels and hides the counts", async () => {
    @Component({
      imports: [MnQuadrantTaskBoard],
      template: `<mn-quadrant-task-board
        [points]="[]"
        locale="en"
        [showCounts]="false"
        [labels]="{ add: 'New card' }"
      />`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    engines[0]!.fire("layout", { x: 0, y: 0, width: 200, height: 200 });
    await settle(fixture);
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector(".count")).toBeNull();
    expect(
      screen.getByRole("button", { name: "New card · Top left quadrant" }),
    ).toBeTruthy();
  });
});

describe("MnQuadrantChart templates", () => {
  it("renders the header and point action templates over the plot", async () => {
    @Component({
      imports: [MnQuadrantChart],
      template: `<mn-quadrant-chart
          [points]="points"
          [selectedIndex]="0"
          reverseX
          [quadrantHeader]="header"
          [pointActions]="actions"
        />
        <ng-template #header let-corner let-info="info"
          ><b class="h">{{ corner }}:{{ info.count }}</b></ng-template
        >
        <ng-template #actions let-point let-index="index"
          ><i class="a">{{ point.label }}#{{ index }}</i></ng-template
        >`,
    })
    class Host {
      points = [
        { x: 2, y: 8, label: "A" },
        { x: 7, y: 3, label: "B" },
      ];
    }
    const fixture = await render(Host);
    await settle(fixture);
    const host = fixture.nativeElement as HTMLElement;
    // nothing before the engine reports the plot area
    expect(host.querySelector(".h")).toBeNull();
    engines[0]!.fire("layout", { x: 0, y: 0, width: 100, height: 100 });
    await settle(fixture);
    expect([...host.querySelectorAll(".h")].map((h) => h.textContent)).toEqual([
      "topLeft:0",
      "topRight:1",
      "bottomLeft:1",
      "bottomRight:0",
    ]);
    // with actions the selected point keeps its card, the actions in it
    const card = () => host.querySelector<HTMLElement>("[data-point-preview]");
    const actions = () =>
      card()!.querySelector<HTMLElement>("[data-card-actions]")!;
    expect(card()!.dataset["pointPreview"]).toBe("0");
    expect(card()!.textContent).toContain("A");
    expect(actions().textContent).toBe("A#0");
    expect(actions().style.display).toBe("flex");
    // the box of the card covers the plot
    expect(card()!.parentElement!.style.width).toBe("100px");
    expect(card()!.parentElement!.style.height).toBe("100px");
    // Reversed x: the detached surface must leave its dot at data (80,20).
    const [, left, top] = /translate\(([\d.-]+)px, ([\d.-]+)px\)/.exec(
      card()!.style.transform,
    )!;
    const dot = card()!.querySelector<HTMLElement>("[data-card-dot]")!;
    expect(Number(left) + 1 + parseFloat(dot.style.left) + 6).toBeCloseTo(80);
    expect(Number(top) + 1 + parseFloat(dot.style.top) + 6).toBeCloseTo(20);
    // the hovered point takes the card, leaving gives it back to the selection
    engines[0]!.fire("hover", { items: [{ index: 1 }] });
    await settle(fixture);
    expect(card()!.dataset["pointPreview"]).toBe("1");
    expect(actions().textContent).toBe("B#1");
    expect(host.querySelectorAll(".a")).toHaveLength(1);
    engines[0]!.fire("hover", { items: [] });
    await settle(fixture, QUADRANT_CARD_LINGER_MS + 50);
    expect(card()!.dataset["pointPreview"]).toBe("0");
    expect(actions().textContent).toBe("A#0");
    expect(host.querySelectorAll(".a")).toHaveLength(1);
    // destroyed with the chart
    fixture.destroy();
    expect(host.querySelector("[data-point-preview]")).toBeNull();
  });

  it("without templates the titles stay drawn; the overlay only holds the card", async () => {
    @Component({
      imports: [MnQuadrantChart],
      template: `<mn-quadrant-chart
        [points]="[{ x: 2, y: 8 }]"
        [quadrants]="{ topLeft: { label: 'Do first' } }"
        [selectedIndex]="0"
        showCounts
      />`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    engines[0]!.fire("layout", { x: 0, y: 0, width: 100, height: 100 });
    await settle(fixture);
    const host = fixture.nativeElement as HTMLElement;
    const overlay = host.querySelector(".minerva-chart-overlay")!;
    expect(overlay.querySelector(".minerva-chart-quadrant-header")).toBeNull();
    // no actions: the selection is a ring, not a card
    expect(host.querySelector("[data-point-preview]")).toBeNull();
    const areas = engines[0]!.options.annotations as Array<{ label?: string }>;
    expect(areas[0]!.label).toBe("Do first");
  });
});
