/** Minimal shape of anything that can report `preventDefault()` was called. */
interface PreventableEvent {
  defaultPrevented: boolean;
}

export interface ComposeEventHandlersOptions {
  /**
   * Skip the internal handler when the external one called `preventDefault()`
   * @default true
   */
  checkForDefaultPrevented?: boolean;
}

/**
 * Compose a user-supplied (external) handler with a component's internal one.
 * The external handler always runs first; the internal handler then runs
 * unless `checkForDefaultPrevented` is on and the event was default-prevented,
 * which lets consumers opt out of built-in behaviour via `event.preventDefault()`.
 */
export function composeEventHandlers<E>(
  external: ((event: E) => void) | undefined,
  internal: ((event: E) => void) | undefined,
  { checkForDefaultPrevented = true }: ComposeEventHandlersOptions = {},
): (event: E) => void {
  return (event: E) => {
    external?.(event);
    if (
      checkForDefaultPrevented &&
      (event as unknown as PreventableEvent | null)?.defaultPrevented
    ) {
      return;
    }
    internal?.(event);
  };
}
