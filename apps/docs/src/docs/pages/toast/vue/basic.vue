<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  HStack,
  VStack,
  ToastProvider,
  toast,
  type ToastPosition,
} from "minerva-design/vue";
const positions: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];
const position = ref<ToastPosition>("top-right");
</script>
<template>
  <ToastProvider :position="position" :max="3"
    ><VStack :gap="4" align="start"
      ><HStack :gap="2" wrap
        ><Button color="success" @click="toast.success('Saved')">Success</Button
        ><Button color="danger" @click="toast.danger('Request failed')"
          >Danger</Button
        ><Button color="warning" @click="toast.warning('Unsaved changes')"
          >Warning</Button
        ><Button
          color="neutral"
          variant="outline"
          @click="toast.info('New version')"
          >Info</Button
        ></HStack
      ><HStack attached wrap aria-label="Position"
        ><Button
          v-for="name in positions"
          :key="name"
          size="small"
          :color="name === position ? 'primary' : 'neutral'"
          :variant="name === position ? 'solid' : 'outline'"
          :aria-pressed="name === position"
          @click="position = name"
          >{{ name }}</Button
        ></HStack
      ></VStack
    ></ToastProvider
  >
</template>
