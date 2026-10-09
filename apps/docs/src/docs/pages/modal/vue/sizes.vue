<script setup lang="ts">
import { ref } from "vue";
import { Modal, ModalBody, Button, HStack } from "minerva-design/vue";
const sizes = ["small", "medium", "large", "full"] as const;
const size = ref<(typeof sizes)[number]>("medium");
const open = ref(false);
</script>
<template>
  <HStack :gap="3" wrap
    ><Button
      v-for="item in sizes"
      :key="item"
      variant="outline"
      @click="
        size = item;
        open = true;
      "
      >{{ item }}</Button
    ></HStack
  ><Modal v-model:open="open" :size="size" :title="`${size} dialog`"
    ><ModalBody
      ><p>Choose a size appropriate for your content.</p></ModalBody
    ></Modal
  >
</template>
