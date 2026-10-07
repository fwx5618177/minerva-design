// Submitting validates first (the required box blocks it with the browser's
// message); a checked box submits its `value`, an unchecked one nothing.
// Reset restores the `checked` attributes.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#cb-form")!;
  const result = root.querySelector<HTMLOutputElement>("#cb-form-result")!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const entries = [...new FormData(form)].map(
      ([key, value]) => `${key}=${value}`,
    );
    result.value = `FormData: ${entries.join(", ") || "(empty)"}`;
  };
  const onReset = () => (result.value = "");
  form.addEventListener("submit", onSubmit);
  form.addEventListener("reset", onReset);
  return () => {
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("reset", onReset);
  };
}
