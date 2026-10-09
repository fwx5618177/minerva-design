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
  numberAttribute,
  output,
  signal,
  untracked,
  viewChild,
} from "@angular/core";
import { cn, findCascaderPath, flattenCascaderOptions } from "@minerva/core";
import {
  getDirection,
  parsePlacement,
  type AnchoredPositionResult,
} from "@minerva/dom";
import { injectScope } from "../../config/scope";
import {
  MnFormValueControl,
  fieldWiring,
  injectFormField,
  provideValueAccessor,
} from "../../internal/forms";
import { MnHook } from "../../internal/hooks";
import { MnIcon } from "../../internal/icon";
import { anchoredPosition, overlayLayer } from "../../internal/overlay";
import { MnPortal } from "../../internal/portal";
import { cascaderStyles as s, inputStyles } from "../../internal/styles";
import {
  MnCascaderPanel,
  type CascaderActivateEvent,
  type CascaderOption,
  type CascaderOptionContext,
  type CascaderStyle,
  type CascaderValue,
} from "./cascader-panel";

/** A path was selected or the value was cleared (`selectionChange` output) */
export interface CascaderSelectionChange {
  /** Selected path of values (`[]` when cleared) */
  value: CascaderValue;
  /** Options of the selected path */
  selectedOptions: CascaderOption[];
}

const EMPTY_VALUE: CascaderValue = [];

const optionalBoolean = (value: unknown): boolean | undefined =>
  value === undefined || value === null ? undefined : booleanAttribute(value);

const widthAttribute = (value: unknown): number | string => {
  if (typeof value === "number") return value;
  const text = String(value ?? "");
  return /^\d+(\.\d+)?$/.test(text) ? Number(text) : text;
};

/**
 * Cascader: pick a value from a tree of options, one column per level.
 * Supports search (`showSearch`), lazy loading (`loadData`), hover expansion
 * and full keyboard navigation (combobox input: Enter / Space / ArrowDown
 * open and move into the columns, Escape closes). Same DOM, classes and
 * styling hooks as React's Cascader (the host element is the root; the
 * field renders the DOM of React's unstyled Input).
 *
 * Two-way binding: `[(value)]` (path of values), `ngModel` or a Reactive
 * Forms control; `[(open)]` for the dropdown. Inside `<mn-form-control>` it
 * takes the field's id, label, description, invalid / required / read-only /
 * disabled states (explicit inputs win).
 *
 * @example
 * <mn-cascader label="City" name="city" [options]="options" [(value)]="city" />
 * <mn-cascader label="City" name="city" [options]="options" showSearch formControlName="city" />
 */
