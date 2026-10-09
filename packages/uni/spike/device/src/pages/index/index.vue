<script setup lang="ts">
import { ref } from "vue";
import Button from "../../minerva/src/Button.vue";
import Tabs from "../../minerva/src/Tabs.vue";
import TabList from "../../minerva/src/TabList.vue";
import Tab from "../../minerva/src/Tab.vue";
import TabPanel from "../../minerva/src/TabPanel.vue";
import HtmlPreview from "../../minerva/src/HtmlPreview.vue";
const count = ref(0);
</script>
<template>
  <view
    ><Button @click="count++">Increment</Button><text>{{ count }}</text
    ><Tabs default-value="one"
      ><TabList><Tab value="one">One</Tab><Tab value="two">Two</Tab></TabList
      ><TabPanel value="one">First</TabPanel
      ><TabPanel value="two">Second</TabPanel></Tabs
    ><HtmlPreview html="<p>Native rich text</p>"
  /></view>
</template>
