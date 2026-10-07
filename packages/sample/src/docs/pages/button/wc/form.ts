// type="submit" submits the owning form through requestSubmit(), so the
// browser validates it first; type="reset" resets it.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#newsletter")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    result.value = `Subscribed ${new FormData(form).get("email")}`;
  };
  const onReset = () => (result.value = "");
  form.addEventListener("submit", onSubmit);
  form.addEventListener("reset", onReset);
  return () => {
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("reset", onReset);
  };
}
