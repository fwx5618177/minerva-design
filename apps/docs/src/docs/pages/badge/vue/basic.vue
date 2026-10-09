<script setup lang="ts">
import { Badge, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="4" align="center" wrap
    ><Badge :content="5" aria-label="5 unread notifications"
      ><span aria-label="Notifications" style="font-size: 24px">♧</span></Badge
    ><Badge content="99+" aria-label="More than 99 messages"
      ><span aria-label="Messages" style="font-size: 24px">✉</span></Badge
    ><span
      >Inbox <Badge :content="12" color="info" aria-label="12 unread" /> and
      changelog <Badge color="success">New</Badge></span
    ></HStack
  >
</template>
