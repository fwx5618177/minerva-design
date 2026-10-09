<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  useId,
  watch,
} from "vue";
import type { editor, IDisposable } from "monaco-editor";
import styles from "@react-styles/components/MonacoCodeEditor/monacoCodeEditor.module.scss";
import { hooks, pickDataAttributes } from "../../internal/hooks";
import { useOptionalConfig } from "../../config/context";
import { useI18n } from "../../config/useI18n";
import { Button } from "../Button";
import { ProgressIndicator } from "../ProgressIndicator";
import type { MonacoCodeEditorProps } from "./types";

defineOptions({ name: "MonacoCodeEditor", inheritAttrs: false });
const props = withDefaults(defineProps<MonacoCodeEditorProps>(), {
  language: "plaintext",
  height: 420,
  minHeight: 160,
  maxHeight: 800,
  disabled: false,
  loadTimeout: 10000,
});
const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();
function update(value: string) {
  emit("update:modelValue", value);
  emit("change", value);
}
const attrs = useAttrs();
const config = useOptionalConfig();
const { t } = useI18n();
const id = useId();
const root = ref<HTMLElement>();
const host = ref<HTMLElement>();
const status = ref<"loading" | "ready" | "error">("loading");
const pageTheme = ref<"light" | "dark">("light");
const theme = computed(
  () => props.theme ?? config?.resolvedMode ?? pageTheme.value,
);
const positive = (n: number, fallback: number) =>
  Number.isFinite(n) && n > 0 ? n : fallback;
const height = computed(() => {
  const min = positive(props.minHeight, 160);
  return Math.min(
    Math.max(min, positive(props.maxHeight, 800)),
    Math.max(min, positive(props.height, 420)),
  );
});
let instance: editor.IStandaloneCodeEditor | undefined;
let subscription: IDisposable | undefined;
let observer: MutationObserver | undefined;
let timer: ReturnType<typeof setTimeout> | undefined;
let syncing = false;
let active = false;

function dispose() {
  clearTimeout(timer);
  subscription?.dispose();
  subscription = undefined;
  const model = instance?.getModel();
  instance?.dispose();
  instance = undefined;
  model?.dispose();
}
function fail() {
  dispose();
  if (active) status.value = "error";
}
function applyTheme() {
  if (instance) {
    try {
      props.monaco?.editor.setTheme(theme.value === "dark" ? "vs-dark" : "vs");
    } catch {
      fail();
    }
  }
}
function start() {
  if (!active || !host.value) return;
  dispose();
  status.value = "loading";
  if (!props.monaco) {
    timer = setTimeout(fail, positive(props.loadTimeout, 10000));
    return;
  }
  try {
    instance = props.monaco.editor.create(host.value, {
      value: props.modelValue,
      language: props.language,
      theme: theme.value === "dark" ? "vs-dark" : "vs",
      readOnly: props.disabled,
      domReadOnly: props.disabled,
      ariaLabel: props.label,
      automaticLayout: true,
      minimap: { enabled: false },
      wordWrap: "on",
      scrollBeyondLastLine: false,
    });
    subscription = instance.onDidChangeModelContent(() => {
      if (!syncing && !props.disabled && instance) update(instance.getValue());
    });
    host.value.querySelector("textarea")?.setAttribute("id", id);
    status.value = "ready";
    applyTheme();
  } catch {
    fail();
  }
}
watch(() => [props.monaco, props.loadTimeout], start, { flush: "post" });
watch(
  () => props.modelValue,
  (value) => {
    if (!instance || instance.getValue() === value) return;
    syncing = true;
    try {
      instance.setValue(value);
    } catch {
      fail();
    } finally {
      syncing = false;
    }
  },
);
watch(
  () => [props.language, props.disabled, props.label],
  () => {
    if (!instance) return;
    try {
      instance.updateOptions({
        readOnly: props.disabled,
        domReadOnly: props.disabled,
        ariaLabel: props.label,
      });
      const model = instance.getModel();
      if (model) props.monaco?.editor.setModelLanguage(model, props.language);
    } catch {
      fail();
    }
  },
);
watch(theme, applyTheme);
onMounted(() => {
  active = true;
  const readTheme = () => {
    pageTheme.value =
      root.value?.closest("[data-theme]")?.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
  };
  readTheme();
  observer = new MutationObserver(readTheme);
  observer.observe(root.value!.ownerDocument.documentElement, {
    attributes: true,
    subtree: true,
    attributeFilter: ["data-theme"],
  });
  start();
});
onBeforeUnmount(() => {
  active = false;
  observer?.disconnect();
  dispose();
});
function input(event: Event) {
  if (!props.disabled) update((event.target as HTMLTextAreaElement).value);
}
defineExpose({
  focus: () => {
    if (instance) instance.focus();
    else root.value?.querySelector("textarea")?.focus();
  },
  retry: async () => {
    await nextTick();
    start();
  },
});
</script>

<template>
  <div
    ref="root"
    v-bind="{
      ...pickDataAttributes(attrs),
      ...hooks('code-editor', 'root', {
        disabled,
        loading: status === 'loading',
      }),
    }"
    :class="[styles.root, attrs.class]"
    :style="attrs.style"
    role="group"
    :aria-label="label"
  >
    <label
      :for="id"
      :class="styles.label"
      v-bind="hooks('code-editor', 'label')"
      @click="instance?.focus()"
      >{{ label }}</label
    >
    <div
      :class="styles.surface"
      :style="{ height: `${height}px` }"
      :aria-busy="status === 'loading'"
      v-bind="hooks('code-editor', 'surface')"
    >
      <div
        ref="host"
        v-show="status !== 'error'"
        style="height: 100%; width: 100%"
      />
      <div
        v-if="status === 'loading'"
        :class="styles.loading"
        role="status"
        v-bind="hooks('code-editor', 'loading')"
      >
        <ProgressIndicator
          size="small"
          :aria-label="loadingLabel ?? t('monacoCodeEditor.loading')"
        />
      </div>
      <template v-if="status === 'error'">
        <div :class="styles.error" v-bind="hooks('code-editor', 'error')">
          <div :class="styles.message" role="alert">
            {{ unavailableText ?? t("monacoCodeEditor.unavailable") }}
          </div>
          <Button
            color="neutral"
            variant="outline"
            size="small"
            :aria-label="retryLabel ?? t('monacoCodeEditor.retryLabel')"
            @click="start"
            >{{ retryText ?? t("monacoCodeEditor.retry") }}</Button
          >
        </div>
        <textarea
          :id="id"
          :class="styles.fallback"
          :aria-label="label"
          :value="modelValue"
          :disabled="disabled"
          :spellcheck="false"
          v-bind="hooks('code-editor', 'fallback')"
          @input="input"
        />
      </template>
    </div>
  </div>
</template>
