<script setup lang="ts">
import H5FileInput from "./H5FileInput";
const h5 = typeof document !== "undefined";
const browserInput = ref<{ choose: () => void }>();
import { computed, ref, getCurrentInstance, watch, nextTick } from "vue";
import { useNativeId as useId } from "./native-id";
import { matchesAccept } from "@minerva/core";
import { useI18n } from "./i18n";
import Alert from "./Alert.vue";
import ProgressIndicator from "./ProgressIndicator.vue";
interface Item {
  id: string;
  name: string;
  status?: string;
  error?: string;
  previewUrl?: string;
  url?: string;
  progress?: number;
}
interface NativeFile {
  name?: string;
  path?: string;
  tempFilePath?: string;
  size?: number;
  type?: string;
  mimeType?: string;
  [key: string]: unknown;
}
interface Labels {
  select?: string;
  uploading?: string;
  done?: string;
  failed?: string;
  tooMany?: (max: number) => string;
  invalidType?: (name: string) => string;
  tooLarge?: (name: string) => string;
  retry?: (name: string) => string;
  remove?: (name: string) => string;
}
const props = withDefaults(
  defineProps<{
    label?: string;
    value?: Item[];
    disabled?: boolean;
    loading?: boolean;
    maxCount?: number;
    maxSize?: number;
    accept?: string;
    multiple?: boolean;
    replace?: boolean;
    labels?: Labels;
  }>(),
  { value: () => [], accept: "*", labels: () => ({}) },
);
const { t } = useI18n();
const emit = defineEmits<{
  filesSelected: [files: NativeFile[]];
  select: [files: NativeFile[]];
  change: [items: Item[]];
  remove: [item: Item];
  retry: [item: Item];
  error: [error: unknown];
}>();
const instance = getCurrentInstance();
const hasRemove = computed(() => !!instance?.vnode.props?.onRemove),
  hasRetry = computed(() => !!instance?.vnode.props?.onRetry);
const count = computed(() => props.maxCount ?? (props.multiple ? 50 : 1)),
  existing = computed(() =>
    props.replace && !props.multiple ? 0 : props.value.length,
  ),
  blocked = computed(
    () => props.disabled || props.loading || existing.value >= count.value,
  );
const error = ref<{
  key: "tooMany" | "invalidType" | "tooLarge";
  name?: string;
} | null>(null);
const hostError = ref("");
const message = computed(() => {
  const e = error.value;
  if (!e) return hostError.value;
  if (e.key === "tooMany")
    return (
      props.labels.tooMany?.(count.value) ??
      t("upload.tooMany", { count: count.value })
    );
  return (
    props.labels[e.key]?.(e.name ?? "") ??
    t(`upload.${e.key}`, { name: e.name })
  );
});
const selectButton = ref<any>();
const id = `mn-upload-${useId().replace(/[^a-z0-9]/gi, "")}`;
let pendingRemoval: string | undefined;
const mime: Record<string, string> = {
  pdf: "application/pdf",
  json: "application/json",
  txt: "text/plain",
  csv: "text/csv",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
  mp3: "audio/mpeg",
  wav: "audio/wav",
  zip: "application/zip",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};
