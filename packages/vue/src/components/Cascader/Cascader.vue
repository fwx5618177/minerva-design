<script setup lang="ts">
/**
 * Cascader: pick a value from a tree of options, one column per level.
 * Supports search, lazy loading (loadData), hover expansion and full keyboard
 * navigation. The selected path is the `v-model` (or `defaultValue`). Inside
 * a FormControl the input picks up the field's id, label, description,
 * invalid, required, disabled and read-only state (explicit props win).
 */
import { computed, provide, ref, useAttrs, watchEffect } from "vue";
import { findCascaderPath, flattenCascaderOptions } from "@minerva/core";
import styles from "@react-styles/components/Cascader/cascader.module.scss";
import { IconChevronDown, IconX } from "../../internal/icons";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import FloatingPanel from "../../internal/FloatingPanel.vue";
import { unrefElement } from "../../internal/Slot";
import {
  FORM_CONTROL_KEY,
  useFormControlContext,
  useFormControlProps,
} from "../../internal/form-control";
import { useI18n } from "../../config/useI18n";
import { Input } from "../Input";
import CascaderPanel from "./CascaderPanel.vue";
import type { CascaderOption, CascaderProps, CascaderValue } from "./types";

defineOptions({ name: "Cascader", inheritAttrs: false });

const EMPTY_VALUE: CascaderValue = [];

const props = withDefaults(defineProps<CascaderProps>(), {
  options: () => [],
  modelValue: undefined,
  defaultValue: undefined,
  displayRender: undefined,
  disabled: undefined,
  placeholder: undefined,
  allowClear: true,
  expandTrigger: "click",
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
  id: undefined,
  required: undefined,
  readOnly: undefined,
  invalid: undefined,
  showSearch: false,
  filter: undefined,
  loadData: undefined,
  dropdownClassName: undefined,
  width: 240,
  maxLevel: 6,
  dropdownStyle: undefined,
  optionStyle: undefined,
});
const emit = defineEmits<{
  "update:modelValue": [value: CascaderValue];
  /** A leaf option was selected or the value was cleared */
  change: [value: CascaderValue, selectedOptions: CascaderOption[]];
}>();
const slots = defineSlots<{
  /** Custom option content (the React `optionRender`) */
  option?: (props: { option: CascaderOption; level: number }) => unknown;
}>();

const attrs = useAttrs();
const { t } = useI18n();
const fc = useFormControlContext();
const field = useFormControlProps(() => ({
  id: props.id,
  "aria-describedby": props.ariaDescribedby,
}));
// The field state is resolved here (explicit props win over the
// FormControl), so the inner Input must not merge it again.
provide(FORM_CONTROL_KEY, null as never);

const disabled = computed(() => props.disabled ?? fc?.disabled.value ?? false);
const readOnly = computed(() => props.readOnly ?? fc?.readOnly.value ?? false);
const required = computed(() => props.required ?? fc?.required.value ?? false);
const invalid = computed(() => props.invalid ?? fc?.invalid.value ?? false);
// A FormLabel names the input unless an explicit aria-label is given;
// `label` stays as aria-label fallback.
const labelledBy = computed(
  () =>
    props.ariaLabelledby ??
    (fc && !props.ariaLabel ? fc.labelId.value : undefined),
);

const selectedValue = useControllable<CascaderValue>(props, "modelValue", {
  defaultProp: "defaultValue",
  fallback: EMPTY_VALUE,
  name: "Cascader",
});
const selectedOptions = computed(() =>
  findCascaderPath(props.options, selectedValue.value),
);

const isOpen = ref(false);
// Opened from the keyboard: move focus into the panel
const focusPanel = ref(false);
const expandedValues = ref<CascaderValue>([]);
const expandedPath = computed(() =>
  findCascaderPath(props.options, expandedValues.value),
);
const searchValue = ref("");

const anchor = ref<HTMLElement | null>(null);
const inputComponent = ref<unknown>(null);
const floating = ref<{ element: HTMLElement | null } | null>(null);
const input = (): HTMLInputElement | null =>
  unrefElement(inputComponent.value)?.querySelector("input") ?? null;
const dropdown = () => floating.value?.element ?? null;

const searching = computed(() => props.showSearch && searchValue.value !== "");
const searchResults = computed(() => {
  if (!searching.value) return [];
  const query = searchValue.value;
  const needle = query.toLowerCase();
  return flattenCascaderOptions(props.options).filter(({ path }) =>
    props.filter
      ? props.filter(query, path)
      : path.some((o) => String(o.label).toLowerCase().includes(needle)),
  );
});

