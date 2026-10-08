// Registers <minerva-skeleton> and <minerva-skeleton-text>.
import {
  MinervaSkeleton,
  MinervaSkeletonText,
} from "../components/skeleton/skeleton";
import { defineElement } from "../internal/define";

defineElement(MinervaSkeleton);
defineElement(MinervaSkeletonText);

export * from "../components/skeleton/skeleton";
