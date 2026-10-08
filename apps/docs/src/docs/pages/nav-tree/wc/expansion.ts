// expandedIds is controlled through minerva-expanded-change (cancelable:
// here "Getting started" stays open). wrap-labels wraps long labels.
type Item = { id: string; label: string; href?: string; children?: Item[] };
type NavTree = HTMLElement & {
  sections: { id: string; title?: string; items: Item[] }[];
  expandedIds: string[];
};
type Detail = { expandedIds: string[]; item: Item; expanded: boolean };

export function setup(root: HTMLElement) {
  const nav = root.querySelector<NavTree>("#nav")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  nav.sections = [
    {
      id: "docs",
      title: "Guides",
      items: [
        {
          id: "start",
          label: "Getting started",
          children: [
            { id: "install", label: "Installation", href: "/install" },
            {
              id: "first",
              label: "Your first page with Web Components",
              href: "/first",
            },
          ],
        },
        {
          id: "theming",
          label: "Theming",
          children: [
            { id: "tokens", label: "Design tokens", href: "/tokens" },
            {
              id: "palettes",
              label: "Palettes and dark mode",
              href: "/palettes",
            },
          ],
        },
      ],
    },
  ];
  nav.expandedIds = ["start"];
  const onExpanded = (e: Event) => {
    const { item, expanded } = (e as CustomEvent<Detail>).detail;
    if (item.id === "start" && !expanded) {
      e.preventDefault();
      log.value = "Getting started stays open (event canceled).";
      return;
    }
    log.value = `${item.label} ${expanded ? "expanded" : "collapsed"}`;
  };
  const onSelect = (e: Event) => {
    const { item } = (e as CustomEvent<{ item: Item }>).detail;
    if (!item.children) e.preventDefault();
  };
  nav.addEventListener("minerva-expanded-change", onExpanded);
  nav.addEventListener("minerva-select", onSelect);
  return () => {
    nav.removeEventListener("minerva-expanded-change", onExpanded);
    nav.removeEventListener("minerva-select", onSelect);
  };
}
