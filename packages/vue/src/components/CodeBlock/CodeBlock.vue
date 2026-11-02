<script setup lang="ts">
/**
 * CodeBlock: a read-only block of preformatted text (logs, payloads,
 * config). It is a named, keyboard-focusable region so its overflow can be
 * scrolled without a mouse (WCAG 2.1.1, axe scrollable-region-focusable).
 * With `copyable`, a copy button (top-right) writes the text to the
 * clipboard and a visually hidden polite live region announces the result.
 * With `language`, the syntax is highlighted into colored spans (the text
 * content and the copied text stay the source text); `language="auto"`
 * detects it from the text (memoized per text). `marks` wraps
 * character ranges in <mark>s over the highlighting.
 */
import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  ref,
  useAttrs,
  type StyleValue,
} from "vue";
import {
  codeLanguageLabel,
  detectCodeLanguage,
  type CodeLanguage,
  type CodeMark,
} from "@minerva/core";
import { clickedCodeMark } from "@minerva/dom";
import styles from "@react-styles/components/CodeBlock/codeBlock.module.scss";
import { hooks } from "../../internal/hooks";
import { IconCheck, IconCopy, IconX } from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import { IconButton } from "../IconButton";
import { CodeContent, vnodeText } from "./CodeContent";
import type { CodeBlockProps } from "./types";

defineOptions({ name: "CodeBlock", inheritAttrs: false });

const props = withDefaults(defineProps<CodeBlockProps>(), {
  code: undefined,
  wrap: true,
  maxHeight: "24rem",
  copyable: false,
  language: undefined,
  highlight: true,
  showLineNumbers: false,
  showLanguage: false,
  marks: undefined,
});

const emit = defineEmits<{
  /** The copy button wrote the text to the clipboard (not on failure) */
  copied: [text: string];
  /**
   * A mark was clicked (not at the end of a text selection drag): the mark
   * object of `marks` (the topmost one where marks overlap)
   */
  "mark-click": [mark: CodeMark, event: MouseEvent];
}>();

const slots = defineSlots<{
  /** Source text (when the `code` prop is not set) */
  default?: () => unknown;
}>();

/** How long the "Copied" / "Copy failed" feedback stays visible (ms). */
const COPY_FEEDBACK_MS = 2000;

const attrs = useAttrs();
const { t } = useI18n();
const status = ref<"idle" | "copied" | "failed">("idle");
const pre = ref<HTMLPreElement | null>(null);
let timer: ReturnType<typeof setTimeout> | undefined;
let mounted = true;
onBeforeUnmount(() => {
  mounted = false;
  clearTimeout(timer);
});

const showStatus = (next: "copied" | "failed") => {
  if (!mounted) return;
  clearTimeout(timer);
  status.value = next;
  timer = setTimeout(() => {
    status.value = "idle";
  }, COPY_FEEDBACK_MS);
};

/** The verbatim text: the `code` prop, else the rendered slot text */
const sourceText = () =>
  props.code ?? pre.value?.querySelector("code")?.textContent ?? "";

const copy = async () => {
  const text = sourceText();
  const clipboard =
    typeof navigator === "undefined" ? undefined : navigator.clipboard;
  if (typeof clipboard?.writeText !== "function") {
    showStatus("failed");
    return;
  }
  try {
    await clipboard.writeText(text);
  } catch {
    showStatus("failed");
    return;
  }
  showStatus("copied");
  emit("copied", text);
};

const REGION_ATTRS = [
  "aria-label",
  "aria-labelledby",
  "aria-describedby",
  "tabindex",
  "tabIndex",
];
const regionAttrs = computed(() => {
  const ariaLabelledBy = attrs["aria-labelledby"] as string | undefined;
  return {
    role: "region",
    tabindex: (attrs.tabindex ?? attrs.tabIndex ?? 0) as string | number,
    "aria-label":
      (attrs["aria-label"] as string | undefined) ??
      (ariaLabelledBy !== undefined ? undefined : t("codeBlock.label")),
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": attrs["aria-describedby"] as string | undefined,
    "data-wrap": String(props.wrap),
  };
});
const otherAttrs = computed(() => {
  const rest: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(attrs)) {
    if (!REGION_ATTRS.includes(key) && key !== "style") rest[key] = value;
  }
  return rest;
});
const boxStyle = computed<StyleValue>(() => [
  {
    maxHeight:
      typeof props.maxHeight === "number"
        ? `${props.maxHeight}px`
        : props.maxHeight,
  },
  attrs.style as StyleValue,
]);
const statusText = computed(() =>
  status.value === "copied"
    ? t("codeBlock.copied")
    : status.value === "failed"
      ? t("codeBlock.copyFailed")
      : "",
);
const buttonColor = computed(() =>
  status.value === "failed"
    ? "danger"
    : status.value === "copied"
      ? "success"
      : "neutral",
);

