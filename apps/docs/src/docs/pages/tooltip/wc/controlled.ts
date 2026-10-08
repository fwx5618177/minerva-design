// show() / hide() / toggle() drive the tooltip directly; hover / focus
// fire the cancelable minerva-open-change (methods do not).
type Tooltip = HTMLElement & { show(): void; hide(): void; toggle(): void };
type OpenChange = CustomEvent<{ open: boolean }>;

export function setup(root: HTMLElement) {
  const tip = root.querySelector<Tooltip>("#tip")!;
  const showButton = root.querySelector<HTMLElement>("#tip-show")!;
  const hideButton = root.querySelector<HTMLElement>("#tip-hide")!;
  const toggleButton = root.querySelector<HTMLElement>("#tip-toggle")!;
  const log = root.querySelector<HTMLElement>("#tip-log")!;
  const onShow = () => tip.show();
  const onHide = () => tip.hide();
  const onToggle = () => tip.toggle();
  const onChange = (event: Event) =>
    (log.textContent = `minerva-open-change: open=${
      (event as OpenChange).detail.open
    }`);
  showButton.addEventListener("click", onShow);
  hideButton.addEventListener("click", onHide);
  toggleButton.addEventListener("click", onToggle);
  tip.addEventListener("minerva-open-change", onChange);
  return () => {
    showButton.removeEventListener("click", onShow);
    hideButton.removeEventListener("click", onHide);
    toggleButton.removeEventListener("click", onToggle);
    tip.removeEventListener("minerva-open-change", onChange);
  };
}
