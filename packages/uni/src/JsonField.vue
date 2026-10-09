<script setup lang="ts">
import { computed, ref } from "vue";
import { useNativeId as useId } from "./native-id";
import { applyEdits, createScanner, format } from "jsonc-parser";
import { inheritForm } from "./form-context";
import { useI18n } from "./i18n";
import Textarea from "./Textarea.vue";
defineOptions({ inheritAttrs: false });
const raw = withDefaults(
  defineProps<{
    value?: string;
    modelValue?: string;
    defaultValue?: string;
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
    required?: boolean;
    hideToolbar?: boolean;
    indent?: number;
    formatLabel?: string;
    validLabel?: string;
    invalidLabel?: string;
    rows?: number;
    id?: string;
    name?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    placeholder?: string;
    maxLength?: number;
    variant?: "outline" | "filled" | "unstyled";
    size?: "small" | "medium" | "large";
  }>(),
  { indent: 2, rows: 8 },
);
const props = inheritForm(raw);
const { t } = useI18n();
const local = ref(props.defaultValue ?? ""),
  focused = ref(false);
const text = computed(() => props.modelValue ?? props.value ?? local.value);
const statusId = `mn-json-${useId().replace(/[^a-z0-9]/gi, "")}`;
function validation(value: string) {
  if (!value.trim()) return { status: "empty" };
  try {
    JSON.parse(value);
    return { status: "valid" };
  } catch (error) {
    return {
      status: "invalid",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
const status = computed(() =>
    focused.value ? { status: "empty" } : validation(text.value),
  ),
  invalid = computed(() => props.invalid || status.value.status === "invalid");
const emit = defineEmits<{
  change: [text: string];
  "update:modelValue": [text: string];
  error: [message: string];
  focus: [event: unknown];
  blur: [event: unknown];
}>();
function change(value: string) {
  if (props.disabled || props.readOnly) return;
  if (props.value === undefined && props.modelValue === undefined)
    local.value = value;
  emit("change", value);
  emit("update:modelValue", value);
  const result = validation(value);
  if (result.status === "invalid")
    emit("error", result.error ?? t("jsonField.invalid"));
}
function formatNow() {
  if (
    props.disabled ||
    props.readOnly ||
    validation(text.value).status !== "valid"
  )
    return;
  const spaces = Math.min(10, Math.max(0, Math.trunc(props.indent) || 0));
  if (spaces) {
    change(
      applyEdits(
        text.value,
        format(text.value, undefined, {
          tabSize: spaces,
          insertSpaces: true,
          eol: "\n",
        }),
      ),
    );
    return;
  }
  const scanner = createScanner(text.value, true),
    tokens: string[] = [];
  while (scanner.getPosition() < text.value.length) {
    scanner.scan();
    tokens.push(
      text.value.slice(
        scanner.getTokenOffset(),
        scanner.getTokenOffset() + scanner.getTokenLength(),
      ),
    );
  }
  change(tokens.join(""));
}
</script>
<template>
  <view class="mn-json-field"
    ><view v-if="!hideToolbar" class="mn-uni-json-toolbar"
      ><button
        class="mn-close"
        :aria-label="formatLabel ?? t('jsonField.format')"
        :disabled="props.disabled || props.readOnly || !text.trim()"
        @tap="formatNow"
      >
        { }
      </button></view
    ><Textarea
      v-bind="$attrs"
      :value="text"
      :rows="rows"
      :disabled="props.disabled"
      :read-only="props.readOnly"
      :invalid="invalid"
      :required="props.required"
      :id="id"
      :name="name"
      :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledby"
      :aria-describedby="[ariaDescribedby, statusId].filter(Boolean).join(' ')"
      :placeholder="placeholder"
      :max-length="maxLength"
      :variant="variant"
      :size="size"
      class="mn-code"
      @change="change"
      @focus="
        focused = true;
        emit('focus', $event);
      "
      @blur="
        focused = false;
        emit('blur', $event);
      "
    /><view
      :id="statusId"
      role="status"
      aria-live="polite"
      class="mn-json-status"
      :class="{ 'mn-error': status.status === 'invalid' }"
      ><template v-if="status.status === 'valid'">{{
        validLabel ?? t("jsonField.valid")
      }}</template
      ><template v-else-if="status.status === 'invalid'"
        >{{ invalidLabel ?? t("jsonField.invalid") }}:
        {{ status.error }}</template
      ></view
    ></view
  >
</template>
