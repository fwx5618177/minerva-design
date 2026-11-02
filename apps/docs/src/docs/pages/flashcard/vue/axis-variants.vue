<script setup lang="ts">
import { Flashcard } from "minerva-design/vue";
</script>
<template>
  <div
    style="
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    "
  >
    <Flashcard
      variant="elevated"
      front="elevated · axis y"
      back="Flips horizontally"
      :min-height="140"
    />
    <Flashcard
      variant="outline"
      axis="x"
      front="outline · axis x"
      back="Flips vertically"
      :min-height="140"
    />
    <Flashcard
      variant="filled"
      size="small"
      front="filled · small"
      back="Less padding, smaller type"
      :min-height="140"
    />
    <Flashcard
      size="large"
      front="large"
      back="The card grows to fit the taller face: this answer is much longer than the question, and the card height follows it on both sides."
      :min-height="140"
    />
  </div>
</template>
