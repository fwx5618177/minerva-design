import React, { useEffect, useId, useRef, useState } from "react";
import {
  answerSheetLegend,
  answerSheetMoveIndex,
  answerSheetSections,
  answerSheetSummary,
  type AnswerSheetMove,
} from "@minerva/core";
import { centerInScroller, nearestInRow } from "@minerva/dom";
import { cn } from "../../utils/cn";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import useI18n from "../../hooks/useI18n";
import { logicalArrowKey } from "../../internal/direction";
import { hooks } from "../../internal/stylingHooks";
import styles from "./answerSheet.module.scss";
import type { AnswerSheetItem, AnswerSheetProps } from "./types";

const KEY_MOVES: Record<string, AnswerSheetMove> = {
  ArrowLeft: "previous",
  ArrowRight: "next",
  ArrowUp: "up",
  ArrowDown: "down",
  Home: "first",
  End: "last",
};

/**
 * AnswerSheet: a grid of numbered pills to jump between the questions of a
 * practice or exam session (a `nav` landmark of buttons), grouped by
 * section, each with a status (unanswered, answered, correct, wrong,
 * skipped) and an optional flag. The current question carries
 * `aria-current="step"`. Keyboard: a roving tab stop; ArrowLeft /
 * ArrowRight move in order, ArrowUp / ArrowDown by a row, Home / End to the
 * ends, Enter / Space select.
 */
const AnswerSheet = ({
  items,
  groups,
  value: valueProp,
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
  className,
  ref,
}: AnswerSheetProps) => {
  const { t } = useI18n();
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("AnswerSheet", {
      prop: "value",
      value: valueProp,
      defaultProp: "defaultValue",
      defaultValue,
      handlerProp: "onChange",
      handler: onChange,
      locked: disabled,
      lockHint: "set `disabled`",
    });
  }
  const [value, setValue] = useControllableState<string | undefined>({
    value: valueProp,
    defaultValue,
    onChange: (next) => {
      if (next !== undefined) onChange?.(next);
    },
    name: "AnswerSheet",
  });
  const baseId = useId();
  const [focusedKey, setFocusedKey] = useState("");
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const pendingFocus = useRef<string | null>(null);

  const sections = answerSheetSections(items, groups);
  const entries = sections.flatMap((section) => section.entries);
  const keys = entries.map((entry) => entry.item.key);
  const activeKey =
    [focusedKey, value].find((key) => key && keys.includes(key)) ?? keys[0];
  const gridColumns =
    layout === "wrap" && columns && columns > 0
      ? Math.floor(columns)
      : undefined;

  useEffect(() => {
    if (!pendingFocus.current) return;
    const button = buttons.current.get(pendingFocus.current);
    pendingFocus.current = null;
    button?.focus();
  }, [focusedKey]);

  // layout="scroll": keep the current pill in view (scrolling the row only)
  const currentInList = value !== undefined && keys.includes(value);
  useEffect(() => {
    if (layout !== "scroll" || !currentInList || value === undefined) return;
    const button = buttons.current.get(value);
    if (button?.parentElement) centerInScroller(button.parentElement, button);
  }, [layout, value, currentInList]);

  const select = (item: AnswerSheetItem) => {
    if (disabled || item.disabled) return;
    setValue(item.key);
  };

  const focusKey = (key: string) => {
    pendingFocus.current = key;
    setFocusedKey(key);
    if (key === focusedKey) buttons.current.get(key)?.focus();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    item: AnswerSheetItem,
    index: number,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!event.repeat) select(item);
      return;
    }
    // RTL: the rows run right to left, so ArrowLeft is the next question.
    const move = KEY_MOVES[logicalArrowKey(event.key, event.currentTarget)];
    if (!move) return;
    event.preventDefault();
    let target: string | undefined;
    if ((move === "up" || move === "down") && !gridColumns) {
      // wrapping rows: the closest pill of the row above / below (measured)
      if (layout === "scroll") return;
      const ordered = keys
        .map((key) => buttons.current.get(key))
        .filter((button): button is HTMLButtonElement => !!button);
      target = nearestInRow(
        ordered,
        event.currentTarget,
        move === "down" ? 1 : -1,
      )?.dataset.key;
    } else {
      const next = answerSheetMoveIndex(sections, index, move, gridColumns);
      if (next !== null) target = keys[next];
    }
    if (target) focusKey(target);
  };

  const itemLabel = (item: AnswerSheetItem, index: number, status: string) => {
    if (getItemLabel) return getItemLabel(item, index);
    return t(item.flagged ? "answerSheet.itemFlagged" : "answerSheet.item", {
      number: item.label ?? index + 1,
      status: t(`answerSheet.status.${status}`),
    });
  };

  const summary = answerSheetSummary(items);
  const legend = showLegend ? answerSheetLegend(items) : [];

  return (
    <nav
      ref={ref}
      aria-label={ariaLabel ?? t("answerSheet.label")}
      className={cn(
        styles.answerSheet,
        styles[size],
        layout === "scroll" && styles.scroll,
        className,
      )}
      {...hooks("answer-sheet", "root", { disabled, size, layout })}
    >
      {showSummary ? (
        <p className={styles.summary} {...hooks("answer-sheet", "total")}>
          {t("answerSheet.summary", summary)}
        </p>
      ) : null}
      {sections.map((section, sectionIndex) => {
        const titleId = section.title
          ? `${baseId}-group-${sectionIndex}`
          : undefined;
        return (
          <div
            key={section.key || "-"}
            className={styles.section}
            role={section.title ? "group" : undefined}
            aria-labelledby={titleId}
            {...hooks("answer-sheet", "group")}
          >
            {section.title ? (
              <div
                id={titleId}
                className={styles.sectionTitle}
                {...hooks("answer-sheet", "group-label")}
              >
                {section.title}
              </div>
            ) : null}
            <div
              className={cn(styles.grid, gridColumns && styles.columns)}
              style={
                gridColumns
                  ? {
                      gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
                    }
                  : undefined
              }
              {...hooks("answer-sheet", "grid")}
            >
              {section.entries.map(({ item, index, status, label }) => {
                const current = value === item.key;
                const itemDisabled = disabled || !!item.disabled;
                return (
                  <button
                    type="button"
                    key={item.key}
                    ref={(element) => {
                      if (element) buttons.current.set(item.key, element);
                      else buttons.current.delete(item.key);
                    }}
                    className={cn(styles.item, styles[status])}
                    {...hooks("answer-sheet", "item", {
                      current,
                      disabled: itemDisabled,
                      flagged: !!item.flagged,
                      status,
                    })}
                    data-key={item.key}
                    aria-label={itemLabel(item, index, status)}
                    aria-current={current ? "step" : undefined}
                    aria-disabled={itemDisabled || undefined}
                    tabIndex={item.key === activeKey ? 0 : -1}
                    onFocus={() => setFocusedKey(item.key)}
                    onClick={() => select(item)}
                    onKeyDown={(event) => handleKeyDown(event, item, index)}
                  >
                    {label}
                    {item.flagged ? (
                      <span
                        className={styles.flag}
                        aria-hidden
                        {...hooks("answer-sheet", "indicator")}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      {legend.length ? (
        <ul className={styles.legend} {...hooks("answer-sheet", "legend")}>
          {legend.map((entry) => (
            <li
              key={entry}
              className={styles.legendItem}
              {...hooks("answer-sheet", "legend-item")}
            >
              <span className={cn(styles.swatch, styles[entry])} aria-hidden />
              {t(`answerSheet.legend.${entry}`)}
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  );
};

export { AnswerSheet };
export default AnswerSheet;
