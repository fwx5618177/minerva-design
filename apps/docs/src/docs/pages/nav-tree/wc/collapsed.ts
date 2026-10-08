// collapsed keeps the icons only (labels stay the accessible names).
type Item = { id: string; label: string; href?: string; icon?: string };
type NavTree = HTMLElement & {
  sections: { id: string; items: Item[] }[];
  collapsed: boolean;
  activeId?: string;
};

export function setup(root: HTMLElement) {
  const nav = root.querySelector<NavTree>("#nav")!;
  const toggle = root.querySelector<HTMLElement>("#toggle")!;
  nav.sections = [
    {
      id: "main",
      items: [
        { id: "dashboard", label: "Dashboard", href: "/", icon: "📈" },
        { id: "projects", label: "Projects", href: "/projects", icon: "📁" },
        { id: "settings", label: "Settings", href: "/settings", icon: "⚙️" },
      ],
    },
  ];
  const onToggle = () => {
    nav.collapsed = !nav.collapsed;
    toggle.textContent = nav.collapsed ? "Expand sidebar" : "Collapse sidebar";
  };
  const onSelect = (e: Event) => {
    e.preventDefault();
    nav.activeId = (e as CustomEvent<{ value: string }>).detail.value;
  };
  toggle.addEventListener("click", onToggle);
  nav.addEventListener("minerva-select", onSelect);
  return () => {
    toggle.removeEventListener("click", onToggle);
    nav.removeEventListener("minerva-select", onSelect);
  };
}
