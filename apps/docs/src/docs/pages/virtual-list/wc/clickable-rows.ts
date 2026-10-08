// `clickable` makes rows focusable and fires `minerva-item-click` on click,
// Enter or Space; scrollToIndex() scrolls programmatically.
type Item = { id: number };
type VirtualList = HTMLElement & {
  items: Item[];
  renderItem: (item: Item, index: number) => string;
  scrollToIndex: (index: number) => void;
};

export function setup(root: HTMLElement) {
  const list = root.querySelector<VirtualList>("#list")!;
  const jump = root.querySelector<HTMLElement>("#jump")!;
  const picked = root.querySelector<HTMLOutputElement>("#picked")!;
  list.items = Array.from({ length: 1000 }, (_, i) => ({ id: i + 1 }));
  list.renderItem = (item) => `Task ${item.id}`;
  const onItemClick = (event: Event) => {
    const { item, index } = (
      event as CustomEvent<{ item: Item; index: number }>
    ).detail;
    picked.value = `Picked task ${item.id} (index ${index})`;
  };
  const onJump = () => list.scrollToIndex(499);
  list.addEventListener("minerva-item-click", onItemClick);
  jump.addEventListener("click", onJump);
  return () => {
    list.removeEventListener("minerva-item-click", onItemClick);
    jump.removeEventListener("click", onJump);
  };
}
