/**
 * Props of `PageTabs` (React `PageTabsProps`): items in the default slot,
 * `actions` in the `actions` slot. Attributes (`aria-label` is required by
 * the pattern) go to the `<nav>`.
 */
export interface PageTabsProps {
  /**
   * Value of the current route's item. When it (or the set of items)
   * changes, the active item is scrolled into view
   */
  activeValue: string;
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

/**
 * Props of `PageTab` (React `PageTabProps`): `icon` / `action` are slots,
 * `onSelect` is the `select` event. Attributes go to the item wrapper.
 */
export interface PageTabProps {
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
}
