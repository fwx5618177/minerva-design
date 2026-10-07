import { useState } from "react";
import { VirtualList, type VirtualListItem } from "@minerva/lib-core";

const items: VirtualListItem[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  metadata: { title: `Invoice #${1000 + i}` },
}));

export default function ClickableRowsDemo() {
  const [selected, setSelected] = useState<string>();

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <VirtualList
        items={items}
        itemHeight={40}
        maxHeight={240}
        aria-label="Invoices"
        id="invoice-list"
        data-section="billing"
        onItemClick={(item) => setSelected(String(item.metadata?.title))}
        renderItem={(item) => <span>{item.metadata?.title}</span>}
      />
      <span aria-live="polite">Selected: {selected ?? "none"}</span>
    </div>
  );
}
