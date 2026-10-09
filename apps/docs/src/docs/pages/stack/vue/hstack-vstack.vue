<script setup lang="ts">
import { HStack, VStack, Button } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="6" align="start"
    ><VStack :gap="2"><Button>First</Button><Button>Second</Button></VStack
    ><VStack :gap="2"
      ><Button variant="outline">Third</Button
      ><Button variant="outline">Fourth</Button></VStack
    ></HStack
  >
</template>
