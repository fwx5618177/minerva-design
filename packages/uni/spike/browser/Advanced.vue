<script setup lang="ts">
import { ref } from "vue";
import {
  ThemeProvider,
  Drawer,
  VirtualList,
  Alert,
  Switch,
  RadioGroup,
  Radio,
  JsonField,
  IconButton,
  CommandDialog,
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from "../../src";
const checked = ref(false);
const radios = ref<string | number>(0);
const rows = Array.from({ length: 100 }, (_, id) => ({
  id,
  label: `Advanced row ${id}`,
}));
</script>
<template>
  <ThemeProvider default-theme="light" disable-storage
    ><view class="advanced-harness">
      <Drawer side="bottom" size="small" title="Advanced details"
        ><template #trigger>Open advanced drawer</template>Drawer
        content</Drawer
      >
      <VirtualList
        data-testid="advanced-virtual"
        :items="rows"
        :item-height="40"
        :max-height="120"
        :overscan="0"
        ><template #default="{ item }">{{ item.label }}</template></VirtualList
      >
      <Alert
        color="warning"
        variant="outline"
        title="Advanced warning"
        collapsible
        data-testid="advanced-alert"
        >Important information</Alert
      >
      <Switch
        v-model:checked="checked"
        size="large"
        shape="square"
        color="success"
        label="Advanced power"
      /><RadioGroup
        v-model="radios"
        label="Advanced plans"
        size="large"
        color="warning"
        ><Radio :value="0" label="Starter" /><Radio
          :value="1"
          label="Professional"
      /></RadioGroup>
      <JsonField
        default-value='{"big":9007199254740993,"big":1e+9}'
        :indent="4"
        aria-label="Advanced JSON"
      />
      <IconButton
        label="Advanced favorite"
        :default-pressed="false"
        icon="★"
        size="large"
        color="danger"
        variant="outline"
      />
      <CommandDialog
        :items="[
          { id: 'one', title: 'Advanced first' },
          { id: 'two', title: 'Advanced second' },
        ]"
        shortcut="ctrl+j"
      />
      <Tabs orientation="vertical" variant="pills" color="success"
        ><TabList label="Advanced tabs"
          ><Tab value="one">Advanced tab one</Tab
          ><Tab value="two" color="danger">Advanced tab two</Tab></TabList
        ><TabPanel value="one">Advanced panel one</TabPanel
        ><TabPanel value="two">Advanced panel two</TabPanel></Tabs
      >
    </view></ThemeProvider
  >
</template>
<style>
.advanced-harness {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
}
.advanced-harness .mn-uni-virtual-list {
  width: 300px;
}
.advanced-harness .mn-json-field {
  width: 500px;
  max-width: 100%;
}
</style>
