<script setup lang="ts">
import { Avatar, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Avatar name="Ada Lovelace" /><Avatar
      src="/missing-avatar.png"
      name="Grace Hopper" /><Avatar name=""
  /></HStack>
</template>
