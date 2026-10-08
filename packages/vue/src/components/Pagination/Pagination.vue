<script setup lang="ts">
/**
 * Pagination: page navigation (`<nav>` landmark) with page / prev / next /
 * jump buttons, an optional total, quick jumper, page size selector, simple
 * mode and compact page list. `v-model:current` / `v-model:pageSize`; the
 * `change` event receives (page, pageSize). Attributes fall through to the
 * `<nav>`.
 */
import {
  computed,
  nextTick,
  onBeforeUnmount,
  ref,
  useAttrs,
  watch,
  type FunctionalComponent,
  type VNodeChild,
} from "vue";
import {
  canGoToPage,
  createPaginationMachine,
  getPaginationItems,
  getPaginationKeyTarget,
  getPaginationVisibleRange,
  getTotalPages,
} from "@minerva/core";
import styles from "@react-styles/components/Pagination/pagination.module.scss";
import { hooks } from "../../internal/hooks";
import { useMachine } from "../../internal/machine";
import { logicalArrowKey } from "../../internal/direction";
import {
  IconChevronLeft,
  IconChevronRight,
  IconEllipsis,
} from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import type { PaginationItemType, PaginationProps } from "./types";

defineOptions({ name: "Pagination", inheritAttrs: false });

const props = withDefaults(defineProps<PaginationProps>(), {
  current: undefined,
  defaultCurrent: undefined,
  total: 0,
  pageSize: undefined,
  defaultPageSize: undefined,
  disabled: false,
  showQuickJumper: false,
  showSizeChanger: false,
  pageSizeOptions: () => [10, 20, 50, 100],
  itemRender: undefined,
  showTotal: false,
  totalRender: undefined,
  size: "medium",
  shape: "rounded",
  variant: "solid",
  simple: false,
  siblingCount: undefined,
  boundaryCount: undefined,
  hideEdges: false,
  hideNumbers: false,
  responsive: false,
  icons: undefined,
  labels: undefined,
});

const emit = defineEmits<{
  "update:current": [page: number];
  "update:pageSize": [pageSize: number];
  /** The page or the page size changed (a page size change resets to page 1) */
  change: [page: number, pageSize: number];
}>();

const slots = defineSlots<{
  /** Content of a page / prev / next / jump item (like `itemRender`) */
  item?: (props: { page: number; type: PaginationItemType }) => unknown;
  /** The total text (like `totalRender`) */
  total?: (props: { total: number; range: [number, number] }) => unknown;
  "prev-icon"?: () => unknown;
  "next-icon"?: () => unknown;
  "jump-prev-icon"?: () => unknown;
  "jump-next-icon"?: () => unknown;
  /** Visible text of the quick jumper (like `labels.jumpTo`) */
  "jump-to"?: () => unknown;
}>();

const attrs = useAttrs();
const { t } = useI18n();
const navRef = ref<HTMLElement | null>(null);

/** Renders a render-prop result (VNode, text, number) */
const Render: FunctionalComponent<{ content: VNodeChild }> = (p) =>
  p.content as never;
Render.props = ["content"];

// Page and page size (each controlled or not): core's pagination machine.
const { state, send } = useMachine(createPaginationMachine, () => ({
  page: props.current,
  defaultPage: props.defaultCurrent ?? 1,
  pageSize: props.pageSize,
  defaultPageSize: props.defaultPageSize ?? 10,
  total: props.total,
  disabled: props.disabled,
  onChange: (page: number, pageSize: number) => {
    if (page !== before.page) emit("update:current", page);
    if (pageSize !== before.pageSize) emit("update:pageSize", pageSize);
    emit("change", page, pageSize);
  },
}));

/** Values before an event (the machine reports the requested ones) */
let before = { ...state.value };
const dispatch = (event: Parameters<typeof send>[0]) => {
  before = { ...state.value };
  send(event);
};

const page = computed(() => state.value.page);
const currentPageSize = computed(() => state.value.pageSize);
// There is always at least one (possibly empty) page
const totalPages = computed(() =>
  getTotalPages(props.total, currentPageSize.value),
);

const jumpValue = ref("");
// Draft text of the simple-mode page input while the user is typing (null
// when not editing, so the input mirrors the current page)
const simpleDraft = ref<string | null>(null);

