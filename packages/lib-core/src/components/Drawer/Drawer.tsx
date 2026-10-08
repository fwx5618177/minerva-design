import { IconX } from "../../internal/icons";
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
import { hooks } from "../../internal/stylingHooks";
import type {
  DrawerContentProps,
  DrawerProps,
  DrawerRootProps,
  DrawerSectionProps,
  DrawerTriggerProps,
} from "./types";
import styles from "./drawer.module.scss";

/** Owns the open state of a compound drawer. */
export const DrawerRoot = (props: DrawerRootProps) => (
  <DialogRoot componentName="Drawer" {...props} />
);

/** Opens the drawer; a `<button>` or, with `asChild`, the child element. */
export const DrawerTrigger = (props: DrawerTriggerProps) => (
  <DialogTrigger {...props} />
);

/** Closes the drawer; a `<button>` or, with `asChild`, the child element. */
export const DrawerClose = (props: DrawerTriggerProps) => (
  <DialogClose {...props} />
);

/**
 * DrawerContent: portalled overlay + a panel sliding in from one edge, on the
 * internal dialog foundation (focus trap, Escape / overlay click dismissal,
 * scroll lock, rest of the page hidden, focus returned to the opener).
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
    <DialogContent
      overlayClassName={cn(styles.overlay, overlayClassName)}
      overlayAttributes={hooks("drawer", "overlay")}
      className={cn(styles.content, styles[side], styles[size], className)}
      {...rest}
      {...hooks("drawer", "content", { side, size })}
    >
      <DialogDescription
        className={description ? styles.description : styles.visuallyHidden}
        {...hooks("drawer", "description")}
      >
        {description ?? hiddenDescription ?? t("drawer.description")}
      </DialogDescription>
      {children}
      {!hideCloseButton && (
        <DialogClose
          className={styles.close}
          aria-label={closeLabel ?? t("drawer.close")}
          {...hooks("drawer", "close-button")}
        >
          <IconX size={16} aria-hidden="true" />
        </DialogClose>
      )}
    </DialogContent>
  );
};

/** DrawerHeader: the drawer title (accessible name). */
export const DrawerHeader = ({
  className,
  ref,
  ...rest
}: DrawerSectionProps) => (
  <DialogTitle asChild>
    <div
      ref={ref}
      className={cn(styles.header, className)}
      {...rest}
      {...hooks("drawer", "header")}
    />
  </DialogTitle>
);

/** DrawerBody: the scrollable content area. */
export const DrawerBody = ({ className, ref, ...rest }: DrawerSectionProps) => (
  <div
    ref={ref}
    className={cn(styles.body, className)}
    {...rest}
    {...hooks("drawer", "body")}
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
    className={cn(styles.footer, className)}
    {...rest}
    {...hooks("drawer", "footer")}
  />
);

/**
 * Drawer: a side panel with title, description and close button in one
 * component. Controlled (`open` + `onOpenChange`) or uncontrolled
 * (`defaultOpen`, `trigger`). Restores focus to the opener after closing.
 */
export const Drawer = ({
  open,
  defaultOpen,
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
}: DrawerProps) => (
  <DrawerRoot open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
    {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
    <DrawerContent
      ref={ref}
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

export default Drawer;
