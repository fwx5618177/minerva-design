import {
  createContext,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
  type RefObject,
} from "react";
import { composeEventHandlers } from "./composeEventHandlers";
import { warnControlledProps } from "./devWarnings";
import { useMergedRefs } from "./mergeRefs";
import { Portal } from "./Portal";
import { Slot } from "./Slot";
import { useControllableState } from "./useControllableState";
import { LayerContext, useDismissableLayer } from "./useDismissableLayer";
import { useFocusScope } from "./useFocusScope";
import { useHideOthers } from "./useHideOthers";
import { usePresence } from "./usePresence";
import { useScrollLock } from "./useScrollLock";

/** Open / closed, mirrored in `data-state` for CSS animations. */
export type DialogState = "open" | "closed";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  modal: boolean;
  contentId: string;
  titleId: string;
  descriptionId: string;
  /** Number of mounted `DialogTitle` / `DialogDescription` (ARIA links). */
  titles: number;
  descriptions: number;
  registerTitle: () => () => void;
  registerDescription: () => () => void;
  triggerRef: RefObject<HTMLElement | null>;
  /** Element focused when the dialog opened (focus returns to it). */
  openerRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
}

const DialogContext = createContext<DialogContextValue | null>(null);

/** Dialog state of the closest `DialogRoot` (throws outside of one). */
export const useDialogContext = (component: string): DialogContextValue => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error(`<${component}> must be used inside its dialog root`);
  }
  return context;
};

/** Props of the `DialogRoot` dialog state owner. */
export interface DialogRootProps {
  /** Controlled open state; leave `undefined` for uncontrolled. */
  open?: boolean;
  /** Initial open state while uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Called with the requested open state. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Modal: focus trap, scroll lock, the rest of the page hidden from
   * assistive technology and inert to the pointer, an overlay. @default true
   */
  modal?: boolean;
  children?: ReactNode;
}

/**
 * Records the element focused when the dialog opens. Rendered as the first
 * child of the root so its layout effect runs before any content mounts
 * (an `autoFocus` field focuses itself during that same commit).
 */
const OpenerCapture = ({
  open,
  openerRef,
  contentRef,
}: {
  open: boolean;
  openerRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
}) => {
  const wasOpen = useRef(false);
  useLayoutEffect(() => {
    // Only on the closed -> open transition (StrictMode replays the effect
    // once focus is already inside the content).
    if (open && !wasOpen.current) {
      const active = document.activeElement;
      // Re-opened while the previous content still has focus: keep the opener.
      if (!active || !contentRef.current?.contains(active)) {
        openerRef.current =
          active instanceof HTMLElement && active !== document.body
            ? active
            : null;
      }
    }
    wasOpen.current = open;
  }, [open, openerRef, contentRef]);
  return null;
};

/**
 * DialogRoot: owns the open state (controlled / uncontrolled) and the ids
 * linking trigger, content, title and description. Shared foundation of
 * Modal, Drawer, the AppShell navigation drawer and CommandDialog.
 */
export const DialogRoot = ({
  open: openProp,
  defaultOpen,
  onOpenChange,
  modal = true,
  children,
  componentName = "Dialog",
}: DialogRootProps & {
  /** Public component name used by the development warnings. */
  componentName?: string;
}) => {
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps(componentName, {
      prop: "open",
      value: openProp,
      defaultProp: "defaultOpen",
      defaultValue: defaultOpen,
      handlerProp: "onOpenChange",
      handler: onOpenChange,
    });
  }
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
    name: componentName,
    prop: "open",
  });
  const id = useId();
  const [titles, setTitles] = useState(0);
  const [descriptions, setDescriptions] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);

  const registerTitle = useCallback(() => {
    setTitles((n) => n + 1);
    return () => setTitles((n) => n - 1);
  }, []);
  const registerDescription = useCallback(() => {
    setDescriptions((n) => n + 1);
    return () => setDescriptions((n) => n - 1);
  }, []);

  const value = useMemo<DialogContextValue>(
    () => ({
      open,
      setOpen,
      modal,
      contentId: `${id}content`,
      titleId: `${id}title`,
      descriptionId: `${id}description`,
      titles,
      descriptions,
      registerTitle,
      registerDescription,
      triggerRef,
      openerRef,
      contentRef,
    }),
    [
      open,
      setOpen,
      modal,
      id,
      titles,
      descriptions,
      registerTitle,
      registerDescription,
    ],
  );

  return (
    <DialogContext.Provider value={value}>
      <OpenerCapture
        open={open}
        openerRef={openerRef}
        contentRef={contentRef}
      />
      {children}
    </DialogContext.Provider>
  );
};

