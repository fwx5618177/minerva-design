import { VirtualList, type VirtualListItem } from "@minerva/lib-core";

const items: VirtualListItem[] = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  metadata: { title: `Row ${i + 1}` },
}));

export default function BasicDemo() {
  return (
    <div style={{ width: "100%" }}>
      <VirtualList
        items={items}
        itemHeight={40}
        maxHeight={300}
        ariaLabel="Rows"
        renderItem={(item) => <span>{item.metadata?.title}</span>}
      />
    </div>
  );
}
