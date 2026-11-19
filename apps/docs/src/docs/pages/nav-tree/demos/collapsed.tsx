import { FileTextIcon, HomeIcon, InboxIcon } from "minerva-design/icons";
import { useState } from "react";
import { Button, NavTree, type NavTreeSection } from "minerva-design";

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
        id: "inbox",
        label: "Inbox",
        href: "#inbox",
        icon: <InboxIcon size="1em" />,
      },
      {
        id: "docs",
        label: "Documents with a rather long name",
        description: "Shared with the whole team",
        href: "#docs",
        icon: <FileTextIcon size="1em" />,
      },
    ],
  },
];

export default function CollapsedDemo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <Button
        color="neutral"
        variant="outline"
        size="small"
        onClick={() => setCollapsed((c) => !c)}
      >
        {collapsed ? "Expand sidebar" : "Collapse sidebar"}
      </Button>
      <div style={{ width: collapsed ? 56 : 220 }}>
        <NavTree
          sections={sections}
          activeId="inbox"
          collapsed={collapsed}
          wrapLabels
        />
      </div>
    </div>
  );
}
