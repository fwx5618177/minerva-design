import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// range takes a "start,end" value attribute; the form submits two "price"
// entries. formatValue is a property.
import type { MinervaSlider } from "minerva-design/web-components/slider";

export function setup(root: HTMLElement) {
  const slider = root.querySelector<MinervaSlider>("#price")!;
  const output = root.querySelector<HTMLOutputElement>("#price-output")!;
  slider.formatValue = (v) => \`$\${v}\`;
  const onChange = (e: Event) => {
    const [low, high] = (e as CustomEvent<{ value: [number, number] }>).detail
      .value;
    output.value = \`From $\${low} to $\${high}\`;
  };
  slider.addEventListener("minerva-change", onChange);
  return () => slider.removeEventListener("minerva-change", onChange);
}
`})))()}n();export{t as default};