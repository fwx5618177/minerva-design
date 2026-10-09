import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  afterRenderEffect,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  numberAttribute,
  output,
  signal,
  untracked,
  viewChild,
  viewChildren,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { cn, matchesAccept } from "@minerva/core";
import { MnButton } from "../button/button";
import {
  MnFormValueControl,
  fieldWiring,
  injectFormField,
  provideValueAccessor,
} from "../../internal/forms";
import { MnHook } from "../../internal/hooks";
import { MnIcon } from "../../internal/icon";
import { MnIconButtonPart } from "../../internal/icon-button-part";
import { injectId } from "../../internal/ids";
import { alertStyles as a, uploadStyles as s } from "../../internal/styles";
import { injectScope } from "../../config/scope";

/** Transfer state of an uploaded file */
export type UploadItemStatus = "uploading" | "done" | "error";

/** A file shown in the Upload list */
export interface UploadItem {
  /** Stable identifier of the file */
  id: string;
  /** File name shown in the list */
  name: string;
  /** Transfer state of the file */
  status: UploadItemStatus;
  /** Error message shown when status is "error" */
  error?: string;
  /** Image preview URL (e.g. an object URL) */
  previewUrl?: string;
  /** The selected file (set on the items the Upload lists itself) */
  file?: File;
}

/** Texts of Upload; every omitted entry uses the localized default */
export interface UploadLabels {
  /**
   * Text of the select button
   * @default "Select files" (localized)
   */
  select?: string;
  /**
   * Status text of an uploading file
   * @default "Uploading" (localized)
   */
  uploading?: string;
  /**
   * Status text of an uploaded file
   * @default "Uploaded" (localized)
   */
  done?: string;
  /**
   * Status text of a failed file without its own error message
   * @default "Upload failed" (localized)
   */
  failed?: string;
  /**
   * Error shown when too many files are selected
   * @default (max) => `You can select up to ${max} files` (localized)
   */
  tooMany?: (max: number) => string;
  /**
   * Error shown when a file does not match accept
   * @default (name) => `${name}: unsupported file type` (localized)
   */
  invalidType?: (name: string) => string;
  /**
   * Error shown when a file exceeds maxSize
   * @default (name) => `${name}: file exceeds the size limit` (localized)
   */
  tooLarge?: (name: string) => string;
  /**
   * Accessible label of the retry button of a file
   * @default (name) => `Retry ${name}` (localized)
   */
  retry?: (name: string) => string;
  /**
   * Accessible label of the remove button of a file
   * @default (name) => `Remove ${name}` (localized)
   */
  remove?: (name: string) => string;
}

const optionalNumber = (value: unknown): number | undefined =>
  value === undefined || value === null || value === ""
    ? undefined
    : numberAttribute(value);

/**
 * Upload: file selection (select button or drag and drop) with validation
 * (`accept`, `maxSize`, `maxCount`) and a list of files with their transfer
 * state. Same DOM, classes and styling hooks as React's Upload (the host is
 * the `role="group"` root).
 *
 * The list is the `value` model (`[(value)]`, `ngModel` or a Reactive Forms
 * control): valid selections are appended (status "done", with their
 * `file`; replacing the listed file in single `replace` mode) and reported
 * by `filesSelected` (after the model changed: update the items to show
 * transfer progress / errors / persisted URLs). With `removable`, each item
 * has a remove button (removes it and emits `remove`); with `retryable`,
 * failed items have a retry button (`retry`).
 *
 * @example
 * <mn-upload label="Attachments" multiple removable [(value)]="files"
 *   (filesSelected)="upload($event)" />
 */
