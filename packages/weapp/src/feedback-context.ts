import {
  createConfirmStore,
  createToastStore,
  globalConfirmStore,
  globalToastStore,
  type ConfirmOptions,
  type ToastOptions,
  type ToastId,
  type ToastMessages,
} from "./feedback-store";
import { nativeTranslate as t } from "./configuration";
type Instance = WechatMiniprogram.Component.TrivialInstance;
type Control = { template: string; definition: WechatMiniprogram.IAnyObject };
const confirmations = new WeakMap<
    object,
    ReturnType<typeof createConfirmStore>
  >(),
  toasts = new WeakMap<object, ReturnType<typeof createToastStore>>(),
  subscriptions = new WeakMap<object, () => void>();
const confirmStore = (self: Instance) =>
  confirmations.get(self) ?? globalConfirmStore;
const toastStore = (self: Instance) => toasts.get(self) ?? globalToastStore;
export function enhanceFeedback(c: {
  confirmProvider: Control;
  toastProvider: Control;
}) {
  const confirm = c.confirmProvider;
  confirm.definition.properties = {
    ...confirm.definition.properties,
    scope: { type: String, value: "global" },
  };
  confirm.definition.methods = {
    ...confirm.definition.methods,
    request(this: Instance, options: ConfirmOptions) {
      return confirmStore(this).request(options);
    },
    onConfirm(this: Instance) {
      const current = this.data.current;
      if (current && !current.loading && !current.confirmDisabled)
        confirmStore(this).settle(current.id, true);
    },
    onCancel(this: Instance) {
      const current = this.data.current;
      if (current && !current.loading)
        confirmStore(this).settle(current.id, false);
    },
  };
  confirm.definition.lifetimes = {
    attached(this: Instance) {
      const store =
        this.data.scope === "local" ? createConfirmStore() : globalConfirmStore;
      confirmations.set(this, store);
      subscriptions.set(
        this,
        store.subscribe((entries) =>
          this.setData({ current: entries[0] ?? null }),
        ),
      );
    },
    detached(this: Instance) {
      subscriptions.get(this)?.();
      subscriptions.delete(this);
      confirmStore(this).clear();
      confirmations.delete(this);
    },
  };
  confirm.definition.observers = {
    ...confirm.definition.observers,
    localeLanguage(this: Instance) {
      this.setData({
        confirmLabel: t(this, "confirm.confirm"),
        cancelLabel: t(this, "confirm.cancel"),
        deleteLabel: t(this, "confirm.delete"),
      });
    },
  };
  confirm.template = confirm.template
    .replace(
      "current.cancelLabel || 'Cancel'",
      "current.cancelLabel || cancelLabel",
    )
    .replace(
      "current.confirmLabel || (current.color === 'danger' ? 'Delete' : 'Confirm')",
      "current.confirmLabel || (current.color === 'danger' ? deleteLabel : confirmLabel)",
    );
  const toast = c.toastProvider;
  toast.definition.properties = {
    ...toast.definition.properties,
    scope: { type: String, value: "global" },
    closeLabel: { type: String, value: "" },
  };
  toast.definition.methods = {
    ...toast.definition.methods,
    show(this: Instance, options: ToastOptions) {
      return toastStore(this).api(options);
    },
    update(this: Instance, id: ToastId, options: ToastOptions) {
      toastStore(this).api.update(id, options);
    },
    dismiss(this: Instance, id?: ToastId) {
      toastStore(this).api.dismiss(id);
    },
    promise<T>(
      this: Instance,
      promise: Promise<T>,
      messages: ToastMessages<T>,
      options: ToastOptions = {},
    ) {
      return toastStore(this).api.promise(promise, messages, options);
    },
    pause(this: Instance, id: ToastId) {
      toastStore(this).pause(id);
    },
    resume(this: Instance, id: ToastId) {
      toastStore(this).resume(id);
    },
    onDismiss(this: Instance, event: WechatMiniprogram.CustomEvent) {
      toastStore(this).api.dismiss(event.currentTarget.dataset.id);
    },
    onAction(this: Instance, event: WechatMiniprogram.CustomEvent) {
      toastStore(this).action(event.currentTarget.dataset.id);
    },
    onPause(this: Instance, event: WechatMiniprogram.CustomEvent) {
      toastStore(this).pause(event.currentTarget.dataset.id);
    },
    onResume(this: Instance, event: WechatMiniprogram.CustomEvent) {
      toastStore(this).resume(event.currentTarget.dataset.id);
    },
  };
  toast.definition.observers = {
    ...toast.definition.observers,
    max(this: Instance, max: number) {
      toasts.get(this)?.setLimit(max);
    },
    "closeLabel,localeLanguage": function (this: Instance) {
      this.setData({
        closeText: this.data.closeLabel || t(this, "toast.close"),
      });
    },
  };
  toast.definition.lifetimes = {
    attached(this: Instance) {
      const store =
        this.data.scope === "local" ? createToastStore() : globalToastStore;
      toasts.set(this, store);
      store.setLimit(this.data.max);
      subscriptions.set(
        this,
        store.subscribe((entries) =>
          this.setData({
            entries: entries.map((e) => ({
              id: e.id,
              title: e.title ?? "",
              description: e.description ?? "",
              color: e.color ?? "info",
              loading: e.loading ?? false,
              closable: e.closable !== false,
              actionLabel: e.action?.label ?? "",
            })),
          }),
        ),
      );
    },
    detached(this: Instance) {
      subscriptions.get(this)?.();
      subscriptions.delete(this);
      toastStore(this).api.dismiss();
      toasts.delete(this);
    },
  };
  toast.template = toast.template
    .replace(
      'class="mn-toast mn-status-{{item.color}}"',
      'class="mn-toast mn-status-{{item.color}}" data-id="{{item.id}}" bindtouchstart="onPause" bindtouchend="onResume" bindtouchcancel="onResume"',
    )
    .replace('aria-label="{{closeLabel}}"', 'aria-label="{{closeText}}"');
}
