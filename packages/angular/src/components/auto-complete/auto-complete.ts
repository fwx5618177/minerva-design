import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  ViewEncapsulation,
  afterRenderEffect,
  booleanAttribute,
  computed,
  inject,
  input,
  linkedSignal,
  model,
  output,
  signal,
  untracked,
  viewChild,
} from "@angular/core";
import { cn } from "@minerva/core";
import { parsePlacement, type Placement } from "@minerva/dom";
import { injectScope } from "../../config/scope";
import { classOf } from "../../internal/classes";
import { hasContent, templateOf, type MnContent } from "../../internal/content";
import {
  MnFormValueControl,
  fieldWiring,
  injectFormField,
  provideValueAccessor,
} from "../../internal/forms";
import { MnHook } from "../../internal/hooks";
import { MnIcon } from "../../internal/icon";
import { injectId } from "../../internal/ids";
import { anchoredPosition, overlayLayer } from "../../internal/overlay";
import { MnPortal } from "../../internal/portal";
import {
  autoCompleteStyles as s,
  emptyStyles,
  inputStyles,
  progressIndicatorStyles,
} from "../../internal/styles";

/** An option of the AutoComplete dropdown */
export interface AutoCompleteOption {
  /** Text displayed for the option and written to the input when selected */
  label: string;
  /** Unique value of the option */
  value: string | number;
  /** Prevents the option from being selected */
  disabled?: boolean;
  /** Highlights the option (e.g. as a recommendation) */
  highlight?: boolean;
  /** Icon displayed before the label (basic mode): a string or a template */
  icon?: MnContent;
  /** Secondary text displayed under the label (basic mode) */
  description?: string;
  /** Free-form group identifier, typically read by groupBy */
  group?: string;
  /** Inline styles of the option */
  style?: Record<string, string | number>;
}

/** Template context of `renderOption` (`let-option`) */
export interface AutoCompleteOptionContext {
  $implicit: AutoCompleteOption;
}

export type AutoCompleteMode = "basic" | "custom";
export type AutoCompletePlacement = "top" | "bottom" | "left" | "right";
export type AutoCompleteGroupMode = "first" | "adjacent";
export type AutoCompleteSize = "small" | "medium" | "large";
export type AutoCompleteVariant = "outline" | "filled" | "unstyled";

const DEFAULT_OFFSET = Object.freeze({ x: 0, y: 4 });
const EMPTY_OPTIONS: AutoCompleteOption[] = [];

const PLACEMENT = {
  top: "top-start",
  bottom: "bottom-start",
  left: "left-start",
  right: "right-start",
} as const;

const optionalBoolean = (value: unknown): boolean | undefined =>
  value === undefined || value === null ? undefined : booleanAttribute(value);

interface OptionEntry {
  option: AutoCompleteOption;
  /** Index in display order (keyboard / hover / option id) */
  index: number;
}

interface OptionSection {
  key: string;
  /** Group heading (`null` / `""`: no heading, no group element) */
  label: string | null;
  entries: OptionEntry[];
}

/**
 * AutoComplete: a text input (combobox) that suggests options from a list.
 * Supports grouping, custom rendering (`mode="custom"` + `renderOption`
 * template) and async loading. Focus stays in the input
 * (`aria-activedescendant`); the dropdown is portalled (theme-scoped) and
 * renders nothing on the server. Same DOM, classes and styling hooks as
 * React's AutoComplete (the nested Input / Empty / ProgressIndicator DOM is
 * rendered inline). For picking several values use TagInput.
 *
 * Two-way binding: `[(value)]` (the input text), `[(open)]` (the dropdown),
 * `ngModel` or a Reactive Forms control (the text). Inside
 * `<mn-form-control>` it takes the field's id, description, invalid /
 * required / read-only / disabled states.
 *
 * @example
 * <mn-auto-complete label="Book" [options]="books" [(value)]="query"
 *   (optionSelect)="open($event)" />
 */
