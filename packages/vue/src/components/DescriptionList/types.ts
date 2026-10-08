/** One term / description pair of a DescriptionList */
export interface DescriptionListItem {
  /** Stable key of the row */
  key: string;
  /** Term, rendered in a <dt> (or the `label` scoped slot) */
  label: string | number;
  /** Description, rendered in a <dd> (0 is rendered; or the `value` scoped slot) */
  value: string | number;
}

/** Props of `DescriptionList` (same names and defaults as React). */
export interface DescriptionListProps {
  /** Rows to render, in order */
  items: DescriptionListItem[];
  /**
   * Frames the list as a card (full border, rounded corners, surface
   * background, padded rows)
   * @default false
   */
  bordered?: boolean;
  /**
   * Tints every other row (replaces the row separators)
   * @default false
   */
  striped?: boolean;
}
