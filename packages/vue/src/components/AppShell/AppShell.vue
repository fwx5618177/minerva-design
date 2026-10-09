<script setup lang="ts">
/**
 * AppShell: application chrome with a desktop sidebar (expanded, compact
 * rail or floating rail), a sticky header and a single `main` landmark. At
 * 768px and below the navigation moves into a modal drawer opened from the
 * header. A "Skip to content" link (first focusable element, visible on
 * focus) moves focus to `main`.
 */
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  useAttrs,
  useId,
  watch,
} from "vue";
import styles from "@react-styles/components/AppShell/appShell.module.scss";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import { provideDialog } from "../../internal/dialog";
import DialogContent from "../../internal/DialogContent.vue";
import { unrefElement } from "../../internal/Slot";
import {
  IconPanelLeftClose,
  IconPanelLeftOpen,
  IconPin,
  IconPinOff,
  IconX,
} from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import { IconButton } from "../IconButton";
import AppShellDrawerTitle from "./AppShellDrawerTitle.vue";
import type {
  AppShellLabels,
  AppShellNavigationState,
  AppShellProps,
  AppShellSidebarMode,
} from "./types";

defineOptions({ name: "AppShell", inheritAttrs: false });

const props = withDefaults(defineProps<AppShellProps>(), {
  brand: undefined,
  navigationLabel: undefined,
  navigationKey: undefined,
  sidebarMode: undefined,
  defaultSidebarMode: undefined,
  labels: undefined,
  skipLink: true,
});

const emit = defineEmits<{
  "update:sidebarMode": [mode: AppShellSidebarMode];
  /** The user changed the sidebar mode */
  sidebarModeChange: [mode: AppShellSidebarMode];
}>();

defineSlots<{
  /**
   * The navigation, rendered in exactly one place: the sidebar on desktop,
   * the drawer on mobile
   */
  navigation?: (state: AppShellNavigationState) => unknown;
  /** Brand (the `brand` prop) */
  brand?: () => unknown;
  /** Decorative brand icon, still visible in the compact rail */
  "brand-icon"?: () => unknown;
  /** Content of the top header bar (account menu, search...), outside `main` */
  "header-actions"?: () => unknown;
  /** Rendered between the header and `main` (e.g. open-page tabs) */
  "page-navigation"?: () => unknown;
  /** Page content, rendered inside the single `main` landmark */
  default?: () => unknown;
}>();

const MOBILE_QUERY = "(max-width: 768px)";

const attrs = useAttrs();
const { t } = useI18n();

const labels = computed<AppShellLabels>(() => {
  const o = props.labels;
  return {
    expand: o?.expand ?? t("appShell.expand"),
    collapse: o?.collapse ?? t("appShell.collapse"),
    enableFloating: o?.enableFloating ?? t("appShell.enableFloating"),
    disableFloating: o?.disableFloating ?? t("appShell.disableFloating"),
    openNavigation: o?.openNavigation ?? t("appShell.openNavigation"),
    closeNavigation: o?.closeNavigation ?? t("appShell.closeNavigation"),
  };
});
const label = computed(() => props.navigationLabel ?? t("appShell.navigation"));
const skipLinkLabel = computed(() =>
  typeof props.skipLink === "string"
    ? props.skipLink
    : t("appShell.skipToContent"),
);

const mode = useControllable<AppShellSidebarMode>(props, "sidebarMode", {
  fallback: "expanded",
  onChange: (value) => emit("sidebarModeChange", value),
  name: "AppShell",
});

// false on the server and during hydration, then follows the media query
const isMobile = ref(false);
let query: MediaQueryList | undefined;
const onQueryChange = () => {
  isMobile.value = !!query?.matches;
};
onMounted(() => {
  if (typeof window.matchMedia !== "function") return;
  query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener("change", onQueryChange);
  onQueryChange();
});
onBeforeUnmount(() => query?.removeEventListener("change", onQueryChange));

