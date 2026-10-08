<script setup lang="ts">
/**
 * Select: a single-choice dropdown following the WAI-ARIA "select-only
 * combobox" pattern. The trigger is a `<button role="combobox">`; the popup
 * is a `role="listbox"` anchored below it (flips above when there is no
 * room, at least as wide as the trigger, height capped to the viewport). A
 * hidden native `<select>` carries `name` / `required` / `disabled` for
 * forms (FormData, constraint validation, reset). Inside a FormControl it
 * picks up the field's id, description, invalid, required and disabled
 * state. Options are `SelectItem` children (optionally in `SelectGroup`s
 * with a `SelectLabel`, separated by `SelectSeparator`s).
 */
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  provide,
  ref,
  shallowRef,
  useAttrs,
  useId,
  watch,
  type FunctionalComponent,
  type VNode,
} from "vue";
import { createTypeahead, getNextIndex } from "@minerva/core";
import { parsePlacement } from "@minerva/dom";
import styles from "@react-styles/components/Select/select.module.scss";
import FloatingPanel from "../../internal/FloatingPanel.vue";
import { hooks } from "../../internal/hooks";
import { IconChevronDown } from "../../internal/icons";
import {
  useFormControlContext,
  useFormControlProps,
} from "../../internal/form-control";
import { useControllable } from "../../internal/controllable";
import SelectItem from "./SelectItem.vue";
import { collectItems, SELECT_KEY, type ItemRecord } from "./context";
import type { SelectProps } from "./types";

defineOptions({ name: "Select", inheritAttrs: false });

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  open: undefined,
  defaultOpen: false,
  placeholder: undefined,
  size: "medium",
  invalid: false,
  disabled: undefined,
  required: undefined,
  name: undefined,
  id: undefined,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
  contentClassName: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  /** The value of the newly selected item */
  change: [value: string];
  "update:open": [open: boolean];
  /** The popup opens or closes */
  openChange: [open: boolean];
}>();

const slots = defineSlots<{
  /** SelectItem / SelectGroup / SelectLabel / SelectSeparator elements */
  default?: () => unknown;
  /** Shown in the trigger while nothing is selected (the `placeholder` prop) */
  placeholder?: () => unknown;
}>();

/** Which option is highlighted when the listbox opens. */
type OpenIntent = "selected" | "first" | "last";

const PAGE_SIZE = 10;
const OPTION_SELECTOR = '[role="option"]';

const getOptions = (listbox: HTMLElement) =>
  Array.from(listbox.querySelectorAll<HTMLElement>(OPTION_SELECTOR));
const isOptionDisabled = (option: HTMLElement) =>
  option.getAttribute("aria-disabled") === "true";
const findOption = (listbox: HTMLElement, value: string | null) =>
  value === null
    ? undefined
    : getOptions(listbox).find((option) => option.dataset.value === value);

/** Keeps the hidden native <select> out of sight and out of the layout. */
const VISUALLY_HIDDEN = {
  position: "absolute",
  border: "0",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal",
} as const;

const attrs = useAttrs();
const fc = useFormControlContext();
const field = useFormControlProps(() => ({
  id: props.id,
  "aria-describedby": props.ariaDescribedby,
}));
const isInvalid = computed(() => props.invalid || !!fc?.invalid.value);
const isDisabled = computed(
  () => props.disabled ?? fc?.disabled.value ?? false,
);
const isRequired = computed(
  () => props.required ?? fc?.required.value ?? false,
);

// Value: controlled when `modelValue` is set. Not useControllable: a form
// reset restores `defaultValue` without emitting `change` (like native).
const internalValue = ref(props.defaultValue ?? "");
const isControlled = computed(() => props.modelValue !== undefined);
const value = computed(() =>
  isControlled.value ? (props.modelValue as string) : internalValue.value,
);

const open = useControllable<boolean>(props, "open", {
  fallback: false,
  onChange: (next) => emit("openChange", next),
  name: "Select",
});

const listboxId = useId();
const trigger = shallowRef<HTMLButtonElement | null>(null);
const native = shallowRef<HTMLSelectElement | null>(null);
const listbox = shallowRef<HTMLElement | null>(null);
const highlighted = ref<string | null>(null);
const typeahead = createTypeahead();

/** Options rendered by custom wrappers (unknown to `collectItems`). */
const extraItems = ref<ItemRecord[]>([]);
/** Items of the last render (read by the event handlers). */
let items: ItemRecord[] = [];

/** Every known option: collected from the slot (during render) + extras. */
function renderItems(): ItemRecord[] {
  const tree = collectItems(slots.default?.(), SelectItem);
  const known = new Set(tree.map((item) => item.value));
  items = [
    ...tree,
    ...extraItems.value.filter((item) => !known.has(item.value)),
  ];
  return items;
}

let openIntent: OpenIntent = "selected";
/** Scroll the highlighted option into view once positioned (keyboard). */
let scrollPending = false;

function commitValue(next: string) {
  if (next === value.value) return;
  if (!isControlled.value) internalValue.value = next;
  emit("update:modelValue", next);
  emit("change", next);
}

