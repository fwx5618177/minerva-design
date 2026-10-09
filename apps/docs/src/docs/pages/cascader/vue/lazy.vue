<script setup lang="ts">
import { ref } from "vue";
import { Cascader } from "minerva-design/vue";
import type { CascaderOption } from "minerva-design/vue";
const options = ref<CascaderOption[]>([{ value: "eu", label: "Europe" }]);
async function load(path: CascaderOption[]) {
  const item = path[path.length - 1]!;
  item.loading = true;
  await new Promise((resolve) => setTimeout(resolve, 400));
  item.children = [
    { value: "fr", label: "France", isLeaf: true },
    { value: "de", label: "Germany", isLeaf: true },
  ];
  item.loading = false;
}
</script>
<template>
  <Cascader
    :options="options"
    label="Lazy locations"
    name="lazy-location"
    :load-data="load"
  />
</template>
