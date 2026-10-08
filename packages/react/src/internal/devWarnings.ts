import { formatDevMessage } from "@minerva/core";

/**
 * Development-only warnings ("[minerva] <Component>: ...", core's
 * `formatDevMessage`, the format shared with minerva-design/web-components).
 *
 * Every check is wrapped in `process.env.NODE_ENV !== "production"`, written
 * literally (at the call site and in these helpers): the library build keeps
 * it as-is and the consumer's bundler replaces it, so production bundles drop
 * the checks and their messages entirely (React relies on the same
 * convention). `process` is typed in `src/global.d.ts`.
 *
 * Warnings go to `console.error` (like React's own prop warnings) and are
 * deduplicated: `warnOnce` logs a given key once per page load.
 */

const warned = new Set<string>();

/** Log `message` the first time `key` is seen (development only). */
export function warnOnce(key: string, message: string): void {
  if (process.env.NODE_ENV !== "production") {
    if (warned.has(key)) return;
    warned.add(key);
    console.error(message);
  }
}

/** Test-only: forget the keys already warned about. */
export function resetWarnings(): void {
  warned.clear();
}

export interface ControlledPropsCheck {
  /** Name of the controlled prop, e.g. `value`, `checked`, `open`. */
  prop: string;
  value: unknown;
  /** Name of the uncontrolled counterpart, e.g. `defaultValue`. */
  defaultProp?: string;
  defaultValue?: unknown;
  /**
   * Name of the change handler, e.g. `onChange`. Leave `handlerProp` out
   * when the component may legitimately be controlled without a handler.
   */
  handlerProp?: string;
  handler?: unknown;
  /** The user cannot change the value (disabled / read-only): no handler needed. */
  locked?: boolean;
  /** How to make a handler-less controlled prop intentional, if possible. */
  lockHint?: string;
}

/**
 * Invalid controlled / uncontrolled prop combinations (development only):
 * - the controlled prop together with its `default*` counterpart;
 * - the controlled prop without its change handler (the user's changes would
 *   be ignored), unless the component is locked.
 */
export function warnControlledProps(
  component: string,
  check: ControlledPropsCheck,
): void {
  if (process.env.NODE_ENV !== "production") {
    const { prop, value, defaultProp, defaultValue, handlerProp } = check;
    if (value === undefined) return;
    if (defaultProp && defaultValue !== undefined) {
      warnOnce(
        `${component}:${prop}:both`,
        formatDevMessage(
          component,
          `both \`${prop}\` and \`${defaultProp}\` were provided. ` +
            `A component is either controlled (\`${prop}\`) or uncontrolled (\`${defaultProp}\`); ` +
            `\`${defaultProp}\` is ignored while \`${prop}\` is set. Remove one of them.`,
        ),
      );
    }
    if (handlerProp && check.handler === undefined && !check.locked) {
      warnOnce(
        `${component}:${prop}:handler`,
        formatDevMessage(
          component,
          `\`${prop}\` was provided without an \`${handlerProp}\` handler, ` +
            `so user changes are ignored. Add \`${handlerProp}\`` +
            (defaultProp
              ? `, or use \`${defaultProp}\` for an uncontrolled component`
              : "") +
            (check.lockHint ? `, or ${check.lockHint}` : "") +
            ".",
        ),
      );
    }
  }
}

/** `minLength` greater than `maxLength` (text fields; development only). */
export function warnLengthBounds(
  component: string,
  minLength: number | undefined,
  maxLength: number | undefined,
): void {
  if (process.env.NODE_ENV !== "production") {
    if (minLength != null && maxLength != null && minLength > maxLength) {
      warnOnce(
        `${component}:length`,
        formatDevMessage(
          component,
          `\`minLength\` (${minLength}) is greater than \`maxLength\` (${maxLength}), ` +
            "so no value can be valid. Fix the bounds.",
        ),
      );
    }
  }
}

/** Message of the controlled <-> uncontrolled switch warning. */
export function controlledSwitchMessage(
  component: string,
  prop: string,
  defaultProp: string,
  nowControlled: boolean,
): string {
  const [from, to] = nowControlled
    ? ["uncontrolled", "controlled"]
    : ["controlled", "uncontrolled"];
  const cause = nowControlled
    ? "from undefined to a defined value"
    : "from a defined value to undefined";
  return formatDevMessage(
    component,
    `the component is changing from ${from} to ${to} \`${prop}\`. ` +
      `This is likely caused by \`${prop}\` changing ${cause}, which should not happen. ` +
      `Decide between a controlled \`${prop}\` and an uncontrolled \`${defaultProp}\` ` +
      `for the lifetime of the component (use \`null\` rather than \`undefined\` for "no value" where supported).`,
  );
}
