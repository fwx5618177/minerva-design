import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  output,
} from "@angular/core";
import { cn, getNextIndex } from "@minerva/core";
import { getDirection } from "@minerva/dom";
import { hasContent, templateOf, type MnContent } from "../../internal/content";
import { MnFormValueControl, provideValueAccessor } from "../../internal/forms";
import { MnHook } from "../../internal/hooks";
import { segmentedControlStyles as s } from "../../internal/styles";

/** Density of a SegmentedControl */
export type SegmentedControlSize = "small" | "medium" | "large";

/**
 * Color of a SegmentedControl: `neutral` shows a raised surface thumb on a
 * muted track, `primary` a solid primary thumb
 */
export type SegmentedControlColor = "neutral" | "primary";

/** A segment of a SegmentedControl */
export interface SegmentedControlOptionObject {
  /** Value of the segment */
  value: string;
  /** Visible label (string or template; default: the value, unless an icon is given) */
  label?: MnContent;
  /** Icon shown before the label (string or template; alone for an icon-only segment) */
  icon?: MnContent;
  /** Blocks this segment */
  disabled?: boolean;
  /** Accessible name; required for an icon-only segment */
  "aria-label"?: string;
}

/** A segment: a plain string (value and label) or an option object */
export type SegmentedControlOption = string | SegmentedControlOptionObject;

interface Segment {
  value: string;
  icon: MnContent;
  label: MnContent;
  ariaLabel: string | null;
  disabled: boolean;
  selected: boolean;
  tabindex: number;
}

/**
 * SegmentedControl: a single-choice segmented switch for modes and filters
 * (a `radiogroup` of `radio` segments sharing the width equally, with a
 * thumb sliding under the selected segment). Use Tabs when each choice has
 * its own content panel.
 * Keyboard: a roving tab stop (the selected segment, else the first enabled
 * one); the arrow keys move and select, skipping disabled segments and
 * wrapping around; Home / End select the first / last enabled segment.
 *
 * Two-way binding of the selected value: `[(value)]`, `ngModel` or a
 * Reactive Forms control (ControlValueAccessor); `(change)` reports user
 * selections.
 *
 * @example
 * <mn-segmented-control aria-label="View" [options]="['List', 'Grid']" [(value)]="view" />
 */
@Component({
  selector: "mn-segmented-control",
  exportAs: "mnSegmentedControl",
  imports: [MnHook, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(() => MnSegmentedControl)],
  host: {
    role: "radiogroup",
    "data-minerva": "segmented-control",
    "data-part": "root",
    "[attr.data-disabled]": "isDisabled() ? '' : null",
    "[attr.data-size]": "size()",
    "[attr.data-color]": "color()",
    "[attr.aria-label]": "ariaLabel() ?? null",
    "[attr.aria-labelledby]": "ariaLabelledby() ?? null",
    "[attr.aria-disabled]": "isDisabled() ? 'true' : null",
    "[attr.name]": "null",
    "[style.--_segmented-control-count]": "segments().length || 1",
    "[style.--_segmented-control-index]":
      "selectedIndex() < 0 ? 0 : selectedIndex()",
    "[class]": "rootClass()",
    "(focusout)": "touched($event)",
  },
  template: `<span
      mnHook="segmented-control"
      mnPart="indicator"
      [class]="s.indicator"
      [hidden]="selectedIndex() < 0"
      aria-hidden="true"
    ></span>
    @for (segment of segments(); track segment.value; let index = $index) {
      <div
        role="radio"
        mnHook="segmented-control"
        mnPart="item"
        [mnStates]="{ selected: segment.selected, disabled: segment.disabled }"
        [class]="s.item"
        [attr.data-value]="segment.value"
        [attr.aria-checked]="segment.selected"
        [attr.aria-disabled]="segment.disabled ? 'true' : null"
        [attr.aria-label]="segment.ariaLabel"
        [attr.tabindex]="segment.tabindex"
        (click)="select(index)"
        (keydown)="navigate($event, index)"
      >
        @if (hasContent(segment.icon)) {
          <span
            mnHook="segmented-control"
            mnPart="icon"
            [class]="s.icon"
            aria-hidden="true"
          >
            @if (templateOf(segment.icon); as tpl) {
              <ng-container [ngTemplateOutlet]="tpl" />
            } @else {
              {{ segment.icon }}
            }
          </span>
        }
        @if (hasContent(segment.label)) {
          <span mnHook="segmented-control" mnPart="label" [class]="s.label">
            @if (templateOf(segment.label); as tpl) {
              <ng-container [ngTemplateOutlet]="tpl" />
            } @else {
              {{ segment.label }}
            }
          </span>
        }
      </div>
    }
    @if (name()) {
      <input
        type="hidden"
        [attr.name]="name()"
        [value]="selected() ?? ''"
        [disabled]="isDisabled()"
      />
    }`,
})
export class MnSegmentedControl extends MnFormValueControl<string | null> {
  /** The segments: strings or option objects */
  readonly options = input<readonly SegmentedControlOption[]>([]);
  /** Selected value (two-way: `[(value)]`; `null`: none) */
  readonly value = model<string | null | undefined>(undefined);
  /** Initially selected value when `value` is not bound */
  readonly defaultValue = input<string | undefined>(undefined);
  /** Segment density */
  readonly size = input<SegmentedControlSize>("medium");
  /** Thumb color */
  readonly color = input<SegmentedControlColor>("neutral");
  /** Fills the width of the container (the segments always share the width equally) */
  readonly fullWidth = input(false, { transform: booleanAttribute });
  /** Blocks every segment */
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Name of a hidden input carrying the value in a form */
  readonly name = input<string | undefined>(undefined);
  /** Accessible label of the group */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  /** id(s) of the element(s) labelling the group */
  readonly ariaLabelledby = input<string | undefined>(undefined, {
    alias: "aria-labelledby",
  });
  /** The user selected a segment (its value) */
  readonly change = output<string>();

