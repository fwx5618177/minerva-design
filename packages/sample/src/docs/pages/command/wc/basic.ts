// `items` is a JS property (CommandItem[]); minerva-select gives the id.
type CommandItem = {
  id: string;
  title: string;
  description?: string;
  group?: string;
  keywords?: string;
  disabled?: boolean;
};
type CommandDialog = HTMLElement & { items: CommandItem[]; show(): void };
type Select = CustomEvent<{ value: string; item: CommandItem }>;

export function setup(root: HTMLElement) {
  const button = root.querySelector<HTMLElement>("#open-palette")!;
  const palette = root.querySelector<CommandDialog>("#palette")!;
  const result = root.querySelector<HTMLElement>("#palette-result")!;
  palette.items = [
    { id: "new-file", title: "New file", group: "File", keywords: "create" },
    { id: "open-recent", title: "Open recent", group: "File" },
    {
      id: "theme",
      title: "Toggle theme",
      description: "Switch between light and dark",
      group: "View",
      keywords: "dark light",
    },
    { id: "zoom", title: "Reset zoom", group: "View" },
    { id: "invite", title: "Invite member", group: "Team" },
    { id: "billing", title: "Billing", group: "Team", disabled: true },
  ];
  const onOpen = () => palette.show();
  const onSelect = (event: Event) => {
    const { value, item } = (event as Select).detail;
    result.textContent = `Ran "${item.title}" (${value})`;
  };
  button.addEventListener("click", onOpen);
  palette.addEventListener("minerva-select", onSelect);
  return () => {
    button.removeEventListener("click", onOpen);
    palette.removeEventListener("minerva-select", onSelect);
  };
}
