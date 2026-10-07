import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { createRoot } from "react-dom/client";
import Button from "../Button/Button";
import { Modal, ModalBody, ModalFooter } from "../Modal/Modal";
import useI18n from "../../hooks/useI18n";
import {
  ThemeScopeContext,
  useThemeScope,
  type ThemeScope,
} from "../../internal/themeScope";
import type {
  ConfirmDialogProps,
  ConfirmFunction,
  ConfirmOptions,
  ConfirmProviderProps,
} from "./types";

/**
 * ConfirmDialog: a small modal asking the user to confirm an action, a
 * themed replacement for the native `window.confirm`.
 */
export const ConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmLabel,
  cancelLabel,
  closeLabel,
  color = "primary",
  loading = false,
  confirmDisabled = false,
}: ConfirmDialogProps) => {
  const { t } = useI18n();
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size="small"
      closeLabel={closeLabel}
      // A confirmation interrupts the user and needs a response; Radix links
      // the title (aria-labelledby) and description (aria-describedby).
      role="alertdialog"
    >
      <ModalBody />
      <ModalFooter>
        <Button
          type="button"
          color="neutral"
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={loading}
        >
          {cancelLabel ?? t("confirm.cancel")}
        </Button>
        <Button
          type="button"
          color={color}
          variant="solid"
          onClick={() => void onConfirm()}
          loading={loading}
          disabled={confirmDisabled}
        >
          {confirmLabel ??
            (color === "danger" ? t("confirm.delete") : t("confirm.confirm"))}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

// ---- Imperative API ----

interface ConfirmRequest {
  id: number;
  options: ConfirmOptions;
  resolve: (value: boolean) => void;
  /**
   * Theme scope of the caller (`useConfirm()` inside a nested
   * ConfigProvider): the dialog portals into its host and uses its language.
   * `undefined` = the scope the queue is rendered in.
   */
  scope?: ThemeScope;
}

/**
 * Keeps a scope only when it changes something: a scoped portal container or
 * a scoped language.
 */
const callerScopeOf = (
  scope: ThemeScope | null | undefined,
): ThemeScope | undefined =>
  scope && (scope.portalContainer || scope.language) ? scope : undefined;

/**
 * FIFO request queue (external store). The provider and the standalone host
 * each own one and render it with the same <ConfirmQueueView>, so both paths
 * behave and look the same.
 */
class ConfirmQueue {
  private requests: readonly ConfirmRequest[] = [];
  private listeners = new Set<() => void>();
  private nextId = 0;

  readonly subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  readonly getSnapshot = (): readonly ConfirmRequest[] => this.requests;

  /** Queues a confirmation rendered in `scope` (see `ConfirmRequest.scope`). */
  readonly enqueue = (
    options: ConfirmOptions,
    scope?: ThemeScope,
  ): Promise<boolean> =>
    new Promise<boolean>((resolve) => {
      this.requests = [
        ...this.requests,
        { id: ++this.nextId, options, resolve, scope },
      ];
      this.emit();
    });

  readonly request: ConfirmFunction = (options) => this.enqueue(options);

  /** Settles the head request; ignores stale ids so each promise resolves once. */
  settle(id: number, value: boolean): void {
    const [top, ...rest] = this.requests;
    if (top?.id !== id) return;
    this.requests = rest;
    top.resolve(value);
    this.emit();
  }

  /** Resolves every pending request as cancelled (host unmounted). */
  cancelAll(): void {
    const pending = this.requests;
    if (pending.length === 0) return;
    this.requests = [];
    for (const request of pending) request.resolve(false);
    this.emit();
  }

  private emit(): void {
    for (const listener of this.listeners) listener();
  }
}

const NO_REQUESTS: readonly ConfirmRequest[] = [];
const getServerRequests = () => NO_REQUESTS;

const ConfirmQueueView = ({ queue }: { queue: ConfirmQueue }) => {
  const requests = useSyncExternalStore(
    queue.subscribe,
    queue.getSnapshot,
    getServerRequests,
  );
  const top = requests[0];
  if (!top) return null;
  const dialog = (
    <ConfirmDialog
      // One instance per request: consecutive confirmations never share state.
      key={top.id}
      {...top.options}
      open
      onOpenChange={(open) => {
        if (!open) queue.settle(top.id, false);
      }}
      onConfirm={() => queue.settle(top.id, true)}
    />
  );
  // The Modal portals into the caller's scoped host and the labels use its
  // language.
  return top.scope ? (
    <ThemeScopeContext.Provider key={top.id} value={top.scope}>
      {dialog}
    </ThemeScopeContext.Provider>
  ) : (
    dialog
  );
};

const ConfirmContext = createContext<ConfirmQueue | null>(null);

/** Mounted providers' queues; the most recently mounted one wins. */
const providerStack: ConfirmQueue[] = [];

/** Host used when no provider is mounted: mounted lazily, then reused. */
let standalone: { queue: ConfirmQueue; container: HTMLElement } | null = null;

const standaloneRequest = (
  options: ConfirmOptions,
  scope?: ThemeScope,
): Promise<boolean> => {
  if (!standalone) {
    const container = document.createElement("div");
    container.setAttribute("data-confirm-host", "");
    const queue = new ConfirmQueue();
    createRoot(container).render(<ConfirmQueueView queue={queue} />);
    standalone = { queue, container };
  }
  // Re-attach when the host app replaced the body (test cleanup, micro-frontends).
  if (!standalone.container.isConnected) {
    document.body.append(standalone.container);
  }
  return standalone.queue.enqueue(options, scope);
};

/** Routes a confirmation to the latest provider or the standalone host. */
const requestConfirm = (
  options: ConfirmOptions,
  scope?: ThemeScope,
): Promise<boolean> => {
  const provider = providerStack[providerStack.length - 1];
  if (provider) return provider.enqueue(options, scope);
  if (typeof document === "undefined") return Promise.resolve(false);
  return standaloneRequest(options, scope);
};

/**
 * Imperative confirmation, usable anywhere:
 * - with a mounted `ConfirmProvider` the most recent provider renders it
 * - otherwise a standalone host is mounted lazily on `document.body`
 * - on the server (no `document`) it resolves `false`, like a cancel
 *
 * Meant for code outside React components (event buses, API clients,
 * non-component modules): the dialog uses the root theme and language (or
 * the provider's). Inside components, prefer `useConfirm()`, which follows
 * the nearest ConfigProvider scope.
 */
export const confirm: ConfirmFunction = (options) => requestConfirm(options);

/**
 * Returns a confirm function bound to the calling component's scope: its
 * dialogs are rendered by the nearest `ConfirmProvider` (or, outside of one,
 * like `confirm()`), but inside the nearest ConfigProvider scope, so the
 * modal portals into the scoped host (theme, palette, tokens) and its labels
 * use the scoped language. Outside any nested scope it returns the
 * provider's confirm, or the global `confirm` itself.
 */
export const useConfirm = (): ConfirmFunction => {
  const queue = useContext(ConfirmContext);
  const scope = callerScopeOf(useThemeScope());
  return useMemo<ConfirmFunction>(() => {
    if (queue) {
      return scope ? (options) => queue.enqueue(options, scope) : queue.request;
    }
    return scope ? (options) => requestConfirm(options, scope) : confirm;
  }, [queue, scope]);
};

/**
 * ConfirmProvider: renders confirmations inside the application tree (shared
 * context, StrictMode, test `act` boundaries). Optional: `confirm()` works
 * without it.
 */
export const ConfirmProvider = ({ children }: ConfirmProviderProps) => {
  const [queue] = useState(() => new ConfirmQueue());

  useEffect(() => {
    providerStack.push(queue);
    return () => {
      const index = providerStack.lastIndexOf(queue);
      if (index >= 0) providerStack.splice(index, 1);
      queue.cancelAll();
    };
  }, [queue]);

  return (
    <ConfirmContext.Provider value={queue}>
      {children}
      <ConfirmQueueView queue={queue} />
    </ConfirmContext.Provider>
  );
};

export default ConfirmDialog;
