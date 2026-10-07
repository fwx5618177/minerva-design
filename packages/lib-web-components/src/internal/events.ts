/**
 * Event naming scheme of every Minerva element:
 *
 * - names are `minerva-<what happened>` in kebab-case, e.g. `minerva-change`
 *   (committed value change), `minerva-input` (value changing while typing),
 *   `minerva-open-change` (`open` toggled by the user), `minerva-select`
 *   (an item / option was chosen), `minerva-close`, `minerva-page-change`...
 * - they are `CustomEvent`s that bubble and are `composed` (they cross shadow
 *   roots), with the new state in `event.detail` (`{ value }`, `{ open }`...)
 * - events announcing a state change requested by the user are cancelable:
 *   `event.preventDefault()` keeps the current state (the "controlled"
 *   pattern of React components)
 * - native events (`click`, `focus`, `blur`, `input`, `change`) keep their
 *   usual meaning where the element mirrors a native control.
 */
export type MinervaEventName = `minerva-${string}`;

export interface EmitOptions {
  /** Whether `preventDefault()` cancels the change. @default false */
  cancelable?: boolean;
}

/**
 * Dispatches a `minerva-*` CustomEvent (bubbles, composed) on `target`.
 * @returns `false` when a listener called `preventDefault()` on a
 *   cancelable event, `true` otherwise.
 */
export function emit<T>(
  target: EventTarget,
  name: MinervaEventName,
  detail?: T,
  options: EmitOptions = {},
): boolean {
  return target.dispatchEvent(
    new CustomEvent<T>(name, {
      bubbles: true,
      composed: true,
      cancelable: options.cancelable ?? false,
      detail: detail as T,
    }),
  );
}
