<script setup lang="ts">
import { computed, ref, watch, provide, getCurrentInstance } from "vue";
import { dayKey, monthStart, parseDayKey } from "@minerva/core";
import Input from "./Input.vue";
import MonthCalendar from "./MonthCalendar.vue";
import PopoverContent from "./PopoverContent.vue";
import type { MiniPopoverContext } from "./popover-context";
import { inheritForm } from "./form-context";
import { useI18n } from "./i18n";
import { useNativeId } from "./native-id";
const raw = withDefaults(
  defineProps<{
    value?: string | null;
    modelValue?: string | null;
    defaultValue?: string;
    minDate?: string;
    maxDate?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
    clearable?: boolean;
    placeholder?: string;
    label?: string;
    name?: string;
    id?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    locale?: string;
    size?: "small" | "medium" | "large";
  }>(),
  { clearable: true, name: "date-picker", size: "medium" },
);
const props = inheritForm(raw),
  { t } = useI18n();
const emit = defineEmits<{
  change: [value: string];
  "update:modelValue": [value: string];
  openChange: [open: boolean];
}>();
const local = ref(props.defaultValue ?? ""),
  draft = ref<string | null>(null),
  open = ref(false);
const current = computed(() =>
  props.modelValue !== undefined
    ? (props.modelValue ?? "")
    : props.value !== undefined
      ? (props.value ?? "")
      : local.value,
);
const month = ref(monthStart(parseDayKey(current.value) ?? new Date()));
const blocked = computed(() => props.disabled || props.readOnly);
const field = ref<any>(),
  fieldId = `mn-date-${useNativeId()}`;
const instance = getCurrentInstance();
let touching = false;
function setOpen(next: boolean) {
  if ((next && blocked.value) || next === open.value) return;
  open.value = next;
  emit("openChange", next);
  if (next) month.value = monthStart(parseDayKey(current.value) ?? new Date());
}
watch(blocked, (value) => {
  if (value) setOpen(false);
});
watch(
  () => [props.value, props.modelValue],
  () => {
    draft.value = null;
  },
);
const allowed = (key: string) =>
  (!props.minDate || key >= props.minDate) &&
  (!props.maxDate || key <= props.maxDate);
function commit(next: string) {
  if (blocked.value) return;
  if (props.value === undefined && props.modelValue === undefined)
    local.value = next;
  emit("change", next);
  emit("update:modelValue", next);
}
function input(text: string) {
  if (blocked.value) return;
  draft.value = text;
  if (!text) commit("");
  else {
    const parsed = parseDayKey(text, true);
    if (parsed && allowed(dayKey(parsed))) {
      commit(dayKey(parsed));
      month.value = monthStart(parsed);
    }
  }
}
function blur() {
  if (touching) {
    touching = false;
    return;
  }
  if (blocked.value || draft.value === null) return;
  const parsed = parseDayKey(draft.value.trim(), false);
  if (!draft.value.trim()) {
    if (current.value) commit("");
  } else if (parsed) {
    const key = dayKey(parsed);
    if (allowed(key) && key !== current.value) {
      commit(key);
      month.value = monthStart(parsed);
    }
  }
  draft.value = null;
}
function choose(key: string) {
  touching = false;
  if (blocked.value || !allowed(key)) return;
  draft.value = null;
  commit(key);
  setOpen(false);
}
function clear() {
  touching = false;
  draft.value = null;
  commit("");
}
provide<MiniPopoverContext>("minerva:popover", {
  open: computed(() => open.value && !blocked.value),
  disabled: blocked,
  placement: computed(() => "bottom"),
  modal: computed(() => false),
  setOpen,
  trigger: field,
  anchor: ref(),
  anchorId: ref(""),
  triggerId: fieldId,
  measureTrigger: (callback) => {
    uni
      .createSelectorQuery?.()
      .in(instance?.proxy)
      .select(`#${fieldId}`)
      .boundingClientRect((rect: any) => {
        if (rect) callback(rect);
      })
      .exec();
  },
});
</script>
<template>
  <view
    :id="fieldId"
    class="mn-uni-date-picker"
    :data-state="open ? 'open' : 'closed'"
  >
    <text v-if="label">{{ label }}</text>
    <Input
      ref="field"
      :id="props.id"
      :value="draft ?? current"
      :name="name"
      :size="size"
      :placeholder="placeholder ?? t('datePicker.placeholder')"
      :aria-label="label ?? props.ariaLabel ?? t('datePicker.label')"
      :aria-labelledby="props.ariaLabelledby"
      :aria-describedby="props.ariaDescribedby"
      :disabled="props.disabled"
      :read-only="props.readOnly"
      :required="props.required"
      :invalid="props.invalid"
      @change="input"
      @blur="blur"
      @confirm="
        blur();
        setOpen(false);
      "
      @click="setOpen(!open)"
      @keydown="
        if ($event.key === 'Escape') setOpen(false);
        else if ($event.key === 'ArrowDown') setOpen(true);
      "
    >
      <template #suffix
        ><button
          v-if="clearable && current && !blocked"
          class="mn-close"
          :aria-label="t('datePicker.clear')"
          @touchstart="touching = true"
          @touchcancel="touching = false"
          @mousedown.prevent
          @tap.stop="clear"
        >
          ×
        </button></template
      >
    </Input>
    <PopoverContent
      align="start"
      :aria-label="label ?? props.ariaLabel ?? t('datePicker.label')"
      @open-auto-focus="$event.preventDefault()"
    >
      <view
        @touchstart="touching = true"
        @touchcancel="touching = false"
        @mousedown.prevent
      >
        <MonthCalendar
          :month="month"
          :value="current"
          :min="minDate"
          :max="maxDate"
          :locale="locale"
          :size="size"
          :show-selected-day-events="false"
          @month-change="month = $event"
          @select="choose"
        />
        <button
          class="mn-button mn-variant-ghost"
          :disabled="!allowed(dayKey(new Date()))"
          @tap="choose(dayKey(new Date()))"
        >
          {{ t("datePicker.today") }}
        </button>
      </view>
    </PopoverContent>
  </view>
</template>
