import { cn } from "../../utils/cn";
import type { StepsProps } from "./types";
import styles from "./steps.module.scss";
import useI18n from "../../hooks/useI18n";
import { useControllableState } from "../../internal/useControllableState";

/**
 * Steps: the stages of a workflow as an ordered list (<ol> / <li>). Earlier
 * steps are marked complete and the current one with aria-current="step".
 * When navigable, each step is a native button inside its list item (the
 * current button carries aria-current), so moving between steps works with
 * the keyboard. Without onChange (or with readOnly) the steps are a plain
 * read-only progress indicator: no buttons, aria-current sits on the <li>.
 */
const Steps = ({
  items,
  value,
  defaultValue,
  onChange,
  readOnly = onChange === undefined,
  "aria-label": ariaLabel,
  className,
  ref,
  ...rest
}: StepsProps) => {
  const { t } = useI18n();
  // "" matches no step: nothing is current until a value is given
  const [current, setCurrent] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? "",
    onChange,
  });
  const currentIndex = items.findIndex((item) => item.value === current);

  return (
    <ol
      aria-label={ariaLabel ?? t("steps.label")}
      {...rest}
      ref={ref}
      className={cn(styles.steps, className)}
    >
      {items.map((item, index) => {
        const isCurrent = index === currentIndex;
        const isComplete = currentIndex > -1 && index < currentIndex;
        const content = (
          <>
            <span className={styles.number} aria-hidden="true">
              {index + 1}
            </span>
            <span className={styles.label}>{item.label}</span>
          </>
        );
        return (
          <li
            key={item.value}
            className={cn(styles.step, {
              [styles.current]: isCurrent,
              [styles.complete]: isComplete,
            })}
            aria-current={readOnly && isCurrent ? "step" : undefined}
          >
            {readOnly ? (
              <span className={cn(styles.button, styles.static)}>
                {content}
              </span>
            ) : (
              <button
                type="button"
                className={styles.button}
                disabled={item.disabled}
                aria-current={isCurrent ? "step" : undefined}
                onClick={() => {
                  if (!isCurrent) setCurrent(item.value);
                }}
              >
                {content}
              </button>
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default Steps;
