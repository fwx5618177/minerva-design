import { Children, isValidElement, type ReactNode } from "react";
import { Text, View, type TextProps, type ViewProps } from "react-native";
import { Radio } from "../Radio";
import { Divider } from "../Divider";
import { useTheme } from "../../theme/MinervaProvider";
import { textStyle } from "../../internal/styles";
import type { SelectOption } from "./Select";
export interface SelectItemProps {
  value: string;
  children: ReactNode;
  /** @default false */
  disabled?: boolean;
  textValue?: string;
  description?: string;
}
export function SelectItem({
  value,
  children,
  disabled,
  textValue,
}: SelectItemProps) {
  return (
    <Radio value={value} disabled={disabled} accessibilityLabel={textValue}>
      {children}
    </Radio>
  );
}
export interface SelectGroupProps extends ViewProps {
  label?: string;
  disabled?: boolean;
}
export function SelectGroup({ label, children, ...props }: SelectGroupProps) {
  return (
    <View {...props}>
      {Boolean(label) && <SelectLabel>{label}</SelectLabel>}
      {children}
    </View>
  );
}
export function SelectLabel({ style, ...props }: TextProps) {
  const { tokens: t } = useTheme();
  return (
    <Text
      {...props}
      accessibilityRole="header"
      style={[textStyle(t, "sm"), { padding: t.space["3"] }, style]}
    />
  );
}
export function SelectSeparator() {
  return <Divider />;
}
function plainText(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) =>
      typeof child === "string" || typeof child === "number"
        ? String(child)
        : isValidElement<{ children?: ReactNode }>(child)
          ? plainText(child.props.children)
          : "",
    )
    .join("");
}
export function collectSelectOptions(
  children: ReactNode,
  group?: string,
  disabled = false,
): SelectOption[] {
  const result: SelectOption[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement<SelectItemProps & SelectGroupProps>(child)) return;
    if (child.type === SelectItem)
      result.push({
        value: child.props.value,
        label: child.props.textValue ?? plainText(child.props.children),
        disabled: disabled || child.props.disabled,
        description: child.props.description,
        group,
      });
    else if (child.type === SelectGroup)
      result.push(
        ...collectSelectOptions(
          child.props.children,
          child.props.label,
          disabled || child.props.disabled,
        ),
      );
    else if (child.type !== SelectLabel && child.type !== SelectSeparator)
      result.push(
        ...collectSelectOptions(child.props.children, group, disabled),
      );
  });
  return result;
}
