import { css, html, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import { repeat } from "lit/directives/repeat.js";
import {
  // Aliased: the name shows up as the documented default of `separators`.
  DEFAULT_TAG_SEPARATORS as DEFAULT_SEPARATORS,
  splitBySeparators,
} from "@minerva/core";
import { ESCAPE_CONSUMER_ATTRIBUTE } from "@minerva/dom";
import iconButtonStyles from "@react-styles/components/IconButton/iconButton.module.scss?inline";
import inputStyles from "@react-styles/components/Input/input.module.scss?inline";
import tagStyles from "@react-styles/components/Tag/tag.module.scss?inline";
import styles from "@react-styles/components/TagInput/tagInput.module.scss?inline";
import {
  FloatingLayerController,
  popoverResetStyles,
} from "../../controllers/floating-layer";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import {
  FormAssociatedElement,
  type FormValue,
  type ValidityResult,
} from "../../internal/form";
import { IconPlus, IconX } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { hostStyles } from "../../internal/minerva-element";
import { itemParts } from "../../internal/styling-hooks";
import { sharedStyles } from "../../internal/styles";

export type TagInputSize = "small" | "medium" | "large";

const TAG = "minerva-tag-input";
const ENTER = "Enter";
const LINE_BREAKS = ["\r\n", "\n", "\r"];

/** Strings of a JSON array attribute (`null` when it is not one). */
function parseJsonList(text: string, attribute: string): string[] | null {
  try {
    const parsed: unknown = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string");
    }
  } catch {
    // reported below
  }
  if (DEV) {
    devWarn(TAG, `the ${attribute} attribute is not a JSON array of strings.`);
  }
  return null;
}

/**
 * Tag list attribute (`value`, `options`): a JSON array of strings
 * (`'["a","b, c"]'`) when it starts with `[`, else comma-separated text
 * (`"a, b"`, entries trimmed, empty ones dropped).
 */
