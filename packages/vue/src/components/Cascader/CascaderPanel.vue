<script setup lang="ts">
/** The columns of a Cascader: one listbox per expanded level. */
import { computed, onMounted, onUpdated, ref, useId } from "vue";
import styles from "@react-styles/components/Cascader/cascader.module.scss";
import { IconChevronRight } from "../../internal/icons";
import { hooks } from "../../internal/hooks";
import { logicalArrowKey } from "../../internal/direction";
import { useI18n } from "../../config/useI18n";
import type { CascaderOption, CascaderPanelProps } from "./types";

defineOptions({ name: "CascaderPanel" });

const OPTION_SELECTOR = '[role="option"]:not([aria-disabled="true"])';

const props = withDefaults(defineProps<CascaderPanelProps>(), {
  label: undefined,
  expandTrigger: "click",
  maxLevel: 6,
  optionStyle: undefined,
  autoFocus: false,
});
const emit = defineEmits<{
  /** An option was clicked or activated with the keyboard */
  activate: [path: CascaderOption[], level: number];
  /** An option was hovered (expandTrigger "hover") */
  hoverExpand: [path: CascaderOption[]];
  /** The user left the first column with ArrowLeft */
  exit: [];
}>();
const slots = defineSlots<{
  /** Custom option content */
  option?: (props: { option: CascaderOption; level: number }) => unknown;
}>();

const { t } = useI18n();
const panel = ref<HTMLElement | null>(null);
const idPrefix = useId();
const columnId = (level: number) => `${idPrefix}-column-${level}`;
// Column that should receive focus once rendered (keyboard expansion; the
// column of a lazily loaded option appears later). -1 = deepest column,
// used when the panel is opened from the keyboard.
let pendingFocus: number | null = props.autoFocus ? -1 : null;

// Columns: the root options, then the children of each expanded option
const columns = computed(() => {
  const result: CascaderOption[][] = [props.options];
  for (
    let i = 0;
    i < props.expandedPath.length && i < props.maxLevel - 1;
    i += 1
  ) {
    const children = props.expandedPath[i].children;
    if (!children?.length) break;
    result.push(children);
  }
  return result;
});

const columnEl = (level: number) =>
  panel.value?.querySelector<HTMLElement>(`[data-level="${level}"]`);

/** Focus the expanded / selected option of a column, or its first one. */
const focusColumn = (level: number) => {
  const column = columnEl(level);
  if (!column) return false;
  const target =
    column.querySelector<HTMLElement>("[data-expanded]") ??
    column.querySelector<HTMLElement>("[data-selected]") ??
    column.querySelector<HTMLElement>(OPTION_SELECTOR);
  target?.focus();
  return Boolean(target);
};

const applyPendingFocus = () => {
  if (pendingFocus === null) return;
  const level = pendingFocus === -1 ? columns.value.length - 1 : pendingFocus;
  if (focusColumn(level)) pendingFocus = null;
};
onMounted(applyPendingFocus);
onUpdated(applyPendingFocus);

const pathTo = (option: CascaderOption, level: number) => [
  ...props.expandedPath.slice(0, level),
  option,
];

const canExpand = (option: CascaderOption, level: number) =>
  level < props.maxLevel - 1 &&
  (Boolean(option.children?.length) ||
    (!option.isLeaf && option.children === undefined));

const activate = (option: CascaderOption, level: number) =>
  emit("activate", pathTo(option, level), level);

