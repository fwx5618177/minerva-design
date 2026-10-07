import {
  css,
  html,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import { contains } from "@minerva/core";
import styles from "@lib-core-styles/components/Cascader/cascader.module.scss?inline";
import {
  FloatingLayerController,
  popoverResetStyles,
} from "../../controllers/floating-layer";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { getDirection } from "../../internal/dom";
import {
  FormAssociatedElement,
  type ValidityResult,
} from "../../internal/form";
import { IconChevronDown, IconChevronRight, IconX } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { hostStyles } from "../../internal/minerva-element";
import { sharedStyles } from "../../internal/styles";

/** One node of the option tree (same shape as lib-core's `CascaderOption`) */
export interface CascaderOption {
  /** Value of the option, unique among its siblings */
  value: string | number;
  /** Text displayed for the option */
  label: string | number;
  /** Options of the next level */
  children?: CascaderOption[];
  /** Prevents the option from being selected */
  disabled?: boolean;
  /** Marks the option as a leaf (no children to load) when using loadData */
  isLeaf?: boolean;
  /** Shows a loading indicator while its children are being loaded */
  loading?: boolean;
}

/** Selected path: one value per level */
export type CascaderValue = (string | number)[];

/** How sub-menus are expanded */
export type CascaderExpandTrigger = "click" | "hover";

/** `minerva-change` detail */
export interface CascaderChangeDetail {
  value: CascaderValue;
  selectedOptions: CascaderOption[];
}

/** Content returned by `optionRender` */
export type CascaderRenderResult = string | Node | TemplateResult;

/** Resolve the option chain for a list of values (one value per level) */
const findOptionsByValues = (
  opts: CascaderOption[],
  values: CascaderValue,
): CascaderOption[] => {
  const result: CascaderOption[] = [];
  let level: CascaderOption[] | undefined = opts;
  for (const value of values) {
    const found: CascaderOption | undefined = level?.find(
      (o) => o.value === value,
    );
    if (!found) break;
    result.push(found);
    level = found.children;
  }
  return result;
};

/** A flattened option together with the chain of options leading to it */
type SearchResult = { option: CascaderOption; path: CascaderOption[] };

const flattenOptions = (
  opts: CascaderOption[],
  path: CascaderOption[] = [],
): SearchResult[] =>
  opts.flatMap((option) => {
    if (option.disabled) return [];
    const current = [...path, option];
    return [
      { option, path: current },
      ...(option.children ? flattenOptions(option.children, current) : []),
    ];
  });

const samePath = (a: CascaderValue, b: CascaderValue) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

/** First duplicated sibling value of the tree, if any */
const findDuplicate = (opts: CascaderOption[]): string | number | undefined => {
  const seen = new Set<string | number>();
  for (const option of opts) {
    if (seen.has(option.value)) return option.value;
    seen.add(option.value);
    const nested = option.children ? findDuplicate(option.children) : undefined;
    if (nested !== undefined) return nested;
  }
  return undefined;
};

/**
 * `value` attribute: a JSON array (`'["zhejiang","hangzhou"]'`, keeps
 * numbers) or a comma-separated path (`"zhejiang,hangzhou"`).
 */
const pathConverter = {
  fromAttribute(raw: string | null): CascaderValue {
    const text = raw?.trim() ?? "";
    if (!text) return [];
    if (text.startsWith("[")) {
      try {
        const parsed: unknown = JSON.parse(text);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (v): v is string | number =>
              typeof v === "string" || typeof v === "number",
          );
        }
      } catch {
        // not JSON: fall back to the comma-separated form
      }
    }
    return text.split(",").map((v) => v.trim());
  },
  toAttribute(value: CascaderValue): string {
    return JSON.stringify(value);
  },
};

const OPTION_SELECTOR = '[role="option"]:not([aria-disabled="true"])';

let nextId = 0;

