// Registers <minerva-card> and its parts.
import {
  MinervaCard,
  MinervaCardContent,
  MinervaCardDescription,
  MinervaCardFooter,
  MinervaCardHeader,
  MinervaCardTitle,
} from "../components/card/card";
import { defineElement } from "../internal/define";

defineElement(MinervaCard);
defineElement(MinervaCardHeader);
defineElement(MinervaCardTitle);
defineElement(MinervaCardDescription);
defineElement(MinervaCardContent);
defineElement(MinervaCardFooter);

export * from "../components/card/card";
