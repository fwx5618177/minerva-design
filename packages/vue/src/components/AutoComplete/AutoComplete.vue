<script setup lang="ts">
/**
 * AutoComplete: a text input (combobox) that suggests options from a list.
 * Supports grouping, custom rendering (`option` slot) and async loading; the
 * input text is `v-model` (or `defaultValue`). Focus stays in the input
 * (`aria-activedescendant`). For picking several values use `TagInput`.
 */
import {
  computed,
  getCurrentInstance,
  h,
  onMounted,
  ref,
  shallowRef,
  useAttrs,
  useId,
  watch,
  type FunctionalComponent,
  type VNodeChild,
} from "vue";
import { ESCAPE_CONSUMER_ATTRIBUTE } from "@minerva/dom";
import styles from "@react-styles/components/AutoComplete/autoComplete.module.scss";
import FloatingPanel from "../../internal/FloatingPanel.vue";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import { useFormControlProps } from "../../internal/form-control";
import { Input } from "../Input";
import { Empty } from "../Empty";
import { ProgressIndicator } from "../ProgressIndicator";
import type { AutoCompleteOption, AutoCompleteProps } from "./types";

defineOptions({ name: "AutoComplete", inheritAttrs: false });

const props = withDefaults(defineProps<AutoCompleteProps>(), {
  name: undefined,
  label: undefined,
  mode: "basic",
  modelValue: undefined,
  options: () => [],
  defaultValue: undefined,
  groupBy: undefined,
  loading: false,
  inputProps: undefined,
  emptyProps: undefined,
  dropdownClassName: undefined,
  placement: "bottom",
  offset: () => ({ x: 0, y: 4 }),
  animation: true,
  filterOption: undefined,
  sortOption: undefined,
  autoHighlight: false,
  fillOnSelect: true,
  groupMode: "first",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  /** The input text changed (typing or selecting an option) */
  change: [value: string];
  /** An option was picked (mouse or keyboard) */
  select: [option: AutoCompleteOption];
  /** An option was clicked with the mouse */
  optionClick: [option: AutoCompleteOption];
  /** The dropdown opened or closed */
  dropdownVisibleChange: [visible: boolean];
  /**
   * Enter was pressed while no option is active, with the trimmed text
   * (e.g. to run a search); the dropdown closes
   */
  submit: [value: string];
}>();

const slots = defineSlots<{
  /** Custom option content (`mode="custom"`, React `renderOption`) */
  option?: (props: { option: AutoCompleteOption }) => unknown;
  /** Custom content shown when no option matches (React `renderEmpty`) */
  empty?: () => unknown;
}>();

const PLACEMENT = {
  top: "top-start",
  bottom: "bottom-start",
  left: "left-start",
  right: "right-start",
} as const;

const attrs = useAttrs();
const instance = getCurrentInstance();
/** Whether a `submit` listener is bound (React: `onSubmit` is set) */
const hasSubmitListener = () => !!instance?.vnode.props?.onSubmit;
const inputValue = useControllable<string>(props, "modelValue", {
  defaultProp: "defaultValue",
  fallback: "",
  onChange: (next) => emit("change", next),
  name: "AutoComplete",
});

const visible = ref(false);
const setVisible = (next: boolean) => {
  if (visible.value === next) return;
  visible.value = next;
  emit("dropdownVisibleChange", next);
};
const focusedIndex = ref(-1);
const hoveredIndex = ref(-1);
const container = shallowRef<HTMLDivElement | null>(null);
const input = shallowRef<HTMLInputElement | null>(null);
const panel = ref<{ element: HTMLElement | null } | null>(null);
const vertical = computed(
  () => props.placement === "top" || props.placement === "bottom",
);

const baseId = useId();
const listboxId = `${baseId}-listbox`;
// IME composition in progress: Enter / arrows belong to the IME.
let composing = false;
const setComposing = (value: boolean) => {
  composing = value;
};

const inputReadOnly = () =>
  (props.inputProps?.readOnly ?? props.inputProps?.readonly) as
    boolean | undefined;

// FormControl wiring (id, disabled / read-only state). The input's own
// disabled / readOnly props still apply.
const field = useFormControlProps(() => ({
  id: props.inputProps?.id as string | undefined,
  disabled: props.inputProps?.disabled as boolean | undefined,
  readOnly: inputReadOnly(),
}));
const inputId = computed(() => field.value.id ?? `${baseId}-input`);
const blocked = computed(() => field.value.disabled || field.value.readOnly);
// A disabled / read-only field never shows (or keeps) the dropdown.
const shown = computed(() => visible.value && !blocked.value);

function open() {
  if (!blocked.value) setVisible(true);
}
function close() {
  setVisible(false);
  focusedIndex.value = -1;
}

const processedOptions = computed(() => {
  const value = inputValue.value;
  const search = value.toLowerCase();
  const result = props.options.filter((option) =>
    props.filterOption
      ? props.filterOption(value, option)
      : option.label.toLowerCase().includes(search),
  );
  return props.sortOption ? [...result].sort(props.sortOption) : result;
});

/** Groups in order of first appearance, or runs of adjacent options */
const groupedOptions = computed<[string, AutoCompleteOption[]][] | null>(() => {
  const groupBy = props.groupBy;
  if (!groupBy) return null;
  if (props.groupMode === "adjacent") {
    const runs: [string, AutoCompleteOption[]][] = [];
    processedOptions.value.forEach((option) => {
      const group = groupBy(option);
      const last = runs[runs.length - 1];
      if (last && last[0] === group) last[1].push(option);
      else runs.push([group, [option]]);
    });
    return runs;
  }
  const groups = new Map<string, AutoCompleteOption[]>();
  processedOptions.value.forEach((option) => {
    const group = groupBy(option);
    const list = groups.get(group);
    if (list) list.push(option);
    else groups.set(group, [option]);
  });
  return Array.from(groups.entries());
});

/** Options in display order; keyboard / hover indexes refer to this list */
const navigableOptions = computed(() =>
  groupedOptions.value
    ? groupedOptions.value.flatMap(([, list]) => list)
    : processedOptions.value,
);

// With autoHighlight the first enabled option is active until the user
// moves the highlight.
const activeIndex = computed(() =>
  focusedIndex.value >= 0
    ? focusedIndex.value
    : props.autoHighlight && shown.value
      ? navigableOptions.value.findIndex((option) => !option.disabled)
      : -1,
);

function moveFocus(step: 1 | -1) {
  const list = navigableOptions.value;
  const count = list.length;
  if (count === 0) return;
  // from "nothing focused", ArrowDown starts at the first option and
  // ArrowUp at the last one
  let index =
    activeIndex.value >= 0 ? activeIndex.value : step === 1 ? -1 : count;
  for (let i = 0; i < count; i += 1) {
    index = (index + step + count) % count;
    if (!list[index].disabled) {
      focusedIndex.value = index;
      return;
    }
  }
}

function handleOptionSelect(option: AutoCompleteOption) {
  if (option.disabled) return;
  if (props.fillOnSelect) inputValue.value = option.label;
  close();
  emit("select", option);
}

function handleKeyDown(event: KeyboardEvent) {
  if (
    blocked.value ||
    composing ||
    event.isComposing ||
    event.keyCode === 229
  ) {
    return;
  }
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      if (!visible.value) open();
      moveFocus(1);
      break;
    case "ArrowUp":
      event.preventDefault();
      if (!visible.value) open();
      moveFocus(-1);
      break;
    case "Enter": {
      const option = shown.value
        ? navigableOptions.value[activeIndex.value]
        : undefined;
      const text = inputValue.value.trim();
      if (option) {
        event.preventDefault();
        handleOptionSelect(option);
      } else if (hasSubmitListener() && text) {
        // No active option: submit the typed text (e.g. a search).
        event.preventDefault();
        emit("submit", text);
        close();
      }
      break;
    }
    case "Escape":
      // Open: the dropdown's dismissable layer closes it (topmost only).
      // Closed: clears the text (APG combobox), `change("")`.
      if (event !== closingEscape && !shown.value && inputValue.value !== "") {
        event.preventDefault();
        inputValue.value = "";
        focusedIndex.value = -1;
      }
      break;
    default:
      break;
  }
}

