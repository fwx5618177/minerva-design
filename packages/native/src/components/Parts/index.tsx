import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  type ReactElement,
  type ReactNode,
} from "react";
import { Text, View, type TextProps, type ViewProps } from "react-native";
import { useTheme } from "../../theme/MinervaProvider";
import { textStyle } from "../../internal/styles";
import { part } from "../../internal/parts";
import { useControllable } from "../../internal/useControllable";
import { Button, type ButtonProps } from "../Button";
import { Dialog, type DialogProps } from "../Dialog";
import { Popup, type PopupProps } from "../Popup";
import { Skeleton, type SkeletonProps } from "../Skeleton";
import { Rating, type RatingProps } from "../Rating";
export function CardHeader({ style, ...props }: ViewProps) {
  const { tokens: t } = useTheme();
  return (
    <View
      {...part("card-header", "root")}
      {...props}
      style={[{ gap: t.space["2"], paddingBottom: t.space["3"] }, style]}
    />
  );
}
export function CardTitle({ style, ...props }: TextProps) {
  const { tokens: t } = useTheme();
  return (
    <Text
      {...part("card-title", "root")}
      {...props}
      accessibilityRole="header"
      style={[textStyle(t, "lg"), { fontWeight: "600" }, style]}
    />
  );
}
export function CardDescription({ style, ...props }: TextProps) {
  const { tokens: t } = useTheme();
  return (
    <Text
      {...part("card-description", "root")}
      {...props}
      style={[
        textStyle(t, "sm"),
        { color: t.colors["text-secondary-color"] },
        style,
      ]}
    />
  );
}
export function CardContent({ style, ...props }: ViewProps) {
  const { tokens: t } = useTheme();
  return (
    <View
      {...part("card-content", "root")}
      {...props}
      style={[{ gap: t.space["3"] }, style]}
    />
  );
}
export function CardFooter({ style, ...props }: ViewProps) {
  const { tokens: t } = useTheme();
  return (
    <View
      {...part("card-footer", "root")}
      {...props}
      style={[
        {
          flexDirection: "row",
          flexWrap: "wrap",
          gap: t.space["3"],
          paddingTop: t.space["3"],
          marginTop: t.space["3"],
          borderTopWidth: 1,
          borderColor: t.colors["border-color"],
        },
        style,
      ]}
    />
  );
}
export interface SkeletonTextProps extends SkeletonProps {
  /** @default 3 */
  lines?: number;
}
export function SkeletonText({ lines = 3, ...props }: SkeletonTextProps) {
  return <Skeleton {...props} variant="text" lines={lines} />;
}
export interface RatingDimension {
  key: string;
  label: string;
  value?: number;
  hint?: ReactNode;
  disabled?: boolean;
}
export interface RatingScaleProps extends Omit<
  RatingProps,
  "value" | "defaultValue" | "onChange" | "children"
> {
  /** @default true */
  showValue?: boolean;
  dimensions: readonly RatingDimension[];
  onChange?: (key: string, value: number) => void;
}
export function RatingScale({
  showValue = true,
  dimensions,
  onChange,
  readOnly,
  ...props
}: RatingScaleProps) {
  const { tokens: t } = useTheme();
  return (
    <View style={{ gap: t.space["4"] }}>
      {dimensions.map((dimension) => (
        <View key={dimension.key} style={{ gap: t.space["2"] }}>
          <Text style={textStyle(t)}>{dimension.label}</Text>
          {Boolean(dimension.hint) && (
            <Text style={textStyle(t, "sm")}>{dimension.hint}</Text>
          )}
          <Rating
            {...props}
            showValue={showValue}
            accessibilityLabel={dimension.label}
            readOnly={readOnly || dimension.disabled || !onChange}
            value={dimension.value ?? 0}
            onChange={(next) => onChange?.(dimension.key, next)}
          />
        </View>
      ))}
    </View>
  );
}
export interface ModalRootProps {
  open?: boolean;
  /** @default false */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}
const ModalContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);
const DrawerContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);
export function ModalRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: ModalRootProps) {
  const [shown, setShown] = useControllable(open, defaultOpen, onOpenChange);
  return (
    <ModalContext.Provider value={{ open: shown, setOpen: setShown }}>
      {children}
    </ModalContext.Provider>
  );
}
export function DrawerRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: ModalRootProps) {
  const [shown, setShown] = useControllable(open, defaultOpen, onOpenChange);
  return (
    <DrawerContext.Provider value={{ open: shown, setOpen: setShown }}>
      {children}
    </DrawerContext.Provider>
  );
}
export interface ModalTriggerProps extends ButtonProps {
  /** @default false */
  asChild?: boolean;
}
function OverlayAction({
  drawer = false,
  close = false,
  asChild,
  children,
  onPress,
  ...props
}: ModalTriggerProps & { drawer?: boolean; close?: boolean }) {
  const context = useContext(drawer ? DrawerContext : ModalContext);
  if (!context) throw Error("Overlay trigger must be inside its Root");
  const press: ButtonProps["onPress"] = (event) => {
    onPress?.(event);
    context.setOpen(!close);
  };
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<ButtonProps>;
    return cloneElement(child, {
      ...props,
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
      onPress={press}
      accessibilityState={{
        ...props.accessibilityState,
        expanded: close ? undefined : context.open,
      }}
    >
      {children}
    </Button>
  );
}
export function ModalTrigger(props: ModalTriggerProps) {
  return <OverlayAction {...props} />;
}
export function ModalClose(props: ModalTriggerProps) {
  return <OverlayAction {...props} close />;
}
export function DrawerTrigger(props: ModalTriggerProps) {
  return <OverlayAction {...props} drawer />;
}
export function DrawerClose(props: ModalTriggerProps) {
  return <OverlayAction {...props} drawer close />;
}
export function ModalContent(
  props: Omit<DialogProps, "open" | "defaultOpen" | "onOpenChange">,
) {
  const context = useContext(ModalContext);
  if (!context) throw Error("ModalContent must be inside ModalRoot");
  return (
    <Dialog {...props} open={context.open} onOpenChange={context.setOpen} />
  );
}
export function DrawerContent(
  props: Omit<PopupProps, "open" | "defaultOpen" | "onOpenChange">,
) {
  const context = useContext(DrawerContext);
  if (!context) throw Error("DrawerContent must be inside DrawerRoot");
  return (
    <Popup {...props} open={context.open} onOpenChange={context.setOpen} />
  );
}
export function ModalHeader({ style, ...props }: ViewProps) {
  const { tokens: t } = useTheme();
  return (
    <View
      {...props}
      style={[{ paddingBottom: t.space["3"], gap: t.space["2"] }, style]}
    />
  );
}
export function ModalBody({ style, ...props }: ViewProps) {
  const { tokens: t } = useTheme();
  return <View {...props} style={[{ gap: t.space["3"] }, style]} />;
}
export function ModalFooter({ style, ...props }: ViewProps) {
  const { tokens: t } = useTheme();
  return (
    <View
      {...props}
      style={[
        {
          paddingTop: t.space["3"],
          flexDirection: "row",
          flexWrap: "wrap",
          gap: t.space["3"],
        },
        style,
      ]}
    />
  );
}
export const DrawerHeader = ModalHeader;
export const DrawerBody = ModalBody;
export const DrawerFooter = ModalFooter;
export interface TableCellContentProps {
  children?: ReactNode;
  secondary?: ReactNode;
}
export function TableCellContent({
  children,
  secondary,
}: TableCellContentProps) {
  const { tokens: t } = useTheme();
  return (
    <View style={{ gap: t.space["1"] }}>
      {typeof children === "string" || typeof children === "number" ? (
        <Text style={textStyle(t)}>{children}</Text>
      ) : (
        children
      )}
      {secondary !== undefined && (
        <Text
          style={[
            textStyle(t, "sm"),
            { color: t.colors["text-secondary-color"] },
          ]}
        >
          {secondary}
        </Text>
      )}
    </View>
  );
}