function openDropdown(fromKeyboard = false) {
  if (disabled.value || readOnly.value) return;
  expandedValues.value = selectedValue.value;
  focusPanel.value = fromKeyboard;
  isOpen.value = true;
}

function closeDropdown(returnFocus = false) {
  isOpen.value = false;
  searchValue.value = "";
  if (returnFocus) input()?.focus();
}

function select(path: CascaderOption[]) {
  const next = path.map((o) => o.value);
  selectedValue.value = next;
  emit("change", next, path);
  closeDropdown(true);
}

function onActivate(path: CascaderOption[], level: number) {
  const option = path[path.length - 1];
  if (option.disabled) return;
  const atMaxLevel = level >= props.maxLevel - 1;
  const hasChildren = Boolean(option.children?.length);
  const lazy = Boolean(props.loadData) && !option.isLeaf && !option.children;
  if (!atMaxLevel && (hasChildren || lazy)) {
    expandedValues.value = path.map((o) => o.value);
    if (lazy && !option.loading) props.loadData?.(path);
    return;
  }
  select(path);
}

function onClear(event: MouseEvent) {
  event.stopPropagation();
  selectedValue.value = EMPTY_VALUE;
  emit("change", [], []);
  searchValue.value = "";
  input()?.focus();
}

/** Focus leaving both the field and the dropdown closes it */
function onFocusOut(event: FocusEvent) {
  const next = event.relatedTarget as Node | null;
  if (!isOpen.value || !next) return;
  if (anchor.value?.contains(next) || dropdown()?.contains(next)) return;
  closeDropdown();
}

const focusFirstSearchResult = () =>
  dropdown()?.querySelector<HTMLElement>('[role="option"]')?.focus();

function onInputKeyDown(event: KeyboardEvent) {
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      if (!isOpen.value) openDropdown(true);
      else if (searching.value) focusFirstSearchResult();
      else focusPanel.value = true;
      break;
    case "Enter":
      event.preventDefault();
      if (!isOpen.value) openDropdown(true);
      break;
    case " ":
      if (props.showSearch) break;
      event.preventDefault();
      if (!isOpen.value) openDropdown(true);
      break;
    default:
      break;
  }
}

function onSearch(value: string | number) {
  if (!props.showSearch || readOnly.value) return;
  searchValue.value = String(value);
  if (!isOpen.value) openDropdown();
}

function onSelectorClick() {
  if (disabled.value || readOnly.value) return;
  if (!isOpen.value) openDropdown();
  else if (!props.showSearch) closeDropdown();
}

function onResultsKeyDown(event: KeyboardEvent) {
  const items = Array.from(
    (event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(
      '[role="option"]',
    ),
  );
  const index = items.indexOf(event.target as HTMLElement);
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const step = event.key === "ArrowDown" ? 1 : -1;
    items[(index + step + items.length) % items.length]?.focus();
  }
}

function onResultKeyDown(event: KeyboardEvent, path: CascaderOption[]) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    select(path);
  }
}

// keep focus where it is when clicking non-focusable areas
function onDropdownMouseDown(event: MouseEvent) {
  if (!(event.target as HTMLElement).closest('[role="option"]')) {
    event.preventDefault();
  }
}

const displayValue = computed(() => {
  if (searching.value) return searchValue.value;
  const labels = selectedOptions.value.map((o) => String(o.label));
  return props.displayRender
    ? props.displayRender(labels, selectedOptions.value)
    : labels.join(" / ");
});

const rootAttrs = computed(() => ({
  ...attrs,
  class: [styles.cascader, attrs.class],
  style: [
    {
      width: typeof props.width === "number" ? `${props.width}px` : props.width,
    },
    attrs.style,
  ],
  ...hooks("cascader", "root", {
    state: isOpen.value ? "open" : "closed",
    disabled: disabled.value,
    readonly: readOnly.value,
    invalid: invalid.value,
  }),
}));

// The inner Input only wires aria-required / aria-readonly from a
// FormControl (none here): set the resolved values on the <input> itself.
watchEffect(
  () => {
    const el = input();
    if (!el) return;
    const set = (name: string, on: boolean) =>
      on ? el.setAttribute(name, "true") : el.removeAttribute(name);
    set("aria-required", required.value);
    set("aria-readonly", props.showSearch && readOnly.value);
  },
  { flush: "post" },
);

