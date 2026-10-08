import type { Ref } from "vue";
import type { ThemeScope } from "../../internal/scope";
import type { ConfirmFunction, ConfirmOptions } from "./types";

export interface ConfirmRequest {
  id: number;
  options: ConfirmOptions;
  resolve: (value: boolean) => void;
  /**
   * Theme scope of the caller (`useConfirm()` inside a nested
   * ConfigProvider): the dialog teleports into its host and uses its
   * language. `undefined` = the scope the queue is rendered in.
   */
  scope?: Ref<ThemeScope>;
}

/**
 * FIFO request queue (external store). The provider and the standalone host
 * each own one and render it with the same `ConfirmQueueView`, so both paths
 * behave and look the same. No DOM access: SSR-safe.
 */
export class ConfirmQueue {
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
    scope?: Ref<ThemeScope>,
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
