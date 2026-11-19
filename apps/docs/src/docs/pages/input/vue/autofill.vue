<script setup lang="ts">
import { Input, FormField, Button, VStack } from "minerva-design/vue";
</script>
<template>
  <form @submit.prevent>
    <VStack :gap="3" align="stretch">
      <FormField label="Username" required>
        <Input name="username" autocomplete="username" required>
          <template #prefix><span aria-hidden="true">@</span></template>
        </Input>
      </FormField>
      <FormField label="Password" required>
        <Input
          name="password"
          type="password"
          autocomplete="current-password"
          required
        >
          <template #prefix><span aria-hidden="true">Key</span></template>
        </Input>
      </FormField>
      <Button type="submit">Try form</Button>
      <output aria-live="polite"
        >Demo only. No credentials are sent and no account is signed in.</output
      >
    </VStack>
  </form>
</template>