const mobileOpen = ref(false);
const hovered = ref(false);
const keyboardFocus = ref(false);
const drawerOpen = computed(() => isMobile.value && mobileOpen.value);

const headerToggle = shallowRef<unknown>(null);
const focusHeaderToggle = () => unrefElement(headerToggle.value)?.focus();

// A committed route (navigationKey) or a breakpoint change dismisses the
// temporary navigation and the floating hover / focus state.
watch(
  () => props.navigationKey,
  () => {
    mobileOpen.value = false;
  },
);
watch(isMobile, (mobile) => {
  // Leaving the mobile layout with the drawer open: its trigger is gone, so
  // move focus to the desktop header toggle (once rendered).
  const drawerWasOpen = mobileOpen.value;
  mobileOpen.value = false;
  hovered.value = false;
  keyboardFocus.value = false;
  if (!mobile && drawerWasOpen) void nextTick(focusHeaderToggle);
});

const dialog = provideDialog({
  open: drawerOpen,
  setOpen: (open) => {
    mobileOpen.value = open;
  },
  modal: computed(() => true),
});

const sidebarId = useId();
const mainId = useId();
const main = shallowRef<HTMLElement | null>(null);

const collapsed = computed(
  () =>
    !isMobile.value &&
    mode.value !== "expanded" &&
    !(mode.value === "floating" && (hovered.value || keyboardFocus.value)),
);
const compactMode = computed(() => mode.value !== "expanded");
const state = computed<AppShellNavigationState>(() => ({
  collapsed: collapsed.value,
  isMobile: isMobile.value,
  closeNavigation: () => {
    mobileOpen.value = false;
  },
  expandNavigation: () => {
    mode.value = "expanded";
  },
}));

const toggleCollapse = () => {
  mode.value = compactMode.value ? "expanded" : "compact";
};
const toggleFloating = () => {
  mode.value = mode.value === "floating" ? "compact" : "floating";
};

const onSkip = (event: MouseEvent) => {
  // Focus main directly: no hash change (routers) and focus really lands
  // there (tabindex="-1")
  event.preventDefault();
  main.value?.focus();
};

const onSidebarFocus = (event: FocusEvent) => {
  let visible = false;
  try {
    visible = (event.target as HTMLElement).matches(":focus-visible");
  } catch {
    // engines without :focus-visible support
  }
  if (visible) keyboardFocus.value = true;
};
const onSidebarKeydown = (event: KeyboardEvent) => {
  if (event.key === "Tab") keyboardFocus.value = true;
};
const onSidebarBlur = (event: FocusEvent) => {
  const sidebar = event.currentTarget as HTMLElement;
  if (!sidebar.contains(event.relatedTarget as Node | null)) {
    keyboardFocus.value = false;
  }
};

/** The DialogTrigger props of the mobile header button */
const triggerAttrs = computed(() => ({
  "aria-haspopup": "dialog" as const,
  "aria-expanded": drawerOpen.value,
  "aria-controls": drawerOpen.value ? dialog.contentId : undefined,
}));
const setHeaderToggle = (el: unknown) => {
  headerToggle.value = el;
  const node = unrefElement(el);
  if (isMobile.value) dialog.triggerEl.value = node;
};
const openDrawer = (event: MouseEvent) => {
  if (!event.defaultPrevented) mobileOpen.value = !mobileOpen.value;
};
const onCloseAutoFocus = (event: Event) => {
  event.preventDefault();
  focusHeaderToggle();
};

const rootAttrs = computed(() => ({
  ...attrs,
  "data-sidebar-mode": mode.value,
  "data-sidebar-expanded": !collapsed.value || undefined,
  ...hooks("app-shell", "root", {
    state: drawerOpen.value ? "open" : "closed",
  }),
}));
</script>

