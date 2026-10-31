<script setup lang="ts">
import { Button, HStack } from "minerva-design/vue";
import {
  DownloadIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  TrashIcon,
} from "minerva-design/vue/icons";
</script>

<template>
  <HStack :gap="4" align="center" wrap>
    <HomeIcon />
    <SearchIcon />
    <SettingsIcon />
    <Button>
      <template #start-icon><DownloadIcon :size="16" /></template>
      Download
    </Button>
    <Button color="danger" variant="outline">
      <template #start-icon><TrashIcon :size="16" /></template>
      Delete
    </Button>
  </HStack>
</template>
