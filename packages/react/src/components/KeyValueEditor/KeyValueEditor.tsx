import { useEffect, useId, useRef } from "react";
import { IconPlus, IconX } from "../../internal/icons";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import { Button } from "../Button";
import { FormField } from "../FormControl/FormControl";
import { IconButton } from "../IconButton";
import { Textarea } from "../Textarea/Textarea";
import type { KeyValueEditorProps, KeyValueEntry } from "./types";
import { hooks } from "../../internal/stylingHooks";
import styles from "./keyValueEditor.module.scss";

const EMPTY: KeyValueEntry[] = [];

/**
 * KeyValueEditor: ordered list of editable string pairs (multi-line keys and
 * values), with add / remove actions. Rows are tracked by their stable `id`,
 * so duplicate keys and reordering are safe. Keyboard focus follows the
 * actions: adding a row focuses its key field; removing one focuses the next
 * row's remove button (else the previous one, else the add button).
 */
export const KeyValueEditor = ({
  entries: entriesProp,
  defaultEntries: defaultEntriesProp,
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
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("KeyValueEditor", {
      prop: "entries",
      value: entriesProp,
      defaultProp: "defaultEntries",
      defaultValue: defaultEntriesProp,
      handlerProp: "onChange",
      handler: onChange,
      locked: disabled,
      lockHint: "set `disabled`",
    });
  }
  const [entries, setEntries] = useControllableState({
    value: entriesProp,
    defaultValue: defaultEntriesProp ?? EMPTY,
    onChange,
    name: "KeyValueEditor",
    prop: "entries",
  });
  const keyText = keyLabel ?? t("keyValueEditor.key");
  const valueText = valueLabel ?? t("keyValueEditor.value");
  const removeText = removeLabel ?? t("keyValueEditor.remove");

  // Focus management: without it, removing a row drops focus to <body> (the
  // focused remove button unmounts) and a new row has to be found by hand.
  const keyFields = useRef(new Map<string, HTMLTextAreaElement>());
  const removeButtons = useRef(new Map<string, HTMLButtonElement>());
  const addButton = useRef<HTMLButtonElement>(null);
  const pendingFocus = useRef<
    | { kind: "add"; id: string }
    | { kind: "remove"; id: string; nextId?: string }
    | null
  >(null);
  useEffect(() => {
    const pending = pendingFocus.current;
    if (!pending) return;
    // Settled once the entries change (a controlled parent may reject it).
    pendingFocus.current = null;
    const has = (id?: string) => entries.some((entry) => entry.id === id);
    if (pending.kind === "add") {
      if (has(pending.id)) keyFields.current.get(pending.id)?.focus();
    } else if (!has(pending.id)) {
      const next = pending.nextId && removeButtons.current.get(pending.nextId);
      (next || addButton.current)?.focus();
    }
  }, [entries]);

  const add = () => {
    if (disabled) return;
    let id: string;
    do {
      id = `key-value-${editorId}-${nextId.current++}`;
    } while (entries.some((entry) => entry.id === id));
    pendingFocus.current = { kind: "add", id };
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
    if (disabled) return;
    const index = entries.findIndex((entry) => entry.id === id);
    const neighbour = entries[index + 1] ?? entries[index - 1];
    pendingFocus.current = { kind: "remove", id, nextId: neighbour?.id };
    setEntries(entries.filter((entry) => entry.id !== id));
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
      className={cn(styles.root, className)}
      {...hooks("key-value-editor", "root", { disabled })}
    >
      {entries.map((entry, index) => {
        const error = errors?.[entry.id];
        return (
          <div
            className={styles.row}
            key={entry.id}
            {...hooks("key-value-editor", "row", {
              invalid: Boolean(error?.key || error?.value),
            })}
          >
            <FormField
              label={numbered(keyText, index)}
              disabled={disabled}
              invalid={Boolean(error?.key)}
              errorMessage={error?.key}
            >
              <Textarea
                ref={(node) => {
                  if (node) keyFields.current.set(entry.id, node);
                  else keyFields.current.delete(entry.id);
                }}
                className={styles.key}
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
              ref={(node) => {
                if (node) removeButtons.current.set(entry.id, node);
                else removeButtons.current.delete(entry.id);
              }}
              className={styles.remove}
              type="button"
              label={`${removeText} ${index + 1}`}
              size="small"
              shape="square"
              icon={<IconX size={16} aria-hidden />}
              disabled={disabled}
              onClick={() => remove(entry.id)}
            />
          </div>
        );
      })}
      <Button
        ref={addButton}
        className={styles.add}
        type="button"
        color="neutral"
        variant="outline"
        size="small"
        disabled={disabled}
        onClick={add}
      >
        <IconPlus size={16} aria-hidden />
        <span>{addLabel ?? t("keyValueEditor.add")}</span>
      </Button>
    </div>
  );
};

export default KeyValueEditor;
