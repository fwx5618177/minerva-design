import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- FlashcardAxisVariants.vue -->

<template>
  <div
    style="
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    "
  >
    <minerva-flashcard
      variant="elevated"
      front="elevated · axis y"
      back="Flips horizontally"
      min-height="140"
    ></minerva-flashcard>
    <minerva-flashcard
      variant="outline"
      axis="x"
      front="outline · axis x"
      back="Flips vertically"
      min-height="140"
    ></minerva-flashcard>
    <minerva-flashcard
      variant="filled"
      size="small"
      front="filled · small"
      back="Less padding, smaller type"
      min-height="140"
    ></minerva-flashcard>
    <minerva-flashcard
      size="large"
      front="large"
      back="The card grows to fit the taller face: this answer is much longer than the question, and the card height follows it on both sides."
      min-height="140"
    ></minerva-flashcard>
  </div>
</template>
`,angular:`// flashcard-axis-variants.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-flashcard-axis-variants",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div
      style="
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      "
    >
      <minerva-flashcard
        variant="elevated"
        front="elevated · axis y"
        back="Flips horizontally"
        min-height="140"
      ></minerva-flashcard>
      <minerva-flashcard
        variant="outline"
        axis="x"
        front="outline · axis x"
        back="Flips vertically"
        min-height="140"
      ></minerva-flashcard>
      <minerva-flashcard
        variant="filled"
        size="small"
        front="filled · small"
        back="Less padding, smaller type"
        min-height="140"
      ></minerva-flashcard>
      <minerva-flashcard
        size="large"
        front="large"
        back="The card grows to fit the taller face: this answer is much longer than the question, and the card height follows it on both sides."
        min-height="140"
      ></minerva-flashcard>
    </div>
  \`,
})
export class FlashcardAxisVariantsComponent {}
`,svelte:`<!-- FlashcardAxisVariants.svelte -->

<div
  style="
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  "
>
  <minerva-flashcard
    variant="elevated"
    front="elevated · axis y"
    back="Flips horizontally"
    min-height="140"
  ></minerva-flashcard>
  <minerva-flashcard
    variant="outline"
    axis="x"
    front="outline · axis x"
    back="Flips vertically"
    min-height="140"
  ></minerva-flashcard>
  <minerva-flashcard
    variant="filled"
    size="small"
    front="filled · small"
    back="Less padding, smaller type"
    min-height="140"
  ></minerva-flashcard>
  <minerva-flashcard
    size="large"
    front="large"
    back="The card grows to fit the taller face: this answer is much longer than the question, and the card height follows it on both sides."
    min-height="140"
  ></minerva-flashcard>
</div>
`,solid:`// FlashcardAxisVariants.tsx

export default function FlashcardAxisVariants() {
  return (
    <div
      style="
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      "
    >
      <minerva-flashcard
        variant="elevated"
        front="elevated · axis y"
        back="Flips horizontally"
        min-height="140"
      ></minerva-flashcard>
      <minerva-flashcard
        variant="outline"
        axis="x"
        front="outline · axis x"
        back="Flips vertically"
        min-height="140"
      ></minerva-flashcard>
      <minerva-flashcard
        variant="filled"
        size="small"
        front="filled · small"
        back="Less padding, smaller type"
        min-height="140"
      ></minerva-flashcard>
      <minerva-flashcard
        size="large"
        front="large"
        back="The card grows to fit the taller face: this answer is much longer than the question, and the card height follows it on both sides."
        min-height="140"
      ></minerva-flashcard>
    </div>
  );
}
`,html:`<div
  style="
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  "
>
  <minerva-flashcard
    variant="elevated"
    front="elevated · axis y"
    back="Flips horizontally"
    min-height="140"
  ></minerva-flashcard>
  <minerva-flashcard
    variant="outline"
    axis="x"
    front="outline · axis x"
    back="Flips vertically"
    min-height="140"
  ></minerva-flashcard>
  <minerva-flashcard
    variant="filled"
    size="small"
    front="filled · small"
    back="Less padding, smaller type"
    min-height="140"
  ></minerva-flashcard>
  <minerva-flashcard
    size="large"
    front="large"
    back="The card grows to fit the taller face: this answer is much longer than the question, and the card height follows it on both sides."
    min-height="140"
  ></minerva-flashcard>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};