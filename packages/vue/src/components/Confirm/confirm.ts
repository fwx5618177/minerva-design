import { createApp, inject, type InjectionKey, type Ref } from "vue";
import { useThemeScope, type ThemeScope } from "../../internal/scope";
import { ConfirmQueue } from "./queue";
import { ConfirmQueueView } from "./ConfirmQueueView";
import type { ConfirmFunction, ConfirmOptions } from "./types";

/** Queue of the closest `ConfirmProvider` */
export const CONFIRM_KEY: InjectionKey<ConfirmQueue> =
  Symbol("minerva-confirm");

/** Mounted providers' queues; the most recently mounted one wins. */
export const providerStack: ConfirmQueue[] = [];

/** Host used when no provider is mounted: mounted lazily, then reused. */
let standalone: { queue: ConfirmQueue; container: HTMLElement } | null = null;

const standaloneRequest = (
  options: ConfirmOptions,
  scope?: Ref<ThemeScope>,
): Promise<boolean> => {
  if (!standalone) {
    const container = document.createElement("div");
    container.setAttribute("data-confirm-host", "");
    const queue = new ConfirmQueue();
    createApp(ConfirmQueueView, { queue }).mount(container);
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
  scope?: Ref<ThemeScope>,
): Promise<boolean> => {
  const provider = providerStack[providerStack.length - 1];
  if (provider) return provider.enqueue(options, scope);
  if (typeof document === "undefined") return Promise.resolve(false);
  return standaloneRequest(options, scope);
};

/**
 * Imperative confirmation, usable anywhere:
 * - with a mounted `ConfirmProvider` the most recent provider renders it
 * - otherwise a standalone host (its own Vue app) is mounted lazily on
 *   `document.body`
 * - on the server (no `document`) it resolves `false`, like a cancel
 *
 * Meant for code outside components (stores, API clients...): the dialog
 * uses the root theme and language (or the provider's). Inside components,
 * prefer `useConfirm()`, which follows the nearest ConfigProvider scope.
 */
export const confirm: ConfirmFunction = (options) => requestConfirm(options);

/**
 * Keeps a scope only when it changes something: a scoped portal container or
 * a scoped language (read when confirming: the scoped host mounts later).
 */
const callerScopeOf = (
  scope: Ref<ThemeScope> | null,
): Ref<ThemeScope> | undefined =>
  scope && (scope.value.portalContainer || scope.value.language)
    ? scope
    : undefined;

/**
 * Returns a confirm function bound to the calling component's scope: its
 * dialogs are rendered by the nearest `ConfirmProvider` (or, outside of one,
 * like `confirm()`), but inside the nearest ConfigProvider scope, so the
 * modal teleports into the scoped host (theme, palette, tokens) and its
 * labels use the scoped language. Outside any ConfigProvider it returns the
 * provider's confirm, or the global `confirm` itself.
 */
export function useConfirm(): ConfirmFunction {
  const queue = inject(CONFIRM_KEY, null);
  const scope = useThemeScope();
  if (!scope) return queue ? queue.request : confirm;
  return (options) => {
    const callerScope = callerScopeOf(scope);
    return queue
      ? queue.enqueue(options, callerScope)
      : requestConfirm(options, callerScope);
  };
}
