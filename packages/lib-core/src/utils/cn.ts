/** A value accepted by {@link cn}; falsy values are skipped. */
export type ClassValue = string | number | false | null | undefined;

/**
 * Join class names, skipping falsy values.
 *
 *   cn("btn", isActive && "btn-active", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
