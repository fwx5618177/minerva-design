// required / minlength / maxlength use the browser's messages on submit;
// `invalid` styles the field after a failed submit until it is fixed.
// Reset restores the `value` attribute.
type Field = HTMLElement & { invalid: boolean; validity?: ValidityState };

export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#ta-form")!;
  const result = root.querySelector<HTMLOutputElement>("#ta-form-result")!;
  const onInvalid = (event: Event) => ((event.target as Field).invalid = true);
  const onInput = (event: Event) => {
    const field = event.target as Field;
    if (field.validity?.valid) field.invalid = false;
  };
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const entries = [...new FormData(form)].map(
      ([key, value]) => `${key}=${value}`,
    );
    result.value = `FormData: ${entries.join(", ")}`;
  };
  const onReset = () => {
    result.value = "";
    form
      .querySelectorAll<Field>("minerva-textarea")
      .forEach((field) => (field.invalid = false));
  };
  form.addEventListener("invalid", onInvalid, true);
  form.addEventListener("minerva-input", onInput);
  form.addEventListener("submit", onSubmit);
  form.addEventListener("reset", onReset);
  return () => {
    form.removeEventListener("invalid", onInvalid, true);
    form.removeEventListener("minerva-input", onInput);
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("reset", onReset);
  };
}
