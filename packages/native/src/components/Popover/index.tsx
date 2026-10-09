import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  type ReactElement,
  type ReactNode,
} from "react";
import { View, type ViewProps } from "react-native";
import { useControllable } from "../../internal/useControllable";
import { Button, type ButtonProps } from "../Button";
import { Dialog, type DialogProps } from "../Dialog";
const Context = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);
function usePopover() {
  const context = useContext(Context);
  if (!context) throw Error("Popover parts must be inside Popover");
  return context;
}
export interface PopoverProps {
  open?: boolean;
  /** @default false */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}
/** Native popovers use an accessible modal panel that remains reachable on small screens. */
export function Popover({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: PopoverProps) {
  const [shown, setShown] = useControllable(open, defaultOpen, onOpenChange);
  return (
    <Context.Provider value={{ open: shown, setOpen: setShown }}>
      {children}
    </Context.Provider>
  );
}
export interface PopoverTriggerProps extends ButtonProps {
  /** @default false */
  asChild?: boolean;
}
function Action({
  close = false,
  asChild,
  children,
  onPress,
  ...props
}: PopoverTriggerProps & { close?: boolean }) {
  const state = usePopover();
  const press: ButtonProps["onPress"] = (event) => {
    onPress?.(event);
    state.setOpen(close ? false : !state.open);
  };
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<ButtonProps>;
    return cloneElement(child, {
      ...props,
      accessibilityState: {
        ...child.props.accessibilityState,
        expanded: close ? undefined : state.open,
      },
      onPress: (event) => {
        if (props.disabled || child.props.disabled) return;
        child.props.onPress?.(event);
        press?.(event);
      },
    });
  }
  return (
    <Button
      {...props}
      accessibilityState={{
        ...props.accessibilityState,
        expanded: close ? undefined : state.open,
      }}
      onPress={press}
    >
      {children}
    </Button>
  );
}
export function PopoverTrigger(props: PopoverTriggerProps) {
  return <Action {...props} />;
}
export function PopoverClose(props: PopoverTriggerProps) {
  return <Action {...props} close />;
}
export function PopoverAnchor(props: ViewProps) {
  return <View {...props} />;
}
export interface PopoverContentProps extends Omit<
  DialogProps,
  "open" | "defaultOpen" | "onOpenChange"
> {
  accessibilityLabel?: string;
}
export function PopoverContent({
  accessibilityLabel,
  title,
  ...props
}: PopoverContentProps) {
  const state = usePopover();
  return (
    <Dialog
      {...props}
      title={title ?? accessibilityLabel}
      open={state.open}
      onOpenChange={state.setOpen}
    />
  );
}
