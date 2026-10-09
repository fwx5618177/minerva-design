import { DOCUMENT } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  afterRenderEffect,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  signal,
  untracked,
  viewChild,
} from "@angular/core";
import { cn, createTypeahead, getNextIndex } from "@minerva/core";
import { parsePlacement, type Placement } from "@minerva/dom";
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
import { anchoredPosition, overlayLayer } from "../../internal/overlay";
import { injectIsBrowser } from "../../internal/platform";
import { MnPortal } from "../../internal/portal";
import { selectStyles as s } from "../../internal/styles";
import {
  MN_SELECT,
  type SelectContext,
  type SelectItemRecord,
} from "./select-context";

/** Size of the Select trigger */
export type SelectSize = "small" | "medium" | "large";

/** Which option is highlighted when the listbox opens */
type OpenIntent = "selected" | "first" | "last";

const OPTION_SELECTOR = '[role="option"]';
const PAGE_SIZE = 10;

const getOptions = (listbox: HTMLElement) =>
  Array.from(listbox.querySelectorAll<HTMLElement>(OPTION_SELECTOR));

const isOptionDisabled = (option: HTMLElement) =>
  option.getAttribute("aria-disabled") === "true";

const findOption = (listbox: HTMLElement, value: string | null) =>
  value === null
    ? undefined
    : getOptions(listbox).find((option) => option.dataset["value"] === value);

const isPrintable = (event: KeyboardEvent) =>
  event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;

const optionalBoolean = (value: unknown): boolean | undefined =>
  value === undefined || value === null ? undefined : booleanAttribute(value);

/** Keeps the hidden native <select> out of sight and out of the layout */
const VISUALLY_HIDDEN =
  "position: absolute; border: 0; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; word-wrap: normal";

/**
 * Select: a single-choice dropdown following the WAI-ARIA "select-only
 * combobox" pattern. The trigger is a `<button role="combobox">`; the popup
 * is a `role="listbox"` portalled and anchored below it (flips above when
 * there is no room, at least as wide as the trigger, height capped to the
 * viewport). Options are `<mn-select-item>` children (optionally in
 * `<mn-select-group>` with a `<mn-select-label>`, separated by
 * `<mn-select-separator>`). A hidden native `<select>` carries `name` /
 * `required` / `disabled` for native forms (FormData, reset). Same DOM,
 * classes, keyboard and styling hooks as React's Select (the host element is
 * `display: contents`).
 *
 * Two-way binding: `[(value)]`, `[(open)]`, `ngModel` or a Reactive Forms
 * control (ControlValueAccessor). Inside `<mn-form-control>` it takes the
 * field's id, description, invalid / required / disabled states.
 *
 * @example
 * <mn-select aria-label="Fruit" placeholder="Pick one" [(value)]="fruit">
 *   <mn-select-item value="apple">Apple</mn-select-item>
 *   <mn-select-item value="pear" disabled>Pear</mn-select-item>
 * </mn-select>
 */
