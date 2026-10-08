<script setup lang="ts">
/**
 * NavTree: sidebar navigation with sections, nested expandable branches, an
 * active item and a compact (icon-only) mode.
 *
 * Keyboard: Tab moves through the items; ArrowDown / ArrowUp / Home / End
 * move between visible items; ArrowRight expands a branch (or enters it when
 * expanded); ArrowLeft collapses a branch or moves to the parent branch
 * (swapped in RTL). Attributes fall through to the `<nav>`.
 */
import {
  computed,
  Fragment,
  h,
  ref,
  useAttrs,
  type FunctionalComponent,
  type VNode,
  type VNodeChild,
} from "vue";
import { formatDevMessage, sanitizeUrl } from "@minerva/core";
import styles from "@react-styles/components/NavTree/navTree.module.scss";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import { logicalArrowKey } from "../../internal/direction";
import { IconChevronDown } from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import type { NavTreeItem, NavTreeItemState, NavTreeProps } from "./types";

defineOptions({ name: "NavTree", inheritAttrs: false });

const props = withDefaults(defineProps<NavTreeProps>(), {
  activeId: undefined,
  collapsed: false,
  wrapLabels: false,
  defaultExpandedIds: undefined,
  expandedIds: undefined,
  renderLink: undefined,
});

const emit = defineEmits<{
  "update:expandedIds": [expandedIds: string[]];
  /** The expanded branch ids after a branch was toggled */
  expandedChange: [expandedIds: string[]];
  /** A leaf link or a branch was activated */
  itemSelect: [item: NavTreeItem];
}>();

const slots = defineSlots<{
  /** Custom leaf link (like `renderLink`): render `content` inside */
  link?: (props: {
    item: NavTreeItem;
    content: VNode[];
    state: NavTreeItemState;
  }) => unknown;
}>();

const attrs = useAttrs();
const { t } = useI18n();

const ITEM_SELECTOR = `.${styles.item}`;
const CHILDREN_SELECTOR = `.${styles.children}`;

const expanded = useControllable<string[]>(props, "expandedIds", {
  defaultProp: "defaultExpandedIds",
  fallback: [],
  name: "NavTree",
  onChange: (ids) => emit("expandedChange", ids),
});

// Branches the user explicitly collapsed. An active descendant expands its
// ancestors by default; once the user collapses such a branch, that intent
// must win (tri-state, like VS Code / Storybook / Linear).
const explicitlyCollapsed = ref(new Set<string>());

function collectActiveAncestors(
  items: NavTreeItem[],
  activeId: string | undefined,
  ids: Set<string>,
): boolean {
  for (const item of items) {
    if (item.id === activeId) return true;
    if (item.children && collectActiveAncestors(item.children, activeId, ids)) {
      ids.add(item.id);
      return true;
    }
  }
  return false;
}

const activeAncestorIds = computed(() => {
  const ids = new Set<string>();
  for (const section of props.sections) {
    collectActiveAncestors(section.items, props.activeId, ids);
  }
  return ids;
});
const expandedSet = computed(() => new Set(expanded.value));

const isExpanded = (id: string) =>
  expandedSet.value.has(id) ||
  (!explicitlyCollapsed.value.has(id) && activeAncestorIds.value.has(id));

function setItemExpanded(item: NavTreeItem, open: boolean) {
  const nextExpanded = new Set(expandedSet.value);
  const nextCollapsed = new Set(explicitlyCollapsed.value);
  if (open) {
    nextExpanded.add(item.id);
    nextCollapsed.delete(item.id);
  } else {
    nextExpanded.delete(item.id);
    nextCollapsed.add(item.id);
  }
  expanded.value = Array.from(nextExpanded);
  explicitlyCollapsed.value = nextCollapsed;
}

function toggleItem(item: NavTreeItem) {
  setItemExpanded(item, !isExpanded(item.id));
  emit("itemSelect", item);
}

