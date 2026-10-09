type Item = { id: string; label: string; icon: string };
type NavTree = HTMLElement & {
  sections: { id: string; items: Item[] }[];
  activeId: string;
  collapsed: boolean;
};

export function setup(root: HTMLElement) {
  const shell = root.querySelector<HTMLElement & { closeNavigation(): void }>(
    "minerva-app-shell",
  )!;
  const nav = root.querySelector<NavTree>("minerva-nav-tree")!;
  const heading = root.querySelector("minerva-page-header")!;
  nav.sections = [
    {
      id: "workspace",
      items: [
        { id: "dashboard", label: "Dashboard", icon: "▦" },
        { id: "books", label: "Books", icon: "▤" },
        { id: "reviews", label: "Reviews", icon: "◇" },
        { id: "settings", label: "Settings", icon: "⚙" },
      ],
    },
  ];
  const sync = () => {
    nav.collapsed = shell.hasAttribute("collapsed");
  };
  const observer = new MutationObserver(sync);
  observer.observe(shell, { attributes: true, attributeFilter: ["collapsed"] });
  sync();
  const onSelect = (event: Event) => {
    const { value, item } = (
      event as CustomEvent<{ value: string; item: Item }>
    ).detail;
    event.preventDefault();
    nav.activeId = value;
    heading.setAttribute("heading", item.label);
    shell.closeNavigation();
  };
  nav.addEventListener("minerva-select", onSelect);
  return () => {
    observer.disconnect();
    nav.removeEventListener("minerva-select", onSelect);
  };
}
