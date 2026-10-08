import { TemplateRef } from "@angular/core";

/**
 * Content of a "node" input (React `ReactNode` props such as `title`,
 * `description`, `startIcon`): a string, or an `<ng-template>` for rich
 * content.
 *
 * @example
 * <ng-template #icon><svg ...></svg></ng-template>
 * <button mnButton [startIcon]="icon">Save</button>
 */
export type MnContent<C = unknown> = string | TemplateRef<C> | null | undefined;

/** The template of a content value, or `null` (template use only) */
export const templateOf = <C>(
  content: MnContent<C> | number | boolean,
): TemplateRef<C> | null =>
  content instanceof TemplateRef ? (content as TemplateRef<C>) : null;

/** Whether a content value renders something */
export const hasContent = (content: MnContent | number | boolean): boolean =>
  content instanceof TemplateRef ||
  (content !== null &&
    content !== undefined &&
    content !== "" &&
    content !== false);
