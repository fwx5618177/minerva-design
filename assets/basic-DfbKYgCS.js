import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// value is a "YYYY-MM-DD" attribute; minerva-change reports the selected
// day. One tab stop: arrows, Home / End and PageUp / PageDown move the focus.
const pad = (n: number) => String(n).padStart(2, "0");
const key = (date: Date) =>
  \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;

export function setup(root: HTMLElement) {
  const strip = root.querySelector<HTMLElement>("#strip")!;
  const output = root.querySelector<HTMLOutputElement>("#selected")!;
  strip.setAttribute("value", key(new Date()));
  output.value = \`Selected: \${key(new Date())}\`;
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    output.value = \`Selected: \${value}\`;
  };
  strip.addEventListener("minerva-change", onChange);
  return () => strip.removeEventListener("minerva-change", onChange);
}
`})))()}n();export{t as default};