import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// size="small" turns the count badges into dots (also the :state(size-small)
// ... custom states); disabled blocks selection and navigation.
type WeekStripElement = HTMLElement & { markers?: Record<string, number> };

export function setup(root: HTMLElement) {
  const date = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const today = \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;
  for (const strip of root.querySelectorAll<WeekStripElement>(
    "minerva-week-strip",
  )) {
    strip.markers = { [today]: 4 };
  }
}
`})))()}n();export{t as default};