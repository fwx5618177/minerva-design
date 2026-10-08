import {
  Comment,
  Fragment,
  inject,
  Text,
  type Component,
  type InjectionKey,
  type Ref,
  type VNode,
} from "vue";

/** Metadata of an option, known before the listbox is rendered. */
export interface ItemRecord {
  value: string;
  disabled: boolean;
  /** Typeahead text: `textValue`, else the text content of the label. */
  text: string;
  /** Content shown in the trigger when the option is selected. */
  label: () => unknown;
}

export interface SelectContext {
  value: Ref<string>;
  highlighted: Ref<string | null>;
  highlight: (value: string) => void;
  select: (value: string) => void;
  registerItem: (record: ItemRecord) => void;
}

export const SELECT_KEY: InjectionKey<SelectContext> = Symbol("minerva-select");

export function useSelectContext(component: string): SelectContext {
  const context = inject(SELECT_KEY, null);
  if (!context) throw new Error(`<${component}> must be used inside <Select>`);
  return context;
}

export interface GroupContext {
  labelId: string;
  hasLabel: Ref<boolean>;
}

export const GROUP_KEY: InjectionKey<GroupContext> = Symbol(
  "minerva-select-group",
);

type SlotFn = (...args: unknown[]) => unknown;
type SlotChildren = { default?: SlotFn } | null;

const asNodes = (value: unknown): unknown[] =>
  Array.isArray(value) ? value : value == null ? [] : [value];

/** Plain text of slot content (text vnodes and nested children). */
export function nodeText(content: unknown): string {
  if (typeof content === "string" || typeof content === "number") {
    return `${content}`;
  }
  if (Array.isArray(content)) return content.map(nodeText).join("");
  if (!content || typeof content !== "object") return "";
  const node = content as VNode;
  if (node.type === Comment) return "";
  if (node.type === Text) return String(node.children ?? "");
  const children = node.children as unknown;
  if (typeof children === "string" || Array.isArray(children)) {
    return nodeText(children);
  }
  const slot = (children as SlotChildren)?.default;
  return slot ? nodeText(slot()) : "";
}

/** A boolean prop as written in a vnode (`<SelectItem disabled>` is `""`). */
const flag = (value: unknown) =>
  value !== undefined && value !== null && value !== false;

/**
 * Option metadata collected from the default slot vnodes (SelectItem
 * elements, also inside groups / fragments), so the trigger can show the
 * selected label and the hidden native <select> can list every value while
 * the listbox is closed (on the server too). Options rendered by custom
 * wrapper components register themselves when the listbox mounts.
 */
export function collectItems(
  nodes: unknown,
  itemType: Component,
  out: ItemRecord[] = [],
): ItemRecord[] {
  for (const raw of asNodes(nodes)) {
    if (Array.isArray(raw)) {
      collectItems(raw, itemType, out);
      continue;
    }
    if (!raw || typeof raw !== "object") continue;
    const node = raw as VNode;
    const children = node.children as unknown;
    if (node.type === itemType) {
      const props = (node.props ?? {}) as Record<string, unknown>;
      const slot = (children as SlotChildren)?.default;
      const textValue = (props.textValue ?? props["text-value"]) as
        string | undefined;
      out.push({
        value: String(props.value),
        disabled: flag(props.disabled),
        text: textValue ?? (slot ? nodeText(slot()) : ""),
        label: () => slot?.(),
      });
      continue;
    }
    if (node.type === Fragment || Array.isArray(children)) {
      collectItems(children, itemType, out);
      continue;
    }
    const slot = (children as SlotChildren)?.default;
    if (slot && typeof node.type !== "string") {
      collectItems(slot(), itemType, out);
    }
  }
  return out;
}
