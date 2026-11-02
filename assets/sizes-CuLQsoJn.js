import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// size="small" uses smaller pills; columns="5" lays them out in a fixed
// grid (ArrowUp / ArrowDown move by a row); disabled blocks selection.
type AnswerSheetElement = HTMLElement & { items: Record<string, unknown>[] };

export function setup(root: HTMLElement) {
  const items = Array.from({ length: 10 }, (_, i) => ({
    key: \`q\${i + 1}\`,
    status: i < 4 ? "answered" : "unanswered",
  }));
  for (const sheet of root.querySelectorAll<AnswerSheetElement>(
    "minerva-answer-sheet",
  )) {
    sheet.items = items;
  }
}
`})))()}n();export{t as default};