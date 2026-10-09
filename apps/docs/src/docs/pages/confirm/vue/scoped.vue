<script setup lang="ts">
import { ref } from "vue";
import {
  ConfigProvider,
  ConfirmProvider,
  Button,
  useConfirm,
} from "minerva-design/vue";
import { defineComponent, h } from "vue";
const ScopedAction = defineComponent({
  setup() {
    const ask = useConfirm();
    const result = ref("");
    return () =>
      h("div", [
        h(
          Button,
          {
            onClick: async () => {
              result.value = (await ask({
                title: "确认保存？",
                description: "对话框继承局部主题和语言。",
              }))
                ? "已保存"
                : "已取消";
            },
          },
          () => "保存更改",
        ),
        h("output", result.value),
      ]);
  },
});
</script>
<template>
  <ConfigProvider theme="dark" :locale="{ language: 'zh' }"
    ><ConfirmProvider><ScopedAction /></ConfirmProvider
  ></ConfigProvider>
</template>