  protected readonly s = s;
  protected readonly templateOf = templateOf;
  protected readonly hasContent = hasContent;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly isDisabled = computed(
    () => this.disabled() || this.formDisabled(),
  );
  /** The selected value (the bound value, else the default) */
  protected readonly selected = computed(() => {
    const value = this.value();
    return value !== undefined ? value : (this.defaultValue() ?? null);
  });
  private readonly items = computed<SegmentedControlOptionObject[]>(() =>
    this.options().map((option) =>
      typeof option === "string" ? { value: option } : option,
    ),
  );
  protected readonly selectedIndex = computed(() =>
    this.items().findIndex((item) => item.value === this.selected()),
  );
  protected readonly segments = computed<Segment[]>(() => {
    const disabled = this.isDisabled();
    const selectedIndex = this.selectedIndex();
    const items = this.items();
    const isDisabled = (index: number) =>
      disabled || Boolean(items[index]?.disabled);
    // Roving tab stop: the selection, else the first enabled segment.
    const tabStop =
      selectedIndex >= 0 && !isDisabled(selectedIndex)
        ? selectedIndex
        : items.findIndex((_, index) => !isDisabled(index));
    return items.map((item, index) => ({
      value: item.value,
      icon: item.icon,
      label: item.label ?? (hasContent(item.icon) ? undefined : item.value),
      ariaLabel: item["aria-label"] ?? null,
      disabled: isDisabled(index),
      selected: index === selectedIndex,
      tabindex: !disabled && index === tabStop ? 0 : -1,
    }));
  });
  protected readonly rootClass = computed(() => {
    const size = this.size();
    return cn(
      s.segmentedControl,
      (size === "small" || size === "large") && s[size],
      this.color() === "primary" && s.primary,
      this.fullWidth() && s.fullWidth,
      this.isDisabled() && s.disabled,
    );
  });

  protected select(index: number): void {
    const segment = this.segments()[index];
    if (!segment || segment.disabled || segment.selected) return;
    this.value.set(segment.value);
    this.notifyChange(segment.value);
    this.change.emit(segment.value);
  }

  protected navigate(event: KeyboardEvent, index: number): void {
    if (this.isDisabled()) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!event.repeat) this.select(index);
      return;
    }
    const segments = this.segments();
    const next = getNextIndex({
      currentIndex: index,
      count: segments.length,
      key: event.key,
      orientation: "both",
      dir: getDirection(this.host.nativeElement),
      isDisabled: (i) => Boolean(segments[i]?.disabled),
    });
    if (next === null) return;
    event.preventDefault();
    this.select(next);
    this.host.nativeElement
      .querySelectorAll<HTMLElement>('[role="radio"]')
      [next]?.focus();
  }

  protected touched(event: FocusEvent): void {
    const to = event.relatedTarget as Node | null;
    if (!to || !this.host.nativeElement.contains(to)) this.notifyTouched();
  }

  override writeValue(value: string | null | undefined): void {
    this.value.set(value ?? null);
  }
}
