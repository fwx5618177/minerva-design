// `items` and `renderItem` are JS properties: only the rows in view are in the
// DOM, even with 10,000 items.
type Item = { id: number; metadata?: Record<string, string | number> };
type VirtualList = HTMLElement & {
  items: Item[];
  renderItem: (item: Item, index: number) => string;
};

export function setup(root: HTMLElement) {
  const list = root.querySelector<VirtualList>("#list")!;
  list.items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    metadata: { name: `Contact ${i + 1}` },
  }));
  list.renderItem = (item) => `${item.metadata?.name} · #${item.id}`;
}
