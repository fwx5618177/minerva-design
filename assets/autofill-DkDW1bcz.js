import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// Keep native form validation and password-manager hints without sending credentials.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#input-login")!;
  const onSubmit = (event: SubmitEvent) => event.preventDefault();
  form.addEventListener("submit", onSubmit);
  return () => form.removeEventListener("submit", onSubmit);
}
`})))()}n();export{t as default};