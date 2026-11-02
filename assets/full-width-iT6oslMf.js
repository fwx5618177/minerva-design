import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { SegmentedControl, VStack } from "minerva-design/vue";
<\/script>
<template>
  <VStack :gap="3" align="stretch" style="max-width: 420px"
    ><SegmentedControl
      full-width
      name="billing"
      aria-label="Billing period"
      default-value="yearly"
      :options="[
        { value: 'monthly', label: 'Monthly' },
        { value: 'yearly', label: 'Yearly (−20%)' },
      ]" /><SegmentedControl
      full-width
      aria-label="Status filter"
      default-value="all"
      :options="['all', 'open', 'closed', 'archived']"
  /></VStack>
</template>
`})))()}n();export{t as default};