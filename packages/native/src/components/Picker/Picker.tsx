import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  type AccessibilityActionEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import {
  createPickerMachine,
  getPickerColumns,
  getPickerSelectedOptions,
  type PickerColumn,
  type PickerOption as CorePickerOption,
} from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { Overlay, type OverlayCloseReason } from "../../internal/Overlay";
import { part } from "../../internal/parts";
import { useControllable } from "../../internal/useControllable";
import { useMachine } from "../../internal/useMachine";
import { useOverlay } from "../../internal/useOverlay";
import { hitSlopFor, textStyle, weight } from "../../internal/styles";

/** Value of a picker option */
export type PickerValue = string | number;

/** An option of a column; `children` feed the next column (cascade) */
export type PickerOption = CorePickerOption<PickerValue>;

export interface PickerViewProps {
  /** Cascading options tree: the first column, `children` the next ones */
  options?: readonly PickerOption[];
  /** Independent columns (used when `options` is not set) */
  columns?: readonly (readonly PickerOption[])[];
  /** Controlled value path, one value per column */
  value?: readonly PickerValue[];
  /** Initial value path while uncontrolled (missing levels pick the first enabled option) */
  defaultValue?: readonly PickerValue[];
  /** Called with the value path and the chosen options when a column changes */
  onChange?: (values: PickerValue[], selectedOptions: PickerOption[]) => void;
  /**
   * Height of a row in dp
   * @default 44
   */
  itemHeight?: number;
  /**
   * Rows visible in each wheel (odd: the middle one is the selection)
   * @default 5
   */
  visibleItemCount?: number;
  /** Accessible names of the columns @default the "picker.column" message */
  columnLabels?: readonly string[];
  /** Style of the wheels container */
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * The options given by the caller for a resolved path: in `columns` mode
 * the column options themselves (not their tree copies)
 */
export function originalOptions(
  selected: readonly PickerOption[],
  columns: readonly (readonly PickerOption[])[] | undefined,
): PickerOption[] {
  return columns
    ? selected.map(
        (o, i) => columns[i]?.find((c) => Object.is(c.value, o.value)) ?? o,
      )
    : [...selected];
}

/** Turns independent columns into an equivalent options tree */
export function columnsToTree(
  columns: readonly (readonly PickerOption[])[],
): PickerOption[] {
  let next: PickerOption[] | undefined;
  for (let i = columns.length - 1; i >= 0; i--) {
    const children = next;
    next = columns[i].map((o) =>
      children ? { ...o, children } : { ...o, children: undefined },
    );
  }
  return next ?? [];
}

const isWeb = Platform.OS === "web";

interface WheelProps {
  column: PickerColumn<PickerValue>;
  index: number;
  itemHeight: number;
  visible: number;
  label: string;
  onSelect: (index: number) => void;
  onStep: (delta: number) => void;
}

const nearestEnabled = (
  options: readonly PickerOption[],
  index: number,
): number => {
  const clamped = Math.min(options.length - 1, Math.max(0, index));
  for (let d = 0; d < options.length; d++) {
    if (options[clamped + d] && !options[clamped + d].disabled)
      return clamped + d;
    if (options[clamped - d] && !options[clamped - d].disabled)
      return clamped - d;
  }
  return -1;
};

const samePath = (a: readonly PickerValue[], b: readonly PickerValue[]) =>
  a.length === b.length && a.every((v, i) => Object.is(v, b[i]));

const labelOf = (o: PickerOption | undefined) =>
  o === undefined ? "" : (o.label ?? String(o.value));

function Wheel({
  column,
  index,
  itemHeight,
  visible,
  label,
  onSelect,
  onStep,
}: WheelProps) {
  const { tokens: t, fonts } = useTheme();
  const scroll = useRef<ScrollView>(null);
  const settle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const selected = column.selectedIndex;
  const [initial] = useState(() => Math.max(0, selected) * itemHeight);
  const mounted = useRef(false);

  useEffect(() => {
    if (selected < 0) return;
    scroll.current?.scrollTo?.({
      y: selected * itemHeight,
      animated: mounted.current,
    });
    mounted.current = true;
  }, [selected, itemHeight]);
  useEffect(() => () => clearTimeout(settle.current), []);

  const land = (y: number) => {
    const target = nearestEnabled(column.options, Math.round(y / itemHeight));
    if (target < 0) return;
    scroll.current?.scrollTo?.({ y: target * itemHeight, animated: true });
    if (target !== selected) onSelect(target);
  };
  const onEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) =>
    land(e.nativeEvent.contentOffset.y);
  const pad = ((visible - 1) / 2) * itemHeight;
  const current = column.options[selected];

