import { InjectionToken, type Signal } from "@angular/core";

/** An option registered with its select (known while the listbox is closed) */
export interface SelectItemRecord {
  readonly value: Signal<string>;
  readonly disabled: Signal<boolean>;
  /** Typeahead text: `textValue`, else the text content */
  readonly text: Signal<string>;
  /** Text shown in the trigger while selected (the text content) */
  readonly label: Signal<string>;
}

/** What a `<mn-select>` shares with its options (React's SelectContext) */
export interface SelectContext {
  /** The selected value ("" for none) */
  readonly current: Signal<string>;
  /** The highlighted option value */
  readonly highlighted: Signal<string | null>;
  /** Highlights an option (pointer: no scrolling) */
  highlight(value: string): void;
  /** Selects an option and closes the listbox */
  select(value: string): void;
  /** Registers an option; returns its unregistration */
  register(item: SelectItemRecord): () => void;
}

export const MN_SELECT = new InjectionToken<SelectContext>("MN_SELECT");

/** What a `<mn-select-group>` shares with its `<mn-select-label>` */
export interface SelectGroupContext {
  readonly labelId: string;
  /** A label is rendered (aria-labelledby references it) */
  readonly hasLabel: Signal<boolean>;
  setHasLabel(present: boolean): void;
}

export const MN_SELECT_GROUP = new InjectionToken<SelectGroupContext>(
  "MN_SELECT_GROUP",
);
