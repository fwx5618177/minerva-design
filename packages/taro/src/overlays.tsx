import { useH5List, useH5Layer } from "./h5";
import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
  type ReactElement,
  type ReactNode,
} from "react";
import { View, Text } from "@tarojs/components";
import {
  cn,
  resolveTokens,
  normalizeShortcuts,
  matchesShortcut,
} from "@minerva/core";
import Taro from "@tarojs/taro";
import { useI18n } from "./theme";
import { Button, Input, type ButtonProps } from "./components";
import {
  Part,
  useValue,
  useNativeAnchoredPosition,
  type NativePositionOptions,
  type NativeFloatingSide,
  type NativeProps,
} from "./shared";
export interface DisclosureProps extends NativeProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
const DisclosureContext = createContext({
  open: false,
  modal: true,
  headingId: undefined as string | undefined,
  setHeadingId: (() => {}) as (id: string | undefined) => void,
  set: (() => {}) as (open: boolean) => void,
});
export function ModalRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  modal = true,
}: DisclosureProps & { modal?: boolean }) {
  const [current, set] = useValue(open, defaultOpen, onOpenChange);
  const [headingId, setHeadingId] = useState<string>();
  return (
    <DisclosureContext.Provider
      value={{ open: current, set, modal, headingId, setHeadingId }}
    >
      {children}
    </DisclosureContext.Provider>
  );
}
export interface DisclosureButtonProps extends NativeProps {
  asChild?: boolean;
  disabled?: boolean;
  onClick?: ButtonProps["onClick"];
}
function DisclosureButton({
  children,
  asChild = false,
  disabled,
  onClick,
  close = false,
  ...props
}: DisclosureButtonProps & { close?: boolean }) {
  const context = useContext(DisclosureContext);
  const child = isValidElement(children)
    ? (children as ReactElement<DisclosureButtonProps>)
    : null;
  const activate: NonNullable<ButtonProps["onClick"]> = (event) => {
    if (disabled || (asChild && child?.props.disabled)) return;
    if (asChild) child?.props.onClick?.(event);
    onClick?.(event);
    if (!("defaultPrevented" in event && event.defaultPrevented))
      context.set(close ? false : !context.open);
  };
  if (asChild && child)
    return cloneElement(child, {
      ...props,
      disabled: disabled ?? child.props.disabled,
      className: cn(child.props.className, props.className),
      style: { ...child.props.style, ...props.style },
      onClick: activate,
    });
  return (
    <Button {...props} disabled={disabled} onClick={activate}>
      {children}
    </Button>
  );
}
export function ModalTrigger(props: DisclosureButtonProps) {
  return <DisclosureButton {...props} />;
}
export function ModalClose(props: DisclosureButtonProps) {
  return <DisclosureButton {...props} close />;
}
export interface NativeOutsideEvent {
  defaultPrevented: boolean;
  preventDefault: () => void;
  nativeEvent: unknown;
}
export interface ModalContentProps extends NativeProps {
  hiddenDescription?: string;
  onPointerDownOutside?: (event: NativeOutsideEvent) => void;
  onInteractOutside?: (event: NativeOutsideEvent) => void;
  forceMount?: boolean;
  hideCloseButton?: boolean;
  closeLabel?: string;
  description?: ReactNode;
  role?: "dialog" | "alertdialog";
  size?: string;
  overlayClassName?: string;
  side?: "left" | "right" | "top" | "bottom";
}
function OverlayContent({
  kind,
  forceMount,
  hideCloseButton,
  closeLabel,
  description,
  hiddenDescription,
  onPointerDownOutside,
  onInteractOutside,
  children,
  role = "dialog",
  side = "right",
  size = "medium",
  overlayClassName,
  ...props
}: ModalContentProps & { kind: "modal" | "drawer" }) {
  const { t } = useI18n();
  closeLabel ??= t(`${kind}.close`);
  const context = useContext(DisclosureContext);
  const descriptionId = useId();
  const generatedPanelId = useId();
  const panelId = props.id ?? generatedPanelId;
  useH5Layer(panelId, context.open, context.modal, (nativeEvent) => {
    if (nativeEvent && nativeEvent.type !== "keydown") {
      const event: NativeOutsideEvent = {
        nativeEvent,
        defaultPrevented: false,
        preventDefault() {
          this.defaultPrevented = true;
          nativeEvent.preventDefault();
        },
      };
      if (nativeEvent.type === "pointerdown") onPointerDownOutside?.(event);
      onInteractOutside?.(event);
      if (event.defaultPrevented) return;
    }
    context.set(false);
  });
  const hasDescription =
    description != null && description !== false && description !== "";
  const withDescription =
    hasDescription || kind === "drawer" || hiddenDescription !== undefined;
  if (!context.open && !forceMount) return null;
  return (
    <View
      className={cn("mn-overlay", !context.modal && "mn-overlay-nonmodal")}
      style={{ display: context.open ? undefined : "none" }}
    >
      {context.modal && (
        <View
          className={cn("mn-overlay-mask", overlayClassName)}
          onClick={(nativeEvent) => {
            const event: NativeOutsideEvent = {
              nativeEvent,
              defaultPrevented: false,
              preventDefault() {
                this.defaultPrevented = true;
              },
            };
            onPointerDownOutside?.(event);
            onInteractOutside?.(event);
            if (!event.defaultPrevented) context.set(false);
          }}
        />
      )}
      <Part
        name={kind}
        id={panelId}
        part="content"
        role={role}
        aria-modal={context.modal}
        aria-labelledby={context.headingId}
        aria-describedby={withDescription ? descriptionId : undefined}
        data-state={context.open ? "open" : "closed"}
        {...props}
        className={cn(
          `mn-${kind}-${side}`,
          `mn-${kind}-${size}`,
          props.className,
        )}
      >
        {!hideCloseButton && (
          <Button
            variant="ghost"
            className="mn-overlay-close"
            aria-label={closeLabel}
            onClick={() => context.set(false)}
          >
            ×
          </Button>
        )}
        {withDescription && (
          <Text
            id={descriptionId}
            className={
              description ? "mn-overlay-description" : "mn-visually-hidden"
            }
          >
            {description ?? hiddenDescription ?? t(`${kind}.description`)}
          </Text>
        )}
        {children}
      </Part>
    </View>
  );
}
export function ModalContent(props: ModalContentProps) {
  return <OverlayContent kind="modal" {...props} />;
}
function OverlayHeader({
  kind,
  ...props
}: NativeProps & { kind: "modal" | "drawer" }) {
  const context = useContext(DisclosureContext),
    generatedId = useId(),
    id = props.id ?? generatedId;
  const register = context.setHeadingId;
  useEffect(() => {
    register(id);
    return () => register(undefined);
  }, [id, register]);
  return <Part name={kind} part="header" {...props} id={id} />;
}
export function ModalHeader(props: NativeProps) {
  return <OverlayHeader kind="modal" {...props} />;
}
export function ModalBody(props: NativeProps) {
  return <Part name="modal" part="body" {...props} />;
}
export function ModalFooter(props: NativeProps) {
  return <Part name="modal" part="footer" {...props} />;
}
export interface ModalProps extends DisclosureProps, ModalContentProps {
  trigger?: ReactNode;
  title?: ReactNode;
}
export function Modal({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  children,
  ...props
}: ModalProps) {
  const titleId = useId();
  return (
    <ModalRoot
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger && <ModalTrigger asChild>{trigger}</ModalTrigger>}
      <ModalContent
        {...props}
        aria-labelledby={
          props["aria-label"]
            ? undefined
            : (props["aria-labelledby"] ?? (title ? titleId : undefined))
        }
      >
        {title && <ModalHeader id={titleId}>{title}</ModalHeader>}
        {children}
      </ModalContent>
    </ModalRoot>
  );
}
export function DrawerRoot(props: DisclosureProps & { modal?: boolean }) {
  return <ModalRoot {...props} />;
}
export function DrawerTrigger(props: DisclosureButtonProps) {
  return <DisclosureButton {...props} />;
}
export function DrawerContent(props: ModalContentProps) {
  return <OverlayContent kind="drawer" {...props} />;
}
export function DrawerHeader(props: NativeProps) {
  return <OverlayHeader kind="drawer" {...props} />;
}
export function DrawerBody(props: NativeProps) {
  return <Part name="drawer" part="body" {...props} />;
}
export function DrawerFooter(props: NativeProps) {
  return <Part name="drawer" part="footer" {...props} />;
}
export function DrawerClose(props: DisclosureButtonProps) {
  return <DisclosureButton {...props} close />;
}
export function Drawer({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  children,
  ...props
}: ModalProps) {
  const titleId = useId();
  return (
    <DrawerRoot
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent
        {...props}
        aria-labelledby={
          props["aria-label"]
            ? undefined
            : (props["aria-labelledby"] ?? (title ? titleId : undefined))
        }
      >
        {title && <DrawerHeader id={titleId}>{title}</DrawerHeader>}
        {children}
      </DrawerContent>
    </DrawerRoot>
  );
}
const NativePopoverContext = createContext({
  anchorId: "",
  setAnchorId: (() => {}) as (id: string) => void,
  triggerId: "",
  panelId: "",
  side: "bottom" as NativeFloatingSide,
  align: "center" as "start" | "center" | "end",
  arrow: false,
  label: undefined as string | undefined,
});
export function Popover({
  children,
  side = "bottom",
  align = "center",
  arrow = false,
  modal = false,
  label,
  ...props
}: DisclosureProps & {
  side?: NativeFloatingSide;
  align?: "start" | "center" | "end";
  modal?: boolean;
  label?: string;
  arrow?: boolean;
}) {
  const key = useId().replace(/[^a-zA-Z0-9_-]/g, ""),
    triggerId = `mn-popover-${key}-trigger`,
    panelId = `mn-popover-${key}-panel`;
  const [anchorId, setAnchorId] = useState(triggerId);
  return (
    <NativePopoverContext.Provider
      value={{
        anchorId,
        setAnchorId,
        triggerId,
        panelId,
        side,
        align,
        arrow,
        label,
      }}
    >
      <ModalRoot {...props} modal={modal}>
        <Part name="popover">{children}</Part>
      </ModalRoot>
    </NativePopoverContext.Provider>
  );
}
export function PopoverTrigger(props: DisclosureButtonProps) {
  const context = useContext(NativePopoverContext);
  return (
    <View id={context.triggerId} className="mn-popover-trigger">
      <DisclosureButton asChild {...props} />
    </View>
  );
}
export function PopoverAnchor({
  asChild,
  children,
  ...props
}: NativeProps & { asChild?: boolean }) {
  const context = useContext(NativePopoverContext),
    id = `${context.triggerId}-anchor`;
  useEffect(() => {
    context.setAnchorId(id);
    return () => context.setAnchorId(context.triggerId);
  }, [id, context.setAnchorId, context.triggerId]);
  if (asChild && isValidElement<NativeProps>(children))
    return cloneElement(children, {
      ...props,
      id,
      className: cn(
        "mn-popover__anchor",
        children.props.className,
        props.className,
      ),
      style: { ...children.props.style, ...props.style },
    });
  return (
    <Part name="popover" part="anchor" {...props} id={id}>
      {children}
    </Part>
  );
}
export function PopoverClose(props: DisclosureButtonProps) {
  return <DisclosureButton asChild {...props} close />;
}
export function PopoverContent({
  forceMount,
  children,
  side,
  align,
  sideOffset,
  alignOffset,
  collisionPadding,
  matchAnchorWidth,
  arrow,
  ...props
}: NativeProps &
  NativePositionOptions & { forceMount?: boolean; arrow?: boolean }) {
  const context = useContext(DisclosureContext),
    popover = useContext(NativePopoverContext);
  useH5Layer(
    popover.panelId,
    context.open,
    context.modal,
    () => context.set(false),
    popover.triggerId,
    true,
  );
  const position = useNativeAnchoredPosition(
    popover.anchorId,
    popover.panelId,
    context.open,
    {
      side: side ?? popover.side,
      align: align ?? popover.align,
      sideOffset,
      alignOffset,
      collisionPadding,
      matchAnchorWidth,
    },
  );
  if (!context.open && !forceMount) return null;
  return (
    <>
      {context.open && (
        <View
          className="mn-popover-backdrop"
          onClick={() => context.set(false)}
        />
      )}
      <Part
        name="popover"
        part="content"
        role="dialog"
        {...props}
        id={popover.panelId}
        aria-label={props["aria-label"] ?? popover.label}
        data-side={position.side}
        data-state={context.open ? "open" : "closed"}
        style={{
          ...position.style,
          overflow: "visible",
          display: context.open ? undefined : "none",
          ...props.style,
        }}
      >
        <View
          className="mn-floating-body"
          style={{ maxHeight: position.style.maxHeight, overflow: "auto" }}
        >
          {children}
        </View>
        {(arrow ?? popover.arrow) && (
          <View
            aria-hidden
            className="mn-floating-arrow"
            style={position.arrow}
          />
        )}
      </Part>
    </>
  );
}
export interface TooltipProps extends DisclosureProps {
  content: ReactNode;
  color?: string;
  variant?: string;
  shape?: string;
  arrow?: boolean;
  animation?: "fade" | "scale" | "shift-away" | "shift-toward" | "perspective";
  offset?: [number, number];
  zIndex?: number;
  disabled?: boolean;
  placement?: string;
  asChild?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  contentClassName?: string;
  enterDelay?: number;
  leaveDelay?: number;
}
interface TooltipConfig {
  enterDelay?: number;
  leaveDelay?: number;
  markClosed: () => void;
  shouldSkipDelay: () => boolean;
}
const TooltipConfigContext = createContext<TooltipConfig | null>(null);
export function Tooltip({
  content,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled,
  enterDelay,
  leaveDelay,
  placement = "top",
  color = "neutral",
  variant = "solid",
  shape = "default",
  arrow,
  animation = "fade",
  offset,
  zIndex = 1500,
  asChild,
  onOpen,
  onClose,
  contentClassName,
  ...props
}: TooltipProps) {
  const config = useContext(TooltipConfigContext);
  const key = useId().replace(/[^a-zA-Z0-9_-]/g, ""),
    anchorId = `mn-tooltip-${key}-anchor`,
    panelId = `mn-tooltip-${key}-panel`;
  const [side, align] = placement.split("-") as [
    NativeFloatingSide,
    "start" | "end" | undefined,
  ];
  const [current, set] = useValue(open, defaultOpen, onOpenChange);
  const position = useNativeAnchoredPosition(
    anchorId,
    panelId,
    current && !disabled,
    {
      side,
      align: align ?? "center",
      sideOffset: offset
        ? side === "top" || side === "bottom"
          ? offset[1]
          : offset[0]
        : 8,
      alignOffset: offset
        ? side === "top" || side === "bottom"
          ? offset[0]
          : offset[1]
        : 0,
    },
  );
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const latest = useRef({ disabled, set, current, onOpen, onClose });
  latest.current = { disabled, set, current, onOpen, onClose };
  const clear = () => {
    if (timer.current !== undefined) clearTimeout(timer.current);
    timer.current = undefined;
  };
  useEffect(() => {
    if (disabled) clear();
    return clear;
  }, [disabled]);
  const toggle = () => {
    if (disabled) return;
    clear();
    const next = !current;
    const delay = next
      ? config?.shouldSkipDelay()
        ? 0
        : (enterDelay ?? config?.enterDelay ?? 200)
      : (leaveDelay ?? config?.leaveDelay ?? 0);
    const apply = () => {
      timer.current = undefined;
      if (latest.current.disabled) return;
      latest.current.set(next);
      if (next) latest.current.onOpen?.();
      else latest.current.onClose?.();
      if (!next) config?.markClosed();
    };
    if (delay <= 0) apply();
    else timer.current = setTimeout(apply, delay);
  };
  const panel = current && !disabled && (
    <Part
      name="tooltip"
      role="tooltip"
      {...props}
      id={panelId}
      data-side={position.side}
      style={{ ...position.style, overflow: "visible", zIndex, ...props.style }}
      className={cn(
        `mn-tooltip-${position.side}`,
        `mn-tooltip-animation-${animation}`,
        `mn-color-${color}`,
        `mn-variant-${variant}`,
        `mn-tooltip-shape-${shape}`,
        contentClassName,
      )}
    >
      <View
        className="mn-floating-body"
        style={{ maxHeight: position.style.maxHeight, overflow: "auto" }}
      >
        {content}
      </View>
      {arrow && (
        <View
          aria-hidden
          className="mn-floating-arrow"
          style={position.arrow}
        />
      )}
    </Part>
  );
  if (
    asChild &&
    isValidElement<
      NativeProps & {
        disabled?: boolean;
        onClick?: (event: unknown) => void;
        onLongPress?: (event: unknown) => void;
      }
    >(children)
  ) {
    const trigger = cloneElement(children, {
      id: anchorId,
      className: cn(
        "mn-tooltip-anchor",
        children.props.className,
        props.className,
      ),
      onClick: (event) => {
        children.props.onClick?.(event);
        if (!children.props.disabled) toggle();
      },
      onLongPress: (event) => {
        children.props.onLongPress?.(event);
        if (!children.props.disabled) toggle();
      },
    });
    return (
      <>
        {trigger}
        {panel}
      </>
    );
  }
  return (
    <View
      id={anchorId}
      className={cn("mn-tooltip-anchor", props.className)}
      onLongPress={toggle}
      onClick={toggle}
    >
      {children}
      {panel}
    </View>
  );
}

