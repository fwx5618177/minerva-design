/**
 * Shared format of the development-only diagnostics of every Minerva
 * library (`minerva-design` and `minerva-design/web-components`).
 *
 * Both libraries log them with `console.error` (React's convention for prop
 * warnings such as controlled / uncontrolled switches), once per message, as
 * `[minerva] <subject>: <message>` where `subject` is the React component
 * name (`Tabs`) or the custom element tag (`<minerva-tabs>`).
 */

/** Prefix of every Minerva development message. */
export const DEV_MESSAGE_PREFIX = "[minerva]";

/** `[minerva] <subject>: <message>` */
export function formatDevMessage(subject: string, message: string): string {
  return `${DEV_MESSAGE_PREFIX} ${subject}: ${message}`;
}
