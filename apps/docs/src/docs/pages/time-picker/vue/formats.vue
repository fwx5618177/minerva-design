<script setup lang="ts">
import { TimePicker, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><TimePicker
      label="24-hour clock"
      format="HH:mm"
      :show-second="false" /><TimePicker
      label="12-hour clock"
      format="hh:mm a"
      use12-hours
      :show-second="false"
  /></HStack>
</template>
