// minerva-open-change is cancelable: preventDefault() keeps the modal open.
type OpenChange = CustomEvent<{ open: boolean; reason: string }>;

export function setup(root: HTMLElement) {
  const modal = root.querySelector<HTMLElement>("#draft")!;
  const dirty = root.querySelector<HTMLInputElement>("#dirty")!;
  const log = root.querySelector<HTMLElement>("#draft-log")!;
  const write = (line: string) =>
    (log.textContent = `${line}\n${log.textContent}`.split("\n", 4).join("\n"));
  const onChange = (event: Event) => {
    const { open, reason } = (event as OpenChange).detail;
    if (!open && dirty.checked) {
      event.preventDefault();
      write(`close (${reason}) blocked: unsaved changes`);
    } else write(`open-change: open=${open} (${reason})`);
  };
  const onAfterOpen = () => write("after-open");
  const onAfterClose = () => write("after-close");
  modal.addEventListener("minerva-open-change", onChange);
  modal.addEventListener("minerva-after-open", onAfterOpen);
  modal.addEventListener("minerva-after-close", onAfterClose);
  return () => {
    modal.removeEventListener("minerva-open-change", onChange);
    modal.removeEventListener("minerva-after-open", onAfterOpen);
    modal.removeEventListener("minerva-after-close", onAfterClose);
  };
}
