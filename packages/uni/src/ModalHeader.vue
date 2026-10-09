<script setup lang="ts">
import { h5Host, nativeAttribute } from "./host";
import { inject, onMounted, onBeforeUnmount, computed, type Ref } from "vue";
import { useNativeId as useId } from "./native-id";
defineOptions({ inheritAttrs: false });
const props = defineProps<{ id?: string }>();
const generated = `mn-dialog-heading-${useId().replace(/[^a-z0-9]/gi, "")}`;
const id = computed(() => props.id ?? generated);
const title = inject<Ref<string | undefined> | undefined>(
  "minerva:dialog-heading",
  undefined,
);
onMounted(() => {
  if (title) title.value = id.value;
});
onBeforeUnmount(() => {
  if (title?.value === id.value) title.value = undefined;
});
</script>
<template>
  <!-- #ifdef H5 -->
  <template v-if="h5Host">
    <view
      v-bind="$attrs"
      :id="id"
      class="mn-dialog-header"
      role="heading"
      aria-level="2"
      ><slot
    /></view>
  </template>
  <!-- #endif -->
  <!-- #ifndef H5 -->
  <template v-if="!h5Host">
    <view
      :style="$attrs['style']"
      :tabindex="nativeAttribute($attrs['tabindex'])"
      :aria-label="nativeAttribute($attrs['aria-label'])"
      :aria-labelledby="nativeAttribute($attrs['aria-labelledby'])"
      :aria-describedby="nativeAttribute($attrs['aria-describedby'])"
      :data-testid="nativeAttribute($attrs['data-testid'])"
      :id="id"
      class="mn-dialog-header"
      role="heading"
      aria-level="2"
      ><slot
    /></view>
  </template>
  <!-- #endif -->
</template>
