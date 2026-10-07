// Every listed file is submitted under `name` (multipart FormData);
// `required` blocks submission without files and reset empties the list.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#up-form")!;
  const result = root.querySelector<HTMLOutputElement>("#up-form-result")!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const files = new FormData(form).getAll("receipts") as File[];
    result.value = `FormData: ${files.map((file) => `${file.name} (${file.size} B)`).join(", ")}`;
  };
  const onReset = () => (result.value = "");
  form.addEventListener("submit", onSubmit);
  form.addEventListener("reset", onReset);
  return () => {
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("reset", onReset);
  };
}