function handleInputChange(next: string) {
  inputValue.value = next;
  focusedIndex.value = -1;
  open();
}

function handleBlur(event: FocusEvent) {
  const next = event.relatedTarget as Node | null;
  const dropdown = panel.value?.element;
  if (next && (dropdown?.contains(next) || container.value?.contains(next))) {
    return;
  }
  close();
}

function handleOptionClick(option: AutoCompleteOption) {
  if (option.disabled || composing) return;
  handleOptionSelect(option);
  emit("optionClick", option);
  input.value?.focus();
}

function onOptionKeyDown(event: KeyboardEvent, option: AutoCompleteOption) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  handleOptionClick(option);
}

// Clicking the still-focused input (after a pick or Escape) reopens the
// dropdown; focus alone does not fire again.
function onInputClick() {
  if (!visible.value) open();
}

onMounted(() => {
  input.value = container.value?.querySelector("input") ?? null;
});

const optionId = (index: number) => `${listboxId}-option-${index}`;
const activeOptionId = computed(() =>
  shown.value && activeIndex.value >= 0
    ? optionId(activeIndex.value)
    : undefined,
);

// Keep the keyboard-focused option scrolled into view
watch(
  activeOptionId,
  (id) => {
    if (!id) return;
    const el = container.value?.ownerDocument.getElementById(id);
    el?.scrollIntoView?.({ block: "nearest" });
  },
  { flush: "post" },
);

