import {
  Pressable,
  Text,
  View,
  type AccessibilityActionEvent,
  type GestureResponderEvent,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import {
  createRatingMachine,
  getRatingStarFills,
  type RatingMachineProps,
} from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { bindFormControl } from "../../internal/formControl";
import { Icon } from "../../internal/Icon";
import { part } from "../../internal/parts";
import {
  colorRole,
  hitSlopFor,
  weight,
  type NativeSize,
  type SemanticColor,
} from "../../internal/styles";
import { useMachine } from "../../internal/useMachine";

export type RatingSize = NativeSize;

export interface RatingProps extends Omit<ViewProps, "style"> {
  /** Current score, from 0 to max (controlled) */
  value?: number;
  /**
   * Initial score (uncontrolled)
   * @default 0
   */
  defaultValue?: number;
  /** Called with the score the user picked */
  onChange?: (value: number) => void;
  /**
   * Highest score; the score is always drawn on 5 stars (a star is
   * `max / 5` points)
   * @default 10
   */
  max?: number;
  /**
   * Display only: presses and screen reader adjustments are ignored
   * @default false
   */
  readOnly?: boolean;
  /**
   * Pressing the left half of a star picks half a star; screen reader steps
   * are half stars
   * @default true
   */
  allowHalf?: boolean;
  /**
   * Picking the current score again clears it to 0
   * @default false
   */
  clearable?: boolean;
  /**
   * Star size: 18, 24 or 32 dp (larger than the web's 12 / 16 / 20 px:
   * touch targets)
   * @default "medium"
   */
  size?: RatingSize;
  /**
   * Semantic color of the filled stars
   * @default "warning"
   */
  color?: SemanticColor;
  /**
   * Shows the score (one decimal) after the stars
   * @default false
   */
  showValue?: boolean;
  /** Number of ratings, shown after the score when `showValue` is set */
  ratingCount?: number;
  /** Style of the root view */
  style?: StyleProp<ViewStyle>;
}

const STAR_SIZE = { small: 18, medium: 24, large: 32 } as const;

/** The score with one decimal at most ("4", "4.5") */
const formatScore = (value: number) => String(Math.round(value * 10) / 10);

/**
 * A star rating on the rating machine of @minerva/core: a 0..max score
 * drawn on five stars with half stars, pressable stars (left half = half a
 * star), screen reader adjustable (increment / decrement actions),
 * read-only and clearable modes.
 */
export function Rating({
  value,
  defaultValue = 0,
  onChange,
  max = 10,
  readOnly = false,
  allowHalf = true,
  clearable = false,
  size = "medium",
  color = "warning",
  showValue = false,
  ratingCount,
  style,
  accessibilityLabel,
  ...rest
}: RatingProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const props: RatingMachineProps = {
    value,
    defaultValue,
    max,
    readOnly,
    allowHalf,
    clearable,
    onValueChange: onChange,
  };
  const [state, send] = useMachine(createRatingMachine, props);
  const fills = getRatingStarFills(state, max);
  const star = STAR_SIZE[size];
  const gap = t.space["1"];
  const cell = star + gap;
  const filled = colorRole(t, color).solid;
  const empty = t.colors["border-color"];
  const score = formatScore(state.value);

  const pick = (index: number, event: GestureResponderEvent) => {
    const x = event?.nativeEvent?.locationX;
    send({
      type: "PICK",
      index,
      half: allowHalf && typeof x === "number" && x < cell / 2,
    });
  };
  const onAction = (event: AccessibilityActionEvent) => {
    if (event.nativeEvent.actionName === "increment") {
      send({ type: "KEY", key: "ArrowRight" });
    } else if (event.nativeEvent.actionName === "decrement") {
      send({ type: "KEY", key: "ArrowLeft" });
    }
  };

  return (
    <View
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel ?? translate("rating.label")}
      accessibilityValue={{
        min: 0,
        max,
        now: state.value,
        text: translate("rating.value", { value: score, max }),
      }}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={state.value}
      aria-valuetext={translate("rating.value", { value: score, max })}
      accessibilityActions={
        readOnly ? undefined : [{ name: "increment" }, { name: "decrement" }]
      }
      onAccessibilityAction={onAction}
      {...part("rating", "root", { size, readonly: readOnly })}
      {...rest}
      style={[
        { flexDirection: "row", alignItems: "center", alignSelf: "flex-start" },
        style,
      ]}
    >
      {fills.map((fill, index) => (
        <Pressable
          key={index}
          accessible={false}
          disabled={readOnly}
          onPress={(event) => pick(index, event)}
          onHoverIn={() => send({ type: "HOVER", index })}
          onHoverOut={() => send({ type: "HOVER_END" })}
          hitSlop={hitSlopFor(t, star)}
          {...part("rating", "item", { fill, index: String(index) })}
          style={({ pressed }) => ({
            width: cell,
            height: star,
            alignItems: "center",
            justifyContent: "center",
            transform: [{ scale: pressed && !readOnly ? 0.88 : 1 }],
          })}
        >
          <View style={{ width: star, height: star }}>
            <Icon name="star" size={star} color={empty} />
            {fill !== "empty" ? (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: fill === "half" ? star / 2 : star,
                  overflow: "hidden",
                }}
                {...part("rating", "fill")}
              >
                <Icon name="star" size={star} color={filled} />
              </View>
            ) : null}
          </View>
        </Pressable>
      ))}
      {showValue ? (
        <Text
          style={{
            marginLeft: t.space["1"],
            color: t.colors["text-secondary-color"],
            fontSize: size === "large" ? t.fontSize.lg : t.fontSize.md,
            fontWeight: weight(t, "semibold"),
            fontVariant: ["tabular-nums"],
            ...(fonts.sans ? { fontFamily: fonts.sans } : null),
          }}
          {...part("rating", "value")}
        >
          {state.value.toFixed(1)}
          {ratingCount !== undefined ? (
            <Text
              style={{
                color: t.colors["text-muted-color"],
                fontWeight: weight(t, "regular"),
              }}
            >
              {` (${ratingCount})`}
            </Text>
          ) : null}
        </Text>
      ) : null}
    </View>
  );
}

bindFormControl(Rating, { emptyValue: 0, commitOnChange: true });
