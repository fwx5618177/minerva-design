<script setup lang="ts">
import { defineComponent, h } from "vue";
import {
  Button,
  HStack,
  PaletteToggle,
  Switch,
  Tag,
  ThemeProvider,
  ThemeToggle,
  useTheme,
} from "minerva-design/vue";
const Preview = defineComponent({
  setup() {
    const theme = useTheme();
    return () =>
      h(
        "div",
        {
          style: {
            display: "grid",
            gap: "16px",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
            background: "var(--background-color)",
            color: "var(--text-color)",
          },
        },
        [
          h(HStack, { gap: 4, wrap: true }, () => [
            h(ThemeToggle),
            h(PaletteToggle),
          ]),
          h(HStack, { gap: 4, wrap: true }, () => [
            h(Button, { color: "primary" }, () => "Primary"),
            h(
              Button,
              { color: "neutral", variant: "outline" },
              () => "Secondary",
            ),
            h(Tag, { color: "primary" }, () => theme.palette ?? "default"),
            h(Tag, { color: "info" }, () => theme.resolvedTheme),
            h(Switch, { label: "Switch", defaultChecked: true }),
          ]),
          h(
            "p",
            `Theme: ${theme.resolvedTheme}; palette: ${theme.palette ?? "default"}`,
          ),
        ],
      );
  },
});
</script>
<template>
  <ThemeProvider default-theme="system" default-palette="editorial"
    ><Preview
  /></ThemeProvider>
</template>
