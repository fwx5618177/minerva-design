import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { hooks } from "../../internal/stylingHooks";
import {
  IconCircleCheck,
  IconCircleX,
  IconInfo,
  IconTriangleAlert,
  IconX,
} from "../../internal/icons";
import useI18n from "../../hooks/useI18n";
import { ProgressIndicator } from "../ProgressIndicator";
import { useIsClient } from "../../internal/useIsClient";
import {
  focusElement,
  formatHotkey,
  getAdjacentTabbable,
  getTabbables,
  matchesHotkey,
} from "@minerva/core";
import {
  createToast,
  toast,
  toastProviders,
  toastScopeOf,
  toastStore,
  type ToastItem,
} from "./store";
import type { ToastApi, ToastProviderProps } from "./types";
import styles from "./toast.module.scss";
import {
  ThemeScopeContext,
  usePortalContainer,
  useThemeScope,
  type ThemeScope,
} from "../../internal/themeScope";

const ICONS: Record<ToastItem["color"], ReactNode> = {
  info: <IconInfo aria-hidden="true" />,
  success: <IconCircleCheck aria-hidden="true" />,
  warning: <IconTriangleAlert aria-hidden="true" />,
  danger: <IconCircleX aria-hidden="true" />,
};

const SPINNER = (
  <ProgressIndicator
    variant="spinner"
    size="small"
    color="current"
    decorative
  />
);

const NO_TOASTS: ToastItem[] = [];
const DEFAULT_HOTKEY = ["F8"];

/**
 * Focus bookkeeping shared by the viewports of a provider: the element
 * focused before focus entered a toast region.
 */
interface ToastFocusTracker {
  /** Element to give focus back to once the toasts close */
  getReturnFocus: () => HTMLElement | null;
  setReturnFocus: (el: HTMLElement) => void;
  /** Registers the viewport element of a portal key (hotkey target) */
  registerViewport: (key: string, el: HTMLDivElement | null) => void;
}

/**
 * Moves focus out of the toast `el` before it closes: the close button (else
 * first button) of the next open toast, else the element focused before
 * focus entered the region, else the nearest tabbable outside the region,
 * else the region itself. Never <body>.
 */
const moveFocusFromToast = (el: HTMLElement, tracker: ToastFocusTracker) => {
  const viewport = el.parentElement;
  if (!viewport) return;
  const others = Array.from(
    viewport.querySelectorAll<HTMLElement>(
      ':scope > [data-toast-state="open"]',
    ),
  ).filter((other) => other !== el);
  const next =
    others.find(
      (other) =>
        el.compareDocumentPosition(other) & Node.DOCUMENT_POSITION_FOLLOWING,
    ) ?? others[others.length - 1];
  if (next) {
    const target =
      next.querySelector<HTMLElement>("[data-toast-close]") ??
      getTabbables(next)[0];
    if (focusElement(target)) return;
  }
  const previous = tracker.getReturnFocus();
  if (
    previous?.isConnected &&
    !viewport.contains(previous) &&
    focusElement(previous)
  ) {
    return;
  }
  if (focusElement(getAdjacentTabbable(viewport))) return;
  viewport.setAttribute("tabindex", "-1");
  focusElement(viewport, { preventScroll: true });
};
const getServerToasts = () => NO_TOASTS;
const getServerOwner = () => null;
const noopSubscribe = () => () => {};

/**
 * Returns the toast API bound to the calling component's scope: toasts shown
 * with it follow the nearest ConfigProvider (rendered into its portal host,
 * so its theme / palette / tokens apply, and labelled in its language). The
 * owning ToastProvider still renders them, with its position, max and
 * labels. Outside any nested scope it returns the `toast` export itself.
 *
 * Use it inside components; use `toast()` from code outside React (event
 * buses, API clients...), which uses the ToastProvider's (root) scope.
 */
export const useToast = (): ToastApi => {
  const scope = toastScopeOf(useThemeScope());
  return useMemo(
    () => (scope ? createToast(toastStore, scope) : toast),
    [scope],
  );
};

interface ToastViewItemProps {
  item: ToastItem;
  pauseOnHover: boolean;
  /** Explicit close label of the provider; localized in the item's scope otherwise */
  closeLabel?: string;
  tracker: ToastFocusTracker;
}

