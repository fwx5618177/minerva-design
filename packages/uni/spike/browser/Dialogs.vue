<script setup lang="ts">
import { ref } from "vue";
import { ContextMenu, ConfirmDialog, Button } from "../../src";
const open = ref(false),
  saved = ref(false),
  selection = ref("");
const confirm = () =>
  new Promise<void>((resolve) =>
    setTimeout(() => {
      saved.value = true;
      open.value = false;
      resolve();
    }, 300),
  );
</script>
<template>
  <view data-testid="dialog-examples">
    <ContextMenu
      :items="[
        { value: 'edit', label: 'Edit record' },
        { value: 'remove', label: 'Remove record' },
      ]"
      size="small"
      aria-label="Record actions"
      @select="selection = $event.value ?? ''"
      ><Button>Record area</Button></ContextMenu
    >
    <view role="status">{{ selection }}</view>
    <Button @click="open = true">Delete record</Button>
    <ConfirmDialog
      :open="open"
      title="Delete record permanently?"
      description="This cannot be undone"
      color="danger"
      close-label="Dismiss confirmation"
      :on-confirm="confirm"
      @open-change="open = $event"
    />
    <view role="status">{{ saved ? "Record deleted" : "" }}</view>
  </view>
</template>
