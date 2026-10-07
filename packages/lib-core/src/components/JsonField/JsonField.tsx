import { useId, useState } from "react";
import { applyEdits, createScanner, format } from "jsonc-parser";
import { LuBraces, LuCircleAlert, LuCircleCheck } from "react-icons/lu";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import { useControllableState } from "../../internal/useControllableState";
import { useFormControlContext } from "../FormControl/context";
import { IconButton } from "../IconButton";
import { Textarea } from "../Textarea/Textarea";
import type { JsonFieldProps } from "./types";
import styles from "./jsonField.module.scss";

type Validation =
  { status: "empty" | "valid" } | { status: "invalid"; error: string };

function validate(value: string): Validation {
  if (!value.trim()) return { status: "empty" };
  try {
    JSON.parse(value);
    return { status: "valid" };
  } catch (error) {
    return {
      status: "invalid",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Re-indents with jsonc-parser text edits, so numeric lexemes, escapes,
 * duplicate keys and key order are preserved (no JSON.parse round trip).
 */
function formatJson(value: string, indent: number): string {
  const spaces = Math.min(10, Math.max(0, Math.trunc(indent) || 0));
  if (spaces > 0) {
    return applyEdits(
      value,
      format(value, undefined, {
        tabSize: spaces,
        insertSpaces: true,
        eol: "\n",
      }),
    );
  }
  // Compact: concatenate the tokens, dropping whitespace between them.
  const scanner = createScanner(value, true);
  const tokens: string[] = [];
  while (scanner.getPosition() < value.length) {
    scanner.scan();
    const offset = scanner.getTokenOffset();
    tokens.push(value.slice(offset, offset + scanner.getTokenLength()));
  }
  return tokens.join("");
}

/**
 * JsonField: strict-JSON textarea with a format button and accessible syntax
 * feedback (withheld while focused, re-checked on blur). FormControl-aware;
 * `ref` reaches the <textarea>, `className` the wrapper.
 */
export const JsonField = ({
  value,
  defaultValue = "",
  onChange,
  rows = 8,
  hideToolbar = false,
  indent = 2,
  className,
  formatLabel,
  validLabel,
  invalidLabel,
  disabled: disabledProp,
  readOnly: readOnlyProp,
  required: requiredProp,
  invalid = false,
  onFocus,
  onBlur,
  "aria-describedby": describedBy,
  "aria-invalid": ariaInvalid,
  spellCheck = false,
  ...rest
}: JsonFieldProps) => {
  const { t } = useI18n();
  const field = useFormControlContext();
  const disabled = Boolean(disabledProp || field?.disabled);
  const readOnly = Boolean(readOnlyProp || field?.readOnly);
  const required = Boolean(requiredProp || field?.required);
  const statusId = `json-status-${useId()}`;
  const [text, setText] = useControllableState({
    value,
    defaultValue,
    onChange,
  });
  const [focused, setFocused] = useState(false);
  const validation: Validation = focused ? { status: "empty" } : validate(text);
  const syntaxInvalid = validation.status === "invalid";

  const formatNow = () => {
    if (disabled || readOnly || validate(text).status !== "valid") return;
    setText(formatJson(text, indent));
  };

  return (
    <div className={cn(styles.root, "ui-json-field", className)}>
      {!hideToolbar && (
        <div className={cn(styles.toolbar, "ui-json-field-toolbar")}>
          <IconButton
            className="ui-json-field-format"
            type="button"
            label={formatLabel ?? t("jsonField.format")}
            size="small"
            shape="square"
            icon={<LuBraces size={18} aria-hidden />}
            disabled={disabled || readOnly || !text.trim()}
            onClick={formatNow}
          />
        </div>
      )}
      <Textarea
        {...rest}
        rows={rows}
        value={text}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        spellCheck={spellCheck}
        className={cn(styles.textarea, "ui-json-field-textarea")}
        aria-invalid={
          syntaxInvalid || invalid
            ? true
            : ariaInvalid === "false"
              ? false
              : ariaInvalid
        }
        aria-describedby={
          [describedBy, syntaxInvalid ? statusId : undefined]
            .filter(Boolean)
            .join(" ") || undefined
        }
        onChange={(event) => {
          if (!disabled && !readOnly) setText(event.target.value);
        }}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
      />
      <div
        id={statusId}
        role="status"
        aria-live="polite"
        className={cn(
          styles.status,
          syntaxInvalid && styles.statusInvalid,
          "ui-json-field-status",
          syntaxInvalid && "ui-json-field-status-invalid",
        )}
      >
        {validation.status === "valid" && (
          <>
            <LuCircleCheck size={16} aria-hidden />
            <span>{validLabel ?? t("jsonField.valid")}</span>
          </>
        )}
        {validation.status === "invalid" && (
          <>
            <LuCircleAlert size={16} aria-hidden />
            <span>
              {invalidLabel ?? t("jsonField.invalid")}: {validation.error}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default JsonField;
