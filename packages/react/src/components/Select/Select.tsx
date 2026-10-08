import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { IconCheck, IconChevronDown } from "../../internal/icons";
import { createTypeahead, getNextIndex } from "@minerva/core";
import { parsePlacement } from "@minerva/dom";
import { cn } from "../../utils/cn";
import {
  useFormControlContext,
  useFormControlProps,
} from "../FormControl/context";
import { useFloatingLayer } from "../../internal/FloatingPanel";
import { useMergedRefs } from "../../internal/mergeRefs";
import { pickDataAttributes } from "../../internal/dataAttributes";
import { Portal } from "../../internal/Portal";
import {
  useControllableState,
  useControlledSwitchWarning,
} from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import { LayerContext } from "../../internal/useDismissableLayer";
import { hooks } from "../../internal/stylingHooks";
import styles from "./select.module.scss";
import type {
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectProps,
  SelectSeparatorProps,
} from "./types";

/** Metadata of an option, known before the listbox is rendered. */
interface ItemRecord {
  value: string;
  disabled: boolean;
  /** Typeahead text: `textValue`, else the text content of `label`. */
  text: string;
  /** Content shown in the trigger when the option is selected. */
  label: ReactNode;
}

/** Which option is highlighted when the listbox opens. */
type OpenIntent = "selected" | "first" | "last";

interface SelectContextValue {
  value: string;
  highlighted: string | null;
  highlight: (value: string) => void;
  select: (value: string) => void;
  registerItem: (record: ItemRecord) => void;
}

const SelectContext = createContext<SelectContextValue | null>(null);

const useSelectContext = (component: string) => {
  const context = useContext(SelectContext);
  if (!context) throw new Error(`<${component}> must be used inside <Select>`);
  return context;
};

interface GroupContextValue {
  labelId: string;
  setHasLabel: (present: boolean) => void;
}

const GroupContext = createContext<GroupContextValue | null>(null);

/** Plain text of a React node (strings / numbers, recursively). */
function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return `${node}`;
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return nodeText(node.props.children);
  }
  return "";
}

/**
 * Option metadata collected from the children tree (SelectItem elements,
 * also inside groups / fragments), so the trigger can show the selected
 * label and the hidden native <select> can list every value while the
 * listbox is closed, on the server included. Options rendered by custom
 * wrapper components are registered when the listbox first mounts.
 */
function collectItems(children: ReactNode, out: ItemRecord[] = []) {
  Children.forEach(children, (child) => {
    if (!isValidElement<Record<string, unknown>>(child)) return;
    if (child.type === SelectItem) {
      const props = child.props as unknown as SelectItemProps;
      out.push({
        value: props.value,
        disabled: !!props.disabled,
        text: props.textValue ?? nodeText(props.children),
        label: props.children,
      });
    } else if (child.props.children) {
      collectItems(child.props.children as ReactNode, out);
    }
  });
  return out;
}

const OPTION_SELECTOR = '[role="option"]';
const PAGE_SIZE = 10;

const getOptions = (listbox: HTMLElement) =>
  Array.from(listbox.querySelectorAll<HTMLElement>(OPTION_SELECTOR));

const isOptionDisabled = (option: HTMLElement) =>
  option.getAttribute("aria-disabled") === "true";

const findOption = (listbox: HTMLElement, value: string | null) =>
  value === null
    ? undefined
    : getOptions(listbox).find((option) => option.dataset.value === value);

/** Keeps the hidden native <select> out of sight and out of the layout. */
const VISUALLY_HIDDEN: CSSProperties = {
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal",
};

/**
 * Select: a single-choice dropdown following the WAI-ARIA "select-only
 * combobox" pattern. The trigger is a `<button role="combobox">`; the popup
 * is a `role="listbox"` anchored below it (popper positioning: flips above
 * when there is no room, at least as wide as the trigger, height capped to
 * the viewport). A hidden native `<select>` carries `name` / `required` /
 * `disabled` for forms (FormData, constraint validation, reset). Inside a
 * FormControl it picks up the field's id, description, invalid, required and
 * disabled state. `ref` reaches the trigger `<button>`.
 */