@Component({
  selector: "mn-upload",
  exportAs: "mnUpload",
  imports: [MnHook, MnIcon, MnButton, MnIconButtonPart],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(() => MnUpload)],
  host: {
    "[class]": "s.upload",
    role: "group",
    "[attr.aria-labelledby]": "labelId",
    "[attr.aria-busy]": "loading() ? 'true' : 'false'",
    "data-minerva": "upload",
    "data-part": "root",
    "[attr.data-disabled]": "isDisabled() ? '' : null",
    "[attr.data-loading]": "loading() ? '' : null",
    "[attr.data-dragging]": "draggingActive() ? '' : null",
  },
  template: `
    <span [id]="labelId" [class]="s.label" mnHook="upload" mnPart="label">{{
      label()
    }}</span>
    <ng-template #uploadIcon><svg mnIcon="Upload"></svg></ng-template>
    <div
      [class]="dropzoneClasses()"
      mnHook="upload"
      mnPart="dropzone"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
    >
      <button
        #selectButton
        mnButton
        variant="outline"
        [disabled]="blocked()"
        [loading]="loading()"
        [startIcon]="uploadIcon"
        [attr.id]="field.id()"
        [attr.aria-describedby]="field.describedBy()"
        (click)="fileInput.click()"
        (blur)="notifyTouched()"
      >
        {{ labels()?.select ?? scope.t("upload.select") }}
      </button>
      <input
        #fileInput
        type="file"
        hidden
        tabindex="-1"
        [attr.aria-label]="label()"
        [disabled]="blocked()"
        [accept]="accept()"
        [multiple]="multiple()"
        (change)="onInputChange(fileInput)"
      />
    </div>
    @if (error()) {
      <div
        [class]="alertClasses"
        role="alert"
        mnHook="alert"
        [mnStates]="{ size: 'medium', variant: 'subtle', color: 'danger' }"
      >
        <span
          [class]="a.icon"
          role="img"
          [attr.aria-label]="scope.t('alert.icon.danger')"
          mnHook="alert"
          mnPart="icon"
          ><svg mnIcon="CircleXFilled"></svg
        ></span>
        <div [class]="a.content">
          <div
            [id]="errorId"
            [class]="a.message"
            mnHook="alert"
            mnPart="description"
          >
            {{ error() }}
          </div>
        </div>
      </div>
    }
    @if (items().length > 0) {
      <ul [class]="s.list" mnHook="upload" mnPart="list">
        @for (item of items(); track item.id) {
          <li
            [class]="s.item"
            mnHook="upload"
            mnPart="item"
            [mnStates]="{ status: item.status }"
          >
            @if (item.previewUrl) {
              <img [src]="item.previewUrl" alt="" [class]="s.preview" />
            }
            <div [class]="s.info">
              <span>{{ item.name }}</span>
              <span
                [attr.role]="item.status === 'error' ? 'alert' : 'status'"
                [class]="statusClasses(item)"
                >{{ statusText(item) }}</span
              >
            </div>
            <div [class]="s.actions">
              @if (item.status === "error" && retryable()) {
                <div
                  mnIconButtonPart
                  icon="RotateCw"
                  [label]="retryLabel(item)"
                  [disabled]="isDisabled() || loading()"
                  (activate)="onRetry(item)"
                ></div>
              }
              @if (removable()) {
                <div
                  #removeButton
                  mnIconButtonPart
                  icon="X"
                  [label]="removeLabel(item)"
                  [disabled]="isDisabled()"
                  (activate)="onRemove(item)"
                ></div>
              }
            </div>
          </li>
        }
      </ul>
    }
  `,
})
export class MnUpload extends MnFormValueControl<UploadItem[]> {
  /** Visible label of the upload field (also names the group and the file input) */
  readonly label = input.required<string>();
  /** Files to list, with their transfer state (two-way: `[(value)]`) */
  readonly value = model<UploadItem[]>([]);
  /**
   * Accepted file types, as for `<input accept>` (".pdf", "image/*", "application/json"...)
   * @default "*"
   */
  readonly accept = input("*");
  /** Allows selecting several files @default false */
  readonly multiple = input(false, { transform: booleanAttribute });
  /**
   * Single-file mode: lets a new file replace the listed one (the existing
   * file does not count toward maxCount)
   * @default false
   */
  readonly replace = input(false, { transform: booleanAttribute });
  /**
   * Maximum number of files, including the listed ones
   * @default 50 when multiple, otherwise 1
   */
  readonly maxCount = input<number | undefined, unknown>(undefined, {
    transform: optionalNumber,
  });
  /** Maximum size of a file, in bytes */
  readonly maxSize = input<number | undefined, unknown>(undefined, {
    transform: optionalNumber,
  });
  /**
   * Busy state: blocks new selections and retries (removal stays possible)
   * and sets aria-busy
   * @default false
   */
  readonly loading = input(false, { transform: booleanAttribute });
  /** Disables selection, retry and removal @default false */
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Shows a remove button on every item (React: `onRemove` is set) @default false */
  readonly removable = input(false, { transform: booleanAttribute });
  /** Shows a retry button on failed items (React: `onRetry` is set) @default false */
  readonly retryable = input(false, { transform: booleanAttribute });
  /** Custom texts; each one overrides the localized default */
  readonly labels = input<UploadLabels | undefined>(undefined);
  /** id of the select button (default: the field's) */
  readonly id = input<string | undefined>(undefined);

