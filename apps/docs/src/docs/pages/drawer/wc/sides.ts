// Set `side` (and optionally `size`), then open with show().
type Drawer = HTMLElement & { side: string; show(): void };

export function setup(root: HTMLElement) {
  const buttons = root.querySelector<HTMLElement>("#sides")!;
  const drawer = root.querySelector<Drawer>("#sided")!;
  const title = root.querySelector<HTMLElement>("#sided-title")!;
  const onClick = (event: Event) => {
    const side = (event.target as Element)
      .closest("[data-side]")
      ?.getAttribute("data-side");
    if (!side) return;
    drawer.side = side;
    title.textContent = `Drawer from the ${side}`;
    drawer.show();
  };
  buttons.addEventListener("click", onClick);
  return () => buttons.removeEventListener("click", onClick);
}
