// minerva-sidebar-mode-change / minerva-open-change are cancelable: calling
// preventDefault() keeps the current state. Methods drive the shell directly.
type Shell = HTMLElement & {
  sidebarMode: string;
  expandNavigation(): void;
  focusMain(): void;
  closeNavigation(): void;
};

export function setup(root: HTMLElement) {
  const shell = root.querySelector<Shell>("#shell")!;
  const lock = root.querySelector<HTMLInputElement>("#lock")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  const onMode = (event: Event) => {
    const { mode } = (event as CustomEvent<{ mode: string }>).detail;
    if (lock.checked) {
      event.preventDefault();
      log.value = `Blocked switch to "${mode}"`;
    } else {
      log.value = `Sidebar mode: ${mode}`;
    }
  };
  const onOpen = (event: Event) => {
    const { open } = (event as CustomEvent<{ open: boolean }>).detail;
    log.value = `Drawer ${open ? "opened" : "closed"}`;
  };
  // Close the mobile drawer once a link is chosen (and keep the docs'
  // hash routing from navigating)
  const onNavigate = (event: Event) => {
    if (!(event.target as Element).closest("nav a")) return;
    event.preventDefault();
    shell.closeNavigation();
  };
  const onClick = (event: Event) => {
    const id = (event.target as Element).closest("minerva-button")?.id;
    if (id === "expand") shell.expandNavigation();
    if (id === "focus-main") shell.focusMain();
  };
  shell.addEventListener("minerva-sidebar-mode-change", onMode);
  shell.addEventListener("minerva-open-change", onOpen);
  shell.addEventListener("click", onNavigate);
  root.addEventListener("click", onClick);
  return () => {
    shell.removeEventListener("minerva-sidebar-mode-change", onMode);
    shell.removeEventListener("minerva-open-change", onOpen);
    shell.removeEventListener("click", onNavigate);
    root.removeEventListener("click", onClick);
  };
}
