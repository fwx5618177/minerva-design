// onConfirm returning a promise shows the loading state until it settles;
// a rejection keeps the dialog open so the user can retry or cancel.
type ConfirmDialog = HTMLElement & {
  show(): void;
  onConfirm?: () => unknown;
};

export function setup(root: HTMLElement) {
  const button = root.querySelector<HTMLElement>("#publish")!;
  const dialog = root.querySelector<ConfirmDialog>("#confirm-publish")!;
  const fail = root.querySelector<HTMLInputElement>("#fail")!;
  const result = root.querySelector<HTMLElement>("#publish-result")!;
  dialog.onConfirm = () =>
    new Promise<void>((resolve, reject) =>
      setTimeout(() => {
        if (fail.checked) {
          result.textContent = "Request failed: the dialog stays open";
          reject(new Error("failed"));
        } else {
          result.textContent = "Published";
          resolve();
        }
      }, 1200),
    );
  const onOpen = () => {
    result.textContent = "";
    dialog.show();
  };
  button.addEventListener("click", onOpen);
  return () => button.removeEventListener("click", onOpen);
}
