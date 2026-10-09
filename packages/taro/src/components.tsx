import {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
  type KeyboardEvent,
  useId,
} from "react";
import {
  Button as TaroButton,
  Input as TaroInput,
  View,
  Text,
} from "@tarojs/components";
import type {
  ButtonProps as HostButtonProps,
  InputProps as HostInputProps,
  SwitchProps as HostSwitchProps,
  ITouchEvent,
} from "@tarojs/components";
import { cn } from "@minerva/core";
import { useValue } from "./shared";
import { useI18n } from "./theme";
import { useFieldState } from "./forms";
export { miniTokenClassNames } from "@minerva/core";
export interface ButtonProps extends Omit<
  HostButtonProps,
  "size" | "type" | "role" | "color"
> {
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  type?: "button" | "submit" | "reset";
  color?: string;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
  variant?: "solid" | "outline" | "ghost" | "link";
  loadingText?: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  active?: boolean;
  shape?: "square" | "rounded" | "circle";
  borderRadius?:
    number | "none" | "small" | "medium" | "large" | "circle" | "square";
}
export function Button({
  disabled,
  loading,
  className,
  size = "medium",
  variant = "solid",
  color = "primary",
  onClick,
  role = "button",
  children,
  type = "button",
  loadingText,
  startIcon,
  endIcon,
  fullWidth,
  active,
  shape = "rounded",
  borderRadius,
  style,
  ...props
}: ButtonProps) {
  return (
    <TaroButton
      {...{ tabIndex: disabled || loading ? -1 : 0 }}
      {...props}
      {...{ role }}
      formType={type === "button" ? undefined : type}
      aria-busy={loading || undefined}
      aria-disabled={disabled || loading || undefined}
      className={cn(
        "mn-button",
        (disabled || loading) && "mn-disabled",
        `mn-size-${size}`,
        `mn-variant-${variant}`,
        `mn-color-${color}`,
        `mn-shape-${shape}`,
        fullWidth && "mn-full-width",
        active && "mn-active",
        className,
      )}
      disabled={disabled || loading}
      loading={loading}
      style={{
        ...(typeof style === "object" ? style : {}),
        borderRadius:
          typeof borderRadius === "number"
            ? borderRadius
            : borderRadius === "circle"
              ? "9999px"
              : borderRadius === "none" || borderRadius === "square"
                ? 0
                : borderRadius === "small"
                  ? "var(--radius-sm,4px)"
                  : borderRadius === "medium"
                    ? "var(--radius-md,8px)"
                    : borderRadius === "large"
                      ? "var(--radius-lg,12px)"
                      : undefined,
      }}
      data-minerva="button"
      data-part="root"
      onClick={(event) => {
        if (!disabled && !loading) onClick?.(event);
      }}
    >
      {loading && loadingText ? (
        loadingText
      ) : (
        <>
          {!loading && startIcon}
          {children}
          {!loading && endIcon}
        </>
      )}
    </TaroButton>
  );
}
export interface InputProps extends Omit<
  HostInputProps,
  "onInput" | "onChange" | "defaultValue" | "value" | "type" | "size"
