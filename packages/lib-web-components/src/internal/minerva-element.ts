import {
  LitElement,
  css,
  defaultConverter,
  type CSSResultGroup,
  type PropertyDeclaration,
  type PropertyValues,
} from "lit";
import type { DefinableElement } from "./define";
import { emit, type EmitOptions, type MinervaEventName } from "./events";
import { markServerRendered, scheduleHostSettle } from "./hydration";
import { setCustomStates, type HookStates } from "./styling-hooks";

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
 * - reconnection: controllers release their global resources (layers,
 *   focus scopes, scroll lock, observers...) when the element is
 *   disconnected. Moving an element in the DOM (re-parenting, list
 *   re-ordering) reconnects it without any property change, so the base
 *   class calls `reconnectedCallback()`, which runs an update in which an
 *   open element sees `open` as changed: its open side effects run again,
 *   as if it had just been opened.
 * - styling hooks: `hookStates()` returns the element's public state hooks,
 *   applied as custom states of the host (`:state(open)`, see
 *   `internal/styling-hooks.ts`) after every update; call
 *   `syncHookStates()` when a state changes outside an update.
 * - hydration: an element that may be server-rendered markup (upgraded, or
 *   parsed while the document loads) defers the host attributes it writes
 *   itself (`setHostAttribute()` / `onHostSettled()` of
 *   `internal/hydration.ts`) until hydration had a chance to run.
 */
/** Elements whose `update()` is running (reflection happens first, synchronously) */
const updating: MinervaElement[] = [];

/** Default property values of each element class, read from a never-connected instance */
const defaults = new WeakMap<object, Record<string, unknown>>();
function defaultsOf(el: MinervaElement): Record<string, unknown> {
  const ctor = el.constructor as CustomElementConstructor;
  let values = defaults.get(ctor);
  if (!values) {
    values = {};
    defaults.set(ctor, values);
    const fresh = new ctor() as unknown as Record<string, unknown>;
    const props = (ctor as unknown as typeof LitElement).elementProperties;
    for (const key of props.keys())
      values[key as string] = fresh[key as string];
  }
  return values;
}

const attributeName = (name: PropertyKey, options: PropertyDeclaration) =>
  typeof options.attribute === "string"
    ? options.attribute
    : String(name).toLowerCase();

export class MinervaElement extends LitElement {
  /** Registered tag name; every concrete element overrides it. */
  static tagName = "";
  /** Minerva elements rendered by this element (registered before it). */
  static dependencies: readonly DefinableElement[] = [];

  /**
   * Reflected properties do not reflect their default value: an upgraded
   * element adds no attribute to its host, so server-rendered markup (e.g.
   * a React 19 page rendering the tags) hydrates without attribute
   * mismatches. A value set explicitly (attribute, or a property differing
   * from the class default, also before connecting) reflects as usual, and
   * every later change reflects. Styles of a default value therefore match
   * `:host(:not([attr]))` as well.
   */
  static override createProperty(
    name: PropertyKey,
    options?: PropertyDeclaration,
  ): void {
    if (!options?.reflect || options.attribute === false) {
      super.createProperty(name, options);
      return;
    }
    const converter =
      typeof options.converter === "function"
        ? { fromAttribute: options.converter }
        : options.converter;
    const toAttribute = converter?.toAttribute ?? defaultConverter.toAttribute!;
    super.createProperty(name, {
      ...options,
      converter: {
        fromAttribute:
          converter?.fromAttribute ?? defaultConverter.fromAttribute,
        toAttribute(value: unknown, type?: unknown) {
          const el = updating[updating.length - 1];
          if (
            el &&
            !el.hasUpdated &&
            Object.is(value, defaultsOf(el)[name as string]) &&
            !el.hasAttribute(attributeName(name, options))
          ) {
            return undefined; // the default stays implicit (no attribute)
          }
          return toAttribute(value, type);
        },
      },
    });
  }

  constructor() {
    super();
    markServerRendered(this);
  }

  protected override update(changed: PropertyValues): void {
    updating.push(this);
    try {
      super.update(changed);
    } finally {
      updating.pop();
    }
    this.syncHookStates();
  }

  /**
   * Public state hooks of the element (`@minerva/core/styling-hooks`
   * vocabulary: `{ state: "open", disabled: true, size: "small" }`), applied
   * as custom states of the host. `undefined`: no state hooks.
   */
  protected hookStates(): HookStates | undefined {
    return undefined;
  }

  /** Applies `hookStates()` now (states that change outside an update). */
  protected syncHookStates(): void {
    const states = this.hookStates();
    if (states) setCustomStates(this, states);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.hasUpdated) this.reconnectedCallback();
    scheduleHostSettle(this);
  }

  /**
   * Called when an element that already rendered is connected again.
   * Requests an update (resources acquired in `updated()` are re-acquired);
   * an open element (`open` property true) re-runs its opening. Override to
   * re-acquire resources set up once in `firstUpdated()` (call super).
   */
  protected reconnectedCallback(): void {
    if ((this as { open?: unknown }).open === true) {
      this.requestUpdate("open", false);
    } else {
      this.requestUpdate();
    }
  }

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
