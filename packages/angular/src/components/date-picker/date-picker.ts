import { injectId } from "../../internal/ids";
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
  output,
  signal,
  untracked,
  viewChild,
} from "@angular/core";
import {
  cn,
  addDays,
  dayKey,
  localDate,
  monthStart,
  parseDayKey,
  sameMonth,
} from "@minerva/core";
import {
  getDirection,
  getTabbables,
  parsePlacement,
  type Placement,
  type ReadingDirection,
} from "@minerva/dom";
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
import { anchoredPosition, overlayLayer } from "../../internal/overlay";
import { MnPortal } from "../../internal/portal";
import {
  iconButtonStyles as ib,
  inputStyles as is,
  datePickerStyles as s,
} from "../../internal/styles";
export type DatePickerSize = "small" | "medium" | "large";

const optionalBoolean = (value: unknown): boolean | undefined =>
  value === undefined || value === null ? undefined : booleanAttribute(value);

/**
 * The tabbable element before / after `anchor` in `container`, in document
 * order (where Tab / Shift+Tab pressed on `anchor` would go).
 */
function adjacentTabbable(
  anchor: Element,
  container: Element,
  backwards: boolean,
): HTMLElement | null {
  const tabbables = getTabbables(container).filter(
    (el) => el !== anchor && !anchor.contains(el) && !el.contains(anchor),
  );
  const follows = (el: Element) =>
    !!(anchor.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING);
  return backwards
    ? ([...tabbables].reverse().find((el) => !follows(el)) ?? null)
    : (tabbables.find(follows) ?? null);
}

/** Whether Tab (Shift+Tab: `backwards`) on `focused` would leave `panel` */
function tabLeavesPanel(
  panel: HTMLElement,
  focused: Element | null,
  backwards: boolean,
): boolean {
  if (!focused || !panel.contains(focused)) return false;
  const tabbables = getTabbables(panel);
  if (tabbables.length === 0) return true;
  if (backwards) return focused === panel || focused === tabbables[0];
  return focused === tabbables[tabbables.length - 1];
}

