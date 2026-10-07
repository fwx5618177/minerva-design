import { css, html, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import iconButtonStyles from "@lib-core-styles/components/IconButton/iconButton.module.scss?inline";
import styles from "@lib-core-styles/components/KeyValueEditor/keyValueEditor.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import {
  FormAssociatedElement,
  type ValidityResult,
} from "../../internal/form";
import { IconPlus, IconX } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { hostStyles } from "../../internal/minerva-element";
import { MinervaButton } from "../button/button";
import { MinervaFormControl } from "../form-control/form-control";
import { MinervaTextarea } from "../textarea/textarea";

/** One row of a `<minerva-key-value-editor>` */
export interface KeyValueEntry {
  /** Stable id of the row (error lookup, focus); generated when omitted */
  id: string;
  /** Key text (whitespace and newlines are preserved) */
  key: string;
  /** Value text (whitespace and newlines are preserved) */
  value: string;
}

/** Field errors of one row */
export interface KeyValueEntryErrors {
  /** Error message of the key field */
  key?: string;
  /** Error message of the value field */
  value?: string;
}

let nextEditor = 0;

/**
 * Ordered list of editable string pairs (`<KeyValueEditor>` of lib-core):
 * multi-line keys and values with add / remove actions. Rows are tracked by
 * their stable `id`, so duplicate keys and reordering are safe. Focus
 * follows the actions: adding a row focuses its key field; removing one
 * focuses the next row's remove button (else the previous one, else the add
 * button).
 *
 * `value` is a JS array of `{ id, key, value }` entries (property). The
 * `value` attribute sets the initial rows (restored by `form.reset()`) as
 * JSON: an array of `{ key, value }` objects or a `{ "key": "value" }`
 * object.
 *
 * Form-associated: submits the rows under `name` as a JSON string — an
 * array of `{ "key", "value" }` objects in row order (ids are not
 * submitted), e.g. `[{"key":"a","value":"1"}]`. `required` makes an editor
 * without rows invalid (`valueMissing`). Validation of the texts belongs to
 * the consumer (`errors`, `setCustomValidity()`).
 *
 * @summary Editable list of key / value pairs.
 * @tag minerva-key-value-editor
 * @csspart base - The container
 * @csspart row - Each row
 * @csspart remove-button - The remove button of a row
 * @csspart add-button - The add button
 * @fires minerva-input - A key or value is being typed; `detail: { value }` (the entries)
 * @fires change - A row was committed (field blur), added or removed
 * @fires minerva-change - A row was committed (field blur), added or removed; `detail: { value }`
 */
