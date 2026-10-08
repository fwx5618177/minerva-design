import { inject, type ComputedRef, type InjectionKey, type Ref } from "vue";

/** State shared by the parts of a Popover. */
export interface PopoverContext {
  open: ComputedRef<boolean>;
  setOpen: (open: boolean) => void;
  modal: ComputedRef<boolean>;
  contentId: string;
  trigger: Ref<HTMLElement | null>;
  anchor: Ref<HTMLElement | null>;
}

export const POPOVER_KEY: InjectionKey<PopoverContext> =
  Symbol("minerva-popover");

/** The closest Popover root (throws outside of one). */
export function usePopoverContext(component: string): PopoverContext {
  const context = inject(POPOVER_KEY, null);
  if (!context) {
    throw new Error(`<${component}> must be used inside <Popover>`);
  }
  return context;
}

/** Calls a listener of `$attrs` (a function or an array of them). */
export function callListener(listener: unknown, event: Event): void {
  if (Array.isArray(listener)) {
    for (const fn of listener) callListener(fn, event);
  } else if (typeof listener === "function") {
    (listener as (event: Event) => void)(event);
  }
}

/**
 * `$attrs` with `on<Event>` composed with the component's own handler: the
 * user's listener first, then `handler` unless it called `preventDefault()`
 * (React's `composeEventHandlers`).
 */
export function composeListener(
  attrs: Record<string, unknown>,
  key: `on${string}`,
  handler: (event: Event) => void,
): Record<string, unknown> {
  const { [key]: own, ...rest } = attrs;
  return {
    ...rest,
    [key]: (event: Event) => {
      callListener(own, event);
      if (!event.defaultPrevented) handler(event);
    },
  };
}
