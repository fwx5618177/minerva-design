/**
 * @novel-isr/ui compatibility layer: "inputs" group
 * (Checkbox, Radio / RadioGroup, Switch, Select family, Autocomplete,
 * Rating / RatingScale, MonthCalendar).
 *
 * Exposes novel-isr-ui's exact export names and prop shapes on top of the
 * Minerva components: Radix-style `onCheckedChange` / `onValueChange` ->
 * `onChange`, `checked="indeterminate"` -> `indeterminate`, `isInvalid` ->
 * `invalid` / `error`, `colorScheme` -> `color`, sizes `sm | md | lg` ->
 * `small | medium | large`, Autocomplete `{ id, hint }` options -> Minerva
 * `{ value, description }`. Built-in strings default to novel-isr-ui's
 * original Chinese texts, passed explicitly (no dependency on lib-core's
 * locale); consumer props override them.
 */
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import type * as RadixCheckbox from "@radix-ui/react-checkbox";
import type * as RadixRadio from "@radix-ui/react-radio-group";
import type * as RadixSwitch from "@radix-ui/react-switch";
import type * as RadixSelect from "@radix-ui/react-select";
import MinervaCheckbox from "../components/Checkbox/Checkbox";
import MinervaRadio from "../components/Radio/Radio";
import MinervaRadioGroup from "../components/Radio/RadioGroup";
import MinervaSwitch from "../components/Switch/Switch";
import {
  Select as MinervaSelect,
  SelectGroup as MinervaSelectGroup,
  SelectItem as MinervaSelectItem,
  SelectLabel as MinervaSelectLabel,
  SelectSeparator as MinervaSelectSeparator,
} from "../components/Select/Select";
import type {
  SelectItemProps as MinervaSelectItemProps,
  SelectLabelProps as MinervaSelectLabelProps,
  SelectSeparatorProps as MinervaSelectSeparatorProps,
} from "../components/Select/types";
import MinervaAutoComplete from "../components/AutoComplete/AutoComplete";
import type { AutoCompleteOption } from "../components/AutoComplete/types";
import {
  Rating as MinervaRating,
  RatingScale as MinervaRatingScale,
} from "../components/Rating/Rating";
import type { RatingDimension } from "../components/Rating/types";
import MinervaMonthCalendar from "../components/MonthCalendar/MonthCalendar";
import type { MonthCalendarEvent } from "../components/MonthCalendar/types";

export type { RatingDimension, MonthCalendarEvent };

type NovelSize = "sm" | "md" | "lg";
const SIZE = { sm: "small", md: "medium", lg: "large" } as const;

// ─── Checkbox ───────────────────────────────────────────────────────────────

export type CheckboxSize = NovelSize;
export type CheckboxColorScheme =
  "brand" | "success" | "info" | "warning" | "danger";

export interface CheckboxProps extends Omit<
  RadixCheckbox.CheckboxProps,
  "asChild" | "size" | "children"
> {
  size?: CheckboxSize;
  /** 激活态颜色，默认 brand */
  colorScheme?: CheckboxColorScheme;
  isInvalid?: boolean;
  /** label 文本 */
  children?: ReactNode;
  /** Minerva renders a native checkbox: the ref receives the <input>. */
  ref?: Ref<HTMLButtonElement | HTMLInputElement>;
}

const CHECKBOX_COLOR = {
  brand: "primary",
  success: "success",
  info: "info",
  warning: "warning",
  danger: "danger",
} as const;

export function Checkbox({
  size = "md",
  colorScheme = "brand",
  isInvalid = false,
  className,
  children,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  required,
  name,
  value,
  id,
  ref,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}: CheckboxProps) {
  const [inner, setInner] = useState<RadixCheckbox.CheckedState>(
    defaultChecked ?? false,
  );
  const state = checked ?? inner;
  return (
    <MinervaCheckbox
      ref={ref as Ref<HTMLInputElement>}
      checked={state === true}
      indeterminate={state === "indeterminate"}
      onChange={(next) => {
        if (checked === undefined) setInner(next);
        onCheckedChange?.(next);
      }}
      size={SIZE[size]}
      color={CHECKBOX_COLOR[colorScheme]}
      error={isInvalid}
      className={className}
      disabled={disabled}
      required={required}
      name={name}
      value={value === undefined ? undefined : String(value)}
      id={id}
      ariaLabel={ariaLabel}
      ariaDescribedBy={ariaDescribedBy}
    >
      {children}
    </MinervaCheckbox>
  );
}

