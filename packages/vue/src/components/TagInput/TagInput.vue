<script setup lang="ts">
/**
 * TagInput: free-form tags with suggestions. Enter / the add button / blur
 * add the trimmed draft; typed or pasted `separators` split text into tags;
 * arrow keys pick a suggestion; Escape discards the draft; Backspace in an
 * empty draft removes the last tag. IME composition never commits. The tags
 * are the `v-model` (or `defaultValue`). FormControl-aware.
 */
import { computed, ref, useAttrs, useId, watch } from "vue";
import { DEFAULT_TAG_SEPARATORS, splitBySeparators } from "@minerva/core";
import styles from "@react-styles/components/TagInput/tagInput.module.scss";
import { hooks } from "../../internal/hooks";
import { IconPlus, IconX } from "../../internal/icons";
import { useControllable } from "../../internal/controllable";
import { unrefElement } from "../../internal/Slot";
import { useFormControlContext } from "../../internal/form-control";
import { useI18n } from "../../config/useI18n";
import { IconButton } from "../IconButton";
import { Input } from "../Input";
import { Tag } from "../Tag";
import type { TagInputProps } from "./types";

defineOptions({ name: "TagInput", inheritAttrs: false });

const ENTER = "Enter";
const LINE_BREAKS = ["\r\n", "\n", "\r"];

interface Suggestion {
  /** The tag added when selected */
  tag: string;
  label: string;
  /** Text matched against the draft */
  filterValue: string;
}

const props = withDefaults(defineProps<TagInputProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  options: () => [],
  commitOnBlur: true,
  separators: () => DEFAULT_TAG_SEPARATORS,
  id: undefined,
  name: undefined,
  placeholder: undefined,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
  disabled: false,
  readOnly: false,
  invalid: false,
  size: "medium",
  emptyText: undefined,
  addLabel: undefined,
  clearLabel: undefined,
  removeLabel: undefined,
  createLabel: undefined,
});
const emit = defineEmits<{
  "update:modelValue": [value: string[]];
  /** The next tags after an addition, a removal or clearing */
  change: [value: string[]];
}>();

const attrs = useAttrs();
const { t } = useI18n();
const field = useFormControlContext();
const disabled = computed(() => props.disabled || !!field?.disabled.value);
const readOnly = computed(() => props.readOnly || !!field?.readOnly.value);
const blocked = computed(() => disabled.value || readOnly.value);
const inputComponent = ref<unknown>(null);
const inputEl = (): HTMLInputElement | null =>
  unrefElement(inputComponent.value)?.querySelector("input") ?? null;
let composing = false;
// An explicit arrow-key choice wins over "Enter adds the draft".
let navigating = false;
const listId = useId();

const tags = useControllable<readonly string[]>(props, "modelValue", {
  defaultProp: "defaultValue",
  fallback: [],
  name: "TagInput",
  onChange: (value) => emit("change", value as string[]),
});
const setTags = (next: string[]) => {
  tags.value = next;
};
const draft = ref("");
const requestedOpen = ref(false);
const highlight = ref(0);
const open = computed(() => requestedOpen.value && !blocked.value);
const trimmed = computed(() => draft.value.trim());

const filtered = computed<Suggestion[]>(() => {
  const current = tags.value;
  const candidates = [
    ...new Set(props.options.map((option) => option.trim()).filter(Boolean)),
  ].filter((option) => !current.includes(option));
  const suggestions: Suggestion[] = candidates.map((tag) => ({
    tag,
    label: tag,
    filterValue: tag,
  }));
  const typed = trimmed.value;
  if (typed && !current.includes(typed) && !candidates.includes(typed)) {
    suggestions.unshift({
      tag: typed,
      label: props.createLabel
        ? props.createLabel(typed)
        : t("tagInput.create", { tag: typed }),
      filterValue: typed,
    });
  }
  const query = typed.toLowerCase();
  return query
    ? suggestions.filter((s) => s.filterValue.toLowerCase().includes(query))
    : suggestions;
});

// Reset the highlight when the list changes.
watch(
  () => `${filtered.value.length}\u0000${draft.value}`,
  () => {
    highlight.value = 0;
  },
  { flush: "sync" },
);

