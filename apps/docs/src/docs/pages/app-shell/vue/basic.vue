<script setup lang="ts">
import { ref } from "vue";
import {
  AppShell,
  NavTree,
  Page,
  PageHeader,
  PageSection,
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
</script>
<template>
  <AppShell
    brand="Minerva"
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
  >
</template>
