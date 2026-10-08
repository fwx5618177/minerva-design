// The trigger slot opens the modal; footer buttons close it with hide().
export function setup(root: HTMLElement) {
  const modal = root.querySelector<HTMLElement & { hide(): void }>("#welcome")!;
  const onClick = (event: Event) => {
    if ((event.target as Element).closest("[data-close]")) modal.hide();
  };
  modal.addEventListener("click", onClick);
  return () => modal.removeEventListener("click", onClick);
}
