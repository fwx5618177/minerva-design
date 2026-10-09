<script setup lang="ts">
import { ref, h } from "vue";
import { ToastProvider, Button, toast } from "minerva-design/vue";
const result = ref("");
function archive() {
  toast.info("Conversation archived", {
    duration: 8000,
    action: {
      label: "Undo",
      onClick: () => {
        result.value = "Conversation restored";
        toast.success("Conversation restored");
      },
    },
  });
}
</script>
<template>
  <ToastProvider
    ><div style="display: flex; gap: 12px; flex-wrap: wrap">
      <Button @click="archive">Archive with Undo</Button
      ><Button
        variant="outline"
        @click="
          toast.info('Reminder set for 09:00', {
            icon: h('span', { 'aria-hidden': true }, '●'),
            closable: false,
          })
        "
        >Custom icon, no close button</Button
      ><Button
        variant="outline"
        @click="
          toast.success('Exported', {
            onClose: () => (result = 'Export toast closed'),
          })
        "
        >Observe close</Button
      ><output>{{ result }}</output>
    </div></ToastProvider
  >
</template>