/** Combobox semantics on the inner <input> (after `inputProps`: they win) */
const inputBindings = computed(() => ({
  ...props.inputProps,
  id: inputId.value,
  disabled: field.value.disabled,
  readOnly: field.value.readOnly,
  name: props.name,
  modelValue: inputValue.value,
  "onUpdate:modelValue": handleInputChange,
  role: "combobox",
  "aria-autocomplete": "list",
  "aria-expanded": String(shown.value),
  "aria-controls": shown.value ? listboxId : undefined,
  "aria-activedescendant": activeOptionId.value,
  // Closed with text: Escape clears it instead of closing an enclosing
  // Modal / Drawer / Popover
  [ESCAPE_CONSUMER_ATTRIBUTE]:
    !shown.value && inputValue.value !== "" ? "" : undefined,
}));

const panelOffset = computed(() => ({
  mainAxis: vertical.value ? props.offset.y : props.offset.x,
  crossAxis: vertical.value ? props.offset.x : props.offset.y,
}));

/**
 * The Escape that closed the dropdown (the layer handles it before the
 * input's own listener, and Vue state updates synchronously): it must not
 * also clear the text.
 */
let closingEscape: KeyboardEvent | null = null;
function onEscapeKeyDown(event: KeyboardEvent) {
  closingEscape = event;
  // Escape during IME composition cancels the composition only
  if (composing || event.isComposing) event.preventDefault();
}

const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("autocomplete", "root", {
    state: shown.value ? "open" : "closed",
    disabled: field.value.disabled,
    readonly: field.value.readOnly,
    loading: props.loading,
  }),
}));

/** Sections of the list: groups (with a heading unless "") or every option */
const sections = computed(() => {
  const groups = groupedOptions.value;
  if (!groups) {
    return [
      {
        key: "all",
        group: "",
        items: processedOptions.value.map((option, index) => ({
          option,
          index,
        })),
      },
    ];
  }
  const order = navigableOptions.value;
  return groups.map(([group, list], groupIndex) => ({
    key: `${groupIndex}-${group}`,
    group,
    items: list.map((option) => ({ option, index: order.indexOf(option) })),
  }));
});

