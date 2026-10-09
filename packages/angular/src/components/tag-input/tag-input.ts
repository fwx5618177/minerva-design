import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  input,
  linkedSignal,
  model,
  output,
  signal,
  viewChild,
} from "@angular/core";
import { DEFAULT_TAG_SEPARATORS, cn, splitBySeparators } from "@minerva/core";
import { injectScope } from "../../config/scope";
import { classOf } from "../../internal/classes";
import {
  MnFormValueControl,
  fieldWiring,
  injectFormField,
  provideValueAccessor,
} from "../../internal/forms";
import { MnHook } from "../../internal/hooks";
import { MnIcon } from "../../internal/icon";
import { injectId } from "../../internal/ids";
import {
  iconButtonStyles as ib,
  inputStyles as inp,
  tagInputStyles as s,
  tagStyles as tg,
  tooltipStyles as tt,
} from "../../internal/styles";

export type TagInputSize = "small" | "medium" | "large";

const EMPTY: readonly string[] = [];
const ENTER = "Enter";
const LINE_BREAKS = ["\r\n", "\n", "\r"];

interface Suggestion {
  /** The tag added when selected */
  tag: string;
  label: string;
  /** Text matched against the draft */
  filterValue: string;
}

/**
 * TagInput: free-form tags with suggestions. Enter / the add button / blur
 * add the trimmed draft; typed or pasted `separators` split text into tags;
 * arrow keys pick a suggestion; Escape discards the draft; Backspace in an
 * empty draft removes the last tag. IME composition never commits. Same DOM,
 * classes and styling hooks as React's TagInput (the host element is the
 * wrapper; the tags, the text field and the add / clear buttons render the
 * DOM of React's Tag, Input and IconButton).
 *
 * Two-way binding: `[(value)]`, `ngModel` or a Reactive Forms control
 * (ControlValueAccessor). Inside `<mn-form-control>` it takes the field's id,
 * description, invalid / required / read-only / disabled states.
 *
 * @example
 * <mn-tag-input aria-label="Tags" [options]="['Vue', 'React']" [(value)]="tags" />
 * <mn-tag-input formControlName="tags" name="tags" />
 */