  return (
    <View
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={label}
      accessibilityValue={{ text: labelOf(current) }}
      aria-valuetext={labelOf(current)}
      accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
      onAccessibilityAction={(e: AccessibilityActionEvent) => {
        if (e.nativeEvent.actionName === "increment") onStep(1);
        else if (e.nativeEvent.actionName === "decrement") onStep(-1);
      }}
      style={{ flex: 1, height: itemHeight * visible }}
      {...part("picker", "column", { index: String(index) })}
    >
      <ScrollView
        ref={scroll}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        contentOffset={{ x: 0, y: initial }}
        contentContainerStyle={{ paddingVertical: pad }}
        onMomentumScrollEnd={onEnd}
        onScrollEndDrag={(e) => {
          // no momentum (slow drag): settle now; else onMomentumScrollEnd
          const v = e.nativeEvent.velocity?.y ?? 0;
          if (Math.abs(v) < 0.05) onEnd(e);
        }}
        onScroll={
          isWeb
            ? (e) => {
                // react-native-web has no momentum events: settle on idle
                const y = e.nativeEvent.contentOffset.y;
                clearTimeout(settle.current);
                settle.current = setTimeout(() => land(y), 120);
              }
            : undefined
        }
        scrollEventThrottle={16}
        nestedScrollEnabled
        {...part("picker", "wheel")}
      >
        {column.options.map((option, i) => {
          const active = i === selected;
          return (
            <Pressable
              key={`${String(option.value)}-${i}`}
              accessible={false}
              disabled={option.disabled}
              onPress={() => {
                scroll.current?.scrollTo?.({
                  y: i * itemHeight,
                  animated: true,
                });
                onSelect(i);
              }}
              style={{
                height: itemHeight,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: t.space["2"],
              }}
              {...part("picker", "option", {
                selected: active,
                disabled: !!option.disabled,
              })}
            >
              <Text
                numberOfLines={1}
                style={[
                  textStyle(t, active ? "lg" : "md", fonts.sans),
                  {
                    color: option.disabled
                      ? t.colors["text-disabled-color"]
                      : active
                        ? t.colors["text-color"]
                        : t.colors["text-muted-color"],
                    fontWeight: active ? weight(t, "semibold") : undefined,
                  },
                ]}
              >
                {labelOf(option)}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

/**
 * Inline wheel columns (cascading `options` tree or independent
 * `columns`) on the picker machine of @minerva/core: scroll, tap a row, or
 * swipe up / down with a screen reader (each column is an adjustable
 * control announcing its value).
 */
export function PickerView({
  options,
  columns,
  value,
  defaultValue,
  onChange,
  itemHeight = 44,
  visibleItemCount = 5,
  columnLabels,
  style,
  testID,
}: PickerViewProps) {
  const { tokens: t } = useTheme();
  const { t: translate } = useI18n();
  const tree = useMemo(
    () => options ?? columnsToTree(columns ?? []),
    [options, columns],
  );
  // controlled paths must be resolved and referentially stable: the
  // machine compares them by identity
  const resolved =
    value === undefined ? undefined : resolvePickerValue(tree, value).values;
  const [stable, setStable] = useState(resolved);
  let controlled = stable;
  if (
    resolved === undefined
      ? stable !== undefined
      : stable === undefined || !samePath(stable, resolved)
  ) {
    setStable(resolved);
    controlled = resolved;
  }
  const [state, send] = useMachine(createPickerMachine<PickerValue>, {
    options: tree,
    value: controlled,
    defaultValue,
    onValueChange: onChange
      ? (values, selected) =>
          onChange(
            values,
            originalOptions(selected, options ? undefined : columns),
          )
      : undefined,
  });
  const wheels = getPickerColumns(tree, state.value);
  const visible = Math.max(1, visibleItemCount | 1);

  return (
    <View
      testID={testID}
      {...part("picker", "columns")}
      style={[
        {
          flexDirection: "row",
          height: itemHeight * visible,
          paddingHorizontal: t.space["2"],
        },
        style,
      ]}
    >
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: t.space["3"],
          right: t.space["3"],
          top: ((visible - 1) / 2) * itemHeight,
          height: itemHeight,
          borderRadius: t.radius.md,
          backgroundColor: t.colors["surface-muted-color"],
        }}
        {...part("picker", "highlight")}
      />
      {wheels.map((column, i) => (
        <Wheel
          key={i}
          column={column}
          index={i}
          itemHeight={itemHeight}
          visible={visible}
          label={
            columnLabels?.[i] ?? translate("picker.column", { index: i + 1 })
          }
          onSelect={(index) => send({ type: "SELECT", column: i, index })}
          onStep={(delta) => send({ type: "STEP", column: i, delta })}
        />
      ))}
    </View>
  );
}

/** Why a picker closed */
export type PickerCloseReason = OverlayCloseReason;

export interface PickerProps extends Omit<
  PickerViewProps,
  "value" | "defaultValue" | "onChange" | "style"
> {
  /** Controlled confirmed value path */
  value?: readonly PickerValue[];
  /** Initial confirmed value path while uncontrolled */
  defaultValue?: readonly PickerValue[];
  /** Called on confirm with the value path and the chosen options */
  onChange?: (values: PickerValue[], selectedOptions: PickerOption[]) => void;
  /** Called when the cancel button closes the sheet */
  onCancel?: () => void;
  /** Called while scrolling with the pending (unconfirmed) values */
  onPick?: (values: PickerValue[], selectedOptions: PickerOption[]) => void;
  /** Controlled open state */
  open?: boolean;
  /**
   * Initial open state while uncontrolled
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Called with the requested open state and, when closing, the reason
   * ("confirm", "cancel", "mask", "back")
   */
  onOpenChange?: (open: boolean, reason?: PickerCloseReason) => void;
  /** Title in the toolbar (also the accessible name of the sheet) */
  title?: ReactNode;
  /** Text of the confirm button @default the "picker.confirm" message */
  confirmText?: ReactNode;
  /** Text of the cancel button @default the "picker.cancel" message */
  cancelText?: ReactNode;
  /**
   * Closes on a press on the mask
   * @default true
   */
  closeOnMaskPress?: boolean;
  /** Style of the sheet */
  style?: StyleProp<ViewStyle>;
}

/** Resolved value path and options of a tree for a (partial) value */
export function resolvePickerValue(
  tree: readonly PickerOption[],
  value: readonly PickerValue[],
): { values: PickerValue[]; options: PickerOption[] } {
  const options = getPickerSelectedOptions(getPickerColumns(tree, value));
  return { values: options.map((o) => o.value), options };
}

/** The cancel / title / confirm bar of the picker sheets */
export function PickerToolbar({
  title,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  component = "picker",
}: {
  title?: ReactNode;
  cancelText: ReactNode;
  confirmText: ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  component?: string;
}) {
  const { tokens: t, fonts } = useTheme();
  const height = t.sizes["control-height-md"];
  const button = (
    text: ReactNode,
    onPress: () => void,
    primary: boolean,
    name: string,
  ) => (
    <Pressable
      accessibilityRole="button"
      hitSlop={hitSlopFor(t, height)}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: height,
        paddingHorizontal: t.space["4"],
        justifyContent: "center",
        opacity: pressed ? 0.6 : 1,
      })}
      {...part(component, name)}
    >
      {typeof text === "string" || typeof text === "number" ? (
        <Text
          style={[
            textStyle(t, "md", fonts.sans),
            {
              color: primary
                ? t.colors["primary-color"]
                : t.colors["text-secondary-color"],
              fontWeight: weight(t, primary ? "semibold" : "regular"),
            },
          ]}
        >
          {text}
        </Text>
      ) : (
        text
      )}
    </Pressable>
  );
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        minHeight: height + t.space["2"],
        borderBottomWidth: 1,
        borderBottomColor: t.colors["border-color"],
      }}
      {...part(component, "toolbar")}
    >
      {button(cancelText, onCancel, false, "cancel")}
      <View style={{ flex: 1, alignItems: "center" }}>
        {title !== undefined && title !== null && (
          <Text
            accessibilityRole="header"
            numberOfLines={1}
            style={[
              textStyle(t, "md", fonts.sans),
              { fontWeight: weight(t, "semibold") },
            ]}
            {...part(component, "title")}
          >
            {title}
          </Text>
        )}
      </View>
      {button(confirmText, onConfirm, true, "confirm")}
    </View>
  );
}

