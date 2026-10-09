<script setup lang="ts">
import { Card, CardContent, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Card
      ><CardContent
        ><h3>Standard padding</h3>
        <p>CardContent applies consistent internal spacing.</p></CardContent
      ></Card
    ><Card
      ><CardContent style="padding: 32px"
        ><h3>Custom content spacing</h3>
        <p>Override padding for a more spacious surface.</p></CardContent
      ></Card
    ></VStack
  >
</template>
