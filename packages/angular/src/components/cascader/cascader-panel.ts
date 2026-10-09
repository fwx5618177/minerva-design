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
  effect,
  inject,
  input,
  numberAttribute,
  output,
  signal,
  untracked,
} from "@angular/core";
import { cn } from "@minerva/core";
import { logicalArrowKey } from "@minerva/dom";
import { injectScope } from "../../config/scope";
import { MnHook } from "../../internal/hooks";
import { MnIcon } from "../../internal/icon";
import { injectId } from "../../internal/ids";
import { cascaderStyles as s } from "../../internal/styles";

/** An option of the Cascader tree */
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

/** Selected path of values */
export type CascaderValue = (string | number)[];

/** Context of an `optionRender` template (`let-option let-level="level"`) */
export interface CascaderOptionContext {
  $implicit: CascaderOption;
  option: CascaderOption;
  level: number;
}

/** An option activated in the panel (`activate` output) */
export interface CascaderActivateEvent {
  /** Path from the root to the activated option */
  path: CascaderOption[];
  /** Level (column index) of the option */
  level: number;
}

/** Inline styles (`[ngStyle]`-like map) */
export type CascaderStyle = Record<string, string | number | null | undefined>;

const OPTION_SELECTOR = '[role="option"]:not([aria-disabled="true"])';

/**
 * CascaderPanel: the columns of a Cascader, one `role="listbox"` column per
 * expanded level (the panel rendered in the Cascader dropdown). Keyboard:
 * ArrowUp / ArrowDown / Home / End move within a column, ArrowRight / Enter /
 * Space expand (or pick a leaf), ArrowLeft goes back a column (leaves the
 * panel from the first one); arrows follow the reading direction (RTL).
 *
 * @example
 * <mn-cascader-panel
 *   label="City"
 *   [options]="options"
 *   [expandedPath]="expanded"
 *   [selectedPath]="selected"
 *   (activate)="onActivate($event)"
 * />
 */
@Component({
  selector: "mn-cascader-panel",
  exportAs: "mnCascaderPanel",
  imports: [MnHook, MnIcon, NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "s.panel" },
  template: `
    @for (column of columns(); track level; let level = $index) {
      <ul
        [attr.id]="columnId(level)"
        [attr.data-level]="level"
        [class]="s.column"
        mnHook="cascader"
        mnPart="column"
        role="listbox"
        [attr.aria-label]="columnLabel(level)"
      >
        @for (option of column; track option.value) {
          <li
            [class]="optionClass(option, level)"
            [style]="optionStyle() ?? null"
            mnHook="cascader"
            mnPart="item"
            [mnStates]="itemStates(option, level)"
            role="option"
            [attr.aria-selected]="isSelected(option, level)"
            [attr.aria-disabled]="option.disabled ? 'true' : null"
            [attr.aria-busy]="option.loading ? 'true' : null"
            [attr.aria-controls]="
              isExpanded(option, level) && level + 1 < columns().length
                ? columnId(level + 1)
                : null
            "
            [attr.tabindex]="option.disabled ? -1 : 0"
            (keydown)="onKeyDown($event, option, level)"
            (click)="onClick(option, level)"
            (mouseenter)="onMouseEnter(option, level)"
          >
            @if (optionRender(); as tpl) {
              <ng-container
                [ngTemplateOutlet]="tpl"
                [ngTemplateOutletContext]="{
                  $implicit: option,
                  option: option,
                  level: level,
                }"
              />
            } @else {
              <span [class]="s.label">{{ option.label }}</span>
              @if (option.loading) {
                <span [class]="s.loadingIndicator" aria-hidden="true">...</span>
              } @else if (showExpandIcon(option, level)) {
                <svg mnIcon="ChevronRight" [class]="s.expandIcon"></svg>
              }
            }
          </li>
        }
      </ul>
    }
  `,
})
export class MnCascaderPanel {
  /** Label used to name the columns */
  readonly label = input<string | undefined>(undefined);
  /** Option tree @default [] */
  readonly options = input<CascaderOption[]>([]);
  /** Options of the expanded path (one per level) @default [] */
  readonly expandedPath = input<CascaderOption[]>([]);
  /** Options of the selected path (one per level) @default [] */
  readonly selectedPath = input<CascaderOption[]>([]);
  /** How sub-menus are expanded @default "click" */
  readonly expandTrigger = input<"click" | "hover">("click");
  /** Maximum number of levels shown @default 6 */
  readonly maxLevel = input(6, { transform: numberAttribute });
  /** Custom option renderer (`<ng-template let-option let-level="level">`) */
  readonly optionRender = input<TemplateRef<CascaderOptionContext> | null>(
    null,
  );
  /** Inline styles of every option */
  readonly optionStyle = input<CascaderStyle | undefined>(undefined);
  /**
   * Focus an option of the deepest column when mounted / when turned on
   * (keyboard opening) @default false
   */
  readonly autoFocus = input(false, { transform: booleanAttribute });

  /** An option was clicked or activated with the keyboard (React `onActivate`) */
  readonly activate = output<CascaderActivateEvent>();
  /** An option was hovered (expandTrigger "hover"; React `onHoverExpand`) */
  readonly hoverExpand = output<CascaderOption[]>();
  /** The user left the first column with ArrowLeft (React `onExit`) */
  readonly exit = output<void>();

