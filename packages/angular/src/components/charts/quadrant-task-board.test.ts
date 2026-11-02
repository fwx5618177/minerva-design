// MnQuadrantTaskBoard with a fake chart engine (the real one needs a GPU /
// canvas browser): the headers and the actions of the active task are
// templates of MnQuadrantChart placed over the plot area reported by the
// engine (`layout`); the dialogs are the renderer's MnModal and
// MnConfirmDialog.
import { Component, signal } from "@angular/core";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { QuadrantPoint } from "minerva-design/charts/core";
import { render, screen, settle, user, within } from "../../testing";
import { MnQuadrantChart, MnQuadrantTaskBoard } from ".";

type Listener = (event: unknown) => void;
interface FakeEngine {
  options: Record<string, unknown>;
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

  it("adds a task: Cancel leaves the data, Save emits the appended task", async () => {
    const fixture = await renderBoard();
    const u = user();
    const add = () =>
      screen.getByRole("button", { name: "Add task · Do first" });

    await u.click(add());
    await settle(fixture);
    expect(within(dialog()!).getByText("Add task")).toBeTruthy();
    await u.type(screen.getByRole("textbox", { name: "Task name" }), "Draft");
    await u.click(screen.getByRole("button", { name: "Cancel" }));
    await settle(fixture);
    expect(dialog()).toBeNull();
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
    expect(
      (fixture.nativeElement as HTMLElement).querySelector(
        '.minerva-chart-quadrant-point[data-point-index="2"]',
      ),
    ).not.toBeNull();
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
    expect(
      toolbar.closest("[data-point-index]")!.getAttribute("data-label"),
    ).toBe("Ship");
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
    await u.click(screen.getByRole("combobox", { name: "Quadrant" }));
    await settle(fixture);
    await u.click(screen.getByRole("option", { name: "Do first" }));
    await settle(fixture);
    await u.click(screen.getByRole("button", { name: "Save" }));
    await settle(fixture);
    expect(fixture.componentInstance.changes.at(-1)![1]).toEqual({
      x: 2.5,
      y: 7.5,
      label: "Email",
    });
  });

  it("deletes a task after the confirmation", async () => {
    const fixture = await renderBoard();
    const u = user();
    engines[0]!.fire("click", { items: [{ index: 0 }] });
    await settle(fixture);
    await u.click(screen.getByRole("button", { name: "Delete task" }));
    await settle(fixture);
    const confirm = screen.getByRole("alertdialog");
    expect(confirm.textContent).toContain(
      "“Ship” will be removed from the board.",
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
        .closest("[data-point-index]")!
        .getAttribute("data-point-index"),
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
    const point = host.querySelector<HTMLElement>(
      ".minerva-chart-quadrant-point",
    )!;
    expect(point.textContent).toBe("A#0");
    // reversed x: 2 of [0, 10] is at 80% from the left
    expect(parseFloat(point.style.left)).toBeCloseTo(80);
    expect(parseFloat(point.style.top)).toBeCloseTo(20);
    // the hovered point takes the actions, leaving gives them back to the selection
    engines[0]!.fire("hover", { items: [{ index: 1 }] });
    await settle(fixture);
    expect(host.querySelector(".a")!.textContent).toBe("B#1");
    engines[0]!.fire("hover", { items: [] });
    await settle(fixture);
    expect(host.querySelector(".a")!.textContent).toBe("A#0");
  });

  it("without templates nothing is overlaid and the titles stay drawn", async () => {
    @Component({
      imports: [MnQuadrantChart],
      template: `<mn-quadrant-chart
        [points]="[{ x: 2, y: 8 }]"
        [quadrants]="{ topLeft: { label: 'Do first' } }"
        showCounts
      />`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    engines[0]!.fire("layout", { x: 0, y: 0, width: 100, height: 100 });
    await settle(fixture);
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector(".minerva-chart-overlay")).toBeNull();
    const areas = engines[0]!.options.annotations as Array<{ label?: string }>;
    expect(areas[0]!.label).toBe("Do first");
  });
});