function parseTagList(text: string | null, attribute: string): string[] {
  const value = (text ?? "").trim();
  if (!value) return [];
  if (value.startsWith("[")) return parseJsonList(value, attribute) ?? [];
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

/**
 * `separators` attribute: a JSON array (`'[";", "Enter"]'`) when it starts
 * with `[`, else whitespace-separated separators (`"; Enter"`).
 */
function parseSeparators(text: string | null): string[] {
  const value = (text ?? "").trim();
  if (!value) return [];
  if (value.startsWith("[")) {
    return parseJsonList(value, "separators") ?? [...DEFAULT_SEPARATORS];
  }
  return value.split(/\s+/);
}

interface Suggestion {
  /** The tag added when selected */
  tag: string;
  label: string;
  /** Text matched against the draft */
  filterValue: string;
}

let nextId = 0;

/**
 * Free-form tag field with suggestions (`<TagInput>` of React). Enter,
 * the add button and blur add the trimmed draft; typed or pasted
 * `separators` split text into tags; ArrowUp / ArrowDown pick a suggestion
 * (`options`); Escape discards the draft; Backspace in an empty draft removes
 * the last tag. IME composition never commits. Duplicates are ignored.
 *
 * Form-associated: every tag is submitted under `name` (one entry per tag,
 * `formData.getAll(name)`; the draft is not submitted), supports `required`,
 * `form.reset()` (restores the `value` attribute) and `<fieldset disabled>`.
 * Name it with `<label for>`, `aria-label` or `aria-labelledby`.
 *
 * The suggestion list is a `popover="manual"` panel in the shadow root
 * (top layer, anchored below the field); Escape (topmost layer only) and
 * outside interactions close it, focus stays in the text input.
 *
 * @summary Tag field: type, paste or pick suggestions to build a list of tags.
 * @tag minerva-tag-input
 * @csspart root - The wrapper
 * @csspart tags - The list of tags
 * @csspart tag - A tag (web components only: React renders a Tag, styled with its own hooks)
 * @csspart remove-button - The remove button of a tag (web components only, see tag)
 * @csspart control - The text field box (web components only: React renders an Input, styled with its own hooks)
 * @csspart input - The native text <input> (role="combobox"; web components only, see control)
 * @csspart list - The suggestion list (role=listbox, while open)
 * @csspart option - A suggestion (role=option; the highlighted one has aria-selected="true")
 * @csspart option--highlighted - Item state of `option`: highlighted
 * @csspart empty - The text shown when no suggestion matches
 * @csspart add-button - The add button (web components only: React renders an IconButton, styled with its own hooks)
 * @csspart clear-button - The clear button (web components only: React renders an IconButton, styled with its own hooks)
 * @fires minerva-change - The tags changed (addition, removal, clearing); `detail: { value }`
 * @fires minerva-input - The typed text (draft) changed; `detail: { value }` (the draft)
 * @fires minerva-open-change - The suggestion list is about to open / close (`detail: { open }`); cancelable: `preventDefault()` keeps the current state
 * @fires minerva-clear - The clear button removed every tag
 */
export class MinervaTagInput extends FormAssociatedElement {
  static override tagName = TAG;
  static override shadowRootOptions = {
    ...FormAssociatedElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static override styles = [
    hostStyles,
    popoverResetStyles,
    css`
      :host {
        display: block;
        min-width: 0;
      }
    `,
    sharedStyles(tagStyles),
    sharedStyles(iconButtonStyles),
    // Input's sheet has generic top-level classes (.root, .medium,
    // .disabled...): scope it to the text field (CSS nesting) so it does not
    // style the wrapper, the tags or the buttons.
    sharedStyles(`.combobox { ${inputStyles.replace(/@charset[^;]*;/g, "")} }`),
    sharedStyles(styles),
    css`
      /* the wrapper's .root rules (column flow) must not reach the field */
      .combobox > .root {
        flex-direction: row;
        gap: 0;
      }
      /* positioned by the floating layer (fixed, left / top) */
      .list {
        inset: auto;
      }
    `,
  ];

  private _value: string[] = [];

  /**
   * Selected tags (property only; the `value` attribute sets `defaultValue`).
   * Assign a new array: in-place mutations are not observed
   */
  @property({ attribute: false })
  get value(): string[] {
    return this._value;
  }
  set value(next: string[]) {
    this.dirty = true;
    this.setValue(next);
  }

  /**
   * Initial tags, restored by `form.reset()`: the `value` attribute, a JSON
   * array (`'["a","b"]'`) or comma-separated text (`"a, b"`). Until the user
   * edits the tags, changing it also changes `value`
   */
  @property({
    attribute: "value",
    converter: {
      fromAttribute: (v: string | null) => parseTagList(v, "value"),
    },
  })
  defaultValue: string[] = [];

  /**
   * Suggestions; already selected tags are hidden and duplicates merged
   * (`options` attribute: JSON array or comma-separated text)
   */
  @property({
    converter: {
      fromAttribute: (v: string | null) => parseTagList(v, "options"),
    },
  })
  options: string[] = [];

  /**
   * Keys that commit the draft: a literal string (e.g. "," or ";") splits the
   * typed or pasted text into tags; "Enter" commits on the Enter key (and also
   * splits pasted text on line breaks). Attribute: a JSON array or
   * whitespace-separated values (`separators="; Enter"`)
   */
  @property({ converter: { fromAttribute: parseSeparators } })
  separators: string[] = [...DEFAULT_SEPARATORS];

  /** Does not add the typed draft as a tag when the field loses focus */
  @property({ type: Boolean, attribute: "no-commit-on-blur" })
  noCommitOnBlur = false;

  /** Placeholder of the text input */
  @property()
  placeholder = "";

  /** Size of the text input */
  @property({ reflect: true })
  size: TagInputSize = "medium";

  /** Error state; sets aria-invalid on the text input */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /** Shows the tags without editing controls (still submitted) */
  @property({ type: Boolean, reflect: true, attribute: "readonly" })
  readOnly = false;

  /** Text of the suggestion list when nothing matches (default: localized "No matches") */
  @property({ attribute: "empty-text" })
  emptyText?: string;

  /** Accessible label of the add button (default: localized "Add tag") */
  @property({ attribute: "add-label" })
  addLabel?: string;

  /** Accessible label of the clear button (default: localized "Clear tags") */
  @property({ attribute: "clear-label" })
  clearLabel?: string;

  /** Accessible label of a tag's remove button (default: localized `Remove ${tag}`) */
  @property({ attribute: false })
  removeLabel?: (tag: string) => string;

  /** Text of the "create this tag" suggestion (default: localized `Add "${tag}"`) */
  @property({ attribute: false })
  createLabel?: (tag: string) => string;

  /** Typed text not yet committed as a tag */
  @state()
  private draft = "";

  @state()
  private requestedOpen = false;

  @state()
  private highlight = 0;

  @query("input.field")
  private input!: HTMLInputElement;

  @query(".combobox")
  private combobox!: HTMLElement;

  @query(".list")
  private list!: HTMLElement | null;

  private readonly listId = `minerva-tag-input-list-${nextId++}`;
  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);
  private readonly floating = new FloatingLayerController(this, () => ({
    anchor: () => this.combobox,
    floating: () => this.list,
    branches: () => [this],
    placement: "bottom-start",
    offset: { mainAxis: 4 },
    matchAnchorWidth: "exact",
    onDismiss: () => this.setOpen(false),
  }));

  /** The user (or a script setting `value`) changed the tags */
  private dirty = false;
  private composing = false;
  /** An explicit arrow-key choice wins over "Enter adds the draft" */
  private navigating = false;
  private highlightKey = "";

  override focus(options?: FocusOptions): void {
    this.input?.focus(options);
  }

  override blur(): void {
    this.input?.blur();
  }

  private setValue(next: unknown): void {
    const old = this._value;
    this._value = Array.isArray(next)
      ? next.map(String)
      : typeof next === "string"
        ? parseTagList(next, "value")
        : [];
    this.requestUpdate("value", old);
  }

  private get blocked(): boolean {
    return this.isDisabled || this.readOnly;
  }

  private get isOpen(): boolean {
    return this.requestedOpen && !this.blocked;
  }

  /** Suggestions matching the draft (the React library's `filtered`). */
  private get filtered(): Suggestion[] {
    const tags = this.value;
    const trimmed = this.draft.trim();
    const candidates = [
      ...new Set(this.options.map((option) => option.trim()).filter(Boolean)),
    ].filter((option) => !tags.includes(option));
    const suggestions: Suggestion[] = candidates.map((tag) => ({
      tag,
      label: tag,
      filterValue: tag,
    }));
    if (trimmed && !tags.includes(trimmed) && !candidates.includes(trimmed)) {
      suggestions.unshift({
        tag: trimmed,
        label: this.createLabel
          ? this.createLabel(trimmed)
          : this.locale.t("tagInput.create", { tag: trimmed }),
        filterValue: trimmed,
      });
    }
    const query = trimmed.toLowerCase();
    return query
      ? suggestions.filter((s) => s.filterValue.toLowerCase().includes(query))
      : suggestions;
  }

  private get enterCommits(): boolean {
    return this.separators.includes(ENTER);
  }

  /** Literal separators: typing one commits the text before it. */
  private get splitters(): string[] {
    return this.separators.filter((sep) => sep !== ENTER && sep !== "");
  }

  protected getFormValue(): FormValue {
    if (!this.name) return null;
    const data = new FormData();
    for (const tag of this.value) data.append(this.name, tag);
    return data;
  }

  protected override getValidity(): ValidityResult {
    return this.required && this.value.length === 0
      ? {
          flags: { valueMissing: true },
          message: this.locale.t("validation.valueMissing"),
          anchor: this.input,
        }
      : { flags: {}, message: "" };
  }

  protected resetFormValue(): void {
    this.dirty = false;
    this.setValue([...this.defaultValue]);
    this.draft = "";
    this.requestedOpen = false;
    this.navigating = false;
  }

  protected override restoreFormState(
    state: string | File | FormData | null,
  ): void {
    if (state instanceof FormData) {
      this.value = state
        .getAll(this.name)
        .filter((v): v is string => typeof v === "string");
    } else if (typeof state === "string") {
      this.value = [state];
    }
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("defaultValue") && !this.dirty) {
      this.setValue([...this.defaultValue]);
    }
    if (this.blocked) this.requestedOpen = false;
    // Reset the highlight when the list changes (the React library's derived reset).
    const key = `${this.filtered.length}\u0000${this.draft}`;
    if (key !== this.highlightKey) {
      this.highlightKey = key;
      this.highlight = 0;
    }
    if (DEV && changed.has("value")) {
      const seen = new Set<string>();
      const duplicate = this.value.find(
        (tag) => seen.size === seen.add(tag).size,
      );
      if (duplicate !== undefined) {
        devWarn(
          TAG,
          `value contains the tag "${duplicate}" more than once: tags are unique (removing one removes its position only).`,
        );
      }
    }
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    this.floating.sync(this.isOpen);
    // Escape in a closed list with a draft only clears the draft: it does
    // not dismiss an enclosing layer (modal, drawer).
    this.input?.toggleAttribute(
      ESCAPE_CONSUMER_ATTRIBUTE,
      !this.isOpen && this.draft !== "",
    );
  }

  /** Opens / closes the list (cancelable `minerva-open-change`). */
  private setOpen(next: boolean): void {
    if (next && this.blocked) return;
    if (next === this.requestedOpen) return;
    if (!this.emit("minerva-open-change", { open: next }, { cancelable: true }))
      return;
    this.requestedOpen = next;
  }

  private setTags(next: string[]): void {
    this.value = next;
    this.emit("minerva-change", { value: [...next] });
  }

  private setDraft(next: string): void {
    this.draft = next;
    // the input may show text the state already had (e.g. a lone separator)
    if (this.input && this.input.value !== next) this.input.value = next;
  }

  /** Adds every (trimmed, non-empty, new) text as a tag in one update. */
  private commitAll(texts: readonly string[], nextDraft = ""): void {
    if (this.blocked || this.composing) return;
    const tags = this.value;
    const next = [...tags];
    for (const text of texts) {
      const tag = text.trim();
      if (tag && !next.includes(tag)) next.push(tag);
    }
    if (next.length !== tags.length) this.setTags(next);
    this.navigating = false;
    this.setDraft(nextDraft);
  }

  private commit(text: string): void {
    this.commitAll([text]);
  }

  private select(suggestion: Suggestion): void {
    this.commit(suggestion.tag);
    this.setOpen(false);
  }

  private removeAt(index: number): void {
    if (this.blocked) return;
    this.setTags(this.value.filter((_, position) => position !== index));
    this.input?.focus();
  }

  private handleInput(): void {
    const text = this.input.value;
    if (this.blocked) {
      this.input.value = this.draft;
      return;
    }
    this.navigating = false;
    const splitters = this.splitters;
    const parts =
      this.composing || splitters.length === 0
        ? [text]
        : splitBySeparators(text, splitters);
    if (parts.length > 1) {
      // Typed a separator: commit what precedes it, keep the rest.
      this.commitAll(parts.slice(0, -1), parts[parts.length - 1]);
    } else {
      this.draft = text;
    }
    this.setOpen(true);
    this.emit("minerva-input", { value: this.draft });
  }

  private handlePaste(event: ClipboardEvent): void {
    if (this.blocked || this.composing) return;
    const pasted = event.clipboardData?.getData("text") ?? "";
    const splitters = this.enterCommits
      ? [...this.splitters, ...LINE_BREAKS]
      : this.splitters;
    if (!splitters.some((sep) => pasted.includes(sep))) return;
    event.preventDefault();
    const draft = this.draft;
    const start = this.input.selectionStart ?? draft.length;
    const end = this.input.selectionEnd ?? draft.length;
    const text = draft.slice(0, start) + pasted + draft.slice(end);
    this.commitAll(splitBySeparators(text, splitters));
    this.setOpen(false);
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (
      this.blocked ||
      this.composing ||
      event.isComposing ||
      event.keyCode === 229
    ) {
      return;
    }
    const filtered = this.filtered;
    const count = filtered.length;
    const open = this.isOpen;
    const trimmed = this.draft.trim();
    const tags = this.value;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        this.navigating = true;
        this.setOpen(true);
        if (count > 0) {
          const delta = event.key === "ArrowDown" ? 1 : -1;
          this.highlight = (this.highlight + delta + count) % count;
        }
        break;
      case "Enter":
        // Never submit the enclosing form from the tag field.
        event.preventDefault();
        if (!this.enterCommits) {
          // Enter only picks an explicitly highlighted suggestion.
          if (this.navigating && open && filtered[this.highlight]) {
            this.select(filtered[this.highlight]);
          }
        } else if (!this.navigating && (!trimmed || tags.includes(trimmed))) {
          this.commit(this.draft);
        } else if (open && filtered[this.highlight]) {
          this.select(filtered[this.highlight]);
        } else {
          this.commit(this.draft);
          this.setOpen(false);
        }
        break;
      case "Escape":
        this.navigating = false;
        this.setDraft("");
        // the floating layer already closed an open list (topmost only)
        if (open && !event.defaultPrevented) {
          event.preventDefault();
          this.setOpen(false);
        }
        break;
      case "Backspace":
        // Keyboard removal of the last tag, only from an empty draft.
        if (this.draft === "" && tags.length > 0) {
          event.preventDefault();
          this.setTags(tags.slice(0, -1));
        }
        break;
    }
  }

  private handleFocus(): void {
    if (!this.blocked) this.setOpen(true);
  }

  private handleBlur(): void {
    this.setOpen(false);
    if (!this.noCommitOnBlur) this.commit(this.draft);
  }

  private clearAll(): void {
    this.setDraft("");
    this.setTags([]);
    this.emit("minerva-clear");
    this.input?.focus();
  }

  private renderTag(tag: string, index: number) {
    const disabled = this.isDisabled;
    const removeText = this.removeLabel
      ? this.removeLabel(tag)
      : this.locale.t("tagInput.remove", { tag });
    return html`<div
      part="tag"
      class=${classMap({
        tag: true,
        neutral: true,
        subtle: true,
        large: true,
        rounded: true,
        disabled,
      })}
      data-component="tag"
    >
      <span class="content"><span class="label">${tag}</span></span>
      ${
        this.readOnly
          ? nothing
          : html`<button
              part="remove-button"
              type="button"
              class="closeIcon"
              aria-label=${removeText}
              title=${removeText}
              ?disabled=${disabled}
              @click=${(event: MouseEvent) => {
                event.stopPropagation();
                this.removeAt(index);
              }}
            >
              ${IconX}
            </button>`
      }
    </div>`;
  }

  protected override hookStates() {
    return {
      state: this.isOpen ? "open" : "closed",
      disabled: this.isDisabled,
      invalid: this.invalid,
      readonly: this.readOnly,
      required: this.required,
      size: this.size,
    };
  }

  private renderList(filtered: Suggestion[]) {
    const label = this.aria.label;
    return html`<ul
      part="list"
      id=${this.listId}
      role="listbox"
      popover="manual"
      aria-label=${label ?? nothing}
      class="list"
    >
      ${
        filtered.length === 0
          ? html`<li class="empty" part="empty" role="presentation">
              ${this.emptyText ?? this.locale.t("tagInput.empty")}
            </li>`
          : nothing
      }
      ${filtered.map(
        (suggestion, index) =>
          html`<li
            part=${itemParts("option", { highlighted: index === this.highlight })}
            id=${`${this.listId}-option-${index}`}
            role="option"
            aria-selected=${index === this.highlight ? "true" : "false"}
            tabindex="-1"
            class="option"
            ?data-highlighted=${index === this.highlight}
            @mousedown=${(event: MouseEvent) => {
              // runs before the input blurs: keep focus in the input
              event.preventDefault();
              this.select(suggestion);
            }}
            @mouseenter=${() => (this.highlight = index)}
          >
            ${suggestion.label}
          </li>`,
      )}
    </ul>`;
  }

  protected override render() {
    const { t } = this.locale;
    const disabled = this.isDisabled;
    const tags = this.value;
    const open = this.isOpen;
    const filtered = this.filtered;
    const trimmed = this.draft.trim();
    const active = open ? filtered[this.highlight] : undefined;
    const preventBlur = (event: MouseEvent) => event.preventDefault();

    return html`<div part="root" class="root">
      ${
        tags.length > 0
          ? html`<div part="tags" class="values">
              ${repeat(
                tags,
                (tag, index) => `${index}-${tag}`,
                (tag, index) => this.renderTag(tag, index),
              )}
            </div>`
          : nothing
      }
      <div class="entry">
        <div class="combobox">
          <div
            part="control"
            class=${classMap({
              root: true,
              outline: true,
              [this.size]: true,
              invalid: this.invalid,
              disabled,
            })}
            data-component="input"
          >
            <input
              part="input"
              class="field"
              type="text"
              role="combobox"
              aria-label=${this.aria.label ?? nothing}
              aria-description=${this.aria.description ?? nothing}
              aria-expanded=${open ? "true" : "false"}
              aria-controls=${open ? this.listId : nothing}
              aria-autocomplete="list"
              aria-activedescendant=${
                active ? `${this.listId}-option-${this.highlight}` : nothing
              }
              aria-invalid=${this.invalid ? "true" : nothing}
              aria-required=${this.required ? "true" : nothing}
              autocomplete="off"
              spellcheck="false"
              placeholder=${this.placeholder || nothing}
              .value=${live(this.draft)}
              ?disabled=${disabled}
              ?readonly=${this.readOnly}
              @input=${this.handleInput}
              @focus=${this.handleFocus}
              @click=${this.handleFocus}
              @blur=${this.handleBlur}
              @compositionstart=${() => (this.composing = true)}
              @compositionend=${() => (this.composing = false)}
              @keydown=${this.handleKeyDown}
              @paste=${this.handlePaste}
            />
          </div>
          ${open ? this.renderList(filtered) : nothing}
        </div>
        ${
          this.readOnly
            ? nothing
            : html`<button
                  part="add-button"
                  type="button"
                  class=${classMap({
                    iconButton: true,
                    neutral: true,
                    "variant-ghost": true,
                    medium: true,
                    square: true,
                    disabled: disabled || !trimmed || tags.includes(trimmed),
                  })}
                  aria-label=${this.addLabel ?? t("tagInput.add")}
                  ?disabled=${disabled || !trimmed || tags.includes(trimmed)}
                  @mousedown=${preventBlur}
                  @click=${() => {
                    this.commit(this.draft);
                    this.input?.focus();
                  }}
                >
                  ${IconPlus}
                </button>
                <button
                  part="clear-button"
                  type="button"
                  class=${classMap({
                    iconButton: true,
                    neutral: true,
                    "variant-ghost": true,
                    medium: true,
                    square: true,
                    disabled: disabled || tags.length === 0,
                  })}
                  aria-label=${this.clearLabel ?? t("tagInput.clear")}
                  ?disabled=${disabled || tags.length === 0}
                  @mousedown=${preventBlur}
                  @click=${this.clearAll}
                >
                  ${IconX}
                </button>`
        }
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-tag-input": MinervaTagInput;
  }
}