@Component({
  selector: "mn-auto-complete",
  exportAs: "mnAutoComplete",
  imports: [MnHook, MnIcon, MnPortal, NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(() => MnAutoComplete)],
  host: {
    style: "display: block",
    "[class]": "rootClass()",
    "[attr.id]": "null",
    "[attr.aria-label]": "null",
    "[attr.aria-labelledby]": "null",
    "[attr.aria-describedby]": "null",
    "data-minerva": "autocomplete",
    "data-part": "root",
    "[attr.data-state]": "shown() ? 'open' : 'closed'",
    "[attr.data-disabled]": "isDisabled() ? '' : null",
    "[attr.data-readonly]": "field.readOnly() ? '' : null",
    "[attr.data-loading]": "loading() ? '' : null",
    "(compositionstart)": "composing = true",
    "(compositionend)": "composing = false",
  },
  template: `
    @if (label()) {
      <label
        [attr.for]="inputId()"
        [class]="s.label"
        mnHook="autocomplete"
        mnPart="label"
        >{{ label() }}</label
      >
    }
    <div
      [class]="fieldClass()"
      data-component="input"
      mnHook="input"
      [mnStates]="fieldStates()"
    >
      @if (hasContent(prefix())) {
        <span
          [class]="inputStyles.addon + ' ' + inputStyles.start"
          mnHook="input"
          mnPart="prefix"
        >
          @if (templateOf(prefix()); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          } @else {
            {{ prefix() }}
          }
        </span>
      }
      <input
        #input
        type="text"
        [class]="inputStyles.field"
        [attr.id]="inputId()"
        [attr.name]="name() ?? null"
        [attr.placeholder]="placeholder() ?? null"
        [attr.aria-label]="ariaLabel() ?? null"
        [attr.aria-labelledby]="ariaLabelledby() ?? null"
        [attr.aria-describedby]="field.describedBy()"
        [attr.aria-invalid]="isInvalid() ? 'true' : null"
        [attr.aria-required]="fieldContext?.required() ? 'true' : null"
        [attr.aria-readonly]="fieldContext?.readOnly() ? 'true' : null"
        [attr.required]="required() ? '' : null"
        [attr.readonly]="field.readOnly() ? '' : null"
        [disabled]="isDisabled()"
        [value]="text()"
        role="combobox"
        aria-autocomplete="list"
        [attr.aria-expanded]="shown()"
        [attr.aria-controls]="shown() ? listboxId : null"
        [attr.aria-activedescendant]="activeOptionId()"
        [attr.data-minerva-escape-consumer]="escapeConsumer() ? '' : null"
        (input)="onInput(input.value)"
        (focus)="openDropdown()"
        (blur)="onBlur($event)"
        (keydown)="onKeyDown($event)"
        (click)="onInputClick()"
        mnHook="input"
        mnPart="input"
      />
      @if (showClear()) {
        <button
          type="button"
          [class]="inputStyles.action"
          [attr.aria-label]="clearLabel() ?? scope.t('input.clear')"
          (click)="clearText()"
          mnHook="input"
          mnPart="clear-button"
        >
          <svg mnIcon="X"></svg>
        </button>
      }
      @if (hasContent(suffix())) {
        <span
          [class]="inputStyles.addon + ' ' + inputStyles.end"
          mnHook="input"
          mnPart="suffix"
        >
          @if (templateOf(suffix()); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          } @else {
            {{ suffix() }}
          }
        </span>
      }
    </div>

    @if (shown()) {
      <div
        *mnPortal
        #popup
        [class]="popupClass()"
        mnHook="autocomplete"
        mnPart="content"
        [mnStates]="contentStates()"
      >
        <div [class]="dropdownClass()">
          <div
            [class]="s.optionList"
            role="listbox"
            [attr.id]="listboxId"
            [attr.aria-label]="label() || null"
            [attr.aria-busy]="loading() ? 'true' : null"
            mnHook="autocomplete"
            mnPart="list"
          >
            @if (loading()) {
              <div
                role="presentation"
                [class]="s.loading"
                mnHook="autocomplete"
                mnPart="loading"
              >
                <div
                  [class]="progressClass"
                  role="progressbar"
                  [attr.aria-label]="scope.t('common.loading')"
                  mnHook="progress"
                  [mnStates]="progressStates"
                >
                  <svg
                    mnIcon="Spinner"
                    [class]="spinnerClass"
                    mnHook="progress"
                    mnPart="indicator"
                  ></svg>
                </div>
              </div>
            } @else if (navigable().length > 0) {
              @for (section of sections(); track section.key) {
                @if (section.label) {
                  <div role="group" [attr.aria-label]="section.label">
                    <div
                      [class]="s.groupLabel"
                      aria-hidden="true"
                      mnHook="autocomplete"
                      mnPart="group-label"
                    >
                      {{ section.label }}
                    </div>
                    @for (entry of section.entries; track entry.option.value) {
                      <ng-container
                        [ngTemplateOutlet]="optionTpl"
                        [ngTemplateOutletContext]="{ $implicit: entry }"
                      />
                    }
                  </div>
                } @else {
                  @for (entry of section.entries; track entry.option.value) {
                    <ng-container
                      [ngTemplateOutlet]="optionTpl"
                      [ngTemplateOutletContext]="{ $implicit: entry }"
                    />
                  }
                }
              }
            } @else {
              <div
                role="presentation"
                [class]="s.empty"
                mnHook="autocomplete"
                mnPart="empty"
              >
                @if (hasContent(renderEmpty())) {
                  @if (templateOf(renderEmpty()); as tpl) {
                    <ng-container [ngTemplateOutlet]="tpl" />
                  } @else {
                    {{ renderEmpty() }}
                  }
                } @else {
                  <div
                    [class]="emptyStyles.empty"
                    role="status"
                    [attr.aria-labelledby]="emptyDescriptionId"
                    mnHook="empty"
                  >
                    <div
                      [class]="emptyStyles.iconWrapper"
                      mnHook="empty"
                      mnPart="icon"
                    >
                      <svg
                        mnIcon="Inbox"
                        size="40"
                        [class]="emptyStyles.defaultIcon"
                      ></svg>
                    </div>
                    <div
                      [attr.id]="emptyDescriptionId"
                      [class]="emptyStyles.description"
                      mnHook="empty"
                      mnPart="description"
                    >
                      {{ scope.t("empty.description") }}
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    }

    <ng-template #optionTpl let-entry>
      <div
        [class]="optionClass(entry)"
        [style]="entry.option.style ?? null"
        role="option"
        tabindex="-1"
        [attr.id]="optionId(entry.index)"
        [attr.aria-selected]="activeIndex() === entry.index"
        [attr.aria-disabled]="entry.option.disabled ? 'true' : null"
        (mousedown)="$event.preventDefault()"
        (click)="onOptionClick(entry.option)"
        (keydown)="onOptionKeyDown($event, entry.option)"
        (mouseenter)="hoveredIndex.set(entry.index)"
        (mouseleave)="hoveredIndex.set(-1)"
        mnHook="autocomplete"
        mnPart="item"
        [mnStates]="{
          highlighted: isHighlighted(entry.index),
          disabled: !!entry.option.disabled,
        }"
      >
        @if (mode() === "custom" && renderOption(); as tpl) {
          <ng-container
            [ngTemplateOutlet]="tpl"
            [ngTemplateOutletContext]="{ $implicit: entry.option }"
          />
        } @else {
          <div [class]="s.basicOption">
            @if (hasContent(entry.option.icon)) {
              <span [class]="s.icon">
                @if (templateOf(entry.option.icon); as tpl) {
                  <ng-container [ngTemplateOutlet]="tpl" />
                } @else {
                  {{ entry.option.icon }}
                }
              </span>
            }
            <div [class]="s.content">
              <div [class]="s.label">{{ entry.option.label }}</div>
              @if (entry.option.description) {
                <div [class]="s.description">
                  {{ entry.option.description }}
                </div>
              }
            </div>
          </div>
        }
      </div>
    </ng-template>
  `,
})
export class MnAutoComplete extends MnFormValueControl<string> {
  /** Input text (two-way: `[(value)]`; `valueChange` reports typing, picking and Escape clearing) */
  readonly value = model<string | undefined>(undefined);
  /** Initial input text when `value` is not bound @default "" */
  readonly defaultValue = input<string>("");
  /** Whether the dropdown is open (two-way: `[(open)]`, React's onDropdownVisibleChange) @default false */
  readonly open = model<boolean>(false);
  /**
   * Options to suggest
   * @default []
   */
  readonly options = input<readonly AutoCompleteOption[]>(EMPTY_OPTIONS);
  /** Name of the input */
  readonly name = input<string | undefined>(undefined);
  /**
   * Label of the input (without it, give the input an accessible name with
   * `aria-label` or an enclosing `<mn-form-control>` label)
   */
  readonly label = input<string | undefined>(undefined);
  /**
   * "basic" renders icon / label / description; "custom" uses renderOption
   * @default "basic"
   */
  readonly mode = input<AutoCompleteMode>("basic");
  /** Returns the group name of an option; options are grouped under headings */
  readonly groupBy = input<
    ((option: AutoCompleteOption) => string) | undefined
  >(undefined);
  /**
   * How groupBy groups options: "first" collects each group at its first
   * appearance; "adjacent" groups runs of consecutive options (a group can
   * appear several times). Options whose group is "" get no heading
   * @default "first"
   */
  readonly groupMode = input<AutoCompleteGroupMode>("first");
  /** Custom option template (`let-option`), used when mode is "custom" */
  readonly renderOption = input<
    TemplateRef<AutoCompleteOptionContext> | undefined
  >(undefined);
  /** Custom content (string or template) shown when no option matches */
  readonly renderEmpty = input<MnContent>(undefined);
  /**
   * Shows a loading indicator in the dropdown
   * @default false
   */
  readonly loading = input(false, { transform: booleanAttribute });
  /** Custom filter; by default options whose label contains the input (case-insensitive) are shown */
  readonly filterOption = input<
    ((inputValue: string, option: AutoCompleteOption) => boolean) | undefined
  >(undefined);
  /** Compare function used to sort the filtered options */
  readonly sortOption = input<
    ((a: AutoCompleteOption, b: AutoCompleteOption) => number) | undefined
  >(undefined);
  /**
   * Preferred dropdown side; the dropdown is aligned with the input's start
   * edge, is at least as wide as the input, and flips / shifts to stay in the
   * viewport
   * @default "bottom"
   */
  readonly placement = input<AutoCompletePlacement>("bottom");
  /**
   * Dropdown offset in pixels. For top / bottom placements `y` is the gap to
   * the input and `x` shifts along it; for left / right placements `x` is
   * the gap and `y` shifts along it
   * @default { x: 0, y: 4 }
   */
  readonly offset = input<{ x: number; y: number }>(DEFAULT_OFFSET);
  /**
   * Animates the dropdown when it opens
   * @default true
   */
  readonly animation = input(true, { transform: booleanAttribute });
  /**
   * Additional class of the dropdown (portalled) element. It can set the CSS
   * custom properties `--auto-complete-dropdown-background`,
   * `--auto-complete-option-hover-background` and
   * `--auto-complete-option-highlight-background`
   */
  readonly dropdownClassName = input<string | undefined>(undefined);
  /**
   * Makes the first enabled option active whenever the dropdown opens or the
   * options change, so Enter picks it right away
   * @default false
   */
  readonly autoHighlight = input(false, { transform: booleanAttribute });
  /**
   * Writes the label of the picked option into the input. Set to false to
   * keep the typed text, e.g. when picking navigates away
   * @default true
   */
  readonly fillOnSelect = input(true, { transform: booleanAttribute });
  /** Additional class of the root element */
  readonly className = input<string | undefined>(undefined);

