<script setup lang="ts">
/**
 * AnswerSheet: a grid of numbered pills to jump between the questions of a
 * practice or exam session (a `nav` landmark of buttons), grouped by
 * section, each with a status (unanswered, answered, correct, wrong,
 * skipped) and an optional flag. The current question carries
 * `aria-current="step"` and is `v-model`. Keyboard: a roving tab stop;
 * ArrowLeft / ArrowRight move in order, ArrowUp / ArrowDown by a row,
 * Home / End to the ends, Enter / Space select.
 */
import {
  computed,
  nextTick,
  onMounted,
  ref,
  shallowRef,
  useAttrs,
  useId,
  watch,
} from "vue";
import {
  answerSheetLegend,
  answerSheetMoveIndex,
  answerSheetSections,
  answerSheetSummary,
  type AnswerSheetMove,
} from "@minerva/core";
import { centerInScroller, nearestInRow } from "@minerva/dom";
import styles from "@react-styles/components/AnswerSheet/answerSheet.module.scss";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import { logicalArrowKey } from "../../internal/direction";
import { useI18n } from "../../config/useI18n";
import type { AnswerSheetItem, AnswerSheetProps } from "./types";

defineOptions({ name: "AnswerSheet", inheritAttrs: false });

const KEY_MOVES: Record<string, AnswerSheetMove> = {
  ArrowLeft: "previous",
  ArrowRight: "next",
  ArrowUp: "up",
  ArrowDown: "down",
  Home: "first",
  End: "last",
};

const props = withDefaults(defineProps<AnswerSheetProps>(), {
  groups: undefined,
  modelValue: undefined,
  defaultValue: undefined,
  size: "medium",
  layout: "wrap",
  columns: undefined,
  showLegend: false,
  showSummary: false,
  getItemLabel: undefined,
  disabled: false,
  "aria-label": undefined,
});

const emit = defineEmits<{
  /** `v-model`: the key of the selected question */
  "update:modelValue": [key: string];
  /** The key of the selected question */
  change: [key: string];
}>();

const attrs = useAttrs();
const { t } = useI18n();
const baseId = useId();
const root = shallowRef<HTMLElement | null>(null);

const value = useControllable<string | undefined>(props, "modelValue", {
  defaultProp: "defaultValue",
  fallback: undefined,
  onChange: (next) => {
    if (next !== undefined) emit("change", next);
  },
  name: "AnswerSheet",
});

const focusedKey = ref("");

// `aria-label` is a declared prop: Vue stores it camelized
const ariaLabel = computed(
  () => (props as unknown as { ariaLabel?: string }).ariaLabel,
);

const sections = computed(() => answerSheetSections(props.items, props.groups));
const keys = computed(() =>
  sections.value.flatMap((section) =>
    section.entries.map((entry) => entry.item.key),
  ),
);
// Roving tab stop: the focused pill, else the current one, else the first.
const activeKey = computed(
  () =>
    [focusedKey.value, value.value].find(
      (key) => key && keys.value.includes(key),
    ) ?? keys.value[0],
);
const gridColumns = computed(() =>
  props.layout === "wrap" && props.columns && props.columns > 0
    ? Math.floor(props.columns)
    : undefined,
);
const summary = computed(() => answerSheetSummary(props.items));
const legend = computed(() =>
  props.showLegend ? answerSheetLegend(props.items) : [],
);

function itemLabel(item: AnswerSheetItem, index: number, status: string) {
  if (props.getItemLabel) return props.getItemLabel(item, index);
  return t(item.flagged ? "answerSheet.itemFlagged" : "answerSheet.item", {
    number: item.label ?? index + 1,
    status: t(`answerSheet.status.${status}`),
  });
}

const pillOf = (key: string) =>
  Array.from(
    root.value?.querySelectorAll<HTMLElement>("[data-key]") ?? [],
  ).find((pill) => pill.dataset.key === key) ?? null;

function select(item: AnswerSheetItem) {
  if (props.disabled || item.disabled) return;
  value.value = item.key;
}

// layout="scroll": keep the current pill in view (scrolling the row only)
const currentInList = computed(
  () => value.value !== undefined && keys.value.includes(value.value),
);
function revealCurrent() {
  if (props.layout !== "scroll" || value.value === undefined) return;
  const pill = pillOf(value.value);
  if (pill?.parentElement) centerInScroller(pill.parentElement, pill);
}
onMounted(revealCurrent);
watch([() => props.layout, value, currentInList], revealCurrent, {
  flush: "post",
});

