// The panel is positioned against `anchor` (an element id) while an
// external button opens it; `modal` traps focus until it closes.
type Popover = HTMLElement & { show(): void; hide(): void };
type OpenChange = CustomEvent<{ open: boolean; reason: string }>;

export function setup(root: HTMLElement) {
  const button = root.querySelector<HTMLElement>("#edit-profile")!;
  const popover = root.querySelector<Popover>("#profile")!;
  const form = root.querySelector<HTMLFormElement>("#profile-form")!;
  const log = root.querySelector<HTMLElement>("#profile-log")!;
  const onClick = () => popover.show();
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    log.textContent = `Saved "${new FormData(form).get("name")}"`;
    popover.hide();
  };
  const onChange = (event: Event) => {
    const { open, reason } = (event as OpenChange).detail;
    if (!open) log.textContent = `Closed (reason: ${reason})`;
  };
  button.addEventListener("click", onClick);
  form.addEventListener("submit", onSubmit);
  popover.addEventListener("minerva-open-change", onChange);
  return () => {
    button.removeEventListener("click", onClick);
    form.removeEventListener("submit", onSubmit);
    popover.removeEventListener("minerva-open-change", onChange);
  };
}