  // React's inputProps (the nested Input)
  /** Placeholder of the input */
  readonly placeholder = input<string | undefined>(undefined);
  /** Size of the input @default "medium" */
  readonly size = input<AutoCompleteSize>("medium");
  /** Visual style of the input @default "outline" */
  readonly variant = input<AutoCompleteVariant>("outline");
  /** Error state; sets aria-invalid @default false */
  readonly invalid = input(false, { transform: booleanAttribute });
  /** Disables the input (an explicit `false` opts out of the field's / form's disabled state) */
  readonly disabled = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Read-only: focusable and submitted, no dropdown @default false */
  readonly readOnly = input(false, { transform: booleanAttribute });
  /** Native `required` of the input @default false */
  readonly required = input(false, { transform: booleanAttribute });
  /** id of the input (default: the field's, else generated) */
  readonly id = input<string | undefined>(undefined);
  /** Content (string or template) before the text */
  readonly prefix = input<MnContent>(undefined);
  /** Content (string or template) after the text */
  readonly suffix = input<MnContent>(undefined);
  /** Shows a clear button while there is text @default false */
  readonly clearable = input(false, { transform: booleanAttribute });
  /** Accessible label of the clear button (default: the localized "Clear") */
  readonly clearLabel = input<string | undefined>(undefined);
  /** Accessible name of the input */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: "aria-labelledby",
  });
  readonly ariaDescribedby = input<string | undefined>(undefined, {
    alias: "aria-describedby",
  });

  /** An option was picked with the mouse or the keyboard (React's onSelect) */
  readonly optionSelect = output<AutoCompleteOption>();
  /** An option was clicked with the mouse (React's onOptionClick) */
  readonly optionClick = output<AutoCompleteOption>();
  /**
   * Enter was pressed while no option is active, with non-blank text: the
   * trimmed text (React's onSubmit); the dropdown closes
   */
  readonly valueSubmit = output<string>();

  protected readonly s = s;
  protected readonly inputStyles = inputStyles;
  protected readonly emptyStyles = emptyStyles;
  protected readonly hasContent = hasContent;
  protected readonly templateOf = templateOf;
  protected readonly scope = injectScope();
  protected readonly progressClass = cn(
    progressIndicatorStyles.progressIndicator,
    progressIndicatorStyles.primary,
  );
  protected readonly spinnerClass = cn(
    progressIndicatorStyles.spinner,
    progressIndicatorStyles.medium,
  );
  protected readonly progressStates = {
    variant: "spinner",
    size: "medium",
    color: "primary",
  } as const;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly baseId = injectId("auto-complete");
  protected readonly listboxId = `${this.baseId}-listbox`;
  protected readonly emptyDescriptionId = `${this.baseId}-empty`;
  protected readonly fieldContext = injectFormField();
  protected readonly field = fieldWiring(this.fieldContext, {
    id: () => this.id(),
    describedBy: () => this.ariaDescribedby(),
    invalid: () => this.invalid() || this.controlInvalid(),
    readOnly: () => this.readOnly(),
    required: () => this.required(),
  });
  protected readonly inputId = computed(
    () => this.field.id() ?? `${this.baseId}-input`,
  );
  protected readonly isDisabled = computed(
    () =>
      this.disabled() ??
      (this.formDisabled() || (this.fieldContext?.disabled() ?? false)),
  );
  protected readonly isInvalid = computed(() => this.field.invalid());
  private readonly blocked = computed(
    () => this.isDisabled() || this.field.readOnly(),
  );
  /** A disabled / read-only field never shows the dropdown */
  protected readonly shown = computed(() => this.open() && !this.blocked());
  /** The input text */
  protected readonly text = computed(
    () => this.value() ?? this.defaultValue() ?? "",
  );

  private readonly focusedIndex = signal(-1);
  protected readonly hoveredIndex = signal(-1);
  /** IME composition in progress: Enter / arrows belong to the IME */
  protected composing = false;
  /** The Escape keydown that closed the dropdown (the layer runs first) */
  private layerEscape: KeyboardEvent | null = null;

  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>("input");
  private readonly popupRef = viewChild<ElementRef<HTMLElement>>("popup");

  /** Final placement of the dropdown (after flipping) */
  private readonly position = linkedSignal<Placement>(
    () => PLACEMENT[this.placement()],
  );

  protected readonly processed = computed(() => {
    const text = this.text();
    const search = text.toLowerCase();
    const filter = this.filterOption();
    const sort = this.sortOption();
    const result = this.options().filter((option) =>
      filter
        ? filter(text, option)
        : option.label.toLowerCase().includes(search),
    );
    return sort ? [...result].sort(sort) : result;
  });

  /** Option sections in display order (one heading-less section without groupBy) */
  protected readonly sections = computed<OptionSection[]>(() => {
    const options = this.processed();
    const groupBy = this.groupBy();
    if (!groupBy) {
      return [
        {
          key: "",
          label: null,
          entries: options.map((option, index) => ({ option, index })),
        },
      ];
    }
    const groups: [string, AutoCompleteOption[]][] = [];
    if (this.groupMode() === "adjacent") {
      for (const option of options) {
        const group = groupBy(option);
        const last = groups[groups.length - 1];
        if (last && last[0] === group) last[1].push(option);
        else groups.push([group, [option]]);
      }
    } else {
      const map = new Map<string, AutoCompleteOption[]>();
      for (const option of options) {
        const group = groupBy(option);
        const list = map.get(group);
        if (list) list.push(option);
        else map.set(group, [option]);
      }
      groups.push(...map.entries());
    }
    let index = 0;
    return groups.map(([group, list], groupIndex) => ({
      key: `${groupIndex}-${group}`,
      label: group,
      entries: list.map((option) => ({ option, index: index++ })),
    }));
  });

  /** Options in display order; keyboard / hover indexes refer to this list */
  protected readonly navigable = computed(() =>
    this.sections().flatMap((section) =>
      section.entries.map((entry) => entry.option),
    ),
  );

  /** With autoHighlight the first enabled option is active until the user moves */
  protected readonly activeIndex = computed(() => {
    const focused = this.focusedIndex();
    if (focused >= 0) return focused;
    if (this.autoHighlight() && this.shown()) {
      return this.navigable().findIndex((option) => !option.disabled);
    }
    return -1;
  });

  protected readonly activeOptionId = computed(() =>
    this.shown() && this.activeIndex() >= 0
      ? this.optionId(this.activeIndex())
      : null,
  );

  /** Closed with text: Escape clears it instead of closing an enclosing overlay */
  protected readonly escapeConsumer = computed(
    () => !this.shown() && this.text() !== "",
  );

  protected readonly showClear = computed(
    () =>
      this.clearable() &&
      this.text() !== "" &&
      !this.isDisabled() &&
      !this.field.readOnly(),
  );

  protected readonly rootClass = computed(() =>
    cn(s.autoComplete, this.className()),
  );
  protected readonly fieldClass = computed(() =>
    cn(
      inputStyles.root,
      classOf(inputStyles, this.variant()),
      classOf(inputStyles, this.size()),
      this.isInvalid() && inputStyles.invalid,
      this.isDisabled() && inputStyles.disabled,
    ),
  );
  protected readonly fieldStates = computed(() => ({
    disabled: this.isDisabled(),
    invalid: this.isInvalid(),
    readonly: this.field.readOnly(),
    required: this.field.required(),
    size: this.size(),
    variant: this.variant(),
  }));
  protected readonly popupClass = computed(() =>
    cn(s.popup, this.dropdownClassName()),
  );
  protected readonly dropdownClass = computed(() =>
    cn(s.dropdown, this.animation() && s.animated),
  );
  protected readonly contentStates = computed(() => {
    const placement = this.position();
    const { side, align } = parsePlacement(placement);
    return { state: "open", side, align, placement };
  });

  constructor() {
    super();
    const vertical = () =>
      this.placement() === "top" || this.placement() === "bottom";
    anchoredPosition({
      anchor: () => this.host.nativeElement,
      floating: () => this.popupRef()?.nativeElement,
      active: () => this.shown(),
      matchAnchorWidth: "min",
      options: () => {
        const offset = this.offset();
        return {
          placement: PLACEMENT[this.placement()],
          offset: {
            mainAxis: vertical() ? offset.y : offset.x,
            crossAxis: vertical() ? offset.x : offset.y,
          },
        };
      },
      onPosition: (result) => this.position.set(result.placement),
    });
    overlayLayer({
      element: () => this.popupRef()?.nativeElement,
      active: () => this.shown(),
      focus: false,
      // the field (label, input, addons) is part of the dropdown layer
      branches: () => [this.host.nativeElement],
      onEscapeKeyDown: (event) => {
        // Escape during IME composition cancels the composition only
        if (this.composing || event.isComposing) return false;
        // closing the list is this Escape's whole effect (no clearing)
        this.layerEscape = event;
        const popup = this.popupRef()?.nativeElement;
        if (popup?.contains(popup.ownerDocument.activeElement)) {
          this.inputRef()?.nativeElement.focus();
        }
        return undefined;
      },
      onDismiss: () => this.closeDropdown(),
    });
    // Keep the keyboard-focused option scrolled into view
    afterRenderEffect(() => {
      const id = this.activeOptionId();
      const popup = this.popupRef()?.nativeElement;
      if (!id || !popup) return;
      untracked(() => {
        const option = popup.ownerDocument.getElementById(id);
        option?.scrollIntoView?.({ block: "nearest" });
      });
    });
  }

  override writeValue(value: string | null | undefined): void {
    this.value.set(value ?? "");
  }

  protected optionId(index: number): string {
    return `${this.listboxId}-option-${index}`;
  }

  protected isHighlighted(index: number): boolean {
    return this.hoveredIndex() === index || this.activeIndex() === index;
  }

  protected optionClass(entry: OptionEntry): string {
    const { option, index } = entry;
    return cn(s.optionItem, {
      [s.disabled]: !!option.disabled,
      [s.highlight]: !!option.highlight,
      [s.active]: this.isHighlighted(index),
    });
  }

  private setText(next: string): void {
    if (next === this.text()) return;
    this.value.set(next);
    this.notifyChange(next);
  }

  private setOpen(next: boolean): void {
    if (next !== this.open()) this.open.set(next);
  }

  protected openDropdown(): void {
    if (!this.blocked()) this.setOpen(true);
  }

  private closeDropdown(): void {
    this.setOpen(false);
    this.focusedIndex.set(-1);
  }

  private moveFocus(step: 1 | -1): void {
    const options = this.navigable();
    const count = options.length;
    if (count === 0) return;
    // from "nothing focused", ArrowDown starts at the first option and
    // ArrowUp at the last one
    const active = this.activeIndex();
    let index = active >= 0 ? active : step === 1 ? -1 : count;
    for (let i = 0; i < count; i += 1) {
      index = (index + step + count) % count;
      if (!options[index].disabled) {
        this.focusedIndex.set(index);
        return;
      }
    }
  }

  private selectOption(option: AutoCompleteOption): void {
    if (option.disabled) return;
    if (this.fillOnSelect()) this.setText(option.label);
    this.closeDropdown();
    this.optionSelect.emit(option);
  }

  protected onInput(next: string): void {
    this.setText(next);
    this.focusedIndex.set(-1);
    this.openDropdown();
  }

  protected onBlur(event: FocusEvent): void {
    this.notifyTouched();
    const next = event.relatedTarget as Node | null;
    if (
      next &&
      (this.popupRef()?.nativeElement.contains(next) ||
        this.host.nativeElement.contains(next))
    ) {
      return;
    }
    this.closeDropdown();
  }

  /** Clicking the still-focused input (after a pick or Escape) reopens the dropdown */
  protected onInputClick(): void {
    if (!this.open()) this.openDropdown();
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
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        if (!this.open()) this.openDropdown();
        this.moveFocus(event.key === "ArrowDown" ? 1 : -1);
        break;
      case "Enter": {
        const option = this.shown()
          ? this.navigable()[this.activeIndex()]
          : undefined;
        const text = this.text().trim();
        if (option) {
          event.preventDefault();
          this.selectOption(option);
        } else if (text) {
          // No active option: submit the typed text (e.g. a search)
          event.preventDefault();
          this.valueSubmit.emit(text);
          this.closeDropdown();
        }
        break;
      }
      case "Escape":
        // Open: the dropdown's dismissable layer closes it (topmost only).
        // Closed: clears the text (APG combobox).
        if (event !== this.layerEscape && !this.shown() && this.text() !== "") {
          event.preventDefault();
          this.setText("");
          this.focusedIndex.set(-1);
        }
        break;
      default:
        break;
    }
  }

  protected onOptionClick(option: AutoCompleteOption): void {
    if (option.disabled || this.composing) return;
    this.selectOption(option);
    this.optionClick.emit(option);
    this.inputRef()?.nativeElement.focus();
  }

  protected onOptionKeyDown(
    event: KeyboardEvent,
    option: AutoCompleteOption,
  ): void {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    this.onOptionClick(option);
  }

  /** The clear button: empties the text, keeps focus in the field */
  protected clearText(): void {
    this.onInput("");
    this.inputRef()?.nativeElement.focus();
  }

  /** The native `<input>` (React's ref) */
  get inputElement(): HTMLInputElement | undefined {
    return this.inputRef()?.nativeElement;
  }

  /** Focuses the input */
  focus(options?: FocusOptions): void {
    this.inputRef()?.nativeElement.focus(options);
  }
}