function focusKey(key: string) {
  focusedKey.value = key;
  void nextTick(() => pillOf(key)?.focus());
}

function onKeydown(event: KeyboardEvent, item: AnswerSheetItem, index: number) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (!event.repeat) select(item);
    return;
  }
  const from = event.currentTarget as HTMLElement;
  // RTL: the rows run right to left, so ArrowLeft is the next question.
  const move = KEY_MOVES[logicalArrowKey(event.key, from)];
  if (!move) return;
  event.preventDefault();
  let target: string | undefined;
  if ((move === "up" || move === "down") && !gridColumns.value) {
    // wrapping rows: the closest pill of the row above / below (measured)
    if (props.layout === "scroll") return;
    const pills = keys.value
      .map(pillOf)
      .filter((pill): pill is HTMLElement => !!pill);
    target = nearestInRow(pills, from, move === "down" ? 1 : -1)?.dataset.key;
  } else {
    const next = answerSheetMoveIndex(
      sections.value,
      index,
      move,
      gridColumns.value,
    );
    if (next !== null) target = keys.value[next];
  }
  if (target) focusKey(target);
}

const rootAttrs = computed(() => ({
  ...attrs,
  class: [
    styles.answerSheet,
    styles[props.size],
    props.layout === "scroll" && styles.scroll,
    attrs.class,
  ],
  ...hooks("answer-sheet", "root", {
    disabled: props.disabled,
    size: props.size,
    layout: props.layout,
  }),
}));
const gridStyle = computed(() =>
  gridColumns.value
    ? {
        gridTemplateColumns: `repeat(${gridColumns.value}, minmax(0, 1fr))`,
      }
    : undefined,
);
</script>

<template>
  <nav
    ref="root"
    v-bind="rootAttrs"
    :aria-label="ariaLabel ?? t('answerSheet.label')"
  >
    <p
      v-if="showSummary"
      :class="styles.summary"
      v-bind="hooks('answer-sheet', 'total')"
    >
      {{ t("answerSheet.summary", summary) }}
    </p>
    <div
      v-for="(section, sectionIndex) in sections"
      :key="section.key || '-'"
      :class="styles.section"
      :role="section.title ? 'group' : undefined"
      :aria-labelledby="
        section.title ? `${baseId}-group-${sectionIndex}` : undefined
      "
      v-bind="hooks('answer-sheet', 'group')"
    >
      <div
        v-if="section.title"
        :id="`${baseId}-group-${sectionIndex}`"
        :class="styles.sectionTitle"
        v-bind="hooks('answer-sheet', 'group-label')"
      >
        {{ section.title }}
      </div>
      <div
        :class="[styles.grid, gridColumns && styles.columns]"
        :style="gridStyle"
        v-bind="hooks('answer-sheet', 'grid')"
      >
        <button
          v-for="entry in section.entries"
          :key="entry.item.key"
          type="button"
          :class="[styles.item, styles[entry.status]]"
          v-bind="
            hooks('answer-sheet', 'item', {
              current: value === entry.item.key,
              disabled: disabled || !!entry.item.disabled,
              flagged: !!entry.item.flagged,
              status: entry.status,
            })
          "
          :data-key="entry.item.key"
          :aria-label="itemLabel(entry.item, entry.index, entry.status)"
          :aria-current="value === entry.item.key ? 'step' : undefined"
          :aria-disabled="disabled || entry.item.disabled || undefined"
          :tabindex="entry.item.key === activeKey ? 0 : -1"
          @focus="focusedKey = entry.item.key"
          @click="select(entry.item)"
          @keydown="onKeydown($event, entry.item, entry.index)"
        >
          {{ entry.label
          }}<span
            v-if="entry.item.flagged"
            :class="styles.flag"
            aria-hidden="true"
            v-bind="hooks('answer-sheet', 'indicator')"
          />
        </button>
      </div>
    </div>
    <ul
      v-if="legend.length"
      :class="styles.legend"
      v-bind="hooks('answer-sheet', 'legend')"
    >
      <li
        v-for="entry in legend"
        :key="entry"
        :class="styles.legendItem"
        v-bind="hooks('answer-sheet', 'legend-item')"
      >
        <span :class="[styles.swatch, styles[entry]]" aria-hidden="true" />{{
          t(`answerSheet.legend.${entry}`)
        }}
      </li>
    </ul>
  </nav>
</template>
