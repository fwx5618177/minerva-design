import { useEffect, useId, useState, type CSSProperties } from "react";
import Taro from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import {
  answerSheetLegend,
  answerSheetSections,
  answerSheetSummary,
  cn,
} from "@minerva/core";
import { useH5List } from "./h5";
import { useI18n } from "./theme";
import { Part, useValue, type NativeProps } from "./shared";

/** Status of an AnswerSheet question */
export type AnswerSheetStatus =
  "unanswered" | "answered" | "correct" | "wrong" | "skipped";
/** A question of an AnswerSheet */
export interface AnswerSheetItem {
  /** Unique key of the question (the value of the sheet) */
  key: string;
  /** Visible label (default: its number across all the groups) */
  label?: string;
  /** Status of the question (default "unanswered") */
  status?: AnswerSheetStatus;
  /** Flags the question for review (a warning dot) */
  flagged?: boolean;
  /** The question can't be selected */
  disabled?: boolean;
  /** Key of its group; items without a known group render first, untitled */
  group?: string;
}
/** A titled section of an AnswerSheet */
export interface AnswerSheetGroup {
  key: string;
  title: string;
}
export interface AnswerSheetProps extends Omit<NativeProps, "children"> {
  /** The questions, in order */
  items: readonly AnswerSheetItem[];
  /** Titled sections, in display order */
  groups?: readonly AnswerSheetGroup[];
  /** Key of the current question (controlled) */
  value?: string;
  /** Key of the initially current question (uncontrolled) */
  defaultValue?: string;
  /** Called with the key of the selected question */
  onChange?: (key: string) => void;
  /** Density of the pills (default "medium") */
  size?: "small" | "medium";
  /** "wrap" (default) or "scroll" (a single horizontally scrolling row) */
  layout?: "wrap" | "scroll";
  /** Fixed number of columns; ignored with layout="scroll" */
  columns?: number;
  /** Shows a legend of the statuses present (default false) */
  showLegend?: boolean;
  /** Shows "12 / 20 answered" (default false) */
  showSummary?: boolean;
  /** Accessible name of a pill (default "Question <n>, <status>", translated) */
  getItemLabel?: (item: AnswerSheetItem, index: number) => string;
  /** Disables the whole sheet (default false) */
  disabled?: boolean;
}
/**
 * A grid of numbered pills to jump between the questions of a practice or
 * exam session (a navigation landmark of buttons), grouped by section, each
 * with a status and an optional flag; the current question carries
 * aria-current="step". Tap selects; on H5, arrows / Home / End move the
 * focus and Enter / Space select. With layout="scroll", each section is a
 * horizontal ScrollView whose `scrollLeft` centers the current pill
 * (measured with createSelectorQuery) when the value changes.
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
  "aria-label": ariaLabel,
  ...props
}: AnswerSheetProps) {
  const { t } = useI18n();
  const [current, set] = useValue<string | undefined>(
    value,
    defaultValue,
    (next) => {
      if (next !== undefined) onChange?.(next);
    },
  );
  const generatedId = useId();
  const sheetId =
    props.id ?? `mn-answer-sheet-${generatedId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  useH5List(sheetId, {
    selector: ".mn-answer-sheet__item",
    orientation: "horizontal",
    loop: false,
  });
  const sections = answerSheetSections(items, groups);
  const legend = showLegend ? answerSheetLegend(items) : [];
  const cols =
    layout === "wrap" && columns && columns > 0 ? Math.floor(columns) : 0;
  const gridStyle: CSSProperties | undefined = cols
    ? { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }
    : undefined;
  const rowId = (sectionIndex: number) => `${sheetId}-row-${sectionIndex}`;
  const pillId = (index: number) => `${sheetId}-q-${index}`;
  const currentRow = sections.findIndex((section) =>
    section.entries.some((entry) => entry.item.key === current),
  );
  const currentIndex =
    currentRow < 0
      ? -1
      : sections[currentRow].entries.find(
          (entry) => entry.item.key === current,
        )!.index;
  // layout="scroll": the scrollLeft of the row holding the current pill.
  // Never scroll-into-view: on H5 it scrolls the whole page too.
  const [scroll, setScroll] = useState({ row: -1, left: 0 });
  useEffect(() => {
    if (layout !== "scroll" || currentIndex < 0) return;
    let cancelled = false;
    void Taro.nextTick(() => {
      const query = Taro.createSelectorQuery?.();
      if (cancelled || !query) return;
      type Rect = { left: number; width: number } | null;
      let view: Rect = null,
        pill: Rect = null,
        offset: { scrollLeft: number; scrollWidth?: number } | null = null;
      const row = `#${rowId(currentRow)}`;
      query
        .select(row)
        .boundingClientRect((rect) => {
          view = rect as Rect;
        })
        .select(row)
        .scrollOffset((result) => {
          offset = result as typeof offset;
        })
        .select(`#${pillId(currentIndex)}`)
        .boundingClientRect((rect) => {
          pill = rect as Rect;
        })
        .exec(() => {
          const box = view as Rect,
            target = pill as Rect,
            scrolled = offset as typeof offset;
          if (cancelled || !box?.width || !target) return;
          const actual = scrolled?.scrollLeft ?? 0;
          const max = scrolled?.scrollWidth
            ? Math.max(0, scrolled.scrollWidth - box.width)
            : Infinity;
          const left = Math.min(
            max,
            Math.max(
              0,
              Math.round(
                actual +
                  target.left +
                  target.width / 2 -
                  (box.left + box.width / 2),
              ),
            ),
          );
          if (Math.abs(left - actual) < 1) return;
          // the same value again (the user scrolled since) must still apply
          setScroll((previous) => ({
            row: currentRow,
            left:
              previous.row === currentRow && previous.left === left
                ? left + 0.01
                : left,
          }));
        });
    });
    return () => {
      cancelled = true;
    };
  }, [layout, current, currentRow, currentIndex, sheetId]);
  return (
    <Part
      name="answer-sheet"
      role="navigation"
      {...props}
      id={sheetId}
      aria-label={ariaLabel ?? t("answerSheet.label")}
      className={cn(
        `mn-size-${size}`,
        `mn-layout-${layout}`,
        disabled && "mn-disabled",
        props.className,
      )}
    >
      {showSummary && (
        <Text className="mn-answer-sheet__summary" data-part="total">
          {t("answerSheet.summary", answerSheetSummary(items))}
        </Text>
      )}
      {sections.map((section, sectionIndex) => {
        const titleId = section.title
          ? `${sheetId}-group-${sectionIndex}`
          : undefined;
        const grid = (
          <View
            className={cn("mn-answer-sheet__grid", cols && "mn-columns")}
            data-part="grid"
            style={gridStyle}
          >
            {section.entries.map(({ item, index, status, label }) => {
              const isCurrent = current === item.key;
              const itemDisabled = disabled || !!item.disabled;
              return (
                <View
                  key={item.key}
                  id={pillId(index)}
                  {...{ role: "button" }}
                  data-key={item.key}
                  data-part="item"
                  aria-current={isCurrent ? "step" : undefined}
                  aria-disabled={itemDisabled || undefined}
                  aria-label={
                    getItemLabel?.(item, index) ??
                    t(
                      item.flagged
                        ? "answerSheet.itemFlagged"
                        : "answerSheet.item",
                      {
                        number: item.label ?? index + 1,
                        status: t(`answerSheet.status.${status}`),
                      },
                    )
                  }
                  className={cn(
                    "mn-answer-sheet__item",
                    `mn-status-${status}`,
                    isCurrent && "mn-current",
                    item.flagged && "mn-flagged",
                    itemDisabled && "mn-disabled",
                  )}
                  onClick={() => {
                    if (!itemDisabled) set(item.key);
                  }}
                >
                  <Text aria-hidden>{label}</Text>
                  {item.flagged && (
                    <View
                      aria-hidden
                      className="mn-answer-sheet__flag"
                      data-part="indicator"
                    />
                  )}
                </View>
              );
            })}
          </View>
        );
        return (
          <View
            key={section.key || "-"}
            className="mn-answer-sheet__section"
            data-part="group"
            {...{ role: titleId ? "group" : undefined }}
            aria-labelledby={titleId}
          >
            {titleId && (
              <Text
                id={titleId}
                className="mn-answer-sheet__title"
                data-part="group-label"
              >
                {section.title}
              </Text>
            )}
            {layout === "scroll" ? (
              <ScrollView
                id={rowId(sectionIndex)}
                className="mn-answer-sheet__scroller"
                scrollX
                showScrollbar={false}
                scrollLeft={
                  scroll.row === sectionIndex ? scroll.left : undefined
                }
              >
                {grid}
              </ScrollView>
            ) : (
              grid
            )}
          </View>
        );
      })}
      {legend.length > 0 && (
        <View
          className="mn-answer-sheet__legend"
          data-part="legend"
          {...{ role: "list" }}
        >
          {legend.map((entry) => (
            <View
              key={entry}
              className="mn-answer-sheet__legend-item"
              data-part="legend-item"
              {...{ role: "listitem" }}
            >
              <View
                aria-hidden
                className={cn("mn-answer-sheet__swatch", `mn-status-${entry}`)}
              />
              <Text>{t(`answerSheet.legend.${entry}`)}</Text>
            </View>
          ))}
        </View>
      )}
    </Part>
  );
}
