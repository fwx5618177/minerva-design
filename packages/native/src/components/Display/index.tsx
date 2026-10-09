import { createContext, useContext, type ReactNode } from "react";
import {
  Linking,
  Text,
  View,
  type TextProps,
  type ViewProps,
} from "react-native";
import { sanitizeUrl } from "@minerva/core";
import { useTheme } from "../../theme/MinervaProvider";
import { textStyle } from "../../internal/styles";
import { part } from "../../internal/parts";
export { Loading as LoadingState } from "../Loading";
export { Progress as ProgressIndicator } from "../Progress";
export { Calendar as MonthCalendar } from "../Calendar";
export { Popup as Drawer } from "../Popup";
function Content({
  children,
  secondary = false,
}: {
  children: ReactNode;
  secondary?: boolean;
}) {
  const { tokens: t } = useTheme();
  return typeof children === "string" || typeof children === "number" ? (
    <Text
      style={[
        textStyle(t, secondary ? "sm" : "md"),
        secondary && { color: t.colors["text-secondary-color"] },
      ]}
    >
      {children}
    </Text>
  ) : (
    children
  );
}
export interface DescriptionListItem {
  key: string;
  label: ReactNode;
  value: ReactNode;
}
export interface DescriptionListProps extends ViewProps {
  items: DescriptionListItem[];
  /** @default false */
  bordered?: boolean;
  /** @default false */
  striped?: boolean;
}
export function DescriptionList({
  items,
  bordered = false,
  striped = false,
  style,
  ...props
}: DescriptionListProps) {
  const { tokens: t } = useTheme();
  return (
    <View
      {...part("description-list", "root")}
      {...props}
      style={[
        {
          borderWidth: bordered ? 1 : 0,
          borderColor: t.colors["border-color"],
          borderRadius: t.radius.md,
          overflow: "hidden",
        },
        style,
      ]}
    >
      {items.map((item, index) => (
        <View
          key={item.key}
          style={{
            flexDirection: "row",
            padding: t.space["3"],
            gap: t.space["3"],
            backgroundColor:
              striped && index % 2
                ? t.colors["surface-muted-color"]
                : t.colors["surface-color"],
            borderBottomWidth: !striped && index < items.length - 1 ? 1 : 0,
            borderColor: t.colors["border-color"],
          }}
        >
          <View style={{ flex: 1 }}>
            <Content secondary>{item.label}</Content>
          </View>
          <View style={{ flex: 2 }}>
            <Content>{item.value}</Content>
          </View>
        </View>
      ))}
    </View>
  );
}
export type ListDensity = "default" | "compact" | "comfortable";
const ListContext = createContext({
  density: "default" as ListDensity,
  dividers: true,
});
export interface ListProps extends ViewProps {
  /** @default "default" */
  density?: ListDensity;
  /** @default false */
  bordered?: boolean;
  /** @default true */
  dividers?: boolean;
}
export function List({
  density = "default",
  bordered = false,
  dividers = true,
  style,
  children,
  ...props
}: ListProps) {
  const { tokens: t } = useTheme();
  return (
    <ListContext.Provider value={{ density, dividers }}>
      <View
        {...part("list", "root")}
        {...props}
        role="list"
        style={[
          {
            borderWidth: bordered ? 1 : 0,
            borderColor: t.colors["border-color"],
            borderRadius: t.radius.md,
            overflow: "hidden",
          },
          style,
        ]}
      >
        {children}
      </View>
    </ListContext.Provider>
  );
}
export interface ListItemProps extends ViewProps {
  primary: ReactNode;
  secondary?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
}
export function ListItem({
  primary,
  secondary,
  icon,
  actions,
  style,
  ...props
}: ListItemProps) {
  const { density, dividers } = useContext(ListContext);
  const { tokens: t } = useTheme();
  return (
    <View
      {...part("list-item", "root")}
      {...props}
      role="listitem"
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          minHeight:
            density === "compact" ? 40 : density === "comfortable" ? 72 : 56,
          padding:
            t.space[
              density === "compact"
                ? "2"
                : density === "comfortable"
                  ? "4"
                  : "3"
            ],
          gap: t.space["3"],
          borderBottomWidth: dividers ? 1 : 0,
          borderColor: t.colors["border-color"],
        },
        style,
      ]}
    >
      {icon}
      <View style={{ flex: 1 }}>
        <Content>{primary}</Content>
        {secondary !== undefined && <Content secondary>{secondary}</Content>}
      </View>
      <View style={{ maxWidth: "50%" }}>{actions}</View>
    </View>
  );
}
export interface ProseProps extends TextProps {
  size?: "small" | "medium" | "large";
}
/** Native rich text: nested Text nodes inherit typography, selection and line spacing. */
export function Prose({ size = "medium", style, ...props }: ProseProps) {
  const { tokens: t, fonts } = useTheme();
  return (
    <Text
      selectable
      {...part("prose", "root")}
      {...props}
      style={[
        textStyle(
          t,
          size === "small" ? "sm" : size === "large" ? "lg" : "md",
          fonts.sans,
        ),
        {
          lineHeight:
            t.fontSize[
              size === "large" ? "lg" : size === "small" ? "sm" : "md"
            ] * 1.7,
        },
        style,
      ]}
    />
  );
}
export interface TextLinkProps extends TextProps {
  href?: string;
  /** @default "default" */
  variant?: "default" | "subtle" | "action";
  disabled?: boolean;
  onOpenError?: (error: unknown) => void;
}
export function TextLink({
  href,
  variant = "default",
  disabled = false,
  onPress,
  onOpenError,
  style,
  ...props
}: TextLinkProps) {
  const { tokens: t } = useTheme();
  const safe = sanitizeUrl(href);
  return (
    <Text
      {...part("text-link", "root")}
      {...props}
      accessibilityRole="link"
      accessibilityState={{ disabled: disabled || (!safe && !onPress) }}
      onPress={(event) => {
        if (disabled) return;
        if (onPress) onPress(event);
        else if (safe)
          void Linking.openURL(safe).catch((error) => onOpenError?.(error));
      }}
      style={[
        textStyle(t),
        {
          color: disabled
            ? t.colors["text-disabled-color"]
            : t.colors["primary-color-text"],
          textDecorationLine: variant === "default" ? "underline" : "none",
          paddingVertical: variant === "action" ? t.space["3"] : undefined,
        },
        style,
      ]}
    />
  );
}