interface Ripple {
  x: number;
  y: number;
  id: number;
  itemKey: string;
}
const ripples = ref<Ripple[]>([]);
let nextRippleId = 0;
let rippleTimer: ReturnType<typeof setTimeout> | undefined;
watch(ripples, (list) => {
  clearTimeout(rippleTimer);
  if (list.length === 0) return;
  rippleTimer = setTimeout(() => (ripples.value = []), 1000);
});
onBeforeUnmount(() => clearTimeout(rippleTimer));

// Set when a page change should move focus to the active page button
// (keyboard navigation, or the focused button became disabled / removed)
let restoreFocus: { mode: "active" | "if-lost"; page: number } | null = null;

function changePage(target: number, focus: "active" | "if-lost" = "if-lost") {
  if (!canGoToPage(page.value, target, totalPages.value, props.disabled)) {
    return;
  }
  restoreFocus = { mode: focus, page: target };
  dispatch({ type: "GOTO", page: target });
  // A controlled parent that ignores the change: nothing to restore.
  if (page.value !== target) restoreFocus = null;
}

// Focus management after a page change (once the DOM is updated)
watch(
  page,
  () => {
    const request = restoreFocus;
    restoreFocus = null;
    const nav = navRef.value;
    if (!request || !nav || request.page !== page.value) return;
    const active = nav.ownerDocument.activeElement as HTMLElement | null;
    const lost =
      !active ||
      !nav.contains(active) ||
      (active as HTMLButtonElement).disabled === true;
    if (request.mode === "active" || lost) {
      const target =
        nav.querySelector<HTMLElement>('[aria-current="page"]') ??
        nav.querySelector<HTMLElement>("button:not(:disabled), input");
      target?.focus();
    }
  },
  { flush: "post" },
);

function onItemClick(target: number, itemKey: string, event: MouseEvent) {
  if (!canGoToPage(page.value, target, totalPages.value, props.disabled)) {
    return;
  }
  // Ripple only for pointer clicks (keyboard-triggered clicks have detail 0)
  if (event.detail > 0) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    ripples.value = [
      ...ripples.value,
      {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        id: nextRippleId++,
        itemKey,
      },
    ];
  }
  changePage(target);
}

// Arrow keys / Home / End on the page buttons (inputs keep their keys);
// RTL: the previous page is on the right, so ArrowRight goes back.
function onItemKeydown(event: KeyboardEvent) {
  const destination = getPaginationKeyTarget(
    logicalArrowKey(event.key, event.currentTarget as Element),
    page.value,
    totalPages.value,
  );
  if (destination === null) return;
  event.preventDefault();
  changePage(destination, "active");
}

function onJumpKeydown(event: KeyboardEvent) {
  if (event.key !== "Enter") return;
  // Enter in a text input would implicitly submit an enclosing form
  event.preventDefault();
  const value = parseInt(jumpValue.value, 10);
  if (!isNaN(value) && value >= 1 && value <= totalPages.value) {
    changePage(value);
    jumpValue.value = "";
  }
}

async function onSizeChange(event: Event) {
  const select = event.target as HTMLSelectElement;
  dispatch({ type: "SET_PAGE_SIZE", pageSize: parseInt(select.value, 10) });
  // A controlled parent may keep its page size: mirror it again.
  await nextTick();
  select.value = String(currentPageSize.value);
}

// Commits the simple-mode page: valid values clamped, invalid ones reverted
function commitSimpleDraft() {
  if (simpleDraft.value === null) return;
  const value = parseInt(simpleDraft.value, 10);
  simpleDraft.value = null;
  if (isNaN(value)) return;
  changePage(Math.min(Math.max(value, 1), totalPages.value));
}

function onSimpleKeydown(event: KeyboardEvent) {
  if (event.key !== "Enter") return;
  // Do not implicitly submit an enclosing form
  event.preventDefault();
  commitSimpleDraft();
}

function itemLabel(type: PaginationItemType, target: number): string {
  const labels = props.labels;
  switch (type) {
    case "prev":
      return labels?.prev ?? t("pagination.prev");
    case "next":
      return labels?.next ?? t("pagination.next");
    case "jump-prev":
      return labels?.jumpPrev ?? t("pagination.jumpPrev");
    case "jump-next":
      return labels?.jumpNext ?? t("pagination.jumpNext");
    default:
      return labels?.page?.(target) ?? t("pagination.page", { page: target });
  }
}

