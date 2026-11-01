<script setup lang="ts">
import { ref } from "vue";
import { Button, HStack, ProgressIndicator, VStack } from "minerva-design/vue";

const lessons = ref(2);
const format = (value: number, max: number) => `${value} / ${max}`;
</script>
<template>
  <VStack :gap="4" align="stretch">
    <ProgressIndicator
      variant="bar"
      full
      :value="lessons"
      :max="5"
      show-value
      :format="format"
      label="Lessons completed"
    />
    <HStack :gap="4" wrap align="center">
      <ProgressIndicator
        variant="circle"
        size="xlarge"
        :value="(lessons / 5) * 100"
        show-value
        aria-label="Course progress"
      />
      <ProgressIndicator
        variant="bar"
        color="success"
        :value="100"
        show-value
        aria-label="Done"
      />
      <ProgressIndicator
        variant="bar"
        color="danger"
        :value="15"
        show-value
        aria-label="Overdue"
      />
    </HStack>
    <HStack :gap="2">
      <Button
        size="small"
        variant="outline"
        :disabled="lessons === 0"
        @click="lessons = Math.max(0, lessons - 1)"
        >Undo lesson</Button
      >
      <Button
        size="small"
        :disabled="lessons === 5"
        @click="lessons = Math.min(5, lessons + 1)"
        >Complete lesson</Button
      >
    </HStack>
  </VStack>
</template>