/**
 * Cascader (`<Cascader>` of lib-core): pick a value from a tree of options,
 * one column per level. Supports search (`show-search`), lazy loading
 * (`loadData`), hover expansion and full keyboard navigation (Enter / Space
 * / ArrowDown open from the field and focus the panel; arrows, Home / End
 * move within a column, ArrowRight / Enter expand, ArrowLeft goes back,
 * Escape closes and returns focus to the field).
 *
 * The option tree is the `options` property. `value` is the selected path
 * (array of values, one per level); the `value` attribute is the default
 * path (JSON array or comma-separated), restored by `form.reset()`.
 *
 * Form-associated: like lib-core's inner `<input name>`, the form value
 * is the displayed text (labels joined with " / ", or `displayRender`);
 * `required` makes an empty selection invalid; `<fieldset disabled>` and
 * `form.reset()` are supported.
 *
 * The panel is shown in the top layer (Popover API) but stays in the
 * element's shadow root, so it inherits the theme of its scope.
 *
 * @summary Hierarchical picker with one column per level, search and lazy loading.
 * @tag minerva-cascader
 * @csspart base - The root wrapper (`.cascader`)
 * @csspart selector - The field (`.selector`)
 * @csspart input - The native `<input role="combobox">`
 * @csspart clear-button - The clear button
 * @csspart arrow - The chevron
 * @csspart dropdown - The popup panel
 * @csspart column - A column of options (`role="listbox"`)
 * @csspart option - An option (column option or search result)
 * @fires minerva-change - A path was selected or the value was cleared (`detail: { value, selectedOptions }`)
 * @fires change - Same as `minerva-change`, without detail
 * @fires minerva-clear - The clear button emptied the value
 * @fires minerva-input - The search text changed (`show-search`; `detail: { value }`)
 * @fires minerva-open-change - The user asked to open / close the panel (`detail: { open }`); cancelable: `preventDefault()` keeps the current state
 */
