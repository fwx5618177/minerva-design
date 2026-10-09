import { useH5List, useH5Layer } from "./h5";
import {
  Children,
  isValidElement,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useId,
  type ReactNode,
  type CSSProperties,
} from "react";
import {
  View,
  Text,
  ScrollView,
  Textarea as NativeTextarea,
  Input as NativeInput,
  CheckboxGroup as NativeCheckboxGroup,
  Checkbox as NativeCheckbox,
  type ITouchEvent,
} from "@tarojs/components";
import type { TextareaProps as HostTextareaProps } from "@tarojs/components";
import {
  splitBySeparators,
  DEFAULT_TAG_SEPARATORS,
  findCascaderPath,
  flattenCascaderOptions,
  formatNumberValue,
  clampNumber,
  inferStepPrecision,
  parseNumberDraft,
  cn,
} from "@minerva/core";
import { useI18n } from "./theme";
import { Button, Input, type InputProps } from "./components";
import {
  Part,
  useValue,
  useNativeAnchoredPosition,
  type NativeProps,
} from "./shared";
export interface FieldState {
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  id?: string;
}
const FieldContext = createContext<FieldState>({});
export function useFieldState() {
  return useContext(FieldContext);
}
export interface FormControlProps extends NativeProps, FieldState {
  label?: ReactNode;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  requiredIndicator?: ReactNode;
}
export function FormControl({
  children,
  label,
  helperText,
  errorMessage,
  requiredIndicator = "*",
  ...props
}: FormControlProps) {
  return (
    <FieldContext.Provider value={props}>
      <Part name="form-control" id={props.id} className={props.className}>
        {label && (
          <FormLabel requiredIndicator={requiredIndicator}>{label}</FormLabel>
        )}
        {children}
        {props.invalid && errorMessage ? (
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        ) : (
          helperText && <FormHelperText>{helperText}</FormHelperText>
        )}
      </Part>
    </FieldContext.Provider>
  );
}
export function FormField(props: FormControlProps) {
  return <FormControl {...props} />;
}
export function FormLabel({
  requiredIndicator = "*",
  children,
  ...props
}: NativeProps & { requiredIndicator?: ReactNode }) {
  const field = useFieldState();
  return (
    <Part name="form-control" part="label" {...props}>
      {children}
      {field.required && (
        <Text className="mn-required">{requiredIndicator}</Text>
      )}
    </Part>
  );
}
export function FormHelperText(props: NativeProps) {
  return <Part name="form-control" part="helper" {...props} />;
}
export function FormErrorMessage(props: NativeProps) {
  return <Part name="form-control" part="error" role="alert" {...props} />;
}
export interface TextareaProps
  extends
    Omit<HostTextareaProps, "onInput" | "onChange" | "defaultValue" | "value">,
    FieldState {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  rows?: number;
  variant?: string;
  size?: string;
}
export function Textarea({
  value,
  defaultValue = "",
  onChange,
  disabled,
  readOnly,
  invalid,
  rows = 3,
  className,
  style,
  variant = "outline",
  size = "medium",
  ...props
}: TextareaProps) {
  const field = useFieldState();
  const [current, set] = useValue(value, defaultValue, onChange);
  const locked = disabled ?? field.disabled,
    ro = readOnly ?? field.readOnly;
  return (
    <NativeTextarea
      {...props}
      value={current}
      disabled={locked || ro}
      aria-invalid={invalid ?? field.invalid}
      data-minerva="textarea"
      data-part="input"
      className={cn(
        "mn-textarea",
        `mn-variant-${variant}`,
        `mn-size-${size}`,
        className,
      )}
      style={{ minHeight: rows * 24, ...(style as object) }}
      onInput={(event) => {
        if (!locked && !ro) set(event.detail.value);
      }}
    />
  );
}
export interface CheckboxProps extends NativeProps, FieldState {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: ITouchEvent) => void;
  value?: string;
  label?: ReactNode;
  name?: string;
  indeterminate?: boolean;
  size?: string;
  color?: string;
  shape?: string;
  error?: boolean;
  helperText?: ReactNode;
  labelPlacement?: "start" | "end" | "top" | "bottom";
  icon?: ReactNode;
  errorIcon?: ReactNode;
}
interface SelectionContext {
  value: string[];
  set: (value: string[]) => void;
  disabled?: boolean;
  max?: number;
}
const CheckboxContext = createContext<SelectionContext | null>(null);
export function Checkbox({
  checked,
  defaultChecked = false,
  onChange,
  value = "",
  label,
  children,
  disabled,
  readOnly,
  indeterminate,
  className,
  icon,
  errorIcon = "!",
  error,
  size = "medium",
  color = "primary",
  shape = "square",
  labelPlacement = "end",
  ...props
}: CheckboxProps) {
  const field = useFieldState(),
    group = useContext(CheckboxContext);
  const [local, set] = useValue(checked, defaultChecked);
  const helperId = useId();
  const invalid = error || field.invalid;
  const active = group ? group.value.includes(value) : local;
  const locked =
    (disabled ?? field.disabled) ||
    (readOnly ?? field.readOnly) ||
    group?.disabled;
  return (
    <View
      className={cn(
        "mn-checkbox",
        `mn-size-${size}`,
        `mn-color-${color}`,
        `mn-shape-${shape}`,
        invalid && "mn-invalid",
        className,
      )}
      style={props.style}
      data-minerva="checkbox"
      data-part="root"
    >
      {active && props.name && (
        <NativeInput
          name={props.name}
          value={value || "on"}
          disabled={locked}
          style={{ display: "none" }}
        />
      )}
      <Button
        variant="ghost"
        {...{ role: "checkbox" }}
        color={color}
        className={cn("mn-choice-control", `mn-label-${labelPlacement}`)}
        aria-invalid={invalid}
        aria-required={props.required ?? field.required}
        aria-describedby={
          [props["aria-describedby"], props.helperText && helperId]
            .filter(Boolean)
            .join(" ") || undefined
        }
        aria-label={
          props["aria-label"] ?? (typeof label === "string" ? label : undefined)
        }
        aria-checked={indeterminate ? "mixed" : active}
        disabled={locked}
        onClick={(event) => {
          if (locked) return;
          if (group) {
            if (
              !active &&
              group.max !== undefined &&
              group.value.length >= group.max
            )
              return;
            group.set(
              active
                ? group.value.filter((v) => v !== value)
                : [...group.value, value],
            );
          } else {
            set(!active);
            onChange?.(!active, event);
          }
        }}
      >
        <Text aria-hidden className={cn("mn-check", active && "mn-selected")}>
          {indeterminate ? "−" : active ? (icon ?? "✓") : ""}
        </Text>
        {label ?? children}
      </Button>
      {props.helperText && (
        <View id={helperId} className={invalid ? "mn-error" : "mn-helper"}>
          {invalid && <Text>{errorIcon}</Text>}
          <Text>{props.helperText}</Text>
        </View>
      )}
    </View>
  );
}
export interface SelectionOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}
export interface CheckboxGroupProps extends NativeProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  options?: SelectionOption[];
  disabled?: boolean;
  max?: number;
  direction?: "horizontal" | "vertical";
  label?: ReactNode;
}
export function CheckboxGroup({
  value,
  defaultValue = [],
  onChange,
  options,
  children,
  disabled,
  max,
  direction = "vertical",
  label,
  ...props
}: CheckboxGroupProps) {
  const [current, set] = useValue(value, defaultValue, onChange);
  return (
    <CheckboxContext.Provider value={{ value: current, set, disabled, max }}>
      <Part
        name="checkbox-group"
        role="group"
        {...props}
        className={cn(`mn-direction-${direction}`, props.className)}
      >
        {label}
        {options?.map((option) => (
          <Checkbox key={option.value} {...option} />
        ))}
        {children}
      </Part>
    </CheckboxContext.Provider>
  );
}
const RadioContext = createContext<{
  value: string | number | null;
  set: (value: string | number, event: ITouchEvent) => void;
  name?: string;
  disabled?: boolean;
  size?: string;
  color?: string;
  error?: boolean;
} | null>(null);
export interface RadioProps extends Omit<CheckboxProps, "value"> {
  errorMessage?: string;
  value?: string | number;
}
export function Radio({
  checked,
  defaultChecked = false,
  onChange,
  value,
  label,
  children,
  disabled,
  readOnly,
  className,
  error,
  errorIcon = "!",
  errorMessage,
  helperText,
  size,
  color,
  ...props
}: RadioProps) {
  const field = useFieldState(),
    group = useContext(RadioContext);
  const [local, set] = useValue(checked, defaultChecked);
  const active = group ? value !== undefined && group.value === value : local;
  const invalid = error || field.invalid;
  const message = invalid ? errorMessage : helperText;
  const helperId = useId();
  return (
    <View className="mn-radio-field" style={props.style}>
      {active && (group?.name ?? props.name) && (
        <NativeInput
          name={group?.name ?? props.name}
          value={value === undefined ? "on" : String(value)}
          disabled={disabled ?? field.disabled}
          style={{ display: "none" }}
        />
      )}
      <Button
        variant="ghost"
        {...{ role: "radio" }}
        className={cn(
          "mn-radio",
          `mn-size-${group?.size ?? size ?? "medium"}`,
          `mn-color-${group?.color ?? color ?? "primary"}`,
          invalid && "mn-invalid",
          className,
        )}
        aria-invalid={invalid}
        aria-required={props.required ?? field.required}
        aria-describedby={
          [props["aria-describedby"], message && helperId]
            .filter(Boolean)
            .join(" ") || undefined
        }
        aria-label={
          props["aria-label"] ?? (typeof label === "string" ? label : undefined)
        }
        aria-checked={active}
        disabled={
          (disabled ?? field.disabled) ||
          (readOnly ?? field.readOnly) ||
          group?.disabled
        }
        onClick={(event) => {
          if (group) {
            if (value !== undefined) group.set(value, event);
          } else if (!active) {
            set(true);
            onChange?.(true, event);
          }
        }}
      >
        <Text
          aria-hidden
          className={cn("mn-radio-mark", active && "mn-selected")}
        >
          {active ? "●" : "○"}
        </Text>
        {label ?? children}
      </Button>
      {message && (
        <View id={helperId} className={invalid ? "mn-error" : "mn-helper"}>
          {invalid && <Text>{errorIcon}</Text>}
          <Text>{message}</Text>
        </View>
      )}
    </View>
  );
}
export interface RadioGroupProps extends Omit<
  CheckboxGroupProps,
  "value" | "defaultValue" | "onChange" | "max"
