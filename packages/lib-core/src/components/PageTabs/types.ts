import type { HTMLAttributes, ReactNode, Ref } from "react";

export interface PageTabsProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  /** Accessible label of the navigation landmark (e.g. "Open pages") */
  ariaLabel: string;
  /**
   * Value of the current route's item. When it (or the set of items)
   * changes, the active item is scrolled into view
   */
  activeValue: string;
  /** PageTab items */
  children: ReactNode;
  /** Global actions shown after the scrollable list (e.g. a page menu) */
  actions?: ReactNode;
  /**
   * Accessible label of the "scroll left" button
   * @default "Scroll pages left" (localized)
   */
  scrollLeftLabel?: string;
  /**
   * Accessible label of the "scroll right" button
   * @default "Scroll pages right" (localized)
   */
  scrollRightLabel?: string;
}

export interface PageTabProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onSelect"
> {
  /** Ref to the item wrapper element */
  ref?: Ref<HTMLDivElement>;
  /** Identifier of the page (exposed as data-value) */
  value: string;
  /** Title of the page; truncated with an ellipsis, shown in full in a tooltip */
  label: string;
  /**
   * Marks the item as the current page (aria-current="page")
   * @default false
   */
  active?: boolean;
  /**
   * Disables the label button (the separate action keeps its own state)
   * @default false
   */
  disabled?: boolean;
  /** Icon displayed before the label */
  icon?: ReactNode;
  /** Separate control rendered next to the label (e.g. a close IconButton) */
  action?: ReactNode;
  /** Called when the label button is activated */
  onSelect?: () => void;
}
