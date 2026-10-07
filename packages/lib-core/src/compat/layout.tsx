// @novel-isr/ui compatibility: layout group.
//
// Box, Stack/HStack/VStack, ResponsiveGrid/GridItem, SplitLayout,
// Page/PageHeader/PageSection/StatCard/Toolbar and AppShell were ported with
// novel-isr-ui's API unchanged (same prop names, values, defaults, DOM, `ui-*`
// hooks and `--ui-*` override properties), so the Minerva components are
// re-exported directly. Spacing tokens resolve to Minerva's `--space-*` scale.
// Only AppShell has built-in strings. The adapter passes novel-isr-ui's own
// defaults explicitly (they are English in novel: it had no Chinese originals
// for AppShell), so compat output never depends on lib-core's locale.
import MinervaAppShell from "../components/AppShell";
import type { AppShellLabels, AppShellProps } from "../components/AppShell";

export { Box } from "../components/Box";
export type { BoxProps } from "../components/Box";

export { Stack, HStack, VStack } from "../components/Stack";
export type { StackProps } from "../components/Stack";

export { ResponsiveGrid, GridItem } from "../components/ResponsiveGrid";
export type {
  ResponsiveGridProps,
  GridItemProps,
  ResponsiveGridColumns as GridColumns,
} from "../components/ResponsiveGrid";

export { SplitLayout } from "../components/SplitLayout";
export type { SplitLayoutProps } from "../components/SplitLayout";

export {
  Page,
  PageHeader,
  PageSection,
  StatCard,
  Toolbar,
} from "../components/Page";
export type {
  PageProps,
  PageHeaderProps,
  PageSectionProps,
  StatCardProps,
  ToolbarProps,
} from "../components/Page";

const novelAppShellLabels: AppShellLabels = {
  expand: "Expand sidebar",
  collapse: "Collapse sidebar",
  enableFloating: "Enable floating sidebar",
  disableFloating: "Disable floating sidebar",
  openNavigation: "Open navigation",
  closeNavigation: "Close navigation",
};

/** AppShell with @novel-isr/ui's default (English) control names */
export const AppShell = ({
  labels,
  navigationLabel = "Navigation",
  ...props
}: AppShellProps) => (
  <MinervaAppShell
    {...props}
    navigationLabel={navigationLabel}
    labels={{ ...novelAppShellLabels, ...labels }}
  />
);

export type {
  AppShellProps,
  AppShellSidebarMode,
  AppShellNavigationState,
  AppShellLabels,
} from "../components/AppShell";
