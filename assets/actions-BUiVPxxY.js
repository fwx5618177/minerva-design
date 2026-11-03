import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { ref } from "vue";
import { Empty, Button } from "minerva-design/vue";
const created = ref(false);
<\/script>
<template>
  <Empty
    v-if="!created"
    title="Create your first project"
    description="Start by creating a project to organize your work."
    ><template #action
      ><Button @click="created = true">Create project</Button></template
    ></Empty
  ><output v-else>Project created</output>
</template>
`})))()}n();export{t as default};