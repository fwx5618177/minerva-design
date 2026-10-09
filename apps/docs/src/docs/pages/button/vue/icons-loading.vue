<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { Button, HStack, VStack } from "minerva-design/vue";
const saving = ref(false);
let timer: ReturnType<typeof setTimeout>;
function save() {
  saving.value = true;
  timer = setTimeout(() => (saving.value = false), 1500);
}
onBeforeUnmount(() => clearTimeout(timer));
</script>
<template>
  <VStack :gap="3" style="max-width: 320px"
    ><Button
      ><template #start-icon><span aria-hidden="true">+</span></template
      >Add item</Button
    ><Button variant="outline"
      ><template #end-icon><span aria-hidden="true">→</span></template
      >Continue</Button
    ><Button
      color="success"
      full-width
      :loading="saving"
      loading-text="Saving..."
      @click="save"
      >Save</Button
    ></VStack
  >
</template>