> {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  value?: string;
  defaultValue?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  type?: HostInputProps["type"] | "password";
  variant?: string;
  size?: string;
  invalid?: boolean;
  required?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  clearLabel?: string;
  showCharCount?: boolean;
  maxLength?: number;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
}
export function Input({
  value,
  defaultValue = "",
  disabled,
  readOnly,
  className,
  onChange,
  onConfirm,
  type = "text",
  variant = "outline",
  size = "medium",
  invalid,
  prefix,
  suffix,
  clearable,
  onClear,
  clearLabel,
  showCharCount,
  maxLength,
  showPasswordLabel,
  hidePasswordLabel,
  ...props
}: InputProps) {
  const countId = useId();
  const { t } = useI18n();
  clearLabel ??= t("input.clear");
  showPasswordLabel ??= t("input.showPassword");
  hidePasswordLabel ??= t("input.hidePassword");
  const field = useFieldState();
  const [current, set] = useValue(value, defaultValue, onChange),
    [visible, setVisible] = useState(false);
  const locked = disabled ?? field.disabled,
    ro = readOnly ?? field.readOnly;
  const confirmation =
    process.env.TARO_ENV === "h5"
      ? {
          onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
            if (
              event.key !== "Enter" ||
              event.nativeEvent.isComposing ||
              event.repeat ||
              event.defaultPrevented ||
              locked ||
              ro
            )
              return;
            const target = event.currentTarget;
            onConfirm?.({
              type: "confirm",
              timeStamp: event.timeStamp,
              target,
              currentTarget: target,
              detail: { value: target.value },
              preventDefault: () => event.preventDefault(),
              stopPropagation: () => event.stopPropagation(),
            });
          },
        }
      : { onConfirm };
  const input = (
    <TaroInput
      {...props}
      {...confirmation}
      value={current}
      type={type === "password" ? "text" : type}
      password={type === "password" && !visible}
      maxlength={maxLength ?? props.maxlength}
      className="mn-input"
      disabled={locked || ro}
      aria-describedby={
        [props["aria-describedby"], showCharCount && countId]
          .filter(Boolean)
          .join(" ") || undefined
      }
      aria-readonly={ro || undefined}
      aria-invalid={invalid ?? field.invalid}
      aria-required={props.required ?? field.required}
      data-minerva="input"
      data-part="input"
      onInput={(event) => {
        if (!locked && !ro) set(event.detail.value);
      }}
    />
  );
  return (
    <View
      className={cn(
        "mn-input-root",
        `mn-variant-${variant}`,
        `mn-size-${size}`,
        (invalid ?? field.invalid) && "mn-invalid",
        locked && "mn-disabled",
        className,
      )}
      data-minerva="input"
      data-part="root"
    >
      {prefix != null && prefix !== false && (
        <Text className="mn-input-addon">{prefix}</Text>
      )}
      {input}
      {clearable && current && !locked && !ro && (
        <Button
          variant="ghost"
          className="mn-input-action"
          aria-label={clearLabel}
          disabled={locked || ro}
          onClick={() => {
            set("");
            onClear?.();
          }}
        >
          ×
        </Button>
      )}
      {type === "password" && (
        <Button
          variant="ghost"
          className="mn-input-action"
          disabled={locked}
          aria-label={visible ? hidePasswordLabel : showPasswordLabel}
          onClick={() => setVisible(!visible)}
        >
          {visible ? "◉" : "◎"}
        </Button>
      )}
      {suffix != null && suffix !== false && (
        <Text className="mn-input-addon">{suffix}</Text>
      )}
      {showCharCount && (
        <Text id={countId} className="mn-input-count">
          {current.length}
          {maxLength === undefined ? "" : ` / ${maxLength}`}
        </Text>
      )}
    </View>
  );
}
export interface SwitchProps extends Omit<
  HostSwitchProps,
  "onChange" | "checked" | "size" | "color"
