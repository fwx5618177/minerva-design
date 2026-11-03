import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// A card moves to the next column with its own button (draggable boards:
// drag-drop demo).
// The column gives each slotted card role="listitem"; update \`count\` after
// moving cards.
const ORDER = ["todo", "doing", "done"];
const TITLES: Record<string, string> = { doing: "Doing", done: "Done" };

export function setup(root: HTMLElement) {
  const board = root.querySelector<HTMLElement>("#board")!;
  const columns = () =>
    Array.from(board.querySelectorAll<HTMLElement>("minerva-dashboard-column"));
  const onClick = (event: Event) => {
    const button = (event.target as Element).closest<HTMLElement>(
      "[data-move]",
    );
    if (!button) return;
    const card = button.closest<HTMLElement>("minerva-card")!;
    const from = card.closest<HTMLElement>("minerva-dashboard-column")!;
    const status = ORDER[ORDER.indexOf(from.dataset.status!) + 1];
    const to = columns().find((column) => column.dataset.status === status);
    if (!to) return;
    to.append(card);
    const after = ORDER[ORDER.indexOf(status!) + 1];
    if (after) button.textContent = \`Move to \${TITLES[after]}\`;
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
`})))()}n();export{t as default};