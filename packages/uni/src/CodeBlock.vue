<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { useI18n } from "./i18n";
import { cssLength } from "./primitives";
const { t } = useI18n();
const props = withDefaults(
  defineProps<{
    code?: string;
    language?: string;
    copyable?: boolean;
    wrap?: boolean;
    maxHeight?: string | number;
    ariaLabel?: string;
  }>(),
  { code: "", copyable: false, wrap: true, maxHeight: "24rem" },
);
const emit = defineEmits<{
  copy: [text: string];
  copied: [text: string];
  error: [error: unknown];
}>();
const status = ref<"idle" | "copied" | "copyFailed">("idle");
let timer: ReturnType<typeof setTimeout> | undefined;
let mounted = true;
function feedback(next: "copied" | "copyFailed") {
  if (!mounted) return;
  status.value = next;
  clearTimeout(timer);
  timer = setTimeout(() => (status.value = "idle"), 2000);
}
function copy() {
  if (typeof uni === "undefined" || !uni.setClipboardData) {
    feedback("copyFailed");
    emit("error", new Error("Clipboard unavailable"));
    return;
  }
  const text = props.code;
  uni.setClipboardData({
    data: text,
    success: () => {
      if (!mounted) return;
      feedback("copied");
      emit("copy", text);
      emit("copied", text);
    },
    fail: (error) => {
      if (!mounted) return;
      feedback("copyFailed");
      emit("error", error);
    },
  });
}
onBeforeUnmount(() => {
  mounted = false;
  clearTimeout(timer);
});
</script>
<template>
  <view class="mn-code-block mn-uni-code-block">
    <view v-if="language || copyable" class="mn-row mn-code-header"
      ><text class="mn-muted">{{ language }}</text
      ><button
        v-if="copyable"
        class="mn-close"
        :aria-label="t(`codeBlock.${status === 'idle' ? 'copy' : status}`)"
        @tap="copy"
      >
        {{ t(`codeBlock.${status === "idle" ? "copy" : status}`) }}
      </button></view
    >
    <scroll-view
      class="mn-code-region"
      :scroll-x="!wrap"
      scroll-y
      role="region"
      :aria-label="ariaLabel ?? t('codeBlock.label')"
      :style="{ maxHeight: cssLength(maxHeight) }"
      ><text
        class="mn-code"
        selectable
        :style="{
          whiteSpace: wrap ? 'pre-wrap' : 'pre',
          overflowWrap: wrap ? 'anywhere' : 'normal',
        }"
        >{{ code }}</text
      ></scroll-view
    >
    <text v-if="copyable" class="mn-sr-only" aria-live="polite">{{
      status === "idle" ? "" : t(`codeBlock.${status}`)
    }}</text>
  </view>
</template>
