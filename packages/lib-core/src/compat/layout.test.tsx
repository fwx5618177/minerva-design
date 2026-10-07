import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  AppShell,
  Box,
  GridItem,
  HStack,
  Page,
  PageHeader,
  PageSection,
  ResponsiveGrid,
  SplitLayout,
  Stack,
  StatCard,
  Toolbar,
  VStack,
  type AppShellLabels,
  type AppShellNavigationState,
  type AppShellProps,
  type AppShellSidebarMode,
  type BoxProps,
  type GridColumns,
  type GridItemProps,
  type PageHeaderProps,
  type PageProps,
  type PageSectionProps,
  type ResponsiveGridProps,
  type SplitLayoutProps,
  type StackProps,
  type StatCardProps,
  type ToolbarProps,
} from "./layout";

// Type-level: novel-isr-ui prop shapes are accepted as-is.
const boxProps: BoxProps = { maxW: "880px", mx: "auto", px: "6", py: "16" };
const stackProps: StackProps = { direction: "row", gap: 2, justify: "between" };
const columns: GridColumns = { base: 1, sm: 2, md: 3, lg: 6 };
const gridProps: ResponsiveGridProps = { as: "section", columns, gap: 4 };
const itemProps: GridItemProps = { fullWidth: true, asChild: false };
const splitProps: SplitLayoutProps = {
  aside: "Aside",
  asideWidth: 280,
  collapseBelow: "lg",
  gap: "20px",
};
const pageProps: PageProps = { maxWidth: 1440 };
const headerProps: PageHeaderProps = { title: "Books", actions: null };
const sectionProps: PageSectionProps = { title: "Stats", icon: "*" };
const statProps: StatCardProps = { label: "Reads", value: 0 };
const toolbarProps: ToolbarProps = { density: "compact", wrap: false };
const mode: AppShellSidebarMode = "floating";
const labels: Partial<AppShellLabels> = { expand: "Expand navigation" };

afterEach(() => {
  vi.restoreAllMocks();
});

describe("compat/layout", () => {
  it("renders Box and HStack the way the novel apps use them", () => {
    render(
      <Box {...boxProps} data-testid="detail">
        <HStack gap="2" className="actionRow" style={{ marginBottom: 12 }}>
          <button type="button">Rate</button>
        </HStack>
        <Box mt="8" pt="6" className="dividedBlock" data-testid="block" />
        <Box p="6" style={{ textAlign: "center" }} data-testid="empty" />
      </Box>,
    );
    const detail = screen.getByTestId("detail");
    expect(detail.style.maxWidth).toBe("880px");
    expect(detail.style.marginLeft).toBe("auto");
    expect(detail.style.paddingLeft).toBe("var(--space-6)");
    expect(detail.style.paddingTop).toBe("var(--space-16)");
    const row = screen.getByRole("button", { name: "Rate" }).parentElement!;
    expect(row).toHaveClass("ui-stack", "ui-stack-row", "actionRow");
    expect(row.style.gap).toBe("var(--space-2)");
    expect(row.style.alignItems).toBe("center");
    expect(row.style.marginBottom).toBe("12px");
    expect(screen.getByTestId("block")).toHaveClass("dividedBlock");
    expect(screen.getByTestId("block").style.marginTop).toBe("var(--space-8)");
    expect(screen.getByTestId("empty").style.textAlign).toBe("center");
  });

  it("renders Stack and VStack with novel props", () => {
    render(
      <>
        <Stack {...stackProps} data-testid="stack" />
        <VStack gap={3} data-testid="v" />
      </>,
    );
    expect(screen.getByTestId("stack")).toHaveClass("ui-stack-row");
    expect(screen.getByTestId("stack").style.justifyContent).toBe(
      "space-between",
    );
    expect(screen.getByTestId("v").style.alignItems).toBe("stretch");
  });

  it("renders a responsive data page: Page, ResponsiveGrid, GridItem and StatCard", () => {
    const { container } = render(
      <Page {...pageProps}>
        <PageHeader {...headerProps} description="Catalogue" />
        <ResponsiveGrid {...gridProps} aria-label="Metrics">
          <StatCard {...statProps} description="No drafts" />
          <GridItem {...itemProps}>Summary</GridItem>
        </ResponsiveGrid>
        <PageSection {...sectionProps}>Body</PageSection>
      </Page>,
    );
    expect(container.querySelector(".ui-page")).toHaveStyle({
      maxWidth: "1440px",
    });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Books",
    );
    const grid = screen.getByRole("region", { name: "Metrics" });
    expect(grid).toHaveClass("ui-responsive-grid");
    expect(grid.style.getPropertyValue("--ui-grid-lg")).toBe("6");
    expect(container.querySelector("dd")).toHaveTextContent("0");
    expect(screen.getByText("Summary")).toHaveClass("ui-grid-item-full-width");
    expect(screen.getByRole("region", { name: "Stats" })).toHaveClass(
      "ui-page-section",
    );
  });

  it("renders SplitLayout and Toolbar with novel props", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <SplitLayout {...splitProps}>
        <Toolbar {...toolbarProps} ref={ref} aria-label="Actions">
          <button type="button">Save</button>
        </Toolbar>
      </SplitLayout>,
    );
    expect(container.querySelector(".ui-split-layout-grid--lg")).not.toBeNull();
    expect(
      (container.firstElementChild as HTMLElement).style.getPropertyValue(
        "--ui-split-layout-aside-width",
      ),
    ).toBe("280px");
    expect(screen.getByRole("group", { name: "Actions" })).toBe(ref.current);
    expect(ref.current).toHaveClass(
      "ui-toolbar",
      "ui-toolbar-compact",
      "ui-toolbar-nowrap",
    );
  });

  it("passes novel's own default AppShell control names explicitly", async () => {
    const user = userEvent.setup();
    const onSidebarModeChange = vi.fn();
    const navigation = (state: AppShellNavigationState) => (
      <nav data-collapsed={String(state.collapsed)}>Links</nav>
    );
    const props: AppShellProps = {
      brand: "Admin",
      navigation,
      defaultSidebarMode: mode,
      onSidebarModeChange,
      labels,
      headerActions: <button type="button">Account</button>,
    };
    render(<AppShell {...props}>Content</AppShell>);
    expect(
      screen.getByRole("complementary", { name: "Navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Disable floating sidebar" }),
    ).toBeInTheDocument();
    await user.click(
      screen.getAllByRole("button", { name: "Expand navigation" })[0]!,
    );
    expect(onSidebarModeChange).toHaveBeenLastCalledWith("expanded");
    expect(
      screen.getAllByRole("button", { name: "Collapse sidebar" }),
    ).toHaveLength(2);
  });

  it("lets apps override the AppShell navigation label", () => {
    render(
      <AppShell
        brand="Admin"
        navigation={() => null}
        navigationLabel="站点导航"
      >
        Content
      </AppShell>,
    );
    expect(
      screen.getByRole("complementary", { name: "站点导航" }),
    ).toBeInTheDocument();
  });
});
