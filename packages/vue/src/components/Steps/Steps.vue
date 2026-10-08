<script setup lang="ts">
/**
 * Steps: the stages of a workflow as an ordered list (<ol> / <li>). Earlier
 * steps are marked complete and the current one with aria-current="step".
 * When navigable, each step is a native button inside its list item (the
 * current button carries aria-current), so moving between steps works with
 * the keyboard. Without a `change` / `update:modelValue` listener (or with
 * `readOnly`) the steps are a plain read-only progress indicator: no
 * buttons, aria-current sits on the <li>. Attributes fall through to the
 * `<ol>` (`aria-label` overrides the localized default).
 */
import {
  computed,
  getCurrentInstance,
  useAttrs,
  type FunctionalComponent,
  type VNodeChild,
} from "vue";
import styles from "@react-styles/components/Steps/steps.module.scss";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import { useI18n } from "../../config/useI18n";
import type { StepsItem, StepsProps } from "./types";

defineOptions({ name: "Steps", inheritAttrs: false });

const props = withDefaults(defineProps<StepsProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  readOnly: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  /** The value of the step the user navigates to */
  change: [value: string];
}>();

defineSlots<{
  /** Label of a step (defaults to `item.label`) */
  label?: (props: { item: StepsItem; index: number }) => unknown;
}>();

const attrs = useAttrs();
const instance = getCurrentInstance();
const { t } = useI18n();

const Render: FunctionalComponent<{ content: VNodeChild }> = (p) =>
  p.content as never;
Render.props = ["content"];

// "" matches no step: nothing is current until a value is given
const current = useControllable<string>(props, "modelValue", {
  defaultProp: "defaultValue",
  fallback: "",
  name: "Steps",
  onChange: (value) => emit("change", value),
});

/** Navigable only with a listener (re-evaluated on every render) */
const isReadOnly = () => {
  if (props.readOnly !== undefined) return props.readOnly;
  const vnodeProps = instance?.vnode.props ?? {};
  return !vnodeProps.onChange && !vnodeProps["onUpdate:modelValue"];
};

const currentIndex = computed(() =>
  props.items.findIndex((item) => item.value === current.value),
);

const rootAttrs = (readOnly: boolean) => ({
  ...attrs,
  ...hooks("steps", "root", { readonly: readOnly }),
});

const itemHooks = (index: number, item: StepsItem, readOnly: boolean) => {
  const isCurrent = index === currentIndex.value;
  const isComplete = currentIndex.value > -1 && index < currentIndex.value;
  return hooks("steps", "item", {
    current: isCurrent,
    disabled: !readOnly && item.disabled,
    // the current step has `current` and no status
    status: isCurrent ? undefined : isComplete ? "complete" : "upcoming",
  });
};

function select(item: StepsItem, index: number) {
  if (index !== currentIndex.value) current.value = item.value;
}
</script>

<template>
  <ol
    :aria-label="t('steps.label')"
    :class="styles.steps"
    v-bind="rootAttrs(isReadOnly())"
  >
    <li
      v-for="(item, index) in items"
      :key="item.value"
      :class="[
        styles.step,
        index === currentIndex && styles.current,
        currentIndex > -1 && index < currentIndex && styles.complete,
      ]"
      :aria-current="
        isReadOnly() && index === currentIndex ? 'step' : undefined
      "
      v-bind="itemHooks(index, item, isReadOnly())"
    >
      <component
        :is="isReadOnly() ? 'span' : 'button'"
        :type="isReadOnly() ? undefined : 'button'"
        :class="[styles.button, isReadOnly() && styles.static]"
        :disabled="isReadOnly() ? undefined : item.disabled"
        :aria-current="
          !isReadOnly() && index === currentIndex ? 'step' : undefined
        "
        v-bind="hooks('steps', 'button')"
        @click="isReadOnly() || select(item, index)"
      >
        <span
          :class="styles.number"
          aria-hidden="true"
          v-bind="hooks('steps', 'indicator')"
          >{{ index + 1 }}</span
        >
        <span :class="styles.label" v-bind="hooks('steps', 'label')">
          <slot name="label" :item="item" :index="index">
            <Render :content="item.label" />
          </slot>
        </span>
      </component>
    </li>
  </ol>
</template>
