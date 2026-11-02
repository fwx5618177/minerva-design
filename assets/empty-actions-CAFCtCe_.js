import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { ref } from "vue";
import { Button, Card, KanbanBoard, KanbanColumn } from "minerva-design/vue";

const ideas = ref<string[]>([]);
const add = () => ideas.value.push(\`Idea \${ideas.value.length + 1}\`);
<\/script>
<template>
  <KanbanBoard aria-label="Ideas" fill>
    <KanbanColumn
      title="Ideas"
      :count="ideas.length"
      description="Anything worth exploring"
      empty="No ideas yet: use Add to create one."
    >
      <template #actions>
        <Button size="small" variant="ghost" @click="add">Add</Button>
      </template>
      <Card v-for="idea in ideas" :key="idea" padding="small">{{ idea }}</Card>
      <template v-if="ideas.length" #footer>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          @click="ideas = []"
          >Clear column</Button
        >
      </template>
    </KanbanColumn>
    <KanbanColumn title="Archived" :count="0" />
  </KanbanBoard>
</template>
`})))()}n();export{t as default};