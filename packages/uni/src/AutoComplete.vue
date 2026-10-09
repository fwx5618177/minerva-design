<script setup lang="ts">
import { useI18n } from "./i18n";
const { t } = useI18n();
import {
  computed,
  ref,
  watch,
  provide,
  getCurrentInstance,
  onBeforeUnmount,
  type CSSProperties,
} from "vue";
import { useNativeId as useId } from "./native-id";
import { inheritForm } from "./form-context";
import PopoverContent from "./PopoverContent.vue";
import type { MiniPopoverContext } from "./popover-context";
import FieldInput from "./Input.vue";
interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
  highlight?: boolean;
  icon?: string;
  description?: string;
  group?: string;
  style?: CSSProperties;
}
const rawProps = withDefaults(
  defineProps<{
    value?: string;
    modelValue?: string;
    defaultValue?: string;
    options?: Option[];
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    name?: string;
    label?: string;
    loading?: boolean;
    autoHighlight?: boolean;
    fillOnSelect?: boolean;
    filterOption?: (input: string, option: Option) => boolean;
    sortOption?: (a: Option, b: Option) => number;
    groupBy?: (option: Option) => string;
    groupMode?: "first" | "adjacent";
    inputProps?: Record<string, any>;
    emptyText?: string;
    dropdownClassName?: string;
    animation?: boolean;
    placement?: "top" | "bottom" | "left" | "right";
    offset?: { x: number; y: number };
  }>(),
  {
    options: () => [],
    fillOnSelect: true,
    groupMode: "first",
    placement: "bottom",
    animation: true,
    offset: () => ({ x: 0, y: 4 }),
  },
);
const props = inheritForm(rawProps);
const emit = defineEmits<{
  change: [value: string];
  "update:modelValue": [value: string];
  select: [option: Option];
  optionClick: [option: Option];
  dropdownVisibleChange: [open: boolean];
  submit: [value: string];
}>();
const local = ref(props.defaultValue ?? "");
const current = computed(() => props.modelValue ?? props.value ?? local.value);
const disabled = computed(() => props.inputProps?.disabled ?? props.disabled);
const readOnly = computed(() => props.inputProps?.readOnly ?? props.readOnly);
const locked = computed(() => disabled.value || readOnly.value);
const open = ref(false);
const composing = ref(false);
const active = ref(-1);
let blurTimer: ReturnType<typeof setTimeout> | undefined;
const filtered = computed(() => {
  const result = props.options.filter((o) =>
    props.filterOption
      ? props.filterOption(current.value, o)
      : o.label.toLowerCase().includes(current.value.toLowerCase()),
  );
  return props.sortOption ? result.sort(props.sortOption) : result;
});
const groups = computed(() => {
  if (!props.groupBy) return [{ name: "", options: filtered.value }];
  const result: { name: string; options: Option[] }[] = [];
  for (const option of filtered.value) {
    const name = props.groupBy(option);
    const group =
      props.groupMode === "adjacent"
        ? result.at(-1)?.name === name
          ? result.at(-1)
          : undefined
        : result.find((g) => g.name === name);
    if (group) group.options.push(option);
    else result.push({ name, options: [option] });
  }
  return result;
});
const ordered = computed(() => groups.value.flatMap((g) => g.options));
const activeOption = computed(
  () =>
    ordered.value[
      active.value >= 0
        ? active.value
        : props.autoHighlight && open.value
          ? ordered.value.findIndex((o) => !o.disabled)
          : -1
    ],
);
watch(filtered, () => {
  active.value = -1;
});
function setOpen(value: boolean) {
  if (value && locked.value) return;
  clearTimeout(blurTimer);
  if (open.value !== value) emit("dropdownVisibleChange", value);
  open.value = value;
  if (!value) active.value = -1;
}
watch(locked, (value) => {
  if (value) setOpen(false);
});
onBeforeUnmount(() => clearTimeout(blurTimer));
function change(value: string) {
  if (locked.value || value === current.value) return;
  if (props.value === undefined && props.modelValue === undefined)
    local.value = value;
  emit("change", value);
  emit("update:modelValue", value);
}
function type(value: string) {
  if (locked.value) return;
  change(value);
  active.value = -1;
  setOpen(true);
}
function choose(option: Option, pointer = false) {
  if (locked.value || option.disabled || composing.value || props.loading)
    return;
  if (props.fillOnSelect) change(option.label);
  setOpen(false);
  emit("select", option);
  if (pointer) emit("optionClick", option);
}
function confirm() {
  if (locked.value || composing.value) return;
  if (open.value && activeOption.value && !props.loading)
    choose(activeOption.value);
  else if (current.value.trim()) {
    emit("submit", current.value.trim());
    setOpen(false);
  }
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
    if (open.value) setOpen(false);
    else if (current.value) change("");
  } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    setOpen(true);
    const count = ordered.value.length,
      step = event.key === "ArrowDown" ? 1 : -1;
    let next = activeOption.value
      ? ordered.value.indexOf(activeOption.value)
      : step === 1
        ? -1
        : count;
    for (let i = 0; i < count; i++) {
      next = (next + step + count) % count;
      if (!ordered.value[next].disabled) {
        active.value = next;
        break;
      }
    }
  }
}
function blur() {
  blurTimer = setTimeout(() => setOpen(false), 100);
}
const trigger = ref<any>(),
  instance = getCurrentInstance();
