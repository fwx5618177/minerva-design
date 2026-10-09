import { useFormControlProps } from "../../internal/FormControlContext";
import { collectSelectOptions } from "./SelectParts";
import { Fragment, useMemo, useState, type ReactNode } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { createSelectionMachine } from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { Icon } from "../../internal/Icon";
import { Overlay, type OverlayCloseReason } from "../../internal/Overlay";
import { part } from "../../internal/parts";
import {
  controlFontSize,
  controlHeight,
  controlPaddingX,
  textStyle,
  weight,
  type NativeSize,
} from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";
import { useMachine } from "../../internal/useMachine";
import { useOverlay } from "../../internal/useOverlay";
import { PickerToolbar } from "../Picker/Picker";

/** An option of the list */
export interface SelectOption {
  group?: string;
  /** Visible text (also the accessible name of the row) */
  label: string;
  /** Value reported by `onChange` */
  value: string;
  /** Disables the row */
  disabled?: boolean;
  /** Secondary text under the label */
  description?: string;
}

/** Why the options sheet closed */
export type SelectCloseReason = OverlayCloseReason;

interface SelectBaseProps {
  readOnly?: boolean;
  children?: ReactNode;
  /**
   * The options
   * @default []
   */
  options?: SelectOption[];
  /** Controlled open state of the options sheet */
  open?: boolean;
  /**
   * Initial open state while uncontrolled
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Called with the requested open state (and, when closing, the reason:
   * "action" after a pick, "confirm", "cancel", "mask", "back")
   */
  onOpenChange?: (open: boolean, reason?: SelectCloseReason) => void;
  /** Text shown in the trigger while nothing is selected @default the "picker.placeholder" message */
  placeholder?: ReactNode;
  /**
   * Size of the trigger
   * @default "medium"
   */
  size?: NativeSize;
  /**
   * Shows the error state
   * @default false
   */
  invalid?: boolean;
  /**
   * Disables the select
   * @default false
   */
  disabled?: boolean;
  /** Visible label above the trigger; also its accessible name and the sheet title */
  label?: string;
  /** Title of the options sheet @default the label (else the placeholder) */
  title?: ReactNode;
  /**
   * Shows a search field filtering the options by label
   * @default false
   */
  searchable?: boolean;
  /** Accessible name of the trigger when there is no `label` */
  accessibilityLabel?: string;
  /** Style of the root view */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface SelectSingleProps extends SelectBaseProps {
  /**
   * Several values (checkboxes and a confirm button)
   * @default false
   */
  multiple?: false;
  /** Selected value (controlled; pair with `onChange`) */
  value?: string;
  /** Initially selected value (uncontrolled) */
  defaultValue?: string;
  /** Called with the picked value (the sheet then closes) */
  onChange?: (value: string) => void;
}

export interface SelectMultipleProps extends SelectBaseProps {
  /**
   * Several values (checkboxes and a confirm button)
   * @default false
   */
  multiple: true;
  /** Selected values (controlled; pair with `onChange`) */
  value?: string[];
  /** Initially selected values (uncontrolled) */
  defaultValue?: string[];
  /** Called with the confirmed values */
  onChange?: (value: string[]) => void;
}

export type SelectProps = SelectSingleProps | SelectMultipleProps;

const EMPTY: readonly string[] = [];

/**
 * A form-field trigger opening a bottom sheet of options: single choice
 * (a pick closes the sheet) or `multiple` (checkboxes, confirmed with the
 * confirm button), optional search. The selection runs on the selection
 * machine of @minerva/core, the sheet on the disclosure machine.
 */
export function Select(componentProps: SelectProps) {
  const props = useFormControlProps(componentProps);
  const {
    options: suppliedOptions,
    children,
    open,
    defaultOpen = false,
    onOpenChange,
    placeholder,
    size = "medium",
    invalid = false,
    disabled: disabledProp = false,
    readOnly = false,
    label,
    title,
    searchable = false,
    accessibilityLabel,
    style,
    testID,
  } = props;
  const disabled = disabledProp || readOnly;
  const options = useMemo(
    () => suppliedOptions ?? collectSelectOptions(children),
    [suppliedOptions, children],
  );
  const multiple = props.multiple === true;
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const overlay = useOverlay({ open, defaultOpen, onOpenChange });
  const [committed, setCommitted] = useControllable<
    string | string[] | undefined
  >(
    props.value,
    props.defaultValue,
    props.onChange as
      ((next: string | string[] | undefined) => void) | undefined,
  );
  const selectedValues = useMemo<readonly string[]>(
    () =>
      committed === undefined
        ? EMPTY
        : Array.isArray(committed)
          ? committed
          : [committed],
    [committed],
  );
  const [draft, setDraft] = useState<readonly string[]>(selectedValues);
  const [query, setQuery] = useState("");
  // each opening starts from the committed selection and an empty search
  const [wasOpen, setWasOpen] = useState(overlay.state.open);
  if (wasOpen !== overlay.state.open) {
    setWasOpen(overlay.state.open);
    if (overlay.state.open) {
      setDraft(selectedValues);
      setQuery("");
    }
  }

  const disabledValues = useMemo(
    () => new Set(options.filter((o) => o.disabled).map((o) => o.value)),
    [options],
  );
  const [selection, send] = useMachine(createSelectionMachine<string>, {
    mode: multiple ? "multiple" : "single",
    value: multiple ? draft : selectedValues,
    isDisabled: (v: string) => disabledValues.has(v),
    onValueChange: (next: string[]) => {
      if (multiple) setDraft(next);
      else if (next.length > 0) {
        setCommitted(next[0]);
        overlay.close("action");
      }
    },
  });

  const shownLabels = selectedValues
    .map((v) => options.find((o) => o.value === v)?.label ?? v)
    .join(", ");
  const height = controlHeight(t, size);
  const fontSize = controlFontSize(t, size);
  const placeholderNode = placeholder ?? translate("picker.placeholder");
  const sheetTitle =
    title ??
    label ??
    (typeof placeholderNode === "string" ? placeholderNode : undefined);
  const sheetTitleText =
    typeof sheetTitle === "string" ? sheetTitle : undefined;
  const q = query.trim().toLowerCase();
  const visible = q
    ? options.filter((o) => o.label.toLowerCase().includes(q))
    : options;
  const expanded = overlay.state.open;

  return (
    <View
      style={[{ gap: t.space["1-5"] }, style]}
      {...part("select", "root", { size, invalid, disabled, multiple })}
    >
      {label !== undefined && (
        <Text
          style={[
            textStyle(t, "sm", fonts.sans),
            {
              color: t.colors["text-secondary-color"],
              fontWeight: weight(t, "medium"),
            },
          ]}
          {...part("select", "label")}
        >
          {label}
        </Text>
      )}
      <Pressable
        accessibilityRole="combobox"
        accessibilityLabel={label ?? accessibilityLabel}
        accessibilityValue={{
          text:
            shownLabels ||
            (typeof placeholderNode === "string" ? placeholderNode : undefined),
        }}
        accessibilityState={{ expanded, disabled }}
        aria-expanded={expanded}
        aria-disabled={disabled}
        accessibilityHint={
          invalid ? translate("validation.selectMissing") : undefined
        }
        disabled={disabled}
        onPress={overlay.show}
        testID={testID}
        style={({ pressed }) => ({
          minHeight: height,
          flexDirection: "row",
          alignItems: "center",
          gap: t.space["2"],
          paddingHorizontal: controlPaddingX(
            t,
            size === "large" ? "medium" : "small",
          ),
          borderRadius: size === "small" ? t.radius.md : t.radius.lg,
          borderWidth: 1,
          borderColor: invalid
            ? t.colors["danger-color"]
            : expanded || pressed
              ? t.colors["primary-color"]
              : t.colors["border-strong-color"],
          backgroundColor: disabled
            ? t.colors["surface-muted-color"]
            : t.colors["surface-color"],
          opacity: disabled ? 0.6 : 1,
        })}
        {...part("select", "trigger", {
          state: expanded ? "open" : "closed",
          invalid,
          disabled,
        })}
      >
        <View style={{ flex: 1 }}>
          {shownLabels ? (
            <Text
              numberOfLines={1}
              style={[textStyle(t, fontSize, fonts.sans)]}
              {...part("select", "value")}
            >
              {shownLabels}
            </Text>
          ) : typeof placeholderNode === "string" ||
            typeof placeholderNode === "number" ? (
            <Text
              numberOfLines={1}
              style={[
                textStyle(t, fontSize, fonts.sans),
                { color: t.colors["text-muted-color"] },
              ]}
              {...part("select", "placeholder")}
            >
              {placeholderNode}
            </Text>
          ) : (
            placeholderNode
          )}
        </View>
        <Icon
          name={expanded ? "chevron-up" : "chevron-down"}
          size={14}
          color={t.colors["text-muted-color"]}
        />
      </Pressable>

      {overlay.state.phase !== "closed" && (
        <Overlay
          component="select"
          phase={overlay.state.phase}
          onAnimationEnd={overlay.onAnimationEnd}
          onRequestClose={overlay.close}
          placement="bottom"
          panelProps={{ role: "dialog", accessibilityLabel: sheetTitleText }}
        >
          {multiple ? (
            <PickerToolbar
              component="select"
              title={sheetTitle}
              cancelText={translate("picker.cancel")}
              confirmText={translate("picker.confirm")}
              onCancel={() => overlay.close("cancel")}
              onConfirm={() => {
                setCommitted([...draft]);
                overlay.close("confirm");
              }}
            />
          ) : (
            <View
              style={{
                alignItems: "center",
                paddingTop: t.space["2"],
                paddingBottom: t.space["3"],
                borderBottomWidth: 1,
                borderBottomColor: t.colors["border-color"],
                gap: t.space["2"],
              }}
              {...part("select", "header")}
            >
              <View
                style={{
                  width: 36,
                  height: 5,
                  borderRadius: 3,
                  backgroundColor: t.colors["border-strong-color"],
                }}
              />
              {sheetTitle !== undefined && (
                <Text
                  accessibilityRole="header"
                  style={[
                    textStyle(t, "md", fonts.sans),
                    { fontWeight: weight(t, "semibold") },
                  ]}
                  {...part("select", "title")}
                >
                  {sheetTitle}
                </Text>
              )}
            </View>
          )}
          {searchable && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: t.space["2"],
                margin: t.space["3"],
                marginBottom: t.space["1"],
                paddingHorizontal: t.space["3"],
                minHeight: t.sizes["control-height-sm"],
                borderRadius: t.radius.full,
                backgroundColor: t.colors["surface-muted-color"],
              }}
              {...part("select", "search")}
            >
              <Icon
                name="search"
                size={14}
                color={t.colors["text-muted-color"]}
              />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder={translate("searchBar.placeholder")}
                placeholderTextColor={t.colors["text-muted-color"]}
                accessibilityLabel={translate("searchBar.label")}
                autoCorrect={false}
                style={[
                  textStyle(t, "md", fonts.sans),
                  { flex: 1, paddingVertical: t.space["2"] },
                ]}
              />
            </View>
          )}
          <ScrollView
            style={{ flexGrow: 0 }}
            contentContainerStyle={{ paddingVertical: t.space["1"] }}
            keyboardShouldPersistTaps="handled"
            role={multiple ? "list" : "radiogroup"}
            accessibilityLabel={sheetTitleText}
            {...part("select", "listbox")}
          >
            {visible.length === 0 ? (
              <Text
                style={[
                  textStyle(t, "md", fonts.sans),
                  {
                    color: t.colors["text-muted-color"],
                    textAlign: "center",
                    padding: t.space["6"],
                  },
                ]}
                {...part("select", "empty")}
              >
                {translate("empty.description")}
              </Text>
            ) : (
              visible.map((option, index) => {
                const checked = selection.value.includes(option.value);
                const off = !!option.disabled;
                return (
                  <Fragment key={option.value}>
                    {Boolean(option.group) &&
                      option.group !== visible[index - 1]?.group && (
                        <Text
                          accessibilityRole="header"
                          style={[
                            textStyle(t, "sm", fonts.sans),
                            {
                              paddingHorizontal: t.space["5"],
                              paddingVertical: t.space["2"],
                            },
                          ]}
                        >
                          {option.group}
                        </Text>
                      )}
                    <Pressable
                      accessibilityRole={multiple ? "checkbox" : "radio"}
                      accessibilityLabel={option.label}
                      accessibilityHint={option.description}
                      accessibilityState={{ checked, disabled: off }}
                      aria-checked={checked}
                      aria-disabled={off}
                      disabled={off}
                      onPress={() => {
                        // picking the current value just closes the sheet
                        if (!multiple && checked) overlay.close("action");
                        else
                          send({
                            type: multiple ? "TOGGLE" : "SELECT",
                            value: option.value,
                          });
                      }}
                      style={({ pressed }) => ({
                        minHeight:
                          Math.max(t.touchTargetMin, 44) + t.space["2"],
                        flexDirection: "row",
                        alignItems: "center",
                        gap: t.space["3"],
                        paddingHorizontal: t.space["5"],
                        paddingVertical: t.space["2"],
                        backgroundColor:
                          pressed && !off
                            ? t.colors["surface-muted-color"]
                            : "transparent",
                      })}
                      {...part("select", "option", {
                        selected: checked,
                        disabled: off,
                      })}
                    >
                      {multiple && (
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: t.radius.sm,
                            borderWidth: checked ? 0 : 1.5,
                            borderColor: t.colors["border-strong-color"],
                            backgroundColor: checked
                              ? t.colors["primary-color"]
                              : "transparent",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {checked && (
                            <Icon
                              name="check"
                              size={14}
                              color={t.colors["text-inverse-color"]}
                            />
                          )}
                        </View>
                      )}
                      <View style={{ flex: 1, gap: t.space["0-5"] }}>
                        <Text
                          style={[
                            textStyle(t, "md", fonts.sans),
                            {
                              color: off
                                ? t.colors["text-disabled-color"]
                                : checked && !multiple
                                  ? t.colors["primary-color"]
                                  : t.colors["text-color"],
                              fontWeight:
                                checked && !multiple
                                  ? weight(t, "semibold")
                                  : undefined,
                            },
                          ]}
                        >
                          {option.label}
                        </Text>
                        {option.description !== undefined && (
                          <Text
                            style={[
                              textStyle(t, "sm", fonts.sans),
                              {
                                color: off
                                  ? t.colors["text-disabled-color"]
                                  : t.colors["text-muted-color"],
                              },
                            ]}
                          >
                            {option.description}
                          </Text>
                        )}
                      </View>
                      {!multiple && checked && (
                        <Icon
                          name="check"
                          size={18}
                          color={t.colors["primary-color"]}
                        />
                      )}
                    </Pressable>
                  </Fragment>
                );
              })
            )}
          </ScrollView>
        </Overlay>
      )}
    </View>
  );
}
