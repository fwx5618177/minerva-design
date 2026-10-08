import { css, type ReactiveController, type ReactiveControllerHost } from "lit";
import type {
  AnchorElement,
  AnchoredPositionOptions,
  AnchoredPositionResult,
} from "@minerva/core";
import { contains, getActiveElement } from "@minerva/core";
import { hideTopLayer, showTopLayer } from "../internal/dom";
import { AnchoredPositionController } from "./anchored-position";
import { DismissableLayerController } from "./dismissable-layer";
import { FocusScopeController } from "./focus-scope";

export interface FloatingLayerOptions extends AnchoredPositionOptions {
  /** Element (or virtual element) the panel is anchored to */
  anchor: () => AnchorElement | null | undefined;
  /** The floating panel (in the host's shadow root, `popover="manual"`) */
  floating: () => HTMLElement | null | undefined;
  /** Elements that are part of the layer (trigger, input...) */
  branches?: () => Array<Element | null | undefined>;
  /** The layer asks to close (Escape when topmost, outside interaction) */
  onDismiss: () => void;
  /** Escape while topmost; `preventDefault()` keeps it open */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /** @default true */
  dismissOnPointerDownOutside?: boolean;
  /** @default true */
  dismissOnFocusOutside?: boolean;
  /** Where focus goes on Escape when it is inside the panel */
  returnFocusOnEscape?: () => HTMLElement | null | undefined;
  /**
   * The panel receives focus: registers a non-trapping focus scope so an
   * enclosing trap (modal, drawer) pauses while it is open. @default false
   */
  focusable?: boolean;
  arrowSize?: number;
  onPosition?: (result: AnchoredPositionResult) => void;
}

/**
 * The shared behaviour of anchored, non-modal overlays (the React library's
 * `useFloatingLayer`): top layer (Popover API) + anchored position + a core
 * dismissable layer (+ an optional non-trapping focus scope).
 * Call `sync(open)` from the host's `updated()`.
 */
export class FloatingLayerController implements ReactiveController {
  readonly position: AnchoredPositionController;
  private readonly layer: DismissableLayerController;
  private readonly scope: FocusScopeController;
  private shown: HTMLElement | null = null;

  constructor(
    host: ReactiveControllerHost,
    private readonly options: () => FloatingLayerOptions,
  ) {
    host.addController(this);
    this.position = new AnchoredPositionController(host, () => {
      const { anchor, floating, branches, onDismiss, ...rest } = this.options();
      return rest;
    });
    this.layer = new DismissableLayerController(host, () => {
      const o = this.options();
      return {
        branches: o.branches,
        onEscapeKeyDown: (event) => {
          o.onEscapeKeyDown?.(event);
          if (event.defaultPrevented) return;
          const floating = this.shown;
          const active = getActiveElement(document);
          if (floating && active && contains(floating, active)) {
            o.returnFocusOnEscape?.()?.focus();
          }
        },
        onPointerDownOutside: () => o.dismissOnPointerDownOutside ?? true,
        onFocusOutside: () => o.dismissOnFocusOutside ?? true,
        onDismiss: o.onDismiss,
      };
    });
    this.scope = new FocusScopeController(host, () => ({
      autoFocus: false,
      restoreFocus: false,
    }));
  }

  /** Opens / closes the layer to match `open`. */
  sync(open: boolean): void {
    const o = this.options();
    const floating = open ? o.floating() : null;
    const anchor = open ? o.anchor() : null;
    if (!floating || !anchor) {
      this.close();
      return;
    }
    if (this.shown === floating) return;
    this.close();
    this.shown = floating;
    showTopLayer(floating);
    this.position.start(anchor, floating);
    this.layer.activate(floating);
    if (o.focusable) this.scope.activate(floating);
  }

  /** Repositions now (e.g. after the content changed size). */
  reposition(): void {
    const o = this.options();
    const floating = this.shown;
    const anchor = o.anchor();
    if (floating && anchor) this.position.start(anchor, floating);
  }

  get isOpen(): boolean {
    return this.shown !== null;
  }

  private close(): void {
    if (!this.shown) return;
    this.scope.deactivate();
    this.layer.deactivate();
    this.position.end();
    hideTopLayer(this.shown);
    this.shown = null;
  }

  hostDisconnected(): void {
    this.close();
  }
}

/**
 * Neutralises the user-agent styles of `[popover]` (centered, inset 0,
 * fit-content size, Canvas colors) so overlay panels keep the component's
 * own styling. List it before the component stylesheet.
 *
 * Top-layer panels stay in the DOM where their element is (that is how they
 * keep the theme scope), so they also inherit the surrounding text styles;
 * the React library's portalled panels inherit from `<body>` instead. The inherited
 * text properties that change layout are reset to their initial values here.
 */
export const popoverResetStyles = css`
  [popover] {
    margin: 0;
    inset: auto;
    width: auto;
    height: auto;
    padding: 0;
    border: 0;
    color: inherit;
    background: none;
    overflow: visible;
    text-align: start;
    text-indent: 0;
    text-transform: none;
    white-space: normal;
    letter-spacing: normal;
    word-spacing: normal;
    font-style: normal;
    font-weight: var(--font-weight-regular, 400);
    line-height: var(--line-height-base, 1.5);
    visibility: visible;
    cursor: auto;
  }
`;
