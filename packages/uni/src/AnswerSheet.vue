<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";
import {
  answerSheetLegend,
  answerSheetMoveIndex,
  answerSheetSections,
  answerSheetSummary,
  type AnswerSheetMove,
} from "@minerva/core";
import { useNativeId as useId } from "./native-id";
import { useI18n } from "./i18n";
type AnswerSheetStatus =
  "unanswered" | "answered" | "correct" | "wrong" | "skipped";
interface AnswerSheetItem {
  key: string;
  label?: string;
  status?: AnswerSheetStatus;
  flagged?: boolean;
  disabled?: boolean;
  group?: string;
}
const props = withDefaults(
  defineProps<{
    items: readonly AnswerSheetItem[];
    groups?: readonly { key: string; title: string }[];
    value?: string;
    modelValue?: string;
    defaultValue?: string;
    size?: "small" | "medium";
    layout?: "wrap" | "scroll";
    columns?: number;
    showLegend?: boolean;
    showSummary?: boolean;
    getItemLabel?: (item: AnswerSheetItem, index: number) => string;
    disabled?: boolean;
    ariaLabel?: string;
  }>(),
  {
    size: "medium",
    layout: "wrap",
    showLegend: false,
    showSummary: false,
    disabled: false,
  },
);
const emit = defineEmits<{
  change: [key: string];
  "update:modelValue": [key: string];
}>();
const { t, dir } = useI18n();
const uid = `mn-answer-sheet-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
const root = ref<{ $el?: Element } | Element | null>(null);
const localValue = ref(props.defaultValue ?? "");
const current = computed(
  () => props.modelValue ?? props.value ?? localValue.value,
);
const focused = ref("");
const sections = computed(() => answerSheetSections(props.items, props.groups));
const keys = computed(() =>
  sections.value.flatMap((section) =>
    section.entries.map((entry) => entry.item.key),
  ),
);
const active = computed(
  () =>
    [focused.value, current.value].find(
      (key) => key && keys.value.includes(key),
    ) ?? keys.value[0],
);
const columns = computed(() =>
  props.layout === "wrap" && props.columns && props.columns > 0
    ? Math.floor(props.columns)
    : 0,
);
const gridStyle = computed(() =>
  columns.value
    ? `grid-template-columns: repeat(${columns.value}, minmax(0, 1fr))`
    : undefined,
);
const summary = computed(() =>
  t("answerSheet.summary", answerSheetSummary(props.items)),
);
const legend = computed(() =>
  props.showLegend ? answerSheetLegend(props.items) : [],
);
const view = computed(() =>
  sections.value.map((section, sectionIndex) => ({
    key: section.key || "-",
    title: section.title,
    titleId: section.title ? `${uid}-group-${sectionIndex}` : undefined,
    pills: section.entries.map(({ item, index, status, label }) => ({
      item,
      index,
      status,
      label,
      current: current.value === item.key,
      disabled: props.disabled || !!item.disabled,
      ariaLabel:
        props.getItemLabel?.(item, index) ??
        t(item.flagged ? "answerSheet.itemFlagged" : "answerSheet.item", {
          number: item.label ?? index + 1,
          status: t(`answerSheet.status.${status}`),
        }),
    })),
  })),
);
function choose(item: AnswerSheetItem) {
  if (props.disabled || item.disabled || item.key === current.value) return;
  if (props.value === undefined && props.modelValue === undefined)
    localValue.value = item.key;
  emit("change", item.key);
  emit("update:modelValue", item.key);
}

// layout="scroll": the scroll-left of the row holding the current pill,
// centering it (never scroll-into-view: on H5 it scrolls the page too).
const instance = getCurrentInstance();
const scroll = ref({ row: -1, left: 0 });
/** Actual scroll offset of each row (the user may scroll) */
const offsets: number[] = [];
type Box = { left: number; right: number; width: number };
function measure(ids: string[], done: (boxes: (Box | null)[]) => void) {
  const host = root.value as { $el?: Element } | Element | null;
  const el = (host && "$el" in host ? host.$el : host) as Element | null;
  if (el?.querySelector) {
    done(
      ids.map(
        (id) => el.querySelector(`#${id}`)?.getBoundingClientRect() ?? null,
      ),
    );
    return;
  }
  try {
    const query = uni.createSelectorQuery?.().in(instance?.proxy);
    if (!query) return;
    const boxes: (Box | null)[] = [];
    ids.forEach((id, index) =>
      query.select(`#${id}`).boundingClientRect((rect: any) => {
        boxes[index] = rect ?? null;
      }),
    );
    query.exec(() => done(boxes));
  } catch {}
}
function revealCurrent() {
  if (props.layout !== "scroll") return;
  const row = view.value.findIndex((section) =>
    section.pills.some((pill) => pill.current),
  );
  if (row < 0) return;
  const pill = view.value[row]!.pills.find((entry) => entry.current)!;
  measure(
    [`${uid}-row-${row}`, `${uid}-grid-${row}`, `${uid}-q-${pill.index}`],
    ([box, content, target]) => {
      if (!box?.width || !content || !target) return;
      const max = Math.max(0, content.width - box.width);
      const rtl = dir.value === "rtl";
      // distance from the start of the content to the pill's center
      const center = rtl
        ? content.right - target.right + target.width / 2
        : target.left - content.left + target.width / 2;
      const distance = Math.min(
        max,
        Math.max(0, Math.round(center - box.width / 2)),
      );
      const left = rtl ? -distance : distance;
      const same = scroll.value.row === row && scroll.value.left === left;
      if (same && Math.abs((offsets[row] ?? left) - left) < 1) return;
      // the same value again (the user scrolled since) must still apply
      scroll.value = { row, left: same ? left + 0.01 : left };
    },
  );
}
function onScroll(row: number, event: { detail?: { scrollLeft?: number } }) {
  offsets[row] = event.detail?.scrollLeft ?? offsets[row] ?? 0;
}
onMounted(() => nextTick(revealCurrent));
watch(
  [() => props.layout, current, () => keys.value.includes(current.value)],
  () => nextTick(revealCurrent),
);
const MOVES: Record<string, AnswerSheetMove> = {
  ArrowUp: "up",
  ArrowDown: "down",
  Home: "first",
  End: "last",
};
function focusKey(key: string) {
  focused.value = key;
  void nextTick(() => {
    const host = root.value as { $el?: Element } | Element | null;
    const el = (host && "$el" in host ? host.$el : host) as Element | null;
    const target = Array.from(
      el?.querySelectorAll?.<HTMLElement>("[data-key]") ?? [],
    ).find((pill) => pill.dataset.key === key);
    target?.focus?.();
  });
}
function keydown(event: KeyboardEvent, item: AnswerSheetItem, index: number) {
  if (event.isComposing) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (!event.repeat) choose(item);
    return;
  }
  const rtl = dir.value === "rtl";
  const move: AnswerSheetMove | undefined =
    event.key === "ArrowLeft"
      ? rtl
        ? "next"
        : "previous"
      : event.key === "ArrowRight"
        ? rtl
          ? "previous"
          : "next"
        : MOVES[event.key];
  if (!move) return;
  event.preventDefault();
  const next = answerSheetMoveIndex(
    sections.value,
    index,
    move,
    columns.value || undefined,
  );
  if (next !== null && keys.value[next]) focusKey(keys.value[next]!);
}
</script>
<template>
  <view
    ref="root"
    class="mn-answer-sheet"
    :class="[
      `mn-size-${size}`,
      `mn-layout-${layout}`,
      { 'mn-disabled': disabled },
    ]"
    role="navigation"
    data-minerva="answer-sheet"
    data-part="root"
    :aria-label="ariaLabel ?? t('answerSheet.label')"
  >
    <text
      v-if="showSummary"
      class="mn-answer-sheet__summary"
      data-part="total"
      >{{ summary }}</text
    >
    <view
      v-for="(section, sectionIndex) in view"
      :key="section.key"
      class="mn-answer-sheet__section"
      data-part="group"
      :role="section.titleId ? 'group' : undefined"
      :aria-labelledby="section.titleId"
    >
      <text
        v-if="section.titleId"
        :id="section.titleId"
        class="mn-answer-sheet__title"
        data-part="group-label"
        >{{ section.title }}</text
      >
      <scroll-view
        v-if="layout === 'scroll'"
        :id="`${uid}-row-${sectionIndex}`"
        class="mn-answer-sheet__scroller"
        scroll-x
        :show-scrollbar="false"
        :scroll-left="scroll.row === sectionIndex ? scroll.left : undefined"
        @scroll="onScroll(sectionIndex, $event)"
        ><view
          :id="`${uid}-grid-${sectionIndex}`"
          class="mn-answer-sheet__grid"
          data-part="grid"
          ><view
            v-for="pill in section.pills"
            :id="`${uid}-q-${pill.index}`"
            :key="pill.item.key"
            class="mn-answer-sheet__item"
            :class="[
              `mn-status-${pill.status}`,
              {
                'mn-current': pill.current,
                'mn-flagged': pill.item.flagged,
                'mn-disabled': pill.disabled,
              },
            ]"
            role="button"
            data-part="item"
            :data-key="pill.item.key"
            :aria-current="pill.current ? 'step' : undefined"
            :aria-disabled="pill.disabled || undefined"
            :aria-label="pill.ariaLabel"
            :tabindex="pill.item.key === active ? 0 : -1"
            @focus="focused = pill.item.key"
            @tap="choose(pill.item)"
            @keydown="keydown($event, pill.item, pill.index)"
            ><text aria-hidden="true">{{ pill.label }}</text
            ><view
              v-if="pill.item.flagged"
              class="mn-answer-sheet__flag"
              data-part="indicator"
              aria-hidden="true"
            ></view></view></view
      ></scroll-view>
      <view
        v-else
        class="mn-answer-sheet__grid"
        :class="{ 'mn-columns': columns > 0 }"
        :style="gridStyle"
        data-part="grid"
      >
        <view
          v-for="pill in section.pills"
          :key="pill.item.key"
          class="mn-answer-sheet__item"
          :class="[
            `mn-status-${pill.status}`,
            {
              'mn-current': pill.current,
              'mn-flagged': pill.item.flagged,
              'mn-disabled': pill.disabled,
            },
          ]"
          role="button"
          data-part="item"
          :data-key="pill.item.key"
          :aria-current="pill.current ? 'step' : undefined"
          :aria-disabled="pill.disabled || undefined"
          :aria-label="pill.ariaLabel"
          :tabindex="pill.item.key === active ? 0 : -1"
          @focus="focused = pill.item.key"
          @tap="choose(pill.item)"
          @keydown="keydown($event, pill.item, pill.index)"
          ><text aria-hidden="true">{{ pill.label }}</text
          ><view
            v-if="pill.item.flagged"
            class="mn-answer-sheet__flag"
            data-part="indicator"
            aria-hidden="true"
          ></view
        ></view>
      </view>
    </view>
    <view
      v-if="legend.length"
      class="mn-answer-sheet__legend"
      data-part="legend"
      role="list"
    >
      <view
        v-for="entry in legend"
        :key="entry"
        class="mn-answer-sheet__legend-item"
        data-part="legend-item"
        role="listitem"
        ><view
          class="mn-answer-sheet__swatch"
          :class="`mn-status-${entry}`"
          aria-hidden="true"
        ></view
        ><text>{{ t(`answerSheet.legend.${entry}`) }}</text></view
      >
    </view>
  </view>
</template>
