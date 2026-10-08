// Internal building blocks of the toast viewport (not exported).
import {
  computed,
  defineComponent,
  h,
  provide,
  type FunctionalComponent,
  type PropType,
  type SlotsType,
  type VNode,
} from "vue";
import { focusElement, getAdjacentTabbable, getTabbables } from "@minerva/dom";
import progressStyles from "@react-styles/components/ProgressIndicator/progressIndicator.module.scss";
import { hooks } from "../../internal/hooks";
import { IconSpinner } from "../../internal/icons";
import {
  THEME_SCOPE_KEY,
  useThemeScope,
  type ThemeScope,
} from "../../internal/scope";
import type { ToastContent } from "./types";

/** The open toasts of a viewport (public item hooks) */
export const OPEN_TOAST_CHILD =
  ':scope > [data-minerva="toast-region"][data-part="toast"][data-state="open"]';
/** The close button of a toast (public part) */
const CLOSE_BUTTON_CHILD =
  ':scope > [data-minerva="toast-region"][data-part="close-button"]';

/**
 * Focus bookkeeping shared by the viewports of a provider: the element
 * focused before focus entered a toast region.
 */
export interface ToastFocusTracker {
  /** Element to give focus back to once the toasts close */
  getReturnFocus: () => HTMLElement | null;
  setReturnFocus: (el: HTMLElement) => void;
  /** Registers the viewport element of a portal key (hotkey target) */
  registerViewport: (key: string, el: HTMLElement | null) => void;
}

/**
 * Moves focus out of the toast `el` before it closes: the close button (else
 * first button) of the next open toast, else the element focused before
 * focus entered the region, else the nearest tabbable outside the region,
 * else the region itself. Never <body>.
 */
export const moveFocusFromToast = (
  el: HTMLElement,
  tracker: ToastFocusTracker,
): void => {
  const viewport = el.parentElement;
  if (!viewport) return;
  const others = Array.from(
    viewport.querySelectorAll<HTMLElement>(OPEN_TOAST_CHILD),
  ).filter((other) => other !== el);
  const next =
    others.find(
      (other) =>
        el.compareDocumentPosition(other) & Node.DOCUMENT_POSITION_FOLLOWING,
    ) ?? others[others.length - 1];
  if (next) {
    const target =
      next.querySelector<HTMLElement>(CLOSE_BUTTON_CHILD) ??
      getTabbables(next)[0];
    if (focusElement(target)) return;
  }
  const previous = tracker.getReturnFocus();
  if (
    previous?.isConnected &&
    !viewport.contains(previous) &&
    focusElement(previous)
  ) {
    return;
  }
  if (focusElement(getAdjacentTabbable(viewport))) return;
  viewport.setAttribute("tabindex", "-1");
  focusElement(viewport, { preventScroll: true });
};

/** Renders toast content: a render function is called, anything else as is */
export const ToastRender: FunctionalComponent<{ content: ToastContent }> = (
  props,
) =>
  typeof props.content === "function"
    ? (props.content as () => ReturnType<FunctionalComponent>)()
    : (props.content as ReturnType<FunctionalComponent>);
ToastRender.props = ["content"];

/**
 * The decorative small spinner of a loading toast: the same DOM as the
 * React `<ProgressIndicator variant="spinner" size="small" color="current"
 * decorative />` (the toast itself is the live region).
 */
export const ToastSpinner: FunctionalComponent = () =>
  h(
    "div",
    {
      class: [progressStyles.progressIndicator, progressStyles.current],
      "aria-hidden": "true",
      ...hooks("progress", "root", {
        variant: "spinner",
        size: "small",
        color: "current",
      }),
    },
    [
      h(IconSpinner, {
        class: [progressStyles.spinner, progressStyles.small],
        "aria-hidden": "true",
        ...hooks("progress", "indicator"),
      }),
    ],
  );

/**
 * Renders its slot in the theme scope of the toast caller (portal host and
 * language for `t()`), else in the inherited one.
 */
export const ToastScope = defineComponent({
  name: "ToastScope",
  props: {
    scope: { type: Object as PropType<ThemeScope>, default: undefined },
  },
  slots: Object as SlotsType<{ default?: () => unknown }>,
  setup(props, { slots }) {
    const parent = useThemeScope();
    provide(
      THEME_SCOPE_KEY,
      computed(
        () =>
          props.scope ??
          parent?.value ?? {
            scoped: false,
            portalContainer: null,
            language: undefined,
          },
      ),
    );
    // A single child is rendered as the root (no fragment anchors around the
    // teleported viewport)
    return () => {
      const children = slots.default?.() as VNode[] | undefined;
      return children?.length === 1 ? children[0] : children;
    };
  },
});
