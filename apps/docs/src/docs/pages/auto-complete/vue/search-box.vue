<script setup lang="ts">
import { ref } from "vue";
import { AutoComplete, type AutoCompleteOption } from "minerva-design/vue";
const query = ref("");
const result = ref("");
const options = [
  { label: "Lord of the Mysteries", value: "1", description: "Cuttlefish" },
  { label: "Sword of Coming", value: "2", description: "Fenghuo" },
  { label: "A Record of a Mortal", value: "3", description: "Wangyu" },
];
</script>
<template>
  <div style="display: grid; gap: 8px">
    <AutoComplete
      v-model="query"
      :options="options"
      auto-highlight
      :fill-on-select="false"
      :input-props="{
        'aria-label': 'Search books',
        placeholder: 'Title or author',
        clearable: true,
      }"
      :filter-option="
        (text, option) =>
          (option.label + option.description)
            .toLowerCase()
            .includes(text.toLowerCase())
      "
      @select="(book) => (result = `Open book #${book.value}`)"
      @submit="(text) => (result = `Search for ${text}`)"
    /><output>{{ result }}</output>
  </div>
</template>
