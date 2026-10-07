import {
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import {
  LuCircleCheck,
  LuCircleX,
  LuInfo,
  LuTriangleAlert,
  LuX,
} from "react-icons/lu";
import useI18n from "../../hooks/useI18n";
import { useIsClient } from "../../internal/useIsClient";
import { toast, toastStore, type ToastItem } from "./store";
import type { ToastApi, ToastProviderProps, ToastStatus } from "./types";
import styles from "./toast.module.scss";

const ICONS: Record<ToastStatus, ReactNode> = {
  info: <LuInfo aria-hidden="true" />,
  success: <LuCircleCheck aria-hidden="true" />,
  warning: <LuTriangleAlert aria-hidden="true" />,
  danger: <LuCircleX aria-hidden="true" />,
};

const NO_TOASTS: ToastItem[] = [];
const getServerToasts = () => NO_TOASTS;

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
      className={classNames(styles.toast, styles[item.status])}
      data-state={closing ? "closing" : "open"}
      role={item.status === "danger" ? "alert" : "status"}
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
      <span className={styles.icon}>{ICONS[item.status]}</span>
      <div className={styles.content}>
        {item.title && <div className={styles.title}>{item.title}</div>}
        {item.description && (
          <div className={styles.description}>{item.description}</div>
        )}
      </div>
      <button
        type="button"
        className={styles.close}
        aria-label={closeLabel}
        onClick={() => toastStore.dismiss(item.id)}
      >
        <LuX aria-hidden="true" />
      </button>
      {item.duration > 0 && !closing && (
        <span className={styles.progress} aria-hidden="true" />
      )}
    </div>
  );
};

/**
 * Renders the toasts shown with `toast()` / `useToast()`. Place it once near
 * the root of the app, around the content or on its own.
 */
const ToastProvider = ({
  position = "topRight",
  children,
  pauseOnHover = true,
  ariaLabel,
  closeLabel,
}: ToastProviderProps) => {
  const { t } = useI18n();
  const items = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    getServerToasts,
  );
  // SSR / hydration render nothing (the portal needs document.body)
  const isClient = useIsClient();

  // Defensive render-time de-duplication (the latest toast of an id wins) so
  // React keys never collide.
  const seen = new Set<ToastItem["id"]>();
  const unique: ToastItem[] = [];
  for (let i = items.length - 1; i >= 0; i -= 1) {
    if (seen.has(items[i].id)) continue;
    seen.add(items[i].id);
    unique.unshift(items[i]);
  }

  return (
    <>
      {children}
      {isClient &&
        createPortal(
          <div
            className={classNames(styles.viewport, styles[position])}
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
          document.body,
        )}
    </>
  );
};

export default ToastProvider;
