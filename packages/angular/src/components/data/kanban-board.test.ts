import { Component, signal } from "@angular/core";
import { afterEach, describe, expect, it } from "vitest";
import { render, screen, settle, within } from "../../testing";
import { MnConfig } from "../../config";
import { MnKanbanBoard, MnKanbanColumn } from ".";

afterEach(() => {
  document.body.innerHTML = "";
});

const column = () => document.querySelector<HTMLElement>("mn-kanban-column")!;

describe("MnKanbanBoard", () => {
  it("renders a labelled, focusable region with the sizes", async () => {
    @Component({
      imports: [MnKanbanBoard],
      template: `<mn-kanban-board
        [columnWidth]="240"
        gap="1rem"
        [maxHeight]="400"
      />`,
    })
    class Host {}
    await render(Host);
    const board = screen.getByRole("region", { name: "Board" });
    expect(board.tagName).toBe("MN-KANBAN-BOARD");
    expect(board.getAttribute("tabindex")).toBe("0");
    expect(board.getAttribute("data-minerva")).toBe("kanban-board");
    expect(board.style.getPropertyValue("--kanban-column-width")).toBe("240px");
    expect(board.style.getPropertyValue("--kanban-gap")).toBe("1rem");
    expect(board.style.maxHeight).toBe("400px");
    expect(board.className).not.toMatch(/fill/);
  });

  it("accepts a custom label and fill", async () => {
    @Component({
      imports: [MnKanbanBoard],
      template: `<mn-kanban-board aria-label="Sprint 12" fill height="60vh" />`,
    })
    class Host {}
    await render(Host);
    const board = screen.getByRole("region", { name: "Sprint 12" });
    expect(board.className).toMatch(/fill/);
    expect(board.style.height).toBe("60vh");
  });
});

describe("MnKanbanColumn", () => {
  it("is a group named by its title and count, with a list of cards", async () => {
    @Component({
      imports: [MnKanbanColumn],
      template: `<mn-kanban-column title="To do" [count]="2">
        <div>Write spec</div>
        <div role="article">Review</div>
      </mn-kanban-column>`,
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
      imports: [MnKanbanColumn],
      template: `<mn-kanban-column title="Done" [empty]="emptyText()">
        @if (card()) {
          <div>Card</div>
        }
      </mn-kanban-column>`,
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
      imports: [MnKanbanColumn],
      template: `<mn-kanban-column [count]="3" description="Not triaged">
        <strong mnKanbanTitle>Blocked</strong>
        <button type="button" mnKanbanActions>Add</button>
        <span mnKanbanEmpty>Nothing blocked</span>
        <button type="button" mnKanbanFooter>Add card</button>
      </mn-kanban-column>`,
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
      imports: [MnKanbanColumn],
      template: `<mn-kanban-column title="Done" [color]="color()" />`,
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
    expect(column().style.getPropertyValue("--kanban-column-color")).toBe(
      "#7c3aed",
    );
    fixture.componentInstance.color.set(undefined);
    await settle(fixture);
    expect(column().querySelector('[data-part="indicator"]')).toBeNull();
  });

  it("uses the localized strings of <mn-config>", async () => {
    @Component({
      imports: [MnKanbanBoard, MnKanbanColumn, MnConfig],
      template: `<mn-config locale="zh">
        <mn-kanban-board
          ><mn-kanban-column title="待办" [count]="3"
        /></mn-kanban-board>
      </mn-config>`,
    })
    class Host {}
    const fixture = await render(Host);
    await settle(fixture);
    expect(screen.getByRole("region", { name: "看板" })).toBeTruthy();
    expect(screen.getByRole("group", { name: "待办，3 项" })).toBeTruthy();
    expect(screen.getByText("暂无项目")).toBeTruthy();
  });
});
