import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// marks: an empty attribute draws a tick per step, a JSON array labelled
// marks; step="null" snaps to the marks only.
import type { MinervaSlider } from "minerva-design/web-components/slider";

const labels: Record<number, string> = {
  0: "Off",
  25: "Low",
  50: "Medium",
  75: "High",
  100: "Max",
};

export function setup(root: HTMLElement) {
  const fan = root.querySelector<MinervaSlider>("#fan")!;
  fan.getAriaValueText = (v) => labels[v] ?? String(v);
  return () => {
    fan.getAriaValueText = undefined;
  };
}
`})))()}n();export{t as default};