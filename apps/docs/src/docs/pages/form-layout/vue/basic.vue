<script setup lang="ts">
import { FormLayout, FormField, Input } from "minerva-design/vue";
</script>
<template>
  <FormLayout :columns="{ base: 1, sm: 2 }" :gap="4"
    ><FormField label="First name"><Input /></FormField
    ><FormField label="Last name"><Input /></FormField
    ><FormField label="Email"><Input type="email" /></FormField
    ><FormField label="Company"><Input /></FormField
  ></FormLayout>
</template>
