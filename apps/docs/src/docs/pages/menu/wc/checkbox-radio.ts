// Checkbox / radio items stay open by default and fire minerva-change;
// the menu toggles their `checked` attribute.
type Change = CustomEvent<{ value: string; checked?: boolean }>;

export function setup(root: HTMLElement) {
  const menu = root.querySelector<HTMLElement>("#view-menu")!;
  const result = root.querySelector<HTMLElement>("#view-result")!;
  const onChange = (event: Event) => {
    const { value, checked } = (event as Change).detail;
    result.textContent =
      checked === undefined
        ? `Density: ${value}`
        : `${value}: ${checked ? "shown" : "hidden"}`;
  };
  menu.addEventListener("minerva-change", onChange);
  return () => menu.removeEventListener("minerva-change", onChange);
}
