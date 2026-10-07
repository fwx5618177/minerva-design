// Registers <minerva-responsive-grid> and <minerva-grid-item>.
import {
  MinervaGridItem,
  MinervaResponsiveGrid,
} from "../components/responsive-grid/responsive-grid";
import { defineElement } from "../internal/define";

defineElement(MinervaResponsiveGrid);
defineElement(MinervaGridItem);

export * from "../components/responsive-grid/responsive-grid";
