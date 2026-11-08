import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- MediaPlayerResume.vue -->

<script setup lang="ts">
import { ref } from "vue";

// start-time resumes once the metadata loads; the media events cross the
// shadow root as minerva-* events; play() / seek() drive the player.

import type { MinervaMediaPlayer } from "minerva-design/web-components/media-player";

const player = ref<MinervaMediaPlayer>();
const outputText = ref("Not started");

let saved = 2;
const onMetadata = (e: Event) => {
  const { duration } = (e as CustomEvent<{ duration: number }>).detail;
  outputText.value = \`Resumed at \${saved}s of \${duration.toFixed(1)}s\`;
};
const onTime = (e: Event) => {
  const { currentTime, duration } = (
    e as CustomEvent<{ currentTime: number; duration: number }>
  ).detail;
  outputText.value = \`\${Math.round((currentTime / duration) * 100)}% watched (\${currentTime.toFixed(1)}s)\`;
};
const onPause = () => {
  saved = Math.floor(player.value!.element?.currentTime ?? 0);
  player.value!.startTime = saved;
  outputText.value = \`Paused · saved position: \${saved}s\`;
};
const onEnded = () => (outputText.value = "Finished");
const play = () => void player.value!.play();
const restart = () => player.value!.seek(0);
<\/script>

<template>
  <div
    style="
      display: grid;
      gap: 12px;
      width: 100%;
      min-width: 0;
      max-width: 560px;
    "
  >
    <minerva-media-player
      id="player"
      src="media-player/sample.mp4"
      start-time="2"
      ref="player"
      @minerva-loaded-metadata="onMetadata"
      @minerva-time-update="onTime"
      @minerva-pause="onPause"
      @minerva-ended="onEnded"
    ></minerva-media-player>
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <minerva-button id="play" size="small" @click="play">Play</minerva-button>
      <minerva-button
        id="restart"
        size="small"
        variant="outline"
        @click="restart"
        >Restart</minerva-button
      >
    </div>
    <output id="progress" aria-live="polite">{{ outputText }}</output>
  </div>
</template>
`,angular:`// media-player-resume.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core";

// start-time resumes once the metadata loads; the media events cross the
// shadow root as minerva-* events; play() / seek() drive the player.
import type { MinervaMediaPlayer } from "minerva-design/web-components/media-player";

@Component({
  selector: "app-media-player-resume",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div
      style="display: grid; gap: 12px; width: 100%; min-width: 0; max-width: 560px"
    >
      <minerva-media-player
        id="player"
        src="media-player/sample.mp4"
        start-time="2"
        #player
        (minerva-loaded-metadata)="onMetadata($event)"
        (minerva-time-update)="onTime($event)"
        (minerva-pause)="onPause($event)"
        (minerva-ended)="onEnded($event)"
      ></minerva-media-player>
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        <minerva-button id="play" size="small" (click)="play($event)"
          >Play</minerva-button
        >
        <minerva-button
          id="restart"
          size="small"
          variant="outline"
          (click)="restart($event)"
          >Restart</minerva-button
        >
      </div>
      <output id="progress" aria-live="polite">{{ outputText }}</output>
    </div>
  \`,
})
export class MediaPlayerResumeComponent {
  @ViewChild("player") player!: ElementRef<MinervaMediaPlayer>;
  outputText = "Not started";

  saved = 2;
  onMetadata = (e: Event) => {
    const { duration } = (e as CustomEvent<{ duration: number }>).detail;
    this.outputText = \`Resumed at \${this.saved}s of \${duration.toFixed(1)}s\`;
  };
  onTime = (e: Event) => {
    const { currentTime, duration } = (
      e as CustomEvent<{ currentTime: number; duration: number }>
    ).detail;
    this.outputText = \`\${Math.round((currentTime / duration) * 100)}% watched (\${currentTime.toFixed(1)}s)\`;
  };
  onPause = () => {
    this.saved = Math.floor(
      this.player.nativeElement.element?.currentTime ?? 0,
    );
    this.player.nativeElement.startTime = this.saved;
    this.outputText = \`Paused · saved position: \${this.saved}s\`;
  };
  onEnded = () => (this.outputText = "Finished");
  play = () => void this.player.nativeElement.play();
  restart = () => this.player.nativeElement.seek(0);
}
`,svelte:`<!-- MediaPlayerResume.svelte -->

<script lang="ts">
  // start-time resumes once the metadata loads; the media events cross the
  // shadow root as minerva-* events; play() / seek() drive the player.

  import type { MinervaMediaPlayer } from "minerva-design/web-components/media-player";

  let player: MinervaMediaPlayer;
  let outputText = $state("Not started");

  let saved = 2;
  const onMetadata = (e: Event) => {
    const { duration } = (e as CustomEvent<{ duration: number }>).detail;
    outputText = \`Resumed at \${saved}s of \${duration.toFixed(1)}s\`;
  };
  const onTime = (e: Event) => {
    const { currentTime, duration } = (
      e as CustomEvent<{ currentTime: number; duration: number }>
    ).detail;
    outputText = \`\${Math.round((currentTime / duration) * 100)}% watched (\${currentTime.toFixed(1)}s)\`;
  };
  const onPause = () => {
    saved = Math.floor(player.element?.currentTime ?? 0);
    player.startTime = saved;
    outputText = \`Paused · saved position: \${saved}s\`;
  };
  const onEnded = () => (outputText = "Finished");
  const play = () => void player.play();
  const restart = () => player.seek(0);
<\/script>

<div
  style="display: grid; gap: 12px; width: 100%; min-width: 0; max-width: 560px"
>
  <minerva-media-player
    id="player"
    src="media-player/sample.mp4"
    start-time="2"
    bind:this={player}
    onminerva-loaded-metadata={onMetadata}
    onminerva-time-update={onTime}
    onminerva-pause={onPause}
    onminerva-ended={onEnded}
  ></minerva-media-player>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <minerva-button id="play" size="small" onclick={play}>Play</minerva-button>
    <minerva-button
      id="restart"
      size="small"
      variant="outline"
      onclick={restart}
    >Restart</minerva-button>
  </div>
  <output id="progress" aria-live="polite">{outputText}</output>
</div>
`,solid:`// MediaPlayerResume.tsx

import { createSignal } from "solid-js";

// start-time resumes once the metadata loads; the media events cross the
// shadow root as minerva-* events; play() / seek() drive the player.
import type { MinervaMediaPlayer } from "minerva-design/web-components/media-player";

export default function MediaPlayerResume() {
  let player!: MinervaMediaPlayer;
  const [outputText, setOutputText] = createSignal("Not started");

  let saved = 2;
  const onMetadata = (e: Event) => {
    const { duration } = (e as CustomEvent<{ duration: number }>).detail;
    setOutputText(\`Resumed at \${saved}s of \${duration.toFixed(1)}s\`);
  };
  const onTime = (e: Event) => {
    const { currentTime, duration } = (
      e as CustomEvent<{ currentTime: number; duration: number }>
    ).detail;
    setOutputText(
      \`\${Math.round((currentTime / duration) * 100)}% watched (\${currentTime.toFixed(1)}s)\`,
    );
  };
  const onPause = () => {
    saved = Math.floor(player.element?.currentTime ?? 0);
    player.startTime = saved;
    setOutputText(\`Paused · saved position: \${saved}s\`);
  };
  const onEnded = () => setOutputText("Finished");
  const play = () => void player.play();
  const restart = () => player.seek(0);

  return (
    <div style="display: grid; gap: 12px; width: 100%; min-width: 0; max-width: 560px">
      <minerva-media-player
        id="player"
        src="media-player/sample.mp4"
        start-time="2"
        ref={player}
        on:minerva-loaded-metadata={onMetadata}
        on:minerva-time-update={onTime}
        on:minerva-pause={onPause}
        on:minerva-ended={onEnded}
      ></minerva-media-player>
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        <minerva-button id="play" size="small" on:click={play}>
          Play
        </minerva-button>
        <minerva-button
          id="restart"
          size="small"
          variant="outline"
          on:click={restart}
        >
          Restart
        </minerva-button>
      </div>
      <output id="progress" aria-live="polite">
        {outputText()}
      </output>
    </div>
  );
}
`,html:`<div
  style="display: grid; gap: 12px; width: 100%; min-width: 0; max-width: 560px"
>
  <minerva-media-player
    id="player"
    src="media-player/sample.mp4"
    start-time="2"
  ></minerva-media-player>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <minerva-button id="play" size="small">Play</minerva-button>
    <minerva-button id="restart" size="small" variant="outline"
      >Restart</minerva-button
    >
  </div>
  <output id="progress" aria-live="polite">Not started</output>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // start-time resumes once the metadata loads; the media events cross the
  // shadow root as minerva-* events; play() / seek() drive the player.
  const player = document.querySelector("#player");
  const output = document.querySelector("#progress");
  let saved = 2;
  const onMetadata = (e) => {
    const { duration } = e.detail;
    output.value = \`Resumed at \${saved}s of \${duration.toFixed(1)}s\`;
  };
  const onTime = (e) => {
    const { currentTime, duration } = e.detail;
    output.value = \`\${Math.round((currentTime / duration) * 100)}% watched (\${currentTime.toFixed(1)}s)\`;
  };
  const onPause = () => {
    saved = Math.floor(player.element?.currentTime ?? 0);
    player.startTime = saved;
    output.value = \`Paused · saved position: \${saved}s\`;
  };
  const onEnded = () => (output.value = "Finished");
  const play = () => void player.play();
  const restart = () => player.seek(0);
  const playButton = document.querySelector("#play");
  const restartButton = document.querySelector("#restart");
  player.addEventListener("minerva-loaded-metadata", onMetadata);
  player.addEventListener("minerva-time-update", onTime);
  player.addEventListener("minerva-pause", onPause);
  player.addEventListener("minerva-ended", onEnded);
  playButton.addEventListener("click", play);
  restartButton.addEventListener("click", restart);
<\/script>
`}})))()}n();export{t as default};