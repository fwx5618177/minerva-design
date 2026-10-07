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
import { usePortalContainer } from "../../internal/themeScope";

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
  const portalContainer = usePortalContainer();
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
          className,
        )}
        // Lets layouts such as Toolbar size the trigger (see page.module.scss)
        data-component="select"
      >
        {/* Radix Select.Value drops className: the ellipsis wrapper is ours */}
        <span className={styles.value}>
          <RadixSelect.Value placeholder={placeholder} />
        </span>
        <RadixSelect.Icon className={styles.icon}>
          <LuChevronDown aria-hidden focusable={false} />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal container={portalContainer}>
        <RadixSelect.Content
          className={classNames(styles.content, contentClassName)}
          position="popper"
          sideOffset={4}
        >
          <RadixSelect.ScrollUpButton className={styles.scrollButton}>
            <LuChevronUp aria-hidden focusable={false} />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className={styles.viewport}>
            {children}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className={styles.scrollButton}>
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
    className={classNames(styles.item, className)}
    {...rest}
  >
    {/* Radix Select.ItemText drops className: wrap it to style the text */}
    <span className={styles.itemText}>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </span>
    <RadixSelect.ItemIndicator className={styles.itemIndicator}>
      <LuCheck aria-hidden focusable={false} />
    </RadixSelect.ItemIndicator>
  </RadixSelect.Item>
);

/** SelectGroup: groups options under a SelectLabel. */
const SelectGroup = ({ className, ref, ...rest }: SelectGroupProps) => (
  <RadixSelect.Group ref={ref} className={className} {...rest} />
);

/** SelectLabel: the (non-selectable) heading of a SelectGroup. */
const SelectLabel = ({ className, ref, ...rest }: SelectLabelProps) => (
  <RadixSelect.Label
    ref={ref}
    className={classNames(styles.label, className)}
    {...rest}
  />
);

/** SelectSeparator: a divider between options or groups. */
const SelectSeparator = ({ className, ref, ...rest }: SelectSeparatorProps) => (
  <RadixSelect.Separator
    ref={ref}
    className={classNames(styles.separator, className)}
    {...rest}
  />
);

export { Select, SelectItem, SelectGroup, SelectLabel, SelectSeparator };
export default Select;