> {
  value?: string | number | null;
  defaultValue?: string | number;
  onChange?: (value: string | number, event: ITouchEvent) => void;
  size?: string;
  color?: string;
  error?: boolean;
  helperText?: ReactNode;
  name?: string;
  required?: boolean;
}
export function RadioGroup({
  value,
  defaultValue,
  onChange,
  options,
  children,
  disabled,
  label,
  direction = "vertical",
  size,
  color,
  error,
  helperText,
  name,
  required,
  ...props
}: RadioGroupProps) {
  const [current, set] = useValue<string | number | null>(
    value,
    defaultValue ?? null,
  );
  const helperId = useId();
  const field = useFieldState();
  return (
    <RadioContext.Provider
      value={{
        value: current,
        set: (next, event) => {
          if (Object.is(current, next)) return;
          set(next);
          onChange?.(next, event);
        },
        name: name ?? helperId,
        disabled: disabled ?? field.disabled,
        size,
        color,
        error: error || field.invalid,
      }}
    >
      <Part
        name="radio-group"
        role="radiogroup"
        {...props}
        aria-label={
          props["aria-label"] ?? (typeof label === "string" ? label : undefined)
        }
        aria-invalid={error || field.invalid}
        aria-required={required ?? field.required}
        aria-describedby={
          [props["aria-describedby"], helperText && helperId]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={cn(`mn-direction-${direction}`, props.className)}
      >
        {label}
        {options?.map((option) => (
          <Radio key={option.value} {...option} />
        ))}
        {children}
        {helperText && (
          <Text id={helperId} className={error ? "mn-error" : "mn-helper"}>
            {helperText}
          </Text>
        )}
      </Part>
    </RadioContext.Provider>
  );
}
export interface NumberInputProps extends NativeProps, FieldState {
  value?: number | null;
  defaultValue?: number | null;
  onChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  allowEmpty?: boolean;
  showStepper?: boolean;
  incrementLabel?: string;
  decrementLabel?: string;
  placeholder?: string;
  size?: string;
  name?: string;
  notANumberMessage?: string;
  belowMinMessage?: string;
  aboveMaxMessage?: string;
}
export function NumberInput({
  value,
  defaultValue = null,
  onChange,
  min,
  max,
  step = 1,
  precision = inferStepPrecision(step),
  disabled,
  readOnly,
  allowEmpty = true,
  showStepper = false,
  incrementLabel,
  decrementLabel,
  notANumberMessage,
  belowMinMessage,
  aboveMaxMessage,
  ...props
}: NumberInputProps) {
  const { t } = useI18n();
  incrementLabel ??= t("numberInput.increment");
  decrementLabel ??= t("numberInput.decrement");
  const field = useFieldState();
  const locked = (disabled ?? field.disabled) || (readOnly ?? field.readOnly);
  const [current, set] = useValue(value, defaultValue, onChange);
  const [draft, setDraft] = useState(() =>
    formatNumberValue(current, precision),
  );
  useEffect(
    () => setDraft(formatNumberValue(current, precision)),
    [current, precision],
  );
  const change = (n: number | null) => {
    if (locked) return;
    if (n === null) {
      if (allowEmpty) {
        set(null);
        setDraft(
          value === undefined ? "" : formatNumberValue(current, precision),
        );
      } else change(clampNumber(min ?? 0, min, max));
      return;
    }
    const next = Number(clampNumber(n, min, max).toFixed(precision));
    set(next);
    setDraft(
      formatNumberValue(value === undefined ? next : current, precision),
    );
  };
  const commit = () => {
    if (draft.trim() === "" || draft.trim() === "-") {
      change(null);
      return;
    }
    const next = parseNumberDraft(draft);
    if (next === null) {
      setDraft(formatNumberValue(current, precision));
      return;
    }
    change(next);
  };
  const trimmed = draft.trim(),
    parsed = parseNumberDraft(draft);
  let errorMessage: string | undefined;
  if (trimmed && trimmed !== "-" && trimmed !== ".") {
    if (parsed === null)
      errorMessage = notANumberMessage ?? t("numberInput.notANumber");
    else if (min !== undefined && parsed < min)
      errorMessage = belowMinMessage ?? t("numberInput.belowMin", { min });
    else if (max !== undefined && parsed > max)
      errorMessage = aboveMaxMessage ?? t("numberInput.aboveMax", { max });
  }
  return (
    <Part name="number-input" className={props.className}>
      {showStepper && (
        <Button
          variant="outline"
          aria-label={decrementLabel}
          disabled={
            locked || (current !== null && min !== undefined && current <= min)
          }
          onClick={() =>
            change((parseNumberDraft(draft) ?? current ?? 0) - step)
          }
        >
          −
        </Button>
      )}
      <Input
        value={draft}
        type="text"
        {...{ role: "spinbutton" }}
        aria-label={props["aria-label"]}
        aria-valuenow={current ?? undefined}
        aria-valuemin={min}
        aria-valuemax={max}
        disabled={disabled ?? field.disabled}
        readOnly={readOnly ?? field.readOnly}
        placeholder={props.placeholder}
        size={props.size}
        name={props.name}
        invalid={props.invalid ?? (!!errorMessage || field.invalid)}
        onChange={setDraft}
        onBlur={commit}
        onConfirm={commit}
      />
      {showStepper && (
        <Button
          variant="outline"
          aria-label={incrementLabel}
          disabled={
            locked || (current !== null && max !== undefined && current >= max)
          }
          onClick={() =>
            change((parseNumberDraft(draft) ?? current ?? 0) + step)
          }
        >
          +
        </Button>
      )}
      {errorMessage && (
        <Text {...{ role: "alert" }} className="mn-error">
          {errorMessage}
        </Text>
      )}
    </Part>
  );
}
export interface SelectProps extends NativeProps, FieldState {
  contentClassName?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  options?: SelectionOption[];
  placeholder?: ReactNode;
  name?: string;
  size?: "small" | "medium" | "large";
}
const SelectContext = createContext<{
  value: string;
  choose: (value: string) => void;
} | null>(null);
export function Select({
  value,
  defaultValue = "",
  onChange,
  open,
  defaultOpen = false,
  onOpenChange,
  options,
  placeholder,
  disabled,
  readOnly,
  children,
  contentClassName,
  size = "medium",
  name,
  invalid,
  required,
  ...props
}: SelectProps) {
  const { t } = useI18n();
  placeholder ??= t("picker.placeholder");
  const field = useFieldState();
  const [current, set] = useValue(value, defaultValue, onChange),
    [expanded, show] = useValue(open, defaultOpen, onOpenChange);
  const locked = (disabled ?? field.disabled) || (readOnly ?? field.readOnly);
  const nativeId = useId().replace(/[^a-zA-Z0-9_-]/g, ""),
    popupId = `mn-select-${nativeId}-panel`,
    anchorId = `mn-select-${nativeId}-anchor`,
    selectedLabelId = useId();
  useH5List(anchorId, { open: expanded, setOpen: show });
  useH5Layer(popupId, expanded, false, () => show(false), anchorId);
  const position = useNativeAnchoredPosition(anchorId, popupId, expanded, {
    side: "bottom",
    align: "start",
    sideOffset: 4,
    matchAnchorWidth: "min",
  });
  return (
    <>
      {expanded && (
        <View className="mn-picker-backdrop" onClick={() => show(false)} />
      )}
      <Part
        name="select"
        id={anchorId}
        style={{ zIndex: expanded ? 50 : undefined }}
      >
        {name && (
          <NativeInput
            name={name}
            value={current}
            disabled={disabled ?? field.disabled}
            style={{ display: "none" }}
          />
        )}
        <Button
          variant="outline"
          role="combobox"
          size={size}
          id={props.id ?? field.id}
          style={props.style}
          className={props.className}
          aria-invalid={invalid || field.invalid}
          aria-required={required ?? field.required}
          aria-labelledby={
            props["aria-labelledby"] ??
            (!props["aria-label"] ? selectedLabelId : undefined)
          }
          aria-describedby={props["aria-describedby"]}
          aria-controls={expanded ? popupId : undefined}
          aria-haspopup="listbox"
          aria-label={props["aria-label"]}
          aria-expanded={expanded}
          disabled={locked}
          onClick={() => show(!expanded)}
        >
          <Text id={selectedLabelId}>
            {options?.find((o) => o.value === current)?.label ??
              findSelectLabel(children, current) ??
              (current || placeholder)}
          </Text>
        </Button>
        {expanded && (
          <SelectContext.Provider
            value={{
              value: current,
              choose: (next) => {
                if (locked) return;
                set(next);
                show(false);
              },
            }}
          >
            <Part
              name="select"
              part="content"
              role="listbox"
              id={popupId}
              data-side={position.side}
              style={position.style}
              aria-label={props["aria-label"]}
              aria-labelledby={props["aria-labelledby"]}
              className={contentClassName}
            >
              {options?.map((option) => (
                <SelectItem key={option.value} {...option} />
              ))}
              {children}
            </Part>
          </SelectContext.Provider>
        )}
      </Part>
    </>
  );
}
function findSelectLabel(children: ReactNode, value: string): ReactNode {
  for (const child of Children.toArray(children)) {
    if (
      isValidElement<{
        value?: string;
        children?: ReactNode;
        label?: ReactNode;
      }>(child)
    ) {
      if (child.props.value === value)
        return child.props.label ?? child.props.children;
      const found = findSelectLabel(child.props.children, value);
      if (found !== undefined) return found;
    }
  }
  return undefined;
}
export function SelectItem({
  value,
  label,
  children,
  disabled,
  className,
  style,
}: NativeProps & {
  value: string;
  label?: ReactNode;
  disabled?: boolean;
  textValue?: string;
}) {
  const context = useContext(SelectContext);
  return (
    <Button
      variant="ghost"
      className={className}
      style={style}
      {...{ role: "option" }}
      aria-selected={context?.value === value}
      disabled={disabled}
      onClick={() => context?.choose(value)}
    >
      {label ?? children ?? value}
    </Button>
  );
}
export function SelectGroup(props: NativeProps) {
  return <Part name="select" part="group" role="group" {...props} />;
}
export function SelectLabel(props: NativeProps) {
  return <Part name="select" part="label" {...props} />;
}
export function SelectSeparator(props: NativeProps) {
  return <Part name="select" part="separator" role="separator" {...props} />;
}
export interface AutoCompleteOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  highlight?: boolean;
  icon?: ReactNode;
  description?: string;
  group?: string;
  style?: CSSProperties;
}
export interface AutoCompleteProps extends Omit<
  SelectProps,
  "options" | "placeholder"
