import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- MediaPlayerRatesSkip.vue -->

<script setup lang="ts">
import { ref } from "vue";

// playbackRates is a property (an array); minerva-rate-change reports the
// speed picked with the speed button.

import type { MinervaMediaPlayer } from "minerva-design/web-components/media-player";

const outputText = ref("Speed: 1×");

const playerPlaybackRates = [1, 1.5, 2];
const onRate = (e: Event) => {
  const { rate } = (e as CustomEvent<{ rate: number }>).detail;
  outputText.value = \`Speed: \${rate}×\`;
};
<\/script>

<template>
  <div style="display: grid; gap: 12px; max-width: 560px">
    <minerva-media-player
      id="player"
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      skip-seconds="3"
      aspect-ratio="4 / 3"
      aria-label="Flower, speed and skip"
      :playbackRates.prop="playerPlaybackRates"
      @minerva-rate-change="onRate"
    ></minerva-media-player>
    <output id="rate">{{ outputText }}</output>
  </div>
</template>
`,angular:`// media-player-rates-skip.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// playbackRates is a property (an array); minerva-rate-change reports the
// speed picked with the speed button.
import type { MinervaMediaPlayer } from "minerva-design/web-components/media-player";

@Component({
  selector: "app-media-player-rates-skip",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 12px; max-width: 560px">
      <minerva-media-player
        id="player"
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        skip-seconds="3"
        aspect-ratio="4 / 3"
        aria-label="Flower, speed and skip"
        [playbackRates]="playerPlaybackRates"
        (minerva-rate-change)="onRate($event)"
      ></minerva-media-player>
      <output id="rate">{{ outputText }}</output>
    </div>
  \`,
})
export class MediaPlayerRatesSkipComponent {
  outputText = "Speed: 1×";

  playerPlaybackRates = [1, 1.5, 2];
  onRate = (e: Event) => {
    const { rate } = (e as CustomEvent<{ rate: number }>).detail;
    this.outputText = \`Speed: \${rate}×\`;
  };
}
`,svelte:`<!-- MediaPlayerRatesSkip.svelte -->

<script lang="ts">
  // playbackRates is a property (an array); minerva-rate-change reports the
  // speed picked with the speed button.

  import type { MinervaMediaPlayer } from "minerva-design/web-components/media-player";

  let outputText = $state("Speed: 1×");

  const playerPlaybackRates = [1, 1.5, 2];
  const onRate = (e: Event) => {
    const { rate } = (e as CustomEvent<{ rate: number }>).detail;
    outputText = \`Speed: \${rate}×\`;
  };
<\/script>

<div style="display: grid; gap: 12px; max-width: 560px">
  <minerva-media-player
    id="player"
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    skip-seconds="3"
    aspect-ratio="4 / 3"
    aria-label="Flower, speed and skip"
    playbackRates={playerPlaybackRates}
    onminerva-rate-change={onRate}
  ></minerva-media-player>
  <output id="rate">{outputText}</output>
</div>
`,solid:`// MediaPlayerRatesSkip.tsx

import { createSignal } from "solid-js";

// playbackRates is a property (an array); minerva-rate-change reports the
// speed picked with the speed button.
import type { MinervaMediaPlayer } from "minerva-design/web-components/media-player";

export default function MediaPlayerRatesSkip() {
  const [outputText, setOutputText] = createSignal("Speed: 1×");

  const playerPlaybackRates = [1, 1.5, 2];
  const onRate = (e: Event) => {
    const { rate } = (e as CustomEvent<{ rate: number }>).detail;
    setOutputText(\`Speed: \${rate}×\`);
  };

  return (
    <div style="display: grid; gap: 12px; max-width: 560px">
      <minerva-media-player
        id="player"
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        skip-seconds="3"
        aspect-ratio="4 / 3"
        aria-label="Flower, speed and skip"
        prop:playbackRates={playerPlaybackRates}
        on:minerva-rate-change={onRate}
      ></minerva-media-player>
      <output id="rate">{outputText()}</output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 12px; max-width: 560px">
  <minerva-media-player
    id="player"
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    skip-seconds="3"
    aspect-ratio="4 / 3"
    aria-label="Flower, speed and skip"
  ></minerva-media-player>
  <output id="rate">Speed: 1×</output>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // playbackRates is a property (an array); minerva-rate-change reports the
  // speed picked with the speed button.
  const player = document.querySelector("#player");
  const output = document.querySelector("#rate");
  player.playbackRates = [1, 1.5, 2];
  const onRate = (e) => {
    const { rate } = e.detail;
    output.value = \`Speed: \${rate}×\`;
  };
  player.addEventListener("minerva-rate-change", onRate);
<\/script>
`}})))()}n();export{t as default};