/** Date input and accessible popup calendar. YYYY-MM-DD values, with null or "" as controlled empty values. Supports Angular Forms and [(value)]. */
@Component({
  selector: "mn-date-picker",
  exportAs: "mnDatePicker",
  imports: [MnHook, MnIcon, MnPortal],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(() => MnDatePicker)],
  host: {
    "[class]": "s.datePicker",
    "[attr.id]": "null",
    "[attr.aria-label]": "null",
    "[attr.aria-labelledby]": "null",
    "[attr.aria-describedby]": "null",
    "[attr.name]": "null",
    "[attr.placeholder]": "null",
    "[attr.label]": "null",
    "[attr.disabled]": "null",
    "[attr.readonly]": "null",
    "[attr.required]": "null",
    "[attr.invalid]": "null",
    "[attr.data-minerva]": '"date-picker"',
    "[attr.data-part]": '"root"',
    "[attr.data-state]": 'isOpen() ? "open" : "closed"',
    "[attr.data-disabled]": 'isDisabled() ? "" : null',
    "[attr.data-readonly]": 'isReadOnly() ? "" : null',
    "[attr.data-invalid]": 'isInvalid() ? "" : null',
    "[attr.data-size]": "size()",
    "(click)": "onRootClick($event)",
  },
  template: `
    <div
      [class]="inputRootClass()"
      data-component="input"
      mnHook="input"
      [mnStates]="{
        disabled: isDisabled(),
        invalid: isInvalid(),
        readonly: isReadOnly(),
        required: isRequired(),
        size: size(),
        variant: 'outline',
      }"
    >
      <input
        #input
        type="text"
        [class]="is.field"
        [value]="displayValue()"
        [attr.placeholder]="placeholder() ?? scope.t('datePicker.placeholder')"
        [attr.id]="field.id()"
        [attr.aria-label]="accessibleName()"
        [attr.aria-labelledby]="labelledBy()"
        [attr.aria-describedby]="field.describedBy()"
        [attr.aria-invalid]="isInvalid() ? 'true' : null"
        [attr.aria-readonly]="isReadOnly() ? 'true' : null"
        [required]="isRequired()"
        [readOnly]="isReadOnly()"
        [attr.name]="name()"
        [disabled]="isDisabled()"
        (input)="onInput(input.value)"
        (blur)="onBlur()"
        (keydown)="onInputKeyDown($event)"
        mnHook="input"
        mnPart="input"
      />
      <span [class]="suffixClass" mnHook="input" mnPart="suffix">
        @if (showClear()) {
          <button
            type="button"
            [class]="clearClass"
            tabindex="0"
            [attr.aria-label]="scope.t('datePicker.clear')"
            (click)="clear()"
            mnHook="icon-button"
            [mnStates]="clearStates"
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
        } @else {
          <span
            [class]="s.calendarIcon"
            aria-hidden="true"
            mnHook="date-picker"
            mnPart="icon"
          >
            <svg mnIcon="Calendar"></svg>
          </span>
        }
      </span>
    </div>
    @if (isOpen()) {
      <div
        *mnPortal
        #panel
        role="dialog"
        tabindex="-1"
        [attr.dir]="panelDir() ?? null"
        [attr.aria-label]="accessibleName()"
        [attr.aria-labelledby]="labelledBy()"
        [class]="s.popup"
        (keydown)="onPanelKeyDown($event)"
        mnHook="date-picker"
        mnPart="content"
        [mnStates]="contentStates()"
      >
        <div [class]="s.panel">
          <div [class]="s.header">
            <h2 [id]="headingId" [class]="s.heading" aria-live="polite">
              {{ heading() }}
            </h2>
            <div [class]="s.navGroup">
              <button
                type="button"
                [class]="s.navButton"
                [attr.aria-label]="scope.t('monthCalendar.previousMonth')"
                (click)="navigateMonth(-1)"
              >
                <svg mnIcon="ChevronLeft"></svg>
              </button>
              <button
                type="button"
                [class]="s.navButton"
                [attr.aria-label]="scope.t('monthCalendar.nextMonth')"
                (click)="navigateMonth(1)"
              >
                <svg mnIcon="ChevronRight"></svg>
              </button>
            </div>
          </div>
          <div role="grid" [attr.aria-labelledby]="headingId" [class]="s.grid">
            <div role="row" [class]="s.week">
              @for (day of weekdays; track day) {
                <div role="columnheader" [class]="s.weekday">
                  {{ scope.t("monthCalendar.weekdays." + day) }}
                </div>
              }
            </div>
            @for (week of weeks(); track $index) {
              <div role="row" [class]="s.week">
                @for (date of week; track key(date)) {
                  <div
                    role="gridcell"
                    [class]="s.day"
                    [attr.data-date]="key(date)"
                    [attr.data-outside]="outside(date) ? '' : null"
                    [attr.aria-label]="key(date)"
                    [attr.aria-selected]="current() === key(date)"
                    [attr.aria-current]="key(date) === todayKey ? 'date' : null"
                    [attr.aria-disabled]="
                      dayDisabled(key(date)) ? 'true' : null
                    "
                    [tabIndex]="key(date) === activeKey() ? 0 : -1"
                    (focus)="focusedKey.set(key(date))"
                    (click)="selectDate(date)"
                    (keydown)="onDayKeyDown($event, date)"
                  >
                    {{ date.getDate() }}
                  </div>
                }
              </div>
            }
          </div>
          <div [class]="s.footer">
            <button
              type="button"
              [class]="s.footerButton"
              [disabled]="dayDisabled(todayKey)"
              (click)="selectToday()"
            >
              {{ scope.t("datePicker.today") }}
            </button>
            @if (clearable() && current()) {
              <button
                type="button"
                [class]="s.footerButton"
                (click)="clear(); setOpen(false)"
              >
                {{ scope.t("datePicker.clear") }}
              </button>
            }
          </div>
        </div>
      </div>
    }
  `,
})
export class MnDatePicker extends MnFormValueControl<string> {
  /**
   * Selected date (two-way: `[(value)]`); `null` means "no date". Not bound:
   * `defaultValue`.
   */
  readonly value = input<string | null | undefined>(undefined);
  readonly valueChange = output<string>();
  readonly change = output<string>();
  /** Initially selected date (when `value` is not bound) */
  readonly defaultValue = input<string | undefined>(undefined);
  /** Whether the panel is open (two-way: `[(open)]`) @default false */
  readonly open = model(false);
  /** Placeholder of the input @default "Select date" (localized) */
  readonly placeholder = input<string | undefined>(undefined);
  /** Visible label of the input; without it the input is labelled "Date" (localized) */
  readonly label = input<string | undefined>(undefined);
  /** Accessible label of the input when no visible label is shown */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  /**
   * Id(s) of the element(s) labelling the input; inside a FormControl it
   * defaults to the FormLabel (unless `label` / `aria-label` is set)
   */
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: "aria-labelledby",
  });
  /**
   * Id(s) of the element(s) describing the input; merged with the helper /
   * error text of an enclosing FormControl
   */
  readonly ariaDescribedby = input<string | undefined>(undefined, {
    alias: "aria-describedby",
  });
  /** Id of the input; defaults to the id of an enclosing FormControl */
  readonly id = input<string | undefined>(undefined);
  /** Marks the input as required; defaults to the enclosing FormControl's state */
  readonly required = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /**
   * Shows the value without allowing changes (typing, panel, clearing);
   * defaults to the enclosing FormControl's state
   */
  readonly readOnly = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /**
   * Marks the input as invalid (aria-invalid); defaults to the enclosing
   * FormControl's state (and to an invalid, touched form control)
   */
  readonly invalid = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Name of the input @default "date-picker" */
  readonly name = input("date-picker");
  /**
   * Disables the picker; defaults to the enclosing FormControl's (or the
   * form's) state @default false
   */
  readonly disabled = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Allows clearing the value with the suffix button @default true */
  readonly clearable = input(true, { transform: booleanAttribute });
  /** Size of the input and panel @default "medium" */
  readonly size = input<DatePickerSize>("medium");
  readonly minDate = input<string | undefined>(undefined);
  readonly maxDate = input<string | undefined>(undefined);
  readonly locale = input<string | undefined>(undefined);

  protected readonly s = s;
  protected readonly is = is;
  protected readonly ib = ib;
  protected readonly scope = injectScope();
  private readonly fieldContext = injectFormField();
  protected readonly field = fieldWiring(this.fieldContext, {
    id: () => this.id(),
    describedBy: () => this.ariaDescribedby(),
  });
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly inputRef =
    viewChild.required<ElementRef<HTMLInputElement>>("input");
  private readonly panelRef = viewChild<ElementRef<HTMLDivElement>>("panel");

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
  protected readonly isOpen = computed(
    () => this.open() && !this.isDisabled() && !this.isReadOnly(),
  );
  protected readonly accessibleName = computed(
    () => this.label() ?? this.ariaLabel() ?? this.scope.t("datePicker.label"),
  );
  protected readonly labelledBy = computed(
    () =>
      this.ariaLabelledby() ??
      (this.fieldContext && !this.label() && !this.ariaLabel()
        ? this.fieldContext.labelId()
        : null),
  );

  private readonly internal = signal<string | undefined>(undefined);
  protected readonly current = computed(() => {
    const value = this.value();
    return value === undefined
      ? (this.formValue() ?? this.internal() ?? this.defaultValue() ?? "")
      : (value ?? "");
  });
  private readonly draft = signal<string | null>(null);
  protected readonly displayValue = computed(
    () => this.draft() ?? this.current(),
  );
  protected readonly headingId = injectId("date-picker-heading");
  protected readonly weekdays = [
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun",
  ] as const;
  protected readonly todayKey = dayKey(new Date());
  private readonly month = signal(monthStart(new Date()));
  protected readonly focusedKey = signal("");
  private readonly pendingFocus = signal<string | null>(null);
  protected readonly key = dayKey;
  protected readonly outside = (date: Date) => !sameMonth(date, this.month());
  protected readonly heading = computed(() =>
    new Intl.DateTimeFormat(this.locale() ?? this.scope.language(), {
      year: "numeric",
      month: "long",
    }).format(this.month()),
  );
  private readonly days = computed(() => {
    const first = monthStart(this.month());
    const start = addDays(first, -((first.getDay() + 6) % 7));
    return Array.from({ length: 42 }, (_, i) => addDays(start, i));
  });
  protected readonly weeks = computed(() =>
    Array.from({ length: 6 }, (_, i) => this.days().slice(i * 7, i * 7 + 7)),
  );
  protected readonly activeKey = computed(() => {
    const keys = this.days().map(dayKey);
    return [
      this.focusedKey(),
      this.current(),
      this.todayKey,
      dayKey(this.month()),
      ...keys,
    ].find((key) => key && keys.includes(key) && !this.dayDisabled(key));
  });
  protected dayDisabled(key: string): boolean {
    return !!(
      (this.minDate() && key < this.minDate()!) ||
      (this.maxDate() && key > this.maxDate()!)
    );
  }
  protected navigateMonth(offset: number): void {
    this.month.set(monthStart(this.month(), offset));
  }
  private syncMonth(): void {
    const date = parseDayKey(this.current());
    if (date) this.month.set(monthStart(date));
  }
  protected selectToday(): void {
    this.selectDate(new Date());
  }
  protected selectDate(date: Date): void {
    if (
      this.isDisabled() ||
      this.isReadOnly() ||
      this.dayDisabled(dayKey(date))
    )
      return;
    this.draft.set(null);
    this.commit(dayKey(date));
    this.month.set(monthStart(date));
    this.setOpen(false);
    this.focus();
  }
  protected onDayKeyDown(event: KeyboardEvent, date: Date): void {
    if (this.isDisabled() || this.isReadOnly()) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!event.repeat) this.selectDate(date);
      return;
    }
    let target: Date;
    const weekday = (date.getDay() + 6) % 7;
    let key = event.key;
    if (getDirection(event.currentTarget as HTMLElement) === "rtl") {
      if (key === "ArrowLeft") key = "ArrowRight";
      else if (key === "ArrowRight") key = "ArrowLeft";
    }
    switch (key) {
      case "ArrowLeft":
        target = addDays(date, -1);
        break;
      case "ArrowRight":
        target = addDays(date, 1);
        break;
      case "ArrowUp":
        target = addDays(date, -7);
        break;
      case "ArrowDown":
        target = addDays(date, 7);
        break;
      case "Home":
        target = addDays(date, -weekday);
        break;
      case "End":
        target = addDays(date, 6 - weekday);
        break;
      case "PageUp":
      case "PageDown": {
        const next = monthStart(
          date,
          (key === "PageUp" ? -1 : 1) * (event.shiftKey ? 12 : 1),
        );
        target = localDate(
          next.getFullYear(),
          next.getMonth(),
          Math.min(date.getDate(), addDays(monthStart(next, 1), -1).getDate()),
        );
        break;
      }
      default:
        return;
    }
    event.preventDefault();
    this.focusedKey.set(dayKey(target));
    this.pendingFocus.set(dayKey(target));
    if (!sameMonth(target, this.month())) this.month.set(monthStart(target));
  }
  protected readonly showClear = computed(
    () =>
      this.clearable() &&
      !!this.current() &&
      !this.isDisabled() &&
      !this.isReadOnly(),
  );

  private readonly placement = signal<Placement>("bottom-start");
  protected readonly panelDir = signal<ReadingDirection | undefined>(undefined);

  protected readonly inputRootClass = computed(() =>
    cn(
      is.root,
      is.outline,
      classOf(is, this.size()),
      this.isInvalid() && is.invalid,
      this.isDisabled() && is.disabled,
    ),
  );
  protected readonly suffixClass = cn(is.addon, is.end);
  protected readonly clearClass = cn(
    ib.iconButton,
    ib.neutral,
    ib["variant-ghost"],
    ib.small,
    ib.circle,
    s.clearButton,
  );
  protected readonly clearStates = {
    state: "inactive",
    size: "small",
    variant: "ghost",
    color: "neutral",
    shape: "circle",
  } as const;
  protected readonly contentStates = computed(() => {
    const placement = this.placement();
    const { side, align } = parsePlacement(placement);
    return { state: "open", side, align, placement };
  });

  constructor() {
    super();
    const panel = () => this.panelRef()?.nativeElement;
    anchoredPosition({
      anchor: () => this.inputRef().nativeElement,
      floating: panel,
      active: () => this.isOpen(),
      placement: "bottom-start",
      onPosition: (result) => this.placement.set(result.placement),
    });
    overlayLayer({
      element: panel,
      active: () => this.isOpen(),
      // the field (input + clear button) is part of the popup layer
      branches: () => [this.host.nativeElement],
      // non-trapping focus scope (an enclosing Modal pauses its trap)
      autoFocus: false,
      restoreFocus: () => false,
      onEscapeKeyDown: (event) => {
        if (event.defaultPrevented) return;
        const element = panel();
        const doc = element?.ownerDocument;
        if (element && doc && element.contains(doc.activeElement)) {
          this.inputRef().nativeElement.focus();
        }
      },
      onDismiss: () => this.setOpen(false),
    });
    afterRenderEffect(() => {
      const element = panel();
      const pending = this.pendingFocus();
      if (!element || !this.isOpen() || pending === null) return;
      untracked(() => {
        const cell = pending
          ? element.querySelector<HTMLElement>(`[data-date="${pending}"]`)
          : element.querySelector<HTMLElement>(
              '[role="gridcell"][tabindex="0"]',
            );
        if (cell) {
          this.pendingFocus.set(null);
          cell.focus();
        }
      });
    });
    // Portals leave the field's `dir` subtree: keep the anchor's direction
    afterRenderEffect(() => {
      const element = panel();
      if (!element || !this.isOpen()) return;
      untracked(() => {
        const anchorDir = getDirection(this.inputRef().nativeElement);
        const containerDir = element.parentElement
          ? getDirection(element.parentElement)
          : anchorDir;
        this.panelDir.set(anchorDir === containerDir ? undefined : anchorDir);
      });
    });
  }

  override ngOnInit(): void {
    this.internal.set(this.defaultValue() ?? "");
    super.ngOnInit();
  }

  override writeValue(value: string | null): void {
    this.draft.set(null);
    super.writeValue(value ?? "");
  }
  focus(options?: FocusOptions): void {
    this.inputRef().nativeElement.focus(options);
  }
  protected setOpen(next: boolean): void {
    if (this.open() !== next) this.open.set(next);
  }
  private commit(next: string): void {
    this.internal.set(next);
    this.valueChange.emit(next);
    this.change.emit(next);
    this.notifyChange(next);
  }
  protected onInput(text: string): void {
    if (this.isDisabled() || this.isReadOnly()) return;
    this.draft.set(text);
    if (text === "") {
      this.commit("");
      return;
    }
    const date = parseDayKey(text, true);
    if (date && !this.dayDisabled(dayKey(date))) {
      this.commit(dayKey(date));
      this.month.set(monthStart(date));
    }
  }
  protected onBlur(): void {
    this.notifyTouched();
    const draft = this.draft();
    if (draft === null) return;
    const text = draft.trim();
    if (!this.isDisabled() && !this.isReadOnly()) {
      if (!text) {
        if (this.current()) this.commit("");
      } else {
        const date = parseDayKey(text, false);
        if (
          date &&
          !this.dayDisabled(dayKey(date)) &&
          dayKey(date) !== this.current()
        ) {
          this.commit(dayKey(date));
          this.month.set(monthStart(date));
        }
      }
    }
    this.draft.set(null);
    this.inputRef().nativeElement.value = this.displayValue();
  }
  protected clear(): void {
    if (this.isDisabled() || this.isReadOnly()) return;
    this.draft.set(null);
    this.commit("");
    this.focus();
  }

  protected onRootClick(event: MouseEvent): void {
    if (event.target !== this.inputRef().nativeElement) return;
    if (this.isDisabled() || this.isReadOnly()) return;
    if (!this.open()) this.syncMonth();
    this.setOpen(!this.open());
  }

  /** ArrowDown (also Alt+ArrowDown) opens the panel and moves focus into it */
  protected onInputKeyDown(event: KeyboardEvent): void {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    if (this.isDisabled() || this.isReadOnly()) return;
    if (!this.open()) {
      this.syncMonth();
      this.focusedKey.set(this.current());
      this.pendingFocus.set("");
      this.setOpen(true);
    } else {
      this.panelRef()
        ?.nativeElement.querySelector<HTMLElement>(
          '[role="gridcell"][tabindex="0"]',
        )
        ?.focus();
    }
  }

  /**
   * The portalled panel sits after the input in the Tab order: Tab past its
   * last control continues after the input (its clear button, then the rest
   * of the page); Shift+Tab before its first control returns to the input.
   */
  protected onPanelKeyDown(event: KeyboardEvent): void {
    const panel = event.currentTarget as HTMLElement;
    const input = this.inputRef().nativeElement;
    if (
      event.key !== "Tab" ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      !tabLeavesPanel(panel, event.target as Element, event.shiftKey)
    )
      return;
    event.preventDefault();
    // Tab moves on within the enclosing dialog (e.g. a Modal), else the page
    const container =
      input.closest('[role="dialog"], [role="alertdialog"]') ??
      input.ownerDocument.body;
    const next = event.shiftKey
      ? input
      : (adjacentTabbable(input, container, false) ?? input);
    next.focus();
    this.setOpen(false);
  }
}
