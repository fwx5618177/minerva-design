// No drag and drop: a card moves to the next column with its own button.
// The column gives each slotted card role="listitem"; update `count` after
// moving cards.
const ORDER = ["todo", "doing", "done"];
const TITLES: Record<string, string> = { doing: "Doing", done: "Done" };

export function setup(root: HTMLElement) {
  const board = root.querySelector<HTMLElement>("#board")!;
  const columns = () =>
    Array.from(board.querySelectorAll<HTMLElement>("minerva-kanban-column"));
  const onClick = (event: Event) => {
    const button = (event.target as Element).closest<HTMLElement>(
      "[data-move]",
    );
    if (!button) return;
    const card = button.closest<HTMLElement>("minerva-card")!;
    const from = card.closest<HTMLElement>("minerva-kanban-column")!;
    const status = ORDER[ORDER.indexOf(from.dataset.status!) + 1];
    const to = columns().find((column) => column.dataset.status === status);
    if (!to) return;
    to.append(card);
    const after = ORDER[ORDER.indexOf(status!) + 1];
    if (after) button.textContent = `Move to ${TITLES[after]}`;
    else button.remove();
    for (const column of columns())
      column.setAttribute(
        "count",
        String(column.querySelectorAll("minerva-card").length),
      );
  };
  board.addEventListener("click", onClick);
  return () => board.removeEventListener("click", onClick);
}
