<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  Input,
  FormField,
  Modal,
  ModalBody,
  ModalFooter,
} from "minerva-design/vue";
const open = ref(false);
const name = ref("Quarterly report");
const draft = ref(name.value);
function edit() {
  draft.value = name.value;
  open.value = true;
}
function save() {
  name.value = draft.value;
  open.value = false;
}
</script>
<template>
  <Button @click="edit">Rename “{{ name }}”</Button
  ><Modal v-model:open="open" title="Rename document"
    ><form @submit.prevent="save">
      <ModalBody
        ><FormField label="Name"
          ><Input v-model="draft" name="name" /></FormField></ModalBody
      ><ModalFooter><Button type="submit">Save</Button></ModalFooter>
    </form></Modal
  >
</template>
