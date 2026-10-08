<script setup lang="ts">
/** One star of a Rating (full, half or empty). */
import type { RatingStarFill } from "@minerva/core";
import styles from "@react-styles/components/Rating/rating.module.scss";
import { hooks } from "../../internal/hooks";
import { IconStar, IconStarHalf } from "../../internal/icons";

defineOptions({ name: "RatingStar" });
defineProps<{ fill: RatingStarFill; size: number }>();
</script>

<template>
  <!-- Empty outline with the filled left half drawn on top. -->
  <span
    v-if="fill === 'half'"
    :class="[styles.star, styles[fill]]"
    :style="{ width: `${size}px`, height: `${size}px` }"
    v-bind="hooks('rating', 'star', { fill })"
  >
    <IconStar :size="size" stroke-width="1.5" :class="styles.halfBase" />
    <IconStarHalf
      :size="size"
      fill="currentColor"
      stroke-width="1.5"
      :class="styles.halfFill"
    />
  </span>
  <IconStar
    v-else
    :size="size"
    :class="[styles.star, styles[fill]]"
    :fill="fill === 'full' ? 'currentColor' : 'none'"
    stroke-width="1.5"
    v-bind="hooks('rating', 'star', { fill })"
  />
</template>
