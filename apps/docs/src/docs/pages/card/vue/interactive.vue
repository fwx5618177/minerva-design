<script setup lang="ts">
import { ref } from "vue";
import { Card, CardContent, VStack } from "minerva-design/vue";
const count = ref(0);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Card interactive tabindex="0" @click="count++" @keydown.enter="count++"
      ><CardContent
        ><h3>Open project</h3>
        <p>Activate this interactive card.</p></CardContent
      ></Card
    ><output>Opened {{ count }} times</output></VStack
  >
</template>
