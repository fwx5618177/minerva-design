import { AppShell, Button, Page, PageHeader } from "@minerva/lib-core";
import { LuLayoutDashboard } from "react-icons/lu";

const links = ["Dashboard", "Books", "Reviews", "Settings"];

export default function SkipLinkDemo() {
  return (
    // The transform makes the fixed sidebar relative to this preview frame.
    <div
      style={{
        height: 320,
        overflow: "auto",
        transform: "translateZ(0)",
        width: "100%",
      }}
    >
      <AppShell
        brand="Publishing Admin"
        brandIcon={<LuLayoutDashboard />}
        skipLink="Skip to the book list"
        style={{ minHeight: "100%" }}
        headerActions={<Button size="small">Account</Button>}
        navigation={({ collapsed }) => (
          <nav>
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                title={link}
                style={{ display: "block", padding: "6px 8px" }}
              >
                {collapsed ? link[0] : link}
              </a>
            ))}
          </nav>
        )}
      >
        <Page>
          <PageHeader
            title="Books"
            description="Focus the frame and press Tab: the skip link appears first"
          />
          <Button size="small">First action of the content</Button>
        </Page>
      </AppShell>
    </div>
  );
}
