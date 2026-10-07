/**
 * Public attributes of `<minerva-button>`. Values mirror the classes defined in
 * `./styles.ts`; keep both in sync.
 */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "ghost"
  | "retry"
  | "back";

export type ButtonSize = "tiny" | "small" | "medium" | "large";

export type ButtonShape = "square" | "rounded" | "circle" | "pill";

export interface ButtonProps {
  /**
   * Visual style of the button (reflected to the `variant` attribute)
   * @default "primary"
   */
  variant?: ButtonVariant;
  /**
   * Button size
   * @default "medium"
   */
  size?: ButtonSize;
  /**
   * Corner shape of the button
   * @default "rounded"
   */
  shape?: ButtonShape;
  /**
   * Disables the button (boolean attribute)
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows a spinner instead of the content and blocks clicks; sets `aria-busy`
   * @default false
   */
  loading?: boolean;
  /**
   * Renders the button in its pressed / active style
   * @default false
   */
  active?: boolean;
  /**
   * Accessible label forwarded to the inner `<button>`; set it with the
   * `aria-label` attribute. Required for icon-only buttons.
   * @default ""
   */
  ariaLabel?: string;
  /**
   * What the button does in an enclosing `<form>`: nothing (`"button"`),
   * submit it (`"submit"`, through `requestSubmit()` so validation and
   * `submit` listeners run) or reset it (`"reset"`)
   * @default "button"
   */
  type?: "button" | "submit" | "reset";
}
