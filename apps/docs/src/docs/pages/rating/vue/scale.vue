<script setup lang="ts">
import { ref } from "vue";
import { RatingScale } from "minerva-design/vue";
const dimensions = ref([
  { key: "quality", label: "Quality", value: 8 },
  { key: "speed", label: "Speed", value: 6 },
  { key: "support", label: "Support", value: 9 },
]);
</script>
<template>
  <RatingScale
    :dimensions="dimensions"
    @change="
      (key, value) => {
        dimensions = dimensions.map((item) =>
          item.key === key ? { ...item, value } : item,
        );
      }
    "
  />
</template>