const ToastViewItem = ({
  item,
  pauseOnHover,
  closeLabel: closeLabelProp,
  tracker,
}: ToastViewItemProps) => {
  const { t } = useI18n();
  const rootRef = useRef<HTMLDivElement>(null);
  /** Dismisses the toast, first moving focus out of it when it is inside. */
  const close = () => {
    const el = rootRef.current;
    if (el?.contains(el.ownerDocument.activeElement)) {
      moveFocusFromToast(el, tracker);
    }
    toastStore.dismiss(item.id);
  };
  const closeLabel = closeLabelProp ?? t("toast.close");
  const pause = () => {
    if (pauseOnHover) toastStore.pause(item.id);
  };
  const resume = () => {
    if (pauseOnHover) toastStore.resume(item.id);
  };
  const closing = item.state === "closing";
  return (
    <div
      ref={rootRef}
      className={cn(styles.toast, styles[item.color])}
      data-toast-state={closing ? "closing" : "open"}
      data-toast-loading={item.loading || undefined}
      // A pending (loading) toast is a polite status even when danger
      role={item.color === "danger" && !item.loading ? "alert" : "status"}
      style={
        item.duration > 0
          ? ({ "--toast-duration": `${item.duration}ms` } as CSSProperties)
          : undefined
      }
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) resume();
      }}
      onKeyDown={(e) => {
        // Escape dismisses the toast holding focus (and only that one)
        if (e.key !== "Escape" || closing || e.nativeEvent.isComposing) return;
        e.preventDefault();
        e.stopPropagation();
        close();
      }}
      {...hooks("toast-region", "toast")}
    >
      {item.icon !== null && (
        <span
          className={styles.icon}
          aria-hidden="true"
          {...hooks("toast-region", "icon")}
        >
          {item.icon === undefined
            ? item.loading
              ? SPINNER
              : ICONS[item.color]
            : item.icon}
        </span>
      )}
      <div className={styles.content}>
        {item.title && (
          <div className={styles.title} {...hooks("toast-region", "title")}>
            {item.title}
          </div>
        )}
        {item.description && (
          <div
            className={styles.description}
            {...hooks("toast-region", "description")}
          >
            {item.description}
          </div>
        )}
      </div>
      {item.action && (
        <button
          type="button"
          className={styles.action}
          {...hooks("toast-region", "action")}
          onClick={() => {
            item.action?.onClick();
            close();
          }}
        >
          {item.action.label}
        </button>
      )}
      {item.closable && (
        <button
          type="button"
          className={styles.close}
          aria-label={closeLabel}
          data-toast-close=""
          onClick={close}
          {...hooks("toast-region", "close-button")}
        >
          <IconX aria-hidden="true" />
        </button>
      )}
      {item.duration > 0 && !closing && (
        <span
          className={styles.progress}
          aria-hidden="true"
          {...hooks("toast-region", "progress")}
        />
      )}
    </div>
  );
};

/** Wraps `node` in the theme scope of the toast caller, when it has one. */
const withScope = (
  scope: ThemeScope | undefined,
  node: ReactNode,
  key?: string | number,
) =>
  scope ? (
    <ThemeScopeContext.Provider key={key} value={scope}>
      {node}
    </ThemeScopeContext.Provider>
  ) : (
    node
  );

interface ToastViewportProps {
  items: ToastItem[];
  position: NonNullable<ToastProviderProps["position"]>;
  pauseOnHover: boolean;
  "aria-label"?: string;
  closeLabel?: string;
  /** Formatted hotkey, appended to the default region label */
  hotkeyLabel: string;
  tracker: ToastFocusTracker;
  /** Portal key of the viewport */
  viewportKey: string;
}

const ToastViewport = ({
  items,
  position,
  pauseOnHover,
  "aria-label": ariaLabel,
  closeLabel,
  hotkeyLabel,
  tracker,
  viewportKey,
}: ToastViewportProps) => {
  const { t } = useI18n();
  return (
    <div
      ref={(el) => {
        tracker.registerViewport(viewportKey, el);
        return () => tracker.registerViewport(viewportKey, null);
      }}
      className={cn(styles.viewport, styles[position])}
      {...hooks("toast-region", "root")}
      role="region"
      aria-label={
        ariaLabel ??
        (hotkeyLabel
          ? t("toast.regionWithHotkey", { hotkey: hotkeyLabel })
          : t("toast.region"))
      }
      onFocus={(e) => {
        // Remember where focus came from to give it back once the toasts
        // it moved through close
        const from = e.relatedTarget as HTMLElement | null;
        if (from && !e.currentTarget.contains(from)) {
          tracker.setReturnFocus(from);
        }
      }}
      onBlur={(e) => {
        // The region is only programmatically focusable while focus is in it
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          e.currentTarget.removeAttribute("tabindex");
        }
      }}
    >
      {items.map((item) =>
        withScope(
          item.scope,
          <ToastViewItem
            key={item.id}
            item={item}
            pauseOnHover={pauseOnHover}
            closeLabel={closeLabel}
            tracker={tracker}
          />,
          item.id,
        ),
      )}
    </div>
  );
};

/** Stable portal keys of the scoped containers */
const containerKeys = new WeakMap<HTMLElement, number>();
let containerKeyCounter = 0;
const containerKey = (container: HTMLElement): string => {
  let key = containerKeys.get(container);
  if (key === undefined) {
    key = ++containerKeyCounter;
    containerKeys.set(container, key);
  }
  return `scope-${key}`;
};

/**
 * Renders the toasts shown with `toast()` / `useToast()`. Place it once near
 * the root of the app, around the content or on its own. When several
 * providers are mounted only the outermost / first one renders the toasts
 * (with its own position, max, labels and portal container); another one
 * takes over when it unmounts.
 *
 * Toasts shown with `useToast()` inside a nested ConfigProvider are grouped
 * per scope: each scope gets its own viewport in its portal host (same
 * position, max and labels), so the scoped theme and language apply.
 */
