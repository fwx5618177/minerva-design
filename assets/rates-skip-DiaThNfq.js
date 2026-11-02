import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// playbackRates is a property (an array); minerva-rate-change reports the
// speed picked with the speed button.
import type { MinervaMediaPlayer } from "minerva-design/web-components/media-player";

export function setup(root: HTMLElement) {
  const player = root.querySelector<MinervaMediaPlayer>("#player")!;
  const output = root.querySelector<HTMLOutputElement>("#rate")!;
  player.playbackRates = [1, 1.5, 2];
  const onRate = (e: Event) => {
    const { rate } = (e as CustomEvent<{ rate: number }>).detail;
    output.value = \`Speed: \${rate}×\`;
  };
  player.addEventListener("minerva-rate-change", onRate);
  return () => player.removeEventListener("minerva-rate-change", onRate);
}
`})))()}n();export{t as default};