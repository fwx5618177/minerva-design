// Registers <minerva-stack>, <minerva-hstack> and <minerva-vstack>.
import {
  MinervaHStack,
  MinervaStack,
  MinervaVStack,
} from "../components/stack/stack";
import { defineElement } from "../internal/define";

defineElement(MinervaStack);
defineElement(MinervaHStack);
defineElement(MinervaVStack);

export * from "../components/stack/stack";
