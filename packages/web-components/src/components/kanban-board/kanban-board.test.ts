import { describe, expect, it, vi } from "vitest";
import {
  MinervaKanbanBoard,
  MinervaKanbanCard,
  MinervaKanbanColumn,
  type KanbanCardMove,
} from "./kanban-board";
import "../../elements/kanban-board";
import { customStates } from "../../internal/styling-hooks";
import { $, mount, settle } from "../../../tests/utils";

const column = (markup: string) =>
  mount<MinervaKanbanColumn>(markup, "minerva-kanban-column");

describe("<minerva-kanban-board>", () => {
  it("registers both elements", () => {
    expect(customElements.get("minerva-kanban-board")).toBe(MinervaKanbanBoard);
    expect(customElements.get("minerva-kanban-column")).toBe(
      MinervaKanbanColumn,
    );
  });

  it("renders a labelled, focusable region with the sizes", async () => {
    const el = await mount<MinervaKanbanBoard>(
      `<minerva-kanban-board column-width="240" gap="1rem" max-height="400"></minerva-kanban-board>`,
    );
    const root = $(el, '[part="root"]');
    expect(root.getAttribute("role")).toBe("region");
    expect(root.getAttribute("tabindex")).toBe("0");
    expect(root.getAttribute("aria-label")).toBe("Board");
    expect(root.style.getPropertyValue("--kanban-column-width")).toBe("240px");
    expect(root.style.getPropertyValue("--kanban-gap")).toBe("1rem");
    expect(root.style.maxHeight).toBe("400px");
    expect(root.classList.contains("fill")).toBe(false);
    el.fill = true;
    el.setAttribute("aria-label", "Sprint 12");
    el.columnWidth = "20rem";
    await settle();
    expect(root.classList.contains("fill")).toBe(true);
    expect(root.getAttribute("aria-label")).toBe("Sprint 12");
    expect(root.style.getPropertyValue("--kanban-column-width")).toBe("20rem");
  });
});