/** An option of the listbox (`index` in display order) */
const OptionRow: FunctionalComponent<{
  option: AutoCompleteOption;
  index: number;
}> = ({ option, index }) => {
  const active = activeIndex.value === index;
  const highlighted = hoveredIndex.value === index || active;
  const icon = option.icon;
  const content =
    props.mode === "custom" && slots.option
      ? slots.option({ option })
      : h("div", { class: styles.basicOption }, [
          icon
            ? h(
                "span",
                { class: styles.icon },
                (typeof icon === "function"
                  ? (icon as () => VNodeChild)()
                  : icon) as never,
              )
            : null,
          h("div", { class: styles.content }, [
            h("div", { class: styles.label }, option.label),
            option.description
              ? h("div", { class: styles.description }, option.description)
              : null,
          ]),
        ]);
  return h(
    "div",
    {
      class: [
        styles.optionItem,
        option.disabled && styles.disabled,
        option.highlight && styles.highlight,
        highlighted && styles.active,
      ],
      style: option.style,
      role: "option",
      // Focus stays in the input (aria-activedescendant); -1 keeps the
      // option out of the tab order while making it programmatically
      // focusable.
      tabindex: -1,
      id: optionId(index),
      "aria-selected": active,
      "aria-disabled": option.disabled || undefined,
      // keep focus (and the open dropdown) in the input while clicking
      onMousedown: (event: MouseEvent) => event.preventDefault(),
      onClick: () => handleOptionClick(option),
      onKeydown: (event: KeyboardEvent) => onOptionKeyDown(event, option),
      onMouseenter: () => (hoveredIndex.value = index),
      onMouseleave: () => (hoveredIndex.value = -1),
      ...hooks("autocomplete", "item", {
        highlighted,
        disabled: option.disabled,
      }),
    },
    content as never,
  );
};
OptionRow.props = ["option", "index"];
</script>

<template>
  <div
    ref="container"
    :class="styles.autoComplete"
    v-bind="rootAttrs"
    @compositionstart="setComposing(true)"
    @compositionend="setComposing(false)"
  >
    <label
      v-if="label"
      :for="inputId"
      :class="styles.label"
      v-bind="hooks('autocomplete', 'label')"
    >
      {{ label }}
    </label>
    <Input
      v-bind="inputBindings"
      @focus="open"
      @blur="handleBlur"
      @keydown="handleKeyDown"
      @click="onInputClick"
    />

    <FloatingPanel
      ref="panel"
      :open="shown"
      :anchor="container"
      :placement="PLACEMENT[placement]"
      :offset="panelOffset"
      match-anchor-width="min"
      :branches="() => [container]"
      :return-focus-on-escape="() => input"
      :class="[styles.popup, dropdownClassName]"
      v-bind="hooks('autocomplete', 'content', { state: 'open' })"
      @escape-key-down="onEscapeKeyDown"
      @dismiss="close"
    >
      <div :class="[styles.dropdown, animation && styles.animated]">
        <!-- While open the listbox always exists (aria-controls target);
             loading / empty states are presentational rows inside it. -->
        <div
          :id="listboxId"
          :class="styles.optionList"
          role="listbox"
          :aria-label="label"
          :aria-busy="loading || undefined"
          v-bind="hooks('autocomplete', 'list')"
        >
          <div
            v-if="loading"
            role="presentation"
            :class="styles.loading"
            v-bind="hooks('autocomplete', 'loading')"
          >
            <ProgressIndicator />
          </div>
          <template v-else-if="processedOptions.length > 0">
            <template v-for="section in sections" :key="section.key">
              <!-- ungrouped options: no heading -->
              <template v-if="section.group === ''">
                <OptionRow
                  v-for="item in section.items"
                  :key="item.option.value"
                  :option="item.option"
                  :index="item.index"
                />
              </template>
              <div
                v-else
                :class="styles.optionGroup"
                role="group"
                :aria-label="section.group"
              >
                <div
                  :class="styles.groupLabel"
                  aria-hidden="true"
                  v-bind="hooks('autocomplete', 'group-label')"
                >
                  {{ section.group }}
                </div>
                <OptionRow
                  v-for="item in section.items"
                  :key="item.option.value"
                  :option="item.option"
                  :index="item.index"
                />
              </div>
            </template>
          </template>
          <div
            v-else
            role="presentation"
            :class="styles.empty"
            v-bind="hooks('autocomplete', 'empty')"
          >
            <slot name="empty"><Empty v-bind="emptyProps" /></slot>
          </div>
        </div>
      </div>
    </FloatingPanel>
  </div>
</template>
