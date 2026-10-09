<script setup lang="ts">
import { Avatar, AvatarGroup } from "minerva-design/vue";
const people = [
  { name: "Olivia", src: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "James", src: "https://randomuser.me/api/portraits/men/75.jpg" },
  { name: "Sophia" },
  { name: "Lucas" },
];
</script>
<template>
  <AvatarGroup :count="5"
    ><Avatar
      v-for="person in people"
      :key="person.name"
      :name="person.name"
      :src="person.src"
      stacked
  /></AvatarGroup>
</template>
