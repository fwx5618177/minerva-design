<script setup lang="ts">
/**
 * Upload: file selection (button or drag and drop) with validation and a
 * list of files with their transfer state.
 *
 * Presentation only: validated files are emitted with `filesSelected`; the
 * caller owns the transfer, cancellation and persisted URLs, reflected back
 * through `v-model` (or `:model-value`). A remove button is shown when a
 * `remove` (or `update:modelValue`) listener is bound, a retry button on
 * failed files when a `retry` listener is bound.
 */
import {
  computed,
  getCurrentInstance,
  ref,
  useAttrs,
  useId,
  watch,
  type ComponentPublicInstance,
} from "vue";
import { matchesAccept } from "@minerva/core";
import styles from "@react-styles/components/Upload/upload.module.scss";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import { IconRotateCw, IconUpload, IconX } from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import { Alert } from "../Alert";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import type { UploadItem, UploadProps } from "./types";

defineOptions({ name: "Upload", inheritAttrs: false });

const props = withDefaults(defineProps<UploadProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  accept: "*",
  multiple: false,
  replace: false,
  maxCount: undefined,
  maxSize: undefined,
  loading: false,
  disabled: false,
  labels: undefined,
});

const emit = defineEmits<{
  /** The list without a removed file (v-model) */
  "update:modelValue": [value: UploadItem[]];
  /**
   * The selected (or dropped) files once they pass accept, maxSize and
   * maxCount. Transfer, cancellation and persisted URLs belong to the caller
   */
  filesSelected: [files: File[]];
  /** Remove a file (shows a remove button on every item) */
  remove: [item: UploadItem];
  /** Retry a failed file (shows a retry button on failed items) */
  retry: [item: UploadItem];
}>();

defineSlots<{
  /** Content of the select button (the `labels.select` text) */
  select?: () => unknown;
}>();

const attrs = useAttrs();
const instance = getCurrentInstance();
const { t } = useI18n();
const id = useId();
const labelId = `${id}-label`;

const value = useControllable<UploadItem[]>(props, "modelValue", {
  defaultProp: "defaultValue",
  fallback: [],
  name: "Upload",
});

/** Whether a listener of `event` is bound (React: whether the callback is set) */
const listens = (event: string) => {
  const vnodeProps = instance?.vnode.props;
  return !!vnodeProps?.[event];
};
const canRemove = () => listens("onRemove") || listens("onUpdate:modelValue");
const canRetry = () => listens("onRetry");

const input = ref<HTMLInputElement | null>(null);
const selectButton = ref<ComponentPublicInstance | null>(null);
const removeButtons = new Map<string, HTMLElement>();
const trackRemove =
  (itemId: string) => (target: Element | ComponentPublicInstance | null) => {
    const el = (target as ComponentPublicInstance | null)?.$el as
      HTMLElement | undefined;
    if (el) removeButtons.set(itemId, el);
    else removeButtons.delete(itemId);
  };

// The parent removes the item (possibly later); the focused remove button
// then unmounts and focus would fall to <body>. Move it to the next item's
// remove button (else the select button) once the item is gone.
let pendingRemoval: { id: string; nextId?: string } | null = null;
watch(
  value,
  (list) => {
    const pending = pendingRemoval;
    if (!pending || list.some((item) => item.id === pending.id)) return;
    pendingRemoval = null;
    const active = document.activeElement;
    if (active && active !== document.body) return; // focus moved on: keep it
    const next = pending.nextId && removeButtons.get(pending.nextId);
    (next || (selectButton.value?.$el as HTMLElement | undefined))?.focus();
  },
  { flush: "post" },
);

const error = ref("");
const dragging = ref(false);

const maxCount = computed(() => props.maxCount ?? (props.multiple ? 50 : 1));
const existingCount = computed(() =>
  props.replace && !props.multiple ? 0 : value.value.length,
);
const blocked = computed(
  () =>
    props.disabled || props.loading || existingCount.value >= maxCount.value,
);

function select(files: File[]) {
  if (blocked.value || files.length === 0) return;
  const labels = props.labels;
  if (
    (!props.multiple && files.length > 1) ||
    files.length + existingCount.value > maxCount.value
  ) {
    error.value =
      labels?.tooMany?.(maxCount.value) ??
      t("upload.tooMany", { count: maxCount.value });
    return;
  }
  const invalid = files.find((file) => !matchesAccept(file, props.accept));
  if (invalid) {
    error.value =
      labels?.invalidType?.(invalid.name) ??
      t("upload.invalidType", { name: invalid.name });
    return;
  }
  const maxSize = props.maxSize;
  const oversized =
    maxSize === undefined
      ? undefined
      : files.find((file) => file.size > maxSize);
  if (oversized) {
    error.value =
      labels?.tooLarge?.(oversized.name) ??
      t("upload.tooLarge", { name: oversized.name });
    return;
  }
  error.value = "";
  emit("filesSelected", files);
}

