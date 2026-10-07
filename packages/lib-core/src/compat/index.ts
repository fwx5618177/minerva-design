/**
 * `@minerva/lib-core/compat` — @novel-isr/ui's public API (exact export names
 * and prop shapes) implemented with Minerva components, so
 *
 *   // @novel-isr/ui/src/index.ts
 *   export * from "@minerva/lib-core/compat";
 *
 * keeps existing apps compiling. Styles: "@minerva/lib-core/style.css" +
 * "@minerva/lib-core/compat.css" (the `--ui-*` token layer).
 *
 * Side-effect free: importing this entry never touches lib-core's shared
 * locale. Adapters pass @novel-isr/ui's original (Chinese) default strings as
 * explicit props instead.
 */
export * from "./theme";
export * from "./overlays";
export * from "./layout";
export * from "./feedback";
export * from "./forms";
export * from "./display";
export * from "./data";
export * from "./general";
export * from "./inputs";
