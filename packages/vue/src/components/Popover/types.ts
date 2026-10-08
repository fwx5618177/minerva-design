/** Side of the trigger the panel is placed on. */
export type PopoverSide = "top" | "right" | "bottom" | "left";

/** Alignment of the panel along the trigger. */
export type PopoverAlign = "start" | "center" | "end";

/** Props of `Popover` (the root; owns the open state, `v-model:open`). */
export interface PopoverProps {
  /** Controlled open state (`v-model:open`); leave `undefined` for uncontrolled. */
  open?: boolean;
  /**
   * Initial open state while uncontrolled
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Modal mode: traps focus inside the panel, locks page scrolling, hides the
   * rest of the page from assistive technology and blocks outside pointer
   * interaction (an outside click still closes it)
   * @default false
   */
  modal?: boolean;
}

/** Props of `PopoverTrigger` / `PopoverClose` (a native button, or the child with `asChild`). */
export interface PopoverTriggerProps {
  /**
   * Merges the behaviour onto the single child element instead of rendering a `<button>`
   * @default false
   */
  asChild?: boolean;
}

/** Props of `PopoverAnchor`: positions the panel against another element than the trigger. */
export interface PopoverAnchorProps {
  /**
   * Merges onto the single child element instead of rendering a `<div>`
   * @default false
   */
  asChild?: boolean;
}

/** Props of `PopoverContent`: the teleported, anchored panel (role="dialog"). */
export interface PopoverContentProps {
  /**
   * Preferred side; flips when there is not enough room
   * @default "bottom"
   */
  side?: PopoverSide;
  /**
   * Alignment along the trigger
   * @default "center"
   */
  align?: PopoverAlign;
  /**
   * Gap to the trigger in pixels
   * @default 6
   */
  sideOffset?: number;
  /**
   * Skid along the trigger in pixels (positive = towards the end)
   * @default 0
   */
  alignOffset?: number;
  /**
   * Minimum distance kept to the viewport edges in pixels when flipping,
   * shifting and sizing the panel
   * @default 8
   */
  collisionPadding?: number;
  /**
   * Sizes the panel after the trigger / anchor width: `"min"` at least as
   * wide, `"exact"` exactly as wide (also caps the width to the viewport)
   * @default false
   */
  matchAnchorWidth?: false | "min" | "exact";
  /**
   * Renders an arrow pointing at the trigger
   * @default false
   */
  arrow?: boolean;
  /**
   * Renders the panel into a portal (the theme-scoped container of a nested
   * `ConfigProvider`, else `document.body`)
   * @default true
   */
  portal?: boolean;
  /**
   * Keeps the panel mounted while closed (`data-state="closed"`), e.g. for
   * animation libraries
   * @default false
   */
  forceMount?: boolean;
}
