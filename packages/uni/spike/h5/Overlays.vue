<script setup lang="ts">
import { ref } from "vue";
import { ThemeProvider, Modal, Menu, AutoComplete, Rating } from "../../src";
const rating = ref(4);
</script>
<template>
  <ThemeProvider default-theme="light" disable-storage
    ><view class="overlay-harness"
      ><Modal size="xlarge" title="Measured modal"
        ><template #trigger>Open measured modal</template>Modal body</Modal
      ><Menu
        dir="rtl"
        :items="[
          {
            key: 'branch',
            label: 'Branch',
            children: [
              { key: 'child', label: 'Leaf' },
              { key: 'other', label: 'Other leaf' },
            ],
          },
        ]"
        ><template #trigger><button>Open RTL menu</button></template></Menu
      ><Rating
        :value="rating"
        @change="rating = $event"
        size="large"
        aria-label="Measured rating" /><view
        style="
          position: fixed;
          bottom: 12px;
          left: 320px;
          width: 250px;
          z-index: 3;
        "
        ><AutoComplete
          label="Measured completion"
          :options="[
            { value: 'alpha', label: 'Alpha' },
            { value: 'beta', label: 'Beta' },
          ]" /></view></view
  ></ThemeProvider>
</template>
