import { useId, useRef } from "react";
import { LuPlus, LuX } from "react-icons/lu";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import { useControllableState } from "../../internal/useControllableState";
import { Button } from "../Button";
import { FormField } from "../FormControl/FormControl";
import { IconButton } from "../IconButton";
import { Textarea } from "../Textarea/Textarea";
import type { KeyValueEditorProps, KeyValueEntry } from "./types";
import styles from "./keyValueEditor.module.scss";

const EMPTY: KeyValueEntry[] = [];

/**
 * KeyValueEditor: ordered list of editable string pairs (multi-line keys and
 * values), with add / remove actions. Rows are tracked by their stable `id`,
 * so duplicate keys and reordering are safe.
 */
export const KeyValueEditor = ({
  entries: entriesProp,
  defaultEntries = EMPTY,
  onChange,
  disabled = false,
  keyLabel,
  valueLabel,
  addLabel,
  removeLabel,
  errors,
  className,
  ref,
  ...rest
}: KeyValueEditorProps) => {
  const { t } = useI18n();
  const editorId = useId();
  const nextId = useRef(0);
  const [entries, setEntries] = useControllableState({
    value: entriesProp,
    defaultValue: defaultEntries,
    onChange,
  });
  const keyText = keyLabel ?? t("keyValueEditor.key");
  const valueText = valueLabel ?? t("keyValueEditor.value");
  const removeText = removeLabel ?? t("keyValueEditor.remove");

  const add = () => {
    if (disabled) return;
    let id: string;
    do {
      id = `key-value-${editorId}-${nextId.current++}`;
    } while (entries.some((entry) => entry.id === id));
    setEntries([...entries, { id, key: "", value: "" }]);
  };

  const update = (id: string, field: "key" | "value", text: string) => {
    if (disabled) return;
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, [field]: text } : entry,
      ),
    );
  };

  const remove = (id: string) => {
    if (!disabled) setEntries(entries.filter((entry) => entry.id !== id));
  };

  const numbered = (text: string, index: number) => (
    <>
      {text}
      <span className={styles.srOnly}> {index + 1}</span>
    </>
  );

  return (
    <div
      ref={ref}
      {...rest}
      className={cn(styles.root, "ui-key-value-editor", className)}
      data-disabled={disabled || undefined}
    >
      {entries.map((entry, index) => {
        const error = errors?.[entry.id];
        return (
          <div
            className={cn(styles.row, "ui-key-value-editor-row")}
            key={entry.id}
          >
            <FormField
              label={numbered(keyText, index)}
              disabled={disabled}
              invalid={Boolean(error?.key)}
              errorMessage={error?.key}
            >
              <Textarea
                className={cn(styles.key, "ui-key-value-editor-key")}
                size="small"
                rows={1}
                value={entry.key}
                onChange={(event) =>
                  update(entry.id, "key", event.target.value)
                }
              />
            </FormField>
            <FormField
              label={numbered(valueText, index)}
              disabled={disabled}
              invalid={Boolean(error?.value)}
              errorMessage={error?.value}
            >
              <Textarea
                size="small"
                rows={2}
                value={entry.value}
                onChange={(event) =>
                  update(entry.id, "value", event.target.value)
                }
              />
            </FormField>
            <IconButton
              className={cn(styles.remove, "ui-key-value-editor-remove")}
              type="button"
              label={`${removeText} ${index + 1}`}
              size="small"
              shape="square"
              icon={<LuX size={16} aria-hidden />}
              disabled={disabled}
              onClick={() => remove(entry.id)}
            />
          </div>
        );
      })}
      <Button
        className={cn(styles.add, "ui-key-value-editor-add")}
        type="button"
        variant="secondary"
        size="small"
        disabled={disabled}
        onClick={add}
      >
        <LuPlus size={16} aria-hidden />
        <span>{addLabel ?? t("keyValueEditor.add")}</span>
      </Button>
    </div>
  );
};

export default KeyValueEditor;
