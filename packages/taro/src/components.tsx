import {
  Button as TaroButton,
  Input as TaroInput,
  Switch as TaroSwitch,
} from "@tarojs/components";
import type {
  ButtonProps as HostButtonProps,
  InputProps as HostInputProps,
  SwitchProps as HostSwitchProps,
} from "@tarojs/components";
import { cn } from "@minerva/core";
export { miniTokenClassNames } from "@minerva/core";

export interface ButtonProps extends Omit<HostButtonProps, "size" | "type"> {
  size?: "small" | "medium" | "large";
  variant?: "solid" | "outline" | "ghost";
}
export function Button({
  disabled,
  loading,
  className,
  size = "medium",
  variant = "solid",
  onClick,
  children,
  ...props
}: ButtonProps) {
  return (
    <TaroButton
      {...props}
      {...{ role: "button" }}
      aria-disabled={disabled || loading || undefined}
      className={cn(
        "mn-button",
        `mn-size-${size}`,
        `mn-variant-${variant}`,
        className,
      )}
      disabled={disabled || loading}
      loading={loading}
      data-minerva="button"
      data-part="root"
      onClick={(event) => {
        if (!disabled && !loading) onClick?.(event);
      }}
    >
      {children}
    </TaroButton>
  );
}

export interface InputProps extends Omit<
  HostInputProps,
  "onInput" | "onChange"
> {
  readOnly?: boolean;
  onChange?: (value: string) => void;
}
export function Input({
  disabled,
  readOnly,
  className,
  onChange,
  ...props
}: InputProps) {
  return (
    <TaroInput
      {...props}
      className={cn("mn-input", className)}
      disabled={disabled || readOnly}
      data-minerva="input"
      data-part="input"
      onInput={(event) => {
        if (!disabled && !readOnly) onChange?.(event.detail.value);
      }}
    />
  );
}

export interface SwitchProps extends Omit<HostSwitchProps, "onChange"> {
  readOnly?: boolean;
  onChange?: (checked: boolean) => void;
}
export function Switch({
  disabled,
  readOnly,
  className,
  onChange,
  ...props
}: SwitchProps) {
  return (
    <TaroSwitch
      {...props}
      className={cn("mn-switch", className)}
      disabled={disabled || readOnly}
      data-minerva="switch"
      data-part="root"
      onChange={(event) => {
        if (!disabled && !readOnly) onChange?.(event.detail.value);
      }}
    />
  );
}
