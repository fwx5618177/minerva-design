import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// height (or max-height) bounds the board: each column body scrolls
// vertically within it while the board scrolls horizontally.
export function setup(root: HTMLElement) {
  const added: HTMLElement[] = [];
  for (const column of root.querySelectorAll<HTMLElement>(
    "minerva-kanban-column",
  )) {
    const count = Number(column.dataset.count);
    for (let index = 1; index <= count; index++) {
      const card = document.createElement("minerva-card");
      card.setAttribute("padding", "small");
      card.textContent = \`\${column.dataset.prefix} \${index}\`;
      column.append(card);
      added.push(card);
    }
    column.setAttribute("count", String(count));
  }
  return () => added.forEach((card) => card.remove());
}
`})))()}n();export{t as default};