export class MinervaCascader extends FormAssociatedElement {
  static override tagName = "minerva-cascader";
  static override shadowRootOptions = {
    ...FormAssociatedElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static override styles = [
    hostStyles,
    popoverResetStyles,
    css`
      :host {
        display: inline-block;
        width: 240px;
        vertical-align: middle;
      }
      .cascader {
        width: 100%;
      }
      /* lib-core's unstyled <Input> inside the selector */
      .input {
        --_input-pad-x: var(--input-padding-x, var(--control-padding-x-sm));
        position: relative;
        display: inline-flex;
        align-items: center;
        width: 100%;
        min-width: 0;
        min-height: var(--input-height, var(--control-height-md));
        background: transparent;
        border: 1px solid transparent;
        border-radius: var(--input-radius, var(--radius-lg));
        color: var(--text-color);
      }
      .input[data-disabled] {
        background-color: var(--surface-subtle-color);
        opacity: 0.6;
      }
      .field {
        flex: 1;
        align-self: stretch;
        min-width: 0;
        border: none;
        outline: none;
        background: transparent;
        padding: 0 var(--_input-pad-x);
        font: inherit;
        color: inherit;
      }
      .field::placeholder {
        color: var(--text-muted-color);
      }
      .field:disabled {
        cursor: not-allowed;
      }
      .clearIcon svg,
      .arrow svg {
        display: block;
      }
      .expandIcon {
        display: inline-flex;
      }
      :host(:dir(rtl)) .expandIcon {
        transform: scaleX(-1);
      }
    `,
    sharedStyles(styles),
  ];

  /** Option tree (property only) */
  @property({ attribute: false })
  options: CascaderOption[] = [];

  /** Selected path of values, one per level (property; the `value` attribute sets `defaultValue`) */
  @property({ attribute: false })
  value: CascaderValue = [];

  /**
   * Initially selected path, restored by `form.reset()` (the `value`
   * attribute: JSON array or comma-separated values)
   */
  @property({ attribute: "value", converter: pathConverter })
  defaultValue: CascaderValue = [];

  /** Whether the panel is open */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Label of the field (accessible name fallback; names the columns) */
  @property()
  label = "";

  /** Placeholder (default: localized "Please select") */
  @property()
  placeholder?: string;

  /** Error state; sets aria-invalid */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /** Shows the value without allowing changes (the panel does not open) */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /** Hides the clear button (lib-core `allowClear={false}`) */
  @property({ type: Boolean, attribute: "hide-clear-button" })
  hideClearButton = false;

  /** How sub-menus are expanded */
  @property({ attribute: "expand-trigger", reflect: true })
  expandTrigger: CascaderExpandTrigger = "click";

  /** Allows typing to search all paths */
  @property({ type: Boolean, attribute: "show-search", reflect: true })
  showSearch = false;

  /** Maximum number of levels shown */
  @property({ type: Number, attribute: "max-level" })
  maxLevel = 6;

  /** Width of the component (number = px), like the React Cascader */
  @property()
  width?: string | number = 240;

  /** Formats the text of the field; by default labels are joined with " / " */
  @property({ attribute: false })
  displayRender?: (
    labels: string[],
    selectedOptions: CascaderOption[],
  ) => string;

  /** Custom search predicate; by default paths whose labels contain the text match */
  @property({ attribute: false })
  filter?: (inputValue: string, path: CascaderOption[]) => boolean;

  /**
   * Loads children lazily: activating an option without children that is
   * not `isLeaf` expands it and calls `loadData(path)` instead of selecting
   * it. Add the children to `options` yourself (set `loading` meanwhile)
   */
  @property({ attribute: false })
  loadData?: (selectedOptions: CascaderOption[]) => void;

  /** Custom option content */
  @property({ attribute: false })
  optionRender?: (
    option: CascaderOption,
    level: number,
  ) => CascaderRenderResult;

  @state()
  private expandedValues: CascaderValue = [];

  @state()
  private searchValue = "";

  @query("input")
  private input?: HTMLInputElement;

  @query(".cascader")
  private anchor?: HTMLElement;

  @query(".dropdown")
  private dropdown?: HTMLElement;

  private readonly idPrefix = `minerva-cascader-${nextId++}`;
  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);
  private readonly floating = new FloatingLayerController(this, () => ({
    anchor: () => this.anchor,
    floating: () => this.dropdown,
    placement: "bottom-start",
    offset: { mainAxis: 4 },
    matchAnchorWidth: "min",
    branches: () => [this.anchor],
    onDismiss: () => this.closeDropdown(),
    returnFocusOnEscape: () => this.input,
    focusable: true,
  }));

  /**
   * Column to focus once rendered (keyboard opening / expansion; the column
   * of a lazily loaded option appears later). -1 = deepest column.
   */
  private pendingFocus: number | null = null;
  /** The user (or a script setting `value`) changed the value */
  private dirty = false;

  /** Options of the selected path (one per level) */
  get selectedOptions(): CascaderOption[] {
    return findOptionsByValues(this.options, this.value);
  }

  override focus(options?: FocusOptions): void {
    this.input?.focus(options);
  }

  override blur(): void {
    this.input?.blur();
  }

  /** Opens the panel */
  show(): void {
    this.open = true;
  }

  /** Closes the panel */
  hide(): void {
    this.open = false;
  }

  // ---- form ---------------------------------------------------------------

  private get displayText(): string {
    const selected = this.selectedOptions;
    const labels = selected.map((o) => String(o.label));
    return this.displayRender
      ? this.displayRender(labels, selected)
      : labels.join(" / ");
  }

  protected getFormValue(): string {
    return this.displayText;
  }

  protected override syncFormState(): void {
    super.syncFormState();
    // keep the path as the restorable state (the value is the text)
    if (this.internals && !this.isDisabled) {
      this.internals.setFormValue(
        this.getFormValue(),
        JSON.stringify(this.value),
      );
    }
  }

  protected override getValidity(): ValidityResult {
    if (this.required && this.value.length === 0) {
      return {
        flags: { valueMissing: true },
        message: this.locale.t("validation.selectMissing"),
        anchor: this.input,
      };
    }
    return { flags: {}, message: "" };
  }

