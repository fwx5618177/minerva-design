<script setup lang="ts">
import { useI18n } from "./i18n";
const { t } = useI18n();
withDefaults(
  defineProps<{ loading?: boolean; label?: string; error?: string }>(),
  { loading: true, label: "Loading…" },
);
const emit = defineEmits(["retry"]);
</script>
<template>
  <view class="mn-loading-state"
    ><view v-if="error" class="mn-alert mn-status-error"
      ><text>{{ error }}</text
      ><button class="mn-button" @tap="emit('retry')">
        {{ t("table.retry") }}
      </button></view
    ><view v-else-if="loading" class="mn-loading"
      ><view class="mn-spinner" /><text>{{
        label ?? t("loadingState.label")
      }}</text></view
    ><slot v-else
  /></view>
</template>