const Select = ({
  value: valueProp,
  defaultValue,
  onChange,
  open: openProp,
  defaultOpen,
  onOpenChange,
  placeholder,
  size = "medium",
  invalid = false,
  disabled,
  required,
  name,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  className,
  style,
  contentClassName,
  children,
  ref,
  ...rest
}: SelectProps) => {
  const fc = useFormControlContext();
  const field = useFormControlProps({
    id,
    "aria-describedby": ariaDescribedBy,
  });
  const isInvalid = invalid || !!fc?.invalid;
  const isDisabled = disabled ?? fc?.disabled ?? false;
  const isRequired = required ?? fc?.required ?? false;

  // Value: controlled when `value` is set. Not useControllableState: a form
  // reset restores `defaultValue` without calling onChange (like native).
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;
  useControlledSwitchWarning(isControlled, "Select");

  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("Select", {
      prop: "value",
      value: valueProp,
      defaultProp: "defaultValue",
      defaultValue,
      handlerProp: "onChange",
      handler: onChange,
      locked: isDisabled,
      lockHint: "set `disabled`",
    });
    warnControlledProps("Select", {
      prop: "open",
      value: openProp,
      defaultProp: "defaultOpen",
      defaultValue: defaultOpen,
      handlerProp: "onOpenChange",
      handler: onOpenChange,
      locked: isDisabled,
    });
  }
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
    name: "Select",
    prop: "open",
  });

  const listboxId = useId();
  const [trigger, setTrigger] = useState<HTMLButtonElement | null>(null);
  const triggerRef = useMergedRefs<HTMLButtonElement>(setTrigger, ref);
  const nativeRef = useRef<HTMLSelectElement>(null);
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const [typeahead] = useState(() => createTypeahead());

  /** Options rendered by custom wrappers (unknown to `collectItems`). */
  const [extraItems, setExtraItems] = useState<ItemRecord[]>([]);
  const treeItems = useMemo(() => collectItems(children), [children]);
  const items = useMemo(() => {
    const known = new Set(treeItems.map((item) => item.value));
    return [
      ...treeItems,
      ...extraItems.filter((item) => !known.has(item.value)),
    ];
  }, [treeItems, extraItems]);
  const selectedItem = items.find((item) => item.value === value);
  const showPlaceholder = value === "";

  // Latest values read by event listeners / effects without re-running them.
  const latest = useRef({ value, isControlled, defaultValue, onChange, items });
  useLayoutEffect(() => {
    latest.current = { value, isControlled, defaultValue, onChange, items };
  });
  const openIntent = useRef<OpenIntent>("selected");
  /** Scroll the highlighted option into view once positioned (keyboard). */
  const scrollPending = useRef(false);

  const commitValue = useCallback((next: string) => {
    const { value: current, isControlled: controlled } = latest.current;
    if (next === current) return;
    if (!controlled) setInternalValue(next);
    latest.current.onChange?.(next);
  }, []);

  const openWith = (intent: OpenIntent) => {
    openIntent.current = intent;
    setOpen(true);
  };

  const close = useCallback(
    (focusTrigger: boolean) => {
      if (focusTrigger) trigger?.focus();
      setOpen(false);
    },
    [setOpen, trigger],
  );

  const {
    ref: positionerRef,
    element: layerElement,
    floatingStyles,
    placement,
    isPositioned,
    dir: layerDir,
  } = useFloatingLayer({
    open,
    anchor: trigger,
    placement: "bottom-start",
    offset: { mainAxis: 4 },
    matchAnchorWidth: "min",
    fitViewportHeight: true,
    branches: () => [trigger],
    onDismiss: () => setOpen(false),
    returnFocusOnEscape: () => trigger,
    focusable: true,
  });
  /** The listbox, inside the positioned wrapper (`layer.element`). */
  const [listbox, setListbox] = useState<HTMLDivElement | null>(null);

  // On open: highlight (and focus) the selected option, else the first /
  // last enabled one depending on how the listbox was opened.
  useLayoutEffect(() => {
    if (!open || !listbox) return;
    const intent = openIntent.current;
    openIntent.current = "selected";
    const enabled = getOptions(listbox).filter((o) => !isOptionDisabled(o));
    const target =
      intent === "last"
        ? enabled[enabled.length - 1]
        : intent === "first"
          ? enabled[0]
          : (enabled.find((o) => o.dataset.value === latest.current.value) ??
            enabled[0]);
    typeahead.reset();
    scrollPending.current = true;
    // Resolved from the rendered options (the DOM is the source of order).
    setHighlighted(target?.dataset.value ?? null);
  }, [open, listbox, typeahead]);

  // DOM focus follows the highlight (the listbox itself when none).
  useLayoutEffect(() => {
    if (!open || !listbox) return;
    const target = findOption(listbox, highlighted) ?? listbox;
    if (target.ownerDocument.activeElement !== target) {
      target.focus({ preventScroll: true });
    }
  }, [open, listbox, highlighted]);

  // Keyboard moves (and opening) scroll the highlighted option into view;
  // pointer hover does not (it would make the list jump under the cursor).
  useLayoutEffect(() => {
    if (!isPositioned || !listbox || !scrollPending.current) return;
    scrollPending.current = false;
    findOption(listbox, highlighted)?.scrollIntoView?.({ block: "nearest" });
  }, [isPositioned, listbox, highlighted]);

  // The hidden native select: `defaultSelected` marks what a form reset
  // restores (defaultValue, or the current value when controlled), then the
  // live value is re-applied.
  useLayoutEffect(() => {
    const native = nativeRef.current;
    if (!native) return;
    const resetTo = isControlled ? value : (defaultValue ?? "");
    for (const option of Array.from(native.options)) {
      option.defaultSelected = option.value === resetTo;
    }
    native.value = value;
  });

  // Form reset restores defaultValue (uncontrolled), without onChange.
  useLayoutEffect(() => {
    const form = nativeRef.current?.form;
    if (!form) return;
    const onReset = () => {
      if (!latest.current.isControlled) {
        setInternalValue(latest.current.defaultValue ?? "");
      }
    };
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, []);

  const registerItem = useCallback((record: ItemRecord) => {
    if (latest.current.items.some((item) => item.value === record.value)) {
      return;
    }
    setExtraItems((prev) =>
      prev.some((item) => item.value === record.value)
        ? prev
        : [...prev, record],
    );
  }, []);

  const highlight = useCallback((next: string) => {
    scrollPending.current = false;
    setHighlighted(next);
  }, []);

  const select = useCallback(
    (next: string) => {
      commitValue(next);
      close(true);
    },
    [commitValue, close],
  );

  const context = useMemo<SelectContextValue>(
    () => ({ value, highlighted, highlight, select, registerItem }),
    [value, highlighted, highlight, select, registerItem],
  );

  /** Typeahead over `entries`; returns the matched index or -1. */
  const searchTypeahead = (
    key: string,
    entries: Array<{ text: string; disabled: boolean }>,
    currentIndex: number,
  ) => typeahead.search(key, entries, currentIndex);

  const isPrintable = (event: ReactKeyboardEvent) =>
    event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;

  const onTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (open) return;
    const { key } = event;
    // Typeahead while closed changes the selection without opening (like a
    // native select). Space continues a search in progress.
    if (isPrintable(event) && (key !== " " || typeahead.getBuffer() !== "")) {
      const list = items;
      const index = searchTypeahead(
        key,
        list,
        list.findIndex((item) => item.value === value),
      );
      event.preventDefault();
      if (index !== -1) commitValue(list[index].value);
      return;
    }
    const intent: Record<string, OpenIntent> = {
      Enter: "selected",
      " ": "selected",
      ArrowDown: "selected",
      ArrowUp: value === "" ? "last" : "selected",
      Home: "first",
      End: "last",
    };
    if (key in intent) {
      // Prevents the native click (Enter) and page scrolling (arrows).
      event.preventDefault();
      openWith(intent[key]);
    }
  };

  const onListboxKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!listbox) return;
    const { key } = event;
    if (key === "Tab") {
      // Close and let the browser move on from the trigger: the natural Tab
      // order continues after the select (no preventDefault).
      close(true);
      return;
    }
    const options = getOptions(listbox);
    const currentIndex = options.findIndex(
      (option) => option.dataset.value === highlighted,
    );
    const current = currentIndex === -1 ? undefined : options[currentIndex];
    const selectCurrent = () => {
      if (current && !isOptionDisabled(current)) {
        select(current.dataset.value as string);
      }
    };

    if (key === "Enter" || (key === "ArrowUp" && event.altKey)) {
      event.preventDefault();
      selectCurrent();
      return;
    }
    if (key === " " && typeahead.getBuffer() === "") {
      event.preventDefault();
      selectCurrent();
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    const next = getNextIndex({
      currentIndex,
      count: options.length,
      key,
      loop: false,
      isDisabled: (i) => isOptionDisabled(options[i]),
      pageSize: PAGE_SIZE,
    });
    if (next !== null || key.startsWith("Arrow") || key.startsWith("Page")) {
      // Arrow keys never scroll the list / page, even at the edges.
      event.preventDefault();
    }
    if (next === null && isPrintable(event)) {
      const index = searchTypeahead(
        key,
        options.map((option) => ({
          text: option.dataset.textValue ?? option.textContent ?? "",
          disabled: isOptionDisabled(option),
        })),
        currentIndex,
      );
      if (index !== -1) {
        event.preventDefault();
        scrollPending.current = true;
        setHighlighted(options[index].dataset.value as string);
      }
      return;
    }
    if (next !== null) {
      typeahead.reset();
      scrollPending.current = true;
      setHighlighted(options[next].dataset.value as string);
    }
  };

  const { side, align } = parsePlacement(placement);
  const listboxLabel = ariaLabel
    ? { "aria-label": ariaLabel }
    : ariaLabelledBy
      ? { "aria-labelledby": ariaLabelledBy }
      : fc
        ? { "aria-labelledby": fc.labelId }
        : {};

  return (
    <>
      <button
        {...pickDataAttributes(rest)}
        type="button"
        ref={triggerRef}
        id={field.id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-autocomplete="none"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={field["aria-describedby"]}
        aria-required={isRequired || undefined}
        aria-invalid={isInvalid || undefined}
        disabled={isDisabled}
        data-state={open ? "open" : "closed"}
        data-placeholder={showPlaceholder ? "" : undefined}
        className={cn(
          styles.trigger,
          styles[size],
          isInvalid && styles.invalid,
          className,
        )}
        style={style}
        // Lets layouts such as Toolbar size the trigger (see page.module.scss)
        data-component="select"
        onClick={() => setOpen(!open)}
        onKeyDown={onTriggerKeyDown}
        // Space is handled on keydown: never let its keyup click (re)toggle.
        onKeyUp={(event) => {
          if (event.key === " ") event.preventDefault();
        }}
        {...hooks("select", "root", {
          state: open ? "open" : "closed",
          disabled: isDisabled,
          invalid: isInvalid,
          required: isRequired,
          size,
        })}
      >
        <span className={styles.value} {...hooks("select", "value")}>
          <span>{showPlaceholder ? placeholder : selectedItem?.label}</span>
        </span>
        <span
          className={styles.icon}
          aria-hidden="true"
          {...hooks("select", "icon")}
        >
          <IconChevronDown focusable={false} />
        </span>
      </button>

      <select
        ref={nativeRef}
        aria-hidden="true"
        tabIndex={-1}
        name={name}
        required={isRequired}
        disabled={isDisabled}
        value={value}
        style={VISUALLY_HIDDEN}
        // Browser autofill / native validation: forward to the trigger.
        onChange={(event) => commitValue(event.target.value)}
        onFocus={() => trigger?.focus()}
      >
        <option value="" />
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
        {value !== "" && !selectedItem && <option value={value} />}
      </select>

      {open && (
        <Portal>
          {/* Positioned wrapper: core positioning caps its size inline (the
              space available); the listbox inside scrolls within it. */}
          <div
            ref={positionerRef}
            dir={layerDir}
            className={styles.positioner}
            style={floatingStyles}
            data-side={side}
          >
            <LayerContext.Provider value={layerElement}>
              <div
                ref={setListbox}
                id={listboxId}
                role="listbox"
                tabIndex={-1}
                {...listboxLabel}
                className={cn(styles.content, contentClassName)}
                onKeyDown={onListboxKeyDown}
                {...hooks("select", "content", {
                  state: "open",
                  side,
                  align,
                  placement,
                })}
              >
                <SelectContext.Provider value={context}>
                  {children}
                </SelectContext.Provider>
              </div>
            </LayerContext.Provider>
          </div>
        </Portal>
      )}
    </>
  );
};

