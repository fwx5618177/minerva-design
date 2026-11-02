import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// With flip-on-click="false" the card is not a button: only the flipped
// property (or attribute) turns it. Under prefers-reduced-motion every card
// crossfades instead of rotating.
export function setup(root: HTMLElement) {
  const card = root.querySelector<HTMLElement & { flipped: boolean }>(
    "#manual",
  )!;
  const toggle = root.querySelector<HTMLElement>("#toggle")!;
  const onClick = () => {
    card.flipped = !card.flipped;
    toggle.textContent = card.flipped ? "Hide answer" : "Reveal answer";
  };
  toggle.addEventListener("click", onClick);
  return () => toggle.removeEventListener("click", onClick);
}
`})))()}n();export{t as default};