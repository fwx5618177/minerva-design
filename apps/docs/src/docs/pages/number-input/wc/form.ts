// Out-of-range or non-numeric drafts make the field invalid (custom
// below-min / above-max messages here), so submitting reports them. The
// committed value is submitted with its precision; reset restores `value`.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#ni-form")!;
  const result = root.querySelector<HTMLOutputElement>("#ni-form-result")!;
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
