<script setup lang="ts">
import { ref } from "vue";
import { NavTree, Button, VStack } from "minerva-design/vue";
const active = ref("overview");
const sections = [
  {
    id: "workspace",
    title: "Workspace",
    items: [
      { id: "overview", label: "Overview", href: "#overview" },
      {
        id: "projects",
        label: "Projects",
        children: [
          { id: "design", label: "Design", href: "#design" },
          { id: "web", label: "Website", href: "#web" },
        ],
      },
      { id: "settings", label: "Settings", href: "#settings" },
    ],
  },
];
const collapsed = ref(true);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Button @click="collapsed = !collapsed">{{
      collapsed ? "Expand navigation" : "Collapse navigation"
    }}</Button
    ><NavTree
      :sections="sections"
      :active-id="active"
      :collapsed="collapsed"
      @item-select="(item) => (active = item.id)"
      aria-label="Compact navigation"
  /></VStack>
</template>
