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
  numberAttribute,
  signal,
  untracked,
  viewChild,
} from "@angular/core";
import {
  cn,
  formatHasSeconds,
  formatTime,
  parseTimeInput,
  resolveTimeFormat,
  startOfToday,
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
  timePickerStyles as s,
} from "../../internal/styles";
import {
  MnTimePickerPanel,
  type TimePickerPanelChange,
} from "./time-picker-panel";

export type TimePickerSize = "small" | "medium" | "large";

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

/**
 * TimePicker: type a time or pick hours / minutes / seconds (/ AM-PM) from a
 * popup panel. Clicking the input toggles the panel, ArrowDown opens it and
 * moves focus into it, Escape closes it (focus returns to the input).
 * Same DOM, classes and styling hooks as React's TimePicker (the host
 * element is the field root; the input box and the clear button render the
 * DOM and hooks of React's Input / IconButton). The panel renders nothing
 * on the server.
 *
 * Two-way binding: `[(value)]` (a `Date`, `null` when cleared), `ngModel` or
 * a Reactive Forms control; `[(open)]` for the panel. Inside
 * `<mn-form-control>` it takes the field's id, label, description, invalid /
 * required / read-only / disabled states (explicit inputs win).
 *
 * @example
 * <mn-time-picker label="Start" [(value)]="start" format="HH:mm" />
 * <mn-time-picker formControlName="time" use12Hours format="hh:mm a" />
 */
