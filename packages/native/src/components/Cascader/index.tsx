import { useFormControlProps } from "../../internal/FormControlContext";
import { useState, type ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { findCascaderPath, flattenCascaderOptions } from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { textStyle } from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";
import { Dialog } from "../Dialog";
import { Input } from "../Input";
import { Button } from "../Button";
export interface CascaderOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  children?: CascaderOption[];
  isLeaf?: boolean;
  loading?: boolean;
}
export interface CascaderProps {
  options: CascaderOption[];
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  onChange?: (value: (string | number)[], options: CascaderOption[]) => void;
  label?: string;
  placeholder?: string;
  /** @default false */
  disabled?: boolean;
  readOnly?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  changeOnSelect?: boolean;
  /** @default false */
  showSearch?: boolean;
  filter?: (query: string, path: CascaderOption[]) => boolean;
  loadData?: (path: CascaderOption[]) => void;
  displayRender?: (labels: string[], path: CascaderOption[]) => ReactNode;
  optionRender?: (option: CascaderOption, level: number) => ReactNode;
  /** @default true */
  allowClear?: boolean;
  /** @default 6 */
  maxLevel?: number;
}
/** Touch drill-down picker with breadcrumbs; lazy children remain owned by options. */
export function Cascader(componentProps: CascaderProps) {
  const {
    options,
    value,
    defaultValue = [],
    onChange,
    label,
    placeholder,
    disabled = false,
    readOnly = false,
    open,
    defaultOpen = false,
    onOpenChange,
    changeOnSelect = false,
    showSearch = false,
    filter,
    loadData,
    displayRender,
    optionRender,
    allowClear = true,
    maxLevel = 6,
  } = useFormControlProps(componentProps);
  const { tokens: t } = useTheme();
  const { t: translate } = useI18n();
  const [selected, setSelected] = useControllable(value, defaultValue, (next) =>
    onChange?.(next, findCascaderPath(options, next)),
  );
  const [expanded, setExpanded] = useState<(string | number)[]>([]);
  const [shown, setShown] = useControllable(open, defaultOpen, onOpenChange);
  const [query, setQuery] = useState("");
  const path = findCascaderPath(options, expanded);
  const selectedPath = findCascaderPath(options, selected);
  const current = path.at(-1)?.children ?? (path.length ? [] : options);
  const text = selectedPath.map((o) => o.label).join(" / ");
  const choose = (next: CascaderOption[]) => {
    const option = next.at(-1)!;
    if (disabled || readOnly || next.some((o) => o.disabled)) return;
    const branch = !!option.children?.length || (!!loadData && !option.isLeaf);
    const values = next.map((o) => o.value);
    if (branch && next.length < maxLevel) {
      setExpanded(values);
      if (!option.children?.length) loadData?.(next);
      if (changeOnSelect) setSelected(values);
    } else {
      setSelected(values);
      setShown(false);
      setQuery("");
    }
  };
  const entries = query
    ? flattenCascaderOptions(options).filter(
        (entry) =>
          (changeOnSelect ||
            (!entry.option.children?.length &&
              (!loadData || entry.option.isLeaf))) &&
          (filter
            ? filter(query, entry.path)
            : entry.path
                .map((o) => o.label)
                .join(" / ")
                .toLowerCase()
                .includes(query.toLowerCase())),
      )
    : current.map((option) => ({ option, path: [...path, option] }));
  return (
    <View>
      <Pressable
        accessibilityRole="combobox"
        accessibilityLabel={label}
        accessibilityState={{ expanded: shown, disabled: disabled || readOnly }}
        accessibilityValue={{
          text: text || placeholder || translate("picker.placeholder"),
        }}
        disabled={disabled || readOnly}
        onPress={() => {
          setExpanded(selected.slice(0, -1));
          setShown(true);
        }}
        style={{
          minHeight: t.touchTargetMin,
          padding: t.space["3"],
          borderWidth: 1,
          borderColor: t.colors["border-color"],
          borderRadius: t.radius.md,
        }}
      >
        <Text style={textStyle(t)}>
          {selectedPath.length
            ? (displayRender?.(
                selectedPath.map((o) => o.label),
                selectedPath,
              ) ?? text)
            : (placeholder ?? translate("picker.placeholder"))}
        </Text>
      </Pressable>
      {allowClear && selected.length > 0 && !disabled && !readOnly && (
        <Button variant="link" onPress={() => setSelected([])}>
          Clear
        </Button>
      )}
      <Dialog
        open={shown}
        onOpenChange={setShown}
        title={label ?? translate("picker.placeholder")}
      >
        <View style={{ gap: t.space["2"] }}>
          {showSearch && (
            <Input
              accessibilityLabel="Search options"
              placeholder={translate("searchBar.placeholder")}
              value={query}
              onChange={setQuery}
            />
          )}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Button variant="link" onPress={() => setExpanded([])}>
              All
            </Button>
            {path.map((option, index) => (
              <Button
                key={option.value}
                variant="link"
                onPress={() => setExpanded(expanded.slice(0, index + 1))}
              >
                {option.label}
              </Button>
            ))}
          </View>
          {path.at(-1)?.loading && <ActivityIndicator />}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{ maxHeight: 320 }}
          >
            {entries.map((entry) => (
              <Pressable
                key={JSON.stringify(entry.path.map((o) => o.value))}
                accessibilityRole="button"
                accessibilityLabel={
                  query
                    ? entry.path.map((o) => o.label).join(" / ")
                    : entry.option.label
                }
                disabled={entry.option.disabled || entry.option.loading}
                accessibilityState={{
                  disabled: entry.option.disabled,
                  busy: entry.option.loading,
                }}
                onPress={() => choose(entry.path)}
                style={{
                  minHeight: t.touchTargetMin,
                  padding: t.space["3"],
                  opacity: entry.option.disabled ? 0.5 : 1,
                }}
              >
                {optionRender?.(entry.option, entry.path.length - 1) ?? (
                  <Text style={textStyle(t)}>
                    {query
                      ? entry.path.map((o) => o.label).join(" / ")
                      : entry.option.label}
                    {entry.option.children?.length ? " ›" : ""}
                  </Text>
                )}
              </Pressable>
            ))}
            {!entries.length && !path.at(-1)?.loading && (
              <Text style={textStyle(t)}>{translate("empty.description")}</Text>
            )}
          </ScrollView>
        </View>
      </Dialog>
    </View>
  );
}
