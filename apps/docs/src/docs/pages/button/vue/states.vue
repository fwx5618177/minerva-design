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
  <HStack :gap="2" wrap
    ><Button :loading="saving" @click="save">{{
      saving ? "Saving…" : "Save"
    }}</Button
    ><Button disabled>Disabled</Button><Button active>Active</Button></HStack
  >
</template>
