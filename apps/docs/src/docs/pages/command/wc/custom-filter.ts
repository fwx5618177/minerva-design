// `filter` (JS property) receives the enabled items and the trimmed query and
// returns the results in display order: here, ranked by match quality.
type CommandItem = {
  id: string;
  title: string;
  description?: string;
  group?: string;
  keywords?: string;
};
type CommandDialog = HTMLElement & {
  items: CommandItem[];
  filter: (items: CommandItem[], query: string) => CommandItem[];
  show(): void;
};
type Select = CustomEvent<{ value: string; item: CommandItem }>;

const rank = (item: CommandItem, query: string) => {
  const title = item.title.toLowerCase();
  if (title.startsWith(query)) return 0;
  if (title.split(" ").some((word) => word.startsWith(query))) return 1;
  return 2;
};

export function setup(root: HTMLElement) {
  const button = root.querySelector<HTMLElement>("#open-ranked")!;
  const palette = root.querySelector<CommandDialog>("#ranked")!;
  const result = root.querySelector<HTMLElement>("#ranked-result")!;
  palette.items = [
    { id: "billing", title: "Billing history", keywords: "invoice" },
    { id: "invoices", title: "Invoices", group: "Billing" },
    { id: "new-invoice", title: "New invoice", keywords: "create" },
    { id: "tax", title: "Tax settings", description: "Invoice numbering" },
  ];
  palette.filter = (items, raw) => {
    const query = raw.toLowerCase();
    return items
      .filter((item) =>
        [item.title, item.description, item.group, item.keywords]
          .join(" ")
          .toLowerCase()
          .includes(query),
      )
      .sort((a, b) => rank(a, query) - rank(b, query));
  };
  const onOpen = () => palette.show();
  const onSelect = (event: Event) => {
    result.textContent = `Ran "${(event as Select).detail.item.title}"`;
  };
  button.addEventListener("click", onOpen);
  palette.addEventListener("minerva-select", onSelect);
  return () => {
    button.removeEventListener("click", onOpen);
    palette.removeEventListener("minerva-select", onSelect);
  };
}
