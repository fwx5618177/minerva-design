<script setup lang="ts">
import { ref } from "vue";
import Dialogs from "./Dialogs.vue";
import {
  ConfigProvider,
  Divider,
  CodeBlock,
  Empty,
  Skeleton,
  SkeletonText,
  Textarea,
  List,
  ListItem,
  DescriptionList,
  Button,
} from "../../src";
const loading = ref(true);
const lines = "alpha\n".repeat(20);
</script>
<template>
  <ConfigProvider
    ><view
      data-testid="primitives"
      style="
        position: relative;
        z-index: 2;
        background: var(--surface-color);
        padding: 20px;
        max-width: 600px;
      "
    >
      <Divider
        variant="dashed"
        :thickness="3"
        :spacing="0"
        :length="180"
        text-align="left"
        data-testid="divider"
        >Section</Divider
      >
      <view style="display: flex; height: 70px"
        ><Divider
          orientation="vertical"
          flex-item
          :spacing="2"
          data-testid="vertical-divider"
      /></view>
      <CodeBlock
        :code="lines"
        :max-height="64"
        :wrap="false"
        aria-label="Payload"
        data-testid="code-block" />
      <Empty
        size="small"
        title="No records"
        :description="null"
        :width="220"
        show-shadow
        :icon="null"
        data-testid="empty"
        ><template #action><Button>Create</Button></template></Empty
      >
      <Empty
        use-svg
        size="small"
        title="Illustration"
        data-testid="empty-svg" />
      <Skeleton
        variant="card"
        title
        paragraph
        avatar
        :avatar-size="52"
        animation="false"
        :loading="loading"
        data-testid="skeleton"
        >Ready</Skeleton
      >
      <SkeletonText :lines="3" animation="wave" data-testid="skeleton-text" />
      <Button @click="loading = false">Finish loading</Button>
      <Textarea
        value="locked"
        aria-label="Locked notes"
        size="large"
        variant="filled" />
      <Textarea default-value="old" aria-label="Local notes" size="small" />
      <List density="compact" bordered
        ><ListItem primary="Project" :secondary="0" /><ListItem primary="Next"
      /></List>
      <DescriptionList
        :items="[
          { key: 'count', label: 'Items', value: 0 },
          { key: 'name', label: 'Name', value: 'Ada' },
        ]"
        bordered
        striped
        data-testid="descriptions" />
      <Dialogs /></view
  ></ConfigProvider>
</template>
