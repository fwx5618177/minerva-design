import { useState } from "react";
import { Button, CommandDialog, Stack, type CommandItem } from "minerva-design";
import { LuSearch } from "react-icons/lu";

const pages: CommandItem[] = [
  {
    id: "button",
    title: "Button",
    description: "Actions, loading and variants",
    group: "Components",
    keywords: "click action submit",
  },
  {
    id: "input",
    title: "Input",
    description: "Text fields and validation",
    group: "Components",
    keywords: "form text search",
  },
  {
    id: "installation",
    title: "Installation",
    description: "Install and configure Minerva",
    group: "Getting started",
    keywords: "npm pnpm css",
  },
];

export default function SiteSearchDemo() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("No page selected");
  return (
    <Stack gap={3} style={{ width: "100%", maxWidth: 420 }}>
      <Button
        color="neutral"
        variant="outline"
        startIcon={<LuSearch />}
        endIcon={<kbd>Ctrl ⇧ K</kbd>}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        style={{ justifyContent: "space-between" }}
      >
        Search documentation
      </Button>
      <output aria-live="polite">{selected}</output>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search documentation"
        description="Search titles, descriptions or keywords. Use the arrow keys and Enter to choose a page."
        placeholder="Search components or guides…"
        emptyText="No matching page. Try another keyword."
        items={pages}
        maxResults={8}
        shortcut="ctrl+shift+k"
        shortcutLabel="Ctrl ⇧ K"
        onSelect={(item) => setSelected(`Selected: ${item.title}`)}
      />
    </Stack>
  );
}
