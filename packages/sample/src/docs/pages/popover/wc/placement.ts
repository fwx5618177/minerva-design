// side / align are reflected properties: changing them moves the open panel.
type Popover = HTMLElement & { side: string; align: string };

export function setup(root: HTMLElement) {
  const controls = root.querySelector<HTMLElement>("#placement-controls")!;
  const popover = root.querySelector<Popover>("#placed")!;
  const onChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    if (select.name === "side") popover.side = select.value;
    if (select.name === "align") popover.align = select.value;
  };
  controls.addEventListener("change", onChange);
  return () => controls.removeEventListener("change", onChange);
}
