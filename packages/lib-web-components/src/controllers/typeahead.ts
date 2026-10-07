import type { ReactiveController, ReactiveControllerHost } from "lit";
import {
  createTypeahead,
  type Typeahead,
  type TypeaheadItem,
  type TypeaheadOptions,
} from "@minerva/core";

/**
 * Lit wrapper of core's `createTypeahead` ("type to select" for listboxes
 * whose focus stays on a trigger, e.g. a closed select).
 */
export class TypeaheadController implements ReactiveController {
  private readonly typeahead: Typeahead;

  constructor(host: ReactiveControllerHost, options: TypeaheadOptions = {}) {
    this.typeahead = createTypeahead(options);
    host.addController(this);
  }

  /** Matching index for `key`, or -1. */
  search(key: string, items: TypeaheadItem[], currentIndex: number): number {
    return this.typeahead.search(key, items, currentIndex);
  }

  reset(): void {
    this.typeahead.reset();
  }

  hostDisconnected(): void {
    this.typeahead.reset();
  }
}
