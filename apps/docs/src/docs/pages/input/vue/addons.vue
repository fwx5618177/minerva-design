<script setup lang="ts">
import { Input, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Input aria-label="Website" placeholder="example.com"
      ><template #addon-before>https://</template
      ><template #addon-after>.com</template></Input
    ><Input aria-label="Search" placeholder="Search projects"
      ><template #prefix>⌕</template><template #suffix>⌘K</template></Input
    ></VStack
  >
</template>