interface Item {
  key: string;
  type: PaginationItemType;
  page: number;
  active: boolean;
  disabled: boolean;
  label: string;
}

const toItem = (target: number, type: PaginationItemType): Item => ({
  // Stable keys: the focused button must survive page changes
  key: type === "page" ? `page-${target}` : type,
  type,
  page: target,
  active: type === "page" && target === page.value,
  disabled:
    props.disabled ||
    (type === "prev"
      ? page.value <= 1
      : type === "next"
        ? page.value >= totalPages.value
        : false),
  label: itemLabel(type, target),
});

type Entry =
  | ({ kind: "item" } & Item)
  | { kind: "ellipsis" | "simple" | "counter"; key: string };

const edge = (type: "prev" | "next"): Entry[] =>
  props.hideEdges
    ? []
    : [
        {
          kind: "item",
          ...toItem(type === "prev" ? page.value - 1 : page.value + 1, type),
        },
      ];

/** Everything between the total and the jumper, in DOM order */
const entries = computed<Entry[]>(() => {
  if (props.simple || props.hideNumbers) {
    return [
      ...edge("prev"),
      {
        kind: props.simple ? "simple" : "counter",
        key: props.simple ? "simple" : "counter",
      },
      ...edge("next"),
    ];
  }
  return getPaginationItems({
    page: page.value,
    totalPages: totalPages.value,
    siblingCount: props.siblingCount,
    boundaryCount: props.boundaryCount,
    hideEdges: props.hideEdges,
  }).map((item) =>
    item.kind === "ellipsis"
      ? { kind: "ellipsis", key: item.key }
      : { kind: "item", ...toItem(item.page, item.kind) },
  );
});

const iconSlot = (type: PaginationItemType) =>
  type === "prev"
    ? "prev-icon"
    : type === "next"
      ? "next-icon"
      : type === "jump-prev"
        ? "jump-prev-icon"
        : "jump-next-icon";
const iconProp = (type: PaginationItemType): VNodeChild =>
  type === "prev"
    ? props.icons?.prev
    : type === "next"
      ? props.icons?.next
      : type === "jump-prev"
        ? props.icons?.jumpPrev
        : props.icons?.jumpNext;
const defaultIcon = (type: PaginationItemType) =>
  type === "prev"
    ? IconChevronLeft
    : type === "next"
      ? IconChevronRight
      : IconEllipsis;

const visibleRange = computed(() =>
  getPaginationVisibleRange(page.value, currentPageSize.value, props.total),
);
const totalContent = computed<VNodeChild>(() => {
  const range = visibleRange.value;
  if (typeof props.showTotal === "function") {
    return props.showTotal(props.total, range);
  }
  if (props.totalRender) return props.totalRender(props.total, range);
  return (
    props.labels?.total?.(props.total) ??
    t("pagination.total", { total: props.total })
  );
});

const sizeOptions = computed(() =>
  props.pageSizeOptions.includes(currentPageSize.value)
    ? props.pageSizeOptions
    : [...props.pageSizeOptions, currentPageSize.value].sort((a, b) => a - b),
);
const sizeOptionLabel = (size: number) =>
  props.labels?.pageSizeOption?.(size) ??
  t("pagination.pageSizeOption", { size });

const classes = computed(() => [
  styles.pagination,
  props.disabled && styles.disabled,
  props.size === "small" && styles.small,
  props.size === "large" && styles.large,
  props.shape === "circle" && styles.circle,
  props.shape === "square" && styles.square,
  styles[props.variant],
  props.responsive && styles.responsive,
]);

const navAttrs = computed(() => ({
  ...attrs,
  ...hooks("pagination", "root", {
    disabled: props.disabled,
    size: props.size,
    shape: props.shape,
    variant: props.variant,
  }),
}));

const itemClass = (item: Item) => [
  styles.item,
  item.active && styles.active,
  item.disabled && styles.disabled,
  item.type === "prev" && styles.prev,
  item.type === "next" && styles.next,
  (item.type === "jump-prev" || item.type === "jump-next") && styles.jump,
];
const itemHooks = (item: Item) =>
  hooks("pagination", "item", {
    current: item.active,
    disabled: item.disabled,
  });