@Component({
  selector: "mn-select",
  exportAs: "mnSelect",
  imports: [MnHook, MnIcon, MnPortal],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideValueAccessor(() => MnSelect),
    { provide: MN_SELECT, useExisting: MnSelect },
  ],
  host: {
    style: "display: contents",
    "[attr.aria-label]": "null",
    "[attr.aria-labelledby]": "null",
    "[attr.aria-describedby]": "null",
    "[attr.id]": "null",
  },
  template: `
    <button
      #trigger
      type="button"
      role="combobox"
      aria-haspopup="listbox"
      aria-autocomplete="none"
      data-component="select"
      [attr.id]="field.id()"
      [attr.aria-expanded]="isOpen()"
      [attr.aria-controls]="isOpen() ? listboxId : null"
      [attr.aria-label]="ariaLabel() ?? null"
      [attr.aria-labelledby]="ariaLabelledby() ?? null"
      [attr.aria-describedby]="field.describedBy()"
      [attr.aria-required]="field.required() ? 'true' : null"
      [attr.aria-invalid]="field.invalid() ? 'true' : null"
      [attr.data-placeholder]="current() === '' ? '' : null"
      [disabled]="isDisabled()"
      [class]="triggerClasses()"
      (click)="setOpen(!isOpen())"
      (keydown)="onTriggerKeyDown($event)"
      (keyup)="onTriggerKeyUp($event)"
      (blur)="notifyTouched()"
      mnHook="select"
      [mnStates]="rootStates()"
    >
      <span [class]="s.value" mnHook="select" mnPart="value"
        ><span>{{
          current() === "" ? (placeholder() ?? "") : selectedLabel()
        }}</span></span
      >
      <span [class]="s.icon" aria-hidden="true" mnHook="select" mnPart="icon"
        ><svg mnIcon="ChevronDown"></svg
      ></span>
    </button>
    <select
      #native
      aria-hidden="true"
      tabindex="-1"
      [attr.name]="name() ?? null"
      [required]="field.required()"
      [disabled]="isDisabled()"
      [attr.style]="hiddenStyle"
      (change)="onNativeChange(native.value)"
      (focus)="focus()"
    ></select>
    @if (isOpen()) {
      <div
        *mnPortal
        #positioner
        [class]="s.positioner"
        [attr.data-side]="side()"
      >
        <div
          #listbox
          role="listbox"
          tabindex="-1"
          [attr.id]="listboxId"
          [attr.aria-label]="ariaLabel() ?? null"
          [attr.aria-labelledby]="listboxLabelledby()"
          [class]="contentClasses()"
          (keydown)="onListboxKeyDown($event)"
          mnHook="select"
          mnPart="content"
          [mnStates]="contentStates()"
        >
          <ng-content />
        </div>
      </div>
    }
  `,
})
export class MnSelect
  extends MnFormValueControl<string>
  implements SelectContext
{
  /** Selected value ("" for none; two-way: `[(value)]`) */
  readonly value = model<string | undefined>(undefined);
  /** Initially selected value when `value` is not bound */
  readonly defaultValue = input<string | undefined>(undefined);
  /** Whether the popup is open (two-way: `[(open)]`) */
  readonly open = model<boolean | undefined>(undefined);
  /** Whether the popup is initially open when `open` is not bound @default false */
  readonly defaultOpen = input(false, { transform: booleanAttribute });
  /** Text shown in the trigger while nothing is selected */
  readonly placeholder = input<string | undefined>(undefined);
  /** Size of the trigger @default "medium" */
  readonly size = input<SelectSize>("medium");
  /** Shows the error state (also set by an invalid enclosing field) @default false */
  readonly invalid = input(false, { transform: booleanAttribute });
  /**
   * Disables the select. Inherited from an enclosing field when not set; an
   * explicit `false` overrides the field @default false
   */
  readonly disabled = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Marks the select as required (inherited from an enclosing field) @default false */
  readonly required = input<boolean | undefined, unknown>(undefined, {
    transform: optionalBoolean,
  });
  /** Name of the hidden native select, used in native forms */
  readonly name = input<string | undefined>(undefined);
  /** id of the trigger (defaults to the enclosing field's id) */
  readonly id = input<string | undefined>(undefined);
  /** Accessible label of the trigger, required when there is no visible label */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  /** id(s) of the element(s) labelling the trigger (also names the listbox) */
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: "aria-labelledby",
  });
  /** Extra ids of elements describing the trigger (aria-describedby) */
  readonly ariaDescribedby = input<string | undefined>(undefined, {
    alias: "aria-describedby",
  });
  /** Additional class name of the trigger */
  readonly className = input<string | undefined>(undefined);
  /** Additional class name of the popup */
  readonly contentClassName = input<string | undefined>(undefined);

  protected readonly s = s;
  protected readonly hiddenStyle = VISUALLY_HIDDEN;
  protected readonly listboxId = injectId("select-listbox");
  private readonly document = inject(DOCUMENT);
  private readonly ownDestroyRef = inject(DestroyRef);
  private readonly fieldContext = injectFormField();
  protected readonly field = fieldWiring(this.fieldContext, {
    id: () => this.id(),
    describedBy: () => this.ariaDescribedby(),
    invalid: () => this.invalid() || this.controlInvalid(),
    required: () => !!this.required(),
  });
  protected readonly isDisabled = computed(
    () =>
      this.disabled() ??
      (this.formDisabled() || (this.fieldContext?.disabled() ?? false)),
  );

  /** The selected value ("" for none) */
  readonly current = computed(() => this.value() ?? this.defaultValue() ?? "");
  protected readonly isOpen = computed(() => this.open() ?? this.defaultOpen());

  private readonly registry = signal<SelectItemRecord[]>([]);
  /** The registered options (unique values, in registration order) */
  protected readonly items = computed(() => {
    const seen = new Set<string>();
    return this.registry().filter((item) => {
      const value = item.value();
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  });
  private readonly selectedItem = computed(() =>
    this.items().find((item) => item.value() === this.current()),
  );
  protected readonly selectedLabel = computed(
    () => this.selectedItem()?.label() ?? "",
  );

  private readonly highlightedValue = signal<string | null>(null);
  readonly highlighted = this.highlightedValue.asReadonly();
  private readonly placement = signal<Placement>("bottom-start");
  protected readonly side = computed(
    () => parsePlacement(this.placement()).side,
  );
  private readonly typeahead = createTypeahead();
  private openIntent: OpenIntent = "selected";
  /** Scroll the highlighted option into view once positioned (keyboard) */
  private scrollPending = false;
  /** The listbox was positioned since it opened */
  private positioned = false;

  private readonly triggerRef =
    viewChild.required<ElementRef<HTMLButtonElement>>("trigger");
  private readonly nativeRef =
    viewChild.required<ElementRef<HTMLSelectElement>>("native");
  private readonly positionerRef =
    viewChild<ElementRef<HTMLElement>>("positioner");
  private readonly listboxRef = viewChild<ElementRef<HTMLElement>>("listbox");

  protected readonly rootStates = computed(() => ({
    state: this.isOpen() ? "open" : "closed",
    disabled: this.isDisabled(),
    invalid: this.field.invalid(),
    required: this.field.required(),
    size: this.size(),
  }));
  protected readonly contentStates = computed(() => {
    const placement = this.placement();
    const { side, align } = parsePlacement(placement);
    return { state: "open", side, align, placement };
  });
  protected readonly triggerClasses = computed(() =>
    cn(
      s.trigger,
      classOf(s, this.size()),
      this.field.invalid() && s.invalid,
      this.className(),
    ),
  );
  protected readonly contentClasses = computed(() =>
    cn(s.content, this.contentClassName()),
  );
  protected readonly listboxLabelledby = computed(() =>
    this.ariaLabel()
      ? null
      : (this.ariaLabelledby() ?? this.fieldContext?.labelId() ?? null),
  );

  constructor() {
    super();
    anchoredPosition({
      anchor: () => this.triggerRef().nativeElement,
      floating: () => this.positionerRef()?.nativeElement,
      active: () => this.isOpen(),
      placement: "bottom-start",
      offset: { mainAxis: 4 },
      matchAnchorWidth: "min",
      fitViewportHeight: true,
      onPosition: (result) => {
        this.placement.set(result.placement);
        this.positioned = true;
        if (this.scrollPending) this.scrollHighlightedIntoView();
      },
    });
    overlayLayer({
      element: () => this.positionerRef()?.nativeElement,
      active: () => this.isOpen(),
      autoFocus: false,
      restoreFocus: () => false,
      branches: () => [this.triggerRef().nativeElement],
      onEscapeKeyDown: (event) => {
        const positioner = this.positionerRef()?.nativeElement;
        if (event.defaultPrevented || !positioner) return;
        if (positioner.contains(this.document.activeElement)) {
          this.triggerRef().nativeElement.focus();
        }
      },
      onDismiss: () => this.setOpen(false),
    });
    if (injectIsBrowser()) this.browserEffects();
  }

  private browserEffects(): void {
    // On open: highlight (and focus) the selected option, else the first /
    // last enabled one depending on how the listbox was opened.
    let initialized: HTMLElement | null = null;
    afterRenderEffect(() => {
      const listbox = this.listboxRef()?.nativeElement ?? null;
      if (!listbox || listbox === initialized) {
        if (!listbox) initialized = null;
        return;
      }
      initialized = listbox;
      this.positioned = false;
      untracked(() => {
        const intent = this.openIntent;
        this.openIntent = "selected";
        const enabled = getOptions(listbox).filter((o) => !isOptionDisabled(o));
        const target =
          intent === "last"
            ? enabled[enabled.length - 1]
            : intent === "first"
              ? enabled[0]
              : (enabled.find((o) => o.dataset["value"] === this.current()) ??
                enabled[0]);
        this.typeahead.reset();
        this.scrollPending = true;
        this.highlightedValue.set(target?.dataset["value"] ?? null);
      });
    });
    // DOM focus follows the highlight (the listbox itself when none).
    afterRenderEffect(() => {
      const listbox = this.listboxRef()?.nativeElement;
      const highlighted = this.highlightedValue();
      if (!listbox) return;
      const target = findOption(listbox, highlighted) ?? listbox;
      if (target.ownerDocument.activeElement !== target) {
        target.focus({ preventScroll: true });
      }
      if (this.positioned && this.scrollPending) {
        this.scrollHighlightedIntoView();
      }
    });
    // The hidden native select lists every value (built on the client: no
    // Angular markers inside <select>); `defaultSelected` marks what a form
    // reset restores, then the live value is applied.
    afterRenderEffect(() => {
      const native = this.nativeRef().nativeElement;
      const value = this.current();
      const resetTo = this.defaultValue() ?? "";
      const entries = [
        { value: "", text: "" },
        ...this.items().map((item) => ({
          value: item.value(),
          text: item.text(),
        })),
      ];
      if (!entries.some((entry) => entry.value === value)) {
        entries.push({ value, text: "" });
      }
      untracked(() => {
        const options = native.options;
        entries.forEach((entry, index) => {
          let option = options[index];
          if (!option) {
            option = this.document.createElement("option");
            native.appendChild(option);
          }
          option.value = entry.value;
          option.textContent = entry.text;
          option.defaultSelected = entry.value === resetTo;
        });
        while (options.length > entries.length)
          options[entries.length].remove();
        native.value = value;
      });
    });
    // A form reset restores defaultValue (like a native select).
    afterNextRender(() => {
      const form = this.nativeRef().nativeElement.form;
      if (!form) return;
      const onReset = () => this.value.set(this.defaultValue() ?? "");
      form.addEventListener("reset", onReset);
      this.ownDestroyRef.onDestroy(() =>
        form.removeEventListener("reset", onReset),
      );
    });
  }

  override writeValue(value: string | null | undefined): void {
    this.value.set(value ?? "");
  }

  /** Registers an option (called by `<mn-select-item>`) */
  register(item: SelectItemRecord): () => void {
    this.registry.update((items) => [...items, item]);
    return () =>
      this.registry.update((items) => items.filter((other) => other !== item));
  }

  /** Highlights an option (pointer hover: no scrolling) */
  highlight(value: string): void {
    this.scrollPending = false;
    this.highlightedValue.set(value);
  }

  /** Selects an option, closes the listbox and focuses the trigger */
  select(value: string): void {
    this.commitValue(value);
    this.close(true);
  }

  /** Opens or closes the listbox (`openChange` reports it) */
  setOpen(next: boolean): void {
    if (next && this.isDisabled()) return;
    if (next !== this.isOpen()) this.open.set(next);
  }

  /** Focuses the trigger */
  focus(options?: FocusOptions): void {
    this.triggerRef().nativeElement.focus(options);
  }

  private commitValue(next: string): void {
    if (next === this.current()) return;
    this.value.set(next);
    this.notifyChange(next);
  }

  private close(focusTrigger: boolean): void {
    if (focusTrigger) this.focus();
    this.setOpen(false);
  }

  private openWith(intent: OpenIntent): void {
    this.openIntent = intent;
    this.setOpen(true);
  }

  private scrollHighlightedIntoView(): void {
    const listbox = this.listboxRef()?.nativeElement;
    if (!listbox) return;
    this.scrollPending = false;
    findOption(listbox, this.highlightedValue())?.scrollIntoView?.({
      block: "nearest",
    });
  }

  protected onNativeChange(value: string): void {
    // Browser autofill / native validation
    this.commitValue(value);
  }

  protected onTriggerKeyDown(event: KeyboardEvent): void {
    if (this.isOpen()) return;
    const { key } = event;
    // Typeahead while closed changes the selection without opening (like a
    // native select). Space continues a search in progress.
    if (
      isPrintable(event) &&
      (key !== " " || this.typeahead.getBuffer() !== "")
    ) {
      const list = this.items().map((item) => ({
        value: item.value(),
        text: item.text(),
        disabled: item.disabled(),
      }));
      const index = this.typeahead.search(
        key,
        list,
        list.findIndex((item) => item.value === this.current()),
      );
      event.preventDefault();
      if (index !== -1) this.commitValue(list[index].value);
      return;
    }
    const intent: Record<string, OpenIntent> = {
      Enter: "selected",
      " ": "selected",
      ArrowDown: "selected",
      ArrowUp: this.current() === "" ? "last" : "selected",
      Home: "first",
      End: "last",
    };
    if (key in intent) {
      // Prevents the native click (Enter) and page scrolling (arrows).
      event.preventDefault();
      this.openWith(intent[key]);
    }
  }

  /** Space is handled on keydown: its keyup never (re)toggles */
  protected onTriggerKeyUp(event: KeyboardEvent): void {
    if (event.key === " ") event.preventDefault();
  }

  protected onListboxKeyDown(event: KeyboardEvent): void {
    const listbox = this.listboxRef()?.nativeElement;
    if (!listbox) return;
    const { key } = event;
    if (key === "Tab") {
      // Close and let the browser move on from the trigger: the natural Tab
      // order continues after the select (no preventDefault).
      this.close(true);
      return;
    }
    const options = getOptions(listbox);
    const highlighted = this.highlightedValue();
    const currentIndex = options.findIndex(
      (option) => option.dataset["value"] === highlighted,
    );
    const current = currentIndex === -1 ? undefined : options[currentIndex];
    const selectCurrent = () => {
      if (current && !isOptionDisabled(current)) {
        this.select(current.dataset["value"] as string);
      }
    };

    if (key === "Enter" || (key === "ArrowUp" && event.altKey)) {
      event.preventDefault();
      selectCurrent();
      return;
    }
    if (key === " " && this.typeahead.getBuffer() === "") {
      event.preventDefault();
      selectCurrent();
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    const next = getNextIndex({
      currentIndex,
      count: options.length,
      key,
      loop: false,
      isDisabled: (i) => isOptionDisabled(options[i]),
      pageSize: PAGE_SIZE,
    });
    if (next !== null || key.startsWith("Arrow") || key.startsWith("Page")) {
      // Arrow keys never scroll the list / page, even at the edges.
      event.preventDefault();
    }
    if (next === null && isPrintable(event)) {
      const index = this.typeahead.search(
        key,
        options.map((option) => ({
          text: option.dataset["textValue"] ?? option.textContent ?? "",
          disabled: isOptionDisabled(option),
        })),
        currentIndex,
      );
      if (index !== -1) {
        event.preventDefault();
        this.scrollPending = true;
        this.highlightedValue.set(options[index].dataset["value"] as string);
      }
      return;
    }
    if (next !== null) {
      this.typeahead.reset();
      this.scrollPending = true;
      this.highlightedValue.set(options[next].dataset["value"] as string);
    }
  }
}
