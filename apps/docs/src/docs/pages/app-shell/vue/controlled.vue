<script setup lang="ts">
import { ref } from "vue";
import {
  AppShell,
  NavTree,
  Page,
  PageHeader,
  PageSection,
  Button,
  VStack,
} from "minerva-design/vue";
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
const mode = ref<"expanded" | "compact" | "floating">("expanded");
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Button @click="mode = mode === 'expanded' ? 'compact' : 'expanded'"
      >Toggle sidebar: {{ mode }}</Button
    ><AppShell
      brand="Minerva"
      v-model:sidebar-mode="mode"
      style="height: 440px; min-height: 0"
      :navigation-key="active"
      ><template #navigation="{ collapsed, closeNavigation }"
        ><NavTree
          :sections="sections"
          :active-id="active"
          :collapsed="collapsed"
          @item-select="
            (item) => {
              active = item.id;
              closeNavigation();
            }
          " /></template
      ><Page
        ><PageHeader
          :title="active"
          description="Your team workspace"
        /><PageSection title="Overview"
          ><p>Choose an item in the navigation.</p></PageSection
        ></Page
      ></AppShell
    ></VStack
  >
</template>