@Component({
  selector: "mn-tag-input",
  exportAs: "mnTagInput",
  imports: [MnHook, MnIcon],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(() => MnTagInput)],
  host: {
    "[class]": "s.root",
    "data-minerva": "tag-input",
    "data-part": "root",
    "[attr.data-state]": "open() ? 'open' : 'closed'",
    "[attr.data-disabled]": "isDisabled() ? '' : null",
    "[attr.data-invalid]": "rootInvalid() ? '' : null",
    "[attr.data-readonly]": "isReadOnly() ? '' : null",
    "[attr.data-required]": "field.required() ? '' : null",
    "[attr.data-size]": "size()",
    // inputs moved to the inner <input>: not attributes of the wrapper
    "[attr.id]": "null",
    "[attr.name]": "null",
    "[attr.placeholder]": "null",
    "[attr.aria-label]": "null",
    "[attr.aria-labelledby]": "null",
    "[attr.aria-describedby]": "null",
    "[attr.disabled]": "null",
    "[attr.readonly]": "null",
    "[attr.invalid]": "null",
    "[attr.required]": "null",
    "[attr.size]": "null",
  },
  template: `
    @if (tags().length > 0) {
      <div [class]="s.values" mnHook="tag-input" mnPart="tags">
        @for (tag of tags(); track $index + ":" + tag; let index = $index) {
          <div
            [class]="tagClasses()"
            data-component="tag"
            mnHook="tag"
            [mnStates]="tagStates()"
          >
            <span [class]="tg.content" mnHook="tag" mnPart="label">
              <span [class]="s.label">{{ tag }}</span>
            </span>
            @if (!isReadOnly()) {
              <button
                type="button"
                [class]="tg.closeIcon"
                [disabled]="isDisabled()"
                [attr.aria-label]="removeText(tag)"
                [attr.title]="removeText(tag)"
                (click)="onRemove($event, index)"
                mnHook="tag"
                mnPart="close-button"
              >
                <svg mnIcon="X"></svg>
              </button>
            }
          </div>
        }
      </div>
    }
    <div [class]="s.entry">
      <div [class]="s.combobox">
        <div
          [class]="inputClasses()"
          data-component="input"
          mnHook="input"
          [mnStates]="inputStates()"
        >
          <input
            #input
            [class]="inp.field"
            type="text"
            role="combobox"
            [attr.id]="field.id()"
            [attr.aria-label]="ariaLabel() ?? null"
            [attr.aria-labelledby]="ariaLabelledby() ?? null"
            [attr.aria-describedby]="field.describedBy()"
            [attr.aria-invalid]="field.invalid() ? 'true' : null"
            [attr.aria-required]="fieldContext?.required() ? 'true' : null"
            [attr.aria-readonly]="fieldContext?.readOnly() ? 'true' : null"
            [attr.aria-expanded]="open()"
            [attr.aria-controls]="open() ? listId : null"
            aria-autocomplete="list"
            [attr.aria-activedescendant]="activeDescendant()"
            autocomplete="off"
            spellcheck="false"
            [attr.placeholder]="placeholder() ?? null"
            [value]="draft()"
            [disabled]="isDisabled()"
            [readOnly]="isReadOnly()"
            (input)="onInput(input)"
            (focus)="onFocus()"
            (click)="onFocus()"
            (blur)="onBlur()"
            (compositionstart)="composing = true"
            (compositionend)="composing = false"
            (keydown)="onKeyDown($event)"
            (paste)="onPaste($event, input)"
            mnHook="input"
            mnPart="input"
          />
        </div>
        @if (open()) {
          <ul
            [attr.id]="listId"
            role="listbox"
            [attr.aria-label]="ariaLabel() ?? null"
            [attr.aria-labelledby]="ariaLabelledby() ?? null"
            [class]="s.list"
            mnHook="tag-input"
            mnPart="list"
          >
            @if (filtered().length === 0) {
              <li
                [class]="s.empty"
                role="presentation"
                mnHook="tag-input"
                mnPart="empty"
              >
                {{ emptyText() ?? scope.t("tagInput.empty") }}
              </li>
            }
            @for (
              suggestion of filtered();
              track suggestion.label + "-" + suggestion.tag;
              let index = $index
            ) {
              <li
                [attr.id]="optionId(index)"
                role="option"
                [attr.aria-selected]="index === highlight()"
                tabindex="-1"
                [class]="s.option"
                (mousedown)="onOptionMouseDown($event, suggestion)"
                (mouseenter)="highlight.set(index)"
                mnHook="tag-input"
                mnPart="option"
                [mnStates]="{ highlighted: index === highlight() }"
              >
                {{ suggestion.label }}
              </li>
            }
          </ul>
        }
      </div>
      @if (!isReadOnly()) {
        <div
          [class]="tt.tooltipTrigger"
          mnHook="tooltip"
          mnPart="trigger"
          [mnStates]="{ state: 'closed', disabled: addDisabled() }"
        >
          <button
            type="button"
            [class]="buttonClasses(addDisabled())"
            [disabled]="addDisabled()"
            [attr.tabindex]="addDisabled() ? -1 : 0"
            [attr.aria-label]="addLabel() ?? scope.t('tagInput.add')"
            (mousedown)="$event.preventDefault()"
            (click)="onAdd()"
            mnHook="icon-button"
            [mnStates]="buttonStates(addDisabled())"
          >
            <span
              [class]="ib.glyph"
              aria-hidden="true"
              mnHook="icon-button"
              mnPart="icon"
            >
              <svg mnIcon="Plus"></svg>
            </span>
          </button>
        </div>
        <div
          [class]="tt.tooltipTrigger"
          mnHook="tooltip"
          mnPart="trigger"
          [mnStates]="{ state: 'closed', disabled: clearDisabled() }"
        >
          <button
            type="button"
            [class]="buttonClasses(clearDisabled())"
            [disabled]="clearDisabled()"
            [attr.tabindex]="clearDisabled() ? -1 : 0"
            [attr.aria-label]="clearLabel() ?? scope.t('tagInput.clear')"
            (mousedown)="$event.preventDefault()"
            (click)="onClear()"
            mnHook="icon-button"
            [mnStates]="buttonStates(clearDisabled())"
          >
            <span
              [class]="ib.glyph"
              aria-hidden="true"
              mnHook="icon-button"
              mnPart="icon"
            >
              <svg mnIcon="X"></svg>
            </span>
          </button>
        </div>
      }
    </div>
    @if (name()) {
      @for (tag of tags(); track $index + ":" + tag) {
        <input
          type="hidden"
          [attr.name]="name()"
          [value]="tag"
          [disabled]="isDisabled()"
        />
      }
    }
  `,
})
export class MnTagInput extends MnFormValueControl<string[]> {
  /** Selected tags (two-way: `[(value)]`); `defaultValue` when not bound */
  readonly value = model<string[] | undefined>(undefined);
  /**
   * Initial tags when `value` is not bound
   * @default []
   */
  readonly defaultValue = input<readonly string[]>(EMPTY);
  /**
   * Suggestions; already selected tags are hidden and duplicates merged
   * @default []
   */
  readonly options = input<readonly string[]>(EMPTY);
  /**
   * Adds the typed draft as a tag when the input loses focus
   * @default true
   */
  readonly commitOnBlur = input(true, { transform: booleanAttribute });
  /**
   * Keys that commit the draft: a literal string (e.g. "," or ";") splits the
   * typed or pasted text into tags; "Enter" commits on the Enter key (and also
   * splits pasted text on line breaks)
   * @default [",", "Enter"]
   */
  readonly separators = input<readonly string[]>(DEFAULT_TAG_SEPARATORS);
  /** Id of the text input (defaults to the form control's id) */
  readonly id = input<string | undefined>(undefined);
  /** Submits every selected tag under this name (hidden inputs); the draft is not submitted */
  readonly name = input<string | undefined>(undefined);
  /** Placeholder of the text input */
  readonly placeholder = input<string | undefined>(undefined);
  /** Accessible name of the text input when there is no form control label */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  /** Ids of the elements labelling the text input */
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: "aria-labelledby",
  });
  /** Extra ids describing the text input */
  readonly ariaDescribedby = input<string | undefined>(undefined, {
    alias: "aria-describedby",
  });
  /**
   * Disables the field (also set by the form / `<mn-form-control>`)
   * @default false
   */
  readonly disabled = input(false, { transform: booleanAttribute });
  /**
   * Shows the tags without editing controls (also set by `<mn-form-control>`)
   * @default false
   */
  readonly readOnly = input(false, { transform: booleanAttribute });
  /**
   * Error state (also set by an invalid form control / `<mn-form-control>`)
   * @default false
   */
  readonly invalid = input(false, { transform: booleanAttribute });
  /**
   * Marks the field as required (aria-required, `data-required`; also set
   * by `<mn-form-control>`)
   * @default false
   */
  readonly required = input(false, { transform: booleanAttribute });
  /**
   * Size of the text input
   * @default "medium"
   */
  readonly size = input<TagInputSize>("medium");
  /**
   * Text of the suggestion list when nothing matches
   * @default "No matches" (localized)
   */
  readonly emptyText = input<string | undefined>(undefined);
  /**
   * Accessible label of the add button
   * @default "Add tag" (localized)
   */
  readonly addLabel = input<string | undefined>(undefined);
  /**
   * Accessible label of the clear button
   * @default "Clear tags" (localized)
   */
  readonly clearLabel = input<string | undefined>(undefined);
  /**
   * Accessible label of a tag's remove button
   * @default tag => `Remove ${tag}` (localized)
   */
  readonly removeLabel = input<((tag: string) => string) | undefined>(
    undefined,
  );
  /**
   * Text of the "create this tag" suggestion
   * @default tag => `Add "${tag}"` (localized)
   */
  readonly createLabel = input<((tag: string) => string) | undefined>(
    undefined,
  );

  /** The typed text (draft) changed (web components' `minerva-input`) */
  readonly draftChange = output<string>();
  /** The suggestion list opened / closed (web components' `minerva-open-change`) */
  readonly openChange = output<boolean>();
  /** The clear button removed every tag (web components' `minerva-clear`) */
  readonly clear = output<void>();

  protected readonly s = s;
  protected readonly tg = tg;
  protected readonly inp = inp;
  protected readonly ib = ib;
  protected readonly tt = tt;
  protected readonly scope = injectScope();
  protected readonly listId = injectId("tag-input-list");
  protected readonly fieldContext = injectFormField();
  protected readonly field = fieldWiring(this.fieldContext, {
    id: () => this.id(),
    describedBy: () => this.ariaDescribedby(),
    invalid: () => this.invalid() || this.controlInvalid(),
    required: () => this.required(),
    readOnly: () => this.readOnly(),
    disabled: () => this.disabled() || this.formDisabled(),
  });
  protected readonly isDisabled = this.field.disabled;
  protected readonly isReadOnly = this.field.readOnly;
  protected readonly rootInvalid = this.field.invalid;
  protected readonly blocked = computed(
    () => this.isDisabled() || this.isReadOnly(),
  );

  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>("input");
  /** IME composition in progress */
  protected composing = false;
  /** An explicit arrow-key choice wins over "Enter adds the draft" */
  private navigating = false;

  /** The tags shown (the bound value, else the default) */
  protected readonly tags = computed<readonly string[]>(
    () => this.value() ?? this.defaultValue(),
  );
  protected readonly draft = signal("");
  private readonly requestedOpen = signal(false);
  protected readonly open = computed(
    () => this.requestedOpen() && !this.blocked(),
  );
  private readonly trimmed = computed(() => this.draft().trim());

  protected readonly filtered = computed<Suggestion[]>(() => {
    const tags = this.tags();
    const trimmed = this.trimmed();
    const candidates = [
      ...new Set(
        this.options()
          .map((option) => option.trim())
          .filter(Boolean),
      ),
    ].filter((option) => !tags.includes(option));
    const suggestions: Suggestion[] = candidates.map((tag) => ({
      tag,
      label: tag,
      filterValue: tag,
    }));
    if (trimmed && !tags.includes(trimmed) && !candidates.includes(trimmed)) {
      const create = this.createLabel();
      suggestions.unshift({
        tag: trimmed,
        label: create
          ? create(trimmed)
          : this.scope.t("tagInput.create", { tag: trimmed }),
        filterValue: trimmed,
      });
    }
    const query = trimmed.toLowerCase();
    return query
      ? suggestions.filter((s) => s.filterValue.toLowerCase().includes(query))
      : suggestions;
  });

  /** Highlighted suggestion; back to the first one when the list changes */
  protected readonly highlight = linkedSignal({
    source: () => `${this.filtered().length}\u0000${this.draft()}`,
    computation: () => 0,
  });

  private readonly enterCommits = computed(() =>
    this.separators().includes(ENTER),
  );
  /** Literal separators: typing one commits the text before it */
  private readonly splitters = computed(() =>
    this.separators().filter((sep) => sep !== ENTER && sep !== ""),
  );
  /** Pasted text also splits on line breaks when Enter commits */
  private readonly pasteSplitters = computed(() =>
    this.enterCommits()
      ? [...this.splitters(), ...LINE_BREAKS]
      : this.splitters(),
  );

  protected readonly activeDescendant = computed(() =>
    this.open() && this.filtered()[this.highlight()]
      ? this.optionId(this.highlight())
      : null,
  );
  protected readonly addDisabled = computed(
    () =>
      this.isDisabled() ||
      !this.trimmed() ||
      this.tags().includes(this.trimmed()),
  );
  protected readonly clearDisabled = computed(
    () => this.isDisabled() || this.tags().length === 0,
  );

  protected readonly tagClasses = computed(() =>
    cn(
      tg.tag,
      tg.neutral,
      classOf(tg, "subtle"),
      tg.large,
      tg.rounded,
      this.isDisabled() && tg.disabled,
      s.tag,
    ),
  );
  protected readonly tagStates = computed(() => ({
    state: "inactive",
    disabled: this.isDisabled(),
    size: "large",
    variant: "subtle",
    color: "neutral",
    shape: "rounded",
  }));
  protected readonly inputClasses = computed(() =>
    cn(
      inp.root,
      inp.outline,
      classOf(inp, this.size()),
      this.field.invalid() && inp.invalid,
      this.isDisabled() && inp.disabled,
    ),
  );
  protected readonly inputStates = computed(() => ({
    disabled: this.isDisabled(),
    invalid: this.field.invalid(),
    readonly: this.isReadOnly(),
    required: this.field.required(),
    size: this.size(),
    variant: "outline",
  }));

  override writeValue(value: string[] | null | undefined): void {
    this.value.set(value ? [...value] : []);
  }

  protected optionId(index: number): string {
    return `${this.listId}-option-${index}`;
  }

  protected removeText(tag: string): string {
    const label = this.removeLabel();
    return label ? label(tag) : this.scope.t("tagInput.remove", { tag });
  }

  protected buttonClasses(disabled: boolean): string {
    return cn(
      ib.iconButton,
      ib.neutral,
      ib["variant-ghost"],
      ib.medium,
      ib.square,
      disabled && ib.disabled,
    );
  }

  protected buttonStates(disabled: boolean) {
    return {
      state: "inactive",
      disabled,
      size: "medium",
      variant: "ghost",
      color: "neutral",
      shape: "square",
    };
  }

  private setOpen(next: boolean): void {
    if (this.requestedOpen() === next) return;
    this.requestedOpen.set(next);
    this.openChange.emit(next);
  }

  private setTags(next: string[]): void {
    this.value.set(next);
    this.notifyChange(next);
  }

  private setDraft(next: string): void {
    // the input may show text the state already had (e.g. a lone separator)
    const el = this.inputRef()?.nativeElement;
    if (el && el.value !== next) el.value = next;
    if (this.draft() === next) return;
    this.draft.set(next);
    this.draftChange.emit(next);
  }

  /** Adds every (trimmed, non-empty, new) text as a tag in one update */
  private commitAll(texts: readonly string[], nextDraft = ""): void {
    if (this.blocked() || this.composing) return;
    const tags = this.tags();
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

  private focusInput(): void {
    this.inputRef()?.nativeElement.focus();
  }

  protected onInput(el: HTMLInputElement): void {
    if (this.blocked()) {
      el.value = this.draft();
      return;
    }
    this.navigating = false;
    const text = el.value;
    const splitters = this.splitters();
    const parts =
      this.composing || splitters.length === 0
        ? [text]
        : splitBySeparators(text, splitters);
    if (parts.length > 1) {
      // Typed a separator: commit what precedes it, keep the rest.
      this.commitAll(parts.slice(0, -1), parts[parts.length - 1]);
    } else {
      this.setDraft(text);
    }
    this.setOpen(true);
  }

  protected onFocus(): void {
    if (!this.blocked()) this.setOpen(true);
  }

  protected onBlur(): void {
    this.setOpen(false);
    if (this.commitOnBlur()) this.commit(this.draft());
    this.notifyTouched();
  }

  protected onPaste(event: ClipboardEvent, el: HTMLInputElement): void {
    if (this.blocked() || this.composing) return;
    const pasted = event.clipboardData?.getData("text") ?? "";
    const splitters = this.pasteSplitters();
    if (!splitters.some((sep) => pasted.includes(sep))) return;
    event.preventDefault();
    const draft = this.draft();
    const start = el.selectionStart ?? draft.length;
    const end = el.selectionEnd ?? draft.length;
    const text = draft.slice(0, start) + pasted + draft.slice(end);
    this.commitAll(splitBySeparators(text, splitters));
    this.setOpen(false);
  }

  protected onKeyDown(event: KeyboardEvent): void {
    if (
      this.blocked() ||
      this.composing ||
      event.isComposing ||
      event.keyCode === 229
    ) {
      return;
    }
    const filtered = this.filtered();
    const count = filtered.length;
    const draft = this.draft();
    const trimmed = this.trimmed();
    const tags = this.tags();
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        this.navigating = true;
        this.setOpen(true);
        if (count > 0) {
          const delta = event.key === "ArrowDown" ? 1 : -1;
          this.highlight.update((h) => (h + delta + count) % count);
        }
        break;
      case "Enter": {
        // Never submit the enclosing form from the tag field.
        event.preventDefault();
        const highlighted = filtered[this.highlight()];
        if (!this.enterCommits()) {
          // Enter only picks an explicitly highlighted suggestion.
          if (this.navigating && this.open() && highlighted) {
            this.select(highlighted);
          }
        } else if (!this.navigating && (!trimmed || tags.includes(trimmed))) {
          this.commit(draft);
        } else if (this.open() && highlighted) {
          this.select(highlighted);
        } else {
          this.commit(draft);
          this.setOpen(false);
        }
        break;
      }
      case "Escape":
        this.navigating = false;
        this.setDraft("");
        if (this.open()) {
          event.preventDefault();
          this.setOpen(false);
        }
        break;
      case "Backspace":
        // Keyboard removal of the last tag, only from an empty draft.
        if (draft === "" && tags.length > 0) {
          event.preventDefault();
          this.setTags(tags.slice(0, -1));
        }
        break;
    }
  }

  protected onOptionMouseDown(event: MouseEvent, suggestion: Suggestion): void {
    // mousedown runs before the input blurs: keep focus in the input.
    event.preventDefault();
    this.select(suggestion);
  }

  protected onRemove(event: MouseEvent, index: number): void {
    event.stopPropagation();
    if (this.blocked()) return;
    this.setTags(this.tags().filter((_, position) => position !== index));
    this.focusInput();
  }

  protected onAdd(): void {
    this.commit(this.draft());
    this.focusInput();
  }

  protected onClear(): void {
    this.setDraft("");
    this.setTags([]);
    this.clear.emit();
    this.focusInput();
  }

  /** Focuses the text input */
  focus(options?: FocusOptions): void {
    this.inputRef()?.nativeElement.focus(options);
  }
}
