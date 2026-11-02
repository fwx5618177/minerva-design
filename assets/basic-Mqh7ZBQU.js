import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- FlashcardBasic.vue -->

<template>
  <div style="max-width: 420px">
    <minerva-flashcard
      front="What is the capital of Australia?"
      back="Canberra"
      show-hint
    ></minerva-flashcard>
  </div>
</template>
`,angular:`// flashcard-basic.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-flashcard-basic",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="max-width: 420px">
      <minerva-flashcard
        front="What is the capital of Australia?"
        back="Canberra"
        show-hint
      ></minerva-flashcard>
    </div>
  \`,
})
export class FlashcardBasicComponent {}
`,svelte:`<!-- FlashcardBasic.svelte -->

<div style="max-width: 420px">
  <minerva-flashcard
    front="What is the capital of Australia?"
    back="Canberra"
    show-hint
  ></minerva-flashcard>
</div>
`,solid:`// FlashcardBasic.tsx

export default function FlashcardBasic() {
  return (
    <div style="max-width: 420px">
      <minerva-flashcard
        front="What is the capital of Australia?"
        back="Canberra"
        show-hint
      ></minerva-flashcard>
    </div>
  );
}
`,html:`<div style="max-width: 420px">
  <minerva-flashcard
    front="What is the capital of Australia?"
    back="Canberra"
    show-hint
  ></minerva-flashcard>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};