const requested = computed(() => props.language?.trim() || undefined);
const auto = computed(() => requested.value?.toLowerCase() === "auto");
/** Last detection of `language="auto"` (the text can come from the slot) */
let detected: { text: string; language: CodeLanguage } | undefined;
/** The language, `auto` resolved (call while rendering: reads the slot) */
const lang = () => {
  if (!auto.value) return requested.value;
  const text = renderText();
  if (detected?.text !== text) {
    detected = { text, language: detectCodeLanguage(text) };
  }
  return detected.language;
};
/** Highlighted, marked and / or numbered: the <code> holds elements */
const rich = computed(
  () =>
    (!!requested.value && props.highlight) ||
    props.showLineNumbers ||
    !!props.marks?.length,
);
const instance = getCurrentInstance();
/** Whether a `mark-click` listener is set (marks get a click affordance) */
const hasMarkListener = () => !!instance?.vnode.props?.onMarkClick;
const onCodeClick = (event: MouseEvent) => {
  const mark = clickedCodeMark(
    event.target,
    event.currentTarget as Element,
    props.marks,
  );
  if (mark) emit("mark-click", mark, event);
};
/** The language label (call while rendering) */
const label = () => {
  const language = props.showLanguage ? lang() : undefined;
  return language ? codeLanguageLabel(language) : "";
};
/** Source text, read while rendering (the slot text without `code`) */
const renderText = () => props.code ?? vnodeText(slots.default?.() as never);
/** Attributes of the <code> (call while rendering: reads the slot) */
const codeAttrs = () => {
  const lines = props.showLineNumbers
    ? renderText().replace(/\n$/, "").split("\n").length
    : 0;
  const language = lang();
  return {
    class: language ? `language-${language}` : undefined,
    "data-language": language,
    style: lines
      ? { "--code-line-digits": Math.max(String(lines).length, 2) }
      : undefined,
    ...hooks("code-block", "code"),
  };
};
</script>

<template>
  <pre
    v-if="!copyable && !label()"
    ref="pre"
    :class="styles.codeBlock"
    :style="boxStyle"
    v-bind="{
      ...regionAttrs,
      ...otherAttrs,
      ...hooks('code-block', 'region'),
    }"
  ><code v-bind="codeAttrs()" @click="onCodeClick"><CodeContent v-if="rich" :text="renderText()" :language="highlight ? lang() : undefined" :line-numbers="showLineNumbers" :marks="marks" :clickable="hasMarkListener()" /><template v-else-if="code !== undefined">{{ code }}</template><slot v-else-if="slots.default" /></code></pre>
  <div
    v-else
    v-bind="{ ...otherAttrs, ...hooks('code-block', 'root') }"
    :class="styles.root"
    :style="boxStyle"
  >
    <pre
      ref="pre"
      v-bind="{ ...regionAttrs, ...hooks('code-block', 'region') }"
      :class="[
        styles.codeBlock,
        copyable && styles.copyable,
        label() && styles.labeled,
      ]"
    ><code v-bind="codeAttrs()" @click="onCodeClick"><CodeContent v-if="rich" :text="renderText()" :language="highlight ? lang() : undefined" :line-numbers="showLineNumbers" :marks="marks" :clickable="hasMarkListener()" /><template v-else-if="code !== undefined">{{ code }}</template><slot v-else-if="slots.default" /></code></pre>
    <div :class="styles.actions">
      <span
        v-if="label()"
        :class="styles.language"
        aria-hidden="true"
        v-bind="hooks('code-block', 'language')"
        >{{ label() }}</span
      >
      <IconButton
        v-if="copyable"
        type="button"
        :label="statusText || t('codeBlock.copy')"
        size="small"
        shape="square"
        :color="buttonColor"
        @click="copy"
      >
        <IconCheck v-if="status === 'copied'" :size="16" />
        <IconX v-else-if="status === 'failed'" :size="16" />
        <IconCopy v-else :size="16" />
      </IconButton>
    </div>
    <span v-if="copyable" :class="styles.visuallyHidden" aria-live="polite">{{
      statusText
    }}</span>
  </div>
</template>
