import { createContext, useContext, type ReactNode } from "react";
import { Platform, ScrollView, View, type ViewProps } from "react-native";
import { Button } from "../Button";
import { useTheme } from "../../theme/MinervaProvider";
interface WebTabElement {
  getAttribute(name: string): string | null;
  contains(target: unknown): boolean;
  focus(): void;
  click(): void;
}
interface WebTabListEvent {
  key: string;
  currentTarget: {
    querySelectorAll(selector: string): ArrayLike<WebTabElement>;
  };
  target: unknown;
  preventDefault(): void;
}
const Active = createContext("");
export interface PageTabsProps extends ViewProps {
  activeValue: string;
  children: ReactNode;
  actions?: ReactNode;
}
export function PageTabs({
  activeValue,
  children,
  actions,
  style,
  ...props
}: PageTabsProps) {
  return (
    <Active.Provider value={activeValue}>
      <View
        {...props}
        style={[{ flexDirection: "row", alignItems: "center" }, style]}
      >
        <ScrollView
          horizontal
          role="tablist"
          {...(Platform.OS === "web"
            ? {
                onKeyDown: (event: WebTabListEvent) => {
                  if (
                    !["ArrowRight", "ArrowLeft", "Home", "End"].includes(
                      event.key,
                    )
                  )
                    return;
                  const tabs = Array.from(
                    event.currentTarget.querySelectorAll('[role="tab"]'),
                  ).filter(
                    (tab) => tab.getAttribute("aria-disabled") !== "true",
                  );
                  const index = tabs.findIndex(
                    (tab) => tab === event.target || tab.contains(event.target),
                  );
                  if (index < 0 || !tabs.length) return;
                  const next =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? tabs.length - 1
                        : (index +
                            (event.key === "ArrowRight" ? 1 : -1) +
                            tabs.length) %
                          tabs.length;
                  event.preventDefault();
                  tabs[next].focus();
                  tabs[next].click();
                },
              }
            : {})}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexDirection: "row" }}
        >
          {children}
        </ScrollView>
        {actions}
      </View>
    </Active.Provider>
  );
}
export interface PageTabProps extends Omit<ViewProps, "onSelect"> {
  value: string;
  label: string;
  /** Inferred from PageTabs when provided, otherwise false. @default false */
  active?: boolean;
  /** @default false */
  disabled?: boolean;
  icon?: ReactNode;
  action?: ReactNode;
  onSelect?: () => void;
}
export function PageTab({
  value,
  label,
  active,
  disabled,
  icon,
  action,
  onSelect,
  style,
  ...props
}: PageTabProps) {
  const current = useContext(Active);
  const selected = active ?? current === value;
  const { tokens: t } = useTheme();
  return (
    <View
      {...props}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 2,
          borderBottomColor: selected
            ? t.colors["primary-color"]
            : "transparent",
        },
        style,
      ]}
    >
      <Button
        variant="ghost"
        active={selected}
        disabled={disabled}
        accessibilityRole="tab"
        tabIndex={selected && !disabled ? 0 : -1}
        accessibilityState={{ selected }}
        startIcon={icon}
        onPress={onSelect}
      >
        {label}
      </Button>
      {action}
    </View>
  );
}
