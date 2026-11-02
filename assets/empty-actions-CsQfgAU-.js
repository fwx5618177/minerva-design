import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// The empty slot / empty-text shows while the column has no cards; the
// actions slot holds header controls.
export function setup(root: HTMLElement) {
  const column = root.querySelector<HTMLElement>("#ideas")!;
  const add = root.querySelector<HTMLElement>("#add")!;
  const onAdd = () => {
    const count = column.querySelectorAll("minerva-card").length + 1;
    const card = document.createElement("minerva-card");
    card.setAttribute("padding", "small");
    card.textContent = \`Idea \${count}\`;
    column.append(card);
    column.setAttribute("count", String(count));
  };
  add.addEventListener("click", onAdd);
  return () => add.removeEventListener("click", onAdd);
}
`})))()}n();export{t as default};