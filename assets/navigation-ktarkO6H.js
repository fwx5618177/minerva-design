import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// show-navigation adds previous / next week buttons; minerva-week-change
// reports the first day of the displayed week (also on keyboard moves into
// the neighbouring weeks), minerva-change the selected day.
export function setup(root: HTMLElement) {
  const strip = root.querySelector<HTMLElement>("#strip")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  const onWeek = (e: Event) => {
    const { week } = (e as CustomEvent<{ week: Date }>).detail;
    log.value = \`Week of \${week.toLocaleDateString()}\`;
  };
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    log.value = \`Selected \${value}\`;
  };
  strip.addEventListener("minerva-week-change", onWeek);
  strip.addEventListener("minerva-change", onChange);
  return () => {
    strip.removeEventListener("minerva-week-change", onWeek);
    strip.removeEventListener("minerva-change", onChange);
  };
}
`})))()}n();export{t as default};