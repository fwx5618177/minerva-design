import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- FlashcardControlled.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// flipped is a reflected boolean attribute; minerva-flipped-change reports
// user flips (cancelable). The footer slot holds the rating buttons.

const deck = [
  { front: "ephemeral", back: "Lasting for a very short time" },
  { front: "ubiquitous", back: "Present, appearing or found everywhere" },
  { front: "laconic", back: "Using very few words" },
];
const ratings = ["Again", "Hard", "Good", "Easy"];

type Flashcard = HTMLElement & { flipped: boolean; frontLabel?: string };

const card = ref<Flashcard>();
const footer = ref<HTMLElement>();
const frontText = ref("");
const backText = ref("");
const logText = ref("Flip the card, then rate it.");

const history: string[] = [];
let index = 0;

const button = (label: string, solid: boolean, onClick: () => void) => {
  const el = document.createElement("minerva-button");
  el.setAttribute("size", "small");
  el.setAttribute("variant", solid ? "solid" : "outline");
  el.textContent = label;
  el.addEventListener("click", onClick);
  return el;
};
const render = () => {
  const item = deck[index]!;
  card.value!.frontLabel = \`Card \${index + 1} / \${deck.length}\`;
  frontText.value = item.front;
  backText.value = item.back;
  footer.value!.replaceChildren(
    ...(card.value!.flipped
      ? ratings.map((rating) =>
          button(rating, rating === "Good", () => {
            history.push(\`\${item.front}: \${rating}\`);
            logText.value = history.slice(-3).join(" · ");
            card.value!.flipped = false;
            index = (index + 1) % deck.length;
            render();
          }),
        )
      : [
          button("Show answer", true, () => {
            card.value!.flipped = true;
            render();
          }),
        ]),
  );
};
const onFlip = () => queueMicrotask(render);

onMounted(() => {
  render();
});
<\/script>

<template>
  <div style="display: grid; gap: 12px; max-width: 420px">
    <minerva-flashcard
      id="card"
      back-label="Definition"
      ref="card"
      @minerva-flipped-change="onFlip"
    >
      <strong slot="front" id="front" style="font-size: 1.5rem">{{
        frontText
      }}</strong>
      <span slot="back" id="back">{{ backText }}</span>
      <div slot="footer" id="footer" ref="footer"></div>
    </minerva-flashcard>
    <output id="log" style="font-size: 13px">{{ logText }}</output>
  </div>
</template>
`,angular:`// flashcard-controlled.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
} from "@angular/core";

// flipped is a reflected boolean attribute; minerva-flipped-change reports
// user flips (cancelable). The footer slot holds the rating buttons.
const deck = [
  { front: "ephemeral", back: "Lasting for a very short time" },
  { front: "ubiquitous", back: "Present, appearing or found everywhere" },
  { front: "laconic", back: "Using very few words" },
];
const ratings = ["Again", "Hard", "Good", "Easy"];

type Flashcard = HTMLElement & { flipped: boolean; frontLabel?: string };

@Component({
  selector: "app-flashcard-controlled",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 12px; max-width: 420px">
      <minerva-flashcard
        id="card"
        back-label="Definition"
        #card
        (minerva-flipped-change)="onFlip($event)"
      >
        <strong slot="front" id="front" style="font-size: 1.5rem">{{
          frontText
        }}</strong>
        <span slot="back" id="back">{{ backText }}</span>
        <div slot="footer" id="footer" #footer></div>
      </minerva-flashcard>
      <output id="log" style="font-size: 13px">{{ logText }}</output>
    </div>
  \`,
})
export class FlashcardControlledComponent implements AfterViewInit {
  @ViewChild("card") card!: ElementRef<Flashcard>;
  @ViewChild("footer") footer!: ElementRef<HTMLElement>;
  frontText = "";
  backText = "";
  logText = "Flip the card, then rate it.";

  history: string[] = [];
  index = 0;

  button = (label: string, solid: boolean, onClick: () => void) => {
    const el = document.createElement("minerva-button");
    el.setAttribute("size", "small");
    el.setAttribute("variant", solid ? "solid" : "outline");
    el.textContent = label;
    el.addEventListener("click", onClick);
    return el;
  };
  render = () => {
    const item = deck[this.index]!;
    this.card.nativeElement.frontLabel = \`Card \${this.index + 1} / \${deck.length}\`;
    this.frontText = item.front;
    this.backText = item.back;
    this.footer.nativeElement.replaceChildren(
      ...(this.card.nativeElement.flipped
        ? ratings.map((rating) =>
            this.button(rating, rating === "Good", () => {
              this.history.push(\`\${item.front}: \${rating}\`);
              this.logText = this.history.slice(-3).join(" · ");
              this.card.nativeElement.flipped = false;
              this.index = (this.index + 1) % deck.length;
              this.render();
            }),
          )
        : [
            this.button("Show answer", true, () => {
              this.card.nativeElement.flipped = true;
              this.render();
            }),
          ]),
    );
  };
  onFlip = () => queueMicrotask(this.render);

  ngAfterViewInit(): void {
    this.render();
  }
}
`,svelte:`<!-- FlashcardControlled.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // flipped is a reflected boolean attribute; minerva-flipped-change reports
  // user flips (cancelable). The footer slot holds the rating buttons.

  const deck = [
    { front: "ephemeral", back: "Lasting for a very short time" },
    { front: "ubiquitous", back: "Present, appearing or found everywhere" },
    { front: "laconic", back: "Using very few words" },
  ];
  const ratings = ["Again", "Hard", "Good", "Easy"];

  type Flashcard = HTMLElement & { flipped: boolean; frontLabel?: string };

  let card: Flashcard;
  let footer: HTMLElement;
  let frontText = $state("");
  let backText = $state("");
  let logText = $state("Flip the card, then rate it.");

  const history: string[] = [];
  let index = 0;

  const button = (label: string, solid: boolean, onClick: () => void) => {
    const el = document.createElement("minerva-button");
    el.setAttribute("size", "small");
    el.setAttribute("variant", solid ? "solid" : "outline");
    el.textContent = label;
    el.addEventListener("click", onClick);
    return el;
  };
  const render = () => {
    const item = deck[index]!;
    card.frontLabel = \`Card \${index + 1} / \${deck.length}\`;
    frontText = item.front;
    backText = item.back;
    footer.replaceChildren(
      ...(card.flipped
        ? ratings.map((rating) =>
            button(rating, rating === "Good", () => {
              history.push(\`\${item.front}: \${rating}\`);
              logText = history.slice(-3).join(" · ");
              card.flipped = false;
              index = (index + 1) % deck.length;
              render();
            }),
          )
        : [
            button("Show answer", true, () => {
              card.flipped = true;
              render();
            }),
          ]),
    );
  };
  const onFlip = () => queueMicrotask(render);

  onMount(() => {
    render();
  });
<\/script>

<div style="display: grid; gap: 12px; max-width: 420px">
  <minerva-flashcard
    id="card"
    back-label="Definition"
    bind:this={card}
    onminerva-flipped-change={onFlip}
  >
    <strong slot="front" id="front" style="font-size: 1.5rem">{frontText}</strong>
    <span slot="back" id="back">{backText}</span>
    <div slot="footer" id="footer" bind:this={footer}></div>
  </minerva-flashcard>
  <output id="log" style="font-size: 13px">{logText}</output>
</div>
`,solid:`// FlashcardControlled.tsx

import { createSignal, onMount } from "solid-js";

// flipped is a reflected boolean attribute; minerva-flipped-change reports
// user flips (cancelable). The footer slot holds the rating buttons.
const deck = [
  { front: "ephemeral", back: "Lasting for a very short time" },
  { front: "ubiquitous", back: "Present, appearing or found everywhere" },
  { front: "laconic", back: "Using very few words" },
];
const ratings = ["Again", "Hard", "Good", "Easy"];

type Flashcard = HTMLElement & { flipped: boolean; frontLabel?: string };

export default function FlashcardControlled() {
  let card!: Flashcard;
  let footer!: HTMLElement;
  const [frontText, setFrontText] = createSignal("");
  const [backText, setBackText] = createSignal("");
  const [logText, setLogText] = createSignal("Flip the card, then rate it.");

  const history: string[] = [];
  let index = 0;

  const button = (label: string, solid: boolean, onClick: () => void) => {
    const el = document.createElement("minerva-button");
    el.setAttribute("size", "small");
    el.setAttribute("variant", solid ? "solid" : "outline");
    el.textContent = label;
    el.addEventListener("click", onClick);
    return el;
  };
  const render = () => {
    const item = deck[index]!;
    card.frontLabel = \`Card \${index + 1} / \${deck.length}\`;
    setFrontText(item.front);
    setBackText(item.back);
    footer.replaceChildren(
      ...(card.flipped
        ? ratings.map((rating) =>
            button(rating, rating === "Good", () => {
              history.push(\`\${item.front}: \${rating}\`);
              setLogText(history.slice(-3).join(" · "));
              card.flipped = false;
              index = (index + 1) % deck.length;
              render();
            }),
          )
        : [
            button("Show answer", true, () => {
              card.flipped = true;
              render();
            }),
          ]),
    );
  };
  const onFlip = () => queueMicrotask(render);

  onMount(() => {
    render();
  });

  return (
    <div style="display: grid; gap: 12px; max-width: 420px">
      <minerva-flashcard
        id="card"
        back-label="Definition"
        ref={card}
        on:minerva-flipped-change={onFlip}
      >
        <strong slot="front" id="front" style="font-size: 1.5rem">
          {frontText()}
        </strong>
        <span slot="back" id="back">
          {backText()}
        </span>
        <div slot="footer" id="footer" ref={footer}></div>
      </minerva-flashcard>
      <output id="log" style="font-size: 13px">
        {logText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 12px; max-width: 420px">
  <minerva-flashcard id="card" back-label="Definition">
    <strong slot="front" id="front" style="font-size: 1.5rem"></strong>
    <span slot="back" id="back"></span>
    <div slot="footer" id="footer"></div>
  </minerva-flashcard>
  <output id="log" style="font-size: 13px">Flip the card, then rate it.</output>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // flipped is a reflected boolean attribute; minerva-flipped-change reports
  // user flips (cancelable). The footer slot holds the rating buttons.
  // flipped is a reflected boolean attribute; minerva-flipped-change reports
  // user flips (cancelable). The footer slot holds the rating buttons.
  const deck = [
    { front: "ephemeral", back: "Lasting for a very short time" },
    { front: "ubiquitous", back: "Present, appearing or found everywhere" },
    { front: "laconic", back: "Using very few words" },
  ];
  const ratings = ["Again", "Hard", "Good", "Easy"];

  const card = document.querySelector("#card");
  const front = document.querySelector("#front");
  const back = document.querySelector("#back");
  const footer = document.querySelector("#footer");
  const log = document.querySelector("#log");
  const history = [];
  let index = 0;

  const button = (label, solid, onClick) => {
    const el = document.createElement("minerva-button");
    el.setAttribute("size", "small");
    el.setAttribute("variant", solid ? "solid" : "outline");
    el.textContent = label;
    el.addEventListener("click", onClick);
    return el;
  };
  const render = () => {
    const item = deck[index];
    card.frontLabel = \`Card \${index + 1} / \${deck.length}\`;
    front.textContent = item.front;
    back.textContent = item.back;
    footer.replaceChildren(
      ...(card.flipped
        ? ratings.map((rating) =>
            button(rating, rating === "Good", () => {
              history.push(\`\${item.front}: \${rating}\`);
              log.value = history.slice(-3).join(" · ");
              card.flipped = false;
              index = (index + 1) % deck.length;
              render();
            }),
          )
        : [
            button("Show answer", true, () => {
              card.flipped = true;
              render();
            }),
          ]),
    );
  };
  const onFlip = () => queueMicrotask(render);
  card.addEventListener("minerva-flipped-change", onFlip);
  render();
<\/script>
`}})))()}n();export{t as default};