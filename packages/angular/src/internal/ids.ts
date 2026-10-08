import { Injectable, inject } from "@angular/core";

/**
 * Element ids (`aria-labelledby`, `aria-controls`...): one counter per
 * application, so the server render and the hydrating client create the same
 * ids in the same order.
 */
@Injectable({ providedIn: "root" })
export class MnIds {
  private count = 0;

  next(prefix: string): string {
    this.count += 1;
    return `mn-${prefix}-${this.count}`;
  }
}

/** A unique id (call in an injection context, e.g. a field initializer) */
export const injectId = (prefix = "id"): string => inject(MnIds).next(prefix);
