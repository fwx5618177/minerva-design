/**
 * `minerva-design/styling-hooks`: the manifest of Minerva's public styling
 * hooks (component -> parts -> states) and selector helpers.
 *
 * React: `[data-minerva="<component>"]`, `[data-part="<part>"]` and the state
 * attributes (`data-state`, `data-disabled`, `data-size`...).
 * Web components: the `<minerva-<component>>` tag, `::part(<part>)` and
 * custom states (`:state(open)`, `:state(disabled)`, `:state(size-small)`).
 */
export * from "./vocabulary";
export * from "./types";
export * from "./manifest";
export * from "./selectors";
