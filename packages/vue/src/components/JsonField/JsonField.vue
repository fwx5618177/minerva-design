<script setup lang="ts">
/**
 * JsonField: strict-JSON textarea with a format button and accessible syntax
 * feedback (withheld while focused, re-checked on blur). `v-model` (or
 * `defaultValue`); FormControl-aware. The `class` goes to the wrapper; other
 * attributes and listeners go to the `<textarea>`.
 */
import { computed, ref, useAttrs, useId } from "vue";
import { applyEdits, createScanner, format } from "jsonc-parser";
import styles from "@react-styles/components/JsonField/jsonField.module.scss";
import { hooks } from "../../internal/hooks";
import {
  IconBraces,
  IconCircleAlert,
  IconCircleCheck,
} from "../../internal/icons";
import { useControllable } from "../../internal/controllable";
import { useFormControlContext } from "../../internal/form-control";
import { useI18n } from "../../config/useI18n";
import { IconButton } from "../IconButton";
import { Textarea } from "../Textarea";
import type { JsonFieldEmits, JsonFieldProps } from "./types";

defineOptions({ name: "JsonField", inheritAttrs: false });

const props = withDefaults(defineProps<JsonFieldProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  hideToolbar: false,
  indent: 2,
  formatLabel: undefined,
  validLabel: undefined,
  invalidLabel: undefined,
  rows: 8,
  spellCheck: false,
  variant: "outline",
  size: "medium",
  invalid: false,
  disabled: false,
  readOnly: false,
  required: false,
  id: undefined,
});
const emit = defineEmits<JsonFieldEmits>();

type Validation =
  { status: "empty" | "valid" } | { status: "invalid"; error: string };

function validate(value: string): Validation {
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

/**
 * Re-indents with jsonc-parser text edits, so numeric lexemes, escapes,
 * duplicate keys and key order are preserved (no JSON.parse round trip).
 */
function formatJson(value: string, indent: number): string {
  const spaces = Math.min(10, Math.max(0, Math.trunc(indent) || 0));
  if (spaces > 0) {
    return applyEdits(
      value,
      format(value, undefined, {
        tabSize: spaces,
        insertSpaces: true,
        eol: "\n",
      }),
    );
  }
  // Compact: concatenate the tokens, dropping whitespace between them.
  const scanner = createScanner(value, true);
  const tokens: string[] = [];
  while (scanner.getPosition() < value.length) {
    scanner.scan();
    const offset = scanner.getTokenOffset();
    tokens.push(value.slice(offset, offset + scanner.getTokenLength()));
  }
  return tokens.join("");
}

const attrs = useAttrs();
const { t } = useI18n();
const field = useFormControlContext();
const disabled = computed(() =>
  Boolean(props.disabled || field?.disabled.value),
);
const readOnly = computed(() =>
  Boolean(props.readOnly || field?.readOnly.value),
);
const required = computed(() =>
  Boolean(props.required || field?.required.value),
);
const statusId = `json-status-${useId()}`;

const text = useControllable<string>(props, "modelValue", {
  defaultProp: "defaultValue",
  fallback: "",
  name: "JsonField",
  onChange: (value) => emit("change", value),
});
const focused = ref(false);
const validation = computed<Validation>(() =>
  focused.value ? { status: "empty" } : validate(text.value),
);
const syntaxInvalid = computed(() => validation.value.status === "invalid");
const errorText = computed(() =>
  validation.value.status === "invalid" ? validation.value.error : "",
);

function formatNow() {
  if (
    disabled.value ||
    readOnly.value ||
    validate(text.value).status !== "valid"
  )
    return;
  text.value = formatJson(text.value, props.indent);
}

function onUpdate(value: string | number) {
  if (!disabled.value && !readOnly.value) text.value = String(value);
}

const textareaAttrs = computed(() => {
  const {
    class: _class,
    "aria-describedby": describedBy,
    "aria-invalid": ariaInvalid,
    spellcheck,
    ...rest
  } = attrs;
  return {
    ...rest,
    rows: props.rows,
    spellcheck: spellcheck ?? props.spellCheck,
    "aria-invalid":
      syntaxInvalid.value || props.invalid
        ? true
        : ariaInvalid === "false"
          ? false
          : ariaInvalid,
    "aria-describedby":
      [describedBy, syntaxInvalid.value ? statusId : undefined]
        .filter(Boolean)
        .join(" ") || undefined,
  };
});

const rootAttrs = computed(() => ({
  class: [styles.root, attrs.class],
  ...hooks("json-field", "root", {
    disabled: disabled.value,
    invalid: syntaxInvalid.value || props.invalid || !!field?.invalid.value,
    readonly: readOnly.value,
    required: required.value,
  }),
}));

const root = ref<HTMLDivElement | null>(null);
defineExpose({
  /** The native `<textarea>` (the React `ref`) */
  textarea: computed(
    () => root.value?.querySelector("textarea") as HTMLTextAreaElement | null,
  ),
});
</script>

<template>
  <div ref="root" v-bind="rootAttrs">
    <div
      v-if="!hideToolbar"
      :class="styles.toolbar"
      v-bind="hooks('json-field', 'toolbar')"
    >
      <IconButton
        type="button"
        :label="formatLabel ?? t('jsonField.format')"
        size="small"
        shape="square"
        :disabled="disabled || readOnly || !text.trim()"
        @click="formatNow"
      >
        <IconBraces :size="18" aria-hidden="true" />
      </IconButton>
    </div>
    <Textarea
      v-bind="textareaAttrs"
      :model-value="text"
      :variant="variant"
      :size="size"
      :id="id"
      :disabled="disabled"
      :read-only="readOnly"
      :required="required"
      :class="styles.textarea"
      @update:model-value="onUpdate"
      @focus="focused = true"
      @blur="focused = false"
    />
    <div
      :id="statusId"
      role="status"
      aria-live="polite"
      :class="[styles.status, syntaxInvalid && styles.statusInvalid]"
      v-bind="hooks('json-field', 'status')"
    >
      <template v-if="validation.status === 'valid'">
        <IconCircleCheck :size="16" aria-hidden="true" />
        <span>{{ validLabel ?? t("jsonField.valid") }}</span>
      </template>
      <template v-else-if="validation.status === 'invalid'">
        <IconCircleAlert :size="16" aria-hidden="true" />
        <span
          >{{ invalidLabel ?? t("jsonField.invalid") }}: {{ errorText }}</span
        >
      </template>
    </div>
  </div>
</template>
