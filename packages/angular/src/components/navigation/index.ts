import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  InjectionToken,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  input,
  model,
  output,
} from "@angular/core";
import { PALETTES, cn, getPageRange, type Palette } from "@minerva/core";
import { injectScope } from "../../config/scope";
import { MnHook } from "../../internal/hooks";
import { injectId } from "../../internal/ids";
import * as styles from "../../internal/styles";

const TABS = new InjectionToken<MnTabs>("MnTabs");
@Component({
  selector: "mn-tabs",
  imports: [MnHook],
  providers: [{ provide: TABS, useExisting: forwardRef(() => MnTabs) }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "tabs",
    "data-part": "root",
    "[attr.data-orientation]": "orientation()",
    "[attr.data-variant]": "variant()",
    "[attr.data-color]": "color()",
    "[class]": "s.tabs",
  },
  template: `<div
      role="tablist"
      [attr.aria-label]="label()"
      [attr.aria-orientation]="orientation()"
      mnHook="tabs"
      mnPart="list"
      [mnStates]="{ orientation: orientation(), variant: variant() }"
      [class]="listClass()"
      (keydown)="navigate($event)"
    >
      <ng-content select="mn-tab, [mnTab]" />
    </div>
    <ng-content />`,
})
export class MnTabs {
  readonly value = model("");
  readonly label = input("Tabs");
  readonly orientation = input<"horizontal" | "vertical">("horizontal");
  readonly variant = input<"line" | "enclosed" | "pills" | "soft">("line");
  readonly color = input<
    "primary" | "neutral" | "success" | "warning" | "danger" | "info"
  >("primary");
  readonly activationMode = input<"automatic" | "manual">("automatic");
  readonly id = injectId("tabs");
  protected readonly s = styles.tabsStyles;
  protected readonly listClass = computed(() =>
    cn(
      this.s.list,
      this.s[`${this.variant()}List`],
      this.orientation() === "vertical" && this.s.verticalList,
    ),
  );
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  protected navigate(e: KeyboardEvent) {
    const horizontal = this.orientation() === "horizontal";
    const next = horizontal ? "ArrowRight" : "ArrowDown",
      prev = horizontal ? "ArrowLeft" : "ArrowUp";
    if (![next, prev, "Home", "End"].includes(e.key)) return;
    const tabs = Array.from(
      this.el.nativeElement.querySelectorAll<HTMLElement>('[role="tab"]'),
    ).filter((t) => t.getAttribute("aria-disabled") !== "true");
    const index = tabs.indexOf(e.target as HTMLElement);
    if (index < 0 || !tabs.length) return;
    e.preventDefault();
    const rtl =
      horizontal && getComputedStyle(this.el.nativeElement).direction === "rtl";
    const step = (e.key === next ? 1 : -1) * (rtl ? -1 : 1);
    const target =
      e.key === "Home"
        ? tabs[0]
        : e.key === "End"
          ? tabs[tabs.length - 1]
          : tabs[(index + step + tabs.length) % tabs.length];
    target.focus();
    if (this.activationMode() === "automatic") target.click();
  }
}
@Component({
  selector: "mn-tab, button[mnTab]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "tab",
    "data-part": "root",
    role: "tab",
    "[attr.id]": "tabId()",
    "[attr.aria-controls]": "panelId()",
    "[attr.aria-selected]": "selected()",
    "[attr.aria-disabled]": "disabled()",
    "[attr.tabindex]": "selected() ? 0 : -1",
    "[attr.data-state]": "selected() ? 'active' : 'inactive'",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[attr.data-orientation]": "tabs.orientation()",
    "[attr.data-variant]": "tabs.variant()",
    "[attr.data-color]": "tabs.color()",
    "[class]": "classes()",
    "(click)": "activate()",
    "(keydown.enter)": "activate(); $event.preventDefault()",
    "(keydown.space)": "activate(); $event.preventDefault()",
  },
  template: `<ng-content />`,
})
export class MnTab {
  readonly value = input.required<string>();
  readonly disabled = input(false, { transform: booleanAttribute });
  protected readonly tabs = inject(TABS);
  protected readonly selected = computed(
    () => this.tabs.value() === this.value(),
  );
  protected readonly tabId = computed(
    () => `${this.tabs.id}-tab-${this.value()}`,
  );
  protected readonly panelId = computed(
    () => `${this.tabs.id}-panel-${this.value()}`,
  );
  protected readonly classes = computed(() =>
    cn(
      styles.tabsStyles.trigger,
      styles.tabsStyles[`${this.tabs.variant()}Trigger`],
      styles.tabsStyles[this.tabs.color()],
    ),
  );
  protected activate() {
    if (!this.disabled()) this.tabs.value.set(this.value());
  }
}
@Component({
  selector: "mn-tab-panel",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "tab-panel",
    "data-part": "root",
    role: "tabpanel",
    tabindex: "0",
    "[attr.id]": "tabs.id + '-panel-' + value()",
    "[attr.aria-labelledby]": "tabs.id + '-tab-' + value()",
    "[hidden]": "!selected()",
    "[attr.data-state]": "selected() ? 'active' : 'inactive'",
    "[attr.data-orientation]": "tabs.orientation()",
    "[class]": "s.panel",
  },
  template: `<ng-content />`,
})
export class MnTabPanel {
  readonly value = input.required<string>();
  protected readonly tabs = inject(TABS);
  protected readonly s = styles.tabsStyles;
  protected readonly selected = computed(
    () => this.tabs.value() === this.value(),
  );
}
@Component({
  selector: "mn-page-tabs",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "page-tabs",
    "data-part": "root",
    "[class]": "s.pageTabs",
  },
  template: `<div mnHook="page-tabs" mnPart="viewport" [class]="s.viewport">
      <nav
        mnHook="page-tabs"
        mnPart="list"
        [attr.aria-label]="label()"
        [class]="s.list"
      >
        <ng-content />
      </nav>
    </div>
    <div mnHook="page-tabs" mnPart="actions" [class]="s.actions">
      <ng-content select="[mnActions]" />
    </div>`,
})
export class MnPageTabs {
  readonly label = input("Pages");
  protected readonly s = styles.pageTabsStyles;
}
@Component({
  selector: "mn-page-tab",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "page-tab",
    "data-part": "root",
    "[attr.data-current]": "current() ? '' : null",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[class]": "s.pageTab",
  },
  template: `<a
      mnHook="page-tab"
      mnPart="trigger"
      [class]="s.trigger"
      [attr.href]="disabled() ? null : href()"
      [attr.aria-current]="current() ? 'page' : null"
      [attr.aria-disabled]="disabled() ? true : null"
      (click)="activate($event)"
    >
      @if (icon()) {
        <span
          mnHook="page-tab"
          mnPart="icon"
          [class]="s.icon"
          aria-hidden="true"
          >{{ icon() }}</span
        >
      }
      <span mnHook="page-tab" mnPart="label" [class]="s.label"
        >{{ label() }}<ng-content /></span></a
    ><span mnHook="page-tab" mnPart="action" [class]="s.action"
      ><ng-content select="[mnAction]"
    /></span>`,
})
export class MnPageTab {
  readonly href = input<string>();
  readonly label = input("");
  readonly icon = input("");
  readonly current = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly selected = output<void>();
  protected readonly s = styles.pageTabsStyles;
  protected activate(e: Event) {
    if (this.disabled()) {
      e.preventDefault();
      return;
    }
    this.selected.emit();
  }
}
@Component({
  selector: "mn-pagination",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "pagination",
    "data-part": "root",
    role: "navigation",
    "[attr.aria-label]": "scope.t('pagination.nav')",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[attr.data-size]": "size()",
    "[attr.data-variant]": "variant()",
    "[attr.data-shape]": "shape()",
    "[class]": "s.pagination",
  },
  template: `<span mnHook="pagination" mnPart="total" [class]="s.total"
      >{{ total() }} items</span
    ><button
      type="button"
      mnHook="pagination"
      mnPart="item"
      [mnStates]="{ disabled: disabled() || page() <= 1 }"
      [disabled]="disabled() || page() <= 1"
      [attr.aria-label]="scope.t('pagination.prev')"
      (click)="go(page() - 1)"
    >
      ‹
    </button>
    @for (p of pages(); track p) {
      <button
        type="button"
        mnHook="pagination"
        mnPart="item"
        [class]="s.item"
        [mnStates]="{ current: page() === p, disabled: disabled() }"
        [disabled]="disabled()"
        [attr.aria-current]="page() === p ? 'page' : null"
        [attr.aria-label]="'Page ' + p"
        (click)="go(p)"
      >
        {{ p }}
      </button>
    }
    <button
      type="button"
      mnHook="pagination"
      mnPart="item"
      [mnStates]="{ disabled: disabled() || page() >= pageCount() }"
      [disabled]="disabled() || page() >= pageCount()"
      [attr.aria-label]="scope.t('pagination.next')"
      (click)="go(page() + 1)"
    >
      ›
    </button>
    @if (simple()) {
      <input
        mnHook="pagination"
        mnPart="simple-input"
        type="number"
        aria-label="Page"
        [value]="page()"
        [min]="1"
        [max]="pageCount()"
        [disabled]="disabled()"
        (change)="jump($event)"
      />
    }
    @if (showJumper()) {
      <label mnHook="pagination" mnPart="jumper" [class]="s.jumper"
        >Go to page<input
          type="number"
          [min]="1"
          [max]="pageCount()"
          [disabled]="disabled()"
          (change)="jump($event)"
      /></label>
    }
    @if (showSizeChanger()) {
      <select
        mnHook="pagination"
        mnPart="size-changer"
        aria-label="Items per page"
        [value]="pageSize()"
        [disabled]="disabled()"
        (change)="resize($event)"
      >
        @for (n of pageSizeOptions(); track n) {
          <option [value]="n">{{ n }}</option>
        }
      </select>
    }`,
})
export class MnPagination {
  protected readonly scope = injectScope();
  readonly page = model(1);
  readonly pageSize = model(10);
  readonly total = input(0);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly simple = input(false, { transform: booleanAttribute });
  readonly showJumper = input(false, { transform: booleanAttribute });
  readonly showSizeChanger = input(false, { transform: booleanAttribute });
  readonly pageSizeOptions = input<readonly number[]>([10, 20, 50, 100]);
  readonly size = input<"small" | "medium" | "large">("medium");
  readonly shape = input<"circle" | "rounded" | "square">("rounded");
  readonly variant = input<"ghost" | "outline" | "solid">("outline");
  protected readonly s = styles.paginationStyles;
  protected readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.total() / Math.max(1, this.pageSize()))),
  );
  protected readonly pages = computed(() =>
    getPageRange(this.page(), this.pageCount()),
  );
  protected go(n: number) {
    if (!this.disabled() && Number.isFinite(n))
      this.page.set(Math.max(1, Math.min(this.pageCount(), Math.trunc(n))));
  }
  protected jump(e: Event) {
    this.go(Number((e.target as HTMLInputElement).value));
  }
  protected resize(e: Event) {
    if (this.disabled()) return;
    this.pageSize.set(
      Math.max(1, Number((e.target as HTMLSelectElement).value)),
    );
    this.go(1);
  }
}
export interface StepItem {
  label: string;
  disabled?: boolean;
}
@Component({
  selector: "mn-steps",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "steps",
    "data-part": "root",
    "[attr.data-readonly]": "readOnly() ? '' : null",
    "[class]": "s.steps",
  },
  template: `@for (item of items(); track $index) {
    <div
      mnHook="steps"
      mnPart="item"
      [class]="s.step"
      [mnStates]="{
        current: current() === $index,
        disabled: item.disabled,
        status: $index < current() ? 'complete' : 'upcoming',
      }"
    >
      <button
        mnHook="steps"
        mnPart="button"
        type="button"
        [class]="s.button"
        [attr.aria-current]="current() === $index ? 'step' : null"
        [disabled]="readOnly() || item.disabled"
        (click)="current.set($index)"
      >
        <span
          mnHook="steps"
          mnPart="indicator"
          [class]="s.number"
          aria-hidden="true"
          >{{ current() > $index ? "✓" : $index + 1 }}</span
        ><span mnHook="steps" mnPart="label">{{ item.label }}</span>
      </button>
    </div>
  }`,
})
export class MnSteps {
  readonly items = input<readonly StepItem[]>([]);
  readonly current = model(0);
  readonly readOnly = input(false, { transform: booleanAttribute });
  protected readonly s = styles.stepsStyles;
}
@Component({
  selector: "mn-theme-toggle",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "theme-toggle",
    "data-part": "root",
    role: "group",
    "aria-label": "Theme",
    "[class]": "s.group",
  },
  template: `@for (item of items(); track item) {
    <button
      type="button"
      mnHook="theme-toggle"
      mnPart="item"
      [mnStates]="{ state: scope.mode() === item ? 'active' : 'inactive' }"
      [class]="s.item"
      [attr.aria-pressed]="scope.mode() === item"
      (click)="scope.setTheme(item)"
    >
      {{ item }}
    </button>
  }`,
})
export class MnThemeToggle {
  readonly showSystem = input(true, { transform: booleanAttribute });
  protected readonly scope = injectScope();
  protected readonly s = styles.themeToggleStyles;
  protected readonly items = computed<Array<"light" | "dark" | "system">>(() =>
    this.showSystem() ? ["light", "dark", "system"] : ["light", "dark"],
  );
}
@Component({
  selector: "mn-palette-toggle",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "palette-toggle",
    "data-part": "root",
    role: "group",
    "aria-label": "Palette",
    "[class]": "s.group",
  },
  template: `@for (item of items(); track item) {
    <button
      type="button"
      mnHook="palette-toggle"
      mnPart="item"
      [mnStates]="{ state: scope.palette() === item ? 'active' : 'inactive' }"
      [class]="s.item"
      [attr.aria-pressed]="scope.palette() === item"
      (click)="scope.setPalette(item)"
    >
      {{ item ?? "Default" }}
    </button>
  }`,
})
export class MnPaletteToggle {
  readonly palettes = input<readonly Palette[]>(PALETTES);
  readonly showDefault = input(true, { transform: booleanAttribute });
  protected readonly scope = injectScope();
  protected readonly s = styles.themeToggleStyles;
  protected readonly items = computed(() =>
    this.showDefault() ? [null, ...this.palettes()] : this.palettes(),
  );
}