const warned = new Set<string>();
/** `href` through core's `sanitizeUrl` (javascript: / vbscript: dropped) */
function safeHref(href: string): string | undefined {
  const safe = sanitizeUrl(href);
  if (
    process.env.NODE_ENV !== "production" &&
    safe === undefined &&
    !warned.has(href)
  ) {
    warned.add(href);
    console.warn(
      formatDevMessage(
        "NavTree",
        `blocked an unsafe link URL (${JSON.stringify(href)}): javascript: and vbscript: URLs are never rendered.`,
      ),
    );
  }
  return safe;
}

/** Visible, enabled items of the tree in DOM (reading) order */
const focusableItems = (nav: HTMLElement) =>
  Array.from(nav.querySelectorAll<HTMLElement>(ITEM_SELECTOR)).filter(
    (el) =>
      !(el as HTMLButtonElement).disabled &&
      el.getAttribute("aria-disabled") !== "true",
  );

/**
 * Arrow-key navigation between the visible items, on the `<nav>` so it also
 * covers links rendered through `renderLink` / the `link` slot.
 */
function onNavKeydown(event: KeyboardEvent) {
  if (event.defaultPrevented) return;
  const nav = event.currentTarget as HTMLElement;
  const current = (event.target as HTMLElement).closest<HTMLElement>(
    ITEM_SELECTOR,
  );
  if (!current) return;
  const items = focusableItems(nav);
  const index = items.indexOf(current);
  let next: HTMLElement | null | undefined;
  // RTL: ArrowRight moves to the parent, ArrowLeft expands.
  switch (logicalArrowKey(event.key, nav)) {
    case "ArrowDown":
      next = items[index + 1];
      break;
    case "ArrowUp":
      next = index > 0 ? items[index - 1] : undefined;
      break;
    case "Home":
      next = items[0];
      break;
    case "End":
      next = items[items.length - 1];
      break;
    case "ArrowLeft":
      // An expanded branch collapses itself (its own handler); any other
      // nested item moves to its parent branch.
      if (current.getAttribute("aria-expanded") === "true") return;
      next = current
        .closest(CHILDREN_SELECTOR)
        ?.parentElement?.querySelector<HTMLElement>(
          `:scope > ${ITEM_SELECTOR}`,
        );
      break;
    default:
      return;
  }
  if (next) {
    event.preventDefault();
    next.focus();
  }
}

const Render: FunctionalComponent<{ content: VNodeChild }> = (p) =>
  p.content as never;
Render.props = ["content"];

function renderContent(item: NavTreeItem, hasChildren: boolean): VNode[] {
  const nodes: VNode[] = [
    h(
      "span",
      {
        class: styles.icon,
        "aria-hidden": "true",
        ...hooks("nav-tree", "icon"),
      },
      [h(Render, { content: item.icon })],
    ),
    h("span", { class: styles.copy }, [
      h(
        "span",
        { class: styles.label, ...hooks("nav-tree", "label") },
        item.label,
      ),
      item.description
        ? h(
            "small",
            {
              class: styles.description,
              ...hooks("nav-tree", "description"),
            },
            item.description,
          )
        : null,
    ]),
  ];
  if (!props.collapsed && (item.endContent || hasChildren)) {
    nodes.push(
      h("span", { class: styles.trailing }, [
        item.endContent
          ? h("span", { class: styles.end }, [
              h(Render, { content: item.endContent }),
            ])
          : null,
        hasChildren
          ? h("span", { class: styles.chevron, "aria-hidden": "true" }, [
              h(IconChevronDown, { size: 16, "stroke-width": 2 }),
            ])
          : null,
      ]),
    );
  }
  return nodes;
}