  /**
   * Valid files were picked or dropped (React's `onFilesSelected`); emitted
   * after they were appended to `value`
   */
  readonly filesSelected = output<File[]>();
  /** The remove button of an item was activated; the item was removed from `value` (React's `onRemove`) */
  readonly remove = output<UploadItem>();
  /** The retry button of a failed item was activated (React's `onRetry`) */
  readonly retry = output<UploadItem>();

  protected readonly s = s;
  protected readonly a = a;
  protected readonly scope = injectScope();
  protected readonly labelId = `${injectId("upload")}-label`;
  protected readonly errorId = injectId("upload-error");
  private readonly document = inject(DOCUMENT);
  private readonly fieldContext = injectFormField();
  protected readonly field = fieldWiring(this.fieldContext, {
    id: () => this.id(),
    invalid: () => this.controlInvalid(),
  });

  protected readonly error = signal("");
  private readonly dragging = signal(false);
  private nextItem = 0;
  private readonly uploadId = injectId("upload-item");
  private pendingRemoval: { id: string; nextId?: string } | null = null;

  private readonly selectButton = viewChild.required<
    ElementRef<HTMLButtonElement>,
    ElementRef<HTMLButtonElement>
  >("selectButton", {
    read: ElementRef<HTMLButtonElement>,
  });
  private readonly removeButtons = viewChildren("removeButton", {
    read: MnIconButtonPart,
  });

  protected readonly items = computed(() => this.value() ?? []);
  protected readonly isDisabled = computed(
    () =>
      this.disabled() ||
      this.formDisabled() ||
      (this.fieldContext?.disabled() ?? false),
  );
  private readonly resolvedMaxCount = computed(
    () => this.maxCount() ?? (this.multiple() ? 50 : 1),
  );
  private readonly existingCount = computed(() =>
    this.replace() && !this.multiple() ? 0 : this.items().length,
  );
  protected readonly blocked = computed(
    () =>
      this.isDisabled() ||
      this.loading() ||
      this.existingCount() >= this.resolvedMaxCount(),
  );
  protected readonly draggingActive = computed(
    () => this.dragging() && !this.blocked(),
  );
  protected readonly dropzoneClasses = computed(() =>
    cn(s.dropzone, this.draggingActive() && s.dragging),
  );
  protected readonly alertClasses = cn(
    a.alert,
    a.danger,
    a.medium,
    a.rounded,
    a.expanded,
    { [a.icon === undefined ? "" : "withIcon"]: false },
    s.error,
  );

  constructor() {
    super();
    // The focused remove button unmounts with its item: move focus to the
    // next item's remove button (else the select button) once it is gone.
    afterRenderEffect({
      write: () => {
        const items = this.items();
        const buttons = this.removeButtons();
        untracked(() => this.restoreFocus(items, buttons));
      },
    });
  }

  override writeValue(value: UploadItem[] | null | undefined): void {
    this.value.set(Array.isArray(value) ? value : []);
  }

  /** Focuses the select button */
  focus(options?: FocusOptions): void {
    this.selectButton().nativeElement.focus(options);
  }