function openWith(intent: OpenIntent) {
  openIntent = intent;
  open.value = true;
}

function close(focusTrigger: boolean) {
  if (focusTrigger) trigger.value?.focus();
  open.value = false;
}

// On open: highlight (and focus) the selected option, else the first /
// last enabled one depending on how the listbox was opened.
watch(
  [open, listbox],
  ([isOpen, list]) => {
    if (!isOpen || !list) return;
    const intent = openIntent;
    openIntent = "selected";
    const enabled = getOptions(list).filter((o) => !isOptionDisabled(o));
    const target =
      intent === "last"
        ? enabled[enabled.length - 1]
        : intent === "first"
          ? enabled[0]
          : (enabled.find((o) => o.dataset.value === value.value) ??
            enabled[0]);
    typeahead.reset();
    scrollPending = true;
    highlighted.value = target?.dataset.value ?? null;
    void nextTick(syncFocus);
  },
  { flush: "post" },
);

/** DOM focus follows the highlight (the listbox itself when none). */
function syncFocus() {
  const list = listbox.value;
  if (!open.value || !list) return;
  const target = findOption(list, highlighted.value) ?? list;
  if (target.ownerDocument.activeElement !== target) {
    target.focus({ preventScroll: true });
  }
  // Keyboard moves (and opening) scroll the highlighted option into view;
  // pointer hover does not (it would make the list jump under the cursor).
  if (scrollPending) {
    scrollPending = false;
    findOption(list, highlighted.value)?.scrollIntoView?.({
      block: "nearest",
    });
  }
}
watch(highlighted, syncFocus, { flush: "post" });

// The hidden native select: `defaultSelected` marks what a form reset
// restores (defaultValue, or the current value when controlled), then the
// live value is re-applied.
function syncNative() {
  const el = native.value;
  if (!el) return;
  const resetTo = isControlled.value ? value.value : (props.defaultValue ?? "");
  for (const option of Array.from(el.options)) {
    option.defaultSelected = option.value === resetTo;
  }
  el.value = value.value;
}

// Form reset restores defaultValue (uncontrolled), without `change`.
let resetForm: HTMLFormElement | null = null;
const onReset = () => {
  if (!isControlled.value) internalValue.value = props.defaultValue ?? "";
};
onMounted(() => {
  syncNative();
  resetForm = native.value?.form ?? null;
  resetForm?.addEventListener("reset", onReset);
});
onUpdated(syncNative);
onBeforeUnmount(() => resetForm?.removeEventListener("reset", onReset));

function registerItem(record: ItemRecord) {
  if (items.some((item) => item.value === record.value)) return;
  if (extraItems.value.some((item) => item.value === record.value)) return;
  extraItems.value = [...extraItems.value, record];
}

function highlight(next: string) {
  scrollPending = false;
  highlighted.value = next;
}

function select(next: string) {
  commitValue(next);
  close(true);
}

provide(SELECT_KEY, { value, highlighted, highlight, select, registerItem });

const isPrintable = (event: KeyboardEvent) =>
  event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;

function onTriggerKeyDown(event: KeyboardEvent) {
  if (open.value) return;
  const { key } = event;
  // Typeahead while closed changes the selection without opening (like a
  // native select). Space continues a search in progress.
  if (isPrintable(event) && (key !== " " || typeahead.getBuffer() !== "")) {
    const list = items;
    const index = typeahead.search(
      key,
      list,
      list.findIndex((item) => item.value === value.value),
    );
    event.preventDefault();
    if (index !== -1) commitValue(list[index].value);
    return;
  }
  const intent: Record<string, OpenIntent> = {
    Enter: "selected",
    " ": "selected",
    ArrowDown: "selected",
    ArrowUp: value.value === "" ? "last" : "selected",
    Home: "first",
    End: "last",
  };
  if (key in intent) {
    // Prevents the native click (Enter) and page scrolling (arrows).
    event.preventDefault();
    openWith(intent[key]);
  }
}

function onListboxKeyDown(event: KeyboardEvent) {
  const list = listbox.value;
  if (!list) return;
  const { key } = event;
  if (key === "Tab") {
    // Close and let the browser move on from the trigger: the natural Tab
    // order continues after the select (no preventDefault).
    close(true);
    return;
  }
  const options = getOptions(list);
  const currentIndex = options.findIndex(
    (option) => option.dataset.value === highlighted.value,
  );
  const current = currentIndex === -1 ? undefined : options[currentIndex];
  const selectCurrent = () => {
    if (current && !isOptionDisabled(current)) {
      select(current.dataset.value as string);
    }
  };

  if (key === "Enter" || (key === "ArrowUp" && event.altKey)) {
    event.preventDefault();
    selectCurrent();
    return;
  }
  if (key === " " && typeahead.getBuffer() === "") {
    event.preventDefault();
    selectCurrent();
    return;
  }
  if (event.ctrlKey || event.metaKey || event.altKey) return;

  const next = getNextIndex({
    currentIndex,
    count: options.length,
    key,
    loop: false,
    isDisabled: (i) => isOptionDisabled(options[i]),
    pageSize: PAGE_SIZE,
  });
  if (next !== null || key.startsWith("Arrow") || key.startsWith("Page")) {
    // Arrow keys never scroll the list / page, even at the edges.
    event.preventDefault();
  }
  if (next === null && isPrintable(event)) {
    const index = typeahead.search(
      key,
      options.map((option) => ({
        text: option.dataset.textValue ?? option.textContent ?? "",
        disabled: isOptionDisabled(option),
      })),
      currentIndex,
    );
    if (index !== -1) {
      event.preventDefault();
      scrollPending = true;
      highlighted.value = options[index].dataset.value as string;
    }
    return;
  }
  if (next !== null) {
    typeahead.reset();
    scrollPending = true;
    highlighted.value = options[next].dataset.value as string;
  }
}

