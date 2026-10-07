// Without a trigger slot, set `size` and call show() (or set `open`).
type Modal = HTMLElement & { size: string; show(): void };

export function setup(root: HTMLElement) {
  const buttons = root.querySelector<HTMLElement>("#sizes")!;
  const modal = root.querySelector<Modal>("#sized")!;
  const title = root.querySelector<HTMLElement>("#sized-title")!;
  const onClick = (event: Event) => {
    const size = (event.target as Element)
      .closest("[data-size]")
      ?.getAttribute("data-size");
    if (!size) return;
    modal.size = size;
    title.textContent = `Size: ${size}`;
    modal.show();
  };
  buttons.addEventListener("click", onClick);
  return () => buttons.removeEventListener("click", onClick);
}
