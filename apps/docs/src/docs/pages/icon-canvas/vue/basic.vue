<script setup lang="ts">
// One canvas, one GPU draw per run of identical icons; positions in CSS px.
// The backend follows the global default (setDefaultIconRenderer).
import { ref } from "vue";
import { VStack } from "minerva-design/vue";
import {
  IconCanvas,
  bellIcon,
  homeIcon,
  mailIcon,
  searchIcon,
  settingsIcon,
  userIcon,
  type IconCanvasItem,
  type IconRendererKind,
} from "minerva-design/vue/icons";

const ICONS = [
  homeIcon,
  searchIcon,
  mailIcon,
  bellIcon,
  userIcon,
  settingsIcon,
];
const items: IconCanvasItem[] = [
  ...ICONS.map((icon, i) => ({ icon, x: 16 + i * 48, y: 16 })),
  ...ICONS.map((icon, i) => ({
    icon,
    x: 16 + i * 48,
    y: 64,
    size: 32,
    color: "var(--primary-color)",
    rotation: i * 15,
  })),
  ...ICONS.map((icon, i) => ({
    icon,
    x: 16 + i * 48,
    y: 112,
    strokeWidth: 1.5,
    opacity: 0.35 + i * 0.13,
  })),
];
const drawn = ref<IconRendererKind | null>(null);
</script>

<template>
  <VStack :gap="2">
    <IconCanvas
      :items="items"
      :height="160"
      title="Six icons, three ways"
      @renderer-change="(kind: IconRendererKind) => (drawn = kind)"
    />
    <small role="status">{{ drawn ? `Drawn with ${drawn}` : "…" }}</small>
  </VStack>
</template>