function onTriggerKeyUp(event: KeyboardEvent) {
  // Space is handled on keydown: never let its keyup click (re)toggle.
  if (event.key === " ") event.preventDefault();
}

// (function refs: `ref="..."` inside the v-for would collect arrays)
const setTrigger = (el: unknown) => {
  trigger.value = el instanceof HTMLButtonElement ? el : null;
};
const setNative = (el: unknown) => {
  native.value = el instanceof HTMLSelectElement ? el : null;
};
const setListbox = (el: unknown) => {
  listbox.value = el instanceof HTMLElement ? el : null;
};

const listboxLabel = computed(() =>
  props.ariaLabel
    ? { "aria-label": props.ariaLabel }
    : props.ariaLabelledby
      ? { "aria-labelledby": props.ariaLabelledby }
      : fc
        ? { "aria-labelledby": fc.labelId.value }
        : {},
);

const showPlaceholder = computed(() => value.value === "");
const triggerAttrs = computed(() => ({
  ...attrs,
  id: field.value.id,
  "aria-label": props.ariaLabel,
  "aria-labelledby": props.ariaLabelledby,
  "aria-describedby": field.value["aria-describedby"],
  ...hooks("select", "root", {
    state: open.value ? "open" : "closed",
    disabled: isDisabled.value,
    invalid: isInvalid.value,
    required: isRequired.value,
    size: props.size,
  }),
}));
const contentHooks = (placement: string) => {
  const { side, align } = parsePlacement(placement as never);
  return hooks("select", "content", { state: "open", side, align, placement });
};
const selectedItemOf = (list: ItemRecord[]) =>
  list.find((item) => item.value === value.value);
/** Renders the label (slot content) of the selected option in the trigger */
const RenderLabel: FunctionalComponent<{ item: ItemRecord | undefined }> = (
  p,
) => p.item?.label() as VNode[] | undefined;
RenderLabel.props = ["item"];
</script>

<template>
  <template v-for="list in [renderItems()]" :key="0">
    <button
      :ref="setTrigger"
      type="button"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :aria-controls="open ? listboxId : undefined"
      aria-autocomplete="none"
      :aria-required="isRequired || undefined"
      :aria-invalid="isInvalid || undefined"
      :disabled="isDisabled"
      :data-state="open ? 'open' : 'closed'"
      :data-placeholder="showPlaceholder ? '' : undefined"
      :class="[styles.trigger, styles[size], isInvalid && styles.invalid]"
      data-component="select"
      v-bind="triggerAttrs"
      @click="open = !open"
      @keydown="onTriggerKeyDown"
      @keyup="onTriggerKeyUp"
    >
      <span :class="styles.value" v-bind="hooks('select', 'value')">
        <span>
          <slot v-if="showPlaceholder" name="placeholder">{{
            placeholder
          }}</slot>
          <RenderLabel v-else :item="selectedItemOf(list)" />
        </span>
      </span>
      <span
        :class="styles.icon"
        aria-hidden="true"
        v-bind="hooks('select', 'icon')"
      >
        <IconChevronDown />
      </span>
    </button>

    <select
      :ref="setNative"
      aria-hidden="true"
      tabindex="-1"
      :name="name"
      :required="isRequired"
      :disabled="isDisabled"
      :value="value"
      :style="VISUALLY_HIDDEN"
      @change="commitValue(($event.target as HTMLSelectElement).value)"
      @focus="trigger?.focus()"
    >
      <option value="" />
      <option v-for="item in list" :key="item.value" :value="item.value">
        {{ item.text }}
      </option>
      <option v-if="value !== '' && !selectedItemOf(list)" :value="value" />
    </select>
  </template>

  <FloatingPanel
    :open="open"
    :anchor="trigger"
    placement="bottom-start"
    :offset="{ mainAxis: 4 }"
    match-anchor-width="min"
    fit-viewport-height
    :branches="() => [trigger]"
    :return-focus-on-escape="() => trigger"
    focusable
    :class="styles.positioner"
    @dismiss="open = false"
  >
    <template #default="{ placement }">
      <div
        :id="listboxId"
        :ref="setListbox"
        role="listbox"
        tabindex="-1"
        v-bind="{ ...listboxLabel, ...contentHooks(placement) }"
        :class="[styles.content, contentClassName]"
        @keydown="onListboxKeyDown"
      >
        <slot />
      </div>
    </template>
  </FloatingPanel>
</template>
