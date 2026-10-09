<script setup lang="ts">
import { ref } from "vue";
import {
  ConfigProvider,
  ThemeToggle,
  Input,
  Select,
  Button,
  Confirm,
  Table,
  FormField,
} from "../index";
const mode = ref<"light" | "dark" | "system">("light"),
  name = ref(""),
  team = ref("a"),
  open = ref(false);
const rows = ref<{ id: string; name: string; team: string }[]>([]);
function save() {
  if (!name.value.trim()) return;
  rows.value = [
    ...rows.value,
    { id: String(rows.value.length + 1), name: name.value, team: team.value },
  ];
  name.value = "";
  open.value = false;
}
</script>
<template>
  <ConfigProvider :mode="mode" palette="tech" :design="{ preset: 'touch' }"
    ><ThemeToggle :value="mode" @change="mode = $event" /><FormField
      label="Name"
      required
      ><Input v-model="name" clearable /></FormField
    ><Select
      v-model="team"
      :options="[
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
        { value: 'x', label: 'Blocked', disabled: true },
      ]" /><Button :disabled="!name.trim()" @click="open = true">Review</Button
    ><Confirm v-model:open="open" title="Add member" @confirm="save"
      ><text>{{ name }} / {{ team }}</text></Confirm
    ><Table
      :columns="[
        { key: 'name', header: 'Name', sortable: true },
        { key: 'team', header: 'Team' },
      ]"
      :data="rows"
      selectable
      :page-size="2"
  /></ConfigProvider>
</template>
