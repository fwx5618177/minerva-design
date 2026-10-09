<script setup lang="ts">
import { Badge, Button, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Badge
      ><template #content><span aria-hidden="true">★</span> New</template
      ><Button variant="outline">Release</Button></Badge
    ><Badge dot color="success"
      ><Button variant="outline">Online</Button></Badge
    ></HStack
  >
</template>
