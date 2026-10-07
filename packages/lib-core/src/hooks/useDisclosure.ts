import { useCallback } from "react";
import { useControllableState } from "../internal/useControllableState";
import { warnControlledProps } from "../internal/devWarnings";

export interface UseDisclosureProps {
  /** Controlled open state; leave `undefined` for uncontrolled. */
  isOpen?: boolean;
  /** Called with the next open state (controlled and uncontrolled). */
  onChange?: (isOpen: boolean) => void;
  /**
   * Initial open state while uncontrolled.
   * @default false
   */
  defaultIsOpen?: boolean;
}

export interface UseDisclosureReturn {
  /** Current open state. */
  isOpen: boolean;
  /** Open. */
  onOpen: () => void;
  /** Close. */
  onClose: () => void;
  /** Toggle. */
  onToggle: () => void;
}

/**
 * Open / closed state for overlays (Modal, Drawer, Popover, ...), controlled or
 * uncontrolled.
 *
 *   const modal = useDisclosure();
 *   <Button onClick={modal.onOpen}>Open</Button>
 *   <Modal open={modal.isOpen} onOpenChange={(o) => !o && modal.onClose()} />
 */
export function useDisclosure(
  props: UseDisclosureProps = {},
): UseDisclosureReturn {
  const { isOpen: isOpenProp, defaultIsOpen, onChange } = props;
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("useDisclosure", {
      prop: "isOpen",
      value: isOpenProp,
      defaultProp: "defaultIsOpen",
      defaultValue: defaultIsOpen,
      handlerProp: "onChange",
      handler: onChange,
    });
  }
  const [isOpen, setIsOpen] = useControllableState({
    value: isOpenProp,
    defaultValue: defaultIsOpen ?? false,
    onChange,
    name: "useDisclosure",
    prop: "isOpen",
    defaultProp: "defaultIsOpen",
  });
  const onOpen = useCallback(() => setIsOpen(true), [setIsOpen]);
  const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);
  return { isOpen, onOpen, onClose, onToggle };
}

export default useDisclosure;
