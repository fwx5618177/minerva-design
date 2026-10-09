<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "minerva-design/vue";
const opened = ref(false);
</script>
<template>
  <div style="width: 340px">
    <Card
      ><CardHeader
        ><CardTitle>Project Apollo</CardTitle
        ><CardDescription>Updated 2 hours ago</CardDescription></CardHeader
      ><CardContent
        >A design system for building accessible, themeable
        interfaces.</CardContent
      ><CardFooter
        ><Button size="small" @click="opened = true">Open</Button></CardFooter
      ></Card
    >
    <p v-if="opened" role="status">Opened Project Apollo</p>
  </div>
</template>
