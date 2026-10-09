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
  const lock = root.querySelector<HTMLElement & { checked: boolean }>("#lock")!;
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
  const nav = root.querySelector<
    HTMLElement & { sections: unknown[]; activeId: string; collapsed: boolean }
  >("minerva-nav-tree")!;
  nav.sections = [
    {
      id: "workspace",
      items: [
        { id: "inbox", label: "Inbox", icon: "✉" },
        { id: "archive", label: "Archive", icon: "▤" },
      ],
    },
  ];
  const sync = () => {
    nav.collapsed = shell.hasAttribute("collapsed");
  };
  const observer = new MutationObserver(sync);
  observer.observe(shell, { attributes: true, attributeFilter: ["collapsed"] });
  sync();
  const onNavigate = (event: Event) => {
    const { value, item } = (
      event as CustomEvent<{ value: string; item: { label: string } }>
    ).detail;
    event.preventDefault();
    nav.activeId = value;
    root
      .querySelector("minerva-page-header")!
      .setAttribute("heading", item.label);
    shell.closeNavigation();
  };
  const onClick = (event: Event) => {
    const id = (event.target as Element).closest("minerva-button")?.id;
    if (id === "expand") shell.expandNavigation();
    if (id === "focus-main") shell.focusMain();
  };
  shell.addEventListener("minerva-sidebar-mode-change", onMode);
  shell.addEventListener("minerva-open-change", onOpen);
  nav.addEventListener("minerva-select", onNavigate);
  root.addEventListener("click", onClick);
  return () => {
    shell.removeEventListener("minerva-sidebar-mode-change", onMode);
    shell.removeEventListener("minerva-open-change", onOpen);
    observer.disconnect();
    nav.removeEventListener("minerva-select", onNavigate);
    root.removeEventListener("click", onClick);
  };
}
