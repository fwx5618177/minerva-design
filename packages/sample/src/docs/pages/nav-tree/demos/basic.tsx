import { useState } from "react";
import { NavTree, type NavTreeSection } from "@minerva/lib-core";
import { LuChartBar, LuHouse, LuSettings, LuUsers } from "react-icons/lu";

const sections: NavTreeSection[] = [
  {
    id: "main",
    items: [
      { id: "home", label: "Home", href: "#home", icon: <LuHouse /> },
      {
        id: "analytics",
        label: "Analytics",
        description: "Traffic and conversions",
        icon: <LuChartBar />,
        children: [
          { id: "traffic", label: "Traffic", href: "#traffic" },
          { id: "funnels", label: "Funnels", href: "#funnels" },
        ],
      },
    ],
  },
  {
    id: "admin",
    title: "Administration",
    items: [
      {
        id: "users",
        label: "Users",
        href: "#users",
        icon: <LuUsers />,
        endContent: <small>12</small>,
      },
      {
        id: "settings",
        label: "Settings",
        href: "#settings",
        icon: <LuSettings />,
        disabled: true,
      },
    ],
  },
];

export default function BasicDemo() {
  const [active, setActive] = useState("traffic");
  return (
    <div style={{ maxWidth: 260 }}>
      <NavTree
        aria-label="Main navigation"
        sections={sections}
        activeId={active}
        onItemSelect={(item) => {
          if (!item.children) setActive(item.id);
        }}
      />
    </div>
  );
}
