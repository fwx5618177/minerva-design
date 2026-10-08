// `minerva-design/core`: the platform-neutral core plus the DOM primitives,
// i.e. the API `minerva-design/core` exposed before the core / dom split.
// Built as `dist/dom/core-web.*`. Renderers never import it: their
// `@minerva/core` / `@minerva/dom` imports point at the two halves directly,
// so a non-DOM renderer (React Native, mini-programs) never loads dist/dom.
export * from "@minerva/core";
export * from "./index";
