import { useState } from "react";
import { CommandDialog, type CommandItem } from "minerva-design";

const ITEMS: CommandItem[] = [
  { id: "new", title: "New document" },
  { id: "open", title: "Open recent", description: "Last 10 documents" },
  { id: "theme", title: "Toggle theme", keywords: "dark light" },
];

export default function ShortcutDemo() {
  const [last, setLast] = useState<string | null>(null);
  return (
    <>
      <p>
        Press <kbd>Ctrl</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd> to open the palette.
      </p>
      <CommandDialog
        items={ITEMS}
        shortcut="mod+k"
        shortcutLabel="⌘K"
        title="Quick actions"
        onSelect={(item) => setLast(item.title)}
      />
      <p aria-live="polite">
        {last ? `Selected: ${last}` : "Nothing selected yet"}
      </p>
    </>
  );
}