/**
 * A bottom-sheet wheel picker: toolbar (cancel / title / confirm) over
 * `PickerView` columns. The pending choice is confirmed with the confirm
 * button (`onChange(values, selectedOptions)`) or dropped with cancel /
 * the mask / Android back.
 */
export function Picker({
  options,
  columns,
  value,
  defaultValue,
  onChange,
  onCancel,
  onPick,
  open,
  defaultOpen = false,
  onOpenChange,
  title,
  confirmText,
  cancelText,
  closeOnMaskPress = true,
  itemHeight,
  visibleItemCount,
  columnLabels,
  style,
  testID,
}: PickerProps) {
  const { tokens: t } = useTheme();
  const { t: translate } = useI18n();
  const overlay = useOverlay({ open, defaultOpen, onOpenChange });
  const tree = useMemo(
    () => options ?? columnsToTree(columns ?? []),
    [options, columns],
  );
  const [committed, setCommitted] = useControllable<readonly PickerValue[]>(
    value,
    defaultValue ?? [],
  );
  const [draft, setDraft] = useState<readonly PickerValue[]>(committed);
  // each opening starts from the confirmed value
  const [wasOpen, setWasOpen] = useState(overlay.state.open);
  if (wasOpen !== overlay.state.open) {
    setWasOpen(overlay.state.open);
    if (overlay.state.open) setDraft(committed);
  }
  if (overlay.state.phase === "closed") return null;

  const titleText =
    typeof title === "string" || typeof title === "number"
      ? String(title)
      : undefined;

  return (
    <Overlay
      component="picker"
      phase={overlay.state.phase}
      onAnimationEnd={overlay.onAnimationEnd}
      onRequestClose={overlay.close}
      placement="bottom"
      closeOnMaskPress={closeOnMaskPress}
      testID={testID}
      panelProps={{ role: "dialog", accessibilityLabel: titleText }}
      panelStyle={style}
    >
      <PickerToolbar
        title={title}
        cancelText={cancelText ?? translate("picker.cancel")}
        confirmText={confirmText ?? translate("picker.confirm")}
        onCancel={() => {
          onCancel?.();
          overlay.close("cancel");
        }}
        onConfirm={() => {
          const resolved = resolvePickerValue(tree, draft);
          setCommitted(resolved.values);
          onChange?.(
            resolved.values,
            originalOptions(resolved.options, options ? undefined : columns),
          );
          overlay.close("confirm");
        }}
      />
      <PickerView
        options={tree}
        value={draft}
        onChange={(values) => {
          setDraft(values);
          if (onPick) {
            const resolved = resolvePickerValue(tree, values);
            onPick(
              resolved.values,
              originalOptions(resolved.options, options ? undefined : columns),
            );
          }
        }}
        itemHeight={itemHeight}
        visibleItemCount={visibleItemCount}
        columnLabels={
          columnLabels ??
          (titleText && tree.length > 0 && !tree.some((o) => o.children)
            ? [titleText]
            : undefined)
        }
        style={{ marginVertical: t.space["2"] }}
      />
    </Overlay>
  );
}
