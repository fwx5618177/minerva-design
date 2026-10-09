<script setup lang="ts">
import {
  Select,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "minerva-design/vue";
</script>
<template>
  <Select aria-label="Technology"
    ><SelectGroup
      ><SelectLabel>Frontend</SelectLabel
      ><SelectItem value="vue">Vue</SelectItem
      ><SelectItem value="react">React</SelectItem></SelectGroup
    ><SelectSeparator /><SelectGroup
      ><SelectLabel>Backend</SelectLabel
      ><SelectItem value="node">Node.js</SelectItem
      ><SelectItem value="python">Python</SelectItem></SelectGroup
    ></Select
  >
</template>
