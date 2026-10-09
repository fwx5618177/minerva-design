<script setup lang="ts">
import { computed, ref, provide } from "vue";
const props = withDefaults(
  defineProps<{ open?: boolean; defaultOpen?: boolean; modal?: boolean }>(),
  { open: undefined, modal: true },
);
const emit = defineEmits(["openChange", "update:open"]);
const local = ref(props.defaultOpen ?? false);
const open = computed(() => props.open ?? local.value);
function setOpen(v: boolean) {
  local.value = v;
  emit("openChange", v);
  emit("update:open", v);
}
const trigger = ref<unknown>();
provide("minerva:drawer", {
  open,
  setOpen,
  trigger,
  modal: computed(() => props.modal),
});
</script>
<template>
  <view class="mn-overlay-root"><slot :open="open" /></view>
</template>
