// The browser validates the inputs on submit (required, type, minlength,
// pattern) and reports the first invalid one; `invalid` styles the fields
// that failed until they are edited. Reset restores the `value` attributes.
type Field = HTMLElement & { invalid: boolean; validity?: ValidityState };

export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#in-form")!;
  const result = root.querySelector<HTMLOutputElement>("#in-form-result")!;
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
      .querySelectorAll<Field>("minerva-input")
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