function onKeyDown(
  event: KeyboardEvent,
  option: CascaderOption,
  level: number,
) {
  const current = event.currentTarget as HTMLElement;
  const items = Array.from(
    current.parentElement!.querySelectorAll<HTMLElement>(OPTION_SELECTOR),
  );
  const index = items.indexOf(current);
  const focusAt = (i: number) =>
    items[(i + items.length) % items.length]?.focus();
  // RTL: columns open towards the left, so ArrowLeft expands.
  switch (logicalArrowKey(event.key, current)) {
    case "ArrowDown":
      event.preventDefault();
      focusAt(index + 1);
      break;
    case "ArrowUp":
      event.preventDefault();
      focusAt(index - 1);
      break;
    case "Home":
      event.preventDefault();
      focusAt(0);
      break;
    case "End":
      event.preventDefault();
      focusAt(items.length - 1);
      break;
    case "ArrowRight":
      event.preventDefault();
      if (option.disabled || !canExpand(option, level)) break;
      pendingFocus = level + 1;
      activate(option, level);
      break;
    case "Enter":
    case " ":
      event.preventDefault();
      if (option.disabled) break;
      if (canExpand(option, level)) pendingFocus = level + 1;
      activate(option, level);
      break;
    case "ArrowLeft":
      event.preventDefault();
      if (level === 0) emit("exit");
      else focusColumn(level - 1);
      break;
    default:
      break;
  }
}

function onMouseEnter(option: CascaderOption, level: number) {
  if (
    props.expandTrigger === "hover" &&
    !option.disabled &&
    option.children?.length &&
    level < props.maxLevel - 1
  ) {
    emit("hoverExpand", pathTo(option, level));
  }
}

/** The options of every column with their display state */
const rows = computed(() =>
  columns.value.map((columnOptions, level) =>
    columnOptions.map((option) => {
      const isExpanded = props.expandedPath[level]?.value === option.value;
      const isSelected = props.selectedPath[level]?.value === option.value;
      // the picked option (end of the selected path) has no children
      // column, even while on the expanded path
      const isPicked = isSelected && level === props.selectedPath.length - 1;
      return {
        option,
        isExpanded,
        isSelected,
        isPicked,
        showExpandIcon:
          canExpand(option, level) &&
          Boolean(option.children?.length || !option.isLeaf),
      };
    }),
  ),
);
</script>

<template>
  <div ref="panel" :class="styles.panel">
    <ul
      v-for="(columnRows, level) in rows"
      :id="columnId(level)"
      :key="level"
      :data-level="level"
      :class="styles.column"
      v-bind="hooks('cascader', 'column')"
      role="listbox"
      :aria-label="
        t('cascader.level', {
          label: label ?? t('cascader.options'),
          level: level + 1,
        })
      "
    >
      <li
        v-for="{
          option,
          isExpanded,
          isSelected,
          isPicked,
          showExpandIcon,
        } in columnRows"
        :key="option.value"
        :class="[
          styles.option,
          (isExpanded || isSelected) && styles.active,
          option.disabled && styles.disabled,
          option.loading && styles.loading,
        ]"
        :style="optionStyle"
        v-bind="
          hooks('cascader', 'item', {
            selected: isSelected,
            expanded: isExpanded && !isPicked,
            disabled: option.disabled,
            loading: option.loading,
          })
        "
        role="option"
        :aria-selected="isSelected"
        :aria-disabled="option.disabled || undefined"
        :aria-busy="option.loading || undefined"
        :aria-controls="
          isExpanded && level + 1 < columns.length
            ? columnId(level + 1)
            : undefined
        "
        :tabindex="option.disabled ? -1 : 0"
        @keydown="onKeyDown($event, option, level)"
        @click="!option.disabled && activate(option, level)"
        @mouseenter="onMouseEnter(option, level)"
      >
        <slot
          v-if="slots.option"
          name="option"
          :option="option"
          :level="level"
        />
        <template v-else>
          <span :class="styles.label">{{ option.label }}</span>
          <span
            v-if="option.loading"
            :class="styles.loadingIndicator"
            aria-hidden="true"
          >
            ...
          </span>
          <IconChevronRight
            v-else-if="showExpandIcon"
            :class="styles.expandIcon"
            aria-hidden="true"
          />
        </template>
      </li>
    </ul>
  </div>
</template>
