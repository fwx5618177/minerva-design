import { useCallback, useRef } from "react";
import {
  createDisclosureMachine,
  isDisclosurePresent,
  type DisclosureState,
} from "@minerva/core";
import { useMachine } from "./useMachine";
import type { OverlayCloseReason } from "./Overlay";

export interface OverlayStateOptions {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, reason?: OverlayCloseReason) => void;
}

/**
 * Open state of an overlay on the disclosure machine of @minerva/core
 * (controlled `open` or uncontrolled `defaultOpen`, presence phases), with
 * the reason of each close request reported to `onOpenChange`.
 */
export function useOverlay({
  open,
  defaultOpen = false,
  onOpenChange,
}: OverlayStateOptions) {
  const reason = useRef<OverlayCloseReason | undefined>(undefined);
  const [state, send] = useMachine(createDisclosureMachine, {
    open,
    defaultOpen,
    onOpenChange: (next: boolean) =>
      onOpenChange?.(next, next ? undefined : reason.current),
  });
  const show = useCallback(() => {
    reason.current = undefined;
    send({ type: "OPEN" });
  }, [send]);
  const close = useCallback(
    (why: OverlayCloseReason) => {
      reason.current = why;
      send({ type: "CLOSE" });
    },
    [send],
  );
  const onAnimationEnd = useCallback(
    () => send({ type: "ANIMATION_END" }),
    [send],
  );
  return {
    state: state as DisclosureState,
    present: isDisclosurePresent(state),
    show,
    close,
    onAnimationEnd,
  };
}
