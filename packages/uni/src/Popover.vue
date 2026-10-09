<script setup lang="ts">
import { ref, computed, provide, useSlots, type VNode } from "vue";
import { useNativeId as useId } from "./native-id";
import PopoverTrigger from "./PopoverTrigger.vue";
import PopoverContent from "./PopoverContent.vue";
import type { MiniPopoverContext } from "./popover-context";
const props = withDefaults(
  defineProps<{
    modal?: boolean;
    open?: boolean;
    defaultOpen?: boolean;
    content?: string;
    disabled?: boolean;
    placement?: string;
  }>(),
  { open: undefined, placement: "bottom" },
);
const emit = defineEmits(["openChange", "update:open"]);
const local = ref(props.defaultOpen ?? false);
const visible = computed(() => props.open ?? local.value);
const slots = useSlots();
function hasCompound(nodes: VNode[]): boolean {
  return nodes.some(
    (v) =>
      (typeof v.type === "object" &&
        "__name" in v.type &&
        String(v.type.__name).startsWith("Popover")) ||
      (Array.isArray(v.children) && hasCompound(v.children as VNode[])),
  );
}
const authored = computed(() => hasCompound(slots.default?.() ?? []));
function setOpen(value: boolean) {
  if (props.disabled) return;
  local.value = value;
  emit("openChange", value);
  emit("update:open", value);
}
const trigger = ref<any>(),
  anchor = ref<any>(),
  anchorId = ref("");
const triggerId = `mn-popover-trigger-${useId().replace(/[^a-z0-9]/gi, "")}`;
provide<MiniPopoverContext>("minerva:popover", {
  open: visible,
  modal: computed(() => !!props.modal),
  trigger,
  anchor,
  anchorId,
  triggerId,
  disabled: computed(() => props.disabled),
  placement: computed(() => props.placement),
  setOpen,
});
</script>
<template>
  <view class="mn-popover"
    ><slot v-if="authored" /><template v-else
      ><PopoverTrigger
        ><slot name="trigger"><slot /></slot></PopoverTrigger
      ><PopoverContent
        ><slot name="content">{{ content }}</slot
        ><button class="mn-close" @tap="setOpen(false)">
          ×
        </button></PopoverContent
      ></template
    ></view
  >
</template>
