import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- MediaPlayerAudio.vue -->

<template>
  <div style="max-width: 480px">
    <minerva-media-player
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
      skip-seconds="0"
    >
      <span slot="heading">T-Rex roar</span>
    </minerva-media-player>
  </div>
</template>
`,angular:`// media-player-audio.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-media-player-audio",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="max-width: 480px">
      <minerva-media-player
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
        skip-seconds="0"
      >
        <span slot="heading">T-Rex roar</span>
      </minerva-media-player>
    </div>
  \`,
})
export class MediaPlayerAudioComponent {}
`,svelte:`<!-- MediaPlayerAudio.svelte -->

<div style="max-width: 480px">
  <minerva-media-player
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
    skip-seconds="0"
  >
    <span slot="heading">T-Rex roar</span>
  </minerva-media-player>
</div>
`,solid:`// MediaPlayerAudio.tsx

export default function MediaPlayerAudio() {
  return (
    <div style="max-width: 480px">
      <minerva-media-player
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
        skip-seconds="0"
      >
        <span slot="heading">T-Rex roar</span>
      </minerva-media-player>
    </div>
  );
}
`,html:`<div style="max-width: 480px">
  <minerva-media-player
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
    skip-seconds="0"
  >
    <span slot="heading">T-Rex roar</span>
  </minerva-media-player>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};