> {
  placeholder?: string;
  options: (AutoCompleteOption | string)[];
  filterOption?: (input: string, option: AutoCompleteOption) => boolean;
  sortOption?: (a: AutoCompleteOption, b: AutoCompleteOption) => number;
  onSelect?: (option: AutoCompleteOption) => void;
  onOptionClick?: (option: AutoCompleteOption) => void;
  onDropdownVisibleChange?: (visible: boolean) => void;
  groupBy?: (option: AutoCompleteOption) => string;
  groupMode?: "first" | "adjacent";
  mode?: "basic" | "custom";
  label?: string;
  inputProps?: Omit<InputProps, "value" | "defaultValue" | "onChange">;
  emptyProps?: { title?: ReactNode; description?: ReactNode };
  loading?: boolean;
  renderEmpty?: () => ReactNode;
  renderOption?: (option: AutoCompleteOption) => ReactNode;
  fillOnSelect?: boolean;
  autoHighlight?: boolean;
  dropdownClassName?: string;
  placement?: "top" | "bottom" | "left" | "right";
  offset?: { x: number; y: number };
  animation?: boolean;
}
export function AutoComplete({
  value,
  defaultValue = "",
  onChange,
  options,
  onSelect,
  onOptionClick,
  onDropdownVisibleChange,
  filterOption,
  sortOption,
  groupBy,
  groupMode = "first",
  mode = "basic",
  label,
  inputProps,
  emptyProps,
  disabled,
  readOnly,
  placeholder,
  loading,
  renderEmpty,
  renderOption,
  fillOnSelect = true,
  autoHighlight = true,
  dropdownClassName,
  placement = "bottom",
  offset = { x: 0, y: 4 },
  animation = true,
  ...props
}: AutoCompleteProps) {
  const { t } = useI18n(),
    field = useFieldState();
  const locked = disabled ?? inputProps?.disabled ?? field.disabled,
    ro = readOnly ?? inputProps?.readOnly ?? field.readOnly;
  const [current, set] = useValue(value, defaultValue, onChange),
    [open, show] = useValue(props.open, props.defaultOpen ?? false, (next) => {
      props.onOpenChange?.(next);
      onDropdownVisibleChange?.(next);
    });
  const nativeId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const anchorId = `mn-auto-complete-${nativeId}-anchor`,
    panelId = `mn-auto-complete-${nativeId}-panel`;
  const shown = open && !locked && !ro;
  useH5List(anchorId, { open: shown, setOpen: show, input: true });
  useH5Layer(panelId, shown, false, () => show(false), anchorId);
  const vertical = placement === "top" || placement === "bottom";
  const position = useNativeAnchoredPosition(anchorId, panelId, shown, {
    side: placement,
    align: "start",
    sideOffset: vertical ? offset.y : offset.x,
    alignOffset: vertical ? offset.x : offset.y,
    matchAnchorWidth: "min",
  });
  const normalized = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o,
  );
  let visible = normalized.filter((o) =>
    filterOption
      ? filterOption(current, o)
      : o.label.toLowerCase().includes(current.toLowerCase()),
  );
  if (sortOption) visible = [...visible].sort(sortOption);
  const groups: [string, AutoCompleteOption[]][] = [];
  if (groupBy) {
    visible.forEach((o) => {
      const name = groupBy(o);
      const found =
        groupMode === "adjacent"
          ? groups.at(-1)?.[0] === name
            ? groups.at(-1)
            : undefined
          : groups.find((g) => g[0] === name);
      if (found) found[1].push(o);
      else groups.push([name, [o]]);
    });
  } else groups.push(["", visible]);
  const pick = (o: AutoCompleteOption, clicked = false) => {
    if (o.disabled || locked || ro) return;
    if (fillOnSelect) set(o.label);
    onSelect?.(o);
    if (clicked) onOptionClick?.(o);
    show(false);
  };
  const first = visible.find((o) => !o.disabled);
  return (
    <>
      {shown && (
        <View className="mn-picker-backdrop" onClick={() => show(false)} />
      )}
      <Part
        name="auto-complete"
        id={anchorId}
        className={props.className}
        style={{ ...props.style, zIndex: shown ? 50 : undefined }}
      >
        {label && <Text>{label}</Text>}
        <Input
          {...inputProps}
          aria-label={inputProps?.["aria-label"] ?? label}
          value={current}
          disabled={locked}
          readOnly={ro}
          placeholder={placeholder ?? inputProps?.placeholder}
          onFocus={(event) => {
            inputProps?.onFocus?.(event);
            if (!locked && !ro) show(true);
          }}
          onConfirm={(event) => {
            inputProps?.onConfirm?.(event);
            if (autoHighlight && first) pick(first);
          }}
          onChange={(next) => {
            set(next);
            show(true);
          }}
        />
        {shown && (
          <Part
            name="auto-complete"
            part="content"
            role="listbox"
            id={panelId}
            data-side={position.side}
            className={cn(
              dropdownClassName,
              animation && "mn-popup-animated",
              `mn-popup-${position.side}`,
            )}
            style={position.style}
          >
            {loading ? (
              <Text>{t("common.loading")}</Text>
            ) : visible.length ? (
              groups.map(([name, items], index) => (
                <View
                  key={`${name}-${index}`}
                  {...{ role: groupBy ? "group" : undefined }}
                  aria-label={name || undefined}
                >
                  {groupBy && (
                    <Text className="mn-auto-complete-group-label">{name}</Text>
                  )}
                  {items.map((o) => (
                    <Button
                      key={o.value}
                      variant="ghost"
                      {...{ role: "option" }}
                      style={o.style}
                      className={cn(o.highlight && "mn-highlighted")}
                      disabled={o.disabled}
                      onClick={() => pick(o, true)}
                    >
                      {mode === "custom" && renderOption ? (
                        renderOption(o)
                      ) : (
                        <>
                          {o.icon}
                          <Text>{o.label}</Text>
                          {o.description && (
                            <Text className="mn-muted">{o.description}</Text>
                          )}
                        </>
                      )}
                    </Button>
                  ))}
                </View>
              ))
            ) : (
              (renderEmpty?.() ?? (
                <View>
                  <Text>{emptyProps?.title ?? t("cascader.noResults")}</Text>
                  {emptyProps?.description}
                </View>
              ))
            )}
          </Part>
        )}
      </Part>
    </>
  );
}
export interface CascaderOption {
  value: string | number;
  label: string | number;
  disabled?: boolean;
  children?: CascaderOption[];
  isLeaf?: boolean;
  loading?: boolean;
}
export interface CascaderProps extends Omit<
  SelectProps,
  "value" | "defaultValue" | "onChange" | "options"
