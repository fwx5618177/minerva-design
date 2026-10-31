import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// "auto" follows the global default (setDefaultIconRenderer); a forced
// backend that cannot start here falls back to the next one.
import { reactive } from "vue";
import { HStack, VStack } from "minerva-design/vue";
import {
  Icon,
  settingsIcon,
  type IconRenderer,
  type IconRendererKind,
} from "minerva-design/vue/icons";

const RENDERERS: IconRenderer[] = [
  "svg",
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];
const drawn = reactive<Partial<Record<IconRenderer, IconRendererKind>>>({});
<\/script>

<template>
  <HStack :gap="5" wrap>
    <VStack
      v-for="renderer in RENDERERS"
      :key="renderer"
      :gap="1"
      align="center"
    >
      <Icon
        :icon="settingsIcon"
        :size="40"
        color="var(--primary-color)"
        :renderer="renderer"
        @renderer-change="(kind: IconRendererKind) => (drawn[renderer] = kind)"
      />
      <code>{{ renderer }}</code>
      <small>{{ renderer === "svg" ? "SVG" : (drawn[renderer] ?? "…") }}</small>
    </VStack>
  </HStack>
</template>
`})))()}n();export{t as default};