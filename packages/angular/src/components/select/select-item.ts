import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  signal,
  viewChild,
  type AfterViewChecked,
} from "@angular/core";
import { MnHook } from "../../internal/hooks";
import { MnIcon } from "../../internal/icon";
import { injectId } from "../../internal/ids";
import { selectStyles as s } from "../../internal/styles";
import {
  MN_SELECT,
  MN_SELECT_GROUP,
  type SelectGroupContext,
} from "./select-context";

/**
 * An option of a `<mn-select>` (`role="option"`): registers with its select
 * (so the trigger shows its label and the hidden native select lists it
 * while the listbox is closed, on the server included). Its content is the
 * option's label; the trigger shows its text content. Same DOM, classes and
 * styling hooks (`option`) as React's SelectItem.
 *
 * @example
 * <mn-select-item value="fr">France</mn-select-item>
 */
@Component({
  selector: "mn-select-item",
  exportAs: "mnSelectItem",
  imports: [MnHook, MnIcon],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: "option",
    tabindex: "-1",
    "[class]": "s.item",
    "[attr.aria-selected]": "selected()",
    "[attr.aria-disabled]": "disabled() ? 'true' : null",
    "[attr.data-value]": "value()",
    "[attr.data-text-value]": "textValue() ?? null",
    "data-minerva": "option",
    "data-part": "root",
    "[attr.data-selected]": "selected() ? '' : null",
    "[attr.data-highlighted]": "highlighted() ? '' : null",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "(pointermove)": "onPointerMove()",
    "(click)": "onClick()",
  },
  template: `
    <span #label [class]="s.itemText" mnHook="option" mnPart="label"
      ><ng-content
    /></span>
    @if (selected()) {
      <span
        [class]="s.itemIndicator"
        aria-hidden="true"
        mnHook="option"
        mnPart="indicator"
        ><svg mnIcon="Check"></svg
      ></span>
    }
  `,
})
export class MnSelectItem implements AfterViewChecked {
  /** Value of the option (must not be an empty string) */
  readonly value = input.required<string>();
  /** Prevents selecting the option @default false */
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Text used for typeahead when the content is not plain text */
  readonly textValue = input<string | undefined>(undefined);

  protected readonly s = s;
  private readonly select = inject(MN_SELECT);
  private readonly labelRef = viewChild<ElementRef<HTMLElement>>("label");
  private readonly content = signal("");

  protected readonly selected = computed(
    () => this.select.current() === this.value(),
  );
  protected readonly highlighted = computed(
    () => this.select.highlighted() === this.value(),
  );

  constructor() {
    const unregister = this.select.register({
      value: this.value,
      disabled: this.disabled,
      text: computed(() => this.textValue() ?? this.content()),
      label: this.content.asReadonly(),
    });
    inject(DestroyRef).onDestroy(unregister);
  }

  /** The label is the projected text content (kept in sync) */
  ngAfterViewChecked(): void {
    const text = this.labelRef()?.nativeElement.textContent ?? "";
    if (text !== this.content()) this.content.set(text);
  }

  protected onPointerMove(): void {
    if (!this.disabled() && !this.highlighted()) {
      this.select.highlight(this.value());
    }
  }

  protected onClick(): void {
    if (!this.disabled()) this.select.select(this.value());
  }
}

/**
 * A group of `<mn-select>` options (`role="group"`), labelled by its
 * `<mn-select-label>`. Same DOM and styling hooks (`option-group`) as
 * React's SelectGroup.
 *
 * @example
 * <mn-select-group>
 *   <mn-select-label>Fruits</mn-select-label>
 *   <mn-select-item value="apple">Apple</mn-select-item>
 * </mn-select-group>
 */
@Component({
  selector: "mn-select-group",
  exportAs: "mnSelectGroup",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MN_SELECT_GROUP,
      useFactory: (): SelectGroupContext => {
        const labelId = injectId("select-label");
        const hasLabel = signal(false);
        return {
          labelId,
          hasLabel: hasLabel.asReadonly(),
          setHasLabel: (present: boolean) => hasLabel.set(present),
        };
      },
    },
  ],
  host: {
    role: "group",
    "[attr.aria-labelledby]": "group.hasLabel() ? group.labelId : null",
    "data-minerva": "option-group",
    "data-part": "root",
  },
  template: `<ng-content />`,
})
export class MnSelectGroup {
  protected readonly group = inject(MN_SELECT_GROUP);
}

/**
 * The (non-selectable) heading labelling its `<mn-select-group>`. Same DOM,
 * classes and styling hooks (`select-label`) as React's SelectLabel.
 */
@Component({
  selector: "mn-select-label",
  exportAs: "mnSelectLabel",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[attr.id]": "group?.labelId ?? null",
    "[class]": "s.label",
    "data-minerva": "select-label",
    "data-part": "root",
  },
  template: `<ng-content />`,
})
export class MnSelectLabel {
  protected readonly s = s;
  protected readonly group = inject(MN_SELECT_GROUP, { optional: true });

  constructor() {
    const group = this.group;
    if (!group) return;
    group.setHasLabel(true);
    inject(DestroyRef).onDestroy(() => group.setHasLabel(false));
  }
}

/**
 * A presentational divider between `<mn-select>` options or groups. Same
 * DOM, classes and styling hooks (`select-separator`) as React's
 * SelectSeparator.
 */
@Component({
  selector: "mn-select-separator",
  exportAs: "mnSelectSeparator",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "aria-hidden": "true",
    "[class]": "s.separator",
    "data-minerva": "select-separator",
    "data-part": "root",
  },
  template: ``,
})
export class MnSelectSeparator {
  protected readonly s = s;
}
