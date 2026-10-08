<script setup lang="ts">
/**
 * CodeBlock: a read-only block of preformatted text (logs, payloads,
 * config). It is a named, keyboard-focusable region so its overflow can be
 * scrolled without a mouse (WCAG 2.1.1, axe scrollable-region-focusable).
 * With `copyable`, a copy button (top-right) writes the text to the
 * clipboard and a visually hidden polite live region announces the result.
 */
import { computed, onBeforeUnmount, ref, useAttrs, type StyleValue } from "vue";
import styles from "@react-styles/components/CodeBlock/codeBlock.module.scss";
import { hooks } from "../../internal/hooks";
import { IconCheck, IconCopy, IconX } from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import { IconButton } from "../IconButton";
import type { CodeBlockProps } from "./types";

defineOptions({ name: "CodeBlock", inheritAttrs: false });

const props = withDefaults(defineProps<CodeBlockProps>(), {
  code: undefined,
  wrap: true,
  maxHeight: "24rem",
  copyable: false,
});

const emit = defineEmits<{
  /** The copy button wrote the text to the clipboard (not on failure) */
  copied: [text: string];
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
  const ariaLabelledBy = attrs["aria-labelledby"];
  return {
    role: "region",
    tabindex: attrs.tabindex ?? attrs.tabIndex ?? 0,
    "aria-label":
      attrs["aria-label"] ??
      (ariaLabelledBy !== undefined ? undefined : t("codeBlock.label")),
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": attrs["aria-describedby"],
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
</script>

<template>
  <pre
    v-if="!copyable"
    ref="pre"
    :class="styles.codeBlock"
    :style="boxStyle"
    v-bind="{
      ...regionAttrs,
      ...otherAttrs,
      ...hooks('code-block', 'region'),
    }"
  ><code v-bind="hooks('code-block', 'code')"><template v-if="code !== undefined">{{ code }}</template><slot v-else-if="slots.default" /></code></pre>
  <div
    v-else
    v-bind="{ ...otherAttrs, ...hooks('code-block', 'root') }"
    :class="styles.root"
    :style="boxStyle"
  >
    <pre
      ref="pre"
      v-bind="{ ...regionAttrs, ...hooks('code-block', 'region') }"
      :class="[styles.codeBlock, styles.copyable]"
    ><code v-bind="hooks('code-block', 'code')"><template v-if="code !== undefined">{{ code }}</template><slot v-else-if="slots.default" /></code></pre>
    <div :class="styles.actions">
      <IconButton
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
    <span :class="styles.visuallyHidden" aria-live="polite">{{
      statusText
    }}</span>
  </div>
</template>
