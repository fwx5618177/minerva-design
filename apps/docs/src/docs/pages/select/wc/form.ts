// The select is form-associated: it submits `value` under `name`, `required`
// blocks submission while empty, form.reset() restores the `value`
// attribute and a disabled <fieldset> disables it.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#order")!;
  const fields = root.querySelector<HTMLFieldSetElement>("#fields")!;
  const disable = root.querySelector<HTMLInputElement>("#disable")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    result.value = JSON.stringify(Object.fromEntries(new FormData(form)));
  };
  const onReset = () => {
    result.value = "";
    fields.disabled = false;
  };
  const onToggle = () => (fields.disabled = disable.checked);
  form.addEventListener("submit", onSubmit);
  form.addEventListener("reset", onReset);
  disable.addEventListener("change", onToggle);
  return () => {
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("reset", onReset);
    disable.removeEventListener("change", onToggle);
  };
}
