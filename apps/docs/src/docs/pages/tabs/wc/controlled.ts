// minerva-change is cancelable: preventDefault() keeps the current tab, e.g.
// while the open tab has unsaved changes.
export function setup(root: HTMLElement) {
  const tabs = root.querySelector<HTMLElement>("#editor")!;
  const dirty = root.querySelector<HTMLInputElement>("#dirty")!;
  const status = root.querySelector<HTMLOutputElement>("#status")!;
  const onChange = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    if (dirty.checked) {
      event.preventDefault();
      status.value = `Save or discard your changes before opening "${value}".`;
    } else {
      status.value = `Opened "${value}".`;
    }
  };
  tabs.addEventListener("minerva-change", onChange);
  return () => tabs.removeEventListener("minerva-change", onChange);
}
