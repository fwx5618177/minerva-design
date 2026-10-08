// minerva-open-change reports why the drawer opens / closes.
type OpenChange = CustomEvent<{ open: boolean; reason: string }>;

export function setup(root: HTMLElement) {
  const drawer = root.querySelector<HTMLElement>("#help")!;
  const state = root.querySelector<HTMLElement>("#help-state")!;
  const onChange = (event: Event) => {
    const { open, reason } = (event as OpenChange).detail;
    state.textContent = `${open ? "Opened" : "Closed"} (reason: ${reason})`;
  };
  drawer.addEventListener("minerva-open-change", onChange);
  return () => drawer.removeEventListener("minerva-open-change", onChange);
}