defineExpose({
  /** The inner `<input>` (the React `ref`) */
  input: computed(input),
  focus: () => input()?.focus(),
});
</script>

<template>
  <div ref="anchor" v-bind="rootAttrs" @focusout="onFocusOut">
    <!-- Pointer convenience: clicking anywhere on the selector toggles the
         dropdown. Keyboard users get the same via the inner combobox input. -->
    <div
      :class="[
        styles.selector,
        disabled && styles.disabled,
        isOpen && styles.focused,
      ]"
      v-bind="hooks('cascader', 'control')"
      @click="onSelectorClick"
    >
      <Input
        ref="inputComponent"
        variant="unstyled"
        :class="styles.input"
        :id="field.id"
        role="combobox"
        aria-haspopup="listbox"
        :aria-expanded="String(isOpen)"
        :aria-autocomplete="showSearch ? 'list' : undefined"
        :aria-label="ariaLabel ?? label"
        :aria-labelledby="labelledBy"
        :aria-describedby="field['aria-describedby']"
        :aria-invalid="invalid || undefined"
        :required="required"
        :name="name"
        :model-value="displayValue"
        :read-only="!showSearch || readOnly"
        :disabled="disabled"
        :placeholder="placeholder ?? t('cascader.placeholder')"
        @update:model-value="onSearch"
        @keydown="onInputKeyDown"
      />
      <button
        v-if="allowClear && selectedValue.length > 0 && !disabled && !readOnly"
        type="button"
        :class="styles.clearIcon"
        :aria-label="t('cascader.clear')"
        v-bind="hooks('cascader', 'clear-button')"
        @click="onClear"
      >
        <IconX :class="styles.icon" />
      </button>
      <span
        :class="[styles.arrow, isOpen && styles.open]"
        aria-hidden="true"
        v-bind="hooks('cascader', 'icon')"
      >
        <IconChevronDown :class="styles.icon" />
      </span>
    </div>
    <!-- The popup only delegates events bubbling up from the focusable
         listbox options inside it (Tab handling, and preventing focus loss on
         mousedown). Escape / outside pointer down are handled by its
         dismissable layer. -->
    <FloatingPanel
      ref="floating"
      :open="isOpen"
      :anchor="anchor"
      placement="bottom-start"
      :offset="{ mainAxis: 4 }"
      match-anchor-width="min"
      :branches="() => [anchor]"
      :return-focus-on-escape="input"
      focusable
      :class="[styles.dropdown, dropdownClassName]"
      :style="dropdownStyle"
      v-bind="hooks('cascader', 'content', { state: 'open' })"
      @dismiss="closeDropdown()"
      @mousedown="onDropdownMouseDown"
      @focusout="onFocusOut"
      @keydown="(e: KeyboardEvent) => e.key === 'Tab' && closeDropdown()"
    >
      <div
        v-if="searching"
        :class="styles.searchResults"
        role="listbox"
        :aria-label="label"
        tabindex="-1"
        @keydown="onResultsKeyDown"
      >
        <template v-if="searchResults.length > 0">
          <div
            v-for="{ path } in searchResults"
            :key="path.map((o) => o.value).join('/')"
            :class="styles.searchOption"
            v-bind="hooks('cascader', 'item')"
            role="option"
            aria-selected="false"
            tabindex="0"
            @keydown="onResultKeyDown($event, path)"
            @click="select(path)"
          >
            {{ path.map((o) => o.label).join(" / ") }}
          </div>
        </template>
        <div v-else :class="styles.empty" role="status">
          {{ t("cascader.noResults") }}
        </div>
      </div>
      <CascaderPanel
        v-else
        :key="focusPanel ? 'keyboard' : 'pointer'"
        :label="label"
        :options="options"
        :expanded-path="expandedPath"
        :selected-path="selectedOptions"
        :expand-trigger="expandTrigger"
        :max-level="maxLevel"
        :option-style="optionStyle"
        :auto-focus="focusPanel"
        @activate="onActivate"
        @hover-expand="(path) => (expandedValues = path.map((o) => o.value))"
        @exit="closeDropdown(true)"
      >
        <template v-if="slots.option" #option="scope">
          <slot name="option" v-bind="scope" />
        </template>
      </CascaderPanel>
    </FloatingPanel>
  </div>
</template>
