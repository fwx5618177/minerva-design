import { useFormControlProps } from "../../internal/FormControlContext";
import {
  applyEdits,
  createScanner,
  format,
} from "jsonc-parser/lib/esm/main.js";
import { useId, useRef, useState, useEffect } from "react";
import { Platform, ScrollView, Text, View, type ViewProps } from "react-native";
import { DEFAULT_TAG_SEPARATORS, splitBySeparators } from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { textStyle } from "../../internal/styles";
import { useControllable } from "../../internal/useControllable";
import { bindFormControl } from "../../internal/formControl";
import { Button } from "../Button";
import { Input, type InputProps } from "../Input";
import { Textarea, type TextareaProps } from "../Textarea";
export interface TagInputProps extends Omit<
  InputProps,
  "value" | "defaultValue" | "onChange"
> {
  value?: readonly string[];
  defaultValue?: readonly string[];
  onChange?: (value: string[]) => void;
  options?: readonly string[];
  /** @default true */
  commitOnBlur?: boolean;
  separators?: readonly string[];
  emptyText?: string;
  addLabel?: string;
  clearLabel?: string;
  removeLabel?: (tag: string) => string;
}
export function TagInput(componentProps: TagInputProps) {
  const {
    value,
    defaultValue = [],
    onChange,
    options = [],
    commitOnBlur = true,
    separators = DEFAULT_TAG_SEPARATORS,
    emptyText,
    addLabel,
    clearLabel,
    removeLabel,
    disabled,
    readOnly,
    style,
    onBlur,
    onSubmitEditing,
    ...props
  } = useFormControlProps(componentProps);
  const [tags, setTags] = useControllable<readonly string[]>(
    value,
    defaultValue,
    (next) => onChange?.([...next]),
  );
  const [draft, setDraft] = useState("");
  const { tokens: t } = useTheme();
  const { t: translate } = useI18n();
  const locked = disabled || readOnly;
  const literals = separators
    .filter((s) => s && s !== "Enter")
    .concat(separators.includes("Enter") ? ["\r\n", "\r", "\n"] : []);
  const add = (parts: readonly string[]) => {
    const next = [
      ...new Set([...tags, ...parts.map((s) => s.trim()).filter(Boolean)]),
    ];
    if (next.length !== tags.length) setTags(next);
  };
  const matches = [...new Set(options)].filter(
    (option) =>
      !tags.includes(option) &&
      option.toLowerCase().includes(draft.toLowerCase()),
  );
  const commit = () => {
    if (locked) return;
    add(splitBySeparators(draft, literals));
    setDraft("");
  };
  return (
    <View style={[{ gap: t.space["2"] }, style]}>
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", gap: t.space["2"] }}
      >
        {tags.map((tag) => (
          <View
            key={tag}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: t.space["1"],
              borderRadius: t.radius.md,
              backgroundColor: t.colors["primary-color-subtle"],
            }}
          >
            <Text style={textStyle(t)}>{tag}</Text>
            {!readOnly && (
              <Button
                variant="ghost"
                size="xsmall"
                disabled={disabled}
                accessibilityLabel={
                  removeLabel?.(tag) ?? translate("tagInput.remove", { tag })
                }
                onPress={() => setTags(tags.filter((v) => v !== tag))}
              >
                ×
              </Button>
            )}
          </View>
        ))}
      </View>
      <Input
        {...props}
        value={draft}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(text) => {
          if (locked) return;
          const pieces = splitBySeparators(text, literals);
          setDraft(pieces.pop() ?? "");
          if (pieces.length) add(pieces);
        }}
        onSubmitEditing={(event) => {
          onSubmitEditing?.(event);
          if (separators.includes("Enter")) commit();
        }}
        onBlur={(event) => {
          onBlur?.(event);
          if (commitOnBlur) commit();
        }}
      />
      {!readOnly && (
        <View style={{ flexDirection: "row", gap: t.space["2"] }}>
          <Button
            variant="outline"
            disabled={disabled || !draft.trim()}
            onPress={commit}
          >
            {addLabel ?? translate("tagInput.add")}
          </Button>
          <Button
            variant="ghost"
            disabled={disabled || !tags.length}
            onPress={() => {
              setTags([]);
              setDraft("");
            }}
          >
            {clearLabel ?? translate("tagInput.clear")}
          </Button>
        </View>
      )}
      {!locked &&
        Boolean(draft) &&
        options.length > 0 &&
        matches.length === 0 && (
          <Text style={textStyle(t, "sm")}>
            {emptyText ?? translate("tagInput.empty")}
          </Text>
        )}
      {!locked &&
        Boolean(draft) &&
        matches.map((option) => (
          <Button
            key={option}
            variant="ghost"
            onPress={() => {
              add([option]);
              setDraft("");
            }}
          >
            {option}
          </Button>
        ))}
    </View>
  );
}
bindFormControl(TagInput, { emptyValue: [], commitOnChange: true });
export interface KeyValueEntry {
  id: string;
  key: string;
  value: string;
}
export interface KeyValueEntryErrors {
  key?: string;
  value?: string;
}
export interface KeyValueEditorProps extends Omit<ViewProps, "onChange"> {
  entries?: KeyValueEntry[];
  defaultEntries?: KeyValueEntry[];
  onChange?: (entries: KeyValueEntry[]) => void;
  /** @default false */
  disabled?: boolean;
  keyLabel?: string;
  valueLabel?: string;
  addLabel?: string;
  removeLabel?: string;
  errors?: Record<string, KeyValueEntryErrors>;
}
export function KeyValueEditor(componentProps: KeyValueEditorProps) {
  const {
    entries,
    defaultEntries = [],
    onChange,
    disabled = false,
    keyLabel,
    valueLabel,
    addLabel,
    removeLabel,
    errors = {},
    style,
    ...props
  } = useFormControlProps(componentProps);
  const [rows, setRows] = useControllable(entries, defaultEntries, onChange);
  const prefix = useId();
  const sequence = useRef(0);
  const { tokens: t } = useTheme();
  const { t: translate } = useI18n();
  const update = (id: string, field: "key" | "value", value: string) =>
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  return (
    <View {...props} style={[{ gap: t.space["3"] }, style]}>
      {rows.map((row, index) => (
        <View key={row.id} style={{ gap: t.space["2"] }}>
          <Input
            accessibilityLabel={`${keyLabel ?? translate("keyValueEditor.key")} ${index + 1}`}
            value={row.key}
            disabled={disabled}
            invalid={!!errors[row.id]?.key}
            onChange={(value) => update(row.id, "key", value)}
          />
          {Boolean(errors[row.id]?.key) && (
            <Text accessibilityRole="alert" style={textStyle(t)}>
              {errors[row.id].key}
            </Text>
          )}
          <Textarea
            accessibilityLabel={`${valueLabel ?? translate("keyValueEditor.value")} ${index + 1}`}
            rows={2}
            value={row.value}
            disabled={disabled}
            invalid={!!errors[row.id]?.value}
            onChange={(value) => update(row.id, "value", value)}
          />
          {Boolean(errors[row.id]?.value) && (
            <Text accessibilityRole="alert" style={textStyle(t)}>
              {errors[row.id].value}
            </Text>
          )}
          <Button
            variant="ghost"
            disabled={disabled}
            accessibilityLabel={`${removeLabel ?? translate("keyValueEditor.remove")} ${index + 1}`}
            onPress={() => setRows(rows.filter((item) => item.id !== row.id))}
          >
            {removeLabel ?? translate("keyValueEditor.remove")}
          </Button>
        </View>
      ))}
      <Button
        variant="outline"
        disabled={disabled}
        onPress={() => {
          let id: string;
          do {
            id = `${prefix}-${++sequence.current}`;
          } while (rows.some((row) => row.id === id));
          setRows([...rows, { id, key: "", value: "" }]);
        }}
      >
        {addLabel ?? translate("keyValueEditor.add")}
      </Button>
    </View>
  );
}
function formatJsonText(value: string, indent: number): string {
  const spaces = Math.min(10, Math.max(0, Math.trunc(indent) || 0));
  if (spaces > 0)
    return applyEdits(
      value,
      format(value, undefined, {
        tabSize: spaces,
        insertSpaces: true,
        eol: "\n",
      }),
    );
  const scanner = createScanner(value, true);
  const tokens: string[] = [];
  while (scanner.getPosition() < value.length) {
    scanner.scan();
    const offset = scanner.getTokenOffset();
    tokens.push(value.slice(offset, offset + scanner.getTokenLength()));
  }
  return tokens.join("");
}
export interface JsonFieldProps extends TextareaProps {
  /** @default 8 */
  rows?: number;
  /** @default false */
  hideToolbar?: boolean;
  /** @default 2 */
  indent?: number;
  formatLabel?: string;
  validLabel?: string;
  invalidLabel?: string;
}
export function JsonField(componentProps: JsonFieldProps) {
  const {
    value,
    defaultValue = "",
    onChange,
    hideToolbar = false,
    indent = 2,
    formatLabel,
    validLabel,
    invalidLabel,
    disabled,
    readOnly,
    invalid,
    style,
    ...props
  } = useFormControlProps(componentProps);
  const [text, setText] = useControllable(value, defaultValue, onChange);
  const { tokens: t } = useTheme();
  const { t: translate } = useI18n();
  const invalidMessage = invalidLabel ?? translate("jsonField.invalid");
  let error = "";
  if (text.trim())
    try {
      JSON.parse(text);
    } catch (cause) {
      error = cause instanceof Error ? cause.message : String(cause);
    }
  return (
    <View style={style}>
      {!hideToolbar && (
        <Button
          variant="ghost"
          disabled={disabled || readOnly || !!error || !text.trim()}
          onPress={() => setText(formatJsonText(text, indent))}
        >
          {formatLabel ?? translate("jsonField.format")}
        </Button>
      )}
      <Textarea
        {...props}
        rows={props.rows ?? 8}
        autoCapitalize="none"
        autoCorrect={false}
        value={text}
        onChange={setText}
        disabled={disabled}
        readOnly={readOnly}
        invalid={invalid || !!error}
        accessibilityHint={
          error ? `${invalidMessage}: ${error}` : props.accessibilityHint
        }
      />
      {Boolean(text.trim()) && (
        <Text
          accessibilityRole={error ? "alert" : undefined}
          accessibilityLiveRegion="polite"
          style={[
            textStyle(t, "sm"),
            {
              color: error
                ? t.colors["danger-color"]
                : t.colors["success-color-text"],
            },
          ]}
        >
          {error
            ? `${invalidMessage}: ${error}`
            : (validLabel ?? translate("jsonField.valid"))}
        </Text>
      )}
    </View>
  );
}
bindFormControl(JsonField, {});
export interface CodeBlockProps extends Omit<ViewProps, "children"> {
  children: string;
  /** @default true */
  wrap?: boolean;
  /** @default 384 */
  maxHeight?: number;
  /** @default false */
  copyable?: boolean;
  /** Native clipboard adapter, e.g. Expo Clipboard.setStringAsync. */ copyText?: (
    text: string,
  ) => Promise<void> | void;
  onCopied?: (text: string) => void;
  onCopyError?: (error: unknown) => void;
}
export function CodeBlock({
  children,
  wrap = true,
  maxHeight = 384,
  copyable = false,
  copyText,
  onCopied,
  onCopyError,
  style,
  ...props
}: CodeBlockProps) {
  const { tokens: t, fonts } = useTheme();
  const { t: translate } = useI18n();
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const browserClipboard =
    typeof navigator !== "undefined"
      ? (
          navigator as unknown as {
            clipboard?: { writeText: (text: string) => Promise<void> };
          }
        ).clipboard
      : undefined;
  const clipboard =
    copyText ??
    (Platform.OS === "web" && browserClipboard
      ? (text: string) => browserClipboard.writeText(text)
      : undefined);
  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: t.colors["surface-muted-color"],
          borderRadius: t.radius.md,
          padding: t.space["3"],
          maxHeight,
        },
        style,
      ]}
    >
      {copyable && (
        <Button
          variant="ghost"
          disabled={!clipboard}
          loading={busy}
          accessibilityLabel={translate("codeBlock.copy")}
          onPress={async () => {
            if (!clipboard) return;
            setBusy(true);
            try {
              await clipboard(children);
              setStatus(translate("codeBlock.copied"));
              onCopied?.(children);
            } catch (error) {
              setStatus(translate("codeBlock.copyFailed"));
              onCopyError?.(error);
            } finally {
              setBusy(false);
            }
          }}
        >
          {translate("codeBlock.copy")}
        </Button>
      )}
      {Boolean(status) && (
        <Text accessibilityLiveRegion="polite" style={textStyle(t, "sm")}>
          {status}
        </Text>
      )}
      <ScrollView style={{ maxHeight, flexGrow: 0 }}>
        <ScrollView horizontal={!wrap} style={{ flexGrow: 0 }}>
          <Text
            selectable
            style={[
              textStyle(
                t,
                "sm",
                fonts.mono ?? (Platform.OS === "ios" ? "Menlo" : "monospace"),
              ),
            ]}
          >
            {children}
          </Text>
        </ScrollView>
      </ScrollView>
    </View>
  );
}
export interface CodeEditorProps extends Omit<TextareaProps, "label"> {
  label: string;
  language?: string;
  format?: (source: string) => string | Promise<string>;
  formatLabel?: string;
  onFormatError?: (error: unknown) => void;
}
/** Accessible native source editor with optional language-specific formatter. */
export function CodeEditor(componentProps: CodeEditorProps) {
  const {
    value,
    defaultValue = "",
    onChange,
    label,
    language = "plaintext",
    format,
    formatLabel = "Format code",
    onFormatError,
    disabled,
    readOnly,
    inputStyle,
    ...props
  } = useFormControlProps(componentProps);
  const [source, setSource] = useControllable(value, defaultValue, onChange);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const latest = useRef(source);
  useEffect(() => {
    latest.current = source;
  }, [source]);
  const { fonts, tokens: t } = useTheme();
  return (
    <View>
      {format && (
        <Button
          variant="ghost"
          disabled={disabled || readOnly}
          loading={busy}
          onPress={async () => {
            if (!format || busy) return;
            const started = source;
            setBusy(true);
            setError("");
            try {
              const result = await format(started);
              if (latest.current === started) setSource(result);
            } catch (cause) {
              setError(cause instanceof Error ? cause.message : String(cause));
              onFormatError?.(cause);
            } finally {
              setBusy(false);
            }
          }}
        >
          {formatLabel}
        </Button>
      )}
      <Textarea
        {...props}
        label={label}
        accessibilityHint={props.accessibilityHint ?? language}
        rows={props.rows ?? 12}
        value={source}
        onChange={setSource}
        disabled={disabled}
        readOnly={readOnly}
        autoCapitalize="none"
        autoCorrect={false}
        inputStyle={[
          {
            fontFamily:
              fonts.mono ?? (Platform.OS === "ios" ? "Menlo" : "monospace"),
          },
          inputStyle,
        ]}
      />
      {Boolean(error) && (
        <Text
          accessibilityRole="alert"
          style={[textStyle(t), { color: t.colors["danger-color"] }]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
bindFormControl(CodeEditor, {});
