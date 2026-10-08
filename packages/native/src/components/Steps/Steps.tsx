import type { ReactNode } from "react";
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { Icon } from "../../internal/Icon";
import { useControllable } from "../../internal/useControllable";
import { colorRole, textStyle, weight } from "../../internal/styles";

export type StepStatus = "finish" | "process" | "wait" | "error";
export type StepsDirection = "horizontal" | "vertical";

/** One step */
export interface StepsItem {
  /** Unique value of the step, matched against the Steps value @default its index as a string */
  value?: string;
  /** Visible title of the step */
  title?: ReactNode;
  /** Alias of `title` (React Steps vocabulary) */
  label?: ReactNode;
  /** Supporting text under the title */
  description?: ReactNode;
  /** Forces the status of this step (derived from the current step otherwise) */
  status?: StepStatus;
  /** Prevents navigating to this step */
  disabled?: boolean;
  /** Custom indicator content (an icon) instead of the number / check */
  icon?: ReactNode;
}

export interface StepsProps extends Omit<ViewProps, "style" | "children"> {
  /** Steps, in order */
  items: readonly StepsItem[];
  /** Value of the current step (controlled; pair with onChange) */
  value?: string;
  /** Value of the initial current step (uncontrolled) @default the first step */
  defaultValue?: string;
  /** Called with the value of the step the user presses */
  onChange?: (value: string) => void;
  /**
   * Renders the steps as a read-only progress indicator (no buttons)
   * @default true when onChange is not set, otherwise false
   */
  readOnly?: boolean;
  /**
   * Layout of the steps
   * @default "horizontal"
   */
  direction?: StepsDirection;
  /**
   * Status of the current step (e.g. `error` when it failed)
   * @default "process"
   */
  status?: StepStatus;
  /** Accessible label of the list @default "Steps" (localized) */
  "aria-label"?: string;
  /** Style of the list */
  style?: StyleProp<ViewStyle>;
}

const isText = (node: ReactNode) =>
  typeof node === "string" || typeof node === "number";

const plain = (node: ReactNode): string => (isText(node) ? String(node) : "");

/**
 * Steps: progress through a sequence (finished steps with a check, the
 * current one highlighted, connector lines), horizontal or vertical. Each
 * step is announced as "title, status"; pressable when not read-only.
 */
