<script setup lang="ts">
import { Badge, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Badge color="success" variant="solid">Success</Badge
    ><Badge color="warning" variant="subtle">Warning</Badge
    ><Badge color="danger" variant="outline">Danger</Badge
    ><Badge color="info" size="small">Info</Badge></HStack
  >
</template>
