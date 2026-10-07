import { useCallback, useLayoutEffect, useRef, useState } from "react";

/**
 * Focus return for controlled dialogs without a Radix `Trigger` (Modal,
 * Drawer, CommandDialog opened from state). Remembers the element focused
 * before opening and restores it after closing.
 *
 *   const { open, contentRef, onCloseAutoFocus } = useDialogFocusReturn(isOpen);
 *   <Dialog.Root open={open}>
 *     <Dialog.Content ref={contentRef} onCloseAutoFocus={onCloseAutoFocus} />
 */
export function useDialogFocusReturn(isOpen: boolean) {
  const opener = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    // Record the opener before the content mounts: an autoFocus child would
    // otherwise steal focus first.
    if (isOpen) {
      const active = document.activeElement;
      if (!contentRef.current?.contains(active)) {
        opener.current =
          active instanceof HTMLElement && active !== document.body
            ? active
            : null;
      }
    }
    // Intentional two-step open (layout effect, before paint: no flash).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(isOpen);
  }, [isOpen]);

  const onCloseAutoFocus = useCallback((event: Event) => {
    event.preventDefault();
    // Radix fires this late; if the dialog re-opened meanwhile keep its focus.
    if (contentRef.current?.isConnected) return;
    const target = opener.current;
    opener.current = null;
    if (target?.isConnected) target.focus({ preventScroll: true });
  }, []);

  return { open: isOpen && ready, contentRef, onCloseAutoFocus };
}

export default useDialogFocusReturn;
