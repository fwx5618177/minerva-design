import { useMemo, useState, type ReactNode } from "react";
import { Linking, Pressable, Text, View, type ViewProps } from "react-native";
import { sanitizeUrl } from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { textStyle } from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";
export interface NavTreeItem {
  id: string;
  label: string;
  description?: string;
  href?: string;
  icon?: ReactNode;
  endContent?: ReactNode;
  disabled?: boolean;
  children?: NavTreeItem[];
}
export interface NavTreeSection {
  id: string;
  title?: string;
  items: NavTreeItem[];
}
export interface NavTreeProps extends ViewProps {
  sections: NavTreeSection[];
  activeId?: string;
  /** @default false */
  collapsed?: boolean;
  /** @default false */
  wrapLabels?: boolean;
  defaultExpandedIds?: string[];
  expandedIds?: string[];
  onExpandedChange?: (ids: string[]) => void;
  onItemSelect?: (item: NavTreeItem) => void;
  onOpenError?: (error: unknown) => void;
}
export function NavTree({
  sections,
  activeId,
  collapsed = false,
  wrapLabels = false,
  defaultExpandedIds = [],
  expandedIds,
  onExpandedChange,
  onItemSelect,
  onOpenError,
  ...props
}: NavTreeProps) {
  const { tokens: t } = useTheme();
  const { t: translate } = useI18n();
  const [expanded, setExpanded] = useControllable(
    expandedIds,
    defaultExpandedIds,
    onExpandedChange,
  );
  const ancestors = useMemo(() => {
    const found: string[] = [];
    const visit = (items: NavTreeItem[], path: string[]) => {
      for (const item of items) {
        if (item.id === activeId) found.push(...path);
        if (item.children) visit(item.children, [...path, item.id]);
      }
    };
    for (const section of sections) visit(section.items, []);
    return found;
  }, [sections, activeId]);
  const [closedBranches, setClosedBranches] = useState<{
    route: string | undefined;
    ids: string[];
  }>({ route: activeId, ids: [] });
  const closed = closedBranches.route === activeId ? closedBranches.ids : [];
  const render = (items: NavTreeItem[], depth = 0): ReactNode =>
    items.map((item) => {
      const branch = !!item.children?.length;
      const open =
        expanded.includes(item.id) ||
        (expandedIds === undefined &&
          ancestors.includes(item.id) &&
          !closed.includes(item.id));
      return (
        <View key={item.id}>
          <Pressable
            accessibilityRole={item.href && !branch ? "link" : "button"}
            accessibilityLabel={item.label}
            accessibilityState={{
              disabled: item.disabled,
              selected: item.id === activeId,
              expanded: branch ? open : undefined,
            }}
            disabled={item.disabled}
            onPress={() => {
              if (branch) {
                setClosedBranches({
                  route: activeId,
                  ids: open
                    ? [...closed, item.id]
                    : closed.filter((id) => id !== item.id),
                });
                setExpanded(
                  open
                    ? expanded.filter((id) => id !== item.id)
                    : [...expanded, item.id],
                );
              }
              onItemSelect?.(item);
              const href = sanitizeUrl(item.href);
              if (!branch && href && !onItemSelect)
                void Linking.openURL(href).catch((error) =>
                  onOpenError?.(error),
                );
            }}
            style={({ pressed }) => ({
              minHeight: t.touchTargetMin,
              padding: t.space["3"],
              paddingLeft: t.space["3"] + depth * t.space["4"],
              flexDirection: "row",
              alignItems: "center",
              gap: t.space["2"],
              opacity: item.disabled ? 0.5 : 1,
              backgroundColor:
                item.id === activeId
                  ? t.colors["primary-color-subtle"]
                  : pressed
                    ? t.colors["surface-muted-color"]
                    : undefined,
            })}
          >
            {item.icon ??
              (collapsed ? (
                <Text style={textStyle(t)}>
                  {Array.from(item.label.trim())[0] ?? "•"}
                </Text>
              ) : null)}
            {!collapsed && (
              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={wrapLabels ? undefined : 1}
                  style={textStyle(t)}
                >
                  {item.label}
                </Text>
                {Boolean(item.description) && depth === 0 && (
                  <Text style={textStyle(t, "sm")}>{item.description}</Text>
                )}
              </View>
            )}
            {!collapsed && item.endContent}
            {branch && <Text style={textStyle(t)}>{open ? "−" : "+"}</Text>}
          </Pressable>
          {branch && open && !collapsed && render(item.children!, depth + 1)}
        </View>
      );
    });
  return (
    <View
      {...props}
      accessibilityLabel={
        props.accessibilityLabel ?? translate("navTree.label")
      }
    >
      {sections.map((section) => (
        <View key={section.id}>
          {Boolean(section.title) && !collapsed && (
            <Text
              accessibilityRole="header"
              style={[
                textStyle(t, "sm"),
                { padding: t.space["3"], fontWeight: "600" },
              ]}
            >
              {section.title}
            </Text>
          )}
          {render(section.items)}
        </View>
      ))}
    </View>
  );
}
