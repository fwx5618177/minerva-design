import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { createRoot } from "react-dom/client";
import Button from "../Button/Button";
import { Modal, ModalBody, ModalFooter } from "../Modal/Modal";
import useI18n from "../../hooks/useI18n";
import type {
  ConfirmDialogProps,
  ConfirmFunction,
  ConfirmIntent,
  ConfirmOptions,
  ConfirmProviderProps,
} from "./types";

const BUTTON_VARIANT: Record<ConfirmIntent, "primary" | "error" | "warning"> = {
  primary: "primary",
  danger: "error",
  warning: "warning",
};

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
  intent = "primary",
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
    >
      <ModalBody />
      <ModalFooter>
        <Button
          type="button"
          variant="secondary"
          onClick={() => onOpenChange(false)}
          disabled={loading}
        >
          {cancelLabel ?? t("confirm.cancel")}
        </Button>
        <Button
          type="button"
          variant={BUTTON_VARIANT[intent]}
          onClick={() => void onConfirm()}
          loading={loading}
          disabled={confirmDisabled}
          data-intent={intent}
        >
          {confirmLabel ??
            (intent === "danger" ? t("confirm.delete") : t("confirm.confirm"))}
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
}

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

  readonly request: ConfirmFunction = (options) =>
    new Promise<boolean>((resolve) => {
      this.requests = [
        ...this.requests,
        { id: ++this.nextId, options, resolve },
      ];
      this.emit();
    });

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
  return (
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
};

const ConfirmContext = createContext<ConfirmFunction | null>(null);

/** Mounted providers; the most recently mounted one wins. */
const providerStack: ConfirmFunction[] = [];

/** Host used when no provider is mounted: mounted lazily, then reused. */
let standalone: { queue: ConfirmQueue; container: HTMLElement } | null = null;

const standaloneRequest: ConfirmFunction = (options) => {
  if (!standalone) {
    const container = document.createElement("div");
    container.setAttribute("data-ui-confirm-host", "");
    const queue = new ConfirmQueue();
    createRoot(container).render(<ConfirmQueueView queue={queue} />);
    standalone = { queue, container };
  }
  // Re-attach when the host app replaced the body (test cleanup, micro-frontends).
  if (!standalone.container.isConnected) {
    document.body.append(standalone.container);
  }
  return standalone.queue.request(options);
};

/**
 * Imperative confirmation, usable anywhere:
 * - with a mounted `ConfirmProvider` the most recent provider renders it
 * - otherwise a standalone host is mounted lazily on `document.body`
 * - on the server (no `document`) it resolves `false`, like a cancel
 */
export const confirm: ConfirmFunction = (options) => {
  const provider = providerStack[providerStack.length - 1];
  if (provider) return provider(options);
  if (typeof document === "undefined") return Promise.resolve(false);
  return standaloneRequest(options);
};

/**
 * Returns the confirm function of the nearest `ConfirmProvider`, or the
 * global `confirm` outside of one.
 */
export const useConfirm = (): ConfirmFunction =>
  useContext(ConfirmContext) ?? confirm;

/**
 * ConfirmProvider: renders confirmations inside the application tree (shared
 * context, StrictMode, test `act` boundaries). Optional: `confirm()` works
 * without it.
 */
export const ConfirmProvider = ({ children }: ConfirmProviderProps) => {
  const [queue] = useState(() => new ConfirmQueue());

  useEffect(() => {
    const request = queue.request;
    providerStack.push(request);
    return () => {
      const index = providerStack.lastIndexOf(request);
      if (index >= 0) providerStack.splice(index, 1);
      queue.cancelAll();
    };
  }, [queue]);

  return (
    <ConfirmContext.Provider value={queue.request}>
      {children}
      <ConfirmQueueView queue={queue} />
    </ConfirmContext.Provider>
  );
};

export default ConfirmDialog;
