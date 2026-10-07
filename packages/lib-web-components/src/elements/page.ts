// Registers <minerva-page>, <minerva-page-header>, <minerva-page-section>,
// <minerva-stat-card> and <minerva-toolbar>.
import {
  MinervaPage,
  MinervaPageHeader,
  MinervaPageSection,
  MinervaStatCard,
  MinervaToolbar,
} from "../components/page/page";
import { defineElement } from "../internal/define";

defineElement(MinervaPage);
defineElement(MinervaPageHeader);
defineElement(MinervaPageSection);
defineElement(MinervaStatCard);
defineElement(MinervaToolbar);

export * from "../components/page/page";
