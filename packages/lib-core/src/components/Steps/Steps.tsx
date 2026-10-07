import classNames from "classnames";
import type { StepsProps } from "./types";
import styles from "./steps.module.scss";
import useI18n from "../../hooks/useI18n";
import { useControllableState } from "../../internal/useControllableState";

/**
 * Steps: the stages of a workflow as an ordered list. Earlier steps are
 * marked complete and the current one with aria-current="step". Each step is
 * a native button, so navigating between steps works with the keyboard;
 * without onChange the steps are a read-only progress indicator.
 */
const Steps = ({
  items,
  value,
  defaultValue,
  onChange,
  readOnly = onChange === undefined,
  ariaLabel,
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
      className={classNames(styles.steps, "ui-steps", className)}
    >
      {items.map((item, index) => {
        const isCurrent = index === currentIndex;
        const isComplete = currentIndex > -1 && index < currentIndex;
        return (
          <li
            key={item.value}
            className={classNames(styles.step, "ui-step", {
              [styles.current]: isCurrent,
              [styles.complete]: isComplete,
              "is-current": isCurrent,
              "is-complete": isComplete,
            })}
          >
            <button
              type="button"
              className={styles.button}
              disabled={item.disabled || readOnly}
              aria-current={isCurrent ? "step" : undefined}
              onClick={() => {
                if (!isCurrent) setCurrent(item.value);
              }}
            >
              <span
                className={classNames(styles.number, "ui-step-number")}
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <span className={styles.label}>{item.label}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
};

export default Steps;
