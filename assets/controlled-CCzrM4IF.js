import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { computed, ref } from "vue";
import { Button, Flashcard, VStack } from "minerva-design/vue";
const deck = [
  { front: "ephemeral", back: "Lasting for a very short time" },
  { front: "ubiquitous", back: "Present, appearing or found everywhere" },
  { front: "laconic", back: "Using very few words" },
];
const ratings = ["Again", "Hard", "Good", "Easy"];
const index = ref(0);
const flipped = ref(false);
const log = ref<string[]>([]);
const card = computed(() => deck[index.value]!);
function rate(rating: string) {
  log.value = [...log.value, \`\${card.value.front}: \${rating}\`].slice(-3);
  flipped.value = false;
  index.value = (index.value + 1) % deck.length;
}
<\/script>
<template>
  <VStack :gap="3" align="stretch" style="max-width: 420px">
    <Flashcard
      v-model:flipped="flipped"
      :front-label="\`Card \${index + 1} / \${deck.length}\`"
      back-label="Definition"
      :back="card.back"
    >
      <template #front
        ><strong style="font-size: 1.5rem">{{ card.front }}</strong></template
      >
      <template #footer>
        <template v-if="flipped">
          <Button
            v-for="rating in ratings"
            :key="rating"
            size="small"
            :variant="rating === 'Good' ? 'solid' : 'outline'"
            @click="rate(rating)"
            >{{ rating }}</Button
          >
        </template>
        <Button v-else size="small" @click="flipped = true">Show answer</Button>
      </template>
    </Flashcard>
    <output style="font-size: 13px">{{
      log.length ? log.join(" · ") : "Flip the card, then rate it."
    }}</output>
  </VStack>
</template>
`})))()}n();export{t as default};