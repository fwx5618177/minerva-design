<script setup lang="ts">
import { computed, ref } from "vue";
import { Checkbox, VStack } from "minerva-design/vue";
const fruits = ["Apple", "Banana", "Cherry"];
const selected = ref<string[]>(["Apple"]);
const allChecked = computed(() => selected.value.length === fruits.length);
const someChecked = computed(
  () => selected.value.length > 0 && !allChecked.value,
);
function toggle(fruit: string, checked: boolean) {
  selected.value = checked
    ? [...selected.value, fruit]
    : selected.value.filter((f) => f !== fruit);
}
</script>
<template>
  <VStack :gap="2" align="start"
    ><Checkbox
      label="Select all"
      :model-value="allChecked"
      :indeterminate="someChecked"
      @change="selected = $event ? [...fruits] : []" /><VStack
      :gap="2"
      align="start"
      style="padding-left: 24px"
      ><Checkbox
        v-for="fruit in fruits"
        :key="fruit"
        :label="fruit"
        :model-value="selected.includes(fruit)"
        @change="toggle(fruit, $event)" /></VStack
  ></VStack>
</template>