  protected readonly s = s;
  private readonly t = injectScope();
  private readonly idPrefix = injectId("cascader");
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  // Column to focus once rendered (keyboard expansion; the column of a
  // lazily loaded option appears later). -1 = deepest column.
  private readonly pendingFocus = signal<number | null>(null);

  /** The root options, then the children of each expanded option */
  protected readonly columns = computed(() => {
    const columns: CascaderOption[][] = [this.options()];
    const expanded = this.expandedPath();
    for (let i = 0; i < expanded.length && i < this.maxLevel() - 1; i += 1) {
      const children = expanded[i].children;
      if (!children?.length) break;
      columns.push(children);
    }
    return columns;
  });

  constructor() {
    effect(() => {
      if (this.autoFocus()) untracked(() => this.pendingFocus.set(-1));
    });
    afterRenderEffect(() => {
      const pending = this.pendingFocus();
      const columns = this.columns();
      // re-run when the option states (loading -> loaded) change
      this.expandedPath();
      if (pending === null) return;
      const level = pending === -1 ? columns.length - 1 : pending;
      if (this.focusColumn(level)) this.pendingFocus.set(null);
    });
  }

  protected columnId(level: number): string {
    return `${this.idPrefix}-column-${level}`;
  }

  protected columnLabel(level: number): string {
    return this.t.t("cascader.level", {
      label: this.label() ?? this.t.t("cascader.options"),
      level: level + 1,
    });
  }

  protected isExpanded(option: CascaderOption, level: number): boolean {
    return this.expandedPath()[level]?.value === option.value;
  }

  protected isSelected(option: CascaderOption, level: number): boolean {
    return this.selectedPath()[level]?.value === option.value;
  }

  private canExpand(option: CascaderOption, level: number): boolean {
    return (
      level < this.maxLevel() - 1 &&
      (Boolean(option.children?.length) ||
        (!option.isLeaf && option.children === undefined))
    );
  }

  protected showExpandIcon(option: CascaderOption, level: number): boolean {
    return (
      this.canExpand(option, level) &&
      Boolean(option.children?.length || !option.isLeaf)
    );
  }

  protected optionClass(option: CascaderOption, level: number): string {
    return cn(s.option, {
      [s.active]:
        this.isExpanded(option, level) || this.isSelected(option, level),
      [s.disabled]: !!option.disabled,
    });
  }

  protected itemStates(option: CascaderOption, level: number) {
    const selected = this.isSelected(option, level);
    // the picked option (end of the selected path) has no children column,
    // even while on the expanded path
    const picked = selected && level === this.selectedPath().length - 1;
    return {
      selected,
      expanded: this.isExpanded(option, level) && !picked,
      disabled: option.disabled,
      loading: option.loading,
    };
  }

  private pathTo(option: CascaderOption, level: number): CascaderOption[] {
    return [...this.expandedPath().slice(0, level), option];
  }

  private columnEl(level: number): HTMLElement | null {
    return this.host.nativeElement.querySelector<HTMLElement>(
      `[data-level="${level}"]`,
    );
  }

  /** Focus the expanded / selected option of a column, or its first one */
  private focusColumn(level: number): boolean {
    const column = this.columnEl(level);
    if (!column) return false;
    const target =
      column.querySelector<HTMLElement>("[data-expanded]") ??
      column.querySelector<HTMLElement>("[data-selected]") ??
      column.querySelector<HTMLElement>(OPTION_SELECTOR);
    target?.focus();
    return Boolean(target);
  }

  protected onClick(option: CascaderOption, level: number): void {
    if (!option.disabled)
      this.activate.emit({ path: this.pathTo(option, level), level });
  }

  protected onMouseEnter(option: CascaderOption, level: number): void {
    if (
      this.expandTrigger() === "hover" &&
      !option.disabled &&
      option.children?.length &&
      level < this.maxLevel() - 1
    ) {
      this.hoverExpand.emit(this.pathTo(option, level));
    }
  }

  protected onKeyDown(
    event: KeyboardEvent,
    option: CascaderOption,
    level: number,
  ): void {
    const current = event.currentTarget as HTMLElement;
    const items = Array.from(
      current.parentElement?.querySelectorAll<HTMLElement>(OPTION_SELECTOR) ??
        [],
    );
    const index = items.indexOf(current);
    const focusAt = (i: number) =>
      items[(i + items.length) % items.length]?.focus();
    // RTL: columns open towards the left, so ArrowLeft expands.
    switch (logicalArrowKey(event.key, current)) {
      case "ArrowDown":
        event.preventDefault();
        focusAt(index + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusAt(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusAt(0);
        break;
      case "End":
        event.preventDefault();
        focusAt(items.length - 1);
        break;
      case "ArrowRight":
        event.preventDefault();
        if (option.disabled || !this.canExpand(option, level)) break;
        this.pendingFocus.set(level + 1);
        this.activate.emit({ path: this.pathTo(option, level), level });
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (option.disabled) break;
        if (this.canExpand(option, level)) this.pendingFocus.set(level + 1);
        this.activate.emit({ path: this.pathTo(option, level), level });
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (level === 0) this.exit.emit();
        else this.focusColumn(level - 1);
        break;
      default:
        break;
    }
  }
}
