<script setup lang="ts">
import { inject } from "vue";
import type { TabsContext } from "./tabs-context";
defineProps<{ value: string; forceMount?: boolean }>();
const root = inject<TabsContext | undefined>("minerva:tabs", undefined);
</script>
<template>
  <view
    v-if="forceMount || root?.value.value === value"
    v-show="root?.value.value === value"
    class="mn-tab-panel"
    role="tabpanel"
    :id="root?.panelId(value)"
    :aria-labelledby="root?.tabId(value)"
    tabindex="0"
    ><slot
  /></view>
</template>
