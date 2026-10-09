<script setup lang="ts">
import { Avatar, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" align="center"
    ><Avatar
      src="https://randomuser.me/api/portraits/women/44.jpg"
      name="Emma Wilson" /><Avatar name="Liam Chen" /><Avatar
      src="data:image/png;base64,broken"
      name="Noah Park" /><Avatar
  /></HStack>
</template>
