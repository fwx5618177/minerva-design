<script setup lang="ts">
import { Radio, RadioGroup } from "minerva-design/vue";
</script>
<template>
  <RadioGroup name="fruit" label="Favourite fruit" default-value="apple"
    ><Radio value="apple" label="Apple" /><Radio
      value="banana"
      label="Banana" /><Radio value="cherry" label="Cherry"
  /></RadioGroup>
</template>
