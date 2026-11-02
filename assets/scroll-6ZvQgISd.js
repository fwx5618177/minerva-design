import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// layout="scroll" keeps a single horizontally scrolling row (also the
// :state(layout-scroll) custom state).
type AnswerSheetElement = HTMLElement & { items: Record<string, unknown>[] };

export function setup(root: HTMLElement) {
  const sheet = root.querySelector<AnswerSheetElement>("#sheet")!;
  const output = root.querySelector<HTMLOutputElement>("#current")!;
  sheet.items = Array.from({ length: 40 }, (_, i) => ({
    key: \`q\${i + 1}\`,
    status: i < 14 ? "answered" : i === 14 ? "skipped" : "unanswered",
    flagged: i === 8,
  }));
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    output.value = \`Current question: \${value.slice(1)}\`;
  };
  sheet.addEventListener("minerva-change", onChange);
  return () => sheet.removeEventListener("minerva-change", onChange);
}
`})))()}n();export{t as default};