<template>
  <div :class="styles.shell" v-bind="rootAttrs">
    <a
      v-if="skipLink !== false"
      :class="styles.skipLink"
      :href="`#${mainId}`"
      v-bind="hooks('app-shell', 'skip-link')"
      @click="onSkip"
    >
      {{ skipLinkLabel }}
    </a>
    <aside
      v-if="!isMobile"
      :id="sidebarId"
      :class="styles.sidebar"
      :aria-label="label"
      v-bind="hooks('app-shell', 'sidebar')"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
      @focus.capture="onSidebarFocus"
      @keydown.capture="onSidebarKeydown"
      @pointerdown.capture="keyboardFocus = false"
      @blur.capture="onSidebarBlur"
    >
      <div :class="styles.brand">
        <span
          v-if="$slots['brand-icon']"
          :class="styles.brandIcon"
          aria-hidden="true"
        >
          <slot name="brand-icon" />
        </span>
        <span :class="styles.brandLabel"
          ><slot name="brand">{{ brand }}</slot></span
        >
      </div>
      <div :class="styles.navigation">
        <slot name="navigation" v-bind="state" />
      </div>
      <div :class="styles.sidebarActions">
        <IconButton
          size="small"
          shape="square"
          :class="styles.control"
          :aria-label="compactMode ? labels.expand : labels.collapse"
          :aria-controls="sidebarId"
          :aria-expanded="!collapsed"
          @click="toggleCollapse"
        >
          <IconPanelLeftOpen v-if="compactMode" aria-hidden="true" />
          <IconPanelLeftClose v-else aria-hidden="true" />
        </IconButton>
        <IconButton
          size="small"
          shape="square"
          :class="styles.control"
          :aria-pressed="mode === 'floating'"
          :aria-label="
            mode === 'floating' ? labels.disableFloating : labels.enableFloating
          "
          @click="toggleFloating"
        >
          <IconPinOff v-if="mode === 'floating'" aria-hidden="true" />
          <IconPin v-else aria-hidden="true" />
        </IconButton>
      </div>
    </aside>
    <div :class="styles.workspace">
      <header :class="styles.header" v-bind="hooks('app-shell', 'header')">
        <IconButton
          v-if="isMobile"
          :ref="setHeaderToggle"
          size="small"
          shape="square"
          :class="styles.control"
          :aria-label="labels.openNavigation"
          v-bind="triggerAttrs"
          @click="openDrawer"
        >
          <IconPanelLeftOpen aria-hidden="true" />
        </IconButton>
        <IconButton
          v-else
          :ref="setHeaderToggle"
          size="small"
          shape="square"
          :class="styles.control"
          :aria-label="compactMode ? labels.expand : labels.collapse"
          :aria-controls="sidebarId"
          :aria-expanded="!collapsed"
          @click="toggleCollapse"
        >
          <IconPanelLeftOpen v-if="compactMode" aria-hidden="true" />
          <IconPanelLeftClose v-else aria-hidden="true" />
        </IconButton>
        <div :class="styles.headerActions"><slot name="header-actions" /></div>
      </header>
      <slot name="page-navigation" />
      <main
        :id="mainId"
        ref="main"
        tabindex="-1"
        :class="styles.content"
        v-bind="hooks('app-shell', 'main')"
      >
        <slot />
      </main>
    </div>
    <DialogContent
      v-if="isMobile"
      :overlay-class="styles.overlay"
      :overlay-attrs="hooks('app-shell', 'overlay')"
      :class="styles.drawer"
      v-bind="hooks('app-shell', 'content')"
      @close-auto-focus="onCloseAutoFocus"
    >
      <AppShellDrawerTitle :class="styles.drawerHeader">{{
        label
      }}</AppShellDrawerTitle>
      <div :class="styles.drawerBody">
        <slot name="navigation" v-bind="state" />
      </div>
      <button
        type="button"
        :class="styles.drawerClose"
        :aria-label="labels.closeNavigation"
        v-bind="hooks('app-shell', 'close-button')"
        @click="dialog.setOpen(false)"
      >
        <IconX aria-hidden="true" />
      </button>
    </DialogContent>
  </div>
</template>
