import { Component, signal } from "@angular/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, settle, within } from "../../testing";
import { MnConfig } from "../../config";
import { MnDashboardColumns, MnDashboardCard, MnDashboardColumn } from ".";
import type { DashboardCardMove } from ".";

afterEach(() => {
  document.body.innerHTML = "";
});

const column = () =>
  document.querySelector<HTMLElement>("mn-dashboard-column")!;

describe("MnDashboardColumns", () => {
  it("renders a labelled, focusable region with the sizes", async () => {
    @Component({
      imports: [MnDashboardColumns],
      template: `<mn-dashboard-columns
        [columnWidth]="240"
        gap="1rem"
        [maxHeight]="400"
      />`,
    })
    class Host {}
    await render(Host);
    const board = screen.getByRole("region", { name: "Board" });
    expect(board.tagName).toBe("MN-DASHBOARD-COLUMNS");
    expect(board.getAttribute("tabindex")).toBe("0");
    expect(board.getAttribute("data-minerva")).toBe("dashboard-columns");
    expect(board.style.getPropertyValue("--dashboard-column-width")).toBe(
      "240px",
    );
    expect(board.style.getPropertyValue("--dashboard-gap")).toBe("1rem");
    expect(board.style.maxHeight).toBe("400px");
    expect(board.className).not.toMatch(/fill/);
  });

  it("accepts a custom label and fill", async () => {
    @Component({
      imports: [MnDashboardColumns],
      template: `<mn-dashboard-columns
        aria-label="Sprint 12"
        fill
        height="60vh"
      />`,
    })
    class Host {}
    await render(Host);
    const board = screen.getByRole("region", { name: "Sprint 12" });
    expect(board.className).toMatch(/fill/);
    expect(board.style.height).toBe("60vh");
  });
});

