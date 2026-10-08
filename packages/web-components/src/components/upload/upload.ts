import { css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { repeat } from "lit/directives/repeat.js";
import iconButtonStyles from "@react-styles/components/IconButton/iconButton.module.scss?inline";
import styles from "@react-styles/components/Upload/upload.module.scss?inline";
import { matchesAccept } from "@minerva/core";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import {
  FormAssociatedElement,
  type ValidityResult,
} from "../../internal/form";
import { IconRotateCw, IconUpload, IconX } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { hostStyles } from "../../internal/minerva-element";
import { itemParts } from "../../internal/styling-hooks";
import { MinervaButton } from "../button/button";
import { sharedStyles } from "../../internal/styles";

/** Transfer state of an uploaded file */
export type UploadItemStatus = "uploading" | "done" | "error";

/** A file shown in the upload list */
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
  /** The selected file; items with a file are submitted with the form */
  file?: File;
}

/** Texts of the upload; every omitted entry uses the localized default */
export interface UploadLabels {
  /** Text of the select button */
  select?: string;
  /** Status text of an uploading file */
  uploading?: string;
  /** Status text of an uploaded file */
  done?: string;
  /** Status text of a failed file without its own error message */
  failed?: string;
  /** Error shown when too many files are selected */
  tooMany?: (max: number) => string;
  /** Error shown when a file does not match accept */
  invalidType?: (name: string) => string;
  /** Error shown when a file exceeds max-size */
  tooLarge?: (name: string) => string;
  /** Accessible label of the retry button of a file */
  retry?: (name: string) => string;
  /** Accessible label of the remove button of a file */
  remove?: (name: string) => string;
}

let nextUpload = 0;

/**
 * File selection with a button or drag and drop, validation (`accept`,
 * `max-size`, `max-count`) and a list of files with their transfer state
 * (`<Upload>` of React).
 *
 * Valid selections fire `minerva-files-selected` (cancelable): unless it is
 * canceled, the files are added to `items` (status "done", with their
 * `file`; replacing the listed file in single `replace` mode). Update
 * `items` to show transfer progress / errors and persisted files. With
 * `removable`, each item has a remove button (`minerva-remove`, cancelable;
 * removes the item by default); with `retryable`, failed items have a retry
 * button (`minerva-retry`).
 *
 * Form-associated: submits the `file` of every item under `name`
 * (multipart `FormData`); `required` makes an upload without files invalid
 * (`valueMissing`, localized "Please select a file."); `form.reset()`
 * empties the list; `<fieldset disabled>` and state restoration supported.
 *
 * @summary File picker with drag and drop, validation and a file list.
 * @tag minerva-upload
 * @csspart root - The container (`role=group`)
 * @csspart label - The visible label
 * @csspart dropzone - The drop target
 * @csspart select-button - The select button
 * @csspart error - The selection error
 * @csspart list - The file list
 * @csspart item - A file
 * @csspart item--status-uploading - Item state of `item`: status uploading
 * @csspart item--status-done - Item state of `item`: status done
 * @csspart item--status-error - Item state of `item`: status error
 * @csspart remove-button - The remove button of a file
 * @csspart retry-button - The retry button of a failed file
 * @fires minerva-files-selected - Valid files were picked or dropped; `detail: { files }`; cancelable (the files are then not listed)
 * @fires change - The listed files changed through the user
 * @fires minerva-change - The listed files changed through the user; `detail: { value }` (the items)
 * @fires minerva-remove - The remove button of an item was activated; `detail: { item }`; cancelable (keeps the item)
 * @fires minerva-retry - The retry button of a failed item was activated; `detail: { item }`
 */