/** SelectItem: an option of a Select. */
const SelectItem = ({
  value,
  disabled = false,
  textValue,
  className,
  children,
  ref,
  ...rest
}: SelectItemProps) => {
  const ctx = useSelectContext("SelectItem");
  const selected = ctx.value === value;
  const { registerItem } = ctx;

  useLayoutEffect(() => {
    registerItem({
      value,
      disabled,
      text: textValue ?? nodeText(children),
      label: children,
    });
  }, [registerItem, value, disabled, textValue, children]);

  return (
    // Keyboard selection is handled by the listbox (focus moves between
    // options), so options need no key listener of their own.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      {...rest}
      ref={ref}
      role="option"
      tabIndex={-1}
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      data-value={value}
      data-text-value={textValue}
      className={cn(styles.item, className)}
      onPointerMove={() => {
        if (!disabled && ctx.highlighted !== value) ctx.highlight(value);
      }}
      onClick={() => {
        if (!disabled) ctx.select(value);
      }}
      {...hooks("option", "root", {
        selected,
        highlighted: ctx.highlighted === value,
        disabled,
      })}
    >
      <span className={styles.itemText} {...hooks("option", "label")}>
        {children}
      </span>
      {selected && (
        <span
          className={styles.itemIndicator}
          aria-hidden="true"
          {...hooks("option", "indicator")}
        >
          <IconCheck focusable={false} />
        </span>
      )}
    </div>
  );
};

