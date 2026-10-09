<script setup lang="ts">
import { modalScope } from "./h5";
import { computed, ref, watch, nextTick, onBeforeUnmount } from "vue";
import { useResponsiveWidth } from "./responsive";
import { useI18n } from "./i18n";
type Mode = "expanded" | "compact" | "floating";
const props = withDefaults(
  defineProps<{
    brand?: string;
    brandIcon?: string;
    navigationLabel?: string;
    navigationKey?: string;
    sidebarMode?: Mode;
    defaultSidebarMode?: Mode;
    labels?: Partial<
      Record<
        | "expand"
        | "collapse"
        | "enableFloating"
        | "disableFloating"
        | "openNavigation"
        | "closeNavigation",
        string
      >
    >;
    skipLink?: boolean | string;
    sidebarWidth?: number;
  }>(),
  {
    defaultSidebarMode: "expanded",
    labels: () => ({}),
    skipLink: true,
    sidebarWidth: 256,
  },
);
const emit = defineEmits<{
  sidebarModeChange: [mode: Mode];
  "update:sidebarMode": [mode: Mode];
}>();
const { t } = useI18n();
const width = useResponsiveWidth();
const mobile = computed(() => width.value <= 768);
const open = ref(false),
  hover = ref(false);
const local = ref(props.defaultSidebarMode),
  main = ref<any>();
const mobilePanel = ref<any>();
let releaseModal: (() => void) | undefined;
let restoreFocus: HTMLElement | null = null;
watch(open, async (value) => {
  releaseModal?.();
  releaseModal = undefined;
  if (value && typeof document !== "undefined")
    restoreFocus = document.activeElement as HTMLElement;
  await nextTick();
  if (value) {
    const panel = mobilePanel.value?.$el ?? mobilePanel.value;
    releaseModal = modalScope(panel);
    panel?.focus?.();
  } else restoreFocus?.focus?.();
});
onBeforeUnmount(() => releaseModal?.());
const mode = computed(() => props.sidebarMode ?? local.value);
const collapsed = computed(
  () =>
    !mobile.value &&
    (mode.value === "compact" || (mode.value === "floating" && !hover.value)),
);
function setMode(value: Mode) {
  if (props.sidebarMode === undefined) local.value = value;
  emit("sidebarModeChange", value);
  emit("update:sidebarMode", value);
}
function close() {
  open.value = false;
}
function expand() {
  setMode("expanded");
}
watch(() => props.navigationKey, close);
watch(mobile, close);
const navigation = computed(() => ({
  collapsed: collapsed.value,
  isMobile: mobile.value,
  closeNavigation: close,
  expandNavigation: expand,
}));
function label(key: keyof typeof props.labels) {
  return props.labels[key] ?? t(`appShell.${key}`);
}
function skip() {
  const element = main.value?.$el ?? main.value;
  element?.focus?.();
  uni.pageScrollTo?.({ scrollTop: 0, duration: 0 });
}
</script>
<template>
  <view
    class="mn-uni-app-shell"
    :data-sidebar-mode="mode"
    :data-mobile="mobile"
  >
    <button v-if="skipLink" class="mn-uni-skip-link" @tap="skip">
      {{
        typeof skipLink === "string" ? skipLink : t("appShell.skipToContent")
      }}
    </button>
    <view
      v-if="!mobile"
      class="mn-uni-app-rail"
      :style="{
        width: `${mode === 'floating' || collapsed ? 64 : sidebarWidth}px`,
      }"
      ><view
        class="mn-uni-app-sidebar"
        :class="{ 'mn-uni-app-floating': mode === 'floating' }"
        :style="{ width: `${collapsed ? 64 : sidebarWidth}px` }"
        role="navigation"
        :aria-label="navigationLabel ?? t('appShell.navigation')"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
        @focusin="hover = true"
        @focusout="hover = false"
      >
        <view class="mn-uni-app-brand"
          ><slot name="brand-icon">{{ brandIcon }}</slot
          ><slot v-if="!collapsed" name="brand">{{ brand }}</slot></view
        >
        <slot
          name="navigation"
          :collapsed="navigation.collapsed"
          :is-mobile="navigation.isMobile"
          :close-navigation="navigation.closeNavigation"
          :expand-navigation="navigation.expandNavigation"
          ><slot
            name="sidebar"
            :collapsed="navigation.collapsed"
            :is-mobile="navigation.isMobile"
            :close-navigation="navigation.closeNavigation"
            :expand-navigation="navigation.expandNavigation"
        /></slot>
        <view class="mn-row"
          ><button
            class="mn-close"
            :aria-label="label(collapsed ? 'expand' : 'collapse')"
            @tap="setMode(collapsed ? 'expanded' : 'compact')"
          >
            {{ collapsed ? "›" : "‹" }}</button
          ><button
            class="mn-close"
            :aria-label="
              label(mode === 'floating' ? 'disableFloating' : 'enableFloating')
            "
            :aria-pressed="mode === 'floating'"
            @tap="setMode(mode === 'floating' ? 'expanded' : 'floating')"
          >
            ⌖
          </button></view
        >
      </view> </view
    ><view class="mn-uni-app-content">
      <view class="mn-app-header"
        ><button
          v-if="mobile"
          class="mn-close"
          :aria-label="label('openNavigation')"
          @tap="open = true"
        >
          ☰</button
        ><slot name="header-actions"><slot name="header" /></slot
      ></view>
      <slot name="page-navigation" /><view
        ref="main"
        role="main"
        tabindex="-1"
        class="mn-app-main"
        ><slot /></view
      ><slot name="footer" />
    </view>
    <view v-if="mobile && open" class="mn-overlay"
      ><view class="mn-backdrop" @tap="close" /><view
        ref="mobilePanel"
        tabindex="-1"
        aria-modal="true"
        @keydown.esc="close"
        class="mn-uni-app-mobile"
        role="dialog"
        :aria-label="navigationLabel ?? t('appShell.navigation')"
        ><button
          class="mn-close"
          :aria-label="label('closeNavigation')"
          @tap="close"
        >
          ×</button
        ><slot name="brand">{{ brand }}</slot
        ><slot
          name="navigation"
          :collapsed="navigation.collapsed"
          :is-mobile="navigation.isMobile"
          :close-navigation="navigation.closeNavigation"
          :expand-navigation="navigation.expandNavigation"
          ><slot
            name="sidebar"
            :collapsed="navigation.collapsed"
            :is-mobile="navigation.isMobile"
            :close-navigation="navigation.closeNavigation"
            :expand-navigation="navigation.expandNavigation" /></slot></view
    ></view>
  </view>
</template>
