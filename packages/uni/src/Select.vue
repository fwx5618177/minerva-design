<script setup lang="ts">
import { h5Host, nativeAttribute } from "./host";
import { useI18n } from "./i18n";
const { t } = useI18n();
import {
  ref,
  computed,
  provide,
  inject,
  getCurrentInstance,
  type ComputedRef,
} from "vue";
import { useNativeId as useId } from "./native-id";
import { inheritForm } from "./form-context";
import PopoverContent from "./PopoverContent.vue";
import type { MiniPopoverContext } from "./popover-context";
import type { MiniSelectOption, MiniSelectContext } from "./select-context";
defineOptions({ inheritAttrs: false });
const rawProps = withDefaults(
  defineProps<{
    value?: string;
    modelValue?: string;
    defaultValue?: string;
    options?: MiniSelectOption[];
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    searchable?: boolean;
    open?: boolean;
    defaultOpen?: boolean;
    size?: string;
    invalid?: boolean;
    name?: string;
    required?: boolean;
    id?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    contentClassName?: string;
  }>(),
  { options: () => [], open: undefined, size: "medium" },
);
const props = inheritForm(rawProps);
const form = inject<ComputedRef<{ id?: string }> | undefined>(
  "minerva:form",
  undefined,
);
const popupId = `mn-select-${useId().replace(/[^a-z0-9]/gi, "")}`;
const emit = defineEmits([
  "change",
  "update:modelValue",
  "openChange",
  "update:open",
]);
const local = ref(props.defaultValue ?? "");
const expanded = ref(props.defaultOpen ?? false);
const query = ref("");
const registered = ref<MiniSelectOption[]>([]);
const activeIndex = ref(-1);
const current = computed(() => props.modelValue ?? props.value ?? local.value);
const visible = computed(() => props.open ?? expanded.value);
const trigger = ref<any>(),
  instance = getCurrentInstance();
