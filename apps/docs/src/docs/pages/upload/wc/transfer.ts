// Canceling `minerva-files-selected` lets the page own `items`: each file is
// listed as "uploading", then "done" (every second file fails once, to show
// the retry button and `minerva-retry`).
type Item = {
  id: string;
  name: string;
  status: "uploading" | "done" | "error";
  error?: string;
  file?: File;
};
type Upload = HTMLElement & { items: Item[] };

export function setup(root: HTMLElement) {
  const upload = root.querySelector<Upload>("#up-transfer")!;
  const timers = new Set<ReturnType<typeof setTimeout>>();
  let count = 0;
  const update = (id: string, patch: Partial<Item>) => {
    upload.items = upload.items.map((item) =>
      item.id === id ? { ...item, ...patch } : item,
    );
  };
  const send = (id: string, fail: boolean) => {
    update(id, { status: "uploading", error: undefined });
    const timer = setTimeout(() => {
      timers.delete(timer);
      update(
        id,
        fail ? { status: "error", error: "Network error" } : { status: "done" },
      );
    }, 1500);
    timers.add(timer);
  };
  const onSelected = (event: Event) => {
    event.preventDefault();
    const { files } = (event as CustomEvent<{ files: File[] }>).detail;
    for (const file of files) {
      const id = `doc-${++count}`;
      upload.items = [
        ...upload.items,
        { id, name: file.name, status: "uploading", file },
      ];
      send(id, count % 2 === 0);
    }
  };
  const onRetry = (event: Event) => {
    send((event as CustomEvent<{ item: Item }>).detail.item.id, false);
  };
  upload.addEventListener("minerva-files-selected", onSelected);
  upload.addEventListener("minerva-retry", onRetry);
  return () => {
    timers.forEach(clearTimeout);
    upload.removeEventListener("minerva-files-selected", onSelected);
    upload.removeEventListener("minerva-retry", onRetry);
  };
}
