// `shortcut` registers global keys ("mod" = Ctrl, or ⌘ on macOS) while the
// element is connected; max-results caps the visible results.
type CommandItem = { id: string; title: string; group?: string };
type CommandDialog = HTMLElement & { items: CommandItem[] };
type Select = CustomEvent<{ value: string; item: CommandItem }>;
type OpenChange = CustomEvent<{ open: boolean; reason: string }>;

const pages = ["Button", "Modal", "Drawer", "Menu", "Popover", "Toast"];

export function setup(root: HTMLElement) {
  const palette = root.querySelector<CommandDialog>("#go-to")!;
  const result = root.querySelector<HTMLElement>("#go-to-result")!;
  palette.items = [
    ...pages.map((title) => ({
      id: title.toLowerCase(),
      title,
      group: "Components",
    })),
    { id: "install", title: "Installation", group: "Guides" },
    { id: "theming", title: "Theming", group: "Guides" },
  ];
  const onChange = (event: Event) => {
    const { open, reason } = (event as OpenChange).detail;
    if (open) result.textContent = `Opened by ${reason}`;
  };
  const onSelect = (event: Event) =>
    (result.textContent = `Go to ${(event as Select).detail.item.title}`);
  palette.addEventListener("minerva-open-change", onChange);
  palette.addEventListener("minerva-select", onSelect);
  return () => {
    palette.removeEventListener("minerva-open-change", onChange);
    palette.removeEventListener("minerva-select", onSelect);
  };
}
