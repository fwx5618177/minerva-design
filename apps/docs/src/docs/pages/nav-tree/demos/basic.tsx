import {
  BarChartIcon,
  HomeIcon,
  SettingsIcon,
  UsersIcon,
} from "minerva-design/icons";
import { useState } from "react";
import { NavTree, type NavTreeSection } from "minerva-design";

const sections: NavTreeSection[] = [
  {
    id: "main",
    items: [
      {
        id: "home",
        label: "Home",
        href: "#home",
        icon: <HomeIcon size="1em" />,
      },
      {
        id: "analytics",
        label: "Analytics",
        description: "Traffic and conversions",
        icon: <BarChartIcon size="1em" />,
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
        icon: <UsersIcon size="1em" />,
        endContent: <small>12</small>,
      },
      {
        id: "settings",
        label: "Settings",
        href: "#settings",
        icon: <SettingsIcon size="1em" />,
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
