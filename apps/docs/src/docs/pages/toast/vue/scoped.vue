<script setup lang="ts">
import { defineComponent, h } from "vue";
import {
  ConfigProvider,
  ToastProvider,
  Button,
  toast,
  useToast,
} from "minerva-design/vue";
const ScopedActions = defineComponent({
  setup() {
    const scoped = useToast();
    return () =>
      h("div", { style: { display: "flex", gap: "12px" } }, [
        h(
          Button,
          {
            onClick: () =>
              scoped.success(
                "Saved with the local dark theme and Chinese locale",
              ),
          },
          () => "Scoped notification",
        ),
        h(
          Button,
          {
            variant: "outline",
            onClick: () => toast.info("Synced with the outer provider scope"),
          },
          () => "Global notification",
        ),
      ]);
  },
});
</script>
<template>
  <ToastProvider
    ><ConfigProvider theme="dark" palette="tech" :locale="{ language: 'zh' }"
      ><ScopedActions /></ConfigProvider
  ></ToastProvider>
</template>
