import { useEffect, useRef, type ReactNode, type Ref } from "react";
import {
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  type AccessibilityActionEvent,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import {
  canDecrementStepper,
  canIncrementStepper,
  createNumberStepperMachine,
  getNumberStepperText,
  parseNumberDraft,
  type NumberStepperProps,
} from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { bindFormControl } from "../../internal/formControl";
import { Icon } from "../../internal/Icon";
import {
  ariaStates,
  fieldRadius,
  fieldTextStyle,
  frameStyle,
  useFocusState,
} from "../../internal/inputFrame";
import { part } from "../../internal/parts";
import {
  controlHeight,
  hitSlopFor,
  textStyle,
  weight,
  type NativeSize,
} from "../../internal/styles";
import { useMachine } from "../../internal/useMachine";

export type NumberInputSize = NativeSize;

/** Look of the stepper buttons */
export type NumberInputStepperLayout = "inline" | "compact";

export interface NumberInputProps extends Omit<
  TextInputProps,
  | "style"
  | "value"
  | "defaultValue"
  | "onChange"
  | "editable"
  | "readOnly"
  | "multiline"
> {
  /** Current value (controlled); `null` is an empty field */
  value?: number | null;
  /**
   * Initial value (uncontrolled); `null` is an empty field
   * @default null
   */
  defaultValue?: number | null;
  /** Called with the committed value (`null`: emptied) */
  onChange?: (value: number | null) => void;
  /** Smallest allowed value; committed values are clamped to it */
  min?: number;
  /** Largest allowed value; committed values are clamped to it */
  max?: number;
  /**
   * Amount added / removed by the stepper buttons and the screen reader
   * increment / decrement actions
   * @default 1
   */
  step?: number;
  /** Decimal places of the value @default inferred from step (0.01 -> 2) */
  precision?: number;
  /**
   * Field size (`--control-height-*`)
   * @default "medium"
   */
  size?: NumberInputSize;
  /**
   * Error state (also shown while the draft is not a number or out of range)
   * @default false
   */
  invalid?: boolean;
  /**
   * Disables the field
   * @default false
   */
  disabled?: boolean;
  /**
   * Typing and stepping do not change the value
   * @default false
   */
  readOnly?: boolean;
  /**
   * Shows the decrement / increment buttons (`Stepper` always does)
   * @default false
   */
  showStepper?: boolean;
  /**
   * `inline`: the buttons sit inside the field frame; `compact`: separate
   * tinted buttons around a narrow value (mobile stepper, `Stepper`)
   * @default "inline"
   */
  stepperLayout?: NumberInputStepperLayout;
  /**
   * Clearing the field commits `null`; otherwise it falls back to min (or 0)
   * @default true
   */
  allowEmpty?: boolean;
  /** Accessible label of the increment button @default i18n "numberInput.increment" */
  incrementLabel?: string;
  /** Accessible label of the decrement button @default i18n "numberInput.decrement" */
  decrementLabel?: string;
  /**
   * Visible label above the field; a string label is also the field's
   * accessible name (unless `accessibilityLabel` is set)
   */
  label?: ReactNode;
  /** Style of the root view */
  style?: StyleProp<ViewStyle>;
  /** Style of the TextInput */
  inputStyle?: StyleProp<TextStyle>;
  /** Ref of the TextInput */
  ref?: Ref<TextInput>;
}

/** Interval of the repeated steps while a button is held, in ms */
const REPEAT_MS = 120;

/**
 * A numeric field on the number-stepper machine of @minerva/core: draft
 * text committed (parsed, clamped, rounded) on blur / submit, optional
 * decrement / increment buttons (hold to repeat), screen-reader adjustable
 * actions, min / max / step / precision.
 */
export function NumberInput({
  value,
  defaultValue = null,
  onChange,
  min,
  max,
  step = 1,
  precision,
  size = "medium",
  invalid = false,
  disabled = false,
  readOnly = false,
  showStepper = false,
  stepperLayout = "inline",
  allowEmpty = true,
  incrementLabel,
  decrementLabel,
  label,
  style,
  inputStyle,
  onFocus,
  onBlur,
  onSubmitEditing,
  onChangeText,
  accessibilityLabel,
  accessibilityHint,
  accessibilityState,
  keyboardType,
  placeholderTextColor,
  ref,
  ...rest
}: NumberInputProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const props: NumberStepperProps = {
    value,
    defaultValue,
    min,
    max,
    step,
    precision,
    disabled,
    readOnly,
    onValueChange: onChange,
  };
  const [state, send, machine] = useMachine(createNumberStepperMachine, props);
  const repeat = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(
    () => () => {
      if (repeat.current) clearInterval(repeat.current);
    },
    [],
  );

  const commit = () => {
    const draft = machine.getState().draft;
    if (draft === null) return;
    if (!allowEmpty && draft.trim() === "") {
      send({ type: "SET", value: min ?? 0 });
    } else {
      send({ type: "COMMIT" });
    }
  };
  const focus = useFocusState(onFocus, (event) => {
    commit();
    onBlur?.(event);
  });
  const stepBy = (direction: 1 | -1) =>
    send({ type: direction > 0 ? "INCREMENT" : "DECREMENT" });
  const startRepeat = (direction: 1 | -1) => {
    if (repeat.current) clearInterval(repeat.current);
    repeat.current = setInterval(() => stepBy(direction), REPEAT_MS);
  };
  const stopRepeat = () => {
    if (repeat.current) clearInterval(repeat.current);
    repeat.current = null;
  };

  const text = getNumberStepperText(state, props);
  const parsed =
    state.draft !== null && state.draft.trim() !== ""
      ? parseNumberDraft(state.draft)
      : undefined;
  const problem =
    parsed === null
      ? translate("numberInput.notANumber")
      : parsed !== undefined && min !== undefined && parsed < min
        ? translate("numberInput.belowMin", { min })
        : parsed !== undefined && max !== undefined && parsed > max
          ? translate("numberInput.aboveMax", { max })
          : undefined;
  const showInvalid = invalid || problem !== undefined;
  const canIncrement = canIncrementStepper(state, props);
  const canDecrement = canDecrementStepper(state, props);
  const interactive = !disabled && !readOnly;
  const compact = stepperLayout === "compact";
  const height = controlHeight(t, size);
  const buttonSize = compact ? Math.round(height * 0.72) : height - 2;
  const name =
    accessibilityLabel ?? (typeof label === "string" ? label : undefined);

  const onAction = (event: AccessibilityActionEvent) => {
    if (event.nativeEvent.actionName === "increment") stepBy(1);
    if (event.nativeEvent.actionName === "decrement") stepBy(-1);
  };

  const stepButton = (direction: 1 | -1) => {
    const enabled = direction > 0 ? canIncrement : canDecrement;
    const iconColor = enabled
      ? compact
        ? t.colors["text-color"]
        : t.colors["text-secondary-color"]
      : t.colors["text-disabled-color"];
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          direction > 0
            ? (incrementLabel ?? translate("numberInput.increment"))
            : (decrementLabel ?? translate("numberInput.decrement"))
        }
        accessibilityState={{ disabled: !enabled }}
        disabled={!enabled}
        onPress={() => stepBy(direction)}
        onLongPress={() => startRepeat(direction)}
        onPressOut={stopRepeat}
        hitSlop={hitSlopFor(t, buttonSize, buttonSize)}
        {...part("number-input", direction > 0 ? "increment" : "decrement", {
          disabled: !enabled,
        })}
        style={({ pressed }) => ({
          width: buttonSize,
          height: buttonSize,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: compact ? t.radius.md : fieldRadius(t, size) - 1,
          backgroundColor:
            pressed && enabled
              ? t.colors["hover-color"]
              : compact
                ? t.colors["surface-muted-color"]
                : "transparent",
        })}
      >
        <Icon
          name={direction > 0 ? "plus" : "minus"}
          size={Math.round(buttonSize * 0.42)}
          color={iconColor}
        />
      </Pressable>
    );
  };

  const field = (
    <TextInput
      ref={ref}
      value={text}
      onChangeText={(next) => {
        send({ type: "INPUT", text: next });
        onChangeText?.(next);
      }}
      onSubmitEditing={(event) => {
        commit();
        onSubmitEditing?.(event);
      }}
      onFocus={focus.onFocus}
      onBlur={focus.onBlur}
      editable={interactive}
      readOnly={readOnly}
      keyboardType={
        keyboardType ??
        (min !== undefined && min >= 0
          ? "decimal-pad"
          : Platform.select({
              ios: "numbers-and-punctuation",
              default: "numeric",
            }))
      }
      inputMode={min !== undefined && min >= 0 ? "decimal" : undefined}
      accessibilityRole={Platform.OS === "web" ? "spinbutton" : "adjustable"}
      accessibilityLabel={name}
      accessibilityHint={problem ?? accessibilityHint}
      accessibilityState={{ ...accessibilityState, disabled }}
      accessibilityValue={{
        min,
        max,
        now: state.value ?? undefined,
        text: text || undefined,
      }}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={state.value ?? undefined}
      aria-valuetext={text || undefined}
      accessibilityActions={
        interactive
          ? [
              {
                name: "increment",
                label: incrementLabel ?? translate("numberInput.increment"),
              },
              {
                name: "decrement",
                label: decrementLabel ?? translate("numberInput.decrement"),
              },
            ]
          : undefined
      }
      onAccessibilityAction={onAction}
      placeholderTextColor={
        placeholderTextColor ?? t.colors["text-muted-color"]
      }
      selectionColor={t.colors["primary-color"]}
      cursorColor={t.colors["primary-color"]}
      underlineColorAndroid="transparent"
      {...ariaStates({ invalid: showInvalid, disabled })}
      {...part("number-input", "input")}
      {...rest}
      style={[
        fieldTextStyle(t, size, disabled, fonts.sans),
        {
          textAlign: showStepper ? "center" : "left",
          fontVariant: ["tabular-nums"],
        },
        compact
          ? {
              flex: 0,
              minWidth: Math.round(height * 1.1),
              height: buttonSize,
              paddingVertical: 0,
              paddingHorizontal: t.space["1"],
              borderRadius: t.radius.md,
              backgroundColor: t.colors["surface-muted-color"],
              color: showInvalid
                ? t.colors["danger-color"]
                : disabled
                  ? t.colors["text-disabled-color"]
                  : t.colors["text-color"],
            }
          : null,
        inputStyle,
      ]}
    />
  );

  return (
    <View
      style={[{ gap: t.space["1-5"] }, style]}
      {...part("number-input", "root", {
        size,
        invalid: showInvalid,
        disabled,
        layout: showStepper ? stepperLayout : undefined,
      })}
    >
      {label !== undefined && label !== null ? (
        <Text
          style={{
            ...textStyle(t, "sm", fonts.sans),
            color: t.colors["text-secondary-color"],
            fontWeight: weight(t, "medium"),
          }}
          {...part("number-input", "label")}
        >
          {label}
        </Text>
      ) : null}
      {compact && showStepper ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-start",
            gap: t.space["1"],
            opacity: disabled ? 0.6 : 1,
          }}
          {...part("number-input", "wrapper", { focused: focus.focused })}
        >
          {stepButton(-1)}
          {field}
          {stepButton(1)}
        </View>
      ) : (
        <View
          style={[
            frameStyle(t, {
              variant: "outline",
              size,
              focused: focus.focused,
              invalid: showInvalid,
              disabled,
              readOnly,
            }),
            showStepper ? { paddingHorizontal: 0, gap: 0 } : null,
          ]}
          {...part("number-input", "wrapper", {
            focused: focus.focused,
            invalid: showInvalid,
          })}
        >
          {showStepper ? stepButton(-1) : null}
          {field}
          {showStepper ? stepButton(1) : null}
        </View>
      )}
    </View>
  );
}

bindFormControl(NumberInput, { emptyValue: null });

export interface StepperProps extends Omit<
  NumberInputProps,
  "showStepper" | "stepperLayout"
> {
  /**
   * Initial value (uncontrolled). A stepper starts on a number, not empty
   * (mobile-only component, unlike `NumberInput`)
   * @default min, else 0
   */
  defaultValue?: number | null;
}

/**
 * Mobile stepper: a `NumberInput` with its decrement / increment buttons
 * always shown, in the compact layout (tinted square buttons around a
 * narrow value).
 */
export function Stepper({ defaultValue, min, ...props }: StepperProps) {
  return (
    <NumberInput
      {...props}
      min={min}
      defaultValue={defaultValue !== undefined ? defaultValue : (min ?? 0)}
      showStepper
      stepperLayout="compact"
    />
  );
}

bindFormControl(Stepper, { emptyValue: null, commitOnChange: true });
