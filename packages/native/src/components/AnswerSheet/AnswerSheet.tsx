import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import {
  answerSheetLegend,
  answerSheetSections,
  answerSheetSummary,
  type AnswerSheetItemStatus,
} from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { hitSlopFor, textStyle, weight } from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";

/** Status of an AnswerSheet question */
export type AnswerSheetStatus =
  "unanswered" | "answered" | "correct" | "wrong" | "skipped";

/** Density of an AnswerSheet */
export type AnswerSheetSize = "small" | "medium";

/** "wrap" wraps the pills on several rows; "scroll" keeps a single scrolling row */
export type AnswerSheetLayout = "wrap" | "scroll";

/** A question of an AnswerSheet */
export interface AnswerSheetItem {
  /** Unique key of the question (the value of the sheet) */
  key: string;
  /** Visible label; defaults to its number across all the groups */
  label?: string;
  /**
   * Status of the question
   * @default "unanswered"
   */
  status?: AnswerSheetStatus;
  /** Flags the question for review (a warning dot in a corner) */
  flagged?: boolean;
  /** The question can't be selected */
  disabled?: boolean;
  /** Key of its group; items without a known group render first, untitled */
  group?: string;
}

/** A titled section of an AnswerSheet */
export interface AnswerSheetGroup {
  /** Key matched by `item.group` */
  key: string;
  /** Visible title */
  title: string;
}

export interface AnswerSheetProps extends Omit<
  ViewProps,
  "style" | "children"
> {
  /** The questions, in order */
  items: readonly AnswerSheetItem[];
  /** Titled sections, in display order (items render under the group whose key matches `item.group`) */
  groups?: readonly AnswerSheetGroup[];
  /** Key of the current question (controlled; pair with onChange) */
  value?: string;
  /** Key of the initially current question (uncontrolled) */
  defaultValue?: string;
  /** Called with the key of the selected question */
  onChange?: (key: string) => void;
  /**
   * Density of the pills
   * @default "medium"
   */
  size?: AnswerSheetSize;
  /**
   * "wrap" wraps the pills on several rows; "scroll" keeps a single
   * horizontally scrolling row
   * @default "wrap"
   */
  layout?: AnswerSheetLayout;
  /** Fixed number of columns (equal-width pills); ignored with layout="scroll" */
  columns?: number;
  /**
   * Shows a legend of the statuses present (and of the flag)
   * @default false
   */
  showLegend?: boolean;
  /**
   * Shows the number of answered questions ("12 / 20 answered")
   * @default false
   */
  showSummary?: boolean;
  /** Accessible name of a pill; receives the item and its display index @default "Question <n>, <status>" (translated) */
  getItemLabel?: (item: AnswerSheetItem, index: number) => string;
  /**
   * Disables the whole sheet
   * @default false
   */
  disabled?: boolean;
  /** Style of the sheet */
  style?: StyleProp<ViewStyle>;
}

const PILL = { small: 28, medium: 32 } as const;

type PillLayout = (key: string) => (event: LayoutChangeEvent) => void;

/**
 * layout="scroll": a full-width horizontal ScrollView that centers the
 * current pill (when it holds it) once laid out, and again when the value
 * or the row's size change; the user's own scrolling is kept otherwise.
 */
