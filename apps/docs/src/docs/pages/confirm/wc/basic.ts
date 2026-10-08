// Open with show(); minerva-confirm / minerva-cancel report the answer.
type ConfirmDialog = HTMLElement & { show(): void };
type Cancel = CustomEvent<{ reason: string }>;

export function setup(root: HTMLElement) {
  const button = root.querySelector<HTMLElement>("#delete")!;
  const dialog = root.querySelector<ConfirmDialog>("#confirm-delete")!;
  const result = root.querySelector<HTMLElement>("#delete-result")!;
  const onOpen = () => dialog.show();
  const onConfirm = () => (result.textContent = "Project deleted");
  const onCancel = (event: Event) =>
    (result.textContent = `Cancelled (${(event as Cancel).detail.reason})`);
  button.addEventListener("click", onOpen);
  dialog.addEventListener("minerva-confirm", onConfirm);
  dialog.addEventListener("minerva-cancel", onCancel);
  return () => {
    button.removeEventListener("click", onOpen);
    dialog.removeEventListener("minerva-confirm", onConfirm);
    dialog.removeEventListener("minerva-cancel", onCancel);
  };
}
