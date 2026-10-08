<script setup lang="ts">
/**
 * Tooltip: shows informative content when the wrapped element (default
 * slot) is hovered or focused. Flips / shifts to stay inside the viewport.
 *
 * WCAG 1.4.13: dismissable with Escape (a non-modal layer: only when it is
 * the topmost one, so in an open Popover the first Escape closes the
 * tooltip only), hoverable (the pointer can move from the trigger onto the
 * tooltip through the gap between them) and persistent.
 *
 * Attributes (`class`, `style`, listeners...) go to the trigger wrapper, or
 * to the child with `asChild`.
 */
import {
  cloneVNode,
  Comment,
  computed,
  Fragment,
  h,
  isRef,
  onBeforeUnmount,
  shallowRef,
  Text,
  useAttrs,
  useId,
  watch,
  type CSSProperties,
  type VNode,
} from "vue";
import { createPointerGrace, parsePlacement } from "@minerva/dom";
import styles from "@react-styles/components/Tooltip/tooltip.module.scss";
import Portal from "../../internal/Portal";
import { Slot, unrefElement } from "../../internal/Slot";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import { useFloatingLayer } from "../../internal/floating-layer";
import type { VirtualElement } from "../../internal/anchored-position";
import { LayerScope, useTooltipConfig } from "./context";
import type { TooltipProps } from "./types";

defineOptions({ name: "Tooltip", inheritAttrs: false });

/** Extra gap so the arrow does not overlap the trigger. */
const ARROW_GAP = 6;
/**
 * How long the pointer may travel from the trigger to the tooltip (through
 * the gap between them) before the tooltip closes (WCAG 1.4.13 hoverable).
 */
const HOVER_GRACE_MS = 300;

const props = withDefaults(defineProps<TooltipProps>(), {
  content: undefined,
  open: undefined,
  defaultOpen: undefined,
  placement: "top",
  color: "neutral",
  variant: "solid",
  shape: "default",
  animation: "fade",
  enterDelay: undefined,
  leaveDelay: undefined,
  offset: undefined,
  followCursor: false,
  zIndex: 1500,
  arrow: false,
  disabled: false,
  className: "",
  ariaLabel: undefined,
  asChild: false,
  contentClassName: undefined,
  contentRef: undefined,
});
const emit = defineEmits<{
  "update:open": [open: boolean];
  /** Requested open state (hover, focus, Escape, exposed methods) */
  openChange: [open: boolean];
  /** The tooltip opens from hover or focus */
  open: [];
  /** The tooltip closes from mouse leave, blur or Escape */
  close: [];
}>();
const slots = defineSlots<{
  /** The element that triggers the tooltip; prefer a focusable element */
  default?: () => VNode[];
  /** Content displayed inside the tooltip (the `content` prop) */
  content?: () => unknown;
}>();

const attrs = useAttrs();
const config = useTooltipConfig();
const enterDelay = () => props.enterDelay ?? config?.enterDelay ?? 200;
const leaveDelay = () => props.leaveDelay ?? config?.leaveDelay ?? 0;

const open = useControllable<boolean>(props, "open", {
  fallback: false,
  name: "Tooltip",
  onChange: (value) => emit("openChange", value),
});
const triggerEl = shallowRef<HTMLElement | null>(null);
const arrowEl = shallowRef<HTMLElement | null>(null);
const cursor = shallowRef<{ x: number; y: number } | null>(null);
const tooltipId = `tooltip-${useId().replace(/[^\w-]/g, "")}`;

let enterTimeout: ReturnType<typeof setTimeout> | undefined;
let leaveTimeout: ReturnType<typeof setTimeout> | undefined;
// Pointer travelling from the trigger towards the tooltip
const grace = createPointerGrace({ timeout: 0 });

const clearTimers = () => {
  clearTimeout(enterTimeout);
  clearTimeout(leaveTimeout);
  grace.clear();
};
onBeforeUnmount(() => {
  clearTimeout(enterTimeout);
  clearTimeout(leaveTimeout);
});

const show = () => {
  if (open.value) return;
  open.value = true;
  emit("open");
};
const hide = () => {
  if (!open.value) return;
  config?.markClosed();
  open.value = false;
  emit("close");
};

// A virtual element at the cursor position when following the cursor
const cursorAnchor = computed<VirtualElement | null>(() => {
  const point = cursor.value;
  if (!props.followCursor || !point) return null;
  return {
    getBoundingClientRect: () =>
      DOMRect.fromRect({ x: point.x, y: point.y, width: 0, height: 0 }),
  };
});

