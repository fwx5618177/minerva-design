import * as RadixDialog from "@radix-ui/react-dialog";
import { LuX } from "react-icons/lu";
import { useDialogFocusReturn } from "../../hooks/useDialogFocusReturn";
import useI18n from "../../hooks/useI18n";
import { useMergedRefs } from "../../internal/mergeRefs";
import { useControllableState } from "../../internal/useControllableState";
import { cn } from "../../utils/cn";
import type {
  DrawerContentProps,
  DrawerProps,
  DrawerRootProps,
  DrawerSectionProps,
  DrawerSize,
  DrawerTriggerProps,
} from "./types";
import styles from "./drawer.module.scss";

/** Minerva size -> novel-isr-ui size suffix of the `ui-drawer-size-*` hook. */
const SIZE_HOOK: Record<DrawerSize, string> = {
  small: "sm",
  medium: "md",
  large: "lg",
  full: "full",
};

/** Owns the open state of a compound drawer (Radix Dialog root). */
export const DrawerRoot = (props: DrawerRootProps) => (
  <RadixDialog.Root {...props} />
);

/** Opens the drawer; a `<button>` or, with `asChild`, the child element. */
export const DrawerTrigger = (props: DrawerTriggerProps) => (
  <RadixDialog.Trigger {...props} />
);

/** Closes the drawer; a `<button>` or, with `asChild`, the child element. */
export const DrawerClose = (props: DrawerTriggerProps) => (
  <RadixDialog.Close {...props} />
);

/**
 * DrawerContent: portalled overlay + a panel sliding in from one edge. Focus
 * trap, Escape and outside-click dismissal come from Radix Dialog.
 */
export const DrawerContent = ({
  side = "right",
  size = "medium",
  hideCloseButton = false,
  closeLabel,
  description,
  hiddenDescription,
  overlayClassName,
  className,
  children,
  ...rest
}: DrawerContentProps) => {
  const { t } = useI18n();
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay
        className={cn(styles.overlay, "ui-drawer-overlay", overlayClassName)}
      />
      <RadixDialog.Content
        className={cn(
          styles.content,
          styles[side],
          styles[size],
          "ui-drawer-content",
          `ui-drawer-side-${side}`,
          `ui-drawer-size-${SIZE_HOOK[size]}`,
          className,
        )}
        data-side={side}
        data-size={size}
        {...rest}
      >
        <RadixDialog.Description
          className={
            description
              ? cn(styles.description, "ui-drawer-description")
              : cn(styles.visuallyHidden, "ui-visually-hidden")
          }
        >
          {description ?? hiddenDescription ?? t("drawer.description")}
        </RadixDialog.Description>
        {children}
        {!hideCloseButton && (
          <RadixDialog.Close
            type="button"
            className={cn(styles.close, "ui-drawer-close")}
            aria-label={closeLabel ?? t("drawer.close")}
          >
            <LuX size={16} aria-hidden="true" />
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
};

/** DrawerHeader: the drawer title (accessible name). */
export const DrawerHeader = ({
  className,
  children,
  ref,
  ...rest
}: DrawerSectionProps) => (
  <RadixDialog.Title asChild>
    <div
      ref={ref}
      className={cn(styles.header, "ui-drawer-header", className)}
      {...rest}
    >
      {children}
    </div>
  </RadixDialog.Title>
);

/** DrawerBody: the scrollable content area. */
export const DrawerBody = ({ className, ref, ...rest }: DrawerSectionProps) => (
  <div
    ref={ref}
    className={cn(styles.body, "ui-drawer-body", className)}
    {...rest}
  />
);

/** DrawerFooter: right-aligned, wrapping action row. */
export const DrawerFooter = ({
  className,
  ref,
  ...rest
}: DrawerSectionProps) => (
  <div
    ref={ref}
    className={cn(styles.footer, "ui-drawer-footer", className)}
    {...rest}
  />
);

/**
 * Drawer: a side panel with title, description and close button in one
 * component. Controlled (`open` + `onOpenChange`) or uncontrolled
 * (`defaultOpen`, `trigger`). Restores focus to the opener after closing.
 */
export const Drawer = ({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  trigger,
  side,
  size,
  title,
  description,
  hideCloseButton,
  closeLabel,
  hiddenDescription,
  className,
  ref,
  children,
}: DrawerProps) => {
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
    <DrawerRoot open={dialogOpen} onOpenChange={setOpen}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent
        ref={mergedRef}
        onCloseAutoFocus={onCloseAutoFocus}
        side={side}
        size={size}
        description={description}
        hideCloseButton={hideCloseButton}
        closeLabel={closeLabel}
        hiddenDescription={hiddenDescription}
        className={className}
      >
        {title && <DrawerHeader>{title}</DrawerHeader>}
        {children}
      </DrawerContent>
    </DrawerRoot>
  );
};

export default Drawer;