const statusText = (item: UploadItem) =>
  item.status === "uploading"
    ? (props.labels?.uploading ?? t("upload.uploading"))
    : item.status === "error"
      ? item.error || (props.labels?.failed ?? t("upload.failed"))
      : (props.labels?.done ?? t("upload.done"));

function onDragOver(event: DragEvent) {
  event.preventDefault();
  if (!blocked.value) dragging.value = true;
}
function onDragLeave(event: DragEvent) {
  const zone = event.currentTarget as HTMLElement;
  if (!zone.contains(event.relatedTarget as Node | null)) {
    dragging.value = false;
  }
}
function onDrop(event: DragEvent) {
  event.preventDefault();
  dragging.value = false;
  select(Array.from(event.dataTransfer?.files ?? []));
}
function onChange(event: Event) {
  const field = event.currentTarget as HTMLInputElement;
  const files = Array.from(field.files ?? []);
  // allow selecting the same file again
  field.value = "";
  select(files);
}

function onRemove(item: UploadItem) {
  const list = value.value;
  const index = list.indexOf(item);
  const neighbour = list[index + 1] ?? list[index - 1];
  pendingRemoval = { id: item.id, nextId: neighbour?.id };
  value.value = list.filter((entry) => entry.id !== item.id);
  emit("remove", item);
}

const isDragging = computed(() => dragging.value && !blocked.value);
const rootAttrs = computed(() => ({
  ...attrs,
  role: "group",
  "aria-labelledby": labelId,
  "aria-busy": props.loading,
  ...hooks("upload", "root", {
    disabled: props.disabled,
    loading: props.loading,
    dragging: isDragging.value,
  }),
}));
</script>

<template>
  <div :class="styles.upload" v-bind="rootAttrs">
    <span :id="labelId" :class="styles.label" v-bind="hooks('upload', 'label')">
      {{ label }}
    </span>
    <!-- Drop target only: the keyboard path is the select button inside -->
    <div
      :class="[styles.dropzone, isDragging && styles.dragging]"
      v-bind="hooks('upload', 'dropzone')"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <Button
        ref="selectButton"
        type="button"
        variant="outline"
        :disabled="blocked"
        :loading="loading"
        @click="input?.click()"
      >
        <template #start-icon><IconUpload aria-hidden="true" /></template>
        <slot name="select">{{ labels?.select ?? t("upload.select") }}</slot>
      </Button>
      <!-- Never a tab stop (even if [hidden] is restyled): the select button
           is the keyboard path to the picker. -->
      <input
        ref="input"
        type="file"
        hidden
        tabindex="-1"
        :aria-label="label"
        :disabled="blocked"
        :accept="accept"
        :multiple="multiple"
        @change="onChange"
      />
    </div>
    <Alert v-if="error" color="danger" :animation="false" :class="styles.error">
      {{ error }}
    </Alert>
    <ul
      v-if="value.length > 0"
      :class="styles.list"
      v-bind="hooks('upload', 'list')"
    >
      <li
        v-for="item in value"
        :key="item.id"
        :class="styles.item"
        v-bind="hooks('upload', 'item', { status: item.status })"
      >
        <img
          v-if="item.previewUrl"
          :src="item.previewUrl"
          alt=""
          :class="styles.preview"
        />
        <div :class="styles.info">
          <span>{{ item.name }}</span>
          <span
            :role="item.status === 'error' ? 'alert' : 'status'"
            :class="[
              styles.status,
              item.status === 'error' && styles.statusError,
            ]"
          >
            {{ statusText(item) }}
          </span>
        </div>
        <div :class="styles.actions">
          <IconButton
            v-if="item.status === 'error' && canRetry()"
            :label="
              labels?.retry?.(item.name) ??
              t('upload.retry', { name: item.name })
            "
            size="small"
            shape="square"
            :disabled="disabled || loading"
            @click="emit('retry', item)"
          >
            <IconRotateCw aria-hidden="true" />
          </IconButton>
          <IconButton
            v-if="canRemove()"
            :ref="trackRemove(item.id)"
            :label="
              labels?.remove?.(item.name) ??
              t('upload.remove', { name: item.name })
            "
            size="small"
            shape="square"
            :disabled="disabled"
            @click="onRemove(item)"
          >
            <IconX aria-hidden="true" />
          </IconButton>
        </div>
      </li>
    </ul>
  </div>
</template>