const ripplesOf = (key: string) =>
  ripples.value.filter((ripple) => ripple.itemKey === key);
</script>

<template>
  <nav
    ref="navRef"
    :aria-label="labels?.nav ?? t('pagination.nav')"
    :class="classes"
    v-bind="navAttrs"
  >
    <div
      v-if="showTotal !== false"
      :class="styles.total"
      aria-live="polite"
      aria-atomic="true"
      v-bind="hooks('pagination', 'total')"
    >
      <slot name="total" :total="total" :range="visibleRange">
        <Render :content="totalContent" />
      </slot>
    </div>

    <template v-for="entry in entries" :key="entry.key">
      <button
        v-if="entry.kind === 'item'"
        type="button"
        :class="itemClass(entry)"
        :disabled="entry.disabled"
        :aria-label="entry.label"
        :aria-current="entry.active ? 'page' : undefined"
        v-bind="itemHooks(entry)"
        @keydown="onItemKeydown"
        @click="onItemClick(entry.page, entry.key, $event)"
      >
        <Render
          v-if="itemRender"
          :content="itemRender(entry.page, entry.type)"
        />
        <slot v-else name="item" :page="entry.page" :type="entry.type">
          <template v-if="entry.type === 'page'">{{ entry.page }}</template>
          <slot
            v-else-if="entry.type === 'prev' || entry.type === 'next'"
            :name="iconSlot(entry.type)"
          >
            <Render
              v-if="iconProp(entry.type)"
              :content="iconProp(entry.type)"
            />
            <component
              :is="defaultIcon(entry.type)"
              v-else
              aria-hidden="true"
            />
          </slot>
          <span v-else :class="styles.jumpWrapper">
            <slot :name="iconSlot(entry.type)">
              <Render
                v-if="iconProp(entry.type)"
                :content="iconProp(entry.type)"
              />
              <component
                :is="defaultIcon(entry.type)"
                v-else
                aria-hidden="true"
              />
            </slot>
            <span :class="styles.jumpHint" aria-hidden="true">{{
              entry.label
            }}</span>
          </span>
        </slot>
        <span
          v-for="ripple in ripplesOf(entry.key)"
          :key="ripple.id"
          :class="styles.ripple"
          :style="{ left: `${ripple.x}px`, top: `${ripple.y}px` }"
          aria-hidden="true"
        />
      </button>
      <span
        v-else-if="entry.kind === 'ellipsis'"
        :class="styles.ellipsis"
        aria-hidden="true"
        >…</span
      >
      <div v-else-if="entry.kind === 'simple'" :class="styles.simpleInput">
        <input
          v-bind="hooks('pagination', 'simple-input')"
          :value="simpleDraft ?? String(page)"
          :disabled="disabled"
          :aria-label="labels?.currentPage ?? t('pagination.currentPage')"
          inputmode="numeric"
          @input="simpleDraft = ($event.target as HTMLInputElement).value"
          @keydown="onSimpleKeydown"
          @blur="commitSimpleDraft"
        />
        <span :class="styles.simpleDivider" aria-hidden="true">/</span>
        <span>{{ totalPages }}</span>
      </div>
      <span v-else :class="styles.counter" aria-live="polite"
        >{{ page }} / {{ totalPages }}</span
      >
    </template>

    <label
      v-if="showQuickJumper"
      :class="styles.jumper"
      v-bind="hooks('pagination', 'jumper')"
    >
      <slot name="jump-to">{{ labels?.jumpTo ?? t("pagination.jumpTo") }}</slot>
      <input
        v-model="jumpValue"
        :disabled="disabled"
        inputmode="numeric"
        :aria-label="labels?.jumpToInput ?? t('pagination.jumpToInput')"
        @keydown="onJumpKeydown"
      />
    </label>

    <div v-if="showSizeChanger" :class="styles.sizeChanger">
      <select
        v-bind="hooks('pagination', 'size-changer')"
        :value="currentPageSize"
        :disabled="disabled"
        :aria-label="labels?.pageSize ?? t('pagination.pageSize')"
        @change="onSizeChange"
      >
        <option v-for="option in sizeOptions" :key="option" :value="option">
          {{ sizeOptionLabel(option) }}
        </option>
      </select>
    </div>
  </nav>
</template>