// ─── Radio / RadioGroup ─────────────────────────────────────────────────────

export type RadioSize = NovelSize;

// novel: an item's own size wins over the group's.
const RadioSizeContext = createContext<RadioSize>("md");

export interface RadioGroupProps extends Omit<
  RadixRadio.RadioGroupProps,
  "asChild"
> {
  size?: RadioSize;
  /** 排列方向（默认 column） */
  direction?: "row" | "column";
  ref?: Ref<HTMLDivElement>;
}

export function RadioGroup({
  size = "md",
  direction = "column",
  className,
  children,
  value,
  defaultValue,
  onValueChange,
  name,
  disabled,
  required,
  ref,
  "aria-label": ariaLabel,
}: RadioGroupProps) {
  return (
    <RadioSizeContext.Provider value={size}>
      <MinervaRadioGroup
        ref={ref}
        className={className}
        value={value}
        defaultValue={defaultValue}
        onChange={(next) => onValueChange?.(String(next))}
        name={name}
        disabled={disabled}
        required={required}
        direction={direction === "row" ? "horizontal" : "vertical"}
        ariaLabel={ariaLabel}
      >
        {children}
      </MinervaRadioGroup>
    </RadioSizeContext.Provider>
  );
}

export interface RadioProps extends Omit<
  RadixRadio.RadioGroupItemProps,
  "asChild" | "children"
> {
  /** 单独覆盖 size（一般跟 RadioGroup） */
  size?: RadioSize;
  children?: ReactNode;
  /** Minerva renders a native radio: the ref receives the <input>. */
  ref?: Ref<HTMLButtonElement | HTMLInputElement>;
}

export function Radio({
  size,
  className,
  children,
  value,
  disabled,
  required,
  ref,
  "aria-label": ariaLabel,
}: RadioProps) {
  const groupSize = useContext(RadioSizeContext);
  return (
    <MinervaRadio
      ref={ref as Ref<HTMLInputElement>}
      value={value}
      size={SIZE[size ?? groupSize]}
      className={className}
      disabled={disabled}
      required={required}
      ariaLabel={ariaLabel}
    >
      {children}
    </MinervaRadio>
  );
}

// ─── Switch ─────────────────────────────────────────────────────────────────

export type SwitchSize = NovelSize;
export type SwitchVariant = "slider" | "segmented";
export type SwitchColorScheme =
  "brand" | "success" | "info" | "warning" | "danger";

export interface SwitchProps extends Omit<
  RadixSwitch.SwitchProps,
  "asChild" | "children"
> {
  size?: SwitchSize;
  variant?: SwitchVariant;
  colorScheme?: SwitchColorScheme;
  /** 单标签紧凑文本（右侧）。和 offLabel/onLabel 互斥（双标签优先） */
  children?: ReactNode;
  /** 左侧标签（off 状态）。配合 onLabel 启用双标签 */
  offLabel?: ReactNode;
  /** 右侧标签（on 状态）。配合 offLabel 启用双标签 */
  onLabel?: ReactNode;
  /** Minerva renders a native switch: the ref receives the <input>. */
  ref?: Ref<HTMLButtonElement | HTMLInputElement>;
}

const SWITCH_COLOR = {
  brand: "primary",
  success: "success",
  info: "info",
  warning: "warning",
  danger: "error",
} as const;

export function Switch({
  size = "md",
  variant = "slider",
  colorScheme = "brand",
  className,
  children,
  offLabel,
  onLabel,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  name,
  value,
  id,
  ref,
  "aria-label": ariaLabel,
}: SwitchProps) {
  return (
    <MinervaSwitch
      ref={ref as Ref<HTMLInputElement>}
      size={SIZE[size]}
      variant={variant}
      color={SWITCH_COLOR[colorScheme]}
      className={className}
      offLabel={offLabel}
      onLabel={onLabel}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={(next) => onCheckedChange?.(next)}
      disabled={disabled}
      name={name}
      value={value === undefined ? undefined : String(value)}
      id={id}
      ariaLabel={ariaLabel}
      ripple={false}
    >
      {children}
    </MinervaSwitch>
  );
}

// ─── Select ─────────────────────────────────────────────────────────────────

export type SelectSize = NovelSize;

