// height (or max-height) bounds the board: each column body scrolls
// vertically within it while the board scrolls horizontally.
export function setup(root: HTMLElement) {
  const added: HTMLElement[] = [];
  for (const column of root.querySelectorAll<HTMLElement>(
    "minerva-dashboard-column",
  )) {
    const count = Number(column.dataset.count);
    for (let index = 1; index <= count; index++) {
      const card = document.createElement("minerva-card");
      card.setAttribute("padding", "small");
      card.textContent = `${column.dataset.prefix} ${index}`;
      column.append(card);
      added.push(card);
    }
    column.setAttribute("count", String(count));
  }
  return () => added.forEach((card) => card.remove());
}