> {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  readOnly?: boolean;
  onChange?: (checked: boolean, event: ITouchEvent) => void;
  label?: ReactNode;
  children?: ReactNode;
  offLabel?: ReactNode;
  onLabel?: ReactNode;
  loading?: boolean;
  variant?: "slider" | "segmented";
  shape?: string;
  size?: string;
  color?: string;
  labelPlacement?: "start" | "end" | "top" | "bottom";
  trackStyle?: CSSProperties;
  thumbStyle?: CSSProperties;
  value?: string;
  icon?: ReactNode;
  iconPlacement?: "start" | "end";
  ripple?: boolean;
  invalid?: boolean;
  required?: boolean;
}
export function Switch({
  checked,
  defaultChecked = false,
  disabled,
  readOnly,
  className,
  onChange,
  label,
  children,
  offLabel,
  onLabel,
  loading,
  variant = "slider",
  shape = "round",
  size = "medium",
  color = "primary",
  labelPlacement = "end",
  trackStyle,
  thumbStyle,
  icon,
  iconPlacement = "start",
  value = "on",
  name: fieldName,
  ripple = true,
  invalid,
  required,
  style,
  ...props
}: SwitchProps) {
  const [feedback, setFeedback] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const field = useFieldState();
  const [current, set] = useValue(checked, defaultChecked);
  const locked =
    (disabled ?? field.disabled) || (readOnly ?? field.readOnly) || loading;
  const change = (next: boolean, event: ITouchEvent) => {
    if (locked || next === current) return;
    set(next);
    onChange?.(next, event);
    if (ripple) {
      setFeedback((n) => n + 1);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setFeedback(0), 600);
    }
  };
  const name =
    props["aria-label"] ??
    (typeof (label ?? children) === "string"
      ? String(label ?? children)
      : undefined);
  const namedValue = fieldName && current && (
    <TaroInput
      name={fieldName}
      value={value}
      disabled={disabled ?? field.disabled}
      style={{ display: "none" }}
    />
  );
  const segmented =
    variant === "segmented" && offLabel != null && onLabel != null;
  const commonClass = cn(
    `mn-size-${size}`,
    `mn-color-${color}`,
    `mn-shape-${shape}`,
    locked && "mn-disabled",
    loading && "mn-loading",
  );
  if (segmented)
    return (
      <View
        {...{ role: "group" }}
        id={props.id ?? field.id}
        aria-label={name}
        aria-labelledby={props["aria-labelledby"]}
        aria-describedby={props["aria-describedby"]}
        aria-disabled={locked}
        className={cn("mn-switch-segmented", commonClass, className)}
        style={typeof style === "object" ? style : undefined}
        data-minerva="switch"
        data-part="root"
      >
        {namedValue}
        {[false, true].map((next) => (
          <Button
            key={String(next)}
            className={cn(
              "mn-switch-segment",
              current === next && "mn-selected",
            )}
            variant="ghost"
            color={color}
            disabled={locked}
            aria-pressed={current === next}
            onClick={(event) => change(next, event)}
          >
            {next ? onLabel : offLabel}
          </Button>
        ))}
      </View>
    );
  const control = (
    <View className={cn("mn-switch-control", `mn-color-${color}`)}>
      <Button
        {...{ role: "switch" }}
        id={props.id ?? field.id}
        aria-label={name}
        aria-labelledby={props["aria-labelledby"]}
        aria-describedby={props["aria-describedby"]}
        aria-checked={current}
        aria-invalid={invalid ?? field.invalid}
        aria-required={required ?? field.required}
        className={cn(
          "mn-switch",
          "mn-switch-custom",
          commonClass,
          current && "mn-checked",
        )}
        variant="ghost"
        color={color}
        disabled={locked}
        data-minerva="switch"
        data-part="input"
        onClick={(event) => change(!current, event)}
      >
        <View className="mn-switch-track" style={trackStyle} />
        <View className="mn-switch-thumb" style={thumbStyle}>
          {loading ? (
            <Text className="mn-switch-loading">◌</Text>
          ) : (
            iconPlacement === "start" && icon
          )}
        </View>
      </Button>
      {icon && iconPlacement === "end" && (
        <Text className="mn-switch-icon">{icon}</Text>
      )}
      {feedback > 0 && ripple && (
        <View key={feedback} aria-hidden className="mn-switch-ripple" />
      )}
    </View>
  );
  const bilateral = offLabel != null && onLabel != null;
  const text = label ?? children;
  return (
    <View
      className={cn(
        "mn-switch-field",
        `mn-label-${labelPlacement}`,
        commonClass,
        className,
      )}
      style={typeof style === "object" ? style : undefined}
      data-minerva="switch"
      data-part="root"
    >
      {namedValue}
      {bilateral && (
        <Button
          className={cn("mn-switch-side", !current && "mn-selected")}
          variant="ghost"
          color={color}
          disabled={locked}
          onClick={(event) => change(false, event)}
        >
          {offLabel}
        </Button>
      )}
      {control}
      {bilateral ? (
        <Button
          className={cn("mn-switch-side", current && "mn-selected")}
          variant="ghost"
          color={color}
          disabled={locked}
          onClick={(event) => change(true, event)}
        >
          {onLabel}
        </Button>
      ) : (
        text && <Text className="mn-switch-label">{text}</Text>
      )}
    </View>
  );
}