export class MinervaUpload extends FormAssociatedElement {
  static override tagName = "minerva-upload";
  static override dependencies = [MinervaButton];
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 0;
      }
    `,
    sharedStyles(iconButtonStyles),
    sharedStyles(styles),
    css`
      /* React renders an Alert (color="danger") */
      .error {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-3) var(--space-4);
        border: 1px solid var(--danger-color);
        border-radius: var(--radius-md);
        background: var(--danger-color-subtle);
        color: var(--danger-color-text, var(--danger-color));
      }
    `,
  ];

  /** Visible label of the field (also names the group and the file input) */
  @property()
  label = "";

  /** Listed files with their transfer state */
  @property({ attribute: false })
  items: UploadItem[] = [];

  /** Accepted file types, as for `<input accept>` (".pdf", "image/*"...) */
  @property()
  accept = "*";

  /** Allows selecting several files */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /** Single-file mode: a new file replaces the listed one */
  @property({ type: Boolean })
  replace = false;

  /** Maximum number of files, including the listed ones (default: 50 when multiple, else 1) */
  @property({ type: Number, attribute: "max-count" })
  maxCount?: number;

  /** Maximum size of a file, in bytes */
  @property({ type: Number, attribute: "max-size" })
  maxSize?: number;

  /** Busy state: blocks new selections and retries (removal stays possible) */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** Shows a remove button on every item */
  @property({ type: Boolean })
  removable = false;

  /** Shows a retry button on failed items */
  @property({ type: Boolean })
  retryable = false;

  /**
   * Custom texts (the React library's `labels` prop; renamed because `labels` is the
   * form control's `<label>` list); each one overrides the localized default
   */
  @property({ attribute: false })
  texts?: UploadLabels;

  @state()
  private error = "";

  @state()
  private dragging = false;

  @query("input[type=file]")
  private input!: HTMLInputElement;

  private readonly uploadId = `upload-${nextUpload++}`;
  private nextId = 0;
  private pendingRemoval: { id: string; nextId?: string } | null = null;
  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);

  /** Files of the listed items (submitted with the form) */
  get files(): File[] {
    return this.items.flatMap((item) => (item.file ? [item.file] : []));
  }

  private get resolvedMaxCount(): number {
    return this.maxCount ?? (this.multiple ? 50 : 1);
  }

  private get existingCount(): number {
    return this.replace && !this.multiple ? 0 : this.items.length;
  }

  private get blocked(): boolean {
    return (
      this.isDisabled ||
      this.loading ||
      this.existingCount >= this.resolvedMaxCount
    );
  }

  /** Focuses the select button */
  override focus(options?: FocusOptions): void {
    this.renderRoot
      .querySelector<HTMLElement>("[part=select-button]")
      ?.focus(options);
  }

  /** Opens the file picker */
  showPicker(): void {
    if (!this.blocked) this.input?.click();
  }

  protected getFormValue(): FormData | null {
    if (!this.name) return null;
    const data = new FormData();
    for (const file of this.files) data.append(this.name, file);
    return data;
  }

  protected override getValidity(): ValidityResult {
    if (this.required && this.files.length === 0) {
      return {
        flags: { valueMissing: true },
        message: this.locale.t("validation.fileMissing"),
        anchor:
          this.renderRoot.querySelector<HTMLElement>("[part=select-button]") ??
          null,
      };
    }
    return { flags: {}, message: "" };
  }

  protected resetFormValue(): void {
    this.items = [];
    this.error = "";
  }

  protected override restoreFormState(state: unknown): void {
    if (!(state instanceof FormData)) return;
    this.items = state
      .getAll(this.name)
      .filter((entry): entry is File => entry instanceof File)
      .map((file) => this.toItem(file));
  }

  protected override willUpdate(changed: Map<PropertyKey, unknown>): void {
    if (
      DEV &&
      (changed.has("maxCount") || changed.has("multiple")) &&
      !this.multiple &&
      this.maxCount !== undefined &&
      this.maxCount > 1
    ) {
      devWarn(
        MinervaUpload.tagName,
        `max-count (${this.maxCount}) has no effect without multiple: one file is picked at a time.`,
      );
    }
  }

  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    const pending = this.pendingRemoval;
    if (!pending || this.items.some((item) => item.id === pending.id)) return;
    this.pendingRemoval = null;
    const next = pending.nextId
      ? Array.from(
          this.renderRoot.querySelectorAll<HTMLElement>("[data-item-id]"),
        )
          .find((el) => el.dataset.itemId === pending.nextId)
          ?.querySelector<HTMLElement>("[part=remove-button]")
      : null;
    if (next) next.focus();
    else this.focus();
  }

  private toItem(file: File): UploadItem {
    return {
      id: `${this.uploadId}-${this.nextId++}`,
      name: file.name,
      status: "done",
      file,
    };
  }

  private select(files: File[]) {
    if (this.blocked || files.length === 0) return;
    const { t } = this.locale;
    const labels = this.texts;
    const max = this.resolvedMaxCount;
    if (
      (!this.multiple && files.length > 1) ||
      files.length + this.existingCount > max
    ) {
      this.error =
        labels?.tooMany?.(max) ?? t("upload.tooMany", { count: max });
      return;
    }
    const invalid = files.find((file) => !matchesAccept(file, this.accept));
    if (invalid) {
      this.error =
        labels?.invalidType?.(invalid.name) ??
        t("upload.invalidType", { name: invalid.name });
      return;
    }
    const maxSize = this.maxSize;
    const oversized =
      maxSize === undefined ? undefined : files.find((f) => f.size > maxSize);
    if (oversized) {
      this.error =
        labels?.tooLarge?.(oversized.name) ??
        t("upload.tooLarge", { name: oversized.name });
      return;
    }
    this.error = "";
    if (!this.emit("minerva-files-selected", { files }, { cancelable: true })) {
      return;
    }
    const added = files.map((file) => this.toItem(file));
    this.items =
      this.replace && !this.multiple ? added : [...this.items, ...added];
    this.notifyChange();
  }

  private notifyChange() {
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { value: this.items });
  }

  private removeItem(item: UploadItem) {
    if (this.isDisabled) return;
    const index = this.items.indexOf(item);
    const neighbour = this.items[index + 1] ?? this.items[index - 1];
    this.pendingRemoval = { id: item.id, nextId: neighbour?.id };
    if (!this.emit("minerva-remove", { item }, { cancelable: true })) return;
    this.items = this.items.filter((entry) => entry !== item);
    this.notifyChange();
  }

  private retry(item: UploadItem) {
    if (this.isDisabled || this.loading) return;
    this.emit("minerva-retry", { item });
  }

  private handleInputChange() {
    const files = Array.from(this.input.files ?? []);
    // allow selecting the same file again
    this.input.value = "";
    this.select(files);
  }

  private handleDragOver(event: DragEvent) {
    event.preventDefault();
    if (!this.blocked) this.dragging = true;
  }

  private handleDragLeave(event: DragEvent) {
    const zone = event.currentTarget as HTMLElement;
    if (!zone.contains(event.relatedTarget as Node | null)) {
      this.dragging = false;
    }
  }

  private handleDrop(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;
    this.select(Array.from(event.dataTransfer?.files ?? []));
  }

  private statusText(item: UploadItem): string {
    const { t } = this.locale;
    const labels = this.texts;
    if (item.status === "uploading") {
      return labels?.uploading ?? t("upload.uploading");
    }
    if (item.status === "error") {
      return item.error || (labels?.failed ?? t("upload.failed"));
    }
    return labels?.done ?? t("upload.done");
  }

  protected override hookStates() {
    return {
      disabled: this.isDisabled,
      loading: this.loading,
      dragging: this.dragging && !this.blocked,
    };
  }

  protected override render() {
    const { t } = this.locale;
    const labels = this.texts;
    const blocked = this.blocked;
    const disabled = this.isDisabled;
    const name = this.label || this.aria.label;
    return html`<div
      part="root"
      class="upload"
      role="group"
      aria-labelledby=${this.label ? "label" : nothing}
      aria-label=${!this.label && name ? name : nothing}
      aria-description=${this.aria.description ?? nothing}
      aria-busy=${this.loading ? "true" : "false"}
    >
      <span id="label" part="label" class="label">${this.label}</span>
      <div
        part="dropzone"
        class=${classMap({ dropzone: true, dragging: this.dragging && !blocked })}
        @dragover=${this.handleDragOver}
        @dragleave=${this.handleDragLeave}
        @drop=${this.handleDrop}
      >
        <minerva-button
          part="select-button"
          variant="outline"
          ?disabled=${blocked}
          ?loading=${this.loading}
          @click=${() => this.input.click()}
        >
          <span slot="start">${IconUpload}</span>
          ${labels?.select ?? t("upload.select")}
        </minerva-button>
        <input
          type="file"
          hidden
          tabindex="-1"
          aria-label=${name || nothing}
          ?disabled=${blocked}
          accept=${this.accept}
          ?multiple=${this.multiple}
          @change=${this.handleInputChange}
        />
      </div>
      ${
        this.error
          ? html`<div part="error" class="error" role="alert">
              ${this.error}
            </div>`
          : nothing
      }
      ${
        this.items.length > 0
          ? html`<ul part="list" class="list">
              ${repeat(
                this.items,
                (item) => item.id,
                (item) =>
                  html`<li
                    part=${itemParts("item", { status: item.status })}
                    class="item"
                    data-item-id=${item.id}
                  >
                    ${
                      item.previewUrl
                        ? html`<img
                            src=${item.previewUrl}
                            alt=""
                            class="preview"
                          />`
                        : nothing
                    }
                    <div class="info">
                      <span>${item.name}</span>
                      <span
                        role=${item.status === "error" ? "alert" : "status"}
                        class=${classMap({
                          status: true,
                          statusError: item.status === "error",
                        })}
                        >${this.statusText(item)}</span
                      >
                    </div>
                    <div class="actions">
                      ${
                        item.status === "error" && this.retryable
                          ? html`<button
                              part="retry-button"
                              type="button"
                              class=${classMap({
                                iconButton: true,
                                neutral: true,
                                "variant-ghost": true,
                                small: true,
                                square: true,
                                disabled: disabled || this.loading,
                              })}
                              aria-label=${
                                labels?.retry?.(item.name) ??
                                t("upload.retry", { name: item.name })
                              }
                              ?disabled=${disabled || this.loading}
                              @click=${() => this.retry(item)}
                            >
                              ${IconRotateCw}
                            </button>`
                          : nothing
                      }
                      ${
                        this.removable
                          ? html`<button
                              part="remove-button"
                              type="button"
                              class=${classMap({
                                iconButton: true,
                                neutral: true,
                                "variant-ghost": true,
                                small: true,
                                square: true,
                                disabled,
                              })}
                              aria-label=${
                                labels?.remove?.(item.name) ??
                                t("upload.remove", { name: item.name })
                              }
                              ?disabled=${disabled}
                              @click=${() => this.removeItem(item)}
                            >
                              ${IconX}
                            </button>`
                          : nothing
                      }
                    </div>
                  </li>`,
              )}
            </ul>`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-upload": MinervaUpload;
  }
}
