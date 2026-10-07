// The `items` property takes lib-core's MenuEntry shape instead of child
// elements (handy for data-driven menus).
type Change = CustomEvent<{ value: string; checked?: boolean }>;
type Select = CustomEvent<{ value: string }>;
type Menu = HTMLElement & { items: unknown[] };

export function setup(root: HTMLElement) {
  const menu = root.querySelector<Menu>("#data-menu")!;
  const result = root.querySelector<HTMLElement>("#data-result")!;
  menu.items = [
    {
      type: "radio-group",
      key: "sort",
      label: "Sort by",
      defaultValue: "date",
      items: [
        { value: "name", label: "Name" },
        { value: "date", label: "Date modified" },
        { value: "size", label: "Size" },
      ],
    },
    { type: "separator", key: "sep" },
    { type: "checkbox", key: "desc", label: "Descending" },
    { key: "reset", label: "Reset", shortcut: "Esc" },
  ];
  const onChange = (event: Event) => {
    const { value, checked } = (event as Change).detail;
    result.textContent =
      checked === undefined ? `Sort: ${value}` : `Descending: ${checked}`;
  };
  const onSelect = (event: Event) =>
    (result.textContent = `Action: ${(event as Select).detail.value}`);
  menu.addEventListener("minerva-change", onChange);
  menu.addEventListener("minerva-select", onSelect);
  return () => {
    menu.removeEventListener("minerva-change", onChange);
    menu.removeEventListener("minerva-select", onSelect);
  };
}
