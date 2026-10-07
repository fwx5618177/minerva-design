import * as RadixSelect from "@radix-ui/react-select";
import classNames from "classnames";
import { LuCheck, LuChevronDown, LuChevronUp } from "react-icons/lu";
import {
  useFormControlContext,
  useFormControlProps,
} from "../FormControl/context";
import styles from "./select.module.scss";
import type {
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectProps,
  SelectSeparatorProps,
} from "./types";

/** `ui-*` styling hooks (stable class names shared with @novel-isr/ui). */
const UI_SIZE = { small: "sm", medium: "md", large: "lg" } as const;

/**
 * Select: a single-choice dropdown. Radix Select provides the combobox /
 * listbox semantics, typeahead, keyboard navigation and focus management; a
 * hidden native <select> submits `name` with forms. Inside a FormControl it
 * picks up the field's id, description, invalid, required and disabled state.
 * `ref` reaches the trigger <button>.
 */
const Select = ({
  value,
  defaultValue,
  onChange,
  open,
  defaultOpen,
  onOpenChange,
  placeholder,
  size = "medium",
  invalid = false,
  disabled,
  required,
  name,
  id,
  ariaLabel,
  ariaDescribedBy,
  className,
  contentClassName,
  children,
  ref,
}: SelectProps) => {
  const fc = useFormControlContext();
  const field = useFormControlProps({
    id,
    "aria-describedby": ariaDescribedBy,
  });
  const isInvalid = invalid || !!fc?.invalid;
  const isDisabled = disabled ?? fc?.disabled ?? false;
  const isRequired = required ?? fc?.required ?? false;

  return (
    <RadixSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      name={name}
      disabled={isDisabled}
      required={isRequired}
    >
      <RadixSelect.Trigger
        ref={ref}
        id={field.id}
        aria-label={ariaLabel}
        aria-describedby={field["aria-describedby"]}
        aria-required={isRequired || undefined}
        aria-invalid={isInvalid || undefined}
        className={classNames(
          styles.trigger,
          styles[size],
          isInvalid && styles.invalid,
          "ui-select-trigger",
          `ui-select-size-${UI_SIZE[size]}`,
          isInvalid && "ui-select-error",
          className,
        )}
      >
        <RadixSelect.Value
          className={styles.value}
          data-ui-select-value=""
          placeholder={placeholder}
        />
        <RadixSelect.Icon className={classNames(styles.icon, "ui-select-icon")}>
          <LuChevronDown aria-hidden focusable={false} />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className={classNames(
            styles.content,
            "ui-select-content",
            contentClassName,
          )}
          position="popper"
          sideOffset={4}
        >
          <RadixSelect.ScrollUpButton
            className={classNames(
              styles.scrollButton,
              "ui-select-scroll-button",
            )}
          >
            <LuChevronUp aria-hidden focusable={false} />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport
            className={classNames(styles.viewport, "ui-select-viewport")}
          >
            {children}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton
            className={classNames(
              styles.scrollButton,
              "ui-select-scroll-button",
            )}
          >
            <LuChevronDown aria-hidden focusable={false} />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

/** SelectItem: an option of a Select. */
const SelectItem = ({ className, children, ref, ...rest }: SelectItemProps) => (
  <RadixSelect.Item
    ref={ref}
    className={classNames(styles.item, "ui-select-item", className)}
    {...rest}
  >
    <RadixSelect.ItemText
      className={styles.itemText}
      data-ui-select-item-text=""
    >
      {children}
    </RadixSelect.ItemText>
    <RadixSelect.ItemIndicator
      className={classNames(styles.itemIndicator, "ui-select-item-indicator")}
    >
      <LuCheck aria-hidden focusable={false} />
    </RadixSelect.ItemIndicator>
  </RadixSelect.Item>
);

/** SelectGroup: groups options under a SelectLabel. */
const SelectGroup = ({ className, ref, ...rest }: SelectGroupProps) => (
  <RadixSelect.Group
    ref={ref}
    className={classNames("ui-select-group", className)}
    {...rest}
  />
);

/** SelectLabel: the (non-selectable) heading of a SelectGroup. */
const SelectLabel = ({ className, ref, ...rest }: SelectLabelProps) => (
  <RadixSelect.Label
    ref={ref}
    className={classNames(styles.label, "ui-select-label", className)}
    {...rest}
  />
);

/** SelectSeparator: a divider between options or groups. */
const SelectSeparator = ({ className, ref, ...rest }: SelectSeparatorProps) => (
  <RadixSelect.Separator
    ref={ref}
    className={classNames(styles.separator, "ui-select-separator", className)}
    {...rest}
  />
);

export { Select, SelectItem, SelectGroup, SelectLabel, SelectSeparator };
export default Select;