/** SelectGroup: groups options under a SelectLabel (`role="group"`). */
const SelectGroup = ({ className, ref, ...rest }: SelectGroupProps) => {
  const labelId = useId();
  const [hasLabel, setHasLabel] = useState(false);
  const group = useMemo(() => ({ labelId, setHasLabel }), [labelId]);
  return (
    <GroupContext.Provider value={group}>
      <div
        ref={ref}
        role="group"
        aria-labelledby={hasLabel ? labelId : undefined}
        className={className}
        {...rest}
        {...hooks("option-group", "root")}
      />
    </GroupContext.Provider>
  );
};

/** SelectLabel: the (non-selectable) heading labelling its SelectGroup. */
const SelectLabel = ({ className, ref, ...rest }: SelectLabelProps) => {
  const group = useContext(GroupContext);
  useLayoutEffect(() => {
    if (!group) return;
    group.setHasLabel(true);
    return () => group.setHasLabel(false);
  }, [group]);
  return (
    <div
      ref={ref}
      id={group?.labelId}
      className={cn(styles.label, className)}
      {...rest}
      {...hooks("select-label", "root")}
    />
  );
};

/** SelectSeparator: a (presentational) divider between options or groups. */
const SelectSeparator = ({ className, ref, ...rest }: SelectSeparatorProps) => (
  <div
    ref={ref}
    aria-hidden="true"
    className={cn(styles.separator, className)}
    {...rest}
    {...hooks("select-separator", "root")}
  />
);

export { Select, SelectItem, SelectGroup, SelectLabel, SelectSeparator };
export default Select;
