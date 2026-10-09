<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  VStack,
} from "minerva-design/vue";
const open = ref(false);
const deleted = ref(false);
function remove() {
  deleted.value = true;
  open.value = false;
}
</script>
<template>
  <VStack align="start" :gap="3"
    ><Button @click="open = true">Delete record</Button>
    <p v-if="deleted" role="status">Record deleted</p>
    <Modal
      v-model:open="open"
      title="Delete this record?"
      description="The record and its history are removed permanently."
      size="small"
      ><ModalBody>Other team members lose access immediately.</ModalBody
      ><ModalFooter
        ><Button color="neutral" variant="outline" @click="open = false"
          >Cancel</Button
        ><Button color="danger" @click="remove">Delete</Button></ModalFooter
      ></Modal
    ></VStack
  >
</template>
