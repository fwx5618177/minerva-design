<script setup lang="ts">
import { useI18n } from "./i18n";
const { t } = useI18n();
import { computed, ref, watch, type CSSProperties } from "vue";
import { useNativeId as useId } from "./native-id";
import { findCascaderPath, flattenCascaderOptions } from "@minerva/core";
import { inheritForm } from "./form-context";
interface Option {
  value: string | number;
  label: string | number;
  disabled?: boolean;
  children?: Option[];
  isLeaf?: boolean;
  loading?: boolean;
}
const rawProps = withDefaults(
  defineProps<{
    options?: Option[];
    value?: (string | number)[];
    modelValue?: (string | number)[];
    defaultValue?: (string | number)[];
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
    required?: boolean;
    name?: string;
    label?: string;
    id?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    placeholder?: string;
    changeOnSelect?: boolean;
    showSearch?: boolean;
    allowClear?: boolean;
    clearLabel?: string;
    emptyText?: string;
    maxLevel?: number;
    displayRender?: (labels: string[], options: Option[]) => string;
    filter?: (input: string, path: Option[]) => boolean;
    loadData?: (path: Option[]) => void;
    expandTrigger?: "click" | "hover";
    width?: string | number;
    dropdownClassName?: string;
    dropdownStyle?: CSSProperties;
    optionStyle?: CSSProperties;
  }>(),
  {
    options: () => [],
    allowClear: true,
    maxLevel: 6,
    width: 240,
    expandTrigger: "click",
  },
);
const props = inheritForm(rawProps);
const emit = defineEmits<{
  change: [value: (string | number)[], options: Option[]];
  "update:modelValue": [value: (string | number)[]];
  openChange: [open: boolean];
}>();
const local = ref<(string | number)[]>(props.defaultValue ?? []);
const selected = computed(() => props.modelValue ?? props.value ?? local.value);
const selectedOptions = computed(() =>
  findCascaderPath(props.options, selected.value),
);
const expanded = ref<(string | number)[]>([]);
const open = ref(false),
  search = ref("");
const baseId = useId();
const navLevel = ref(0),
  navIndex = ref(-1);
const locked = computed(() => props.disabled || props.readOnly);
const expandedOptions = computed(() =>
  findCascaderPath(props.options, expanded.value),
);
const levels = computed(() => {
  const result: Option[][] = [props.options];
  for (const option of expandedOptions.value) {
    if (result.length >= props.maxLevel || !option.children?.length) break;
    result.push(option.children);
  }
  return result;
});
const searching = computed(() => props.showSearch && search.value !== "");
const results = computed(() =>
  flattenCascaderOptions(props.options).filter(({ path }) =>
    props.filter
      ? props.filter(search.value, path)
      : path.some((o) =>
          String(o.label).toLowerCase().includes(search.value.toLowerCase()),
        ),
  ),
);
const display = computed(() => {
  if (searching.value) return search.value;
  const labels = selectedOptions.value.map((o) => String(o.label));
  return props.displayRender
    ? props.displayRender(labels, selectedOptions.value)
    : labels.join(" / ");
});
function setOpen(value: boolean) {
  if (value && locked.value) return;
  if (value && !open.value) {
    expanded.value = [...selected.value];
    navLevel.value = 0;
    navIndex.value = props.options.findIndex((o) => !o.disabled);
  }
  if (open.value !== value) emit("openChange", value);
  open.value = value;
  if (!value) search.value = "";
}
watch(locked, (value) => {
  if (value) setOpen(false);
});
function select(path: Option[], close = true) {
  if (locked.value || path.some((o) => o.disabled)) return;
  const next = path.map((o) => o.value);
  if (props.value === undefined && props.modelValue === undefined)
    local.value = next;
  emit("change", next, path);
  emit("update:modelValue", next);
  if (close) setOpen(false);
}
const expandable = (o: Option) =>
  !!o.children?.length || (!!props.loadData && !o.isLeaf && !o.children);
