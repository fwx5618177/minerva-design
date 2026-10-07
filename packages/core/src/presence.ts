export interface WaitForExitAnimationOptions {
  /**
   * Safety net (ms) after which the promise resolves even if no end event
   * fired (e.g. the animation was removed). @default computed duration + 50
   */
  timeout?: number;
}

/** Parses a CSS time list ("0.2s, 150ms") and returns the largest value in ms. */
function maxTime(value: string | undefined | null): number {
  if (!value) return 0;
  return Math.max(
    0,
    ...value.split(",").map((part) => {
      const t = part.trim();
      const n = Number.parseFloat(t);
      if (Number.isNaN(n)) return 0;
      return t.endsWith("ms") ? n : n * 1000;
    }),
  );
}

/**
 * Total running time (ms) of the CSS animations / transitions on `el`
 * (`0` when there is none, e.g. `animation-name: none`).
 */
export function getExitAnimationDuration(el: Element): number {
  const win = el.ownerDocument.defaultView;
  if (!win) return 0;
  const style = win.getComputedStyle(el);
  const name = style.animationName;
  const animation =
    name && name !== "none"
      ? maxTime(style.animationDuration) + maxTime(style.animationDelay)
      : 0;
  const transition =
    maxTime(style.transitionDuration) + maxTime(style.transitionDelay);
  return Math.max(animation, transition);
}

/**
 * Resolves once `el` finished its exit animation / transition
 * (`animationend`, `transitionend` or their `cancel` events on `el` itself),
 * or immediately when it has none. Use it to delay unmounting.
 */
export function waitForExitAnimation(
  el: Element,
  options: WaitForExitAnimationOptions = {},
): Promise<void> {
  const duration = getExitAnimationDuration(el);
  if (duration <= 0) return Promise.resolve();
  const win = el.ownerDocument.defaultView;
  const timeout = options.timeout ?? duration + 50;

  return new Promise((resolve) => {
    const events = [
      "animationend",
      "animationcancel",
      "transitionend",
      "transitioncancel",
    ];
    const done = () => {
      for (const type of events) el.removeEventListener(type, onEnd);
      (win?.clearTimeout.bind(win) ?? clearTimeout)(timer);
      resolve();
    };
    const onEnd = (event: Event) => {
      if (event.target === el) done();
    };
    for (const type of events) el.addEventListener(type, onEnd);
    const timer = (win?.setTimeout.bind(win) ?? setTimeout)(
      done,
      timeout,
    ) as ReturnType<typeof setTimeout>;
  });
}
