import {
  cloneElement,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { Text, View, type GestureResponderEvent } from "react-native";
import { useTheme } from "../../theme/MinervaProvider";
import { textStyle } from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";
import { Button, type ButtonProps } from "../Button";
import { Checkbox } from "../Checkbox";
import { Radio } from "../Radio";
import { Dialog } from "../Dialog";
import { Divider } from "../Divider";
export interface MenuAction {
  key: string;
  label: ReactNode;
  textValue?: string;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  closeOnSelect?: boolean;
  children?: MenuEntry[];
}
export interface MenuCheckboxEntry {
  type: "checkbox";
  key: string;
  label: ReactNode;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  closeOnSelect?: boolean;
}
export interface MenuRadioGroupEntry {
  type: "radio-group";
  key: string;
  label?: ReactNode;
  items: { value: string; label: ReactNode; disabled?: boolean }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  closeOnSelect?: boolean;
}
export interface MenuSeparatorEntry {
  type: "separator";
  key: string;
}
export interface MenuGroupEntry {
  type: "group";
  key: string;
  label: ReactNode;
  items: MenuEntry[];
}
export type MenuEntry =
  | MenuAction
  | MenuCheckboxEntry
  | MenuRadioGroupEntry
  | MenuSeparatorEntry
  | MenuGroupEntry;
export interface MenuProps {
  children: ReactElement<ButtonProps>;
  items: MenuEntry[];
  onSelect?: (item: MenuAction) => void;
  /** @default true */
  closeOnSelect?: boolean;
  open?: boolean;
  /** @default false */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** @default false */
  disabled?: boolean;
  accessibilityLabel?: string;
}
function CheckEntry({
  entry,
  close,
}: {
  entry: MenuCheckboxEntry;
  close: () => void;
}) {
  const [checked, setChecked] = useControllable(
    entry.checked,
    entry.defaultChecked ?? false,
    entry.onCheckedChange,
  );
  return (
    <Checkbox
      checked={checked}
      disabled={entry.disabled}
      onChange={(next) => {
        setChecked(next);
        if (entry.closeOnSelect) close();
      }}
    >
      {entry.label}
    </Checkbox>
  );
}
function RadioEntry({
  entry,
  close,
}: {
  entry: MenuRadioGroupEntry;
  close: () => void;
}) {
  const [value, setValue] = useControllable(
    entry.value,
    entry.defaultValue ?? "",
    entry.onValueChange,
  );
  const { tokens } = useTheme();
  return (
    <View>
      {Boolean(entry.label) && (
        <Text accessibilityRole="header" style={textStyle(tokens)}>
          {entry.label}
        </Text>
      )}
      {entry.items.map((item) => (
        <Radio
          key={item.value}
          value={item.value}
          checked={value === item.value}
          disabled={item.disabled}
          onChange={() => {
            setValue(item.value);
            if (entry.closeOnSelect) close();
          }}
        >
          {item.label}
        </Radio>
      ))}
    </View>
  );
}
function NativeMenu({
  children,
  items,
  onSelect,
  closeOnSelect = true,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  accessibilityLabel = "Actions",
  context = false,
}: MenuProps & { context?: boolean }) {
  const [shown, setShown] = useControllable(open, defaultOpen, onOpenChange);
  const [path, setPath] = useState<MenuAction[]>([]);
  // The dialog and submenu rows unmount when hidden. Keep uncontrolled values
  // on the menu owner so opening another branch or reopening preserves choices.
  const [checkboxValues, setCheckboxValues] = useState<Record<string, boolean>>(
    {},
  );
  const [radioValues, setRadioValues] = useState<Record<string, string>>({});
  const { tokens: t } = useTheme();
  const close = () => {
    setShown(false);
    setPath([]);
  };
  const show = () => {
    if (!disabled && !children.props.disabled) {
      setPath([]);
      setShown(true);
    }
  };
  const entries = (list: MenuEntry[]): ReactNode =>
    list.map((entry) => {
      if ("type" in entry) {
        switch (entry.type) {
          case "separator":
            return <Divider key={entry.key} />;
          case "checkbox":
            return (
              <CheckEntry
                key={entry.key}
                entry={{
                  ...entry,
                  checked:
                    entry.checked ??
                    checkboxValues[entry.key] ??
                    entry.defaultChecked ??
                    false,
                  onCheckedChange: (value) => {
                    if (entry.checked === undefined)
                      setCheckboxValues((current) => ({
                        ...current,
                        [entry.key]: value,
                      }));
                    entry.onCheckedChange?.(value);
                  },
                }}
                close={close}
              />
            );
          case "radio-group":
            return (
              <RadioEntry
                key={entry.key}
                entry={{
                  ...entry,
                  value:
                    entry.value ??
                    radioValues[entry.key] ??
                    entry.defaultValue ??
                    "",
                  onValueChange: (value) => {
                    if (entry.value === undefined)
                      setRadioValues((current) => ({
                        ...current,
                        [entry.key]: value,
                      }));
                    entry.onValueChange?.(value);
                  },
                }}
                close={close}
              />
            );
          case "group":
            return (
              <View key={entry.key}>
                <Text accessibilityRole="header" style={textStyle(t)}>
                  {entry.label}
                </Text>
                {entries(entry.items)}
              </View>
            );
        }
      }
      return (
        <Button
          key={entry.key}
          variant="ghost"
          color="neutral"
          disabled={entry.disabled}
          startIcon={entry.icon}
          accessibilityLabel={
            entry.textValue ??
            (typeof entry.label === "string" ? entry.label : undefined)
          }
          fullWidth
          onPress={() => {
            if (entry.children?.length) setPath([...path, entry]);
            else {
              onSelect?.(entry);
              if (entry.closeOnSelect ?? closeOnSelect) close();
            }
          }}
        >
          {entry.label}
        </Button>
      );
    });
  return (
    <>
      {cloneElement(children, {
        accessibilityState: {
          ...children.props.accessibilityState,
          expanded: shown,
          disabled: disabled || children.props.disabled,
        },
        disabled: disabled || children.props.disabled,
        ...(context
          ? {
              onLongPress: (event: GestureResponderEvent) => {
                children.props.onLongPress?.(event);
                show();
              },
            }
          : {
              onPress: (event: GestureResponderEvent) => {
                children.props.onPress?.(event);
                show();
              },
            }),
      })}
      <Dialog
        open={shown}
        onOpenChange={(next) => {
          if (next) setShown(true);
          else close();
        }}
        title={path.at(-1)?.label ?? accessibilityLabel}
      >
        <View style={{ gap: t.space["2"] }}>
          {path.length > 0 && (
            <Button variant="link" onPress={() => setPath(path.slice(0, -1))}>
              Back
            </Button>
          )}
          {entries(path.at(-1)?.children ?? items)}
        </View>
      </Dialog>
    </>
  );
}
export function Menu(props: MenuProps) {
  return <NativeMenu {...props} />;
}
export type ContextMenuProps = MenuProps;
export function ContextMenu(props: ContextMenuProps) {
  return <NativeMenu {...props} context />;
}