function renderItem(item: NavTreeItem, depth: number): VNodeChild {
  const hasChildren = Boolean(item.children?.length);
  const active = item.id === props.activeId;
  const ancestorActive = activeAncestorIds.value.has(item.id);
  const open = hasChildren && isExpanded(item.id);
  const disabled = Boolean(item.disabled);
  const itemClass = [
    styles.item,
    depth > 0 && styles.nested,
    active && styles.active,
    disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(" ");
  const title = item.description
    ? `${item.label} / ${item.description}`
    : item.label;
  const content = renderContent(item, hasChildren);

  if (hasChildren) {
    const onBranchKeydown = (event: KeyboardEvent) => {
      if (props.collapsed) return;
      const button = event.currentTarget as HTMLElement;
      const key = logicalArrowKey(event.key, button);
      if (key === "ArrowRight") {
        event.preventDefault();
        if (!open) setItemExpanded(item, true);
        else
          button.parentElement
            ?.querySelector<HTMLElement>(
              `${CHILDREN_SELECTOR} ${ITEM_SELECTOR}`,
            )
            ?.focus();
      } else if (key === "ArrowLeft" && open) {
        event.preventDefault();
        setItemExpanded(item, false);
      }
    };
    return h("div", { class: styles.branch, key: item.id }, [
      h(
        "button",
        {
          class: itemClass,
          type: "button",
          title,
          "aria-expanded": open,
          "data-ancestor-active": ancestorActive ? "true" : undefined,
          disabled,
          onClick: () => toggleItem(item),
          onKeydown: onBranchKeydown,
          ...hooks("nav-tree", "item", {
            current: active,
            expanded: open,
            disabled,
          }),
        },
        content,
      ),
      open && !props.collapsed
        ? h(
            "div",
            { class: styles.children },
            item.children!.map((child) => renderItem(child, depth + 1)),
          )
        : null,
    ]);
  }

  const state: NavTreeItemState = {
    active,
    ancestorActive,
    expanded: false,
    depth,
    collapsed: props.collapsed,
    hasChildren,
    disabled,
    className: itemClass,
  };
  if (slots.link) {
    return h(
      Fragment,
      { key: item.id },
      slots.link({ item, content, state }) as VNode[],
    );
  }
  if (props.renderLink) {
    return h(Fragment, { key: item.id }, [
      h(Render, { content: props.renderLink(item, content, state) }),
    ]);
  }

  const common = {
    key: item.id,
    class: itemClass,
    title,
    ...hooks("nav-tree", "item", { current: active, disabled }),
  };
  // A disabled entry is not a navigable link: no href, no handler.
  if (disabled) {
    return h(
      "span",
      { ...common, role: "link", "aria-disabled": "true" },
      content,
    );
  }
  // Without href the entry is an action (itemSelect), i.e. a button.
  if (item.href === undefined) {
    return h(
      "button",
      {
        ...common,
        type: "button",
        "aria-current": active ? "page" : undefined,
        onClick: () => emit("itemSelect", item),
      },
      content,
    );
  }
  return h(
    "a",
    {
      ...common,
      href: safeHref(item.href),
      "aria-current": active ? "page" : undefined,
      onClick: () => emit("itemSelect", item),
    },
    content,
  );
}

const navAttrs = computed(() => {
  const ariaLabel = attrs["aria-label"] as string | undefined;
  return {
    ...attrs,
    "aria-label":
      ariaLabel ?? (attrs["aria-labelledby"] ? undefined : t("navTree.label")),
    ...hooks("nav-tree", "root"),
  };
});
</script>

<template>
  <nav
    :class="[
      styles.navTree,
      collapsed && styles.collapsed,
      wrapLabels && !collapsed && styles.wrapLabels,
    ]"
    v-bind="navAttrs"
    @keydown="onNavKeydown"
  >
    <section
      v-for="section in sections"
      :key="section.id"
      :class="styles.section"
      v-bind="hooks('nav-tree', 'group')"
    >
      <h2
        v-if="section.title"
        :class="styles.sectionTitle"
        v-bind="hooks('nav-tree', 'group-label')"
      >
        {{ section.title }}
      </h2>
      <div :class="styles.list">
        <Render
          v-for="item in section.items"
          :key="item.id"
          :content="renderItem(item, 0)"
        />
      </div>
    </section>
  </nav>
</template>