describe("<minerva-kanban-column>", () => {
  it("is a group named by its heading and count, with a list of cards", async () => {
    const el = await column(
      `<minerva-kanban-column heading="To do" count="2"><div>A</div><div role="article">B</div></minerva-kanban-column>`,
    );
    const root = $(el, '[part="root"]');
    expect(root.getAttribute("role")).toBe("group");
    expect(root.getAttribute("aria-label")).toBe("To do, 2 items");
    expect($(el, '[part="count"]').getAttribute("aria-hidden")).toBe("true");
    expect($(el, '[part="list"]').getAttribute("role")).toBe("list");
    const [a, b] = Array.from(el.children);
    expect(a!.getAttribute("role")).toBe("listitem");
    // an author role wins
    expect(b!.getAttribute("role")).toBe("article");
    expect(el.shadowRoot!.querySelector('[part="empty"]')).toBeNull();
    // a removed card gets its role back
    a!.remove();
    await settle();
    expect(a!.hasAttribute("role")).toBe(false);
  });

  it("uses the singular label and hides an invalid count", async () => {
    const el = await column(
      `<minerva-kanban-column heading="Doing" count="1"></minerva-kanban-column>`,
    );
    expect($(el, '[part="root"]').getAttribute("aria-label")).toBe(
      "Doing, 1 item",
    );
    el.count = -1;
    await settle();
    expect(el.shadowRoot!.querySelector('[part="count"]')).toBeNull();
    expect($(el, '[part="root"]').getAttribute("aria-label")).toBe("Doing");
  });

  it("shows the default, text or slotted empty content", async () => {
    const el = await column(
      `<minerva-kanban-column heading="Done"></minerva-kanban-column>`,
    );
    expect(el.shadowRoot!.querySelector('[part="list"]')).toBeNull();
    expect($(el, '[part="empty"]').textContent?.trim()).toBe("No items");
    el.emptyText = "Nothing shipped";
    await settle();
    expect($(el, '[part="empty"]').textContent?.trim()).toBe("Nothing shipped");
    el.insertAdjacentHTML("beforeend", "<div>Card</div>");
    await settle();
    expect(el.shadowRoot!.querySelector('[part="empty"]')).toBeNull();
    expect(el.shadowRoot!.querySelector('[part="list"]')).not.toBeNull();
  });

  it("renders the actions, description and footer slots", async () => {
    const el = await column(
      `<minerva-kanban-column heading="Ideas" description="Not triaged"><button slot="actions">Add</button><button slot="footer">Add card</button></minerva-kanban-column>`,
    );
    expect($(el, '[part="description"]').textContent?.trim()).toBe(
      "Not triaged",
    );
    expect($(el, '[part="actions"] slot')).toBeTruthy();
    expect($(el, '[part="footer"] slot')).toBeTruthy();
  });

  it("names a theme accent with a state and sets a custom color", async () => {
    const el = await column(
      `<minerva-kanban-column heading="Done" color="success"></minerva-kanban-column>`,
    );
    expect(customStates(el).has("color-success")).toBe(true);
    expect($(el, '[part="indicator"]')).toBeTruthy();
    expect($(el, '[part="root"]').classList.contains("success")).toBe(true);
    el.color = "#7c3aed";
    await settle();
    expect(customStates(el).size).toBe(0);
    expect(
      $(el, '[part="root"]').style.getPropertyValue("--kanban-column-color"),
    ).toBe("#7c3aed");
    el.color = undefined;
    await settle();
    expect(el.shadowRoot!.querySelector('[part="indicator"]')).toBeNull();
  });

  it("is labelled by a slotted heading", async () => {
    const el = await column(
      `<minerva-kanban-column count="3"><strong slot="heading">Blocked</strong></minerva-kanban-column>`,
    );
    const root = $(el, '[part="root"]');
    expect(root.hasAttribute("aria-label")).toBe(false);
    expect(root.getAttribute("aria-labelledby")).toBe("title count");
  });

  it("follows the language", async () => {
    const el = await mount<MinervaKanbanBoard>(
      `<div lang="zh"><minerva-kanban-board><minerva-kanban-column heading="待办" count="3"></minerva-kanban-column></minerva-kanban-board></div>`,
      "minerva-kanban-board",
    );
    expect($(el, '[part="root"]').getAttribute("aria-label")).toBe("看板");
    const col = el.querySelector("minerva-kanban-column")!;
    expect($(col, '[part="root"]').getAttribute("aria-label")).toBe(
      "待办，3 项",
    );
    expect($(col, '[part="empty"]').textContent?.trim()).toBe("暂无项目");
  });
});

