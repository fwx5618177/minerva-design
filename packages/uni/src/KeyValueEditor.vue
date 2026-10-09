<script setup lang="ts">
import { useI18n } from "./i18n";
const { t } = useI18n();
import { computed, ref, nextTick } from "vue";
import { useNativeId as useId } from "./native-id";
import { inheritForm } from "./form-context";
interface Entry {
  id: string;
  key: string;
  value: string;
}
interface LegacyEntry {
  id?: string;
  key: string;
  value: string;
}
const rawProps = withDefaults(
  defineProps<{
    entries?: Entry[];
    defaultEntries?: Entry[];
    value?: LegacyEntry[];
    modelValue?: LegacyEntry[];
    disabled?: boolean;
    readOnly?: boolean;
    keyLabel?: string;
    valueLabel?: string;
    addLabel?: string;
    removeLabel?: string;
    errors?: Record<string, { key?: string; value?: string }>;
  }>(),
  {
    defaultEntries: () => [],
  },
);
const props = inheritForm(rawProps);
const emit = defineEmits<{
  change: [entries: Entry[]];
  "update:entries": [entries: Entry[]];
  "update:modelValue": [entries: Entry[]];
}>();
const local = ref<Entry[]>([...props.defaultEntries]);
const prefix = useId();
let nextId = 0;
const legacyIds = new WeakMap<LegacyEntry, string>();
function ensureId(entry: LegacyEntry): Entry {
  if (entry.id) return entry as Entry;
  let id = legacyIds.get(entry);
  if (!id) {
    id = `key-value-${prefix}-legacy-${nextId++}`;
    legacyIds.set(entry, id);
  }
  return { ...entry, id };
}
const rows = computed(
  () =>
    props.entries ??
    (props.modelValue ?? props.value)?.map(ensureId) ??
    local.value,
);
const locked = computed(() => props.disabled || props.readOnly);
const focusId = ref<string>();
// A native textarea mutates before emitting. Reconcile its transient draft on
// the next render even when a controlled owner rejects the requested value.
const drafts = ref<Record<string, Partial<Pick<Entry, "key" | "value">>>>({});
function change(entries: Entry[]) {
  if (locked.value) return;
  if (
    props.entries === undefined &&
    props.modelValue === undefined &&
    props.value === undefined
  )
    local.value = entries;
  emit("change", entries);
  emit("update:entries", entries);
  emit("update:modelValue", entries);
}
function edit(id: string, field: "key" | "value", event: any) {
  if (locked.value) return;
  const text = String(event.detail?.value ?? event.target?.value ?? "");
  drafts.value[id] = { ...drafts.value[id], [field]: text };
  change(
    rows.value.map((row) => (row.id === id ? { ...row, [field]: text } : row)),
  );
  void nextTick(() => {
    if (drafts.value[id]) delete drafts.value[id][field];
  });
}
function add() {
  if (locked.value) return;
  let id: string;
  do {
    id = `key-value-${prefix}-${nextId++}`;
  } while (rows.value.some((row) => row.id === id));
  change([...rows.value, { id, key: "", value: "" }]);
  focusId.value = id;
}
function remove(id: string) {
  if (locked.value) return;
  change(rows.value.filter((row) => row.id !== id));
}
</script>
<template>
  <view
    class="mn-key-value"
    :class="{ 'mn-disabled': props.disabled }"
    :data-readonly="props.readOnly || undefined"
  >
    <view
      v-for="(row, index) in rows"
      :key="row.id"
      class="mn-row"
      :data-entry-id="row.id"
      :class="{
        'mn-invalid': !!(errors?.[row.id]?.key || errors?.[row.id]?.value),
      }"
      style="align-items: flex-start"
    >
      <view style="flex: 1; min-width: 0">
        <text>{{ keyLabel ?? t("keyValueEditor.key") }}</text>
        <textarea
          class="mn-input"
          :value="drafts[row.id]?.key ?? row.key"
          :maxlength="-1"
          :disabled="locked"
          :auto-height="true"
          :focus="focusId === row.id"
          :aria-label="`${keyLabel ?? t('keyValueEditor.key')} ${index + 1}`"
          :aria-invalid="!!errors?.[row.id]?.key"
          :aria-describedby="
            errors?.[row.id]?.key ? `${prefix}-${row.id}-key-error` : undefined
          "
          @input="edit(row.id, 'key', $event)"
        />
        <text
          v-if="errors?.[row.id]?.key"
          :id="`${prefix}-${row.id}-key-error`"
          role="alert"
          style="color: var(--danger-color)"
          >{{ errors[row.id].key }}</text
        >
      </view>
      <view style="flex: 1; min-width: 0">
        <text>{{ valueLabel ?? t("keyValueEditor.value") }}</text>
        <textarea
          class="mn-input"
          :value="drafts[row.id]?.value ?? row.value"
          :maxlength="-1"
          :disabled="locked"
          :auto-height="true"
          :aria-label="`${valueLabel ?? t('keyValueEditor.value')} ${index + 1}`"
          :aria-invalid="!!errors?.[row.id]?.value"
          :aria-describedby="
            errors?.[row.id]?.value
              ? `${prefix}-${row.id}-value-error`
              : undefined
          "
          @input="edit(row.id, 'value', $event)"
        />
        <text
          v-if="errors?.[row.id]?.value"
          :id="`${prefix}-${row.id}-value-error`"
          role="alert"
          style="color: var(--danger-color)"
          >{{ errors[row.id].value }}</text
        >
      </view>
      <button
        v-if="!props.readOnly"
        class="mn-close"
        :disabled="props.disabled"
        :aria-label="`${removeLabel ?? t('keyValueEditor.remove')} ${index + 1}`"
        @tap="remove(row.id)"
      >
        ×
      </button>
    </view>
    <button
      v-if="!props.readOnly"
      class="mn-button"
      :disabled="props.disabled"
      @tap="add"
    >
      {{ addLabel ?? t("keyValueEditor.add") }}
    </button>
  </view>
</template>