const visible = computed(() => open.value && !props.disabled);
const layer = useFloatingLayer(() => {
  const { placement, offset, arrow } = props;
  const isVertical =
    placement.startsWith("top") || placement.startsWith("bottom");
  const gap = arrow ? ARROW_GAP : 0;
  return {
    open: visible.value,
    anchor: cursorAnchor.value ?? triggerEl.value,
    placement,
    offset: offset
      ? {
          mainAxis: (isVertical ? offset[1] : offset[0]) + gap,
          crossAxis: isVertical ? offset[0] : offset[1],
        }
      : { mainAxis: 8 + gap },
    arrowElement: arrow ? arrowEl.value : null,
    branches: () => [triggerEl.value],
    // Escape only (topmost layer); hover / focus handle the rest
    dismissOnPointerDownOutside: false,
    dismissOnFocusOutside: false,
    onDismiss: () => {
      clearTimers();
      hide();
    },
  };
});

// Track the cursor while open (followCursor)
watch(
  () => props.followCursor && open.value,
  (on, _prev, onCleanup) => {
    if (!on || typeof document === "undefined") return;
    const handleMouseMove = (e: MouseEvent) => {
      cursor.value = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener("mousemove", handleMouseMove);
    onCleanup(() => document.removeEventListener("mousemove", handleMouseMove));
  },
  { flush: "post", immediate: true },
);

const scheduleHide = () => {
  clearTimeout(leaveTimeout);
  leaveTimeout = setTimeout(hide, leaveDelay());
};

// Hoverable (WCAG 1.4.13): while the pointer heads from the trigger to the
// tooltip through the gap between them, keep it open.
watch(
  () => open.value && !props.followCursor,
  (on, _prev, onCleanup) => {
    if (!on || typeof document === "undefined") return;
    const handlePointerMove = (e: PointerEvent) => {
      if (!grace.getArea()) return;
      const target = e.target as Node | null;
      if (
        target &&
        (triggerEl.value?.contains(target) ||
          layer.element.value?.contains(target))
      ) {
        return;
      }
      if (grace.isInGraceArea({ x: e.clientX, y: e.clientY })) return;
      grace.clear();
      scheduleHide();
    };
    document.addEventListener("pointermove", handlePointerMove);
    onCleanup(() =>
      document.removeEventListener("pointermove", handlePointerMove),
    );
  },
  { flush: "post", immediate: true },
);

const handleMouseEnter = (e: MouseEvent) => {
  if (props.disabled) return;
  if (props.followCursor) cursor.value = { x: e.clientX, y: e.clientY };
  clearTimers();
  // Within a provider, moving quickly between tooltips skips the delay
  if (enterDelay() <= 0 || config?.shouldSkipDelay()) {
    show();
    return;
  }
  enterTimeout = setTimeout(show, enterDelay());
};

const handleMouseLeave = (e: MouseEvent) => {
  if (props.disabled) return;
  clearTimers();
  const rect = layer.element.value?.getBoundingClientRect();
  if (
    open.value &&
    !props.followCursor &&
    rect &&
    rect.width > 0 &&
    rect.height > 0
  ) {
    // Heading for the tooltip: keep it open while the pointer crosses the
    // gap (pointermove above), at most HOVER_GRACE_MS.
    grace.start(
      { x: e.clientX, y: e.clientY },
      rect,
      parsePlacement(layer.placement.value).side,
    );
    leaveTimeout = setTimeout(hide, Math.max(leaveDelay(), HOVER_GRACE_MS));
    return;
  }
  scheduleHide();
};

// The pointer reached the tooltip: stay open until it leaves it
const handleContentMouseEnter = () => clearTimers();
const handleContentMouseLeave = () => {
  if (!props.followCursor) scheduleHide();
};

// Keyboard users get the tooltip when the wrapped (interactive) child
// receives focus. Activation keys are left alone so they still reach it.
const handleFocus = () => {
  if (props.disabled) return;
  clearTimers();
  show();
};
const handleBlur = () => {
  if (props.disabled) return;
  clearTimers();
  hide();
};

const setOpen = (value: boolean) => {
  open.value = value;
};
defineExpose({
  open: () => setOpen(true),
  close: () => setOpen(false),
  toggle: () => setOpen(!open.value),
  /** The tooltip (floating) element while shown */
  contentElement: layer.element,
});

const setTrigger = (el: unknown) => {
  triggerEl.value = unrefElement(el);
};
const setArrow = (el: unknown) => {
  arrowEl.value = el instanceof HTMLElement ? el : null;
};
const setContent = (el: unknown) => {
  const node = el instanceof HTMLDivElement ? el : null;
  layer.element.value = node;
  const target = props.contentRef;
  if (typeof target === "function") target(node);
  else if (isRef(target)) target.value = node;
};

/** The single element of the default slot (fragments flattened), if any */
const singleElement = (nodes: VNode[]): VNode | null => {
  const found: VNode[] = [];
  const walk = (list: VNode[]) => {
    for (const node of list) {
      if (node.type === Comment) continue;
      if (node.type === Fragment) walk(node.children as VNode[]);
      else if (node.type === Text && String(node.children).trim() === "") {
        continue;
      } else found.push(node);
    }
  };
  walk(nodes);
  return found.length === 1 && found[0].type !== Text ? found[0] : null;
};

/** Calls a listener of `$attrs` (a function or an array of them) */
const callListener = (listener: unknown, event: Event) => {
  if (Array.isArray(listener)) {
    for (const fn of listener) callListener(fn, event);
  } else if (typeof listener === "function") {
    (listener as (event: Event) => void)(event);
  }
};

/** `$attrs` with the trigger handlers chained after the user's listeners */
const triggerAttrs = () => {
  const own: Record<string, (event: never) => void> = {
    onMouseenter: handleMouseEnter,
    onMouseleave: handleMouseLeave,
    // focusin / focusout: like React's onFocus / onBlur, they bubble from
    // the wrapped child to the wrapper
    onFocusin: handleFocus,
    onFocusout: handleBlur,
  };
  const result: Record<string, unknown> = { ...attrs };
  for (const [key, handler] of Object.entries(own)) {
    const user = attrs[key];
    result[key] = (event: Event) => {
      callListener(user, event);
      handler(event as never);
    };
  }
  return result;
};

/**
 * The trigger: the wrapper `<div>` around the slot, or with `asChild` the
 * single child itself. The interactive child points at the tooltip
 * (`aria-describedby`); the wrapper does when the slot is not a single
 * element (e.g. plain text).
 */
const renderTrigger = (): VNode => {
  const nodes = slots.default?.() ?? [];
  const child = singleElement(nodes);
  const describedBy = visible.value ? tooltipId : undefined;
  const describe = (vnode: VNode) => {
    const own = vnode.props?.["aria-describedby"] as string | undefined;
    return cloneVNode(vnode, {
      "aria-describedby":
        [own, describedBy].filter(Boolean).join(" ") || undefined,
    });
  };
  if (props.asChild && child) {
    // Disabled: render the child untouched (no handlers, no state hooks)
    if (props.disabled) return child;
    return h(
      Slot,
      {
        ...triggerAttrs(),
        class: [props.className || undefined, attrs.class],
        ref: setTrigger,
      },
      () => [describe(child)],
    );
  }
  return h(
    "div",
    {
      ...triggerAttrs(),
      ref: setTrigger,
      class: [styles.tooltipTrigger, props.className, attrs.class],
      "aria-describedby": child ? undefined : describedBy,
      // The wrapper only: with asChild the child keeps its own hooks.
      ...hooks("tooltip", "trigger", {
        state: visible.value ? "open" : "closed",
        disabled: props.disabled,
      }),
    },
    child ? [describe(child)] : nodes,
  );
};

const contentClasses = computed(() => [
  styles.tooltip,
  styles[props.color],
  styles[props.variant],
  styles[props.shape],
  styles[`animation-${props.animation}`],
  props.followCursor && styles.followCursor,
  props.arrow && styles.arrow,
  layer.isPositioned.value && styles.show,
  props.contentClassName,
]);
const contentStyle = computed<CSSProperties>(() => ({
  ...layer.floatingStyles.value,
  zIndex: props.zIndex,
}));
const contentHooks = computed(() =>
  hooks("tooltip", "content", {
    state: "open",
    color: props.color,
    variant: props.variant,
    shape: props.shape,
    ...parsePlacement(layer.placement.value),
    placement: layer.placement.value,
  }),
);
</script>

<template>
  <component :is="renderTrigger()" />
  <Portal>
    <div
      v-if="visible"
      :id="tooltipId"
      :ref="setContent"
      :dir="layer.dir.value"
      role="tooltip"
      :aria-label="ariaLabel"
      :class="contentClasses"
      :style="contentStyle"
      v-bind="contentHooks"
      @mouseenter="handleContentMouseEnter"
      @mouseleave="handleContentMouseLeave"
    >
      <LayerScope :element="layer.element.value">
        <slot name="content">{{ content }}</slot>
      </LayerScope>
      <div
        v-if="arrow"
        :ref="setArrow"
        :class="styles.tooltipArrow"
        :style="layer.arrowStyles.value"
        v-bind="hooks('tooltip', 'arrow')"
      />
    </div>
  </Portal>
</template>
