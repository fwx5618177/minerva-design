<script setup lang="ts">
/**
 * Search input + results of CommandDialog (internal). Mounted only while the
 * dialog is shown, so every opening starts with an empty query and the first
 * result active.
 */
import { computed, ref, useId, watch } from "vue";
import { commandSearchText, normalizeSearchText } from "@minerva/core";
import styles from "@react-styles/components/Command/command.module.scss";
import { hooks } from "../../internal/hooks";
import type { CommandItem } from "./types";

defineOptions({ name: "CommandPanel" });

const props = defineProps<{
  items: CommandItem[];
  maxResults: number;
  filter?: (items: CommandItem[], query: string) => CommandItem[];
  placeholder: string;
  resultsLabel: string;
}>();
const emit = defineEmits<{ select: [item: CommandItem] }>();
defineSlots<{ empty?: () => unknown; enter?: () => unknown }>();

const query = ref("");
const activeIndex = ref(0);
const baseId = useId();
const listId = `${baseId}-results`;

const results = computed(() => {
  const enabled = props.items.filter((item) => !item.disabled);
  const trimmed = query.value.trim();
  if (!trimmed) return enabled.slice(0, props.maxResults);
  if (props.filter) {
    return props.filter(enabled, trimmed).slice(0, props.maxResults);
  }
  const q = normalizeSearchText(trimmed);
  return enabled
    .filter((item) => normalizeSearchText(commandSearchText(item)).includes(q))
    .slice(0, props.maxResults);
});

const optionId = (index: number) => `${baseId}-option-${index}`;
const activeId = computed(() =>
  results.value[activeIndex.value] ? optionId(activeIndex.value) : undefined,
);

watch(
  activeId,
  (id) => {
    if (!id) return;
    document.getElementById(id)?.scrollIntoView?.({ block: "nearest" });
  },
  { flush: "post" },
);

const onInput = (event: Event) => {
  query.value = (event.target as HTMLInputElement).value;
  activeIndex.value = 0;
};

const onKeyDown = (event: KeyboardEvent) => {
  const last = Math.max(results.value.length - 1, 0);
  const moves: Record<string, (index: number) => number> = {
    ArrowDown: (index) => Math.min(index + 1, last),
    ArrowUp: (index) => Math.max(index - 1, 0),
    Home: () => 0,
    End: () => last,
  };
  const move = moves[event.key];
  if (move && (event.key.startsWith("Arrow") || !query.value)) {
    event.preventDefault();
    activeIndex.value = move(activeIndex.value);
    return;
  }
  const item = results.value[activeIndex.value];
  if (event.key === "Enter" && item) {
    event.preventDefault();
    emit("select", item);
  }
};
</script>

<template>
  <div :class="styles.search" v-bind="hooks('command-dialog', 'search')">
    <span :class="styles.searchIcon" aria-hidden="true">⌕</span>
    <input
      :class="styles.input"
      type="text"
      role="combobox"
      :aria-label="placeholder"
      aria-autocomplete="list"
      aria-expanded="true"
      :aria-controls="listId"
      :aria-activedescendant="activeId"
      autocomplete="off"
      spellcheck="false"
      :value="query"
      :placeholder="placeholder"
      v-bind="hooks('command-dialog', 'input')"
      @input="onInput"
      @keydown="onKeyDown"
    />
    <kbd :class="styles.enterHint" aria-hidden="true"
      ><slot name="enter"
    /></kbd>
  </div>
  <div
    :id="listId"
    :class="styles.results"
    role="listbox"
    :aria-label="resultsLabel"
    v-bind="hooks('command-dialog', 'list')"
  >
    <div
      v-if="results.length === 0"
      :class="styles.empty"
      v-bind="hooks('command-dialog', 'empty')"
    >
      <slot name="empty" />
    </div>
    <template v-else>
      <button
        v-for="(item, index) in results"
        :id="optionId(index)"
        :key="item.id"
        type="button"
        role="option"
        tabindex="-1"
        :aria-selected="index === activeIndex"
        :class="styles.item"
        v-bind="
          hooks('command-dialog', 'item', {
            highlighted: index === activeIndex,
          })
        "
        @mouseenter="activeIndex = index"
        @click="emit('select', item)"
      >
        <span :class="styles.copy">
          <strong>{{ item.title }}</strong>
          <small v-if="item.description">{{ item.description }}</small>
        </span>
        <span v-if="item.group" :class="styles.group">{{ item.group }}</span>
      </button>
    </template>
  </div>
</template>
