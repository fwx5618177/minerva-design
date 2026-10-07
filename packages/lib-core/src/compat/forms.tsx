/**
 * @novel-isr/ui compatibility layer: "forms" group
 * (FormControl family, FormLayout, Input, Textarea, NumberInput, JsonField,
 * KeyValueEditor, TagInput).
 *
 * Exposes novel-isr-ui's exact export names and prop shapes on top of the
 * Minerva components: `isInvalid / isRequired / isDisabled / isReadOnly`
 * -> `invalid / required / disabled / readOnly`, sizes `sm | md | lg` ->
 * `small | medium | large`, TagInput `onValueChange` -> `onChange`.
 */
import type {
  AriaAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  Ref,
  TextareaHTMLAttributes,
} from "react";
import {
  FormControl as MinervaFormControl,
  FormField as MinervaFormField,
} from "../components/FormControl/FormControl";
import {
  useFormControlContext as minervaUseFormControlContext,
  type FormControlContextValue as MinervaFormControlContextValue,
} from "../components/FormControl/context";
import MinervaInput from "../components/Input/Input";
import MinervaTextarea from "../components/Textarea/Textarea";
import MinervaNumberInput from "../components/NumberInput/NumberInput";
import MinervaJsonField from "../components/JsonField/JsonField";
import MinervaKeyValueEditor from "../components/KeyValueEditor/KeyValueEditor";
import MinervaTagInput from "../components/TagInput/TagInput";
import type { FormLayoutProps as MinervaFormLayoutProps } from "../components/FormLayout/types";
import type {
  KeyValueEditorProps as MinervaKeyValueEditorProps,
  KeyValueEntry,
  KeyValueEntryErrors,
} from "../components/KeyValueEditor/types";

export {
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from "../components/FormControl/FormControl";
export { useFormControlProps } from "../components/FormControl/context";
export type { FormLabelProps } from "../components/FormControl/types";
export { FormLayout } from "../components/FormLayout/FormLayout";
export type { KeyValueEntry, KeyValueEntryErrors };

type NovelSize = "sm" | "md" | "lg";
const SIZE = { sm: "small", md: "medium", lg: "large" } as const;

// ─── FormControl ────────────────────────────────────────────────────────────

export interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  /** 显式 id（不传自动生成） */
  id?: string;
  ref?: Ref<HTMLDivElement>;
}

export function FormControl({
  isInvalid,
  isRequired,
  isDisabled,
  isReadOnly,
  ...rest
}: FormControlProps) {
  return (
    <MinervaFormControl
      invalid={isInvalid}
      required={isRequired}
      disabled={isDisabled}
      readOnly={isReadOnly}
      {...rest}
    />
  );
}

export interface FormFieldProps extends FormControlProps {
  label: ReactNode;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
}

export function FormField({
  isInvalid,
  isRequired,
  isDisabled,
  isReadOnly,
  ...rest
}: FormFieldProps) {
  return (
    <MinervaFormField
      invalid={isInvalid}
      required={isRequired}
      disabled={isDisabled}
      readOnly={isReadOnly}
      {...rest}
    />
  );
}

/** novel-isr-ui's context shape (is* flags), plus Minerva's names. */
type NovelFormControlContextValue = MinervaFormControlContextValue & {
  isInvalid: boolean;
  isRequired: boolean;
  isDisabled: boolean;
  isReadOnly: boolean;
};

export function useFormControlContext(): NovelFormControlContextValue | null {
  const ctx = minervaUseFormControlContext();
  if (!ctx) return null;
  return {
    ...ctx,
    isInvalid: ctx.invalid,
    isRequired: ctx.required,
    isDisabled: ctx.disabled,
    isReadOnly: ctx.readOnly,
  };
}

// ─── FormLayout ─────────────────────────────────────────────────────────────

export type FormLayoutProps = MinervaFormLayoutProps;

// ─── Input ──────────────────────────────────────────────────────────────────

export type InputVariant = "outline" | "filled" | "unstyled";
export type InputSize = NovelSize;

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix"
> {
  variant?: InputVariant;
  size?: InputSize;
  isInvalid?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  ref?: Ref<HTMLInputElement>;
}

export function Input({ size = "md", isInvalid, ...rest }: InputProps) {
  return <MinervaInput size={SIZE[size]} invalid={isInvalid} {...rest} />;
}

// ─── Textarea ───────────────────────────────────────────────────────────────

export type TextareaVariant = "outline" | "filled" | "unstyled";
export type TextareaSize = NovelSize;
export type TextareaResize = "none" | "vertical" | "horizontal" | "both";

export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size" | "resize"
> {
  variant?: TextareaVariant;
  size?: TextareaSize;
  isInvalid?: boolean;
  /** @deprecated Manual resizing is disabled. Set rows or layout dimensions instead. */
  resize?: TextareaResize;
  ref?: Ref<HTMLTextAreaElement>;
}

