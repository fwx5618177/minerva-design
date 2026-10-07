import {
  useEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import {
  LuCircleCheck,
  LuCircleX,
  LuInfo,
  LuTriangleAlert,
  LuX,
} from "react-icons/lu";
import useI18n from "../../hooks/useI18n";
import { ProgressIndicator } from "../ProgressIndicator";
import { useIsClient } from "../../internal/useIsClient";
import { toast, toastProviders, toastStore, type ToastItem } from "./store";
import type { ToastApi, ToastProviderProps } from "./types";
import styles from "./toast.module.scss";
import { usePortalContainer } from "../../internal/themeScope";

const ICONS: Record<ToastItem["color"], ReactNode> = {
  info: <LuInfo aria-hidden="true" />,
  success: <LuCircleCheck aria-hidden="true" />,
  warning: <LuTriangleAlert aria-hidden="true" />,
  danger: <LuCircleX aria-hidden="true" />,
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
const getServerToasts = () => NO_TOASTS;
const getServerOwner = () => null;
const noopSubscribe = () => () => {};

/** Returns the `toast` function (same object as the `toast` export). */
export const useToast = (): ToastApi => toast;

interface ToastViewItemProps {
  item: ToastItem;
  pauseOnHover: boolean;
  closeLabel: string;
}

const ToastViewItem = ({
  item,
  pauseOnHover,
  closeLabel,
}: ToastViewItemProps) => {
  const pause = () => {
    if (pauseOnHover) toastStore.pause(item.id);
  };
  const resume = () => {
    if (pauseOnHover) toastStore.resume(item.id);
  };
  const closing = item.state === "closing";
  return (
    <div
      className={cn(styles.toast, styles[item.color])}
      data-state={closing ? "closing" : "open"}
      data-loading={item.loading || undefined}
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
    >
      {item.icon !== null && (
        <span className={styles.icon} aria-hidden="true">
          {item.icon === undefined
            ? item.loading
              ? SPINNER
              : ICONS[item.color]
            : item.icon}
        </span>
      )}
      <div className={styles.content}>
        {item.title && <div className={styles.title}>{item.title}</div>}
        {item.description && (
          <div className={styles.description}>{item.description}</div>
        )}
      </div>
      {item.action && (
        <button
          type="button"
          className={styles.action}
          onClick={() => {
            item.action?.onClick();
            toastStore.dismiss(item.id);
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
          onClick={() => toastStore.dismiss(item.id)}
        >
          <LuX aria-hidden="true" />
        </button>
      )}
      {item.duration > 0 && !closing && (
        <span className={styles.progress} aria-hidden="true" />
      )}
    </div>
  );
};

/**
 * Renders the toasts shown with `toast()` / `useToast()`. Place it once near
 * the root of the app, around the content or on its own. When several
 * providers are mounted only the outermost / first one renders the toasts
 * (with its own position, max, labels and portal container); another one
 * takes over when it unmounts.
 */
const ToastProvider = ({
  position = "topRight",
  children,
  max = Infinity,
  pauseOnHover = true,
  ariaLabel,
  closeLabel,
}: ToastProviderProps) => {
  const { t } = useI18n();
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

  return (
    <>
      {children}
      {isClient &&
        isOwner &&
        createPortal(
          <div
            className={cn(styles.viewport, styles[position])}
            role="region"
            aria-label={ariaLabel ?? t("toast.region")}
          >
            {unique.map((item) => (
              <ToastViewItem
                key={item.id}
                item={item}
                pauseOnHover={pauseOnHover}
                closeLabel={closeLabel ?? t("toast.close")}
              />
            ))}
          </div>,
          portalContainer ?? document.body,
        )}
    </>
  );
};

export default ToastProvider;
