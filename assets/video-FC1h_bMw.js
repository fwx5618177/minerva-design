import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- MediaPlayerVideo.vue -->

<template>
  <div style="max-width: 560px">
    <minerva-media-player
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      picture-in-picture
    >
      <span slot="heading">Flower</span>
    </minerva-media-player>
  </div>
</template>
`,angular:`// media-player-video.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  selector: "app-media-player-video",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="max-width: 560px">
      <minerva-media-player
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        picture-in-picture
      >
        <span slot="heading">Flower</span>
      </minerva-media-player>
    </div>
  \`,
})
export class MediaPlayerVideoComponent {}
`,svelte:`<!-- MediaPlayerVideo.svelte -->

<div style="max-width: 560px">
  <minerva-media-player
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    picture-in-picture
  >
    <span slot="heading">Flower</span>
  </minerva-media-player>
</div>
`,solid:`// MediaPlayerVideo.tsx

export default function MediaPlayerVideo() {
  return (
    <div style="max-width: 560px">
      <minerva-media-player
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        picture-in-picture
      >
        <span slot="heading">Flower</span>
      </minerva-media-player>
    </div>
  );
}
`,html:`<div style="max-width: 560px">
  <minerva-media-player
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    picture-in-picture
  >
    <span slot="heading">Flower</span>
  </minerva-media-player>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";
<\/script>
`}})))()}n();export{t as default};