export class MinervaKeyValueEditor extends FormAssociatedElement {
  static override tagName = "minerva-key-value-editor";
  static override dependencies = [
    MinervaButton,
    MinervaFormControl,
    MinervaTextarea,
  ];
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        width: 100%;
        min-width: 0;
      }
    `,
    unsafeCSS(iconButtonStyles),
    unsafeCSS(styles),
    css`
      /* lib-core sizes the key <textarea>; reach it through its variable */
      .key {
        --textarea-min-height: var(
          --key-value-editor-control-height,
          var(--control-height-sm)
        );
      }
    `,
  ];

  /** Rows (property; the `value` attribute sets `defaultValue`) */
  @property({ attribute: false })
  value: KeyValueEntry[] = [];

  /** Initial rows, restored by `form.reset()` (the `value` attribute, JSON) */
  @property({
    attribute: "value",
    converter: { fromAttribute: (text: string | null) => parseEntries(text) },
  })
  defaultValue: KeyValueEntry[] = [];

  /** Label of the key fields (followed by the row number for screen readers) */
  @property({ attribute: "key-label" })
  keyLabel?: string;

  /** Label of the value fields */
  @property({ attribute: "value-label" })
  valueLabel?: string;

  /** Text of the add button */
  @property({ attribute: "add-label" })
  addLabel?: string;

  /** Accessible label of the remove buttons (followed by the row number) */
  @property({ attribute: "remove-label" })
  removeLabel?: string;

  /** Field errors by entry id */
  @property({ attribute: false })
  errors?: Record<string, KeyValueEntryErrors>;

  private readonly editorId = `kv-${nextEditor++}`;
  private nextId = 0;
  private dirty = false;
  private pendingFocus:
    | { kind: "add"; id: string }
    | { kind: "remove"; id: string; nextId?: string }
    | null = null;
  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);

  /** Focuses the first key field (else the add button) */
  override focus(options?: FocusOptions): void {
    const target =
      this.renderRoot.querySelector<HTMLElement>("minerva-textarea") ??
      this.renderRoot.querySelector<HTMLElement>("minerva-button");
    target?.focus(options);
  }

  protected getFormValue(): string {
    return JSON.stringify(this.value.map(({ key, value }) => ({ key, value })));
  }

  protected override getValidity(): ValidityResult {
    if (this.required && this.value.length === 0) {
      return {
        flags: { valueMissing: true },
        message: this.locale.t("validation.valueMissing"),
        anchor:
          this.renderRoot.querySelector<HTMLElement>("minerva-button") ?? null,
      };
    }
    return { flags: {}, message: "" };
  }

  protected resetFormValue(): void {
    this.dirty = false;
    this.value = this.defaultValue;
  }

  protected override restoreFormState(state: unknown): void {
    if (typeof state === "string") this.value = parseEntries(state);
  }

  protected override willUpdate(changed: Map<PropertyKey, unknown>): void {
    // first update: rows set before connecting win over the default
    // unless the value attribute is present
    if (
      changed.has("defaultValue") &&
      !this.dirty &&
      (this.hasUpdated || this.hasAttribute("value"))
    ) {
      this.value = this.defaultValue;
    }
    if (changed.has("value")) {
      // entries without an id get one (rows are tracked by id)
      if (this.value.some((entry) => !entry.id)) {
        this.value = this.value.map((entry) =>
          entry.id ? entry : { ...entry, id: this.newId() },
        );
      }
      if (DEV) {
        const ids = this.value.map((entry) => entry.id);
        if (new Set(ids).size !== ids.length) {
          devWarn(
            MinervaKeyValueEditor.tagName,
            "entries have duplicate ids: rows are tracked by id, make them unique.",
          );
        }
      }
    }
  }

  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    const pending = this.pendingFocus;
    if (!pending) return;
    this.pendingFocus = null;
    const has = (id?: string) => this.value.some((entry) => entry.id === id);
    const row = (id?: string) =>
      Array.from(
        this.renderRoot.querySelectorAll<HTMLElement>("[data-entry-id]"),
      ).find((el) => id !== undefined && el.dataset.entryId === id) ?? null;
    if (pending.kind === "add") {
      const key = has(pending.id)
        ? row(pending.id)?.querySelector<MinervaTextarea>(".key")
        : null;
      // the new field renders its <textarea> in its own (next) update
      if (key) void key.updateComplete.then(() => key.focus());
    } else if (!has(pending.id)) {
      const next = row(pending.nextId)?.querySelector<HTMLElement>(".remove");
      (
        next ?? this.renderRoot.querySelector<HTMLElement>("minerva-button")
      )?.focus();
    }
  }

  private newId(): string {
    let id: string;
    do {
      id = `${this.editorId}-${this.nextId++}`;
    } while (this.value.some((entry) => entry.id === id));
    return id;
  }

  private commit(next: KeyValueEntry[]) {
    this.dirty = true;
    this.value = next;
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { value: next });
  }

  private add() {
    if (this.isDisabled) return;
    const id = this.newId();
    this.pendingFocus = { kind: "add", id };
    this.commit([...this.value, { id, key: "", value: "" }]);
  }

  private removeEntry(id: string) {
    if (this.isDisabled) return;
    const index = this.value.findIndex((entry) => entry.id === id);
    const neighbour = this.value[index + 1] ?? this.value[index - 1];
    this.pendingFocus = { kind: "remove", id, nextId: neighbour?.id };
    this.commit(this.value.filter((entry) => entry.id !== id));
  }

  private handleInput(event: Event, id: string, field: "key" | "value") {
    // the inner textarea's own minerva-* events stop here
    event.stopPropagation();
    if (this.isDisabled) return;
    const text = (event.target as MinervaTextarea).value;
    this.dirty = true;
    this.value = this.value.map((entry) =>
      entry.id === id ? { ...entry, [field]: text } : entry,
    );
    this.emit("minerva-input", { value: this.value });
  }

  private handleFieldChange(event: Event) {
    event.stopPropagation();
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { value: this.value });
  }

  private renderField(
    entry: KeyValueEntry,
    index: number,
    field: "key" | "value",
    label: string,
  ) {
    const error = this.errors?.[entry.id]?.[field];
    return html`<minerva-form-control
      ?disabled=${this.isDisabled}
      ?invalid=${!!error}
      error-message=${error ?? ""}
    >
      <span slot="label"
        >${label}<span class="srOnly"> ${index + 1}</span></span
      >
      <minerva-textarea
        class=${field === "key" ? "key" : ""}
        size="small"
        rows=${field === "key" ? 1 : 2}
        .value=${entry[field]}
        @minerva-input=${(event: Event) =>
          this.handleInput(event, entry.id, field)}
        @minerva-change=${this.handleFieldChange}
      ></minerva-textarea>
    </minerva-form-control>`;
  }

  protected override render() {
    const { t } = this.locale;
    const keyText = this.keyLabel ?? t("keyValueEditor.key");
    const valueText = this.valueLabel ?? t("keyValueEditor.value");
    const removeText = this.removeLabel ?? t("keyValueEditor.remove");
    const disabled = this.isDisabled;
    const label = this.aria.label;
    return html`<div
      class="root"
      part="base"
      role=${label ? "group" : nothing}
      aria-label=${label ?? nothing}
      aria-description=${this.aria.description ?? nothing}
    >
      ${repeat(
        this.value,
        (entry) => entry.id,
        (entry, index) =>
          html`<div class="row" part="row" data-entry-id=${entry.id}>
            ${this.renderField(entry, index, "key", keyText)}
            ${this.renderField(entry, index, "value", valueText)}
            <button
              part="remove-button"
              type="button"
              class="remove iconButton neutral variant-ghost small square ${
                disabled ? "disabled" : ""
              }"
              aria-label=${`${removeText} ${index + 1}`}
              ?disabled=${disabled}
              @click=${() => this.removeEntry(entry.id)}
            >
              ${IconX}
            </button>
          </div>`,
      )}
      <minerva-button
        part="add-button"
        class="add"
        color="neutral"
        variant="outline"
        size="small"
        ?disabled=${disabled}
        @click=${this.add}
      >
        <span slot="start">${IconPlus}</span>
        <span>${this.addLabel ?? t("keyValueEditor.add")}</span>
      </minerva-button>
    </div>`;
  }
}

/** Rows from JSON: `[{ key, value, id? }]` or `{ "key": "value" }`. */
function parseEntries(text: string | null): KeyValueEntry[] {
  if (!text) return [];
  try {
    const data: unknown = JSON.parse(text);
    if (Array.isArray(data)) {
      return data
        .filter((item) => item && typeof item === "object")
        .map((item: Record<string, unknown>) => ({
          id: typeof item.id === "string" ? item.id : "",
          key: String(item.key ?? ""),
          value: String(item.value ?? ""),
        }));
    }
    if (data && typeof data === "object") {
      return Object.entries(data).map(([key, value]) => ({
        id: "",
        key,
        value: typeof value === "string" ? value : JSON.stringify(value),
      }));
    }
  } catch {
    // not JSON: no rows
  }
  return [];
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-key-value-editor": MinervaKeyValueEditor;
  }
}
