// The list adds no row command: actions are regular controls in the
// `actions` slot. Dividers follow the remaining rows.
export function setup(root: HTMLElement) {
  const list = root.querySelector<HTMLElement>("#members")!;
  const onClick = (event: MouseEvent) => {
    const button = (event.target as Element).closest('[slot="actions"]');
    button?.closest("minerva-list-item")?.remove();
  };
  list.addEventListener("click", onClick);
  return () => list.removeEventListener("click", onClick);
}