/** Props of `DialogTrigger` / `DialogClose`. */
export interface DialogButtonProps extends ComponentPropsWithRef<"button"> {
  /** Merge onto the single child element instead of rendering a `<button>`. */
  asChild?: boolean;
}

/**
 * Toggles the dialog: `aria-haspopup="dialog"`, `aria-expanded`,
 * `aria-controls` (while open) and `data-state`. Focus returns to it on close
 * when nothing else was focused when opening.
 */
export const DialogTrigger = ({
  asChild = false,
  onClick,
  ref,
  ...rest
}: DialogButtonProps) => {
  const context = useDialogContext("DialogTrigger");
  const { open, setOpen, triggerRef, contentId } = context;
  const mergedRef = useMergedRefs<HTMLElement>(
    triggerRef,
    ref as Ref<HTMLElement>,
  );
  const props = {
    "aria-haspopup": "dialog" as const,
    "aria-expanded": open,
    "aria-controls": open ? contentId : undefined,
    "data-state": open ? "open" : "closed",
    ...rest,
    onClick: composeEventHandlers(onClick, () => setOpen(!open)),
  };
  return asChild ? (
    <Slot ref={mergedRef} {...props} />
  ) : (
    <button
      type="button"
      ref={mergedRef as Ref<HTMLButtonElement>}
      {...props}
    />
  );
};

/** Closes the dialog; a `<button>` or, with `asChild`, the child element. */
export const DialogClose = ({
  asChild = false,
  onClick,
  ...rest
}: DialogButtonProps) => {
  const { setOpen } = useDialogContext("DialogClose");
  const props = {
    ...rest,
    onClick: composeEventHandlers(onClick, () => setOpen(false)),
  };
  return asChild ? <Slot {...props} /> : <button type="button" {...props} />;
};

/** Props of `DialogTitle` / `DialogDescription`. */
export interface DialogTextProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  /** Merge onto the single child element instead of rendering an element. */
  asChild?: boolean;
}

/** The dialog's accessible name (`aria-labelledby` of the content). */
export const DialogTitle = ({
  asChild = false,
  ref,
  children,
  ...rest
}: DialogTextProps) => {
  const { titleId, registerTitle } = useDialogContext("DialogTitle");
  useLayoutEffect(registerTitle, [registerTitle]);
  const props = { id: titleId, ...rest };
  return asChild ? (
    <Slot ref={ref} {...props}>
      {children}
    </Slot>
  ) : (
    <h2 ref={ref as Ref<HTMLHeadingElement>} {...props}>
      {children}
    </h2>
  );
};

/**
 * The dialog's accessible description (`aria-describedby` of the content,
 * only set while a description is mounted).
 */
export const DialogDescription = ({
  asChild = false,
  ref,
  ...rest
}: DialogTextProps) => {
  const { descriptionId, registerDescription } =
    useDialogContext("DialogDescription");
  useLayoutEffect(registerDescription, [registerDescription]);
  const props = { id: descriptionId, ...rest };
  return asChild ? (
    <Slot ref={ref} {...props} />
  ) : (
    <p ref={ref as Ref<HTMLParagraphElement>} {...props} />
  );
};

/** Props shared by the dialog-like overlay contents (Modal, Drawer...). */
export interface DialogContentEventProps {
  /**
   * Before focus moves into the content on open; `event.preventDefault()`
   * keeps it where it is (move it yourself).
   */
  onOpenAutoFocus?: (event: Event) => void;
  /**
   * Before focus returns to the opener on close; `event.preventDefault()`
   * skips it (move it yourself).
   */
  onCloseAutoFocus?: (event: Event) => void;
  /** Escape pressed while topmost; `event.preventDefault()` keeps it open. */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /** Pointer pressed outside (e.g. the overlay); `preventDefault()` keeps it open. */
  onPointerDownOutside?: (event: PointerEvent) => void;
  /** Pointer down or focus outside; `preventDefault()` keeps it open. */
  onInteractOutside?: (event: PointerEvent | FocusEvent) => void;
}

