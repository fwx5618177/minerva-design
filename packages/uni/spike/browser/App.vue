<script setup lang="ts">
import Overlays from "./Overlays.vue";
import Advanced from "./Advanced.vue";
import Primitives from "./Primitives.vue";
import { ref } from "vue";
const activePage = ref("file-0");
import {
  TimePicker,
  PageTabs,
  PageTab,
  Popover,
  PopoverTrigger,
  PopoverContent,
  ThemeProvider,
  ThemeToggle,
  Avatar,
  Badge,
  Card,
  Tag,
  ProgressIndicator,
  ResponsiveGrid,
  SplitLayout,
  Box,
  AppShell,
  Pagination,
} from "../../src";
</script>
<template>
  <Overlays />
  <Primitives />
  <Advanced />
  <ThemeProvider default-theme="light" disable-storage
    ><ThemeToggle /><view class="samples">
      <Avatar name="Ada Lovelace" size="large" data-testid="avatar" />
      <Badge color="success" variant="outline" size="large">Ready</Badge>
      <Card variant="elevated" padding="large" data-testid="card">Project</Card>
      <Tag
        color="danger"
        variant="outline"
        size="large"
        clickable
        pressed
        closable
        >Important</Tag
      >
      <ProgressIndicator variant="circle" :value="45" label="Uploading" />
      <ProgressIndicator label="Loading" />
      <Box :p="4" :px="2" pl="12px" data-testid="box">Box</Box>
      <Pagination
        :total="100"
        :default-current="5"
        show-quick-jumper
        show-size-changer
      /> </view
    ><view class="harness-container" style="width: 900px"
      ><ResponsiveGrid :columns="{ base: 1, sm: 2, lg: 4 }" :gap="4"
        ><view>A</view><view>B</view><view>C</view
        ><view>D</view></ResponsiveGrid
      ><SplitLayout :aside-width="300"
        ><view>Main</view
        ><template #aside><view>Aside</view></template></SplitLayout
      ></view
    ></ThemeProvider
  >
  <view style="width: 300px; margin: 20px" data-pages
    ><PageTabs :active-value="activePage" aria-label="Open files"
      ><PageTab
        v-for="n in 12"
        :key="n"
        :value="`file-${n - 1}`"
        :label="`Document ${n}`"
        @select="activePage = `file-${n - 1}`" /></PageTabs
    ><button data-last-page @tap="activePage = 'file-11'">
      Last page
    </button></view
  >
  <view style="margin: 20px"
    ><TimePicker
      :default-value="new Date(2026, 9, 9, 9, 15, 20)"
      :minute-step="15"
      :second-step="10"
  /></view>
  <view style="position: fixed; bottom: 10px; right: 10px; z-index: 30"
    ><Popover
      ><PopoverTrigger>Show anchored details</PopoverTrigger
      ><PopoverContent :side-offset="6" match-anchor-width="exact" arrow
        ><view style="height: 100px">Anchored details</view></PopoverContent
      ></Popover
    ></view
  >
  <AppShell brand="Studio"
    ><template #navigation="state"
      ><view data-navigation
        >{{ state.collapsed ? "Compact" : "Full" }} navigation</view
      ></template
    ><view>Main content</view></AppShell
  >
</template>
<style>
.samples {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  padding: 20px;
}
.harness-container {
  padding: 0;
  margin: 20px;
}
body {
  margin: 0;
}
</style>
