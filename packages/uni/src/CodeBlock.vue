<script setup lang="ts">
import { computed, inject, ref, onBeforeUnmount, type ComputedRef } from "vue";
import {
  CODE_MARK_COLORS,
  applyCodeMarks,
  codeLanguageLabel,
  detectCodeLanguage,
  githubDark,
  highlightCode,
  resolveCodeMarkBackground,
  resolveTokens,
  splitCodeMarkLines,
  type CodeMark,
  type CodeMarkRun,
  type ComponentTheme,
  type DesignOptions,
  type Palette,
} from "@minerva/core";
import { useI18n } from "./i18n";
import { cssLength } from "./primitives";
const { t } = useI18n();
const props = withDefaults(
  defineProps<{
    code?: string;
    /**
     * Language of the code: highlights its syntax (plain text without it).
     * `"auto"` detects it from the code (`detectCodeLanguage`, "plain" when
     * unsure), shown by the label too
     */
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
    /**
     * Character ranges to mark (saved highlights, annotations): nested text
     * with the `mn-code-mark` class and the mark's background over the token
     * colors (the copied text stays the raw code). `start` / `end` are
     * UTF-16 offsets into `code`, clamped to it; empty ranges are ignored.
     * Where marks overlap, the later one wins. `color`: a theme color name
     * (a translucent tint) or any CSS color (default: translucent yellow)
     */
    marks?: readonly CodeMark[];
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
const requested = computed(() => props.language?.trim() || undefined);
const auto = computed(() => requested.value?.toLowerCase() === "auto");
/** The language, detected (once per code) for "auto" */
const lang = computed(() =>
  auto.value ? detectCodeLanguage(props.code) : requested.value,
);
const highlighted = computed(() => !!lang.value && props.highlight);
/** Token texts with their class ("" for plain text) */
const tokens = computed(() =>
  highlighted.value ? highlightCode(props.code, lang.value) : [],
);
const tokenClass = (type: string | null) =>
  type ? `mn-code-token-${type}` : "";
/** The code cut into runs covered by the same mark (or none) */
const runs = computed(() =>
  applyCodeMarks(
    highlighted.value ? tokens.value : [{ type: null, text: props.code }],
    props.marks,
  ),
);
const marked = computed(() => runs.value.some((run) => run.mark));
const lines = computed(() =>
  props.showLineNumbers ? splitCodeMarkLines(runs.value) : [],
);
const config = inject<ComputedRef<{
  mode?: "light" | "dark";
  theme?: string | Partial<ComponentTheme>;
  palette?: Palette | null;
  design?: DesignOptions;
}> | null>("minerva:config", null);
/** Theme colors, resolved only when a mark names one */
const themeColors = computed(() => {
  const named = props.marks?.some((mark) =>
    (CODE_MARK_COLORS as readonly string[]).includes(mark?.color?.trim() ?? ""),
  );
  if (!named) return {};
  const c = config?.value ?? {};
  return resolveTokens({
    mode: c.mode ?? "light",
    palette: c.palette,
    design: c.design,
    overrides:
      c.theme === "github-dark"
        ? githubDark
        : typeof c.theme === "object"
          ? c.theme
          : undefined,
  }).colors;
});
const runClass = (run: CodeMarkRun) =>
  run.mark
    ? ["mn-code-mark", run.mark.className].filter(Boolean).join(" ")
    : undefined;
const runStyle = (run: CodeMarkRun) =>
  run.mark?.color
    ? {
        backgroundColor: resolveCodeMarkBackground(
          run.mark.color,
          themeColors.value,
        ),
      }
    : undefined;
function markTap(run: CodeMarkRun) {
  if (run.mark) emit("mark-click", run.mark);
}
const label = computed(() =>
  props.showLanguage && lang.value ? codeLanguageLabel(lang.value) : "",
);
const emit = defineEmits<{
  copy: [text: string];
  copied: [text: string];
  error: [error: unknown];
  /** A mark was tapped: the item of `marks` (the topmost where they overlap) */
  "mark-click": [mark: CodeMark];
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
              v-for="(run, r) in line"
              :key="r"
              :class="runClass(run)"
              :style="runStyle(run)"
              :data-mark-id="run.mark?.id"
              :data-mark-index="run.mark ? run.index : undefined"
              @tap="markTap(run)"
              ><text
                v-for="(token, i) in run.tokens"
                :key="i"
                :class="tokenClass(token.type)"
                >{{ token.text }}</text
              ></text
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
        ><template v-if="marked"
          ><text
            v-for="(run, r) in runs"
            :key="r"
            :class="runClass(run)"
            :style="runStyle(run)"
            :data-mark-id="run.mark?.id"
            :data-mark-index="run.mark ? run.index : undefined"
            @tap="markTap(run)"
            ><text
              v-for="(token, i) in run.tokens"
              :key="i"
              :class="tokenClass(token.type)"
              >{{ token.text }}</text
            ></text
          ></template
        ><template v-else-if="highlighted"
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