> {
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  onChange?: (
    value: (string | number)[],
    selectedOptions: CascaderOption[],
  ) => void;
  options: CascaderOption[];
  label?: string;
  allowClear?: boolean;
  showSearch?: boolean;
  filter?: (input: string, path: CascaderOption[]) => boolean;
  loadData?: (path: CascaderOption[]) => Promise<void> | void;
  displayRender?: (labels: string[], path: CascaderOption[]) => ReactNode;
  optionRender?: (option: CascaderOption, level: number) => ReactNode;
  maxLevel?: number;
  expandTrigger?: "click" | "hover";
  width?: number | string;
  dropdownClassName?: string;
  dropdownStyle?: CSSProperties;
  optionStyle?: CSSProperties;
}
export function Cascader({
  value,
  defaultValue = [],
  onChange,
  options,
  label,
  disabled,
  readOnly,
  placeholder,
  allowClear = true,
  showSearch,
  filter,
  loadData,
  displayRender,
  optionRender,
  maxLevel = 6,
  expandTrigger = "click",
  width = 240,
  dropdownClassName,
  dropdownStyle,
  optionStyle,
  ...props
}: CascaderProps) {
  const field = useFieldState(),
    { t } = useI18n();
  placeholder ??= t("cascader.placeholder");
  const locked = (disabled ?? field.disabled) || (readOnly ?? field.readOnly);
  const [current, set] = useValue(value, defaultValue, (next) =>
      onChange?.(next, findCascaderPath(options, next)),
    ),
    [open, show] = useValue(
      props.open,
      props.defaultOpen ?? false,
      props.onOpenChange,
    ),
    [expanded, setExpanded] = useState<(string | number)[]>([]),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(""),
    [query, setQuery] = useState("");
  const nativeId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const anchorId = `mn-cascader-${nativeId}-anchor`,
    panelId = `mn-cascader-${nativeId}-panel`;
  const position = useNativeAnchoredPosition(anchorId, panelId, open, {
    side: "bottom",
    align: "start",
    sideOffset: 4,
    matchAnchorWidth: "min",
  });
  const generation = useRef(0);
  useEffect(
    () => () => {
      generation.current++;
    },
    [],
  );
  const path = findCascaderPath(options, expanded),
    selected = findCascaderPath(options, current),
    labels = selected.map((o) => String(o.label));
  const depth = Math.max(1, Math.floor(maxLevel));
  const isBranch = (o: CascaderOption, level: number) =>
    level < depth - 1 &&
    (!!o.children?.length || (!!loadData && !o.isLeaf && !o.children));
  const choose = async (next: CascaderOption[]) => {
    if (locked || next.some((o) => o.disabled)) return;
    const o = next[next.length - 1];
    setError("");
    if (isBranch(o, next.length - 1)) {
      if (!o.children && loadData && !o.loading) {
        const request = ++generation.current;
        setLoading(true);
        try {
          await loadData(next);
          if (request === generation.current)
            setExpanded(next.map((o) => o.value));
        } catch (reason) {
          if (request === generation.current)
            setError(reason instanceof Error ? reason.message : String(reason));
        } finally {
          if (request === generation.current) setLoading(false);
        }
      } else setExpanded(next.map((o) => o.value));
      return;
    }
    set(next.map((o) => o.value));
    setQuery("");
    show(false);
  };
  function hoverOption(option: CascaderOption, level: number) {
    if (expandTrigger === "hover" && isBranch(option, level))
      void choose([...path.slice(0, level), option]);
  }
  const results = query
    ? flattenCascaderOptions(options).filter(
        (entry) =>
          !isBranch(entry.option, entry.path.length - 1) &&
          entry.path.length <= depth &&
          (filter
            ? filter(query, entry.path)
            : entry.path
                .map((o) => o.label)
                .join(" / ")
                .toLowerCase()
                .includes(query.toLowerCase())),
      )
    : [];
  const levels = [
    options,
    ...path
      .map((option) => option.children ?? [])
      .filter((options) => options.length),
  ];
  return (
    <>
      {open && (
        <View className="mn-picker-backdrop" onClick={() => show(false)} />
      )}
      <Part
        name="cascader"
        id={anchorId}
        className={props.className}
        style={{ width, ...props.style, zIndex: open ? 50 : undefined }}
      >
        {label && <Text>{label}</Text>}
        <Button
          variant="outline"
          disabled={locked}
          aria-label={props["aria-label"]}
          onClick={() => {
            if (locked) return;
            setExpanded([]);
            setError("");
            show(!open);
          }}
        >
          {labels.length
            ? (displayRender?.(labels, selected) ?? labels.join(" / "))
            : placeholder}
        </Button>
        {allowClear && current.length > 0 && (
          <Button
            variant="ghost"
            aria-label={t("cascader.clear")}
            disabled={locked}
            onClick={() => {
              set([]);
              setQuery("");
            }}
          >
            ×
          </Button>
        )}
        {open && (
          <Part
            name="cascader"
            part="content"
            role="listbox"
            id={panelId}
            data-side={position.side}
            className={dropdownClassName}
            style={{ ...position.style, ...dropdownStyle }}
          >
            {showSearch && (
              <Input
                aria-label={
                  label
                    ? `${label} ${t("searchBar.label")}`
                    : t("cascader.options")
                }
                value={query}
                onChange={setQuery}
                disabled={locked}
              />
            )}{" "}
            {error && <Text {...{ role: "alert" }}>{error}</Text>}
            {loading ? (
              <Text>{t("common.loading")}</Text>
            ) : query ? (
              results.length ? (
                results.map((entry) => (
                  <Button
                    key={entry.path.map((o) => o.value).join("/")}
                    variant="ghost"
                    {...{ role: "option" }}
                    style={optionStyle}
                    onClick={() => void choose(entry.path)}
                  >
                    {entry.path.map((o) => o.label).join(" / ")}
                  </Button>
                ))
              ) : (
                <Text>{t("cascader.noResults")}</Text>
              )
            ) : (
              <ScrollView scrollX className="mn-cascader-columns">
                <View className="mn-cascader-columns-inner">
                  {levels.map((level, depth) => (
                    <View
                      key={depth}
                      className="mn-cascader-column"
                      {...{ role: "group" }}
                      aria-label={t("cascader.level", {
                        label: label ?? t("cascader.options"),
                        level: depth + 1,
                      })}
                    >
                      {level.map((o) => (
                        <Button
                          key={o.value}
                          variant="ghost"
                          role="option"
                          style={optionStyle}
                          disabled={locked || o.disabled || o.loading}
                          aria-selected={path[depth]?.value === o.value}
                          {...(process.env.TARO_ENV === "h5"
                            ? { onMouseEnter: () => hoverOption(o, depth) }
                            : { onLongPress: () => hoverOption(o, depth) })}
                          onClick={() =>
                            void choose([...path.slice(0, depth), o])
                          }
                        >
                          {optionRender?.(o, depth) ?? o.label}
                          {o.loading && <Text>{t("common.loading")}</Text>}
                        </Button>
                      ))}
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}
          </Part>
        )}
      </Part>
    </>
  );
}
export interface JsonFieldProps extends Omit<TextareaProps, "onChange"> {
  onChange?: (value: string) => void;
  indent?: number;
  hideToolbar?: boolean;
  formatLabel?: string;
  validLabel?: string;
  invalidLabel?: string;
}
export function JsonField({
  value,
  defaultValue = "",
  onChange,
  indent = 2,
  hideToolbar = false,
  formatLabel,
  validLabel,
  invalidLabel,
  ...props
}: JsonFieldProps) {
  const { t } = useI18n();
  formatLabel ??= t("jsonField.format");
  validLabel ??= t("jsonField.valid");
  invalidLabel ??= t("jsonField.invalid");

  const [current, set] = useValue(value, defaultValue, onChange);
  let valid = true;
  try {
    if (current.trim()) JSON.parse(current);
  } catch {
    valid = false;
  }
  return (
    <Part name="json-field">
      <Textarea {...props} value={current} onChange={set} invalid={!valid} />
      {!hideToolbar && (
        <View className="mn-toolbar">
          <Text {...{ role: "status" }}>
            {valid ? validLabel : invalidLabel}
          </Text>
          <Button
            variant="ghost"
            disabled={
              props.disabled || props.readOnly || !valid || !current.trim()
            }
            onClick={() => {
              try {
                set(JSON.stringify(JSON.parse(current), null, indent));
              } catch {
                /* Keep the invalid draft. */
              }
            }}
          >
            {formatLabel}
          </Button>
        </View>
      )}
    </Part>
  );
}
export interface KeyValueEntry {
  id?: string;
  key: string;
  value: string;
}
let entrySequence = 0;
export interface KeyValueEditorProps extends NativeProps {
  entries?: KeyValueEntry[];
  defaultEntries?: KeyValueEntry[];
  onChange?: (entries: KeyValueEntry[]) => void;
  disabled?: boolean;
  readOnly?: boolean;
  keyLabel?: string;
  valueLabel?: string;
  addLabel?: string;
  removeLabel?: string;
  errors?: Record<string, { key?: string; value?: string }>;
}
export function KeyValueEditor({
  entries,
  defaultEntries = [],
  onChange,
  disabled,
  readOnly,
  keyLabel,
  valueLabel,
  addLabel,
  removeLabel,
  errors,
  ...props
}: KeyValueEditorProps) {
  const { t } = useI18n();
  keyLabel ??= t("keyValueEditor.key");
  valueLabel ??= t("keyValueEditor.value");
  addLabel ??= t("keyValueEditor.add");
  removeLabel ??= t("keyValueEditor.remove");

  const [current, set] = useValue(entries, defaultEntries, onChange);
  return (
    <Part name="key-value-editor" {...props}>
      {current.map((entry, index) => (
        <View key={entry.id ?? index} className="mn-key-value-row">
          <Input
            aria-label={keyLabel}
            value={entry.key}
            disabled={disabled}
            readOnly={readOnly}
            onChange={(key) =>
              set(current.map((e, i) => (i === index ? { ...e, key } : e)))
            }
          />
          <Input
            aria-label={valueLabel}
            value={entry.value}
            disabled={disabled}
            readOnly={readOnly}
            onChange={(value) =>
              set(current.map((e, i) => (i === index ? { ...e, value } : e)))
            }
          />
          <Button
            variant="ghost"
            aria-label={removeLabel}
            disabled={disabled || readOnly}
            onClick={() => set(current.filter((_, i) => i !== index))}
          >
            ×
          </Button>
          {errors?.[entry.id ?? String(index)] && (
            <Text {...{ role: "alert" }}>
              {errors[entry.id ?? String(index)].key ??
                errors[entry.id ?? String(index)].value}
            </Text>
          )}
        </View>
      ))}
      <Button
        variant="outline"
        disabled={disabled || readOnly}
        onClick={() =>
          set([
            ...current,
            { id: `entry-${++entrySequence}`, key: "", value: "" },
          ])
        }
      >
        {addLabel}
      </Button>
    </Part>
  );
}
export interface TagInputProps extends NativeProps, FieldState {
  name?: string;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  addLabel?: string;
  clearLabel?: string;
  emptyText?: string;
  removeLabel?: ((value: string) => string) | string;
  createLabel?: (value: string) => string;
  commitOnBlur?: boolean;
  separators?: readonly string[];
  options?: readonly string[];
  size?: string;
}
export function TagInput({
  value,
  defaultValue = [],
  onChange,
  disabled,
  readOnly,
  placeholder,
  addLabel,
  clearLabel,
  emptyText,
  removeLabel,
  createLabel,
  commitOnBlur = true,
  separators = DEFAULT_TAG_SEPARATORS,
  options = [],
  size = "medium",
  name,
  ...props
}: TagInputProps) {
  const { t } = useI18n(),
    field = useFieldState();
  const locked = (disabled ?? field.disabled) || (readOnly ?? field.readOnly);
  const [current, set] = useValue(value, defaultValue, onChange),
    [draft, setDraft] = useState(""),
    [open, setOpen] = useState(false),
    touchAction = useRef(false);
  const commit = (texts: readonly string[], tail = "") => {
    if (locked) return;
    const next = [...current];
    for (const text of texts) {
      const tag = text.trim();
      if (tag && !next.includes(tag)) next.push(tag);
    }
    if (next.length !== current.length) set(next);
    setDraft(tail);
  };
  const suggestions = [...new Set(options)].filter(
    (tag) =>
      !current.includes(tag) && tag.toLowerCase().includes(draft.toLowerCase()),
  );
  const create =
    draft.trim() &&
    !current.includes(draft.trim()) &&
    !suggestions.includes(draft.trim());
  const touch = () => {
    touchAction.current = true;
  };
  const action = (fn: () => void) => () => {
    touchAction.current = false;
    if (!locked) fn();
  };
  return (
    <Part
      name="tag-input"
      {...props}
      className={cn(`mn-size-${size}`, props.className)}
    >
      {name && (
        <NativeCheckboxGroup name={name} style={{ display: "none" }}>
          {current.map((tag) => (
            <NativeCheckbox
              key={tag}
              value={tag}
              checked
              disabled={disabled ?? field.disabled}
            />
          ))}
        </NativeCheckboxGroup>
      )}
      {current.map((tag) => (
        <View key={tag} className="mn-tag">
          <Text>{tag}</Text>
          {!readOnly && (
            <Button
              variant="ghost"
              disabled={locked}
              aria-label={
                typeof removeLabel === "function"
                  ? removeLabel(tag)
                  : (removeLabel ?? t("tagInput.remove", { tag }))
              }
              onTouchStart={touch}
              onClick={action(() =>
                set(current.filter((value) => value !== tag)),
              )}
            >
              ×
            </Button>
          )}
        </View>
      ))}
      <Input
        value={draft}
        disabled={disabled ?? field.disabled}
        readOnly={readOnly ?? field.readOnly}
        placeholder={placeholder}
        size={size}
        aria-label={props["aria-label"]}
        onFocus={() => {
          if (!locked) setOpen(true);
        }}
        onChange={(text) => {
          const splitters = separators.filter((s) => s && s !== "Enter");
          if (separators.includes("Enter")) splitters.push("\r\n", "\n", "\r");
          const parts = splitBySeparators(text, splitters);
          if (parts.length > 1) commit(parts.slice(0, -1), parts.at(-1));
          else setDraft(text);
          setOpen(true);
        }}
        onConfirm={() => {
          if (separators.includes("Enter")) commit([draft]);
        }}
        onBlur={() => {
          if (touchAction.current) {
            touchAction.current = false;
            return;
          }
          if (commitOnBlur) commit([draft]);
          setOpen(false);
        }}
      />
      {!readOnly && (
        <>
          <Button
            disabled={locked || !draft.trim() || current.includes(draft.trim())}
            variant="outline"
            onTouchStart={touch}
            onClick={action(() => commit([draft]))}
          >
            {addLabel ?? t("tagInput.add")}
          </Button>
          <Button
            disabled={locked || !current.length}
            variant="outline"
            onTouchStart={touch}
            onClick={action(() => {
              set([]);
              setDraft("");
            })}
          >
            {clearLabel ?? t("tagInput.clear")}
          </Button>
        </>
      )}
      {open && !locked && (
        <View {...{ role: "listbox" }}>
          {suggestions.map((tag) => (
            <Button
              key={tag}
              variant="ghost"
              role="option"
              onTouchStart={touch}
              onClick={action(() => {
                commit([tag]);
                setOpen(false);
              })}
            >
              {tag}
            </Button>
          ))}
          {create ? (
            <Button
              variant="ghost"
              role="option"
              onTouchStart={touch}
              onClick={action(() => {
                commit([draft]);
                setOpen(false);
              })}
            >
              {createLabel?.(draft.trim()) ??
                t("tagInput.create", { tag: draft.trim() })}
            </Button>
          ) : (
            !suggestions.length && (
              <Text>{emptyText ?? t("tagInput.empty")}</Text>
            )
          )}
        </View>
      )}
    </Part>
  );
}
export interface RatingProps extends NativeProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  interactive?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  showValue?: boolean;
  ratingCount?: number;
  size?: "small" | "medium" | "large";
  name?: string;
}
export function Rating({
  value,
  defaultValue = 0,
  onChange,
  max = 10,
  interactive = !!onChange,
  readOnly,
  disabled,
  showValue,
  ratingCount,
  size = "medium",
  name: _name,
  ...props
}: RatingProps) {
  const [current, set] = useValue(value, defaultValue, onChange);
  return (
    <Part
      name="rating"
      role="radiogroup"
      {...props}
      aria-label={props["aria-label"] ?? `${current.toFixed(1)} / ${max}`}
      className={cn(`mn-size-${size}`, props.className)}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <Button
          key={i}
          variant="ghost"
          style={{ fontSize: { small: 12, medium: 16, large: 20 }[size] }}
          {...{ role: "radio" }}
          aria-label={String(((i + 1) * max) / 10)}
          aria-checked={current === ((i + 1) * max) / 10}
          disabled={disabled || readOnly || !interactive}
          className={cn(
            "mn-rating-half",
            ((i + 1) * max) / 10 <= current && "mn-selected",
          )}
          onClick={() => set(((i + 1) * max) / 10)}
        >
          {i % 2 === 0 ? "◐" : "★"}
        </Button>
      ))}
      {showValue && (
        <Text>
          {current} / {max}
        </Text>
      )}
      {ratingCount !== undefined && <Text>({ratingCount})</Text>}
    </Part>
  );
}
export interface RatingDimension {
  key: string;
  label: ReactNode;
  value: number;
}
export function RatingScale({
  dimensions,
  onChange,
  ...props
}: Omit<RatingProps, "value" | "onChange"> & {
  dimensions: RatingDimension[];
  onChange?: (key: string, value: number) => void;
}) {
  return (
    <Part name="rating-scale">
      {dimensions.map((d) => (
        <View key={d.key}>
          <Text>{d.label}</Text>
          <Rating
            {...props}
            value={d.value}
            onChange={(value) => onChange?.(d.key, value)}
          />
        </View>
      ))}
    </Part>
  );
}