function ScrollRow({
  current,
  gap,
  children,
}: {
  current: string | undefined;
  gap: number;
  children: (onPillLayout: PillLayout) => ReactNode;
}) {
  const scroller = useRef<ScrollView>(null);
  const boxes = useRef(new Map<string, { x: number; width: number }>());
  const [viewWidth, setViewWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  // bumped when the current pill gets (re)measured
  const [measured, setMeasured] = useState(0);

  useEffect(() => {
    const box = current ? boxes.current.get(current) : undefined;
    if (!box || !viewWidth) return;
    const max = Math.max(0, contentWidth - viewWidth);
    const x = Math.min(
      max,
      Math.max(0, Math.round(box.x + box.width / 2 - viewWidth / 2)),
    );
    scroller.current?.scrollTo({ x, animated: false });
  }, [current, viewWidth, contentWidth, measured]);

  const onPillLayout: PillLayout = (key) => (event) => {
    const { x, width } = event.nativeEvent.layout;
    const previous = boxes.current.get(key);
    if (previous?.x === x && previous.width === width) return;
    boxes.current.set(key, { x, width });
    if (key === current) setMeasured((n) => n + 1);
  };

  return (
    <ScrollView
      ref={scroller}
      horizontal
      showsHorizontalScrollIndicator={false}
      onLayout={(event) => setViewWidth(event.nativeEvent.layout.width)}
      onContentSizeChange={(width) => setContentWidth(width)}
      // padding (not clipping) keeps the flag dots visible; the negative
      // margin keeps the pills aligned with the rest of the sheet
      contentContainerStyle={{ flexDirection: "row", gap, padding: 3 }}
      style={{ margin: -3 }}
      {...part("answer-sheet", "grid")}
    >
      {children(onPillLayout)}
    </ScrollView>
  );
}

/**
 * A grid of numbered pills to jump between the questions of a practice or
 * exam session, grouped by section, each with a status (unanswered,
 * answered, correct, wrong, skipped) and an optional flag (a warning dot).
 * Pills are buttons (the current one is selected); rows wrap, or scroll
 * horizontally with layout="scroll" (centering the current pill). No
 * arrow-key roving focus on native: screen readers move pill by pill.
 */
export function AnswerSheet({
  items,
  groups,
  value,
  defaultValue,
  onChange,
  size = "medium",
  layout = "wrap",
  columns,
  showLegend = false,
  showSummary = false,
  getItemLabel,
  disabled = false,
  style,
  accessibilityLabel,
  ...rest
}: AnswerSheetProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const [current, setCurrent] = useControllable<string | undefined>(
    value,
    defaultValue,
    (next) => {
      if (next !== undefined) onChange?.(next);
    },
  );
  const sections = answerSheetSections(items, groups);
  const legend = showLegend ? answerSheetLegend(items) : [];
  const sans = fonts.sans;
  const pill = PILL[size];
  const gap = size === "small" ? t.space["1-5"] : t.space["2"];
  const cols =
    layout === "wrap" && columns && columns > 0 ? Math.floor(columns) : 0;

  const palette = (status: AnswerSheetItemStatus) => {
    switch (status) {
      case "answered":
        return {
          background: t.colors["primary-color-subtle"],
          color: t.colors["primary-color-text"],
        };
      case "correct":
        return {
          background: t.colors["success-color-subtle"],
          color: t.colors["success-color-text"],
        };
      case "wrong":
        return {
          background: t.colors["danger-color-subtle"],
          color: t.colors["danger-color-text"],
        };
      case "skipped":
        return {
          background: "transparent",
          color: t.colors["text-muted-color"],
        };
      default:
        return {
          background: t.colors["surface-muted-color"],
          color: t.colors["text-secondary-color"],
        };
    }
  };

  const label = (item: AnswerSheetItem, index: number, status: string) =>
    getItemLabel
      ? getItemLabel(item, index)
      : translate(
          item.flagged ? "answerSheet.itemFlagged" : "answerSheet.item",
          {
            number: item.label ?? index + 1,
            status: translate(`answerSheet.status.${status}`),
          },
        );

  const flagDot = (diameter: number) => ({
    width: diameter,
    height: diameter,
    borderRadius: diameter / 2,
    backgroundColor: t.colors["warning-color"],
  });

  const renderPill = (
    item: AnswerSheetItem,
    index: number,
    status: AnswerSheetItemStatus,
    text: string,
    onLayout?: PillLayout,
  ) => {
    const isCurrent = current === item.key;
    const itemDisabled = disabled || !!item.disabled;
    const colors = palette(status);
    return (
      <Pressable
        key={item.key}
        onLayout={onLayout?.(item.key)}
        accessibilityRole="button"
        accessibilityLabel={label(item, index, status)}
        accessibilityState={{ selected: isCurrent, disabled: itemDisabled }}
        aria-current={isCurrent ? "step" : undefined}
        disabled={itemDisabled}
        hitSlop={hitSlopFor(t, pill, pill)}
        onPress={() => setCurrent(item.key)}
        style={({ pressed }) => ({
          minWidth: pill,
          height: pill,
          paddingHorizontal: t.space["1-5"],
          borderRadius: t.radius.md,
          borderWidth: 1,
          borderStyle: status === "skipped" && !isCurrent ? "dashed" : "solid",
          borderColor: isCurrent
            ? t.colors["primary-color"]
            : status === "skipped" || pressed
              ? t.colors["border-strong-color"]
              : "transparent",
          backgroundColor: isCurrent
            ? t.colors["primary-color"]
            : colors.background,
          alignItems: "center",
          justifyContent: "center",
          opacity: itemDisabled ? 0.5 : 1,
          ...(cols ? { width: "100%" as const } : null),
        })}
        {...part("answer-sheet", "item", {
          current: isCurrent,
          disabled: itemDisabled,
          flagged: !!item.flagged,
          status,
        })}
      >
        <Text
          allowFontScaling={false}
          numberOfLines={1}
          style={[
            textStyle(t, size === "small" ? "xs" : "sm", sans),
            {
              color: isCurrent ? t.colors["text-inverse-color"] : colors.color,
              fontWeight: weight(t, "medium"),
              fontVariant: ["tabular-nums"],
            },
          ]}
        >
          {text}
        </Text>
        {item.flagged ? (
          <View
            style={{
              position: "absolute",
              top: -3,
              end: -3,
              borderWidth: 1.5,
              borderColor: t.colors["surface-color"],
              ...flagDot(9),
            }}
            {...part("answer-sheet", "indicator")}
          />
        ) : null}
      </Pressable>
    );
  };

  const renderGrid = (entries: (typeof sections)[number]["entries"]) => {
    if (layout === "scroll") {
      return (
        <ScrollRow current={current} gap={gap}>
          {(onPillLayout) =>
            entries.map(({ item, index, status, label: text }) =>
              renderPill(item, index, status, text, onPillLayout),
            )
          }
        </ScrollRow>
      );
    }
    const pills = entries.map(({ item, index, status, label: text }) =>
      renderPill(item, index, status, text),
    );
    if (cols) {
      // fixed columns: rows of equal-width cells (the last row keeps empty cells)
      const rows: ReactNode[][] = [];
      for (let i = 0; i < pills.length; i += cols) {
        rows.push(pills.slice(i, i + cols));
      }
      return (
        <View style={{ gap }} {...part("answer-sheet", "grid")}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={{ flexDirection: "row", gap }}>
              {Array.from({ length: cols }, (_, col) => (
                <View key={col} style={{ flex: 1, minWidth: 0 }}>
                  {row[col] ?? null}
                </View>
              ))}
            </View>
          ))}
        </View>
      );
    }
    return (
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", gap }}
        {...part("answer-sheet", "grid")}
      >
        {pills}
      </View>
    );
  };

  const muted = { color: t.colors["text-muted-color"] };

  return (
    <View
      role="navigation"
      accessibilityLabel={accessibilityLabel ?? translate("answerSheet.label")}
      {...part("answer-sheet", "root", { disabled, size, layout })}
      {...rest}
      style={[{ gap: size === "small" ? t.space["2"] : t.space["3"] }, style]}
    >
      {showSummary ? (
        <Text
          style={[textStyle(t, "sm", sans), muted]}
          {...part("answer-sheet", "total")}
        >
          {translate("answerSheet.summary", answerSheetSummary(items))}
        </Text>
      ) : null}
      {sections.map((section) => (
        <View
          key={section.key || "-"}
          role={section.title ? "group" : undefined}
          accessibilityLabel={section.title}
          style={{ gap: t.space["2"] }}
          {...part("answer-sheet", "group")}
        >
          {section.title ? (
            <Text
              accessibilityRole="header"
              style={[
                textStyle(t, "xs", sans),
                muted,
                { fontWeight: weight(t, "semibold") },
              ]}
              {...part("answer-sheet", "group-label")}
            >
              {section.title}
            </Text>
          ) : null}
          {renderGrid(section.entries)}
        </View>
      ))}
      {legend.length ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            columnGap: t.space["3"],
            rowGap: t.space["1"],
          }}
          {...part("answer-sheet", "legend")}
        >
          {legend.map((entry) => {
            const colors = entry === "flagged" ? null : palette(entry);
            return (
              <View
                key={entry}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: t.space["1-5"],
                }}
                {...part("answer-sheet", "legend-item")}
              >
                <View
                  style={
                    colors
                      ? {
                          width: 12,
                          height: 12,
                          borderRadius: t.radius.sm,
                          borderWidth: 1,
                          borderStyle: entry === "skipped" ? "dashed" : "solid",
                          borderColor:
                            entry === "skipped"
                              ? t.colors["border-strong-color"]
                              : "transparent",
                          backgroundColor: colors.background,
                        }
                      : flagDot(8)
                  }
                />
                <Text style={[textStyle(t, "xs", sans), muted]}>
                  {translate(`answerSheet.legend.${entry}`)}
                </Text>
              </View>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}
