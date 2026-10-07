import type { CSSProperties, ReactNode, Ref } from "react";

/** An entry of a NavTree: a link, or a branch when it has children */
export interface NavTreeItem {
  /** Unique id (matched against `activeId` / expanded ids) */
  id: string;
  /** Visible label */
  label: string;
  /** Secondary line under the label (hidden for nested items) */
  description?: string;
  /** Link target of a leaf item */
  href?: string;
  /** Leading icon */
  icon?: ReactNode;
  /** Trailing content, e.g. a badge or a count */
  endContent?: ReactNode;
  /**
   * Disables the item
   * @default false
   */
  disabled?: boolean;
  /** Child items; the item becomes an expandable branch */
  children?: NavTreeItem[];
}

/** A titled group of NavTree items */
export interface NavTreeSection {
  /** Unique id of the section */
  id: string;
  /** Optional section heading */
  title?: string;
  /** Items of the section */
  items: NavTreeItem[];
}

/** State of an item, passed to `renderLink` */
export interface NavTreeItemState {
  /** The item is the active one (`activeId`) */
  active: boolean;
  /** A descendant of the item is active */
  ancestorActive: boolean;
  /** The branch is expanded */
  expanded: boolean;
  /** Nesting depth (0 for top-level items) */
  depth: number;
  /** The tree is in compact (icon-only) mode */
  collapsed: boolean;
  /** The item has children */
  hasChildren: boolean;
  /** The item is disabled */
  disabled: boolean;
  /** Class names to put on the rendered link (styles + stable hooks) */
  className: string;
}

/** Props of `NavTree`, a sidebar navigation tree */
export interface NavTreeProps {
  /** Sections of items */
  sections: NavTreeSection[];
  /** Id of the active (current page) item; its ancestors expand */
  activeId?: string;
  /**
   * Compact mode: icons only (titles, labels, trailing content and children
   * are hidden)
   * @default false
   */
  collapsed?: boolean;
  /**
   * Wraps long labels and descriptions instead of truncating them
   * @default false
   */
  wrapLabels?: boolean;
  /** Initially expanded branch ids (uncontrolled) */
  defaultExpandedIds?: string[];
  /** Expanded branch ids (controlled; pair with onExpandedChange) */
  expandedIds?: string[];
  /** Called with the expanded branch ids when a branch is toggled */
  onExpandedChange?: (expandedIds: string[]) => void;
  /** Called when a leaf link or a branch is activated */
  onItemSelect?: (item: NavTreeItem) => void;
  /**
   * Custom rendering of leaf links (e.g. a router `<Link>`). Render
   * `content` inside and put `state.className` on the link
   */
  renderLink?: (
    item: NavTreeItem,
    content: ReactNode,
    state: NavTreeItemState,
  ) => ReactNode;
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /**
   * Accessible name of the `<nav>` landmark
   * @default "Navigation" (localized)
   */
  ariaLabel?: string;
  /** Ref to the `<nav>` element */
  ref?: Ref<HTMLElement>;
}
