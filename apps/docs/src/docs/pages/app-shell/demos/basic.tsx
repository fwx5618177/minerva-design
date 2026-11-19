import {
  BookOpenIcon,
  LayoutGridIcon,
  MessageSquareIcon,
  SettingsIcon,
} from "minerva-design/icons";
import { useState } from "react";
import { AppShell, Badge, NavTree, Page, PageHeader } from "minerva-design";

const items = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutGridIcon size="1em" /> },
  { id: "books", label: "Books", icon: <BookOpenIcon size="1em" /> },
  { id: "reviews", label: "Reviews", icon: <MessageSquareIcon size="1em" /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon size="1em" /> },
];

export default function BasicDemo() {
  const [active, setActive] = useState("dashboard");
  return (
    // The transform makes the fixed sidebar relative to this preview frame.
    <div
      style={{
        height: 360,
        overflow: "auto",
        transform: "translateZ(0)",
        width: "100%",
      }}
    >
      <AppShell
        brand="Publishing Admin"
        brandIcon={<LayoutGridIcon size="1em" />}
        navigationLabel="Workspace navigation"
        style={{ minHeight: "100%" }}
        headerActions={
          <Badge color="neutral" variant="subtle">
            Workspace
          </Badge>
        }
        navigation={({ collapsed, closeNavigation }) => (
          <NavTree
            sections={[{ id: "workspace", items }]}
            activeId={active}
            collapsed={collapsed}
            onItemSelect={(item) => {
              setActive(item.id);
              closeNavigation();
            }}
          />
        )}
      >
        <Page>
          <PageHeader
            title={items.find((item) => item.id === active)?.label}
            description="Select a section from the sidebar. Collapse it to keep more room for your content."
          />
        </Page>
      </AppShell>
    </div>
  );
}
