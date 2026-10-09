import { Children, isValidElement, useId, type ReactNode } from "react";
import { Text, View, type TextProps, type ViewProps } from "react-native";
import {
  FormControlContext,
  useFormControlContext,
} from "../../internal/FormControlContext";
import { useTheme } from "../../theme/MinervaProvider";
import { textStyle } from "../../internal/styles";
export {
  useFormControlContext,
  useFormControlProps,
} from "../../internal/FormControlContext";
export type { FormControlContextValue } from "../../internal/FormControlContext";
export interface FormControlProps extends ViewProps {
  /** @default false */
  disabled?: boolean;
  /** @default false */
  readOnly?: boolean;
  /** @default false */
  invalid?: boolean;
  /** @default false */
  required?: boolean;
  id?: string;
}
const textOf = (node: ReactNode): string =>
  Children.toArray(node)
    .map((child) =>
      typeof child === "string" || typeof child === "number"
        ? String(child)
        : isValidElement<{ children?: ReactNode }>(child)
          ? textOf(child.props.children)
          : "",
    )
    .join("");
export function FormControl({
  disabled,
  readOnly,
  invalid,
  required,
  id,
  children,
  style,
  ...props
}: FormControlProps) {
  const generated = useId();
  let label = "";
  let description = "";
  const inspect = (nodes: ReactNode) =>
    Children.forEach(nodes, (node) => {
      if (!isValidElement<{ children?: ReactNode }>(node)) return;
      if (node.type === FormLabel) label = textOf(node.props.children);
      else if (node.type === (invalid ? FormErrorMessage : FormHelperText))
        description = textOf(node.props.children);
      else if (node.type !== FormControl) inspect(node.props.children);
    });
  inspect(children);
  const { tokens: t } = useTheme();
  return (
    <FormControlContext.Provider
      value={{
        disabled,
        readOnly,
        invalid,
        required,
        id: id ?? generated,
        label: label || undefined,
        description: description || undefined,
      }}
    >
      <View {...props} style={[{ gap: t.space["2"] }, style]}>
        {children}
      </View>
    </FormControlContext.Provider>
  );
}
export function FormLabel({ children, style, ...props }: TextProps) {
  const field = useFormControlContext();
  const { tokens: t } = useTheme();
  return (
    <Text {...props} style={[textStyle(t), { fontWeight: "600" }, style]}>
      {children}
      {field?.required ? " *" : ""}
    </Text>
  );
}
export function FormHelperText({ style, ...props }: TextProps) {
  const field = useFormControlContext();
  const { tokens: t } = useTheme();
  return field?.invalid ? null : (
    <Text
      {...props}
      style={[
        textStyle(t, "sm"),
        { color: t.colors["text-secondary-color"] },
        style,
      ]}
    />
  );
}
export function FormErrorMessage({ style, ...props }: TextProps) {
  const field = useFormControlContext();
  const { tokens: t } = useTheme();
  return !field?.invalid ? null : (
    <Text
      {...props}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      style={[textStyle(t, "sm"), { color: t.colors["danger-color"] }, style]}
    />
  );
}
