// The strip follows minerva-select (active-value); minerva-close only
// reports the click: remove the element to close the page.
export function setup(root: HTMLElement) {
  const strip = root.querySelector<HTMLElement & { activeValue?: string }>(
    "#pages",
  )!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  const onSelect = (event: Event) => {
    log.value = `Opened ${(event as CustomEvent<{ value: string }>).detail.value}`;
  };
  const onClose = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    (event.target as HTMLElement).remove();
    if (strip.activeValue === value) strip.activeValue = "home";
    log.value = `Closed ${value}`;
  };
  strip.addEventListener("minerva-select", onSelect);
  strip.addEventListener("minerva-close", onClose);
  return () => {
    strip.removeEventListener("minerva-select", onSelect);
    strip.removeEventListener("minerva-close", onClose);
  };
}
