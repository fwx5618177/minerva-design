<script setup lang="ts">
import { ref } from "vue";
import {
  Page,
  PageHeader,
  PageSection,
  Toolbar,
  Button,
  Input,
} from "minerva-design/vue";
const query = ref("");
const invited = ref(0);
</script>
<template>
  <Page
    ><PageHeader title="Members"
      ><template #actions
        ><Button @click="invited++">Invite member</Button></template
      ></PageHeader
    ><Toolbar wrap
      ><Input
        v-model="query"
        aria-label="Search members"
        placeholder="Search members"
      /><output
        >{{ invited }} invitations · {{ query || "All members" }}</output
      ></Toolbar
    ><PageSection title="Directory"
      ><p>Search and manage your members.</p></PageSection
    ></Page
  >
</template>