/** Props of `DialogContent`. */
export interface DialogContentProps
  extends HTMLAttributes<HTMLDivElement>, DialogContentEventProps {
  ref?: Ref<HTMLDivElement>;
  /** @default "dialog" */
  role?: "dialog" | "alertdialog";
  /** Keep mounted while closed (`data-state="closed"`, no behaviour). */
  forceMount?: boolean;
  /** Class name of the overlay (modal only). */
  overlayClassName?: string;
  /** Inline style of the overlay (modal only). */
  overlayStyle?: CSSProperties;
  /** `data-*` attributes of the overlay (its styling hooks; modal only). */
  overlayAttributes?: Record<`data-${string}`, string | undefined>;
  /** Portal container; defaults to the theme-scoped one / `document.body`. */
  container?: Element | null;
}

const OVERLAY_STYLE: CSSProperties = { pointerEvents: "auto" };

/**
 * DialogContent: portalled overlay (modal) + the dialog element.
 *
 * - `role="dialog"` (or `alertdialog`), `aria-modal` when modal,
 *   `aria-labelledby` / `aria-describedby` linked to a mounted
 *   `DialogTitle` / `DialogDescription`, `data-state="open|closed"`.
 * - Focus moves to the first tabbable (or the content) on open, is trapped
 *   and loops while modal, and returns to the element focused when it opened
 *   (else the trigger) on close.
 * - Escape (topmost layer only) and pointer down outside (the overlay)
 *   request closing; nested overlays rendered inside are child layers.
 * - Modal: page scroll lock, siblings `aria-hidden`, outside pointer events
 *   disabled. Stays mounted during the `data-state="closed"` exit animation.
 */
export const DialogContent = ({
  ref,
  role = "dialog",
  forceMount = false,
  overlayClassName,
  overlayStyle,
  overlayAttributes,
  container,
  onOpenAutoFocus,
  onCloseAutoFocus,
  onEscapeKeyDown,
  onPointerDownOutside,
  onInteractOutside,
  children,
  ...rest
}: DialogContentProps) => {
  const context = useDialogContext("DialogContent");
  const {
    open,
    setOpen,
    modal,
    contentId,
    titleId,
    descriptionId,
    titles,
    descriptions,
    triggerRef,
    openerRef,
    contentRef,
  } = context;
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const mergedRef = useMergedRefs<HTMLDivElement>(
    useMergedRefs<HTMLDivElement>(
      setElement,
      contentRef as RefObject<HTMLDivElement | null>,
    ),
    ref,
  );
  const present = usePresence(open, element);
  const active = open && !!element;

  useDismissableLayer(element, {
    enabled: active,
    disableOutsidePointerEvents: modal,
    branches: () => [triggerRef.current],
    onEscapeKeyDown,
    onPointerDownOutside,
    // Focus is trapped while modal: never dismiss on focus outside.
    onFocusOutside: modal ? (event) => event.preventDefault() : undefined,
    onInteractOutside,
    onDismiss: () => setOpen(false),
  });
  useFocusScope(element, {
    enabled: active,
    trapped: modal,
    loop: true,
    restoreFocus: () => openerRef.current ?? triggerRef.current,
    onMountAutoFocus: onOpenAutoFocus,
    onUnmountAutoFocus: onCloseAutoFocus,
  });
  useScrollLock(active && modal);
  useHideOthers(element, active && modal);

  if (!present && !forceMount) return null;
  const state: DialogState = open ? "open" : "closed";
  return (
    <Portal container={container}>
      {modal && (
        <div
          className={overlayClassName}
          style={
            overlayStyle ? { ...OVERLAY_STYLE, ...overlayStyle } : OVERLAY_STYLE
          }
          {...overlayAttributes}
          data-state={state}
          aria-hidden="true"
        />
      )}
      <LayerContext.Provider value={element}>
        <div
          ref={mergedRef}
          id={contentId}
          role={role}
          aria-modal={modal || undefined}
          aria-labelledby={titles > 0 ? titleId : undefined}
          aria-describedby={descriptions > 0 ? descriptionId : undefined}
          tabIndex={-1}
          data-state={state}
          {...rest}
        >
          {children}
        </div>
      </LayerContext.Provider>
    </Portal>
  );
};
