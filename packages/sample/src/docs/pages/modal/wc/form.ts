// The form lives in the light DOM: the browser validates it, then the
// submit handler saves and closes the modal.
type Modal = HTMLElement & { hide(): void };

export function setup(root: HTMLElement) {
  const modal = root.querySelector<Modal>("#rename")!;
  const form = root.querySelector<HTMLFormElement>("#rename-form")!;
  const result = root.querySelector<HTMLElement>("#rename-result")!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    result.textContent = `Renamed to "${new FormData(form).get("name")}"`;
    modal.hide();
  };
  form.addEventListener("submit", onSubmit);
  return () => form.removeEventListener("submit", onSubmit);
}
