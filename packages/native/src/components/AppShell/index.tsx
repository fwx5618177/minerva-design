import { useState, type ReactNode } from "react";
import {
  ScrollView,
  Text,
  View,
  useWindowDimensions,
  type ViewProps,
} from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { textStyle } from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";
import { Button } from "../Button";
import { Dialog } from "../Dialog";
export type AppShellSidebarMode = "expanded" | "compact";
export interface AppShellNavigationState {
  collapsed: boolean;
  isMobile: boolean;
  closeNavigation: () => void;
  expandNavigation: () => void;
}
export interface AppShellProps extends ViewProps {
  brand: ReactNode;
  brandIcon?: ReactNode;
  navigation: (state: AppShellNavigationState) => ReactNode;
  navigationLabel?: string;
  navigationKey?: string;
  headerActions?: ReactNode;
  pageNavigation?: ReactNode;
  sidebarMode?: AppShellSidebarMode;
  /** @default "expanded" */
  defaultSidebarMode?: AppShellSidebarMode;
  onSidebarModeChange?: (mode: AppShellSidebarMode) => void;
}
export function AppShell({
  brand,
  brandIcon,
  navigation,
  navigationLabel,
  navigationKey,
  headerActions,
  pageNavigation,
  children,
  sidebarMode,
  defaultSidebarMode = "expanded",
  onSidebarModeChange,
  style,
  ...props
}: AppShellProps) {
  const { width } = useWindowDimensions();
  const isMobile = width <= 768;
  const { t: translate } = useI18n();
  const [mode, setMode] = useControllable(
    sidebarMode,
    defaultSidebarMode,
    onSidebarModeChange,
  );
  const [openedRoute, setOpenedRoute] = useState<{
    route: string | undefined;
  } | null>(null);
  const [viewport, setViewport] = useState({ isMobile, navigationKey });
  if (
    viewport.isMobile !== isMobile ||
    viewport.navigationKey !== navigationKey
  ) {
    setViewport({ isMobile, navigationKey });
    setOpenedRoute(null);
  }
  const shown = openedRoute !== null && openedRoute.route === navigationKey;
  const { tokens: t } = useTheme();
  const state = {
    collapsed: !isMobile && mode === "compact",
    isMobile,
    closeNavigation: () => setOpenedRoute(null),
    expandNavigation: () => setMode("expanded"),
  };
  return (
    <View
      {...props}
      style={[
        { flex: 1, backgroundColor: t.colors["background-color"] },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: t.space["3"],
          padding: t.space["3"],
          borderBottomWidth: 1,
          borderColor: t.colors["border-color"],
        }}
      >
        <Button
          variant="ghost"
          accessibilityLabel={
            isMobile
              ? translate("appShell.openNavigation")
              : mode === "compact"
                ? translate("appShell.expand")
                : translate("appShell.collapse")
          }
          onPress={() =>
            isMobile
              ? setOpenedRoute({ route: navigationKey })
              : setMode(mode === "compact" ? "expanded" : "compact")
          }
        >
          ☰
        </Button>
        {brandIcon}
        <Text style={[textStyle(t, "lg"), { flex: 1, fontWeight: "600" }]}>
          {brand}
        </Text>
        {headerActions}
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        {!isMobile && (
          <ScrollView
            style={{
              width: mode === "compact" ? 72 : 260,
              flexGrow: 0,
              borderRightWidth: 1,
              borderColor: t.colors["border-color"],
            }}
          >
            {navigation(state)}
          </ScrollView>
        )}
        <View style={{ flex: 1, minWidth: 0 }}>
          {pageNavigation}
          {children}
        </View>
      </View>
      {isMobile && (
        <Dialog
          open={shown}
          title={navigationLabel ?? translate("appShell.navigation")}
          onOpenChange={(next) => {
            if (!next) setOpenedRoute(null);
          }}
        >
          {navigation(state)}
        </Dialog>
      )}
    </View>
  );
}
