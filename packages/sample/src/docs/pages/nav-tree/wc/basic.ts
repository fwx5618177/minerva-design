// Sections come from a JS property. minerva-select is cancelable: prevent the
// link navigation and route on the client, then move active-id.
type Item = {
  id: string;
  label: string;
  description?: string;
  href?: string;
  icon?: string;
  endContent?: string;
  disabled?: boolean;
  children?: Item[];
};
type NavTree = HTMLElement & {
  sections: { id: string; title?: string; items: Item[] }[];
  activeId?: string;
};

export function setup(root: HTMLElement) {
  const nav = root.querySelector<NavTree>("#nav")!;
  nav.sections = [
    {
      id: "main",
      items: [
        { id: "home", label: "Home", href: "/home", icon: "🏠" },
        {
          id: "inbox",
          label: "Inbox",
          href: "/inbox",
          icon: "✉️",
          endContent: "12",
        },
      ],
    },
    {
      id: "finance",
      title: "Finance",
      items: [
        {
          id: "billing",
          label: "Billing",
          description: "Invoices and payments",
          icon: "💳",
          children: [
            { id: "invoices", label: "Invoices", href: "/billing/invoices" },
            { id: "payments", label: "Payments", href: "/billing/payments" },
            {
              id: "refunds",
              label: "Refunds",
              href: "/billing/refunds",
              disabled: true,
            },
          ],
        },
        { id: "reports", label: "Reports", href: "/reports", icon: "📊" },
      ],
    },
  ];
  const onSelect = (e: Event) => {
    const { value, item } = (e as CustomEvent<{ value: string; item: Item }>)
      .detail;
    if (item.children) return; // a branch: it toggles
    e.preventDefault();
    nav.activeId = value;
  };
  nav.addEventListener("minerva-select", onSelect);
  return () => nav.removeEventListener("minerva-select", onSelect);
}