const accepted = computed(() =>
  props.accept === "image"
    ? "image/*"
    : props.accept === "video"
      ? "video/*"
      : props.accept === "all"
        ? "*"
        : props.accept,
);
function fileName(file: NativeFile) {
  return (
    file.name ?? (file.path ?? file.tempFilePath)?.split("/").pop() ?? "file"
  );
}
function validType(file: NativeFile) {
  const name = fileName(file),
    type =
      file.mimeType ??
      (file.type?.includes("/") ? file.type : undefined) ??
      mime[name.split(".").pop()?.toLowerCase() ?? ""] ??
      "";
  return matchesAccept({ name, type }, accepted.value);
}
function select(files: NativeFile[]) {
  if (blocked.value || !files.length) return;
  hostError.value = "";
  if (
    (!props.multiple && files.length > 1) ||
    files.length + existing.value > count.value
  ) {
    error.value = { key: "tooMany" };
    return;
  }
  const invalid = files.find((file) => !validType(file));
  if (invalid) {
    error.value = { key: "invalidType", name: fileName(invalid) };
    return;
  }
  const oversized =
    props.maxSize === undefined
      ? undefined
      : files.find((file) => (file.size ?? 0) > props.maxSize!);
  if (oversized) {
    error.value = { key: "tooLarge", name: fileName(oversized) };
    return;
  }
  error.value = null;
  emit("filesSelected", files);
  emit("select", files);
}
function fail(value: unknown) {
  if (
    String((value as { errMsg?: string })?.errMsg ?? value).includes("cancel")
  )
    return;
  hostError.value = String((value as { errMsg?: string })?.errMsg ?? value);
  emit("error", value);
}
function choose() {
  if (blocked.value) return;
  const success = (result: any) => select(result.tempFiles ?? []);
  const maximum = props.multiple
    ? Math.max(1, count.value - existing.value)
    : 1;
  const rules = accepted.value.split(",").map((rule) => rule.trim());
  const mediaOnly = rules.every(
    (rule) => rule.startsWith("image/") || rule.startsWith("video/"),
  );
  if (mediaOnly && typeof uni.chooseMedia === "function") {
    const types: Array<"image" | "video"> = [];
    if (rules.some((rule) => rule.startsWith("image/"))) types.push("image");
    if (rules.some((rule) => rule.startsWith("video/"))) types.push("video");
    uni.chooseMedia({
      count: Math.min(9, maximum),
      mediaType: types,
      success,
      fail,
    });
    return;
  }
  if (typeof uni.chooseFile === "function") {
    uni.chooseFile({
      count: maximum,
      type: "all",
      extension: rules
        .filter((rule) => rule.startsWith("."))
        .map((rule) => rule.slice(1)),
      success,
      fail,
    });
    return;
  }
  const wx = (globalThis as any).wx;
  if (typeof wx?.chooseMessageFile === "function") {
    wx.chooseMessageFile({
      count: Math.min(100, maximum),
      type: "all",
      success,
      fail,
    });
    return;
  }
  if (h5) {
    browserInput.value?.choose();
    return;
  }
  fail(new Error("This host does not expose a native document picker."));
}
function remove(item: Item) {
  if (props.disabled) return;
  pendingRemoval = item.id;
  emit("remove", item);
}
function retry(item: Item) {
  if (props.disabled || props.loading) return;
  emit("retry", item);
}
function status(item: Item) {
  if (item.status === "uploading")
    return props.labels.uploading ?? t("upload.uploading");
  if (item.status === "error")
    return item.error || props.labels.failed || t("upload.failed");
  return props.labels.done ?? t("upload.done");
}
watch(
  () => props.value,
  async (value) => {
    if (!pendingRemoval || value.some((item) => item.id === pendingRemoval))
      return;
    pendingRemoval = undefined;
    await nextTick();
    if (
      typeof document !== "undefined" &&
      document.activeElement === document.body
    )
      (selectButton.value?.$el ?? selectButton.value)?.focus?.();
  },
  { deep: true },
);
function drop(event: DragEvent) {
  event.preventDefault();
  if (event.dataTransfer)
    select(Array.from(event.dataTransfer.files) as unknown as NativeFile[]);
}
defineExpose({ selectFiles: select });
</script>
<template>
  <view
    class="mn-upload mn-uni-upload"
    role="group"
    :aria-labelledby="label ? `${id}-label` : undefined"
    :aria-busy="loading"
    @dragover.prevent
    @drop="drop"
    ><H5FileInput
      v-if="h5"
      ref="browserInput"
      :accept="accepted"
      :multiple="multiple"
      :disabled="blocked"
      :label="label ?? t('upload.select')"
      @files="select"
    /><text v-if="label" :id="`${id}-label`" class="mn-title">{{ label }}</text
    ><button
      ref="selectButton"
      class="mn-button mn-variant-outline mn-upload-select"
      :disabled="blocked"
      @tap="choose"
    >
      <ProgressIndicator v-if="loading" size="small" decorative /><slot
        name="select"
        >{{ labels.select ?? t("upload.select") }}</slot
      ></button
    ><Alert v-if="message" color="danger" :animation="false">{{
      message
    }}</Alert>
    <view v-for="item in value" :key="item.id" class="mn-upload-item"
      ><image
        v-if="item.previewUrl"
        :src="item.previewUrl"
        class="mn-uni-upload-preview"
        mode="aspectFill"
        aria-hidden="true" /><view class="mn-uni-upload-meta"
        ><text>{{ item.name }}</text
        ><text class="mn-muted">{{ status(item) }}</text
        ><ProgressIndicator
          v-if="item.status === 'uploading'"
          variant="bar"
          :value="item.progress"
          :aria-label="status(item)"
          full /></view
      ><button
        v-if="item.status === 'error' && hasRetry"
        class="mn-close"
        :aria-label="
          labels.retry?.(item.name) ?? t('upload.retry', { name: item.name })
        "
        :disabled="disabled || loading"
        @tap="retry(item)"
      >
        ↻</button
      ><button
        v-if="hasRemove"
        class="mn-close"
        :aria-label="
          labels.remove?.(item.name) ?? t('upload.remove', { name: item.name })
        "
        :disabled="disabled"
        @tap="remove(item)"
      >
        ×</button
      ><slot name="item" :item="item"
    /></view>
  </view>
</template>
