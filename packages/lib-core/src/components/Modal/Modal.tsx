import * as RadixDialog from "@radix-ui/react-dialog";
import { LuX } from "react-icons/lu";
import { useDialogFocusReturn } from "../../hooks/useDialogFocusReturn";
import useI18n from "../../hooks/useI18n";
import { useMergedRefs } from "../../internal/mergeRefs";
import { useControllableState } from "../../internal/useControllableState";
import { cn } from "../../utils/cn";
import type {
  ModalBodyProps,
  ModalContentProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
  ModalRootProps,
  ModalSize,
  ModalTriggerProps,
} from "./types";
import styles from "./modal.module.scss";

/** Minerva size -> novel-isr-ui size suffix of the `ui-modal-size-*` hook. */
const SIZE_HOOK: Record<ModalSize, string> = {
  small: "sm",
  medium: "md",
  large: "lg",
  xlarge: "xl",
  full: "full",
};

/** Owns the open state of a compound modal (Radix Dialog root). */
export const ModalRoot = (props: ModalRootProps) => (
  <RadixDialog.Root {...props} />
);

/** Opens the modal; a `<button>` or, with `asChild`, the child element. */
export const ModalTrigger = (props: ModalTriggerProps) => (
  <RadixDialog.Trigger {...props} />
);

/** Closes the modal; a `<button>` or, with `asChild`, the child element. */
export const ModalClose = (props: ModalTriggerProps) => (
  <RadixDialog.Close {...props} />
);

/**
 * ModalContent: portalled overlay + centered dialog panel (a bottom sheet on
 * narrow screens). Focus trap, Escape and outside-click dismissal come from
 * Radix Dialog.
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
    <RadixDialog.Portal>
      <RadixDialog.Overlay
        className={cn(styles.overlay, "ui-modal-overlay", overlayClassName)}
      />
      <RadixDialog.Content
        className={cn(
          styles.content,
          styles[size],
          "ui-modal-content",
          `ui-modal-size-${SIZE_HOOK[size]}`,
          className,
        )}
        data-size={size}
        {...rest}
      >
        {/* Radix links the Description to aria-describedby; an empty hidden
            one keeps the link valid when no description is given. */}
        {description ? (
          <RadixDialog.Description
            className={cn(styles.description, "ui-modal-description")}
          >
            {description}
          </RadixDialog.Description>
        ) : (
          <RadixDialog.Description
            className={cn(styles.visuallyHidden, "ui-visually-hidden")}
          />
        )}
        {children}
        {!hideCloseButton && (
          <RadixDialog.Close
            type="button"
            className={cn(styles.close, "ui-modal-close")}
            aria-label={closeLabel ?? t("modal.close")}
          >
            <LuX size={16} aria-hidden="true" />
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
};

/** ModalHeader: the dialog title (accessible name). */
export const ModalHeader = ({
  className,
  children,
  ref,
  ...rest
}: ModalHeaderProps) => (
  <RadixDialog.Title asChild>
    <div
      ref={ref}
      className={cn(styles.header, "ui-modal-header", className)}
      {...rest}
    >
      {children}
    </div>
  </RadixDialog.Title>
);

/** ModalBody: the scrollable content area. */
export const ModalBody = ({ className, ref, ...rest }: ModalBodyProps) => (
  <div
    ref={ref}
    className={cn(styles.body, "ui-modal-body", className)}
    {...rest}
  />
);

/** ModalFooter: right-aligned, wrapping action row. */
export const ModalFooter = ({ className, ref, ...rest }: ModalFooterProps) => (
  <div
    ref={ref}
    className={cn(styles.footer, "ui-modal-footer", className)}
    {...rest}
  />
);

/**
 * Modal: a dialog with title, description and close button in one component.
 * Controlled (`open` + `onOpenChange`) or uncontrolled (`defaultOpen`,
 * `trigger`). When opened from state it restores focus to the element that
 * was focused before opening.
 */
export const Modal = ({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  trigger,
  title,
  description,
  size,
  hideCloseButton,
  closeLabel,
  className,
  ref,
  children,
}: ModalProps) => {
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const {
    open: dialogOpen,
    contentRef,
    onCloseAutoFocus,
  } = useDialogFocusReturn(open);
  const mergedRef = useMergedRefs(contentRef, ref);

  return (
    <ModalRoot open={dialogOpen} onOpenChange={setOpen}>
      {trigger && <ModalTrigger asChild>{trigger}</ModalTrigger>}
      <ModalContent
        ref={mergedRef}
        size={size}
        hideCloseButton={hideCloseButton}
        closeLabel={closeLabel}
        description={description}
        className={className}
        onCloseAutoFocus={onCloseAutoFocus}
      >
        {title && <ModalHeader>{title}</ModalHeader>}
        {children}
      </ModalContent>
    </ModalRoot>
  );
};

export default Modal;
