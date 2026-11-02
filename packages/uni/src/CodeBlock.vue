<script setup lang="ts">
import { computed, ref, onBeforeUnmount } from "vue";
import {
  codeLanguageLabel,
  highlightCode,
  splitHighlightLines,
} from "@minerva/core";
import { useI18n } from "./i18n";
import { cssLength } from "./primitives";
const { t } = useI18n();
const props = withDefaults(
  defineProps<{
    code?: string;
    /** Language of the code: highlights its syntax (plain text without it) */
    language?: string;
    copyable?: boolean;
    wrap?: boolean;
    maxHeight?: string | number;
    ariaLabel?: string;
    /** Highlights the syntax of `language` (false: plain text) */
    highlight?: boolean;
    /** Numbers the lines (aria-hidden gutter; one text per line) */
    showLineNumbers?: boolean;
    /** Shows the `language` as a small label in the header */
    showLanguage?: boolean;
  }>(),
  {
    code: "",
    copyable: false,
    wrap: true,
    maxHeight: "24rem",
    highlight: true,
    showLineNumbers: false,
    showLanguage: false,
  },
);
const lang = computed(() => props.language?.trim() || undefined);
const highlighted = computed(() => !!lang.value && props.highlight);
/** Token texts with their class ("" for plain text) */
const tokens = computed(() =>
  highlighted.value ? highlightCode(props.code, lang.value) : [],
);
const tokenClass = (type: string | null) =>
  type ? `mn-code-token-${type}` : "";
const lines = computed(() =>
  props.showLineNumbers
    ? splitHighlightLines(
        highlighted.value ? tokens.value : [{ type: null, text: props.code }],
      )
    : [],
);
const label = computed(() =>
  props.showLanguage && lang.value ? codeLanguageLabel(lang.value) : "",
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
    <view v-if="label || copyable" class="mn-row mn-code-header"
      ><text class="mn-muted mn-code-language" aria-hidden="true">{{
        label
      }}</text
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
      ><view
        v-if="showLineNumbers"
        class="mn-code mn-code--lines"
        :style="{
          whiteSpace: wrap ? 'pre-wrap' : 'pre',
          overflowWrap: wrap ? 'anywhere' : 'normal',
        }"
        ><view v-for="(line, n) in lines" :key="n" class="mn-code-line"
          ><text class="mn-code-line-number" aria-hidden="true">{{
            n + 1
          }}</text
          ><text class="mn-code-line-text" selectable
            ><text
              v-for="(token, i) in line"
              :key="i"
              :class="tokenClass(token.type)"
              >{{ token.text }}</text
            ></text
          ></view
        ></view
      ><text
        v-else
        class="mn-code"
        selectable
        :style="{
          whiteSpace: wrap ? 'pre-wrap' : 'pre',
          overflowWrap: wrap ? 'anywhere' : 'normal',
        }"
        ><template v-if="highlighted"
          ><text
            v-for="(token, i) in tokens"
            :key="i"
            :class="tokenClass(token.type)"
            >{{ token.text }}</text
          ></template
        ><template v-else>{{ code }}</template></text
      ></scroll-view
    >
    <text v-if="copyable" class="mn-sr-only" aria-live="polite">{{
      status === "idle" ? "" : t(`codeBlock.${status}`)
    }}</text>
  </view>
</template>
