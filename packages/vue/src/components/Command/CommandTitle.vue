<script setup lang="ts">
/** Title row of CommandDialog (`aria-labelledby`); internal. */
import modalStyles from "@react-styles/components/Modal/modal.module.scss";
import styles from "@react-styles/components/Command/command.module.scss";
import { useDialogText } from "../../internal/dialog";
import { hooks } from "../../internal/hooks";

defineOptions({ name: "CommandTitle" });
defineSlots<{ default?: () => unknown }>();
const id = useDialogText("title", "CommandTitle");
</script>

<template>
  <div
    :id="id"
    :class="[modalStyles.header, styles.header]"
    v-bind="hooks('command-dialog', 'header')"
  >
    <slot />
  </div>
</template>
