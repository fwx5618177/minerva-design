import { LuX } from "react-icons/lu";
import useI18n from "../../hooks/useI18n";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../internal/Dialog";
import { cn } from "../../utils/cn";
import type {
  ModalBodyProps,
  ModalContentProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
  ModalRootProps,
  ModalTriggerProps,
} from "./types";
import styles from "./modal.module.scss";

/** Owns the open state of a compound modal. */
export const ModalRoot = (props: ModalRootProps) => <DialogRoot {...props} />;

/** Opens the modal; a `<button>` or, with `asChild`, the child element. */
export const ModalTrigger = (props: ModalTriggerProps) => (
  <DialogTrigger {...props} />
);

/** Closes the modal; a `<button>` or, with `asChild`, the child element. */
export const ModalClose = (props: ModalTriggerProps) => (
  <DialogClose {...props} />
);

/**
 * ModalContent: portalled overlay + centered dialog panel (a bottom sheet on
 * narrow screens). Built on the internal dialog foundation: focus moves in
 * and is trapped, Escape (topmost dialog only) and an overlay click close it,
 * page scroll is locked, the rest of the page is hidden from assistive
 * technology, and focus returns to the opener on close.
 */
export const ModalContent = ({
  size = "medium",
  hideCloseButton = false,
  closeLabel,
  description,
  overlayClassName,
  className,
  children,
  ...rest
}: ModalContentProps) => {
  const { t } = useI18n();
  return (
    <DialogContent
      overlayClassName={cn(styles.overlay, overlayClassName)}
      className={cn(styles.content, styles[size], className)}
      {...rest}
    >
      {description && (
        <DialogDescription className={styles.description}>
          {description}
        </DialogDescription>
      )}
      {children}
      {!hideCloseButton && (
        <DialogClose
          className={styles.close}
          aria-label={closeLabel ?? t("modal.close")}
        >
          <LuX size={16} aria-hidden="true" />
        </DialogClose>
      )}
    </DialogContent>
  );
};

/** ModalHeader: the dialog title (accessible name). */
export const ModalHeader = ({ className, ref, ...rest }: ModalHeaderProps) => (
  <DialogTitle asChild>
    <div ref={ref} className={cn(styles.header, className)} {...rest} />
  </DialogTitle>
);

/** ModalBody: the scrollable content area. */
export const ModalBody = ({ className, ref, ...rest }: ModalBodyProps) => (
  <div ref={ref} className={cn(styles.body, className)} {...rest} />
);

/** ModalFooter: right-aligned, wrapping action row. */
export const ModalFooter = ({ className, ref, ...rest }: ModalFooterProps) => (
  <div ref={ref} className={cn(styles.footer, className)} {...rest} />
);

/**
 * Modal: a dialog with title, description and close button in one component.
 * Controlled (`open` + `onOpenChange`) or uncontrolled (`defaultOpen`,
 * `trigger`). Focus returns to the element focused before opening, also when
 * opened from state without a trigger.
 */
export const Modal = ({
  open,
  defaultOpen = false,
  onOpenChange,
  trigger,
  title,
  description,
  size,
  hideCloseButton,
  closeLabel,
  role = "dialog",
  className,
  ref,
  children,
}: ModalProps) => (
  <ModalRoot open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
    {trigger && <ModalTrigger asChild>{trigger}</ModalTrigger>}
    <ModalContent
      ref={ref}
      size={size}
      hideCloseButton={hideCloseButton}
      closeLabel={closeLabel}
      description={description}
      role={role}
      className={className}
    >
      {title && <ModalHeader>{title}</ModalHeader>}
      {children}
    </ModalContent>
  </ModalRoot>
);

export default Modal;