const ToastProvider = ({
  position = "top-right",
  children,
  max = Infinity,
  pauseOnHover = true,
  "aria-label": ariaLabel,
  closeLabel,
  hotkey = DEFAULT_HOTKEY,
}: ToastProviderProps) => {
  const [order] = useState(toastProviders.nextOrder);
  useEffect(() => toastProviders.register(order), [order]);
  const isOwner =
    useSyncExternalStore(
      toastProviders.subscribe,
      toastProviders.getOwner,
      getServerOwner,
    ) === order;
  // Non-owners do not subscribe to the toasts at all
  const items = useSyncExternalStore(
    isOwner ? toastStore.subscribe : noopSubscribe,
    isOwner ? toastStore.getSnapshot : getServerToasts,
    getServerToasts,
  );
  // SSR / hydration render nothing (the portal needs document.body)
  const isClient = useIsClient();
  const portalContainer = usePortalContainer();
  /** Viewport elements in render order (own one first) */
  const viewportsRef = useRef(new Map<string, HTMLDivElement>());
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const tracker = useMemo<ToastFocusTracker>(
    () => ({
      getReturnFocus: () => returnFocusRef.current,
      setReturnFocus: (el) => {
        returnFocusRef.current = el;
      },
      registerViewport: (key, el) => {
        if (el) viewportsRef.current.set(key, el);
        else viewportsRef.current.delete(key);
      },
    }),
    [],
  );
  const hotkeyLabel = formatHotkey(hotkey);
  const hotkeyKey = hotkey.join("\u0000");

  // The hotkey moves focus to the first region holding toasts
  useEffect(() => {
    if (!isOwner || !hotkeyKey) return;
    const keys = hotkeyKey.split("\u0000");
    const onKeyDown = (event: KeyboardEvent) => {
      if (!matchesHotkey(event, keys)) return;
      // The provider's own viewport first, then the scoped ones
      const viewports = viewportsRef.current;
      const own = viewports.get("own");
      const viewport = [
        ...(own ? [own] : []),
        ...[...viewports.values()].filter((el) => el !== own),
      ].find(
        (el) => el.isConnected && el.querySelector('[data-toast-state="open"]'),
      );
      if (!viewport) return;
      event.preventDefault();
      const doc = viewport.ownerDocument;
      const active = doc.activeElement as HTMLElement | null;
      if (active && active !== doc.body && !viewport.contains(active)) {
        tracker.setReturnFocus(active);
      }
      viewport.setAttribute("tabindex", "-1");
      focusElement(viewport);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOwner, hotkeyKey, tracker]);

  // Defensive render-time de-duplication (the latest toast of an id wins) so
  // React keys never collide.
  const seen = new Set<ToastItem["id"]>();
  const unique: ToastItem[] = [];
  for (let i = items.length - 1; i >= 0; i -= 1) {
    if (seen.has(items[i].id)) continue;
    seen.add(items[i].id);
    unique.unshift(items[i]);
  }

  // Over `max`: the oldest open toasts close (and animate out), so their
  // onClose runs as with any other dismissal.
  const open = unique.filter((item) => item.state === "open");
  const overflowCount = Math.max(0, open.length - max);
  const overflowKey = open
    .slice(0, overflowCount)
    .map((item) => String(item.id))
    .join("\u0000");
  useEffect(() => {
    if (!isOwner || !overflowKey) return;
    const current = toastStore
      .getSnapshot()
      .filter((item) => item.state === "open");
    for (const item of current.slice(0, Math.max(0, current.length - max))) {
      toastStore.dismiss(item.id);
    }
  }, [isOwner, overflowKey, max]);

  const renderViewports = () => {
    const ownContainer = portalContainer ?? document.body;
    // One viewport per portal container; the provider's own one always
    // exists (the region stays mounted for screen readers).
    const groups = new Map<
      HTMLElement,
      { scope: ThemeScope | undefined; items: ToastItem[] }
    >([[ownContainer, { scope: undefined, items: [] }]]);
    for (const item of unique) {
      const scoped = item.scope?.portalContainer;
      // A scope that went away (provider unmounted) falls back to ours
      const container = scoped?.isConnected ? scoped : ownContainer;
      let group = groups.get(container);
      if (!group) {
        group = { scope: item.scope, items: [] };
        groups.set(container, group);
      }
      group.items.push(item);
    }
    return [...groups].map(([container, group]) => {
      const key = container === ownContainer ? "own" : containerKey(container);
      return createPortal(
        withScope(
          group.scope,
          <ToastViewport
            items={group.items}
            position={position}
            pauseOnHover={pauseOnHover}
            aria-label={ariaLabel}
            closeLabel={closeLabel}
            hotkeyLabel={hotkeyLabel}
            tracker={tracker}
            viewportKey={key}
          />,
        ),
        container,
        key,
      );
    });
  };

  return (
    <>
      {children}
      {isClient && isOwner && renderViewports()}
    </>
  );
};

export default ToastProvider;
