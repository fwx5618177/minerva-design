import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`export function setup(root: HTMLElement) {
  const picker = root.querySelector("#delivery-date")!;
  const result = root.querySelector<HTMLOutputElement>("#date-result")!;
  const onChange = (event: Event) => {
    result.value =
      (event as CustomEvent<{ value: string }>).detail.value || "Cleared";
  };
  picker.addEventListener("minerva-change", onChange);
  return () => picker.removeEventListener("minerva-change", onChange);
}
`})))()}n();export{t as default};