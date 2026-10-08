import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from "@angular/core";
import { cn, type ColorScheme } from "@minerva/core";
import { templateOf, type MnContent } from "../../internal/content";
import { MnHook } from "../../internal/hooks";
import { buttonStyles as s } from "../../internal/styles";

export type ButtonVariant = "solid" | "outline" | "ghost" | "link";
export type ButtonSize = "xsmall" | "small" | "medium" | "large" | "xlarge";
export type ButtonShape = "square" | "rounded" | "circle";
export type ButtonRadius =
  "none" | "small" | "medium" | "large" | "circle" | "square" | number;

const RADIUS_CLASS = {
  none: s.borderRadiusNone,
  small: s.borderRadiusSmall,
  medium: s.borderRadiusMedium,
  large: s.borderRadiusLarge,
  circle: s.borderRadiusCircle,
  square: s.borderRadiusSquare,
} as const;

/**
 * Button: a native `<button>` (or `<a>`) with a semantic `color`, a visual
 * `variant` (solid, outline, ghost, link), sizes, shapes, icons and a loading
 * state. An attribute component, so the host IS the native element: every
 * native attribute, event, `form` / `type="submit"` and focus behaviour
 * applies as usual. `type` defaults to "button" (never submits a form by
 * accident).
 *
 * While `loading` the button stays focusable (aria-busy / aria-disabled) but
 * activation is blocked: `(click)` listeners do not run and a submit button
 * does not submit.
 *
 * @example
 * <button mnButton color="danger" (click)="remove()">Delete</button>
 * <a mnButton variant="link" href="/docs">Docs</a>
 */
@Component({
  selector: "button[mnButton], a[mnButton]",
  exportAs: "mnButton",
  imports: [MnHook, NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "classes()",
    "[style.border-radius]": "radiusStyle()",
    "[attr.type]": "isAnchor ? null : type()",
    "[attr.disabled]": "!isAnchor && disabled() ? '' : null",
    "[attr.aria-disabled]":
      "loading() || (isAnchor && disabled()) ? 'true' : null",
    "[attr.aria-busy]": "loading() ? 'true' : null",
    "[attr.tabindex]": "isAnchor && disabled() ? '-1' : null",
    "data-minerva": "button",
    "data-part": "root",
    "[attr.data-state]": "active() ? 'active' : 'inactive'",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[attr.data-loading]": "loading() ? '' : null",
    "[attr.data-size]": "size()",
    "[attr.data-variant]": "variant()",
    "[attr.data-color]": "color()",
    "[attr.data-shape]": "shape() ?? null",
  },
  template: `
    @if (loading() && loadingText() != null) {
      <span
        [class]="s.loadingSpinner"
        aria-hidden="true"
        mnHook="button"
        mnPart="spinner"
      ></span>
      <span [class]="s.label" mnHook="button" mnPart="label">{{
        loadingText()
      }}</span>
    } @else {
      @if (loading()) {
        <span
          [class]="s.loadingSpinner"
          aria-hidden="true"
          mnHook="button"
          mnPart="spinner"
        ></span>
      }
      @if (startIcon(); as icon) {
        <span [class]="iconClass()" mnHook="button" mnPart="start-icon">
          @if (templateOf(icon); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          } @else {
            {{ icon }}
          }
        </span>
      }
      <span [class]="labelClass()" mnHook="button" mnPart="label"
        ><ng-content
      /></span>
      @if (endIcon(); as icon) {
        <span [class]="iconClass()" mnHook="button" mnPart="end-icon">
          @if (templateOf(icon); as tpl) {
            <ng-container [ngTemplateOutlet]="tpl" />
          } @else {
            {{ icon }}
          }
        </span>
      }
    }
  `,
})
export class MnButton {
  /**
   * Native button type ("button" unlike the HTML default "submit")
   * @default "button"
   */
  readonly type = input<"button" | "submit" | "reset">("button");
  /** Semantic color @default "primary" */
  readonly color = input<ColorScheme>("primary");
  /** Visual style @default "solid" */
  readonly variant = input<ButtonVariant>("solid");
  /** Button size @default "medium" */
  readonly size = input<ButtonSize>("medium");
  /** Disables the button @default false */
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Shows a spinner and blocks activation (stays focusable) @default false */
  readonly loading = input(false, { transform: booleanAttribute });
  /** Text shown instead of the content while loading */
  readonly loadingText = input<string | undefined>(undefined);
  /** Icon before the content (string or template) */
  readonly startIcon = input<MnContent>(undefined);
  /** Icon after the content (string or template) */
  readonly endIcon = input<MnContent>(undefined);
  /** Stretches the button to the full width of its container @default false */
  readonly fullWidth = input(false, { transform: booleanAttribute });
  /** Pressed / active state @default false */
  readonly active = input(false, { transform: booleanAttribute });
  /** Preset shape */
  readonly shape = input<ButtonShape | undefined>(undefined);
  /** Corner radius: a preset or a number of pixels */
  readonly borderRadius = input<ButtonRadius | undefined>(undefined);

  protected readonly s = s;
  protected readonly templateOf = templateOf;
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  protected readonly isAnchor = this.host.localName === "a";

  protected readonly classes = computed(() => {
    const radius = this.borderRadius();
    return cn(
      s.customButton,
      s[this.color() as keyof typeof s],
      s[`variant-${this.variant()}` as keyof typeof s],
      s[this.size() as keyof typeof s],
      typeof radius === "string" && RADIUS_CLASS[radius],
      this.shape() && s[this.shape()!],
      this.fullWidth() && s.fullWidth,
      this.active() && s.active,
      this.loading() && s.loading,
    );
  });
  protected readonly radiusStyle = computed(() => {
    const radius = this.borderRadius();
    return typeof radius === "number" ? `${radius}px` : null;
  });
  protected readonly iconClass = computed(() =>
    cn(s.icon, this.loading() && s.hidden),
  );
  protected readonly labelClass = computed(() =>
    cn(s.label, this.loading() && s.hidden),
  );

  constructor() {
    // Registered before any (click) listener of the template using the
    // button (and in the capture phase), so it can stop them.
    this.host.addEventListener?.(
      "click",
      (event: Event) => {
        if (this.loading() || (this.isAnchor && this.disabled())) {
          // busy (or disabled link): no activation, no submit, no (click)
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      },
      { capture: true },
    );
  }
}