function choose(option: Option, level: number, hover = false) {
  if (locked.value || option.disabled) return;
  const path = [...expandedOptions.value.slice(0, level), option];
  if (level < props.maxLevel - 1 && expandable(option)) {
    expanded.value = path.map((o) => o.value);
    if (!option.children && !option.loading) props.loadData?.(path);
    if (props.changeOnSelect && !hover) select(path, false);
  } else if (!hover) select(path);
}
function type(event: any) {
  if (locked.value || !props.showSearch) return;
  setOpen(true);
  search.value = String(event.detail?.value ?? event.target?.value ?? "");
  navIndex.value = 0;
}
function keydown(event: KeyboardEvent) {
  if (locked.value || event.isComposing || event.keyCode === 229) return;
  if (event.key === "Escape") {
    event.preventDefault();
    setOpen(false);
    return;
  }
  if (
    ![
      "ArrowDown",
      "ArrowUp",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
      "Enter",
    ].includes(event.key)
  )
    return;
  event.preventDefault();
  if (!open.value) {
    setOpen(true);
    return;
  }
  const items = searching.value
    ? results.value.map((e) => e.option)
    : (levels.value[navLevel.value] ?? []);
  if (
    event.key === "ArrowDown" ||
    event.key === "ArrowUp" ||
    event.key === "Home" ||
    event.key === "End"
  ) {
    const step = event.key === "ArrowUp" || event.key === "End" ? -1 : 1;
    let index =
      event.key === "Home"
        ? -1
        : event.key === "End"
          ? items.length
          : navIndex.value;
    for (let i = 0; i < items.length; i++) {
      index = (index + step + items.length) % items.length;
      if (!items[index].disabled) {
        navIndex.value = index;
        break;
      }
    }
  } else if (
    event.key === "ArrowLeft" &&
    !searching.value &&
    navLevel.value > 0
  ) {
    navLevel.value--;
    navIndex.value = levels.value[navLevel.value].findIndex(
      (o) => o.value === expanded.value[navLevel.value],
    );
  } else if (event.key === "ArrowRight" || event.key === "Enter") {
    const option = items[navIndex.value];
    if (!option || option.disabled) return;
    if (searching.value) {
      if (event.key === "Enter") select(results.value[navIndex.value].path);
    } else {
      const level = navLevel.value;
      if (
        event.key === "ArrowRight" &&
        (!expandable(option) || level >= props.maxLevel - 1)
      )
        return;
      choose(option, level);
      if (open.value && option.children?.length && level < props.maxLevel - 1) {
        navLevel.value = level + 1;
        navIndex.value = option.children.findIndex((o) => !o.disabled);
      }
    }
  }
}
function confirm() {
  keydown({ key: "Enter", preventDefault() {} } as KeyboardEvent);
}
</script>
<template>
  <view
    class="mn-cascader"
    :style="{
      position: 'relative',
      overflow: 'visible',
      flexDirection: 'column',
      width: typeof width === 'number' ? `${width}px` : width,
    }"
    :class="{ 'mn-disabled': props.disabled, 'mn-invalid': props.invalid }"
  >
    <text v-if="label">{{ label }}</text>
    <view class="mn-row">
      <input
        :id="id"
        class="mn-input"
        :name="name"
        :value="display"
        :placeholder="placeholder ?? t('cascader.placeholder')"
        :disabled="locked"
        :readonly="!showSearch || readOnly"
        :aria-label="rawProps.ariaLabel ?? label"
        :aria-labelledby="rawProps.ariaLabelledby"
        :aria-describedby="rawProps.ariaDescribedby"
        :aria-required="props.required"
        :aria-invalid="props.invalid"
        role="combobox"
        :aria-expanded="open"
        @tap="setOpen(true)"
        @focus="setOpen(true)"
        @input="type"
        @keydown="keydown"
        @confirm="confirm"
        :aria-activedescendant="
          open && navIndex >= 0
            ? `${baseId}-${searching ? 'search' : navLevel}-${navIndex}`
            : undefined
        "
      />
      <button
        v-if="allowClear && selected.length && !readOnly"
        class="mn-close"
        :aria-label="clearLabel ?? t('cascader.clear')"
        :disabled="props.disabled"
        @tap="select([])"
      >
        ×
      </button>
    </view>
    <view
      v-if="open && !locked"
      class="mn-popup"
      :class="dropdownClassName"
      :style="dropdownStyle"
    >
      <view v-if="searching" role="listbox">
        <text v-if="!results.length">{{
          emptyText ?? t("cascader.noResults")
        }}</text>
        <button
          v-for="(entry, resultIndex) in results"
          :id="`${baseId}-search-${resultIndex}`"
          :key="JSON.stringify(entry.path.map((o) => o.value))"
          data-search-result
          class="mn-option"
          role="option"
          @tap="select(entry.path)"
        >
          <slot name="search-option" :path="entry.path">{{
            entry.path.map((o) => o.label).join(" / ")
          }}</slot>
        </button>
      </view>
      <view v-else class="mn-row" style="align-items: flex-start">
        <view
          v-for="(level, index) in levels"
          :key="index"
          class="mn-cascader-level"
          role="listbox"
          :aria-label="`${label ?? 'Options'} ${index + 1}`"
        >
          <button
            v-for="(option, optionIndex) in level"
            :id="`${baseId}-${index}-${optionIndex}`"
            :key="option.value"
            class="mn-option"
            role="option"
            :style="optionStyle"
            :class="{
              'mn-active': navLevel === index && navIndex === optionIndex,
              'mn-disabled': option.disabled,
            }"
            :aria-selected="selected[index] === option.value"
            :disabled="option.disabled"
            @tap="choose(option, index)"
            @mouseenter="
              expandTrigger === 'hover' && choose(option, index, true)
            "
          >
            <slot name="option" :option="option" :level="index"
              >{{ option.label
              }}{{
                option.loading ? " …" : expandable(option) ? " ›" : ""
              }}</slot
            >
          </button>
        </view>
      </view>
    </view>
  </view>
</template>