export interface SelectProps extends Omit<RadixSelect.SelectProps, "children"> {
  /** 触发按钮的 placeholder（未选时显示） */
  placeholder?: string;
  size?: SelectSize;
  isInvalid?: boolean;
  /** trigger 的 aria-label（无可见 label 时必填） */
  "aria-label"?: string;
  className?: string;
  /** SelectItem / SelectGroup / SelectSeparator 等 */
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

export function Select({
  placeholder,
  size = "md",
  isInvalid = false,
  className,
  children,
  "aria-label": ariaLabel,
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen,
  onOpenChange,
  name,
  disabled,
  required,
  ref,
}: SelectProps) {
  return (
    <MinervaSelect
      ref={ref}
      placeholder={placeholder}
      size={SIZE[size]}
      invalid={isInvalid}
      className={className}
      ariaLabel={ariaLabel}
      value={value}
      defaultValue={defaultValue}
      onChange={onValueChange}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      name={name}
      disabled={disabled}
      required={required}
    >
      {children}
    </MinervaSelect>
  );
}

export interface SelectItemProps extends Omit<
  RadixSelect.SelectItemProps,
  "children"
> {
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** Radix item props (textValue, data-*, handlers ...) are forwarded as-is. */
export function SelectItem(props: SelectItemProps) {
  return <MinervaSelectItem {...(props as MinervaSelectItemProps)} />;
}

export const SelectGroup = MinervaSelectGroup;

export interface SelectLabelProps extends RadixSelect.SelectLabelProps {
  ref?: Ref<HTMLDivElement>;
}

export function SelectLabel(props: SelectLabelProps) {
  return <MinervaSelectLabel {...(props as MinervaSelectLabelProps)} />;
}

export interface SelectSeparatorProps extends RadixSelect.SelectSeparatorProps {
  ref?: Ref<HTMLDivElement>;
}

export function SelectSeparator(props: SelectSeparatorProps) {
  return <MinervaSelectSeparator {...(props as MinervaSelectSeparatorProps)} />;
}

// ─── Autocomplete ───────────────────────────────────────────────────────────

export interface AutocompleteOption {
  /** 选项稳定 id —— 业务侧可用于跳转目标（如 bookId） */
  id: string;
  /** 主文案 */
  label: string;
  /** Search text when the display label is a localized command. */
  filterValue?: string;
  /** 副文案（如作者 / 描述） */
  hint?: string;
  /** 分组标签：相邻同 group 的项渲染在一起，组首插入分组标题 */
  group?: string;
}

export type AutocompleteSize = NovelSize;

export interface AutocompleteProps {
  /** 受控输入值 */
  value: string;
  /** 输入变化 */
  onValueChange: (value: string) => void;
  /** 完整选项集；组件内部按 value 过滤 */
  options: AutocompleteOption[];
  /** 选中某项时调用（点击 / 高亮 + Enter） */
  onSelect?: (option: AutocompleteOption) => void;
  /** 直接 Enter（无高亮项 / 选项为空）→ 提交搜索 */
  onSubmit?: (value: string) => void;
  placeholder?: string;
  size?: AutocompleteSize;
  /** 输入前缀图标 */
  prefix?: ReactNode;
  /** loading 时显示在底部 */
  loading?: boolean;
  /** 选项为空时显示的文案 */
  emptyText?: string;
  /** 透传给 input 的 aria-label —— 没有外层 FormControl 时必填 */
  "aria-label"?: string;
  /** 自定义类名挂在外层 root */
  className?: string;
  /** 关闭下拉的额外副作用 hook */
  onOpenChange?: (open: boolean) => void;
  /** name 透传给 input —— 表单提交场景 */
  name?: string;
  /** 禁用 */
  disabled?: boolean;
  readOnly?: boolean;
  id?: string;
  "aria-describedby"?: string;
  onBlur?: InputHTMLAttributes<HTMLInputElement>["onBlur"];
  onKeyDown?: InputHTMLAttributes<HTMLInputElement>["onKeyDown"];
  onCompositionStart?: InputHTMLAttributes<HTMLInputElement>["onCompositionStart"];
  onCompositionEnd?: InputHTMLAttributes<HTMLInputElement>["onCompositionEnd"];
  ref?: Ref<HTMLInputElement>;
}

const matchesNovel = (option: AutocompleteOption, query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    (option.filterValue ?? option.label).toLowerCase().includes(q) ||
    !!option.hint?.toLowerCase().includes(q)
  );
};

export function Autocomplete({
  value,
  onValueChange,
  options,
  onSelect,
  onSubmit,
  placeholder,
  size = "md",
  prefix,
  loading = false,
  emptyText = "无匹配项",
  "aria-label": ariaLabel,
  className,
  onOpenChange,
  name,
  disabled,
  readOnly,
  id,
  "aria-describedby": ariaDescribedBy,
  onBlur,
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
  ref,
}: AutocompleteProps) {
  const { mapped, byId, grouped } = useMemo(() => {
    const byId = new Map(options.map((o) => [o.id, o]));
    const mapped: AutoCompleteOption[] = options.map((o) => ({
      value: o.id,
      label: o.label,
      description: o.hint,
      group: o.group,
    }));
    return { mapped, byId, grouped: options.some((o) => o.group) };
  }, [options]);

  return (
    <MinervaAutoComplete
      ref={ref}
      name={name}
      className={className}
      options={mapped}
      value={value}
      onChange={onValueChange}
      onSelect={(option) => {
        const original = byId.get(String(option.value));
        if (original) onSelect?.(original);
      }}
      onSubmit={onSubmit}
      autoHighlight
      fillOnSelect={false}
      loading={loading}
      loadingMode="append"
      loadingText="加载中…"
      groupMode="adjacent"
      filterOption={(query, option) => {
        const original = byId.get(String(option.value));
        return !!original && matchesNovel(original, query);
      }}
      groupBy={grouped ? (option) => option.group ?? "" : undefined}
      renderEmpty={() => emptyText}
      onDropdownVisibleChange={onOpenChange}
      textFieldProps={{
        id,
        placeholder,
        ariaLabel,
        size: SIZE[size],
        icon: prefix,
        disabled,
        readOnly,
        onBlur,
        onKeyDown,
        fullWidth: true,
        inputProps: {
          "aria-describedby": ariaDescribedBy,
          onCompositionStart,
          onCompositionEnd,
        },
      }}
    />
  );
}

// ─── Rating ─────────────────────────────────────────────────────────────────

export type RatingSize = NovelSize;

export interface RatingProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "onChange"
> {
  /** 当前评分值，范围 0..max */
  value: number;
  /** 满分；默认 10 */
  max?: number;
  size?: RatingSize;
  /** 是否在右侧显示数值文本 */
  showValue?: boolean;
  /** 评分人数；showValue=true 时附在数值后 */
  ratingCount?: number;
  /** 提供则切换为可交互模式（hover + 点击 + 键盘） */
  onChange?: (value: number) => void;
  /** 强制只读（即使提供了 onChange） */
  readOnly?: boolean;
  /** 当前值的语义标签（屏幕阅读器用），默认 `${value} / ${max}` */
  ariaLabel?: string;
  ref?: Ref<HTMLSpanElement>;
}

export function Rating({ size = "md", ...rest }: RatingProps) {
  return <MinervaRating {...rest} size={SIZE[size]} />;
}

export interface RatingScaleProps {
  dimensions: readonly RatingDimension[];
  /** 单维满分；默认 10。所有维度共享同一刻度 */
  max?: number;
  size?: RatingSize;
  /** 提供则切换为可交互模式 */
  onChange?: (key: string, value: number) => void;
  readOnly?: boolean;
  /** 是否在每行右侧显示数值 */
  showValue?: boolean;
  className?: string;
}

export function RatingScale({ size = "md", ...rest }: RatingScaleProps) {
  return <MinervaRatingScale {...rest} size={SIZE[size]} />;
}

// ─── MonthCalendar ──────────────────────────────────────────────────────────

export interface MonthCalendarProps {
  month: Date;
  /** Receives the first day of the requested month, at local midnight. */
  onMonthChange: (month: Date) => void;
  value?: string;
  onValueChange: (dayKey: string) => void;
  events: readonly MonthCalendarEvent[];
  onEventClick?: (event: MonthCalendarEvent) => void;
  disabled?: boolean;
  showSelectedDayEvents?: boolean;
  className?: string;
  "aria-label"?: string;
}

const ZH_WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"] as const;

export function MonthCalendar({
  onValueChange,
  "aria-label": ariaLabel = "月历",
  ...rest
}: MonthCalendarProps) {
  return (
    <MinervaMonthCalendar
      {...rest}
      onChange={onValueChange}
      ariaLabel={ariaLabel}
      locale="zh-CN"
      weekdayLabels={ZH_WEEKDAYS}
      previousMonthLabel="上个月"
      nextMonthLabel="下个月"
      todayLabel="今天"
      emptyEventsText="暂无日程"
      getDayLabel={(day, count) => (count ? `${day}，${count} 项日程` : day)}
      getEventsLabel={(day) => `${day} 日程`}
    />
  );
}
