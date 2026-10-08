<script setup lang="ts">
/**
 * KeyValueEditor: ordered list of editable string pairs (multi-line keys and
 * values), with add / remove actions. Rows are tracked by their stable `id`,
 * so duplicate keys and reordering are safe. Keyboard focus follows the
 * actions: adding a row focuses its key field; removing one focuses the next
 * row's remove button (else the previous one, else the add button).
 * `v-model` (or `defaultValue`); attributes fall through to the container.
 */
import {
  computed,
  onBeforeUpdate,
  onUpdated,
  ref,
  useAttrs,
  useId,
  watch,
  type ComponentPublicInstance,
} from "vue";
import styles from "@react-styles/components/KeyValueEditor/keyValueEditor.module.scss";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import { IconPlus, IconX } from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import { Button } from "../Button";
import { FormField } from "../FormControl";
import { IconButton } from "../IconButton";
import { Textarea } from "../Textarea";
import type { KeyValueEditorProps, KeyValueEntry } from "./types";

defineOptions({ name: "KeyValueEditor", inheritAttrs: false });

const props = withDefaults(defineProps<KeyValueEditorProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  disabled: false,
  keyLabel: undefined,
  valueLabel: undefined,
  addLabel: undefined,
  removeLabel: undefined,
  errors: undefined,
});

const emit = defineEmits<{
  /** The next rows (v-model) */
  "update:modelValue": [entries: KeyValueEntry[]];
  /** Called with the next rows after an edit, an addition or a removal */
  change: [entries: KeyValueEntry[]];
}>();

const attrs = useAttrs();
const { t } = useI18n();
const editorId = useId();
let nextId = 0;

const entries = useControllable<KeyValueEntry[]>(props, "modelValue", {
  defaultProp: "defaultValue",
  fallback: [],
  name: "KeyValueEditor",
  onChange: (next) => emit("change", next),
});

const keyText = computed(() => props.keyLabel ?? t("keyValueEditor.key"));
const valueText = computed(() => props.valueLabel ?? t("keyValueEditor.value"));
const removeText = computed(
  () => props.removeLabel ?? t("keyValueEditor.remove"),
);

// Focus management: without it, removing a row drops focus to <body> (the
// focused remove button unmounts) and a new row has to be found by hand.
type Target = Element | ComponentPublicInstance | null;
const elementOf = (target: Target): HTMLElement | null =>
  target instanceof HTMLElement
    ? target
    : ((target as ComponentPublicInstance | null)?.$el ?? null);
const keyFields = new Map<string, HTMLElement>();
const removeButtons = new Map<string, HTMLElement>();
let addButton: HTMLElement | null = null;
const track =
  (map: Map<string, HTMLElement>, id: string) => (target: Target) => {
    const el = elementOf(target);
    if (el) map.set(id, el);
    else map.delete(id);
  };
const setAddButton = (target: Target) => {
  addButton = elementOf(target);
};

// Reordered rows are moved in the DOM, which blurs a focused field: keep
// focus on it (React keeps it as it moves the other rows).
const root = ref<HTMLElement | null>(null);
let focused: HTMLElement | null = null;
onBeforeUpdate(() => {
  const active = document.activeElement as HTMLElement | null;
  focused = active && root.value?.contains(active) ? active : null;
});
onUpdated(() => {
  const el = focused;
  focused = null;
  if (el?.isConnected && document.activeElement !== el) {
    const active = document.activeElement;
    if (!active || active === document.body) el.focus();
  }
});

let pendingFocus:
  | { kind: "add"; id: string }
  | { kind: "remove"; id: string; nextId?: string }
  | null = null;

watch(
  entries,
  (list) => {
    const pending = pendingFocus;
    if (!pending) return;
    // Settled once the entries change (a controlled parent may reject it).
    pendingFocus = null;
    const has = (id?: string) => list.some((entry) => entry.id === id);
    if (pending.kind === "add") {
      if (has(pending.id)) keyFields.get(pending.id)?.focus();
    } else if (!has(pending.id)) {
      const next = pending.nextId && removeButtons.get(pending.nextId);
      (next || addButton)?.focus();
    }
  },
  { flush: "post" },
);

function add() {
  if (props.disabled) return;
  const list = entries.value;
  let id: string;
  do {
    id = `key-value-${editorId}-${nextId++}`;
  } while (list.some((entry) => entry.id === id));
  pendingFocus = { kind: "add", id };
  entries.value = [...list, { id, key: "", value: "" }];
}

function update(id: string, field: "key" | "value", text: string) {
  if (props.disabled) return;
  entries.value = entries.value.map((entry) =>
    entry.id === id ? { ...entry, [field]: text } : entry,
  );
}

function remove(id: string) {
  if (props.disabled) return;
  const list = entries.value;
  const index = list.findIndex((entry) => entry.id === id);
  const neighbour = list[index + 1] ?? list[index - 1];
  pendingFocus = { kind: "remove", id, nextId: neighbour?.id };
  entries.value = list.filter((entry) => entry.id !== id);
}

const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("key-value-editor", "root", { disabled: props.disabled }),
}));
</script>

<template>
  <div ref="root" :class="styles.root" v-bind="rootAttrs">
    <div
      v-for="(entry, index) in entries"
      :key="entry.id"
      :class="styles.row"
      v-bind="
        hooks('key-value-editor', 'row', {
          invalid: !!(errors?.[entry.id]?.key || errors?.[entry.id]?.value),
        })
      "
    >
      <FormField
        :disabled="disabled"
        :invalid="!!errors?.[entry.id]?.key"
        :error-message="errors?.[entry.id]?.key"
      >
        <template #label>
          {{ keyText }}<span :class="styles.srOnly">{{ ` ${index + 1}` }}</span>
        </template>
        <Textarea
          :ref="track(keyFields, entry.id)"
          :class="styles.key"
          size="small"
          :rows="1"
          :model-value="entry.key"
          @update:model-value="(text: string) => update(entry.id, 'key', text)"
        />
      </FormField>
      <FormField
        :disabled="disabled"
        :invalid="!!errors?.[entry.id]?.value"
        :error-message="errors?.[entry.id]?.value"
      >
        <template #label>
          {{ valueText
          }}<span :class="styles.srOnly">{{ ` ${index + 1}` }}</span>
        </template>
        <Textarea
          size="small"
          :rows="2"
          :model-value="entry.value"
          @update:model-value="
            (text: string) => update(entry.id, 'value', text)
          "
        />
      </FormField>
      <IconButton
        :ref="track(removeButtons, entry.id)"
        :class="styles.remove"
        type="button"
        :label="`${removeText} ${index + 1}`"
        size="small"
        shape="square"
        :disabled="disabled"
        @click="remove(entry.id)"
      >
        <IconX :size="16" aria-hidden="true" />
      </IconButton>
    </div>
    <Button
      :ref="setAddButton"
      :class="styles.add"
      type="button"
      color="neutral"
      variant="outline"
      size="small"
      :disabled="disabled"
      @click="add"
    >
      <IconPlus :size="16" aria-hidden="true" />
      <span>{{ addLabel ?? t("keyValueEditor.add") }}</span>
    </Button>
  </div>
</template>
