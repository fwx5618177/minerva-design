<script setup lang="ts">
/**
 * ToastProvider: renders the toasts shown with `toast()` / `useToast()`.
 * Place it once near the root of the app, around the content (default slot)
 * or on its own. When several providers are mounted only the outermost /
 * first one renders the toasts (with its own position, max, labels and
 * portal container); another one takes over when it unmounts.
 *
 * Toasts shown with `useToast()` inside a nested ConfigProvider are grouped
 * per scope: each scope gets its own viewport in its portal host (same
 * position, max and labels), so the scoped theme and language apply.
 *
 * SSR-safe: renders only its slot on the server and during hydration.
 */
import {
  computed,
  onBeforeUnmount,
  onMounted,
  shallowRef,
  Teleport,
  watch,
} from "vue";
import { formatHotkey, getToastOverflow, matchesHotkey } from "@minerva/core";
import { focusElement } from "@minerva/dom";
import { useIsClient } from "../../internal/is-client";
import { useThemeScope, type ThemeScope } from "../../internal/scope";
import ToastViewport from "./ToastViewport.vue";
import { OPEN_TOAST_CHILD, ToastScope, type ToastFocusTracker } from "./parts";
import { toastProviders, toastStore, type ToastItem } from "./store";
import type { ToastProviderProps } from "./types";

defineOptions({ name: "ToastProvider" });

const props = withDefaults(defineProps<ToastProviderProps>(), {
  position: "top-right",
  max: Infinity,
  pauseOnHover: true,
  ariaLabel: undefined,
  closeLabel: undefined,
  hotkey: () => ["F8"],
});
defineSlots<{
  /** Application content; the toast viewport is rendered after it */
  default?: () => unknown;
}>();

const order = toastProviders.nextOrder();
const owner = shallowRef<number | null>(null);
const isOwner = computed(() => owner.value === order);
let unregister: (() => void) | undefined;
let unsubscribeOwner: (() => void) | undefined;
onMounted(() => {
  unsubscribeOwner = toastProviders.subscribe(() => {
    owner.value = toastProviders.getOwner();
  });
  unregister = toastProviders.register(order);
  owner.value = toastProviders.getOwner();
});
onBeforeUnmount(() => {
  unsubscribeOwner?.();
  unregister?.();
});

// Non-owners do not subscribe to the toasts at all
const items = shallowRef<ToastItem[]>([]);
watch(
  isOwner,
  (own, _prev, onCleanup) => {
    if (!own) {
      items.value = [];
      return;
    }
    items.value = toastStore.getSnapshot();
    onCleanup(
      toastStore.subscribe((toasts) => {
        items.value = toasts;
      }),
    );
  },
  { immediate: true },
);

// SSR / hydration render nothing (the teleport needs document.body)
const isClient = useIsClient();
const scope = useThemeScope();

/** Viewport elements in render order (own one first) */
const viewports = new Map<string, HTMLElement>();
let returnFocus: HTMLElement | null = null;
const tracker: ToastFocusTracker = {
  getReturnFocus: () => returnFocus,
  setReturnFocus: (el) => {
    returnFocus = el;
  },
  registerViewport: (key, el) => {
    if (el) viewports.set(key, el);
    else viewports.delete(key);
  },
};

const hotkeyLabel = computed(() => formatHotkey(props.hotkey));
const hotkeyKey = computed(() => props.hotkey.join("\u0000"));

// The hotkey moves focus to the first region holding toasts
watch(
  [isOwner, hotkeyKey],
  ([own, key], _prev, onCleanup) => {
    if (!own || !key) return;
    const keys = key.split("\u0000");
    const onKeyDown = (event: KeyboardEvent) => {
      if (!matchesHotkey(event, keys)) return;
      // The provider's own viewport first, then the scoped ones
      const own = viewports.get("own");
      const viewport = [
        ...(own ? [own] : []),
        ...[...viewports.values()].filter((el) => el !== own),
      ].find((el) => el.isConnected && el.querySelector(OPEN_TOAST_CHILD));
      if (!viewport) return;
      event.preventDefault();
      const doc = viewport.ownerDocument;
      const active = doc.activeElement as HTMLElement | null;
      if (active && active !== doc.body && !viewport.contains(active)) {
        tracker.setReturnFocus(active);
      }
      viewport.setAttribute("tabindex", "-1");
      focusElement(viewport);
    };
    document.addEventListener("keydown", onKeyDown);
    onCleanup(() => document.removeEventListener("keydown", onKeyDown));
  },
  { flush: "post" },
);

// Defensive de-duplication (the latest toast of an id wins) so keys never
// collide.
const unique = computed(() => {
  const list = items.value;
  const seen = new Set<ToastItem["id"]>();
  const result: ToastItem[] = [];
  for (let i = list.length - 1; i >= 0; i -= 1) {
    if (seen.has(list[i].id)) continue;
    seen.add(list[i].id);
    result.unshift(list[i]);
  }
  return result;
});

// Over `max`: the oldest open toasts close (and animate out), so their
// onClose runs as with any other dismissal.
const overflowKey = computed(() =>
  getToastOverflow(unique.value, props.max)
    .map((item) => String(item.id))
    .join("\u0000"),
);
watch(
  [isOwner, overflowKey, () => props.max],
  ([own, key, max]) => {
    if (!own || !key) return;
    for (const item of getToastOverflow(toastStore.getSnapshot(), max)) {
      toastStore.dismiss(item.id);
    }
  },
  { immediate: true },
);

/** Stable portal keys of the scoped containers */
const containerKeys = new WeakMap<HTMLElement, number>();
let containerKeyCounter = 0;
const containerKey = (container: HTMLElement): string => {
  let key = containerKeys.get(container);
  if (key === undefined) {
    key = ++containerKeyCounter;
    containerKeys.set(container, key);
  }
  return `scope-${key}`;
};

interface ViewportGroup {
  key: string;
  container: HTMLElement;
  scope: ThemeScope | undefined;
  items: ToastItem[];
}

const groups = computed<ViewportGroup[]>(() => {
  if (!isClient.value || !isOwner.value) return [];
  // Same target as the Portal: the scoped host (once created), else body
  const ownContainer = scope?.value.scoped
    ? scope.value.portalContainer
    : (scope?.value.portalContainer ?? document.body);
  if (!ownContainer) return [];
  // One viewport per portal container; the provider's own one always exists
  // (the region stays mounted for screen readers).
  const byContainer = new Map<HTMLElement, ViewportGroup>([
    [
      ownContainer,
      { key: "own", container: ownContainer, scope: undefined, items: [] },
    ],
  ]);
  for (const item of unique.value) {
    const scoped = item.scope?.portalContainer;
    // A scope that went away (provider unmounted) falls back to ours
    const container = scoped?.isConnected ? scoped : ownContainer;
    let group = byContainer.get(container);
    if (!group) {
      group = {
        key: containerKey(container),
        container,
        scope: item.scope,
        items: [],
      };
      byContainer.set(container, group);
    }
    group.items.push(item);
  }
  return [...byContainer.values()];
});
</script>

<template>
  <slot />
  <Teleport v-for="group in groups" :key="group.key" :to="group.container">
    <ToastScope :scope="group.scope">
      <ToastViewport
        :items="group.items"
        :position="position"
        :pause-on-hover="pauseOnHover"
        :aria-label="ariaLabel"
        :close-label="closeLabel"
        :hotkey-label="hotkeyLabel"
        :tracker="tracker"
        :viewport-key="group.key"
      />
    </ToastScope>
  </Teleport>
</template>