  protected resetFormValue(): void {
    this.dirty = false;
    this.value = [...this.defaultValue];
    this.open = false;
  }

  protected override restoreFormState(state: unknown): void {
    if (typeof state !== "string") return;
    try {
      const parsed: unknown = JSON.parse(state);
      if (Array.isArray(parsed)) this.value = parsed as CascaderValue;
    } catch {
      // not a path saved by this element
    }
  }

  // ---- lifecycle ----------------------------------------------------------

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("value") && changed.get("value") !== undefined) {
      this.dirty = !samePath(this.value, this.defaultValue) || this.dirty;
    }
    if (changed.has("defaultValue") && !this.dirty) {
      this.value = [...this.defaultValue];
    }
    if (changed.has("open")) {
      if (this.open) {
        this.expandedValues = [...this.value];
      } else {
        this.searchValue = "";
        this.pendingFocus = null;
      }
    }
    if (DEV) this.checkDev(changed);
  }

  private checkDev(changed: PropertyValues<this>) {
    if (changed.has("options")) {
      const duplicate = findDuplicate(this.options);
      if (duplicate !== undefined) {
        devWarn(
          MinervaCascader.tagName,
          `duplicate option value "${duplicate}" among siblings: values must be unique within a level.`,
        );
      }
    }
    if (
      (changed.has("options") || changed.has("value")) &&
      this.options.length > 0 &&
      this.value.length > 0 &&
      findOptionsByValues(this.options, this.value).length < this.value.length
    ) {
      devWarn(
        MinervaCascader.tagName,
        `value ${JSON.stringify(this.value)} is not a path of the options tree: it is shown partially (or not at all).`,
      );
    }
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    if (changed.has("width")) {
      const w = this.width;
      this.style.width =
        w === undefined || w === ""
          ? ""
          : typeof w === "number" || /^\d+(\.\d+)?$/.test(w)
            ? `${w}px`
            : w;
    }
    this.floating.sync(this.open && !this.isDisabled);
    const pending = this.pendingFocus;
    if (pending !== null && this.open) {
      const level = pending === -1 ? this.columns().length - 1 : pending;
      if (this.focusColumn(level)) this.pendingFocus = null;
    }
  }

  // ---- open / close -------------------------------------------------------

  /** Asks to change `open`; listeners can cancel `minerva-open-change`. */
  private requestOpen(open: boolean): boolean {
    if (open === this.open) return true;
    const allowed = this.emit(
      "minerva-open-change",
      { open },
      { cancelable: true },
    );
    if (allowed) this.open = open;
    return allowed;
  }

  private openDropdown(fromKeyboard = false) {
    if (this.isDisabled || this.readonly) return;
    if (this.requestOpen(true)) {
      this.expandedValues = [...this.value];
      this.pendingFocus = fromKeyboard ? -1 : null;
    }
  }

  private closeDropdown(returnFocus = false) {
    if (!this.requestOpen(false)) return;
    this.searchValue = "";
    if (returnFocus) this.input?.focus();
  }

  // ---- selection ----------------------------------------------------------

  private select(path: CascaderOption[]) {
    this.value = path.map((o) => o.value);
    this.emitChange(path);
    this.closeDropdown(true);
  }

  private emitChange(selectedOptions: CascaderOption[]) {
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit<CascaderChangeDetail>("minerva-change", {
      value: [...this.value],
      selectedOptions,
    });
  }

  private handleActivate(path: CascaderOption[], level: number) {
    const option = path[path.length - 1];
    if (option.disabled) return;
    const atMaxLevel = level >= this.maxLevel - 1;
    const hasChildren = Boolean(option.children?.length);
    const lazy = Boolean(this.loadData) && !option.isLeaf && !option.children;
    if (!atMaxLevel && (hasChildren || lazy)) {
      this.expandedValues = path.map((o) => o.value);
      if (lazy && !option.loading) this.loadData?.(path);
      return;
    }
    this.select(path);
  }

  private clear(event: Event) {
    event.stopPropagation();
    this.value = [];
    this.searchValue = "";
    this.emitChange([]);
    this.emit("minerva-clear");
    this.input?.focus();
  }

  // ---- panel helpers ------------------------------------------------------

  private get expandedPath(): CascaderOption[] {
    return findOptionsByValues(this.options, this.expandedValues);
  }

  /** Columns: the root options, then the children of each expanded option */
  private columns(): CascaderOption[][] {
    const expandedPath = this.expandedPath;
    const columns: CascaderOption[][] = [this.options];
    for (let i = 0; i < expandedPath.length && i < this.maxLevel - 1; i += 1) {
      const children = expandedPath[i].children;
      if (!children?.length) break;
      columns.push(children);
    }
    return columns;
  }

  private columnId(level: number) {
    return `${this.idPrefix}-column-${level}`;
  }

  /** Focus the expanded / selected option of a column, or its first one. */
  private focusColumn(level: number): boolean {
    const column = this.dropdown?.querySelector<HTMLElement>(
      `[data-level="${level}"]`,
    );
    if (!column) return false;
    const target =
      column.querySelector<HTMLElement>('[data-expanded="true"]') ??
      column.querySelector<HTMLElement>(OPTION_SELECTOR);
    target?.focus();
    return Boolean(target);
  }

  private canExpand(option: CascaderOption, level: number) {
    return (
      level < this.maxLevel - 1 &&
      (Boolean(option.children?.length) ||
        (!option.isLeaf && option.children === undefined))
    );
  }

  private pathTo(option: CascaderOption, level: number) {
    return [...this.expandedPath.slice(0, level), option];
  }

  // ---- event handlers -----------------------------------------------------

  private get searching() {
    return this.showSearch && this.searchValue !== "";
  }

  private searchResults(): SearchResult[] {
    if (!this.searching) return [];
    const { searchValue, filter } = this;
    const needle = searchValue.toLowerCase();
    return flattenOptions(this.options).filter(({ path }) =>
      filter
        ? filter(searchValue, path)
        : path.some((o) => String(o.label).toLowerCase().includes(needle)),
    );
  }

  private focusFirstSearchResult() {
    this.dropdown?.querySelector<HTMLElement>('[role="option"]')?.focus();
  }

  private handleSelectorClick() {
    if (this.isDisabled || this.readonly) return;
    if (!this.open) this.openDropdown();
    else if (!this.showSearch) this.closeDropdown();
  }

  private handleInput(event: Event) {
    const text = (event.target as HTMLInputElement).value;
    if (!this.showSearch || this.readonly) return;
    this.searchValue = text;
    this.emit("minerva-input", { value: text });
    if (!this.open) this.openDropdown();
  }

  private handleInputKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!this.open) this.openDropdown(true);
        else if (this.searching) this.focusFirstSearchResult();
        else {
          this.pendingFocus = -1;
          this.requestUpdate();
        }
        break;
      case "Enter":
        e.preventDefault();
        if (!this.open) this.openDropdown(true);
        break;
      case " ":
        if (this.showSearch) break;
        e.preventDefault();
        if (!this.open) this.openDropdown(true);
        break;
      default:
        break;
    }
  }

  /** Focus leaving both the field and the panel closes it */
  private handleFocusOut(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (!this.open || !next) return;
    if (
      (this.anchor && contains(this.anchor, next)) ||
      (this.dropdown && contains(this.dropdown, next))
    ) {
      return;
    }
    this.closeDropdown();
  }

  private handleDropdownMouseDown(e: MouseEvent) {
    // keep focus where it is when clicking non-focusable areas
    if (!(e.target as HTMLElement).closest?.('[role="option"]')) {
      e.preventDefault();
    }
  }

  private handleDropdownKeyDown(e: KeyboardEvent) {
    if (e.key === "Tab") this.closeDropdown();
  }

  private handleOptionKeyDown(
    e: KeyboardEvent,
    option: CascaderOption,
    level: number,
  ) {
    const item = e.currentTarget as HTMLElement;
    const items = Array.from(
      item.parentElement?.querySelectorAll<HTMLElement>(OPTION_SELECTOR) ?? [],
    );
    const index = items.indexOf(item);
    const focusAt = (i: number) =>
      items[(i + items.length) % items.length]?.focus();
    let key = e.key;
    // RTL: columns open towards the left, so ArrowLeft expands.
    if (getDirection(this) === "rtl") {
      if (key === "ArrowLeft") key = "ArrowRight";
      else if (key === "ArrowRight") key = "ArrowLeft";
    }
    switch (key) {
      case "ArrowDown":
        e.preventDefault();
        focusAt(index + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusAt(index - 1);
        break;
      case "Home":
        e.preventDefault();
        focusAt(0);
        break;
      case "End":
        e.preventDefault();
        focusAt(items.length - 1);
        break;
      case "ArrowRight":
        e.preventDefault();
        if (option.disabled || !this.canExpand(option, level)) break;
        this.pendingFocus = level + 1;
        this.handleActivate(this.pathTo(option, level), level);
        this.requestUpdate();
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (option.disabled) break;
        if (this.canExpand(option, level)) this.pendingFocus = level + 1;
        this.handleActivate(this.pathTo(option, level), level);
        this.requestUpdate();
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (level === 0) this.closeDropdown(true);
        else this.focusColumn(level - 1);
        break;
      default:
        break;
    }
  }

  private handleSearchKeyDown(e: KeyboardEvent) {
    const list = e.currentTarget as HTMLElement;
    const items = Array.from(
      list.querySelectorAll<HTMLElement>('[role="option"]'),
    );
    const index = items.indexOf(e.target as HTMLElement);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      items[(index + step + items.length) % items.length]?.focus();
    }
  }

  // ---- render -------------------------------------------------------------

  private renderSearchResults() {
    const results = this.searchResults();
    return html`<div
      class="searchResults"
      role="listbox"
      aria-label=${this.label || this.aria.label || nothing}
      tabindex="-1"
      @keydown=${this.handleSearchKeyDown}
    >
      ${
        results.length > 0
          ? results.map(
              ({ path }) =>
                html`<div
                  class="searchOption"
                  part="option"
                  role="option"
                  aria-selected="false"
                  tabindex="0"
                  @keydown=${(e: KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      this.select(path);
                    }
                  }}
                  @click=${() => this.select(path)}
                >
                  ${path.map((o) => o.label).join(" / ")}
                </div>`,
            )
          : html`<div class="empty" role="status">
              ${this.locale.t("cascader.noResults")}
            </div>`
      }
    </div>`;
  }

  private renderPanel() {
    const { t } = this.locale;
    const columns = this.columns();
    const expandedPath = this.expandedPath;
    const selectedPath = this.selectedOptions;
    const label = this.label || this.aria.label || t("cascader.options");
    return html`<div class="panel">
      ${columns.map(
        (columnOptions, level) =>
          html`<ul
            id=${this.columnId(level)}
            data-level=${level}
            class="column"
            part="column"
            role="listbox"
            aria-label=${t("cascader.level", { label, level: level + 1 })}
          >
            ${columnOptions.map((option) => {
              const isExpanded = expandedPath[level]?.value === option.value;
              const isSelected = selectedPath[level]?.value === option.value;
              const expandable = this.canExpand(option, level);
              const showExpandIcon =
                expandable &&
                Boolean(option.children?.length || !option.isLeaf);
              return html`<li
                data-expanded=${isExpanded ? "true" : nothing}
                class=${classMap({
                  option: true,
                  active: isExpanded || isSelected,
                  disabled: Boolean(option.disabled),
                  loading: Boolean(option.loading),
                })}
                part="option"
                role="option"
                aria-selected=${isSelected ? "true" : "false"}
                aria-disabled=${option.disabled ? "true" : nothing}
                aria-busy=${option.loading ? "true" : nothing}
                aria-controls=${
                  isExpanded && level + 1 < columns.length
                    ? this.columnId(level + 1)
                    : nothing
                }
                tabindex=${option.disabled ? -1 : 0}
                @keydown=${(e: KeyboardEvent) =>
                  this.handleOptionKeyDown(e, option, level)}
                @click=${() => {
                  if (!option.disabled)
                    this.handleActivate(this.pathTo(option, level), level);
                }}
                @mouseenter=${() => {
                  if (
                    this.expandTrigger === "hover" &&
                    !option.disabled &&
                    option.children?.length &&
                    level < this.maxLevel - 1
                  ) {
                    this.expandedValues = this.pathTo(option, level).map(
                      (o) => o.value,
                    );
                  }
                }}
              >
                ${
                  this.optionRender
                    ? this.optionRender(option, level)
                    : html`<span class="label">${option.label}</span>${
                          option.loading
                            ? html`<span
                                class="loadingIndicator"
                                aria-hidden="true"
                                >...</span
                              >`
                            : showExpandIcon
                              ? html`<span class="expandIcon" aria-hidden="true"
                                  >${IconChevronRight}</span
                                >`
                              : nothing
                        }`
                }
              </li>`;
            })}
          </ul>`,
      )}
    </div>`;
  }

  protected override render() {
    const { t } = this.locale;
    const disabled = this.isDisabled;
    const open = this.open && !disabled;
    const showClear =
      !this.hideClearButton &&
      this.value.length > 0 &&
      !disabled &&
      !this.readonly;
    const displayValue = this.searching ? this.searchValue : this.displayText;
    const ariaInvalid =
      this.invalid || this.aria.attr("aria-invalid") === "true";

    return html`<div
        class="cascader"
        part="base"
        @focusout=${this.handleFocusOut}
      >
        <div
          class=${classMap({ selector: true, disabled, focused: open })}
          part="selector"
          @click=${this.handleSelectorClick}
        >
          <div class="input" data-component="input" ?data-disabled=${disabled}>
            <input
              part="input"
              class="field"
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded=${open ? "true" : "false"}
              aria-autocomplete=${this.showSearch ? "list" : nothing}
              aria-label=${this.aria.label ?? (this.label || nothing)}
              aria-description=${this.aria.description ?? nothing}
              aria-invalid=${ariaInvalid ? "true" : nothing}
              aria-required=${this.required ? "true" : nothing}
              aria-readonly=${this.showSearch && this.readonly ? "true" : nothing}
              name=${this.name || nothing}
              .value=${live(displayValue)}
              ?readonly=${!this.showSearch || this.readonly}
              ?disabled=${disabled}
              ?required=${this.required}
              autocomplete="off"
              placeholder=${this.placeholder ?? t("cascader.placeholder")}
              @input=${this.handleInput}
              @keydown=${this.handleInputKeyDown}
            />
          </div>
          ${
            showClear
              ? html`<button
                  type="button"
                  class="clearIcon"
                  part="clear-button"
                  aria-label=${t("cascader.clear")}
                  @click=${this.clear}
                >
                  <span class="icon" aria-hidden="true">${IconX}</span>
                </button>`
              : nothing
          }
          <span
            class=${classMap({ arrow: true, open })}
            part="arrow"
            aria-hidden="true"
            ><span class="icon">${IconChevronDown}</span></span
          >
        </div>
      </div>
      ${
        open
          ? html`<div
              class="dropdown"
              part="dropdown"
              popover="manual"
              @mousedown=${this.handleDropdownMouseDown}
              @focusout=${this.handleFocusOut}
              @keydown=${this.handleDropdownKeyDown}
            >
              ${this.searching ? this.renderSearchResults() : this.renderPanel()}
            </div>`
          : nothing
      }`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-cascader": MinervaCascader;
  }
}
