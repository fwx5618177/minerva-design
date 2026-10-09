<script setup lang="ts">
import { Radio, RadioGroup, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="start"
    ><RadioGroup
      name="partly-disabled"
      label="Partly disabled"
      default-value="a"
      direction="horizontal"
      ><Radio value="a" label="Available" /><Radio
        value="b"
        label="Sold out"
        disabled /></RadioGroup
    ><RadioGroup
      name="all-disabled"
      label="Disabled group"
      default-value="a"
      direction="horizontal"
      disabled
      ><Radio value="a" label="Option A" /><Radio
        value="b"
        label="Option B" /></RadioGroup
  ></VStack>
</template>