const id = `mn-autocomplete-${useId().replace(/[^a-z0-9]/gi, "")}`;
const anchor = computed(() => {
  const el = trigger.value?.$el ?? trigger.value;
  return el?.querySelector?.("input") ?? el;
});
provide<MiniPopoverContext>("minerva:popover", {
  open: computed(() => open.value && !locked.value),
  disabled: locked,
  placement: computed(() => props.placement),
  modal: computed(() => false),
  setOpen,
  trigger,
  anchor,
  anchorId: ref(""),
  triggerId: id,
  measureTrigger: (callback) => {
    uni
      .createSelectorQuery?.()
      .in(instance?.proxy)
      .select(`#${props.inputProps?.id ?? id}`)
      .boundingClientRect((rect: any) => {
        if (rect) callback(rect);
      })
      .exec();
  },
});
</script>
<template>
  <view
    class="mn-select"
    :data-disabled="disabled || undefined"
    :data-readonly="readOnly || undefined"
  >
    <text v-if="label">{{ label }}</text>
    <FieldInput
      ref="trigger"
      :id="inputProps?.id ?? id"
      :aria-controls="`${id}-list`"
      v-bind="inputProps"
      :maxlength="inputProps?.maxlength ?? inputProps?.maxLength ?? -1"
      :name="name"
      :aria-label="inputProps?.['aria-label'] ?? label"
      :value="current"
      :disabled="disabled"
      :read-only="readOnly"
      :placeholder="placeholder ?? inputProps?.placeholder"
      role="combobox"
      :aria-expanded="open"
      @change="type"
      @focus="setOpen(true)"
      @tap="setOpen(true)"
      @blur="blur"
      @confirm="confirm"
      @keydown="keydown"
      @compositionstart="composing = true"
      @compositionend="composing = false"
    />
    <PopoverContent
      :id="`${id}-list`"
      :side="placement"
      align="start"
      match-anchor-width="min"
      :side-offset="
        placement === 'top' || placement === 'bottom' ? offset.y : offset.x
      "
      :align-offset="
        placement === 'top' || placement === 'bottom' ? offset.x : offset.y
      "
      @open-auto-focus="$event.preventDefault()"
      @close-auto-focus="$event.preventDefault()"
      :class="[dropdownClassName, { 'mn-autocomplete-animated': animation }]"
      role="listbox"
      :aria-busy="loading"
      @touchstart.stop
    >
      <view v-if="loading" role="status"
        ><slot name="loading">{{ t("common.loading") }}</slot></view
      >
      <view v-else-if="!filtered.length"
        ><slot name="empty">{{
          emptyText ?? t("empty.description")
        }}</slot></view
      >
      <template v-else>
        <view
          v-for="(group, index) in groups"
          :key="index"
          :role="group.name ? 'group' : undefined"
          :aria-label="group.name || undefined"
        >
          <text v-if="group.name" class="mn-option-group">{{
            group.name
          }}</text>
          <button
            v-for="option in group.options"
            :key="option.value"
            class="mn-option"
            :class="{
              'mn-disabled': option.disabled,
              'mn-active': activeOption === option,
              'mn-highlight': option.highlight,
            }"
            :style="option.style"
            role="option"
            :aria-selected="activeOption === option"
            :disabled="option.disabled"
            @mousedown.prevent
            @tap="choose(option, true)"
          >
            <slot name="option" :option="option"
              ><text v-if="option.icon">{{ option.icon }} </text
              ><text>{{ option.label }}</text
              ><text v-if="option.description" class="mn-muted">
                {{ option.description }}</text
              ></slot
            >
          </button>
        </view>
      </template>
    </PopoverContent>
  </view>
</template>

<style scoped>
.mn-option-group {
  display: block;
  padding: 6px 8px;
  color: var(--text-muted-color);
  font-weight: 600;
}
.mn-highlight {
  background: var(--primary-color-subtle);
}
.mn-option .mn-muted {
  display: block;
}
</style>
