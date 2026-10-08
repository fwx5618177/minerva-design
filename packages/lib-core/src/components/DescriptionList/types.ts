import type { HTMLAttributes, Ref } from "react";

/** One term / description pair of a DescriptionList */
export interface DescriptionListItem {
  /** Stable React key of the row */
  key: string;
  /** Term, rendered in a <dt> */
  label: React.ReactNode;
  /** Description, rendered in a <dd> (0 is rendered) */
  value: React.ReactNode;
}

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
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
  /** Ref to the <dl> element */
  ref?: Ref<HTMLDListElement>;
}
