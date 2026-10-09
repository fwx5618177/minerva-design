<script setup lang="ts">
/** Title of the AppShell drawer: names the dialog (internal). */
import { useDialogText } from "../../internal/dialog";

defineOptions({ name: "AppShellDrawerTitle" });
defineSlots<{ default?: () => unknown }>();
const id = useDialogText("title", "AppShellDrawerTitle");
</script>

<template>
  <h2 :id="id"><slot /></h2>
</template>
