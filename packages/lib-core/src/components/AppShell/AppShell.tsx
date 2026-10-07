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
import { usePortalContainer } from "../../internal/themeScope";

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
  const portalContainer = usePortalContainer();
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
      className={styles.control}
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
        className={cn(styles.shell, className)}
        data-sidebar-mode={mode}
        data-sidebar-expanded={!collapsed || undefined}
        {...rest}
      >
        {!isMobile && (
          <aside
            id={sidebarId}
            className={styles.sidebar}
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
            <div className={styles.brand}>
              {brandIcon && (
                <span className={styles.brandIcon} aria-hidden="true">
                  {brandIcon}
                </span>
              )}
              <span className={styles.brandLabel}>{brand}</span>
            </div>
            <div className={styles.navigation}>{navigation(state)}</div>
            <div className={styles.sidebarActions}>
              {collapseControl(false)}
              <IconButton
                size="small"
                shape="square"
                className={styles.control}
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
        <div className={styles.workspace}>
          <header className={styles.header}>
            {isMobile ? (
              <Dialog.Trigger asChild>
                <IconButton
                  ref={headerToggle}
                  size="small"
                  shape="square"
                  className={styles.control}
                  ariaLabel={labels.openNavigation}
                  icon={<LuPanelLeftOpen aria-hidden="true" />}
                />
              </Dialog.Trigger>
            ) : (
              collapseControl(true)
            )}
            <div className={styles.headerActions}>{headerActions}</div>
          </header>
          {pageNavigation}
          <main className={styles.content}>{children}</main>
        </div>
      </div>
      {isMobile && (
        <Dialog.Portal container={portalContainer}>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content
            className={styles.drawer}
            aria-describedby={undefined}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              headerToggle.current?.focus();
            }}
          >
            <Dialog.Title className={styles.drawerHeader}>{label}</Dialog.Title>
            <div className={styles.drawerBody}>{navigation(state)}</div>
            <Dialog.Close
              className={styles.drawerClose}
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
