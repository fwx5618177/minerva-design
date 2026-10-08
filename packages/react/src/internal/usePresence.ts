import { useLayoutEffect, useState } from "react";
import { getExitAnimationDuration, waitForExitAnimation } from "@minerva/dom";

/**
 * Keeps an overlay mounted while its exit animation runs.
 *
 * Returns `true` while `open`, and after closing until the CSS animation /
 * transition of `element` (started by `data-state="closed"`) ends (core
 * `waitForExitAnimation`, with a timeout safety net). Without an exit
 * animation (none declared, reduced motion, test DOM) it unmounts in the same
 * commit, so nothing waits on timers.
 *
 * @example
 * const [node, setNode] = useState<HTMLDivElement | null>(null);
 * const present = usePresence(open, node);
 * return present && <div ref={setNode} data-state={open ? "open" : "closed"} />;
 */
export function usePresence(open: boolean, element: Element | null): boolean {
  const [mounted, setMounted] = useState(open);
  // Mount in the same render as `open` turns true (no extra commit).
  if (open && !mounted) setMounted(true);

  useLayoutEffect(() => {
    if (open || !mounted) return;
    if (!element || getExitAnimationDuration(element) <= 0) {
      // Nothing to wait for: unmount before paint.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(false);
      return;
    }
    let cancelled = false;
    void waitForExitAnimation(element).then(() => {
      if (!cancelled) setMounted(false);
    });
    return () => {
      cancelled = true;
    };
  }, [open, mounted, element]);

  return open || mounted;
}

export default usePresence;
