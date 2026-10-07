// Scrolling near the bottom fires `minerva-load-more`; `loading` shows the
// indicator row while the next page is fetched.
type Item = { id: number };
type VirtualList = HTMLElement & {
  items: Item[];
  loading: boolean;
  renderItem: (item: Item, index: number) => string;
};

const PAGE = 30;
const LAST = 150;

export function setup(root: HTMLElement) {
  const list = root.querySelector<VirtualList>("#list")!;
  const page = (from: number) =>
    Array.from({ length: PAGE }, (_, i) => ({ id: from + i + 1 }));
  list.items = page(0);
  list.renderItem = (item) => `Event ${item.id}`;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const onLoadMore = () => {
    if (list.items.length >= LAST) return;
    list.loading = true;
    timer = setTimeout(() => {
      list.items = [...list.items, ...page(list.items.length)];
      list.loading = false;
    }, 800);
  };
  list.addEventListener("minerva-load-more", onLoadMore);
  return () => {
    clearTimeout(timer);
    list.removeEventListener("minerva-load-more", onLoadMore);
  };
}
