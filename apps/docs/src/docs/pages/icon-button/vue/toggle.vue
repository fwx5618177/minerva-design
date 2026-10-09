<script setup lang="ts">
import { ref } from "vue";
import { HStack, IconButton } from "minerva-design/vue";
const liked = ref(false);
</script>
<template>
  <HStack :gap="3" align="center" wrap
    ><IconButton v-model:pressed="liked" label="Like" color="danger"
      ><template #icon>♥</template></IconButton
    ><span>{{ liked ? "Liked" : "Not liked yet" }}</span
    ><IconButton label="Bookmark" default-pressed
      ><template #icon>◆</template></IconButton
    ><IconButton label="Mute" shape="square" :default-pressed="false"
      ><template #icon>♩</template></IconButton
    ></HStack
  >
</template>
