import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// markers is a property: a number shows a count badge (99+ above 99), true
// a dot. getDayLabel (a property too) customizes the accessible names.
type Marker = number | boolean;
type WeekStripElement = HTMLElement & {
  value?: string;
  markers?: Record<string, Marker>;
  getDayLabel?: (day: string, marker: Marker | undefined) => string;
};

const pad = (n: number) => String(n).padStart(2, "0");
const inDays = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;
};

export function setup(root: HTMLElement) {
  const markers = {
    [inDays(-1)]: 2,
    [inDays(0)]: 3,
    [inDays(1)]: true,
    [inDays(3)]: 1,
  };
  const tasks = root.querySelector<WeekStripElement>("#tasks")!;
  const sunday = root.querySelector<WeekStripElement>("#sunday")!;
  for (const strip of [tasks, sunday]) {
    strip.value = inDays(0);
    strip.markers = markers;
  }
  sunday.getDayLabel = (day, marker) =>
    typeof marker === "number"
      ? \`\${day}: \${marker} tasks\`
      : marker
        ? \`\${day}: reminder\`
        : day;
}
`})))()}n();export{t as default};