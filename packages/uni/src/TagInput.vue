<script setup lang="ts">
import { useI18n } from "./i18n";
const { t } = useI18n();
import { computed, ref, watch } from "vue";
import { DEFAULT_TAG_SEPARATORS, splitBySeparators } from "@minerva/core";
import { inheritForm } from "./form-context";
const rawProps = withDefaults(
  defineProps<{
    value?: readonly string[];
    modelValue?: readonly string[];
    defaultValue?: readonly string[];
    options?: readonly string[];
    separators?: readonly string[];
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
    required?: boolean;
    placeholder?: string;
    id?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    name?: string;
    size?: "small" | "medium" | "large";
    maxTags?: number;
    commitOnBlur?: boolean;
    emptyText?: string;
    addLabel?: string;
    clearLabel?: string;
    removeLabel?: (tag: string) => string;
    createLabel?: (tag: string) => string;
  }>(),
  {
    defaultValue: () => [],
    options: () => [],
    separators: () => [...DEFAULT_TAG_SEPARATORS],
    maxTags: Infinity,
    commitOnBlur: true,
    size: "medium",
  },
);
const props = inheritForm(rawProps);
const emit = defineEmits<{
  change: [value: string[]];
  "update:modelValue": [value: string[]];
}>();
const local = ref([...props.defaultValue]);
const tags = computed(() => props.modelValue ?? props.value ?? local.value);
const draft = ref(""),
  open = ref(false),
  composing = ref(false),
  navigating = ref(false),
  active = ref(0);
