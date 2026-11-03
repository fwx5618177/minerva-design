// The board is controlled: on minerva-card-move the script moves the card
// element itself (toIndex counts the cards without the moved one) and
// updates the count attributes. canDrop keeps "Doing" at 2 cards.
import type {
  DashboardCardMove,
  MinervaDashboardColumns,
} from "minerva-design/web-components/dashboard-columns";

const LIMIT = 2;

export function setup(root: HTMLElement) {
  const board = root.querySelector<MinervaDashboardColumns>("#board")!;
  const column = (value: string) =>
    board.querySelector<HTMLElement>(
      `minerva-dashboard-column[value="${value}"]`,
    )!;
  const cardsOf = (element: HTMLElement) =>
    Array.from(
      element.querySelectorAll<HTMLElement>(":scope > minerva-dashboard-card"),
    );

  board.canDrop = (move) =>
    move.toColumn !== "doing" ||
    move.fromColumn === "doing" ||
    cardsOf(column("doing")).length < LIMIT;

  const onMove = (event: Event) => {
    const move = (event as CustomEvent<DashboardCardMove>).detail;
    const card = cardsOf(column(move.fromColumn))[move.fromIndex]!;
    const target = column(move.toColumn);
    const others = cardsOf(target).filter((other) => other !== card);
    target.insertBefore(card, others[move.toIndex] ?? null);
    for (const element of [column(move.fromColumn), target])
      element.setAttribute("count", String(cardsOf(element).length));
  };
  board.addEventListener("minerva-card-move", onMove);
  return () => {
    board.removeEventListener("minerva-card-move", onMove);
    board.canDrop = undefined;
  };
}
