import {
  Component,
  ChangeDetectionStrategy,
  DestroyRef,
  Injectable,
  computed,
  inject,
  signal,
} from "@angular/core";
import { MnConfirmDialog } from "./index";

export interface ConfirmOptions {
  title: string;
  description?: string;
  color?: "primary" | "warning" | "danger";
  confirmLabel?: string;
  cancelLabel?: string;
  confirmDisabled?: boolean;
  /** An asynchronous action keeps the dialog open and disables dismissal.
   * Rejections are shown in the dialog; the user may retry or cancel. */
  onConfirm?: () => void | Promise<void>;
}
interface ConfirmRequest {
  options: ConfirmOptions;
  resolve: (confirmed: boolean) => void;
}

/** Inject inside MnConfirmProvider to enqueue scoped, promise-based confirmations. */
@Injectable()
export class MnConfirmService {
  private readonly requests = signal<readonly ConfirmRequest[]>([]);
  readonly current = computed(() => this.requests()[0]?.options);
  readonly loading = signal(false);
  readonly error = signal("");
  private destroyed = false;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      for (const request of this.requests()) request.resolve(false);
      this.requests.set([]);
    });
  }
  /** Resolves true after confirmation, false on cancellation or provider disposal. */
  confirm(options: ConfirmOptions): Promise<boolean> {
    if (this.destroyed) return Promise.resolve(false);
    return new Promise((resolve) =>
      this.requests.update((requests) => [...requests, { options, resolve }]),
    );
  }
  async accept(): Promise<void> {
    const request = this.requests()[0];
    if (!request || this.loading() || request.options.confirmDisabled) return;
    this.loading.set(true);
    this.error.set("");
    try {
      await request.options.onConfirm?.();
      if (this.requests()[0] === request) this.finish(true);
    } catch (error) {
      if (!this.destroyed && this.requests()[0] === request)
        this.error.set(error instanceof Error ? error.message : String(error));
    } finally {
      if (!this.destroyed) this.loading.set(false);
    }
  }
  cancel(): void {
    if (!this.loading()) this.finish(false);
  }
  private finish(confirmed: boolean): void {
    const request = this.requests()[0];
    if (!request) return;
    this.requests.update((requests) => requests.slice(1));
    this.error.set("");
    request.resolve(confirmed);
  }
}
/** Renders queued confirmations in the current Minerva theme/locale scope.
 * A nested provider creates an independent queue. Inject MnConfirmService in
 * descendants, or call confirm() through #confirmation="mnConfirmProvider". */
@Component({
  selector: "mn-confirm-provider",
  exportAs: "mnConfirmProvider",
  imports: [MnConfirmDialog],
  providers: [MnConfirmService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: "display: contents" },
  template: `<ng-content />
    @if (service.current(); as request) {
      <mn-confirm-dialog
        [open]="true"
        [title]="request.title"
        [description]="request.description ?? ''"
        [color]="request.color ?? 'primary'"
        [confirmLabel]="request.confirmLabel ?? 'Confirm'"
        [cancelLabel]="request.cancelLabel ?? 'Cancel'"
        [confirmDisabled]="request.confirmDisabled ?? false"
        [loading]="service.loading()"
        (confirm)="service.accept()"
        (openChange)="service.cancel()"
        (escapeKeyDown)="preventWhileLoading($event)"
        (pointerDownOutside)="preventWhileLoading($event)"
      >
        @if (service.error()) {
          <p role="alert">{{ service.error() }}</p>
        }
      </mn-confirm-dialog>
    }`,
})
export class MnConfirmProvider {
  protected readonly service = inject(MnConfirmService);
  confirm(options: ConfirmOptions): Promise<boolean> {
    return this.service.confirm(options);
  }
  protected preventWhileLoading(event: Event) {
    if (this.service.loading()) event.preventDefault();
  }
}