const internalAction = ref(false);
const locked = computed(() => props.disabled || props.readOnly);
const splitters = computed(() =>
  props.separators.filter((s) => s !== "Enter" && s !== ""),
);
const enterCommits = computed(() => props.separators.includes("Enter"));
const suggestions = computed(() => {
  const candidates = [
    ...new Set(props.options.map((o) => o.trim()).filter(Boolean)),
  ].filter((o) => !tags.value.includes(o));
  const result = candidates.map((tag) => ({ tag, label: tag }));
  const trimmed = draft.value.trim();
  if (trimmed && !tags.value.includes(trimmed) && !candidates.includes(trimmed))
    result.unshift({
      tag: trimmed,
      label:
        props.createLabel?.(trimmed) ?? t("tagInput.create", { tag: trimmed }),
    });
  return result.filter((o) =>
    o.tag.toLowerCase().includes(trimmed.toLowerCase()),
  );
});
watch(suggestions, () => {
  active.value = 0;
});
watch(locked, (value) => {
  if (value) open.value = false;
});
function change(value: string[]) {
  if (locked.value) return;
  if (props.value === undefined && props.modelValue === undefined)
    local.value = value;
  emit("change", value);
  emit("update:modelValue", value);
}
function commit(texts: readonly string[], nextDraft = "") {
  if (locked.value || composing.value) return;
  const next = [...tags.value];
  for (const text of texts) {
    const tag = text.trim();
    if (tag && !next.includes(tag) && next.length < props.maxTags)
      next.push(tag);
  }
  if (next.length !== tags.value.length) change(next);
  draft.value = nextDraft;
  navigating.value = false;
}
function type(event: any) {
  if (locked.value) return;
  const value = String(event.detail?.value ?? event.target?.value ?? "");
  const parts = composing.value
    ? [value]
    : splitBySeparators(value, splitters.value);
  if (parts.length > 1) commit(parts.slice(0, -1), parts.at(-1));
  else draft.value = value;
  navigating.value = false;
  open.value = true;
}
function select(tag: string) {
  if (locked.value || composing.value) return;
  commit([tag]);
  open.value = false;
}
function confirm() {
  if (locked.value || composing.value) return;
  if (!enterCommits.value) {
    if (navigating.value && open.value && suggestions.value[active.value])
      select(suggestions.value[active.value].tag);
    return;
  }
  if (
    !navigating.value &&
    (!draft.value.trim() || tags.value.includes(draft.value.trim()))
  )
    commit([draft.value]);
  else if (open.value && suggestions.value[active.value])
    select(suggestions.value[active.value].tag);
  else {
    commit([draft.value]);
    open.value = false;
  }
}
function paste(event: ClipboardEvent) {
  if (locked.value || composing.value) return;
  const text = event.clipboardData?.getData("text") ?? "";
  const separators = enterCommits.value
    ? [...splitters.value, "\r\n", "\n", "\r"]
    : splitters.value;
  if (!separators.some((s) => text.includes(s))) return;
  event.preventDefault();
  const element = event.target as HTMLInputElement;
  const start = element.selectionStart ?? draft.value.length,
    end = element.selectionEnd ?? draft.value.length;
  commit(
    splitBySeparators(
      draft.value.slice(0, start) + text + draft.value.slice(end),
      separators,
    ),
  );
  open.value = false;
}
function keydown(event: KeyboardEvent) {
  if (
    locked.value ||
    composing.value ||
    event.isComposing ||
    event.keyCode === 229
  )
    return;
  if (event.key === "Enter") {
    event.preventDefault();
    confirm();
  } else if (event.key === "Escape") {
    event.preventDefault();
    draft.value = "";
    open.value = false;
    navigating.value = false;
  } else if (event.key === "Backspace" && !draft.value && tags.value.length) {
    event.preventDefault();
    change(tags.value.slice(0, -1));
  } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    open.value = true;
    navigating.value = true;
    const count = suggestions.value.length;
    if (count)
      active.value =
        (active.value + (event.key === "ArrowDown" ? 1 : -1) + count) % count;
  }
}
function blur() {
  open.value = false;
  if (props.commitOnBlur && !internalAction.value) commit([draft.value]);
}
function clear() {
  internalAction.value = false;
  if (locked.value) return;
  draft.value = "";
  if (tags.value.length) change([]);
}
function focus() {
  internalAction.value = false;
  if (!locked.value) open.value = true;
}
function add() {
  internalAction.value = false;
  commit([draft.value]);
}
function remove(index: number) {
  internalAction.value = false;
  change(tags.value.filter((_, i) => i !== index));
}
</script>
<template>
  <view
    class="mn-tag-input"
    :class="[{ 'mn-invalid': props.invalid, 'mn-disabled': props.disabled }]"
    :data-readonly="props.readOnly || undefined"
  >
    <view
      v-for="(tag, index) in tags"
      :key="`${index}-${tag}`"
      data-tag
      class="mn-tag"
      ><text>{{ tag }}</text
      ><button
        v-if="!props.readOnly"
        class="mn-close"
        :disabled="props.disabled"
        :aria-label="removeLabel?.(tag) ?? t('tagInput.remove', { tag })"
        @touchstart="internalAction = true"
        @touchcancel="internalAction = false"
        @mousedown.prevent
        @tap="remove(index)"
      >
        ×
      </button></view
    >
    <view class="mn-select" style="flex: 1; min-width: 120px">
      <input
        :id="id"
        class="mn-input"
        :class="[`mn-size-${size}`, { 'mn-invalid': props.invalid }]"
        :maxlength="-1"
        :aria-label="rawProps.ariaLabel"
        :aria-labelledby="rawProps.ariaLabelledby"
        :aria-describedby="rawProps.ariaDescribedby"
        :value="draft"
        :disabled="locked"
        :placeholder="placeholder"
        :aria-invalid="props.invalid"
        :aria-required="props.required"
        role="combobox"
        :aria-expanded="open && !locked"
        @input="type"
        @confirm="confirm"
        @focus="focus"
        @tap="focus"
        @blur="blur"
        @keydown="keydown"
        @paste="paste"
        @compositionstart="composing = true"
        @compositionend="composing = false"
      />
      <view v-if="open && !locked" class="mn-popup" role="listbox">
        <text v-if="!suggestions.length">{{
          emptyText ?? t("tagInput.empty")
        }}</text>
        <button
          v-for="(suggestion, index) in suggestions"
          :key="suggestion.tag"
          class="mn-option"
          :class="{ 'mn-active': index === active }"
          :aria-selected="index === active"
          role="option"
          @mousedown.prevent="select(suggestion.tag)"
          @touchstart.stop.prevent="select(suggestion.tag)"
          @tap="select(suggestion.tag)"
        >
          {{ suggestion.label }}
        </button>
      </view>
    </view>
    <template v-if="!props.readOnly">
      <button
        class="mn-button"
        :disabled="
          props.disabled ||
          !draft.trim() ||
          tags.includes(draft.trim()) ||
          tags.length >= maxTags
        "
        :aria-label="addLabel ?? t('tagInput.add')"
        @touchstart="internalAction = true"
        @touchcancel="internalAction = false"
        @mousedown.prevent
        @tap="add"
      >
        {{ addLabel ?? t("tagInput.add") }}
      </button>
      <button
        class="mn-close"
        :disabled="props.disabled || !tags.length"
        :aria-label="clearLabel ?? t('tagInput.clear')"
        @touchstart="internalAction = true"
        @touchcancel="internalAction = false"
        @mousedown.prevent
        @tap="clear"
      >
        ×
      </button>
    </template>
  </view>
</template>
