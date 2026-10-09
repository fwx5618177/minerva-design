import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../theme/MinervaProvider";
import { colorRole, textStyle, type NativeColor } from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";
import type { ButtonProps } from "../Button";
export interface TooltipRef {
  open: () => void;
  close: () => void;
  toggle: () => void;
}
export interface TooltipProviderProps {
  children?: ReactNode;
  enterDelay?: number;
  leaveDelay?: number;
}
const Delays = createContext({ enterDelay: 200, leaveDelay: 0 });
export function TooltipProvider({
  children,
  enterDelay = 200,
  leaveDelay = 0,
}: TooltipProviderProps) {
  return (
    <Delays.Provider value={{ enterDelay, leaveDelay }}>
      {children}
    </Delays.Provider>
  );
}
export interface TooltipProps {
  children: ReactElement<ButtonProps>;
  content: ReactNode;
  open?: boolean;
  /** @default false */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** @default false */
  disabled?: boolean;
  /** @default "neutral" */
  color?: Exclude<NativeColor, "primary">;
  /** @default "solid" */
  variant?: "solid" | "subtle" | "glass";
  /** @default "default" */
  shape?: "default" | "rounded" | "square";
  /** @default 200 */
  enterDelay?: number;
  /** @default 0 */
  leaveDelay?: number;
  onOpen?: () => void;
  onClose?: () => void;
  ref?: Ref<TooltipRef>;
}
/** Long press or accessibility focus reveals help; another tap dismisses it. */
export function Tooltip({
  children,
  content,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  color = "neutral",
  variant = "solid",
  shape = "default",
  enterDelay,
  leaveDelay,
  onOpen,
  onClose,
  ref,
}: TooltipProps) {
  const { tokens: t } = useTheme();
  const delays = useContext(Delays);
  const [shown, setShown] = useControllable(open, defaultOpen, onOpenChange);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const clear = () => {
    clearTimeout(timer.current);
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  const change = (next: boolean) => {
    clear();
    if (next && disabled) return;
    setShown(next);
    if (next) onOpen?.();
    else onClose?.();
  };
  const schedule = (next: boolean) => {
    clear();
    timer.current = setTimeout(
      () => change(next),
      next
        ? (enterDelay ?? delays.enterDelay)
        : (leaveDelay ?? delays.leaveDelay),
    );
  };
  useImperativeHandle(ref, () => ({
    open: () => change(true),
    close: () => change(false),
    toggle: () => change(!shown),
  }));
  const role = colorRole(t, color);
  const solid = variant === "solid";
  return (
    <View>
      {/* eslint-disable-next-line react-hooks/refs -- cloneElement stores these event handlers; timer refs are read only when an event runs. */}
      {cloneElement(children, {
        accessibilityHint:
          [
            children.props.accessibilityHint,
            typeof content === "string" ? content : undefined,
          ]
            .filter(Boolean)
            .join(". ") || undefined,
        onLongPress: (event) => {
          children.props.onLongPress?.(event);
          change(true);
        },
        onPress: (event) => {
          children.props.onPress?.(event);
          change(false);
        },
        onFocus: (event) => {
          children.props.onFocus?.(event);
          schedule(true);
        },
        onBlur: (event) => {
          children.props.onBlur?.(event);
          schedule(false);
        },
        onHoverIn: (event) => {
          children.props.onHoverIn?.(event);
          schedule(true);
        },
        onHoverOut: (event) => {
          children.props.onHoverOut?.(event);
          schedule(false);
        },
      })}
      {shown && !disabled && (
        <View
          accessibilityLiveRegion="polite"
          style={{
            alignSelf: "flex-start",
            marginTop: t.space["1"],
            padding: t.space["3"],
            borderRadius:
              shape === "square"
                ? 0
                : shape === "rounded"
                  ? t.radius.full
                  : t.radius.md,
            borderWidth: 1,
            borderColor: role.border,
            backgroundColor: solid
              ? role.solid
              : variant === "glass"
                ? t.colors["surface-color"]
                : role.subtle,
          }}
        >
          {typeof content === "string" || typeof content === "number" ? (
            <Text
              style={[
                textStyle(t, "sm"),
                { color: solid ? role.onSolid : role.text },
              ]}
            >
              {content}
            </Text>
          ) : (
            content
          )}
        </View>
      )}
    </View>
  );
}