  /** Opens the file picker */
  showPicker(): void {
    if (this.blocked()) return;
    this.selectButton()
      .nativeElement.parentElement?.querySelector<HTMLInputElement>(
        "input[type=file]",
      )
      ?.click();
  }

  private restoreFocus(
    items: UploadItem[],
    buttons: readonly MnIconButtonPart[],
  ): void {
    const pending = this.pendingRemoval;
    if (!pending || items.some((item) => item.id === pending.id)) return;
    this.pendingRemoval = null;
    const active = this.document.activeElement;
    if (active && active !== this.document.body) return; // focus moved on
    const index = pending.nextId
      ? items.findIndex((item) => item.id === pending.nextId)
      : -1;
    const next = index >= 0 ? buttons[index] : undefined;
    if (next) next.focus();
    else this.focus();
  }

  protected statusClasses(item: UploadItem): string {
    return cn(s.status, item.status === "error" && s.statusError);
  }

  protected statusText(item: UploadItem): string {
    const labels = this.labels();
    if (item.status === "uploading")
      return labels?.uploading ?? this.scope.t("upload.uploading");
    if (item.status === "error")
      return item.error || (labels?.failed ?? this.scope.t("upload.failed"));
    return labels?.done ?? this.scope.t("upload.done");
  }

  protected retryLabel(item: UploadItem): string {
    return (
      this.labels()?.retry?.(item.name) ??
      this.scope.t("upload.retry", { name: item.name })
    );
  }

  protected removeLabel(item: UploadItem): string {
    return (
      this.labels()?.remove?.(item.name) ??
      this.scope.t("upload.remove", { name: item.name })
    );
  }

  private select(files: File[]): void {
    if (this.blocked() || files.length === 0) return;
    const labels = this.labels();
    const max = this.resolvedMaxCount();
    if (
      (!this.multiple() && files.length > 1) ||
      files.length + this.existingCount() > max
    ) {
      this.error.set(
        labels?.tooMany?.(max) ??
          this.scope.t("upload.tooMany", { count: max }),
      );
      return;
    }
    const invalid = files.find((file) => !matchesAccept(file, this.accept()));
    if (invalid) {
      this.error.set(
        labels?.invalidType?.(invalid.name) ??
          this.scope.t("upload.invalidType", { name: invalid.name }),
      );
      return;
    }
    const maxSize = this.maxSize();
    const oversized =
      maxSize === undefined
        ? undefined
        : files.find((file) => file.size > maxSize);
    if (oversized) {
      this.error.set(
        labels?.tooLarge?.(oversized.name) ??
          this.scope.t("upload.tooLarge", { name: oversized.name }),
      );
      return;
    }
    this.error.set("");
    const added = files.map<UploadItem>((file) => ({
      id: `${this.uploadId}-${this.nextItem++}`,
      name: file.name,
      status: "done",
      file,
    }));
    const next =
      this.replace() && !this.multiple() ? added : [...this.items(), ...added];
    this.value.set(next);
    this.notifyChange(next);
    this.filesSelected.emit(files);
  }

  protected onInputChange(input: HTMLInputElement): void {
    const files = Array.from(input.files ?? []);
    // allow selecting the same file again
    input.value = "";
    this.select(files);
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (!this.blocked()) this.dragging.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    const zone = event.currentTarget as HTMLElement;
    if (!zone.contains(event.relatedTarget as Node | null))
      this.dragging.set(false);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);
    this.select(Array.from(event.dataTransfer?.files ?? []));
  }

  protected onRetry(item: UploadItem): void {
    if (this.isDisabled() || this.loading()) return;
    this.retry.emit(item);
  }

  protected onRemove(item: UploadItem): void {
    if (this.isDisabled()) return;
    const items = this.items();
    const index = items.indexOf(item);
    const neighbour = items[index + 1] ?? items[index - 1];
    this.pendingRemoval = { id: item.id, nextId: neighbour?.id };
    const next = items.filter((entry) => entry !== item);
    this.value.set(next);
    this.notifyChange(next);
    this.notifyTouched();
    this.remove.emit(item);
  }
}