export function TooltipProvider({
  children,
  enterDelay,
  leaveDelay,
  skipDelay = 300,
}: NativeProps & {
  enterDelay?: number;
  leaveDelay?: number;
  skipDelay?: number;
}) {
  const closed = useRef<number | null>(null);
  const value = useMemo(
    () => ({
      enterDelay,
      leaveDelay,
      markClosed: () => {
        closed.current = Date.now();
      },
      shouldSkipDelay: () =>
        closed.current !== null && Date.now() - closed.current < skipDelay,
    }),
    [enterDelay, leaveDelay, skipDelay],
  );
  return (
    <TooltipConfigContext.Provider value={value}>
      {children}
    </TooltipConfigContext.Provider>
  );
}
export interface ConfirmDialogProps extends Omit<ModalProps, "onChange"> {
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
  loading?: boolean;
  confirmDisabled?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  color?: string;
}
export function ConfirmDialog({
  confirmLabel,
  cancelLabel,
  loading,
  confirmDisabled,
  onConfirm,
  onCancel,
  open,
  defaultOpen = false,
  onOpenChange,
  color = "primary",
  ...props
}: ConfirmDialogProps) {
  const { t } = useI18n();
  confirmLabel ??= t(color === "danger" ? "confirm.delete" : "confirm.confirm");
  cancelLabel ??= t("confirm.cancel");
  const [current, set] = useValue(open, defaultOpen, onOpenChange);
  const cancel = () => {
    if (loading) return;
    set(false);
    onCancel?.();
  };
  return (
    <Modal
      {...props}
      size={props.size ?? "small"}
      open={current}
      role="alertdialog"
      onOpenChange={(next) => {
        if (!next) cancel();
      }}
    >
      <ModalFooter>
        <Button variant="outline" disabled={loading} onClick={cancel}>
          {cancelLabel}
        </Button>
        <Button
          color={color}
          disabled={confirmDisabled}
          loading={loading}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
export type ConfirmOptions = Omit<
  ConfirmDialogProps,
  "open" | "onConfirm" | "onCancel"
>;
/** Native modal fallback for an imperative confirmation outside a provider. */
export async function confirm(options: ConfirmOptions): Promise<boolean> {
  if (
    typeof options.title !== "string" ||
    (options.description !== undefined &&
      typeof options.description !== "string") ||
    (options.confirmLabel !== undefined &&
      typeof options.confirmLabel !== "string") ||
    (options.cancelLabel !== undefined &&
      typeof options.cancelLabel !== "string")
  )
    throw new TypeError(
      "Native confirm requires string title/description/button labels; use ConfirmProvider for composed content.",
    );
  const result = await Taro.showModal({
    title: options.title,
    content: options.description,
    confirmText:
      typeof options.confirmLabel === "string"
        ? options.confirmLabel
        : options.color === "danger"
          ? "Delete"
          : "Confirm",
    cancelText:
      typeof options.cancelLabel === "string" ? options.cancelLabel : "Cancel",
    confirmColor: resolveTokens().colors[`${options.color ?? "primary"}-color`],
    showCancel: true,
  });
  return result.confirm;
}
const ConfirmContext = createContext<
  ((options: ConfirmOptions) => Promise<boolean>) | null
>(null);
export function ConfirmProvider({ children }: NativeProps) {
  const [request, setRequest] = useState<{
    options: ConfirmOptions;
    resolve: (result: boolean) => void;
  } | null>(null);
  const ref = useRef(request);
  ref.current = request;
  useEffect(() => () => ref.current?.resolve(false), []);
  const settle = (value: boolean) => {
    request?.resolve(value);
    setRequest(null);
  };
  return (
    <ConfirmContext.Provider
      value={(options) =>
        new Promise((resolve) => {
          ref.current?.resolve(false);
          setRequest({ options, resolve });
        })
      }
    >
      {children}
      {request && (
        <ConfirmDialog
          {...request.options}
          open
          onConfirm={() => settle(true)}
          onCancel={() => settle(false)}
        />
      )}
    </ConfirmContext.Provider>
  );
}
export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error("useConfirm requires ConfirmProvider");
  return context;
}
export interface MenuAction {
  key: string;
  label: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  shortcut?: string;
  children?: MenuEntry[];
  closeOnSelect?: boolean;
  type?: "action";
}
export type MenuEntry =
  | MenuAction
  | { type: "separator"; key: string }
  | { type: "group"; key: string; label: ReactNode; items: MenuEntry[] }
  | {
      type: "checkbox";
      key: string;
      label: ReactNode;
      checked?: boolean;
      defaultChecked?: boolean;
      disabled?: boolean;
      onCheckedChange?: (checked: boolean) => void;
      closeOnSelect?: boolean;
    }
  | {
      type: "radio-group";
      key: string;
      label?: ReactNode;
      items: { value: string; label: ReactNode; disabled?: boolean }[];
      value?: string;
      defaultValue?: string;
      onValueChange?: (value: string) => void;
      closeOnSelect?: boolean;
    };
export interface MenuProps extends DisclosureProps {
  items: MenuEntry[];
  children: ReactElement;
  onSelect?: (item: MenuAction) => void;
  closeOnSelect?: boolean;
  disabled?: boolean;
  size?: "small" | "medium";
  align?: "start" | "center" | "end";
  side?: NativeFloatingSide;
  modal?: boolean;
  dir?: "ltr" | "rtl";
}
const MenuContext = createContext({
  close: () => {},
  dir: "ltr" as "ltr" | "rtl",
  size: "medium" as "small" | "medium",
});
export function MenuItem({
  children,
  disabled,
  onSelect,
  keepOpen,
  value,
  ...props
}: NativeProps & {
  disabled?: boolean;
  onSelect?: (value?: string) => void;
  keepOpen?: boolean;
  value?: string;
  shortcut?: string;
  "aria-haspopup"?: "menu";
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}) {
  const context = useContext(MenuContext);
  return (
    <Button
      {...props}
      variant="ghost"
      {...{ role: "menuitem" }}
      disabled={disabled}
      onClick={() => {
        onSelect?.(value);
        if (!keepOpen) context.close();
      }}
    >
      {children}
      {props.shortcut && <Text>{props.shortcut}</Text>}
    </Button>
  );
}
export function MenuCheckboxItem({
  checked,
  defaultChecked = false,
  onCheckedChange,
  children,
  disabled,
  closeOnSelect,
  ...props
}: NativeProps & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (value: boolean) => void;
  disabled?: boolean;
  closeOnSelect?: boolean;
  value?: string;
}) {
  const [current, set] = useValue(checked, defaultChecked, onCheckedChange),
    context = useContext(MenuContext);
  return (
    <Button
      {...props}
      variant="ghost"
      {...{ role: "menuitemcheckbox" }}
      aria-checked={current}
      disabled={disabled}
      onClick={() => {
        set(!current);
        if (closeOnSelect) context.close();
      }}
    >
      {current ? "✓ " : ""}
      {children}
    </Button>
  );
}
export function MenuRadioItem({
  checked,
  onSelect,
  children,
  disabled,
  value,
  ...props
}: NativeProps & {
  checked?: boolean;
  disabled?: boolean;
  value: string;
  onSelect?: (value: string) => void;
}) {
  return (
    <Button
      {...props}
      variant="ghost"
      {...{ role: "menuitemradio" }}
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onSelect?.(value)}
    >
      {checked ? "● " : ""}
      {children}
    </Button>
  );
}
export function MenuGroup(props: NativeProps & { label?: ReactNode }) {
  return (
    <Part name="menu" part="group" role="group" {...props}>
      {props.label}
      {props.children}
    </Part>
  );
}
export function MenuLabel(props: NativeProps) {
  return <Part name="menu" part="label" {...props} />;
}
export function MenuSeparator(props: NativeProps) {
  return <Part name="menu" part="separator" role="separator" {...props} />;
}
function RadioMenu({
  entry,
}: {
  entry: Extract<MenuEntry, { type: "radio-group" }>;
}) {
  const [value, set] = useValue(
      entry.value,
      entry.defaultValue ?? "",
      entry.onValueChange,
    ),
    context = useContext(MenuContext);
  return (
    <MenuGroup label={entry.label}>
      {entry.items.map((item) => (
        <MenuRadioItem
          key={item.value}
          {...item}
          checked={value === item.value}
          onSelect={(next) => {
            set(next);
            if (entry.closeOnSelect) context.close();
          }}
        >
          {item.label}
        </MenuRadioItem>
      ))}
    </MenuGroup>
  );
}
function MenuBranch({
  item,
  open,
  toggle,
  onSelect,
  closeOnSelect,
}: {
  item: MenuAction;
  open: boolean;
  toggle: () => void;
  onSelect?: MenuProps["onSelect"];
  closeOnSelect: boolean;
}) {
  const context = useContext(MenuContext);
  const key = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const anchorId = `mn-menu-sub-${key}-anchor`,
    panelId = `mn-menu-sub-${key}-panel`;
  const position = useNativeAnchoredPosition(anchorId, panelId, open, {
    side: context.dir === "rtl" ? "left" : "right",
    align: "start",
    sideOffset: 4,
    alignOffset: -5,
  });
  return (
    <View id={anchorId}>
      <MenuItem
        disabled={item.disabled}
        keepOpen
        onSelect={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
      >
        {item.icon}
        {item.label}
        {item.shortcut}
        <Text aria-hidden className="mn-menu-chevron">
          {context.dir === "rtl" ? "‹" : "›"}
        </Text>
      </MenuItem>
      {open && (
        <Part
          name="menu"
          part="submenu"
          role="menu"
          id={panelId}
          aria-label={typeof item.label === "string" ? item.label : undefined}
          data-side={position.side}
          className={cn(
            "mn-menu__content",
            "mn-menu-submenu-float",
            `mn-size-${context.size}`,
          )}
          style={{ ...position.style, direction: context.dir }}
        >
          <MenuEntries
            items={item.children ?? []}
            onSelect={onSelect}
            closeOnSelect={closeOnSelect}
          />
        </Part>
      )}
    </View>
  );
}
function MenuEntries({
  items,
  onSelect,
  closeOnSelect,
}: {
  items: MenuEntry[];
  onSelect?: MenuProps["onSelect"];
  closeOnSelect: boolean;
}) {
  const [submenu, setSubmenu] = useState<string | null>(null);
  return (
    <>
      {items.map((item) => {
        if (item.type === "separator") return <MenuSeparator key={item.key} />;
        if (item.type === "group")
          return (
            <MenuGroup key={item.key} label={item.label}>
              <MenuEntries
                items={item.items}
                onSelect={onSelect}
                closeOnSelect={closeOnSelect}
              />
            </MenuGroup>
          );
        if (item.type === "checkbox")
          return <MenuCheckboxItem {...item}>{item.label}</MenuCheckboxItem>;
        if (item.type === "radio-group")
          return <RadioMenu key={item.key} entry={item} />;
        if (item.children)
          return (
            <MenuBranch
              key={item.key}
              item={item}
              open={submenu === item.key}
              toggle={() => setSubmenu(submenu === item.key ? null : item.key)}
              onSelect={onSelect}
              closeOnSelect={closeOnSelect}
            />
          );
        return (
          <View key={item.key}>
            <MenuItem
              disabled={item.disabled}
              keepOpen={!(item.closeOnSelect ?? closeOnSelect)}
              onSelect={() => onSelect?.(item)}
            >
              {item.icon}
              {item.label}
              {item.shortcut}
            </MenuItem>
          </View>
        );
      })}
    </>
  );
}
function MenuSurface({
  items,
  onSelect,
  closeOnSelect = true,
  disabled,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  size = "medium",
  side = "bottom",
  align = "end",
  modal = true,
  dir: dirProp,
  activateOnPress = true,
  ...props
}: MenuProps & { activateOnPress?: boolean }) {
  const [current, set] = useValue(open, defaultOpen, onOpenChange);
  const dir = dirProp ?? (props.style?.direction === "rtl" ? "rtl" : "ltr");
  const key = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const anchorId = `mn-menu-${key}-anchor`,
    panelId = `mn-menu-${key}-panel`;
  useH5List(props.id ?? anchorId + "-root", {
    open: current,
    setOpen: set,
    dir,
  });
  useH5Layer(panelId, current, false, () => set(false), anchorId);
  const position = useNativeAnchoredPosition(anchorId, panelId, current, {
    side,
    align:
      dir === "rtl" && align !== "center"
        ? align === "start"
          ? "end"
          : "start"
        : align,
  });
  const child = children as ReactElement<
    Pick<ButtonProps, "disabled" | "onClick"> & {
      "aria-haspopup"?: string;
      "aria-expanded"?: boolean;
      "aria-controls"?: string;
    }
  >;
  const trigger = cloneElement(child, {
    disabled: disabled || child.props.disabled,
    "aria-haspopup": "menu",
    "aria-expanded": current,
    "aria-controls": current ? panelId : undefined,
    onClick: (event) => {
      if (disabled || child.props.disabled) return;
      child.props.onClick?.(event);
      if (
        activateOnPress &&
        !("defaultPrevented" in event && event.defaultPrevented)
      )
        set(!current);
    },
  });
  return (
    <Part
      name="menu"
      className={props.className}
      style={{ ...props.style, direction: dir }}
      id={props.id ?? anchorId + "-root"}
    >
      <View id={anchorId}>{trigger}</View>
      {current && (
        <MenuContext.Provider value={{ close: () => set(false), dir, size }}>
          {modal && (
            <View className="mn-menu-backdrop" onClick={() => set(false)} />
          )}
          <Part
            name="menu"
            part="content"
            role="menu"
            id={panelId}
            data-side={position.side}
            className={cn(`mn-size-${size}`, `mn-menu-${position.side}`)}
            style={{ ...position.style, direction: dir }}
            aria-label={props["aria-label"]}
          >
            <MenuEntries
              items={items}
              onSelect={onSelect}
              closeOnSelect={closeOnSelect}
            />
          </Part>
        </MenuContext.Provider>
      )}
    </Part>
  );
}
export function Menu(props: MenuProps) {
  return <MenuSurface {...props} />;
}
export function ContextMenu({ children, ...props }: MenuProps) {
  const [open, set] = useValue(
    props.open,
    props.defaultOpen ?? false,
    props.onOpenChange,
  );
  return (
    <View
      onLongPress={() => {
        if (!props.disabled) set(true);
      }}
    >
      <MenuSurface
        {...props}
        open={open}
        onOpenChange={set}
        activateOnPress={false}
      >
        {children}
      </MenuSurface>
    </View>
  );
}
export interface CommandItem {
  id: string;
  title?: string;
  description?: string;
  group?: string;
  label?: ReactNode;
  keywords?: string | string[];
  disabled?: boolean;
  onSelect?: () => void;
}
export interface CommandDialogProps extends DisclosureProps {
  trigger?: ReactNode;
  shortcut?: string | string[];
  items: CommandItem[];
  title?: ReactNode;
  description?: ReactNode;
  placeholder?: string;
  emptyText?: ReactNode;
  resultsLabel?: string;
  enterLabel?: string;
  shortcutLabel?: string;
  maxResults?: number;
  onSelect?: (item: CommandItem) => void;
  filter?: (items: CommandItem[], query: string) => CommandItem[];
}
export function CommandDialog({
  items,
  title,
  placeholder,
  emptyText,
  resultsLabel,
  enterLabel,
  shortcutLabel,
  shortcut,
  maxResults = 12,
  onSelect,
  filter,
  ...props
}: CommandDialogProps) {
  const { t } = useI18n();
  title ??= t("command.title");
  placeholder ??= t("command.placeholder");
  emptyText ??= t("command.empty");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useValue(
    props.open,
    props.defaultOpen ?? false,
    props.onOpenChange,
  );
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);
  const shortcutState = useRef({ shortcut, setOpen });
  shortcutState.current = { shortcut, setOpen };
  useEffect(() => {
    if (typeof document === "undefined") return;
    const listener = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing) return;
      const target = event.target as HTMLElement;
      const editable =
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName);
      if (editable && !event.ctrlKey && !event.metaKey && !event.altKey) return;
      if (
        normalizeShortcuts(shortcutState.current.shortcut).some((key) =>
          matchesShortcut(event, key),
        )
      ) {
        event.preventDefault();
        shortcutState.current.setOpen(true);
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, []);
  const commandId = useId();
  useH5List(commandId, { input: true, open, setOpen });
  const enabled = items.filter((item) => !item.disabled);
  const visible = (
    filter && query.trim()
      ? filter(enabled, query.trim())
      : enabled.filter((item) =>
          `${item.title ?? item.label ?? ""} ${item.description ?? ""} ${item.group ?? ""} ${Array.isArray(item.keywords) ? item.keywords.join(" ") : (item.keywords ?? "")}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
        )
  ).slice(0, maxResults);
  return (
    <Modal
      {...props}
      description={props.description ?? t("command.description")}
      open={open}
      onOpenChange={setOpen}
      title={title}
      id={commandId}
    >
      <Input
        value={query}
        onChange={setQuery}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <Part
        name="command"
        part="results"
        role="listbox"
        aria-label={resultsLabel ?? t("command.results")}
      >
        {visible.length ? (
          visible.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              {...{ role: "option" }}
              disabled={item.disabled}
              onClick={() => {
                item.onSelect?.();
                onSelect?.(item);
                setOpen(false);
              }}
            >
              <View className="mn-command-copy">
                <Text>{item.title ?? item.label}</Text>
                {item.description && (
                  <Text className="mn-command-description">
                    {item.description}
                  </Text>
                )}
              </View>
              {item.group && (
                <Text className="mn-command-group">{item.group}</Text>
              )}
            </Button>
          ))
        ) : (
          <Text>{emptyText}</Text>
        )}
      </Part>
      <Text className="mn-command-hint">
        {enterLabel ?? t("command.enter")}
      </Text>
      {shortcutLabel && (
        <Text className="mn-command-hint">{shortcutLabel}</Text>
      )}
    </Modal>
  );
}
export interface ToastAction {
  label: ReactNode;
  onClick: () => void;
}
export interface ToastOptions {
  id?: string | number;
  title?: ReactNode;
  description?: ReactNode;
  duration?: number;
  color?: string;
  action?: ToastAction;
  loading?: boolean;
  closable?: boolean;
  icon?: ReactNode;
  onClose?: (id: string | number) => void;
}
export interface ToastPromiseMessages<T> {
  loading: ReactNode;
  success: ReactNode | ((value: T) => ReactNode);
  error: ReactNode | ((error: unknown) => ReactNode);
}
export interface ToastApi {
  (options: ToastOptions): string | number;
  show: (options: ToastOptions | string) => string | number;
  info: (title: ReactNode, options?: ToastOptions) => string | number;
  success: (title: ReactNode, options?: ToastOptions) => string | number;
  warning: (title: ReactNode, options?: ToastOptions) => string | number;
  danger: (title: ReactNode, options?: ToastOptions) => string | number;
  loading: (title: ReactNode, options?: ToastOptions) => string | number;
  update: (id: string | number, options: Omit<ToastOptions, "id">) => void;
  dismiss: (id?: string | number) => void;
  clear: () => void;
  promise: <T>(
    promise: Promise<T>,
    messages: ToastPromiseMessages<T>,
    options?: ToastOptions,
  ) => Promise<T>;
}
const ToastContext = createContext<ToastApi | null>(null);
type VisibleToast = ToastOptions & { id: string | number };
function ToastItem({
  item,
  dismiss,
  closeLabel,
}: {
  item: VisibleToast;
  dismiss: (id: string | number) => void;
  closeLabel: string;
}) {
  useEffect(() => {
    const duration = item.duration ?? (item.loading ? 0 : 4000);
    if (!duration) return;
    const timer = setTimeout(() => dismiss(item.id), duration);
    return () => clearTimeout(timer);
  }, [item, dismiss]);
  return (
    <Part
      name="toast"
      role={item.color === "danger" && !item.loading ? "alert" : "status"}
      className={item.color && `mn-color-${item.color}`}
    >
      {item.icon}
      <Text>{item.title}</Text>
      {item.description && <Text>{item.description}</Text>}
      {item.action && (
        <Button
          variant="ghost"
          onClick={() => {
            item.action?.onClick();
            dismiss(item.id);
          }}
        >
          {item.action.label}
        </Button>
      )}
      {item.closable !== false && (
        <Button
          variant="ghost"
          aria-label={closeLabel}
          onClick={() => dismiss(item.id)}
        >
          ×
        </Button>
      )}
    </Part>
  );
}
const toastProviders: ToastApi[] = [];
function bindToast(
  show: ToastApi["show"],
  update: ToastApi["update"],
  dismiss: ToastApi["dismiss"],
): ToastApi {
  const api = Object.assign((options: ToastOptions) => show(options), {
    show,
    update,
    dismiss,
    clear: () => dismiss(),
    info: (title: ReactNode, options?: ToastOptions) =>
      show({ ...options, title, color: "info" }),
    success: (title: ReactNode, options?: ToastOptions) =>
      show({ ...options, title, color: "success" }),
    warning: (title: ReactNode, options?: ToastOptions) =>
      show({ ...options, title, color: "warning" }),
    danger: (title: ReactNode, options?: ToastOptions) =>
      show({ ...options, title, color: "danger" }),
    loading: (title: ReactNode, options?: ToastOptions) =>
      show({ ...options, title, loading: true }),
  }) as ToastApi;
  api.promise = async (promise, messages, options) => {
    const id = api.loading(messages.loading, options);
    try {
      const result = await promise;
      api.update(id, {
        loading: false,
        color: "success",
        title:
          typeof messages.success === "function"
            ? messages.success(result)
            : messages.success,
      });
      return result;
    } catch (error) {
      api.update(id, {
        loading: false,
        color: "danger",
        title:
          typeof messages.error === "function"
            ? messages.error(error)
            : messages.error,
      });
      throw error;
    }
  };
  return api;
}
export const toast: ToastApi = bindToast(
  (options) => {
    const provider = toastProviders.at(-1);
    if (!provider) throw new Error("toast requires a mounted ToastProvider");
    return provider.show(options);
  },
  (id, options) => toastProviders.at(-1)?.update(id, options),
  (id) => toastProviders.at(-1)?.dismiss(id),
);
export function ToastProvider({
  children,
  max = Infinity,
  position = "top-right",
  closeLabel,
  "aria-label": ariaLabel,
}: NativeProps & { max?: number; position?: string; closeLabel?: string }) {
  const { t } = useI18n();
  closeLabel ??= t("toast.close");
  const [items, setItems] = useState<VisibleToast[]>([]),
    ref = useRef<VisibleToast[]>([]),
    counter = useRef(0),
    maxRef = useRef(max);
  maxRef.current = max;
  const api = useMemo(() => {
    const publish = (next: VisibleToast[]) => {
      ref.current = next;
      setItems(next);
    };
    const dismiss = (id?: string | number) => {
      const removed = ref.current.filter(
        (item) => id === undefined || item.id === id,
      );
      publish(ref.current.filter((item) => !removed.includes(item)));
      removed.forEach((item) => item.onClose?.(item.id));
    };
    return bindToast(
      (input) => {
        const options = typeof input === "string" ? { title: input } : input,
          id = options.id ?? `toast-${++counter.current}`;
        const next = [
          ...ref.current.filter((item) => item.id !== id),
          { ...options, id },
        ];
        const overflow = next.splice(
          0,
          Math.max(0, next.length - maxRef.current),
        );
        publish(next);
        overflow.forEach((item) => item.onClose?.(item.id));
        return id;
      },
      (id, options) =>
        publish(
          ref.current.map((item) =>
            item.id === id ? { ...item, ...options, id } : item,
          ),
        ),
      dismiss,
    );
  }, []);
  useEffect(() => {
    toastProviders.push(api);
    return () => {
      const index = toastProviders.indexOf(api);
      if (index >= 0) toastProviders.splice(index, 1);
      ref.current.forEach((item) => item.onClose?.(item.id));
      ref.current = [];
    };
  }, [api]);
  return (
    <ToastContext.Provider value={api}>
      {children}
      <Part
        name="toast"
        part="viewport"
        role="region"
        aria-label={ariaLabel ?? t("toast.region")}
        className={`mn-toast-${position}`}
      >
        {items.map((item) => (
          <ToastItem
            key={item.id}
            item={item}
            dismiss={api.dismiss}
            closeLabel={closeLabel}
          />
        ))}
      </Part>
    </ToastContext.Provider>
  );
}
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast requires ToastProvider");
  return context;
}