@Component({
  selector: "mn-cascader",
  exportAs: "mnCascader",
  imports: [MnHook, MnIcon, MnPortal, MnCascaderPanel],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(() => MnCascader)],
  host: {
    "[class]": "s.cascader",
    "[style.width]": "widthStyle()",
    "[attr.id]": "null",
    "[attr.aria-label]": "null",
    "[attr.aria-labelledby]": "null",
    "[attr.aria-describedby]": "null",
    "[attr.data-minerva]": '"cascader"',
    "[attr.data-part]": '"root"',
    "[attr.data-state]": 'isOpen() ? "open" : "closed"',
    "[attr.data-disabled]": 'isDisabled() ? "" : null',
    "[attr.data-readonly]": 'isReadOnly() ? "" : null',
    "[attr.data-invalid]": 'isInvalid() ? "" : null',
    "(focusout)": "onFocusOut($event)",
  },
  template: `
    <!-- Pointer convenience: clicking the selector toggles the dropdown;
         keyboard users get the same through the combobox input. -->
    <div
      [class]="selectorClass()"
      (click)="onSelectorClick()"
      mnHook="cascader"
      mnPart="control"
    >
      <div
        [class]="inputRootClass()"
        data-component="input"
        mnHook="input"
        [mnStates]="inputStates()"
      >
        <input
          #input
          [class]="inputStyles.field"
          [attr.id]="fieldIds.id()"
          [attr.aria-label]="ariaLabel() ?? label()"
          [attr.aria-labelledby]="labelledBy()"
          [attr.aria-describedby]="fieldIds.describedBy()"
          [attr.aria-invalid]="isInvalid() ? 'true' : null"
          [attr.aria-required]="isRequired() ? 'true' : null"
          [attr.aria-readonly]="showSearch() && isReadOnly() ? 'true' : null"
          [required]="isRequired()"
          [attr.name]="name()"
          [value]="displayValue()"
          [readOnly]="!showSearch() || isReadOnly()"
          [disabled]="isDisabled()"
          [attr.placeholder]="placeholderText()"
          type="text"
          role="combobox"
          aria-haspopup="listbox"
          [attr.aria-expanded]="isOpen()"
          [attr.aria-autocomplete]="showSearch() ? 'list' : null"
          (input)="onInput($event)"
          (keydown)="onInputKeyDown($event)"
          mnHook="input"
          mnPart="input"
        />
      </div>
      @if (showClear()) {
        <button
          type="button"
          [class]="s.clearIcon"
          [attr.aria-label]="scope.t('cascader.clear')"
          mnHook="cascader"
          mnPart="clear-button"
          (click)="onClear($event)"
        >
          <svg mnIcon="X" [class]="s.icon"></svg>
        </button>
      }
      <span
        [class]="arrowClass()"
        aria-hidden="true"
        mnHook="cascader"
        mnPart="icon"
      >
        <svg mnIcon="ChevronDown" [class]="s.icon"></svg>
      </span>
    </div>
    @if (isOpen()) {
      <!-- The popup only delegates events bubbling up from the focusable
           options inside it (Tab, keeping focus on mousedown); Escape and
           outside pointer down are handled by its dismissable layer. -->
      <div
        *mnPortal
        #dropdown
        [class]="dropdownClass()"
        [style]="dropdownStyle() ?? null"
        mnHook="cascader"
        mnPart="content"
        [mnStates]="contentStates()"
        (mousedown)="onDropdownMouseDown($event)"
        (focusout)="onFocusOut($event)"
        (keydown)="onDropdownKeyDown($event)"
      >
        @if (searching()) {
          <div
            [class]="s.searchResults"
            role="listbox"
            [attr.aria-label]="label()"
            tabindex="-1"
            (keydown)="onResultsKeyDown($event)"
          >
            @for (result of searchResults(); track result.key) {
              <div
                [class]="s.searchOption"
                mnHook="cascader"
                mnPart="item"
                role="option"
                aria-selected="false"
                tabindex="0"
                (keydown)="onResultKeyDown($event, result.path)"
                (click)="select(result.path)"
              >
                {{ result.text }}
              </div>
            } @empty {
              <div [class]="s.empty" role="status">
                {{ scope.t("cascader.noResults") }}
              </div>
            }
          </div>
        } @else {
          <mn-cascader-panel
            [label]="label()"
            [options]="options()"
            [expandedPath]="expandedPath()"
            [selectedPath]="selectedOptions()"
            [expandTrigger]="expandTrigger()"
            [maxLevel]="maxLevel()"
            [optionStyle]="optionStyle()"
            [optionRender]="optionRender()"
            [autoFocus]="focusPanel()"
            (activate)="onActivate($event)"
            (hoverExpand)="expandedValues.set(valuesOf($event))"
            (exit)="closeDropdown(true)"
          />
        }
      </div>
    }
  `,
})
export class MnCascader extends MnFormValueControl<CascaderValue | null> {
  /** Label of the input (its accessible name unless `aria-label` / a field label) */
  readonly label = input.required<string>();
  /** Name of the input */
  readonly name = input.required<string>();
  /** Option tree @default [] */
  readonly options = input<CascaderOption[]>([]);
  /** Selected path of values (two-way: `[(value)]`) */
  readonly value = model<CascaderValue | undefined>(undefined);
  /** Initially selected path of values (when `value` is not bound) */
  readonly defaultValue = input<CascaderValue | undefined>(undefined);
  /** Whether the dropdown is open (two-way: `[(open)]`) @default false */
  readonly open = model(false);
  /** Formats the text shown in the input; by default labels are joined with " / " */
  readonly displayRender = input<
    | ((labels: string[], selectedOptions: CascaderOption[]) => string)
    | undefined
  >(undefined);
  /**
   * Disables the cascader; defaults to the enclosing field's / form's state
   * @default false
   */
  readonly disabled = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /**
   * Placeholder of the input
   * @default "Please select" (localized)
   */
  readonly placeholder = input<string | undefined>(undefined);
  /** Shows a clear button when a value is selected @default true */
  readonly allowClear = input(true, { transform: booleanAttribute });
  /** How sub-menus are expanded @default "click" */
  readonly expandTrigger = input<"click" | "hover">("click");
  /**
   * Accessible label of the input; overrides `label` and the label of an
   * enclosing field
   */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  /** Id(s) of the element(s) labelling the input */
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: "aria-labelledby",
  });
  /**
   * Id(s) of the element(s) describing the input; merged with the helper /
   * error text of an enclosing field
   */
  readonly ariaDescribedby = input<string | undefined>(undefined, {
    alias: "aria-describedby",
  });
  /** Id of the input; defaults to the id of an enclosing field */
  readonly id = input<string | undefined>(undefined);
  /** Marks the input as required; defaults to the enclosing field's state */
  readonly required = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /**
   * Shows the value without allowing changes (the dropdown does not open);
   * defaults to the enclosing field's state
   */
  readonly readOnly = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Marks the input as invalid; defaults to the enclosing field's state */
  readonly invalid = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Allows typing to search all paths @default false */
  readonly showSearch = input(false, { transform: booleanAttribute });
  /** Custom search predicate; by default paths whose labels contain the input match */
  readonly filter = input<
    ((inputValue: string, path: CascaderOption[]) => boolean) | undefined
  >(undefined);
  /**
   * Loads children lazily: clicking an option that has no children and is
   * not isLeaf expands it and calls loadData with its path (instead of
   * selecting it). Add the children to `options` yourself; set `loading` on
   * the option meanwhile
   */
  readonly loadData = input<
    ((selectedOptions: CascaderOption[]) => void) | undefined
  >(undefined);
  /** Additional class name of the dropdown */
  readonly dropdownClassName = input<string | undefined>(undefined);
  /** Custom option renderer (`<ng-template let-option let-level="level">`) */
  readonly optionRender = input<TemplateRef<CascaderOptionContext> | null>(
    null,
  );
  /** Width of the component (number: px) @default 240 */
  readonly width = input<number | string, unknown>(240, {
    transform: widthAttribute,
  });
  /** Maximum number of levels shown @default 6 */
  readonly maxLevel = input(6, { transform: numberAttribute });
  /** Inline styles of the dropdown */
  readonly dropdownStyle = input<CascaderStyle | undefined>(undefined);
  /** Inline styles of every option */
  readonly optionStyle = input<CascaderStyle | undefined>(undefined);

  /**
   * A leaf was selected or the value was cleared, with the selected options
   * (React `onChange(value, selectedOptions)`; `valueChange` emits the value)
   */
  readonly selectionChange = output<CascaderSelectionChange>();
  /** The clear button emptied the value */
  readonly clear = output<void>();
  /** The search text changed (`showSearch`) */
  readonly search = output<string>();

  protected readonly s = s;
  protected readonly inputStyles = inputStyles;
  protected readonly scope = injectScope();
  private readonly fieldContext = injectFormField();
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>("input");
  private readonly dropdownRef =
    viewChild<ElementRef<HTMLDivElement>>("dropdown");

  protected readonly fieldIds = fieldWiring(this.fieldContext, {
    id: () => this.id(),
    describedBy: () => this.ariaDescribedby(),
  });
  // explicit inputs win over the field (React: `prop ?? fc?.prop ?? false`)
  protected readonly isDisabled = computed(
    () =>
      this.disabled() ??
      (this.formDisabled() || (this.fieldContext?.disabled() ?? false)),
  );
  protected readonly isReadOnly = computed(
    () => this.readOnly() ?? this.fieldContext?.readOnly() ?? false,
  );
  protected readonly isRequired = computed(
    () => this.required() ?? this.fieldContext?.required() ?? false,
  );
  protected readonly isInvalid = computed(
    () =>
      this.invalid() ??
      ((this.fieldContext?.invalid() ?? false) || this.controlInvalid()),
  );
  protected readonly labelledBy = computed(
    () =>
      this.ariaLabelledby() ??
      (this.fieldContext && !this.ariaLabel()
        ? this.fieldContext.labelId()
        : null),
  );

  protected readonly selectedValue = computed(
    () => this.value() ?? this.defaultValue() ?? EMPTY_VALUE,
  );
  protected readonly selectedOptions = computed(() =>
    findCascaderPath(this.options(), this.selectedValue()),
  );
  protected readonly isOpen = computed(
    () => this.open() && !this.isDisabled() && !this.isReadOnly(),
  );
  /** Opened from the keyboard: focus moves into the panel */
  protected readonly focusPanel = signal(false);
  /** Expanded path: the selected one on every opening */
  protected readonly expandedValues = linkedSignal<boolean, CascaderValue>({
    source: this.isOpen,
    computation: () => untracked(this.selectedValue),
  });
  protected readonly expandedPath = computed(() =>
    findCascaderPath(this.options(), this.expandedValues()),
  );
  private readonly searchValue = signal("");
  protected readonly searching = computed(
    () => this.showSearch() && this.searchValue() !== "",
  );
  protected readonly searchResults = computed(() => {
    if (!this.searching()) return [];
    const text = this.searchValue();
    const needle = text.toLowerCase();
    const filter = this.filter();
    return flattenCascaderOptions(this.options())
      .filter(({ path }) =>
        filter
          ? filter(text, path)
          : path.some((o) => String(o.label).toLowerCase().includes(needle)),
      )
      .map(({ path }) => ({
        path,
        key: path.map((o) => o.value).join("/"),
        text: path.map((o) => o.label).join(" / "),
      }));
  });

  protected readonly displayValue = computed(() => {
    if (this.searching()) return this.searchValue();
    const selected = this.selectedOptions();
    const labels = selected.map((o) => String(o.label));
    const render = this.displayRender();
    return render ? render(labels, selected) : labels.join(" / ");
  });
  protected readonly placeholderText = computed(
    () => this.placeholder() ?? this.scope.t("cascader.placeholder"),
  );
  protected readonly showClear = computed(
    () =>
      this.allowClear() &&
      this.selectedValue().length > 0 &&
      !this.isDisabled() &&
      !this.isReadOnly(),
  );
  protected readonly widthStyle = computed(() => {
    const width = this.width();
    return typeof width === "number" ? `${width}px` : width;
  });

  /** Final placement of the dropdown (after flipping) */
  private readonly placement = signal<string>("bottom-start");
  protected readonly contentStates = computed(() => {
    const placement = this.placement();
    const { side, align } = parsePlacement(
      placement as AnchoredPositionResult["placement"],
    );
    return { state: "open", side, align, placement };
  });

  protected readonly selectorClass = computed(() =>
    cn(s.selector, {
      [s.disabled]: this.isDisabled(),
      [s.focused]: this.isOpen(),
    }),
  );
  protected readonly arrowClass = computed(() =>
    cn(s.arrow, this.isOpen() && s.open),
  );
  protected readonly inputRootClass = computed(() =>
    cn(
      inputStyles.root,
      inputStyles.unstyled,
      inputStyles.medium,
      this.isInvalid() && inputStyles.invalid,
      this.isDisabled() && inputStyles.disabled,
      s.input,
    ),
  );
  protected readonly inputStates = computed(() => ({
    disabled: this.isDisabled(),
    invalid: this.isInvalid(),
    readonly: !this.showSearch() || this.isReadOnly(),
    required: this.isRequired(),
    size: "medium",
    variant: "unstyled",
  }));
  protected readonly dropdownClass = computed(() =>
    cn(s.dropdown, this.dropdownClassName()),
  );

  constructor() {
    super();
    const dropdown = () => this.dropdownRef()?.nativeElement;
    anchoredPosition({
      anchor: () => this.host.nativeElement,
      floating: dropdown,
      active: () => this.isOpen(),
      placement: "bottom-start",
      offset: { mainAxis: 4 },
      matchAnchorWidth: "min",
      onPosition: (result) => this.placement.set(result.placement),
    });
    overlayLayer({
      element: dropdown,
      active: () => this.isOpen(),
      // the options receive focus: a non-trapping focus scope (an enclosing
      // modal's trap pauses while open), no auto / return focus
      focus: true,
      autoFocus: false,
      restoreFocus: () => false,
      branches: () => [this.host.nativeElement],
      onEscapeKeyDown: () => {
        const element = dropdown();
        const doc = element?.ownerDocument;
        if (element && doc && element.contains(doc.activeElement)) {
          this.inputRef()?.nativeElement.focus();
        }
      },
      onDismiss: () => this.closeDropdown(),
    });
    // Portals leave the anchor's `dir` subtree: keep its reading direction
    afterRenderEffect(() => {
      const element = dropdown();
      if (!element) return;
      const anchorDir = getDirection(this.host.nativeElement);
      const containerDir = getDirection(element.parentElement);
      if (anchorDir === containerDir) element.removeAttribute("dir");
      else element.setAttribute("dir", anchorDir);
    });
  }

  override writeValue(value: CascaderValue | null): void {
    this.value.set(value ?? EMPTY_VALUE);
  }

  protected valuesOf(path: CascaderOption[]): CascaderValue {
    return path.map((o) => o.value);
  }

  private openDropdown(fromKeyboard = false): void {
    if (this.isDisabled() || this.isReadOnly()) return;
    this.expandedValues.set(this.selectedValue());
    this.focusPanel.set(fromKeyboard);
    this.placement.set("bottom-start");
    this.open.set(true);
  }

  protected closeDropdown(returnFocus = false): void {
    this.open.set(false);
    this.focusPanel.set(false);
    this.searchValue.set("");
    if (returnFocus) this.inputRef()?.nativeElement.focus();
  }

  private emitValue(path: CascaderOption[]): void {
    const next = this.valuesOf(path);
    this.value.set(next);
    this.selectionChange.emit({ value: next, selectedOptions: path });
    this.notifyChange(next);
  }

  protected select(path: CascaderOption[]): void {
    this.emitValue(path);
    this.closeDropdown(true);
  }

  protected onActivate({ path, level }: CascaderActivateEvent): void {
    const option = path[path.length - 1];
    if (option.disabled) return;
    const atMaxLevel = level >= this.maxLevel() - 1;
    const hasChildren = Boolean(option.children?.length);
    const loadData = this.loadData();
    const lazy = Boolean(loadData) && !option.isLeaf && !option.children;
    if (!atMaxLevel && (hasChildren || lazy)) {
      this.expandedValues.set(this.valuesOf(path));
      if (lazy && !option.loading) loadData?.(path);
      return;
    }
    this.select(path);
  }

  protected onClear(event: MouseEvent): void {
    event.stopPropagation();
    this.emitValue([]);
    this.clear.emit();
    this.searchValue.set("");
    this.inputRef()?.nativeElement.focus();
  }

  protected onSelectorClick(): void {
    if (this.isDisabled() || this.isReadOnly()) return;
    if (!this.isOpen()) this.openDropdown();
    else if (!this.showSearch()) this.closeDropdown();
  }

  protected onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!this.showSearch() || this.isReadOnly()) {
      input.value = this.displayValue();
      return;
    }
    this.searchValue.set(input.value);
    this.search.emit(input.value);
    if (!this.isOpen()) this.openDropdown();
  }

  /** Focus leaving both the field and the dropdown closes it */
  protected onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    const inside = (node: Node | null) =>
      !!node &&
      (this.host.nativeElement.contains(node) ||
        !!this.dropdownRef()?.nativeElement.contains(node));
    if (!inside(next)) this.notifyTouched();
    if (!this.isOpen() || !next || inside(next)) return;
    this.closeDropdown();
  }

  private focusFirstSearchResult(): void {
    this.dropdownRef()
      ?.nativeElement.querySelector<HTMLElement>('[role="option"]')
      ?.focus();
  }

  protected onInputKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!this.isOpen()) this.openDropdown(true);
        else if (this.searching()) this.focusFirstSearchResult();
        else this.focusPanel.set(true);
        break;
      case "Enter":
        event.preventDefault();
        if (!this.isOpen()) this.openDropdown(true);
        break;
      case " ":
        if (this.showSearch()) break;
        event.preventDefault();
        if (!this.isOpen()) this.openDropdown(true);
        break;
      default:
        break;
    }
  }

  /** Keep focus where it is when clicking non-focusable areas */
  protected onDropdownMouseDown(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('[role="option"]')) {
      event.preventDefault();
    }
  }

  protected onDropdownKeyDown(event: KeyboardEvent): void {
    if (event.key === "Tab") this.closeDropdown();
  }

  protected onResultsKeyDown(event: KeyboardEvent): void {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const items = Array.from(
      (event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(
        '[role="option"]',
      ),
    );
    const index = items.indexOf(event.target as HTMLElement);
    event.preventDefault();
    const step = event.key === "ArrowDown" ? 1 : -1;
    items[(index + step + items.length) % items.length]?.focus();
  }

  protected onResultKeyDown(
    event: KeyboardEvent,
    path: CascaderOption[],
  ): void {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.select(path);
    }
  }

  /** Focuses the input */
  focus(options?: FocusOptions): void {
    this.inputRef()?.nativeElement.focus(options);
  }

  /** The inner `<input>` (React's `ref`) */
  get inputElement(): HTMLInputElement | undefined {
    return this.inputRef()?.nativeElement;
  }
}
