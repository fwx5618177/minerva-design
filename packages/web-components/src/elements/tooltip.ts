// Registers <minerva-tooltip> and <minerva-tooltip-provider>.
import {
  MinervaTooltip,
  MinervaTooltipProvider,
} from "../components/tooltip/tooltip";
import { defineElement } from "../internal/define";

defineElement(MinervaTooltipProvider);
defineElement(MinervaTooltip);

export * from "../components/tooltip/tooltip";
