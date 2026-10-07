// The layout sits inside a native <form>: submit, reset and validation stay
// native. One column on narrow containers, two from 480px.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#profile")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const data = new FormData(form);
    result.value = `Saved ${data.get("first")} ${data.get("last")}`;
  };
  const onReset = () => (result.value = "");
  form.addEventListener("submit", onSubmit);
  form.addEventListener("reset", onReset);
  return () => {
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("reset", onReset);
  };
}
