// `clickable toggle` tags are toggle buttons (aria-pressed): a click flips
// `pressed` and fires `minerva-change`. A plain clickable tag fires `click`.
type Tag = HTMLElement & { pressed?: boolean };

export function setup(root: HTMLElement) {
  const filters = root.querySelector<HTMLElement>("#filters")!;
  const clear = root.querySelector<Tag>("#clear")!;
  const active = root.querySelector<HTMLOutputElement>("#active")!;
  const toggles = [...filters.querySelectorAll<Tag>("[toggle]")];
  const render = () => {
    const on = toggles.filter((t) => t.pressed).map((t) => t.dataset.status);
    active.value = `Showing: ${on.length ? on.join(", ") : "everything"}`;
  };
  const onClear = () => {
    toggles.forEach((t) => (t.pressed = false));
    render();
  };
  filters.addEventListener("minerva-change", render);
  clear.addEventListener("click", onClear);
  return () => {
    filters.removeEventListener("minerva-change", render);
    clear.removeEventListener("click", onClear);
  };
}