const enterCommits = computed(() => props.separators.includes(ENTER));
// Literal separators: typing one commits the text before it.
const splitters = computed(() =>
  props.separators.filter((sep) => sep !== ENTER && sep !== ""),
);
// Pasted text also splits on line breaks when Enter commits.
const pasteSplitters = computed(() =>
  enterCommits.value ? [...splitters.value, ...LINE_BREAKS] : splitters.value,
);

/** Adds every (trimmed, non-empty, new) text as a tag in one update. */
function commitAll(texts: readonly string[], nextDraft = "") {
  if (blocked.value || composing) return;
  const next = [...tags.value];
  for (const text of texts) {
    const tag = text.trim();
    if (tag && !next.includes(tag)) next.push(tag);
  }
  if (next.length !== tags.value.length) setTags(next);
  navigating = false;
  draft.value = nextDraft;
}

const commit = (text: string) => commitAll([text]);

function select(suggestion: Suggestion) {
  commit(suggestion.tag);
  requestedOpen.value = false;
}

function onDraftInput(value: string | number) {
  if (blocked.value) return;
  navigating = false;
  const text = String(value);
  const parts =
    composing || splitters.value.length === 0
      ? [text]
      : splitBySeparators(text, splitters.value);
  if (parts.length > 1) {
    // Typed a separator: commit what precedes it, keep the rest.
    commitAll(parts.slice(0, -1), parts[parts.length - 1]);
  } else {
    draft.value = text;
  }
  requestedOpen.value = true;
}

function onPaste(event: ClipboardEvent) {
  if (blocked.value || composing) return;
  const pasted = event.clipboardData?.getData("text") ?? "";
  if (!pasteSplitters.value.some((sep) => pasted.includes(sep))) return;
  event.preventDefault();
  const el = event.currentTarget as HTMLInputElement;
  const start = el.selectionStart ?? draft.value.length;
  const end = el.selectionEnd ?? draft.value.length;
  const text = draft.value.slice(0, start) + pasted + draft.value.slice(end);
  commitAll(splitBySeparators(text, pasteSplitters.value));
  requestedOpen.value = false;
}

function onKeyDown(event: KeyboardEvent) {
  if (
    blocked.value ||
    composing ||
    event.isComposing ||
    event.keyCode === 229
  ) {
    return;
  }
  const list = filtered.value;
  const count = list.length;
  switch (event.key) {
    case "ArrowDown":
    case "ArrowUp":
      event.preventDefault();
      navigating = true;
      requestedOpen.value = true;
      if (count > 0) {
        const delta = event.key === "ArrowDown" ? 1 : -1;
        highlight.value = (highlight.value + delta + count) % count;
      }
      break;
    case "Enter":
      // Never submit the enclosing form from the tag field.
      event.preventDefault();
      if (!enterCommits.value) {
        // Enter only picks an explicitly highlighted suggestion.
        if (navigating && open.value && list[highlight.value]) {
          select(list[highlight.value]);
        }
      } else if (
        !navigating &&
        (!trimmed.value || tags.value.includes(trimmed.value))
      ) {
        commit(draft.value);
      } else if (open.value && list[highlight.value]) {
        select(list[highlight.value]);
      } else {
        commit(draft.value);
        requestedOpen.value = false;
      }
      break;
    case "Escape":
      navigating = false;
      draft.value = "";
      if (open.value) {
        event.preventDefault();
        requestedOpen.value = false;
      }
      break;
    case "Backspace":
      // Keyboard removal of the last tag (common tag-field convention):
      // only from an empty draft, so normal text editing is unaffected.
      if (draft.value === "" && tags.value.length > 0) {
        event.preventDefault();
        setTags(tags.value.slice(0, -1));
      }
      break;
  }
}

function setComposing(value: boolean) {
  composing = value;
}

function onFocusOrClick() {
  if (!blocked.value) requestedOpen.value = true;
}

function onBlur() {
  requestedOpen.value = false;
  if (props.commitOnBlur) commit(draft.value);
}

function removeAt(index: number) {
  if (blocked.value) return;
  setTags(tags.value.filter((_, position) => position !== index));
  inputEl()?.focus();
}

function onAdd() {
  commit(draft.value);
  inputEl()?.focus();
}

function onClear() {
  draft.value = "";
  setTags([]);
  inputEl()?.focus();
}

