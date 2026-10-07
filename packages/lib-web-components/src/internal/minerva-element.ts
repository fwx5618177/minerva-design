import { LitElement, css, type CSSResultGroup } from "lit";
import type { DefinableElement } from "./define";
import { emit, type EmitOptions, type MinervaEventName } from "./events";

/**
 * Base class of every Minerva element.
 *
 * - `static tagName` / `static dependencies` drive `defineElement()`; the
 *   class modules never register themselves (side-effect free), the
 *   `@minerva/lib-web-components/<name>` entries do.
 * - `emit()` dispatches the `minerva-*` events (see `internal/events.ts`).
 * - shadow DOM styles: `hostStyles` + the component's stylesheet (lib-core's
 *   SCSS compiled with unchanged class names, so both libraries share one
 *   source of truth and the same `--<component>-*` CSS variable contract).
 */
export class MinervaElement extends LitElement {
  /** Registered tag name; every concrete element overrides it. */
  static tagName = "";
  /** Minerva elements rendered by this element (registered before it). */
  static dependencies: readonly DefinableElement[] = [];

  /** Dispatches a bubbling, composed `minerva-*` CustomEvent. */
  protected emit<T>(
    name: MinervaEventName,
    detail?: T,
    options?: EmitOptions,
  ): boolean {
    return emit(this, name, detail, options);
  }
}

/** Shared `:host` rules: border-box sizing and the `hidden` attribute. */
export const hostStyles: CSSResultGroup = css`
  :host {
    box-sizing: border-box;
  }
  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }
  :host([hidden]) {
    display: none !important;
  }
  .visually-hidden {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }
`;
