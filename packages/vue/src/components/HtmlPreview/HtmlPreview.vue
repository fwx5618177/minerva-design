<script setup lang="ts">
/**
 * HtmlPreview: previews untrusted HTML (e.g. an email template) in a fully
 * sandboxed iframe. The markup is sanitized with DOMPurify (fail-closed) and
 * rendered behind a Content-Security-Policy that blocks scripts and network
 * access; only inline styles and data: images are allowed.
 */
import { computed, onMounted, ref, useAttrs, watch } from "vue";
import styles from "@react-styles/components/HtmlPreview/htmlPreview.module.scss";
import { hooks, pickDataAttributes } from "../../internal/hooks";
import { previewDocument } from "./previewDocument";
import type { HtmlPreviewProps } from "./types";

defineOptions({ name: "HtmlPreview", inheritAttrs: false });

const props = withDefaults(defineProps<HtmlPreviewProps>(), {
  viewport: "desktop",
  mobileWidth: 375,
  height: 600,
});

const attrs = useAttrs();

// Deliberately two-phase: the server and the hydration render both use the
// empty shell (DOMPurify only runs in the browser and hydration must match);
// once mounted the HTML is sanitized and the iframe replaced.
const doc = ref(previewDocument());
onMounted(() => {
  doc.value = previewDocument(props.html);
  watch(
    () => props.html,
    (html) => {
      doc.value = previewDocument(html);
    },
  );
});

const frameStyle = computed(() => {
  const width =
    Number.isFinite(props.mobileWidth) && props.mobileWidth > 0
      ? props.mobileWidth
      : 375;
  const height =
    Number.isFinite(props.height) && props.height > 0 ? props.height : 600;
  return {
    width: props.viewport === "mobile" ? `${width}px` : "100%",
    height: `${height}px`,
  };
});
const rootAttrs = computed(() => ({
  ...pickDataAttributes(attrs),
  class: [styles.preview, attrs.class],
  style: attrs.style,
  ...hooks("html-preview", "root"),
}));
</script>

<template>
  <div v-bind="rootAttrs">
    <!-- A new key replaces the browsing context, so an initial empty srcdoc
         can never finish loading after the real document. -->
    <iframe
      :key="doc"
      :title="title"
      sandbox=""
      referrerpolicy="no-referrer"
      :srcdoc="doc"
      :class="styles.frame"
      v-bind="hooks('html-preview', 'frame')"
      :style="frameStyle"
    />
  </div>
</template>