const removeText = (tag: string) =>
  props.removeLabel ? props.removeLabel(tag) : t("tagInput.remove", { tag });
const optionId = (index: number) => `${listId}-option-${index}`;
const activeOption = computed(() =>
  open.value ? filtered.value[highlight.value] : undefined,
);

const rootAttrs = computed(() => ({
  ...attrs,
  class: [styles.root, attrs.class],
  ...hooks("tag-input", "root", {
    state: open.value ? "open" : "closed",
    disabled: disabled.value,
    invalid: props.invalid || !!field?.invalid.value,
    readonly: readOnly.value,
    required: !!field?.required.value,
    size: props.size,
  }),
}));

defineExpose({
  /** The text `<input>` (the React `ref`) */
  input: computed(inputEl),
  focus: () => inputEl()?.focus(),
});
</script>

<template>
  <div v-bind="rootAttrs">
    <div
      v-if="tags.length > 0"
      :class="styles.values"
      v-bind="hooks('tag-input', 'tags')"
    >
      <Tag
        v-for="(tag, index) in tags"
        :key="`${index}-${tag}`"
        :class="styles.tag"
        size="large"
        :disabled="disabled"
        :closable="!readOnly"
        :close-label="removeText(tag)"
        @close="removeAt(index)"
      >
        <span :class="styles.label">{{ tag }}</span>
      </Tag>
    </div>
    <div :class="styles.entry">
      <div :class="styles.combobox">
        <Input
          ref="inputComponent"
          :id="id"
          :size="size"
          :invalid="invalid"
          type="text"
          role="combobox"
          :aria-label="ariaLabel"
          :aria-labelledby="ariaLabelledby"
          :aria-describedby="ariaDescribedby"
          :aria-expanded="String(open)"
          :aria-controls="open ? listId : undefined"
          aria-autocomplete="list"
          :aria-activedescendant="
            activeOption ? optionId(highlight) : undefined
          "
          autocomplete="off"
          spellcheck="false"
          :placeholder="placeholder"
          :model-value="draft"
          :disabled="disabled"
          :read-only="readOnly"
          @update:model-value="onDraftInput"
          @focus="onFocusOrClick"
          @click="onFocusOrClick"
          @blur="onBlur"
          @compositionstart="setComposing(true)"
          @compositionend="setComposing(false)"
          @keydown="onKeyDown"
          @paste="onPaste"
        />
        <ul
          v-if="open"
          :id="listId"
          role="listbox"
          :aria-label="ariaLabel"
          :aria-labelledby="ariaLabelledby"
          :class="styles.list"
          v-bind="hooks('tag-input', 'list')"
        >
          <li
            v-if="filtered.length === 0"
            :class="styles.empty"
            role="presentation"
            v-bind="hooks('tag-input', 'empty')"
          >
            {{ emptyText ?? t("tagInput.empty") }}
          </li>
          <li
            v-for="(suggestion, index) in filtered"
            :id="optionId(index)"
            :key="`${suggestion.label}-${suggestion.tag}`"
            role="option"
            :aria-selected="index === highlight"
            tabindex="-1"
            :class="styles.option"
            v-bind="
              hooks('tag-input', 'option', {
                highlighted: index === highlight,
              })
            "
            @mousedown.prevent="select(suggestion)"
            @mouseenter="highlight = index"
          >
            {{ suggestion.label }}
          </li>
        </ul>
      </div>
      <template v-if="!readOnly">
        <IconButton
          :label="addLabel ?? t('tagInput.add')"
          shape="square"
          :disabled="disabled || !trimmed || tags.includes(trimmed)"
          @mousedown.prevent
          @click="onAdd"
        >
          <IconPlus aria-hidden="true" />
        </IconButton>
        <IconButton
          :label="clearLabel ?? t('tagInput.clear')"
          shape="square"
          :disabled="disabled || tags.length === 0"
          @mousedown.prevent
          @click="onClear"
        >
          <IconX aria-hidden="true" />
        </IconButton>
      </template>
    </div>
    <template v-if="name">
      <input
        v-for="(tag, index) in tags"
        :key="`${index}-${tag}`"
        type="hidden"
        :name="name"
        :value="tag"
        :disabled="disabled"
      />
    </template>
  </div>
</template>
