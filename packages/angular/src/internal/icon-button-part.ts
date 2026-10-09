import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  input,
  output,
  viewChild,
} from "@angular/core";
import { cn } from "@minerva/core";
import { MnHook } from "./hooks";
import { MnIcon } from "./icon";
import type { IconName } from "./icon-data";
import { iconButtonStyles as ib, tooltipStyles as tt } from "./styles";

/**
 * Internal: the DOM of React's `<IconButton label=... icon=...>` used inside
 * composite components (Upload, JsonField, KeyValueEditor, CodeBlock): the
 * tooltip trigger wrapper (`div`, the host) around a ghost / neutral
 * `<button>` with its icon-button classes and styling hooks. The tooltip
 * popup itself is not rendered (the button is named by `aria-label`).
 *
 * @example
 * <div mnIconButtonPart icon="X" label="Remove" (activate)="remove()"></div>
 */
@Component({
  selector: "div[mnIconButtonPart]",
  imports: [MnHook, MnIcon],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "tt.tooltipTrigger",
    "data-minerva": "tooltip",
    "data-part": "trigger",
    "data-state": "closed",
    "[attr.data-disabled]": "disabled() ? '' : null",
  },
  template: `<button
    #button
    type="button"
    [class]="classes()"
    [disabled]="disabled()"
    [attr.tabindex]="disabled() ? -1 : 0"
    [attr.aria-label]="label()"
    (click)="activate.emit($event)"
    mnHook="icon-button"
    [mnStates]="states()"
  >
    <span
      [class]="ib.glyph"
      aria-hidden="true"
      mnHook="icon-button"
      mnPart="icon"
      ><svg [mnIcon]="icon()" [size]="iconSize()"></svg
    ></span>
  </button>`,
})
export class MnIconButtonPart {
  /** Icon of the button */
  readonly icon = input.required<IconName>();
  /** Accessible label of the button */
  readonly label = input.required<string>();
  /** @default "small" */
  readonly size = input<"xsmall" | "small" | "medium" | "large">("small");
  /** @default "square" */
  readonly shape = input<"square" | "circle">("square");
  /** @default "neutral" */
  readonly color = input<
    "neutral" | "primary" | "success" | "info" | "warning" | "danger"
  >("neutral");
  /** Width / height of the icon (CSS length) @default "1em" */
  readonly iconSize = input<string>("1em");
  /** Extra class of the button (React's `className`) */
  readonly buttonClass = input<string | undefined>(undefined);
  /** @default false */
  readonly disabled = input(false, { transform: booleanAttribute });
  /** The button was clicked */
  readonly activate = output<MouseEvent>();

  protected readonly ib = ib;
  protected readonly tt = tt;
  private readonly button =
    viewChild.required<ElementRef<HTMLButtonElement>>("button");

  protected readonly classes = computed(() =>
    cn(
      ib.iconButton,
      ib[this.color()],
      ib["variant-ghost"],
      ib[this.size()],
      ib[this.shape()],
      this.disabled() && ib.disabled,
      this.buttonClass(),
    ),
  );
  protected readonly states = computed(() => ({
    state: "inactive",
    disabled: this.disabled(),
    size: this.size(),
    variant: "ghost",
    color: this.color(),
    shape: this.shape(),
  }));

  /** The native button */
  get element(): HTMLButtonElement {
    return this.button().nativeElement;
  }

  /** Focuses the native button */
  focus(options?: FocusOptions): void {
    this.element.focus(options);
  }
}
