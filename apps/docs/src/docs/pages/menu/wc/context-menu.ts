// Same entries and events as <minerva-menu>, opened at the pointer.
type Detail = { value: string; checked?: boolean };

export function setup(root: HTMLElement) {
  const menu = root.querySelector<HTMLElement>("#canvas-menu")!;
  const result = root.querySelector<HTMLElement>("#canvas-result")!;
  const onEvent = (event: Event) => {
    const { value, checked } = (event as CustomEvent<Detail>).detail;
    result.textContent = `${event.type}: ${value}${
      checked === undefined ? "" : ` = ${checked}`
    }`;
  };
  menu.addEventListener("minerva-select", onEvent);
  menu.addEventListener("minerva-change", onEvent);
  return () => {
    menu.removeEventListener("minerva-select", onEvent);
    menu.removeEventListener("minerva-change", onEvent);
  };
}
