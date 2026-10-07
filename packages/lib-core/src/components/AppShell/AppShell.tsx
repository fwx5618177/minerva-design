import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  LuPanelLeftClose,
  LuPanelLeftOpen,
  LuPin,
  LuPinOff,
  LuX,
} from "react-icons/lu";
import { IconButton } from "../IconButton";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import { useControllableState } from "../../internal/useControllableState";
import type {
  AppShellLabels,
  AppShellNavigationState,
  AppShellProps,
} from "./types";
import styles from "./appShell.module.scss";

const MOBILE_QUERY = "(max-width: 768px)";
const canMatch = () =>
  typeof window !== "undefined" && typeof window.matchMedia === "function";
const subscribeMobile = (changed: () => void) => {
  if (!canMatch()) return () => {};
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener("change", changed);
  return () => query.removeEventListener("change", changed);
};
const getMobile = () => canMatch() && window.matchMedia(MOBILE_QUERY).matches;
const getServerMobile = () => false;

/**
 * AppShell: application chrome with a desktop sidebar (expanded, compact rail or
 * floating rail), a sticky header and a single `main` landmark. At 768px and
 * below the navigation moves into a modal drawer opened from the header.
 */
const AppShell = ({
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
  labels: overrides,
  className,
  ...rest
}: AppShellProps) => {
  const { t } = useI18n();
  const labels: AppShellLabels = {
    expand: overrides?.expand ?? t("appShell.expand"),
    collapse: overrides?.collapse ?? t("appShell.collapse"),
    enableFloating: overrides?.enableFloating ?? t("appShell.enableFloating"),
    disableFloating:
      overrides?.disableFloating ?? t("appShell.disableFloating"),
    openNavigation: overrides?.openNavigation ?? t("appShell.openNavigation"),
    closeNavigation:
      overrides?.closeNavigation ?? t("appShell.closeNavigation"),
  };
  const label = navigationLabel ?? t("appShell.navigation");

  const [mode, setMode] = useControllableState({
    value: sidebarMode,
    defaultValue: defaultSidebarMode,
    onChange: onSidebarModeChange,
  });
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobile,
    getServerMobile,
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);

  // A committed route (navigationKey) or a breakpoint change dismisses the
  // temporary navigation and the floating hover / focus state.
  const [seen, setSeen] = useState({ navigationKey, isMobile });
  if (seen.navigationKey !== navigationKey || seen.isMobile !== isMobile) {
    setSeen({ navigationKey, isMobile });
    setMobileOpen(false);
    if (seen.isMobile !== isMobile) {
      setHovered(false);
      setKeyboardFocus(false);
    }
  }

  const headerToggle = useRef<HTMLButtonElement>(null);
  const sidebarId = useId();
  const drawerOpen = isMobile && mobileOpen;

  // Leaving the mobile layout with the drawer open: its trigger is gone, so
  // move focus to the desktop header toggle.
  const drawerWasOpen = useRef(false);
  useEffect(() => {
    if (!isMobile && drawerWasOpen.current) headerToggle.current?.focus();
  }, [isMobile]);
  useEffect(() => {
    drawerWasOpen.current = drawerOpen;
  });

  const collapsed =
    !isMobile &&
    mode !== "expanded" &&
    !(mode === "floating" && (hovered || keyboardFocus));
  const compactMode = mode !== "expanded";
  const state: AppShellNavigationState = {
    collapsed,
    isMobile,
    closeNavigation: () => setMobileOpen(false),
    expandNavigation: () => setMode("expanded"),
  };

  const collapseControl = (inHeader: boolean) => (
    <IconButton
      ref={inHeader ? headerToggle : undefined}
      size="small"
      shape="square"
      className={cn(styles.control, "ui-icon-button")}
      ariaLabel={compactMode ? labels.expand : labels.collapse}
      aria-controls={sidebarId}
      aria-expanded={!collapsed}
      onClick={() => setMode(compactMode ? "expanded" : "compact")}
      icon={
        compactMode ? (
          <LuPanelLeftOpen aria-hidden="true" />
        ) : (
          <LuPanelLeftClose aria-hidden="true" />
        )
      }
    />
  );

  return (
    <Dialog.Root open={drawerOpen} onOpenChange={setMobileOpen}>
      <div
        className={cn(styles.shell, "ui-app-shell", className)}
        data-sidebar-mode={mode}
        data-mobile={isMobile || undefined}
        data-sidebar-expanded={!collapsed || undefined}
        {...rest}
      >
        {!isMobile && (
          <aside
            id={sidebarId}
            className={cn(styles.sidebar, "ui-app-shell-sidebar")}
            aria-label={label}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={(event) => {
              if ((event.target as HTMLElement).matches(":focus-visible")) {
                setKeyboardFocus(true);
              }
            }}
            onKeyDownCapture={(event) => {
              if (event.key === "Tab") setKeyboardFocus(true);
            }}
            onPointerDownCapture={() => setKeyboardFocus(false)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setKeyboardFocus(false);
              }
            }}
          >
            <div className={cn(styles.brand, "ui-app-shell-brand")}>
              {brandIcon && (
                <span
                  className={cn(styles.brandIcon, "ui-app-shell-brand-icon")}
                  aria-hidden="true"
                >
                  {brandIcon}
                </span>
              )}
              <span
                className={cn(styles.brandLabel, "ui-app-shell-brand-label")}
              >
                {brand}
              </span>
            </div>
            <div className={cn(styles.navigation, "ui-app-shell-navigation")}>
              {navigation(state)}
            </div>
            <div
              className={cn(
                styles.sidebarActions,
                "ui-app-shell-sidebar-actions",
              )}
            >
              {collapseControl(false)}
              <IconButton
                size="small"
                shape="square"
                className={cn(styles.control, "ui-icon-button")}
                aria-pressed={mode === "floating"}
                ariaLabel={
                  mode === "floating"
                    ? labels.disableFloating
                    : labels.enableFloating
                }
                onClick={() =>
                  setMode(mode === "floating" ? "compact" : "floating")
                }
                icon={
                  mode === "floating" ? (
                    <LuPinOff aria-hidden="true" />
                  ) : (
                    <LuPin aria-hidden="true" />
                  )
                }
              />
            </div>
          </aside>
        )}
        <div className={cn(styles.workspace, "ui-app-shell-workspace")}>
          <header className={cn(styles.header, "ui-app-shell-header")}>
            {isMobile ? (
              <Dialog.Trigger asChild>
                <IconButton
                  ref={headerToggle}
                  size="small"
                  shape="square"
                  className={cn(styles.control, "ui-icon-button")}
                  ariaLabel={labels.openNavigation}
                  icon={<LuPanelLeftOpen aria-hidden="true" />}
                />
              </Dialog.Trigger>
            ) : (
              collapseControl(true)
            )}
            <div
              className={cn(
                styles.headerActions,
                "ui-app-shell-header-actions",
              )}
            >
              {headerActions}
            </div>
          </header>
          {pageNavigation}
          <main className={cn(styles.content, "ui-app-shell-content")}>
            {children}
          </main>
        </div>
      </div>
      {isMobile && (
        <Dialog.Portal>
          <Dialog.Overlay className={cn(styles.overlay, "ui-drawer-overlay")} />
          <Dialog.Content
            className={cn(
              styles.drawer,
              "ui-drawer-content",
              "ui-drawer-side-left",
              "ui-drawer-size-md",
            )}
            aria-describedby={undefined}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              headerToggle.current?.focus();
            }}
          >
            <Dialog.Title
              className={cn(styles.drawerHeader, "ui-drawer-header")}
            >
              {label}
            </Dialog.Title>
            <div
              className={cn(
                styles.drawerBody,
                "ui-drawer-body",
                "ui-app-shell-mobile-navigation",
              )}
            >
              {navigation(state)}
            </div>
            <Dialog.Close
              className={cn(styles.drawerClose, "ui-drawer-close")}
              aria-label={labels.closeNavigation}
            >
              <LuX aria-hidden="true" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
};

export default AppShell;