describe("MnDashboardColumn", () => {
  it("is a group named by its title and count, with a list of cards", async () => {
    @Component({
      imports: [MnDashboardColumn],
      template: `<mn-dashboard-column title="To do" [count]="2">
        <div>Write spec</div>
        <div role="article">Review</div>
      </mn-dashboard-column>`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    const group = screen.getByRole("group", { name: "To do, 2 items" });
    expect(group.hasAttribute("title")).toBe(false);
    const list = within(group).getByRole("list");
    expect(list.style.display).toBe("");
    expect(within(list).getAllByRole("listitem")).toHaveLength(1);
    expect(within(list).getByRole("article")).toBeTruthy();
    expect(within(group).getByText("2").getAttribute("aria-hidden")).toBe(
      "true",
    );
    const empty = group.querySelector<HTMLElement>('[data-part="empty"]')!;
    expect(empty.style.display).toBe("none");
  });

  it("shows the default, input or projected empty content and follows the cards", async () => {
    @Component({
      imports: [MnDashboardColumn],
      template: `<mn-dashboard-column title="Done" [empty]="emptyText()">
        @if (card()) {
          <div>Card</div>
        }
      </mn-dashboard-column>`,
    })
    class Host {
      readonly card = signal(false);
      readonly emptyText = signal<string | undefined>(undefined);
    }
    const fixture = await render(Host);
    await settle(fixture);
    const empty = () =>
      column().querySelector<HTMLElement>('[data-part="empty"]')!;
    const list = () =>
      column().querySelector<HTMLElement>('[data-part="list"]')!;
    expect(empty().textContent?.trim()).toBe("No items");
    expect(list().style.display).toBe("none");
    fixture.componentInstance.emptyText.set("Nothing shipped");
    await settle(fixture);
    expect(empty().textContent?.trim()).toBe("Nothing shipped");
    fixture.componentInstance.card.set(true);
    await settle(fixture);
    await settle(fixture);
    expect(list().style.display).toBe("");
    expect(empty().style.display).toBe("none");
    expect(list().firstElementChild?.getAttribute("role")).toBe("listitem");
  });

  it("projects the title, actions, empty and footer content", async () => {
    @Component({
      imports: [MnDashboardColumn],
      template: `<mn-dashboard-column [count]="3" description="Not triaged">
        <strong mnDashboardTitle>Blocked</strong>
        <button type="button" mnDashboardActions>Add</button>
        <span mnDashboardEmpty>Nothing blocked</span>
        <button type="button" mnDashboardFooter>Add card</button>
      </mn-dashboard-column>`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    const group = screen.getByRole("group");
    expect(group.getAttribute("aria-labelledby")).toMatch(/ .+-count$/);
    expect(group.textContent).toContain("Blocked");
    expect(group.textContent).toContain("Not triaged");
    const part = (name: string) =>
      group.querySelector<HTMLElement>(`[data-part="${name}"]`)!;
    expect(part("actions").style.display).toBe("");
    expect(part("footer").style.display).toBe("");
    expect(part("empty").textContent?.trim()).toBe("Nothing blocked");
  });

  it("names a theme accent with data-color and sets a custom color", async () => {
    @Component({
      imports: [MnDashboardColumn],
      template: `<mn-dashboard-column title="Done" [color]="color()" />`,
    })
    class Host {
      readonly color = signal<string | undefined>("success");
    }
    const fixture = await render(Host);
    expect(column().getAttribute("data-color")).toBe("success");
    expect(column().querySelector('[data-part="indicator"]')).not.toBeNull();
    fixture.componentInstance.color.set("#7c3aed");
    await settle(fixture);
    expect(column().hasAttribute("data-color")).toBe(false);
    expect(column().style.getPropertyValue("--dashboard-column-color")).toBe(
      "#7c3aed",
    );
    fixture.componentInstance.color.set(undefined);
    await settle(fixture);
    expect(column().querySelector('[data-part="indicator"]')).toBeNull();
  });

  it("uses the localized strings of <mn-config>", async () => {
    @Component({
      imports: [MnDashboardColumns, MnDashboardColumn, MnConfig],
      template: `<mn-config locale="zh">
        <mn-dashboard-columns
          ><mn-dashboard-column title="待办" [count]="3"
        /></mn-dashboard-columns>
      </mn-config>`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    expect(screen.getByRole("region", { name: "分栏面板" })).toBeTruthy();
    expect(screen.getByRole("group", { name: "待办，3 项" })).toBeTruthy();
    expect(screen.getByText("暂无项目")).toBeTruthy();
  });
});

describe("MnDashboardColumns drag and drop", () => {
  const box = (
    element: Element,
    left: number,
    top: number,
    width: number,
    height: number,
  ) => {
    element.getBoundingClientRect = () =>
      ({
        left,
        top,
        width,
        height,
        right: left + width,
        bottom: top + height,
        x: left,
        y: top,
        toJSON: () => ({}),
      }) as DOMRect;
  };

  @Component({
    imports: [MnDashboardColumns, MnDashboardColumn, MnDashboardCard],
    template: `<mn-dashboard-columns
      [draggable]="draggable()"
      [canDrop]="canDrop"
      (cardMove)="moves.push($event)"
    >
      <mn-dashboard-column title="To do" value="todo">
        <mn-dashboard-card value="a">Write spec</mn-dashboard-card>
        <mn-dashboard-card value="b" label="Review the spec"
          >Review</mn-dashboard-card
        >
      </mn-dashboard-column>
      <mn-dashboard-column title="Done" value="done">
        <mn-dashboard-card value="c">Ship</mn-dashboard-card>
      </mn-dashboard-column>
    </mn-dashboard-columns>`,
  })
  class Host {
    readonly draggable = signal(true);
    canDrop: ((move: DashboardCardMove) => boolean) | undefined = undefined;
    readonly moves: DashboardCardMove[] = [];
  }

  /** Two 200px columns of 50px cards: "todo" (a, b) and "done" (c) */
  const renderBoard = async () => {
    const fixture = await render(Host);
    await settle(fixture);
    const board = screen.getByRole("region");
    box(board, 0, 0, 500, 400);
    board.querySelectorAll("[data-dashboard-column]").forEach((column, i) => {
      box(column, i * 220, 0, 200, 400);
      column
        .querySelectorAll("[data-dashboard-card]")
        .forEach((card, j) => box(card, i * 220, 40 + j * 60, 200, 50));
    });
    return { fixture, board, host: fixture.componentInstance };
  };

  const pointer = (type: string, target: EventTarget, x: number, y: number) =>
    target.dispatchEvent(
      new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y,
        pointerId: 1,
        pointerType: "mouse",
        isPrimary: true,
      }),
    );

  const key = (target: Element, value: string) =>
    target.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: value,
        bubbles: true,
        cancelable: true,
      }),
    );

  it("keys the columns and makes the cards described buttons", async () => {
    const { fixture, board } = await renderBoard();
    expect(
      screen.getByRole("group", { name: "To do" }).dataset.dashboardColumn,
    ).toBe("todo");
    const card = screen.getByRole("button", { name: "Review the spec" });
    expect(card.getAttribute("tabindex")).toBe("0");
    expect(card.getAttribute("data-minerva")).toBe("dashboard-card");
    expect(
      document.getElementById(card.getAttribute("aria-describedby")!)
        ?.textContent,
    ).toMatch(/Press Space or Enter/);
    expect(card.parentElement!.getAttribute("role")).toBe("listitem");
    fixture.componentInstance.draggable.set(false);
    await settle(fixture);
    expect(screen.queryByRole("button")).toBeNull();
    expect(board.querySelector("[data-dashboard-layer]")).toBeNull();
  });

  it("emits cardMove for a pointer drag to another column", async () => {
    const { host } = await renderBoard();
    pointer("pointerdown", screen.getByText("Write spec"), 100, 60);
    pointer("pointermove", document, 110, 60);
    pointer("pointermove", document, 300, 120);
    pointer("pointerup", document, 300, 120);
    expect(host.moves).toEqual([
      {
        cardKey: "a",
        fromColumn: "todo",
        fromIndex: 0,
        toColumn: "done",
        toIndex: 1,
      },
    ]);
  });

  it("moves a card with the keyboard, cancels and respects canDrop", async () => {
    const { fixture, host } = await renderBoard();
    const card = screen.getByRole("button", { name: "Write spec" });
    card.focus();
    key(card, " ");
    expect(screen.getByRole("status").textContent).toContain(
      "Picked up Write spec: position 1 of 2 in To do.",
    );
    key(card, "ArrowDown");
    key(card, "Escape");
    expect(card.hasAttribute("data-dashboard-dragging")).toBe(false);
    key(card, " ");
    key(card, "ArrowRight");
    key(card, "Enter");
    expect(host.moves).toEqual([
      {
        cardKey: "a",
        fromColumn: "todo",
        fromIndex: 0,
        toColumn: "done",
        toIndex: 0,
      },
    ]);
    host.canDrop = vi.fn(() => false);
    fixture.componentRef.changeDetectorRef.markForCheck();
    await settle(fixture);
    const ship = screen.getByRole("button", { name: "Ship" });
    key(ship, " ");
    key(ship, "ArrowLeft");
    key(ship, " ");
    expect(host.canDrop).toHaveBeenCalled();
    expect(host.moves).toHaveLength(1);
  });
});
