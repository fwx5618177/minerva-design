<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "./i18n";
interface Node {
  id?: string;
  value?: string;
  label: string;
  description?: string;
  href?: string;
  icon?: string;
  endContent?: string;
  disabled?: boolean;
  children?: Node[];
}
interface Section {
  id: string;
  title?: string;
  items: Node[];
}
const props = withDefaults(
  defineProps<{
    sections?: Section[];
    items?: Node[];
    activeId?: string;
    value?: string;
    expandedIds?: string[];
    expandedKeys?: string[];
    defaultExpandedIds?: string[];
    disabled?: boolean;
    collapsed?: boolean;
    wrapLabels?: boolean;
    filter?: string | ((node: Node) => boolean);
    ariaLabel?: string;
  }>(),
  { items: () => [], defaultExpandedIds: () => [] },
);
const emit = defineEmits<{
  change: [id: string];
  select: [id: string];
  itemSelect: [item: Node];
  expandedChange: [ids: string[]];
  expandChange: [ids: string[]];
  "update:expandedIds": [ids: string[]];
}>();
const { t, dir } = useI18n();
const local = ref([...props.defaultExpandedIds]),
  explicitCollapsed = ref(new Set<string>());
const focused = ref("");
const id = (node: Node) => node.id ?? node.value ?? "";
const active = computed(() => props.activeId ?? props.value);
const expanded = computed(
  () => props.expandedIds ?? props.expandedKeys ?? local.value,
);
const sections = computed(
  () => props.sections ?? [{ id: "default", items: props.items }],
);
const ancestors = computed(() => {
  const set = new Set<string>();
  function visit(nodes: Node[]): boolean {
    return nodes.reduce((found, node) => {
      const descendant = !!node.children && visit(node.children);
      if (descendant) set.add(id(node));
      return found || id(node) === active.value || descendant;
    }, false);
  }
  for (const s of sections.value) visit(s.items);
  return set;
});
function matches(node: Node): boolean {
  return (
    !props.filter ||
    (typeof props.filter === "function"
      ? props.filter(node)
      : node.label.toLowerCase().includes(props.filter.toLowerCase())) ||
    !!node.children?.some(matches)
  );
}
function isExpanded(node: Node) {
  return (
    !props.collapsed &&
    ((!!props.filter && !!node.children?.some(matches)) ||
      expanded.value.includes(id(node)) ||
      (!explicitCollapsed.value.has(id(node)) && ancestors.value.has(id(node))))
  );
}
const flat = computed(() =>
  sections.value.map((section) => {
    const rows: { node: Node; depth: number; parent?: Node }[] = [];
    function walk(nodes: Node[], depth: number, parent?: Node) {
      for (const node of nodes) {
        if (!matches(node)) continue;
        rows.push({ node, depth, parent });
        if (node.children && isExpanded(node))
          walk(node.children, depth + 1, node);
      }
    }
    walk(section.items, 0);
    return { ...section, rows };
  }),
);
function state(node: Node, depth: number) {
  return {
    active: id(node) === active.value,
    ancestorActive: ancestors.value.has(id(node)),
    expanded: isExpanded(node),
    depth,
    collapsed: props.collapsed,
    hasChildren: !!node.children?.length,
    disabled: !!(props.disabled || node.disabled),
    className: "mn-tree-label",
  };
}
function toggle(node: Node) {
  if (props.disabled || node.disabled) return;
  const next = new Set(expanded.value),
    collapsed = new Set(explicitCollapsed.value);
  if (isExpanded(node)) {
    next.delete(id(node));
    collapsed.add(id(node));
  } else {
    next.add(id(node));
    collapsed.delete(id(node));
  }
  if (props.expandedIds === undefined && props.expandedKeys === undefined)
    local.value = [...next];
  explicitCollapsed.value = collapsed;
  emit("expandedChange", [...next]);
  emit("expandChange", [...next]);
  emit("update:expandedIds", [...next]);
}
function select(node: Node) {
  if (props.disabled || node.disabled) return;
  if (node.children?.length) toggle(node);
  emit("itemSelect", node);
  emit("change", id(node));
  emit("select", id(node));
  if (
    !node.children?.length &&
    node.href?.startsWith("/") &&
    !node.href.startsWith("//")
  )
    uni.navigateTo?.({ url: node.href });
}
function keydown(event: KeyboardEvent, node: Node) {
  if (props.disabled || node.disabled) return;
  const key =
    dir.value === "rtl"
      ? event.key === "ArrowLeft"
        ? "ArrowRight"
        : event.key === "ArrowRight"
          ? "ArrowLeft"
          : event.key
      : event.key;
  const rows = flat.value
    .flatMap((s) => s.rows)
    .filter((r) => !r.node.disabled);
  const index = rows.findIndex((r) => id(r.node) === id(node));
  let target: Node | undefined;
  if (key === "ArrowDown") target = rows[index + 1]?.node;
  else if (key === "ArrowUp") target = rows[index - 1]?.node;
  else if (key === "Home") target = rows[0]?.node;
  else if (key === "End") target = rows.at(-1)?.node;
  else if (key === "ArrowRight" && node.children?.length) {
    if (!isExpanded(node)) toggle(node);
    else target = rows[index + 1]?.node;
  } else if (key === "ArrowLeft") {
    if (node.children?.length && isExpanded(node)) toggle(node);
    else target = rows[index]?.parent;
  } else if (key === "Enter" || key === " ") {
    event.preventDefault();
    select(node);
    return;
  } else return;
  event.preventDefault();
  if (target) {
    focused.value = id(target);
    const root = (event.currentTarget as HTMLElement).closest?.(
      "[data-nav-tree]",
    );
    const button = root?.querySelector<HTMLElement>(
      `[data-tree-id="${id(target).replaceAll('"', '\\"')}"]`,
    );
    button?.focus?.();
  }
}
</script>
<template>
  <view
    class="mn-nav-tree mn-uni-nav-tree"
    data-nav-tree
    role="navigation"
    :aria-label="props.ariaLabel ?? t('navTree.label')"
    :class="{
      'mn-nav-collapsed': collapsed,
      'mn-nav-wrap': wrapLabels,
      'mn-nav-nowrap': !wrapLabels,
    }"
  >
    <view v-for="section in flat" :key="section.id"
      ><text v-if="section.title && !collapsed" class="mn-tree-heading">{{
        section.title
      }}</text
      ><view
        v-for="row in section.rows"
        :key="id(row.node)"
        class="mn-tree-row"
        :style="{ paddingInlineStart: `${row.depth * 20}px` }"
      >
        <slot
          name="link"
          :item="row.node"
          :state="state(row.node, row.depth)"
          :select="() => select(row.node)"
          ><button
            class="mn-option mn-tree-label"
            :data-tree-id="id(row.node)"
            :class="{
              'mn-active': active === id(row.node),
              'mn-ancestor-active': ancestors.has(id(row.node)),
            }"
            :aria-current="active === id(row.node) ? 'page' : undefined"
            :aria-expanded="
              row.node.children?.length ? isExpanded(row.node) : undefined
            "
            :aria-label="collapsed ? row.node.label : undefined"
            :disabled="disabled || row.node.disabled"
            @tap="select(row.node)"
            @keydown="keydown($event, row.node)"
          >
            <slot
              name="item"
              :item="row.node"
              :state="state(row.node, row.depth)"
              :select="() => select(row.node)"
              ><text v-if="row.node.icon">{{ row.node.icon }}</text
              ><view v-if="!collapsed"
                ><text>{{ row.node.label }}</text
                ><text
                  v-if="row.node.description && row.depth === 0"
                  class="mn-muted"
                  >{{ row.node.description }}</text
                ></view
              ><text v-if="!collapsed && row.node.endContent">{{
                row.node.endContent
              }}</text
              ><text v-if="row.node.children?.length && !collapsed">{{
                isExpanded(row.node) ? "−" : "+"
              }}</text></slot
            >
          </button></slot
        >
      </view></view
    >
  </view>
</template>
