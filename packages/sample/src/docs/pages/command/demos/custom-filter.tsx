import { useState } from "react";
import { Button, CommandDialog, type CommandItem } from "@minerva/lib-core";

const ITEMS: CommandItem[] = [
  { id: "billing", title: "Billing history", keywords: "invoice" },
  { id: "invoices", title: "Invoices", group: "Billing" },
  { id: "new-invoice", title: "New invoice", keywords: "create" },
  { id: "tax", title: "Tax settings", description: "Invoice numbering" },
];

// Rank: title starts with the query > a title word does > anywhere else
const rank = (item: CommandItem, query: string) => {
  const title = item.title.toLowerCase();
  if (title.startsWith(query)) return 0;
  if (title.split(" ").some((word) => word.startsWith(query))) return 1;
  return 2;
};

const filter = (items: CommandItem[], raw: string) => {
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

export default function CustomFilterDemo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState("—");
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button onClick={() => setOpen(true)}>Search “invoice”…</Button>
      <span>Selected: {last}</span>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        items={ITEMS}
        filter={filter}
        onSelect={(item) => setLast(item.title)}
      />
    </div>
  );
}