export function Textarea({
  size = "md",
  isInvalid,
  resize,
  ...rest
}: TextareaProps) {
  void resize; // deprecated no-op, never forwarded to the DOM
  return <MinervaTextarea size={SIZE[size]} invalid={isInvalid} {...rest} />;
}

// ─── NumberInput ────────────────────────────────────────────────────────────

export type NumberInputSize = NovelSize;

export interface NumberInputProps {
  value: number | null | undefined;
  onChange: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  /** 小数位数；默认按 step 推导（step=1 → 0, step=0.01 → 2） */
  precision?: number;
  size?: NumberInputSize;
  isInvalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  showStepper?: boolean;
  /** 允许清空（输入空字符串时回调 null）；默认 true */
  allowEmpty?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  ref?: Ref<HTMLInputElement>;
}

export function NumberInput({
  value,
  size = "md",
  isInvalid,
  ...rest
}: NumberInputProps) {
  return (
    <MinervaNumberInput
      // novel-isr-ui is always controlled: undefined means "empty".
      value={value ?? null}
      size={SIZE[size]}
      invalid={isInvalid}
      // novel-isr-ui's built-in (Chinese) strings
      incrementLabel="增加"
      decrementLabel="减少"
      notANumberMessage="请输入数字"
      belowMinMessage={
        rest.min === undefined ? undefined : `最小值 ${rest.min}`
      }
      aboveMaxMessage={
        rest.max === undefined ? undefined : `最大值 ${rest.max}`
      }
      {...rest}
    />
  );
}

// ─── JsonField ──────────────────────────────────────────────────────────────

export interface JsonFieldProps extends Omit<
  TextareaProps,
  "value" | "defaultValue" | "onChange"
> {
  value: string;
  onChange: (value: string) => void;
  /** Hides formatting controls, but syntax feedback remains accessible. */
  hideToolbar?: boolean;
  /** Spaces per indentation level, 0 to 10. Zero produces compact JSON. */
  indent?: number;
  formatLabel?: string;
  validLabel?: string;
  invalidLabel?: string;
}

export function JsonField({
  size = "md",
  isInvalid,
  resize,
  formatLabel = "格式化 JSON",
  validLabel = "JSON 语法正确",
  invalidLabel = "JSON 语法错误",
  ...rest
}: JsonFieldProps) {
  void resize; // deprecated no-op, never forwarded to the DOM
  return (
    <MinervaJsonField
      size={SIZE[size]}
      invalid={isInvalid}
      formatLabel={formatLabel}
      validLabel={validLabel}
      invalidLabel={invalidLabel}
      {...rest}
    />
  );
}

// ─── KeyValueEditor ─────────────────────────────────────────────────────────

export interface KeyValueEditorProps extends Omit<
  MinervaKeyValueEditorProps,
  "entries" | "defaultEntries" | "onChange" | "ref"
> {
  entries: KeyValueEntry[];
  onChange: (entries: KeyValueEntry[]) => void;
}

export function KeyValueEditor({
  // novel-isr-ui's built-in strings (English in the original)
  keyLabel = "Key",
  valueLabel = "Value",
  addLabel = "Add entry",
  removeLabel = "Remove entry",
  ...rest
}: KeyValueEditorProps) {
  return (
    <MinervaKeyValueEditor
      keyLabel={keyLabel}
      valueLabel={valueLabel}
      addLabel={addLabel}
      removeLabel={removeLabel}
      {...rest}
    />
  );
}

// ─── TagInput ───────────────────────────────────────────────────────────────

export interface TagInputProps {
  value: readonly string[];
  onValueChange: (value: string[]) => void;
  options?: readonly string[];
  commitOnBlur?: boolean;
  addLabel?: string;
  clearLabel?: string;
  removeLabel?: (tag: string) => string;
  createLabel?: (tag: string) => string;
  id?: string;
  name?: string;
  placeholder?: string;
  "aria-label"?: string;
  "aria-describedby"?: AriaAttributes["aria-describedby"];
  disabled?: boolean;
  readOnly?: boolean;
  size?: NovelSize;
  emptyText?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
}

export function TagInput({
  onValueChange,
  size = "md",
  // novel-isr-ui's built-in strings (English labels, Chinese empty text)
  addLabel = "Add tag",
  clearLabel = "Clear tags",
  removeLabel = (tag) => `Remove ${tag}`,
  createLabel = (tag) => `Add "${tag}"`,
  emptyText = "无匹配项",
  ...rest
}: TagInputProps) {
  return (
    <MinervaTagInput
      onChange={onValueChange}
      size={SIZE[size]}
      addLabel={addLabel}
      clearLabel={clearLabel}
      removeLabel={removeLabel}
      createLabel={createLabel}
      emptyText={emptyText}
      {...rest}
    />
  );
}