provide<MiniPopoverContext>("minerva:popover", {
  open: visible,
  disabled: computed(() => props.disabled),
  placement: computed(() => "bottom"),
  modal: computed(() => false),
  setOpen,
  trigger,
  anchor: ref(),
  anchorId: ref(""),
  triggerId: `${popupId}-trigger`,
  measureTrigger: (callback) => {
    uni
      .createSelectorQuery?.()
      .in(instance?.proxy)
      .select(`#${props.id ?? form?.value.id ?? `${popupId}-trigger`}`)
      .boundingClientRect((rect: any) => {
        if (rect) callback(rect);
      })
      .exec();
  },
});
const allOptions = computed(() => [...props.options, ...registered.value]);
const filtered = computed(() =>
  allOptions.value.filter((o) =>
    o.label.toLowerCase().includes(query.value.toLowerCase()),
  ),
);
const enabled = computed(() => filtered.value.filter((o) => !o.disabled));
const active = computed(() => enabled.value[activeIndex.value]?.value);
const locked = computed(() => props.disabled || props.readOnly);
function setOpen(v: boolean) {
  if (locked.value) return;
  expanded.value = v;
  if (v)
    activeIndex.value = Math.max(
      0,
      enabled.value.findIndex((o) => o.value === current.value),
    );
  emit("openChange", v);
  emit("update:open", v);
}
function choose(o: MiniSelectOption) {
  if (locked.value || o.disabled) return;
  local.value = o.value;
  emit("change", o.value);
  emit("update:modelValue", o.value);
  setOpen(false);
}
function register(o: MiniSelectOption) {
  const i = registered.value.findIndex((v) => v.value === o.value);
  if (i < 0) registered.value.push(o);
  else registered.value[i] = o;
}
function unregister(value: string) {
  registered.value = registered.value.filter((o) => o.value !== value);
}
function keydown(e: KeyboardEvent) {
  if (locked.value) return;
  if (e.key === "Escape") {
    e.preventDefault();
    setOpen(false);
    return;
  }
  if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
    e.preventDefault();
    if (!visible.value) {
      setOpen(true);
      return;
    }
    if (e.key === "Home") activeIndex.value = 0;
    else if (e.key === "End") activeIndex.value = enabled.value.length - 1;
    else
      activeIndex.value =
        (activeIndex.value +
          (e.key === "ArrowDown" ? 1 : -1) +
          enabled.value.length) %
        Math.max(1, enabled.value.length);
  } else if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    if (!visible.value) setOpen(true);
    else {
      const o = enabled.value[activeIndex.value];
      if (o) choose(o);
    }
  } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    const index = enabled.value.findIndex((o) =>
      o.label.toLowerCase().startsWith(e.key.toLowerCase()),
    );
    if (index >= 0) {
      activeIndex.value = index;
      if (!visible.value) choose(enabled.value[index]!);
    }
  }
}
provide<MiniSelectContext>("minerva:select", {
  value: current,
  query: computed(() => query.value),
  disabled: locked,
  active,
  register,
  unregister,
  choose,
  keydown,
});
</script>
<template>
  <!-- #ifdef H5 -->
  <template v-if="h5Host">
    <view
      class="mn-select"
      :class="[
        `mn-size-${size}`,
        { 'mn-invalid': props.invalid, 'mn-disabled': locked },
      ]"
      ><button
        v-bind="$attrs"
        class="mn-input"
        role="combobox"
        :id="props.id ?? form?.id ?? `${popupId}-trigger`"
        ref="trigger"
        aria-haspopup="listbox"
        :aria-controls="popupId"
        :aria-label="props.ariaLabel"
        :aria-labelledby="props.ariaLabelledby"
        :aria-describedby="props.ariaDescribedby"
        :aria-required="props.required"
        :aria-invalid="props.invalid"
        data-action="trigger"
        :class="[
          `mn-size-${size}`,
          { 'mn-disabled': locked, 'mn-invalid': props.invalid },
        ]"
        :disabled="locked"
        :aria-expanded="visible"
        @tap="setOpen(!visible)"
        @keydown="keydown"
      >
        {{ allOptions.find((o) => o.value === current)?.label || placeholder }}
        ▾</button
      ><input
        v-if="name"
        class="mn-uni-visually-hidden"
        :name="name"
        :value="current"
        :disabled="props.disabled"
        aria-hidden="true"
        :tabindex="-1"
      /><PopoverContent
        force-mount
        align="start"
        match-anchor-width="min"
        @open-auto-focus="$event.preventDefault()"
        :id="popupId"
        role="listbox"
        :class="contentClassName"
        :aria-label="props.ariaLabel"
        :aria-labelledby="props.ariaLabelledby"
        ><input
          v-if="searchable"
          class="mn-input"
          :value="query"
          :placeholder="t('searchBar.placeholder')"
          @input="
            query = ($event as unknown as { detail: { value: string } }).detail
              .value
          "
          @keydown="keydown"
        /><button
          v-for="option in options.filter((o) =>
            o.label.toLowerCase().includes(query.toLowerCase()),
          )"
          :key="option.value"
          class="mn-option"
          role="option"
          :aria-selected="current === option.value"
          :aria-disabled="option.disabled"
          :data-value="option.value"
          :class="{
            'mn-active': current === option.value,
            'mn-option-focused': active === option.value,
            'mn-disabled': option.disabled,
          }"
          :disabled="option.disabled"
          @tap="choose(option)"
          @keydown="keydown"
        >
          {{ option.label }}</button
        ><slot /><text v-if="!filtered.length" class="mn-muted">{{
          t("cascader.noResults")
        }}</text></PopoverContent
      ></view
    >
  </template>
  <!-- #endif -->
  <!-- #ifndef H5 -->
  <template v-if="!h5Host">
    <view
      class="mn-select"
      :class="[
        `mn-size-${size}`,
        { 'mn-invalid': props.invalid, 'mn-disabled': locked },
      ]"
      ><button
        :style="$attrs['style']"
        :tabindex="nativeAttribute($attrs['tabindex'])"
        :data-testid="nativeAttribute($attrs['data-testid'])"
        class="mn-input"
        role="combobox"
        :id="props.id ?? form?.id ?? `${popupId}-trigger`"
        ref="trigger"
        aria-haspopup="listbox"
        :aria-controls="popupId"
        :aria-label="props.ariaLabel"
        :aria-labelledby="props.ariaLabelledby"
        :aria-describedby="props.ariaDescribedby"
        :aria-required="props.required"
        :aria-invalid="props.invalid"
        data-action="trigger"
        :class="[
          `mn-size-${size}`,
          { 'mn-disabled': locked, 'mn-invalid': props.invalid },
        ]"
        :disabled="locked"
        :aria-expanded="visible"
        @tap="setOpen(!visible)"
        @keydown="keydown"
      >
        {{ allOptions.find((o) => o.value === current)?.label || placeholder }}
        ▾</button
      ><input
        v-if="name"
        class="mn-uni-visually-hidden"
        :name="name"
        :value="current"
        :disabled="props.disabled"
        aria-hidden="true"
        :tabindex="-1"
      /><PopoverContent
        force-mount
        align="start"
        match-anchor-width="min"
        @open-auto-focus="$event.preventDefault()"
        :id="popupId"
        role="listbox"
        :class="contentClassName"
        :aria-label="props.ariaLabel"
        :aria-labelledby="props.ariaLabelledby"
        ><input
          v-if="searchable"
          class="mn-input"
          :value="query"
          :placeholder="t('searchBar.placeholder')"
          @input="
            query = ($event as unknown as { detail: { value: string } }).detail
              .value
          "
          @keydown="keydown"
        /><button
          v-for="option in options.filter((o) =>
            o.label.toLowerCase().includes(query.toLowerCase()),
          )"
          :key="option.value"
          class="mn-option"
          role="option"
          :aria-selected="current === option.value"
          :aria-disabled="option.disabled"
          :data-value="option.value"
          :class="{
            'mn-active': current === option.value,
            'mn-option-focused': active === option.value,
            'mn-disabled': option.disabled,
          }"
          :disabled="option.disabled"
          @tap="choose(option)"
          @keydown="keydown"
        >
          {{ option.label }}</button
        ><slot /><text v-if="!filtered.length" class="mn-muted">{{
          t("cascader.noResults")
        }}</text></PopoverContent
      ></view
    >
  </template>
  <!-- #endif -->
</template>