describe("<minerva-kanban-board> drag and drop", () => {
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

  /** Two 200px columns of 50px cards: "todo" (a, b) and "done" (c) */
  const mountBoard = async (attributes = "draggable") => {
    const el = await mount<MinervaKanbanBoard>(
      `<minerva-kanban-board ${attributes}>
        <minerva-kanban-column heading="To do" value="todo">
          <minerva-kanban-card value="a">Write spec</minerva-kanban-card>
          <minerva-kanban-card value="b" label="Review the spec">Review</minerva-kanban-card>
        </minerva-kanban-column>
        <minerva-kanban-column heading="Done" value="done">
          <minerva-kanban-card value="c">Ship</minerva-kanban-card>
        </minerva-kanban-column>
      </minerva-kanban-board>`,
    );
    box($(el, ".board"), 0, 0, 500, 400);
    el.querySelectorAll("minerva-kanban-column").forEach((column, i) => {
      box(column, i * 220, 0, 200, 400);
      column
        .querySelectorAll("minerva-kanban-card")
        .forEach((card, j) => box(card, i * 220, 40 + j * 60, 200, 50));
    });
    const moves: KanbanCardMove[] = [];
    el.addEventListener("minerva-card-move", (event) =>
      moves.push((event as CustomEvent<KanbanCardMove>).detail),
    );
    const card = (value: string) =>
      el.querySelector<MinervaKanbanCard>(
        `minerva-kanban-card[value="${value}"]`,
      )!;
    return { el, moves, card };
  };

  const pointer = (type: string, target: EventTarget, x: number, y: number) =>
    target.dispatchEvent(
      new PointerEvent(type, {
        bubbles: true,
        composed: true,
        cancelable: true,
        clientX: x,
        clientY: y,
        pointerId: 1,
        pointerType: "mouse",
        isPrimary: true,
      }),
    );

  const key = (card: MinervaKanbanCard, value: string) =>
    $(card, '[part="root"]').dispatchEvent(
      new KeyboardEvent("keydown", {
        key: value,
        bubbles: true,
        composed: true,
        cancelable: true,
      }),
    );

  it("registers the card", () => {
    expect(customElements.get("minerva-kanban-card")).toBe(MinervaKanbanCard);
  });

  it("renders plain cards unless the board is draggable", async () => {
    const { el, card } = await mountBoard("");
    expect(el.draggable).toBe(false);
    const root = $(card("a"), '[part="root"]');
    expect(root.hasAttribute("role")).toBe(false);
    expect(root.hasAttribute("tabindex")).toBe(false);
    expect(card("a").getAttribute("role")).toBe("listitem");
    expect(el.querySelector("[data-kanban-layer]")).toBeNull();
    el.draggable = true;
    await settle();
    expect(root.getAttribute("role")).toBe("button");
    expect(root.getAttribute("tabindex")).toBe("0");
    expect(el.querySelector("[data-kanban-layer]")).not.toBeNull();
    const b = $(card("b"), '[part="root"]');
    expect(b.getAttribute("aria-label")).toBe("Review the spec");
    expect(
      card("b").shadowRoot!.getElementById(b.getAttribute("aria-describedby")!)
        ?.textContent,
    ).toMatch(/Press Space or Enter/);
  });

  it('reads the draggable attribute ("false" turns it off)', async () => {
    const { el } = await mountBoard('draggable="false"');
    expect(el.draggable).toBe(false);
    el.setAttribute("draggable", "");
    expect(el.draggable).toBe(true);
  });

  it("fires minerva-card-move for a pointer drag to another column", async () => {
    const { el, moves, card } = await mountBoard();
    pointer("pointerdown", $(card("a"), '[part="root"]'), 100, 60);
    pointer("pointermove", document, 110, 60);
    expect(el.getAttribute("data-kanban-dragging")).toBe("pointer");
    pointer("pointermove", document, 300, 120);
    expect(
      el
        .querySelector('minerva-kanban-column[value="done"]')!
        .hasAttribute("data-kanban-drop-target"),
    ).toBe(true);
    pointer("pointerup", document, 300, 120);
    expect(moves).toEqual([
      {
        cardKey: "a",
        fromColumn: "todo",
        fromIndex: 0,
        toColumn: "done",
        toIndex: 1,
      },
    ]);
    expect(el.hasAttribute("data-kanban-dragging")).toBe(false);
  });

  it("moves a card with the keyboard and announces it", async () => {
    const { el, moves, card } = await mountBoard();
    card("a").focus();
    key(card("a"), " ");
    const live = el.querySelector('[data-kanban-layer] [role="status"]')!;
    expect(live.textContent).toContain(
      "Picked up Write spec: position 1 of 2 in To do.",
    );
    key(card("a"), "ArrowRight");
    expect(live.textContent).toContain("Write spec: position 1 of 2 in Done.");
    key(card("a"), "Enter");
    expect(moves).toEqual([
      {
        cardKey: "a",
        fromColumn: "todo",
        fromIndex: 0,
        toColumn: "done",
        toIndex: 0,
      },
    ]);
  });

  it("cancels with Escape and respects canDrop", async () => {
    const { el, moves, card } = await mountBoard();
    const canDrop = vi.fn(() => false);
    el.canDrop = canDrop;
    key(card("a"), " ");
    key(card("a"), "ArrowRight");
    key(card("a"), " ");
    expect(canDrop).toHaveBeenCalled();
    key(card("a"), " ");
    expect(card("a").getAttribute("data-kanban-dragging")).toBe("keyboard");
    key(card("a"), "Escape");
    expect(card("a").hasAttribute("data-kanban-dragging")).toBe(false);
    expect(moves).toEqual([]);
  });
});