@Component({
  selector: "mn-time-picker",
  exportAs: "mnTimePicker",
  imports: [MnHook, MnIcon, MnPortal, MnTimePickerPanel],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(() => MnTimePicker)],
  host: {
    "[class]": "s.timePicker",
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
    "[attr.data-minerva]": '"time-picker"',
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
        [attr.placeholder]="placeholder() ?? scope.t('timePicker.placeholder')"
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
            [attr.aria-label]="scope.t('timePicker.clear')"
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
            [class]="s.clockIcon"
            aria-hidden="true"
            mnHook="time-picker"
            mnPart="icon"
          >
            <svg mnIcon="Clock"></svg>
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
        mnHook="time-picker"
        mnPart="content"
        [mnStates]="contentStates()"
      >
        <mn-time-picker-panel
          [value]="panelValue()"
          [hasValue]="current() !== null"
          [use12Hours]="use12Hours()"
          [showSecond]="showSeconds()"
          [hourStep]="hourStep()"
          [minuteStep]="minuteStep()"
          [secondStep]="secondStep()"
          [minTime]="minTime()"
          [maxTime]="maxTime()"
          [visible]="isOpen()"
          [focusOnOpen]="focusPanelOnOpen()"
          (timeChange)="onTimeChange($event)"
        />
      </div>
    }
  `,
})
export class MnTimePicker extends MnFormValueControl<Date | null> {
  /**
   * Selected time (two-way: `[(value)]`); `null` means "no time". Not bound:
   * `defaultValue`.
   */
  readonly value = model<Date | null | undefined>(undefined);
  /** Initially selected time (when `value` is not bound) */
  readonly defaultValue = input<Date | null | undefined>(undefined);
  /** Whether the panel is open (two-way: `[(open)]`) @default false */
  readonly open = model(false);
  /**
   * Display format: "HH:mm:ss", "HH:mm", "hh:mm:ss a" or "hh:mm a"
   * @default "HH:mm:ss"
   */
  readonly format = input("HH:mm:ss");
  /** Uses a 12-hour clock with an AM/PM column @default false */
  readonly use12Hours = input(false, { transform: booleanAttribute });
  /** Placeholder of the input @default "Select time" (localized) */
  readonly placeholder = input<string | undefined>(undefined);
  /** Visible label of the input; without it the input is labelled "Time" (localized) */
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
  /** Name of the input @default "time-picker" */
  readonly name = input("time-picker");
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
  readonly size = input<TimePickerSize>("medium");
  /** Earliest selectable time; earlier options are disabled */
  readonly minTime = input<Date | undefined>(undefined);
  /** Latest selectable time; later options are disabled */
  readonly maxTime = input<Date | undefined>(undefined);
  /**
   * Shows seconds. `false` also removes the seconds token from `format`
   * ("HH:mm:ss" -> "HH:mm"): the format in use is the single source of truth
   * of the seconds column, the displayed text and parsing
   * @default true
   */
  readonly showSecond = input(true, { transform: booleanAttribute });
  /** Interval between hour options @default 1 */
  readonly hourStep = input(1, { transform: numberAttribute });
  /** Interval between minute options @default 1 */
  readonly minuteStep = input(1, { transform: numberAttribute });
  /** Interval between second options @default 1 */
  readonly secondStep = input(1, { transform: numberAttribute });

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
    () => this.label() ?? this.ariaLabel() ?? this.scope.t("timePicker.label"),
  );
  protected readonly labelledBy = computed(
    () =>
      this.ariaLabelledby() ??
      (this.fieldContext && !this.label() && !this.ariaLabel()
        ? this.fieldContext.labelId()
        : null),
  );

  /** The format in use decides the seconds column (one source of truth) */
  private readonly resolvedFormat = computed(() =>
    resolveTimeFormat(this.format(), this.showSecond()),
  );
  protected readonly showSeconds = computed(() =>
    formatHasSeconds(this.resolvedFormat()),
  );
  protected readonly current = computed<Date | null>(() => {
    const value = this.value();
    return value === undefined ? (this.defaultValue() ?? null) : value;
  });
  protected readonly panelValue = computed(
    () => this.current() ?? startOfToday(),
  );
  /** Text being typed; `null` shows the formatted value */
  private readonly draft = signal<string | null>(null);
  protected readonly displayValue = computed(() => {
    const draft = this.draft();
    if (draft !== null) return draft;
    const current = this.current();
    return current ? formatTime(current, this.resolvedFormat()) : "";
  });
  protected readonly showClear = computed(
    () =>
      this.clearable() &&
      !!this.current() &&
      !this.isDisabled() &&
      !this.isReadOnly(),
  );
  /** Opened from the keyboard: the panel moves focus into its first column */
  protected readonly focusPanelOnOpen = signal(false);
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

  override writeValue(value: Date | null): void {
    this.draft.set(null);
    this.value.set(value ?? null);
  }

  /** Focuses the input */
  focus(options?: FocusOptions): void {
    this.inputRef().nativeElement.focus(options);
  }

  private setOpen(next: boolean): void {
    if (this.open() !== next) this.open.set(next);
  }

  private commit(next: Date | null): void {
    this.value.set(next);
    this.notifyChange(next);
  }

  protected onTimeChange({ type, value }: TimePickerPanelChange): void {
    const next = new Date(this.current() ?? startOfToday());
    if (type === "hour") next.setHours(value);
    else if (type === "minute") next.setMinutes(value);
    else if (type === "second") next.setSeconds(value);
    else {
      const hours = next.getHours() % 12;
      next.setHours(value === 1 ? hours + 12 : hours);
    }
    this.draft.set(null);
    this.commit(next);
  }

  protected onInput(text: string): void {
    this.draft.set(text);
    const parsed = parseTimeInput(text, this.resolvedFormat(), {
      strict: true,
      base: this.current() ?? undefined,
    });
    if (parsed) this.commit(parsed);
  }

  protected onBlur(): void {
    this.notifyTouched();
    const draft = this.draft();
    if (draft === null) return;
    const current = this.current();
    if (draft.trim() === "") {
      if (current) this.commit(null);
    } else {
      const parsed = parseTimeInput(draft, this.resolvedFormat(), {
        strict: false,
        base: current ?? undefined,
      });
      if (parsed && parsed.getTime() !== current?.getTime())
        this.commit(parsed);
    }
    this.draft.set(null);
    // the binding may keep its previous text (e.g. "" -> typed "ab" -> "")
    this.inputRef().nativeElement.value = this.displayValue();
  }

  protected clear(): void {
    this.draft.set(null);
    this.commit(null);
    this.inputRef().nativeElement.focus();
  }

  protected onRootClick(event: MouseEvent): void {
    if (event.target !== this.inputRef().nativeElement) return;
    if (this.isDisabled() || this.isReadOnly()) return;
    this.focusPanelOnOpen.set(false);
    this.setOpen(!this.open());
  }

  /** ArrowDown (also Alt+ArrowDown) opens the panel and moves focus into it */
  protected onInputKeyDown(event: KeyboardEvent): void {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    if (this.isDisabled() || this.isReadOnly()) return;
    if (!this.open()) {
      this.focusPanelOnOpen.set(true);
      this.setOpen(true);
    } else {
      this.panelRef()
        ?.nativeElement.querySelector<HTMLElement>(
          '[role="option"][tabindex="0"]',
        )
        ?.focus();
    }
  }

  /**
   * The portalled panel sits after the input in the Tab order: Tab past its
   * last column continues after the input (its clear button, then the rest
   * of the page); Shift+Tab before its first column returns to the input.
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
