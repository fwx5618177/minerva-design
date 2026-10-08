// Child elements describe the entries; nested items form a submenu.
// minerva-select gives the item's `value` (or its text without one).
type Select = CustomEvent<{ value: string }>;

export function setup(root: HTMLElement) {
  const menu = root.querySelector<HTMLElement>("#file-menu")!;
  const result = root.querySelector<HTMLElement>("#file-result")!;
  const onSelect = (event: Event) =>
    (result.textContent = `Selected: ${(event as Select).detail.value}`);
  menu.addEventListener("minerva-select", onSelect);
  return () => menu.removeEventListener("minerva-select", onSelect);
}
