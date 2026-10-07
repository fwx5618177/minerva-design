// show() / hide() / toggle() drive the tooltip directly; hover / focus
// fire the cancelable minerva-open-change (methods do not).
type Tooltip = HTMLElement & { show(): void; hide(): void; toggle(): void };
type OpenChange = CustomEvent<{ open: boolean }>;

export function setup(root: HTMLElement) {
  const tip = root.querySelector<Tooltip>("#tip")!;
  const log = root.querySelector<HTMLElement>("#tip-log")!;
  const actions: Array<[string, () => void]> = [
    ["#tip-show", () => tip.show()],
    ["#tip-hide", () => tip.hide()],
    ["#tip-toggle", () => tip.toggle()],
  ];
  const buttons = actions.map(([selector, action]) => {
    const button = root.querySelector<HTMLElement>(selector)!;
    button.addEventListener("click", action);
    return [button, action] as const;
  });
  const onChange = (event: Event) =>
    (log.textContent = `minerva-open-change: open=${
      (event as OpenChange).detail.open
    }`);
  tip.addEventListener("minerva-open-change", onChange);
  return () => {
    for (const [button, action] of buttons) {
      button.removeEventListener("click", action);
    }
    tip.removeEventListener("minerva-open-change", onChange);
  };
}