export function Steps({
  items,
  value,
  defaultValue,
  onChange,
  readOnly,
  direction = "horizontal",
  status = "process",
  "aria-label": ariaLabel,
  accessibilityLabel,
  style,
  ...rest
}: StepsProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: tr } = useI18n();
  const valueOf = (item: StepsItem, index: number) =>
    item.value ?? String(index);
  const [current, setCurrent] = useControllable(
    value,
    defaultValue ?? (items[0] ? valueOf(items[0], 0) : ""),
    onChange,
  );
  const currentIndex = items.findIndex(
    (item, i) => valueOf(item, i) === current,
  );
  const navigable = !(readOnly ?? onChange === undefined);
  const vertical = direction === "vertical";
  const dot = t.space["7"];
  const line = Math.max(1, Math.round(t.space["0-5"]));

  const statusOf = (item: StepsItem, index: number): StepStatus =>
    item.status ??
    (index < currentIndex
      ? "finish"
      : index === currentIndex
        ? status
        : "wait");

  const palette = (s: StepStatus) => {
    const primary = colorRole(t, "primary");
    const danger = colorRole(t, "danger");
    switch (s) {
      case "finish":
        return {
          fill: primary.subtle,
          border: primary.subtle,
          fg: primary.text,
          title: t.colors["text-color"],
        };
      case "process":
        return {
          fill: primary.solid,
          border: primary.solid,
          fg: primary.onSolid,
          title: t.colors["text-color"],
        };
      case "error":
        return {
          fill: danger.solid,
          border: danger.solid,
          fg: danger.onSolid,
          title: danger.text,
        };
      case "wait":
        return {
          fill: "transparent",
          border: t.colors["border-strong-color"],
          fg: t.colors["text-muted-color"],
          title: t.colors["text-secondary-color"],
        };
    }
  };

  return (
    <View
      role="list"
      accessibilityLabel={accessibilityLabel ?? ariaLabel ?? tr("steps.label")}
      {...part("steps", "root", { direction })}
      {...rest}
      style={[{ flexDirection: vertical ? "column" : "row" }, style]}
    >
      {items.map((item, index) => {
        const stepValue = valueOf(item, index);
        const s = statusOf(item, index);
        const c = palette(s);
        const title = item.title ?? item.label;
        const first = index === 0;
        const last = index === items.length - 1;
        const isCurrent = index === currentIndex;
        const doneLine = t.colors["primary-color"];
        const waitLine = t.colors["border-color"];
        // a connector is "done" when the step it leads to is reached
        const before = index <= currentIndex ? doneLine : waitLine;
        const after = index < currentIndex ? doneLine : waitLine;
        const label = [plain(title), tr(`stepStatus.${s}`)]
          .filter(Boolean)
          .join(", ");

        const indicator = (
          <View
            {...part("steps", "indicator", { status: s })}
            style={{
              width: dot,
              height: dot,
              borderRadius: dot / 2,
              borderWidth: line + 0.5,
              borderColor: c.border,
              backgroundColor: c.fill,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.icon !== undefined ? (
              item.icon
            ) : s === "finish" ? (
              <Icon name="check" size={Math.round(dot * 0.5)} color={c.fg} />
            ) : s === "error" ? (
              <Icon name="close" size={Math.round(dot * 0.45)} color={c.fg} />
            ) : (
              <Text
                allowFontScaling={false}
                style={{
                  color: c.fg,
                  fontSize: t.fontSize.sm,
                  fontWeight: weight(t, "semibold"),
                  fontVariant: ["tabular-nums"],
                  ...(fonts.sans ? { fontFamily: fonts.sans } : null),
                }}
              >
                {index + 1}
              </Text>
            )}
          </View>
        );

        const texts = (
          <View
            style={
              vertical
                ? {
                    flex: 1,
                    paddingBottom: last ? 0 : t.space["5"],
                    gap: t.space["0-5"],
                  }
                : {
                    alignItems: "center",
                    paddingHorizontal: t.space["1"],
                    gap: t.space["0-5"],
                  }
            }
          >
            {isText(title) ? (
              <Text
                style={{
                  ...textStyle(t, "md", fonts.sans),
                  color: c.title,
                  fontWeight: weight(t, isCurrent ? "semibold" : "medium"),
                  textAlign: vertical ? "left" : "center",
                  marginTop: vertical
                    ? (dot - t.fontSize.md * 1.5) / 2
                    : t.space["2"],
                }}
                {...part("steps", "title")}
              >
                {title}
              </Text>
            ) : (
              title
            )}
            {isText(item.description) ? (
              <Text
                style={{
                  ...textStyle(t, "sm", fonts.sans),
                  color: t.colors["text-secondary-color"],
                  textAlign: vertical ? "left" : "center",
                }}
                {...part("steps", "description")}
              >
                {item.description}
              </Text>
            ) : (
              item.description
            )}
          </View>
        );

        const connector = (color: string, hide: boolean): ViewStyle => ({
          flex: 1,
          height: line,
          backgroundColor: hide ? "transparent" : color,
        });

        const body = vertical ? (
          <View style={{ flexDirection: "row", gap: t.space["3"] }}>
            <View style={{ alignItems: "center" }}>
              {indicator}
              {last ? null : (
                <View
                  {...part("steps", "connector")}
                  style={{
                    flex: 1,
                    width: line,
                    marginVertical: t.space["1"],
                    backgroundColor: after,
                  }}
                />
              )}
            </View>
            {texts}
          </View>
        ) : (
          <>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                {...part("steps", "connector")}
                style={connector(before, first)}
              />
              <View style={{ marginHorizontal: t.space["1"] }}>
                {indicator}
              </View>
              <View
                {...part("steps", "connector")}
                style={connector(after, last)}
              />
            </View>
            {texts}
          </>
        );

        const stepPart = part("steps", "item", {
          status: s,
          current: isCurrent,
          disabled: item.disabled,
        });
        const box: ViewStyle = vertical ? {} : { flex: 1 };

        if (!navigable) {
          return (
            <View
              key={stepValue}
              role="listitem"
              accessible
              accessibilityLabel={label}
              accessibilityState={{ selected: isCurrent }}
              {...stepPart}
              style={box}
            >
              {body}
            </View>
          );
        }
        return (
          <Pressable
            key={stepValue}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{
              selected: isCurrent,
              disabled: !!item.disabled,
            }}
            aria-selected={isCurrent}
            aria-disabled={!!item.disabled}
            disabled={item.disabled}
            onPress={() => {
              if (stepValue !== current) setCurrent(stepValue);
            }}
            {...stepPart}
            style={({ pressed }) => [
              box,
              {
                borderRadius: t.radius.md,
                opacity: item.disabled ? 0.5 : pressed ? 0.7 : 1,
              },
            ]}
          >
            {body}
          </Pressable>
        );
      })}
    </View>
  );
}
