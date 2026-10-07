// `novalidate` turns off the browser bubbles: on submit, each field shows
// its own error message (`invalid`) when its control fails validation, and
// clears it once the control is valid again. Reset clears everything.
type Control = HTMLElement & {
  checkValidity(): boolean;
  validity?: ValidityState;
};
type Field = HTMLElement & { invalid: boolean; controlElement: Control | null };

export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#fc-form")!;
  const result = root.querySelector<HTMLOutputElement>("#fc-form-result")!;
  const fields = Array.from(
    form.querySelectorAll<Field>("minerva-form-control"),
  );
  const control = (field: Field) => field.controlElement!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    for (const field of fields) field.invalid = !control(field).checkValidity();
    const firstInvalid = fields.find((field) => field.invalid);
    if (firstInvalid) {
      control(firstInvalid).focus();
      result.value = "";
      return;
    }
    const entries = [...new FormData(form)].map(
      ([key, value]) => `${key}=${value}`,
    );
    result.value = `FormData: ${entries.join(", ")}`;
  };
  const onEdit = (event: Event) => {
    const field = (event.target as HTMLElement).closest<Field>(
      "minerva-form-control",
    );
    if (field?.invalid && control(field).validity?.valid) field.invalid = false;
  };
  const onReset = () => {
    result.value = "";
    fields.forEach((field) => (field.invalid = false));
  };
  form.addEventListener("submit", onSubmit);
  form.addEventListener("change", onEdit);
  form.addEventListener("minerva-input", onEdit);
  form.addEventListener("reset", onReset);
  return () => {
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("change", onEdit);
    form.removeEventListener("minerva-input", onEdit);
    form.removeEventListener("reset", onReset);
  };
}
