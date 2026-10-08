// `loading` keeps the button focusable (aria-busy / aria-disabled) and
// blocks clicks; the `loading` slot replaces the label meanwhile.
export function setup(root: HTMLElement) {
  const save = root.querySelector<HTMLElement & { loading: boolean }>("#save")!;
  const onClick = () => {
    save.loading = true;
    setTimeout(() => (save.loading = false), 1500);
  };
  save.addEventListener("click", onClick);
  return () => save.removeEventListener("click", onClick);
}
