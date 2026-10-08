// Registers <minerva-tabs>, <minerva-tab> and <minerva-tab-panel>.
import {
  MinervaTab,
  MinervaTabPanel,
  MinervaTabs,
} from "../components/tabs/tabs";
import { defineElement } from "../internal/define";
defineElement(MinervaTabs);
defineElement(MinervaTab);
defineElement(MinervaTabPanel);
export * from "../components/tabs/tabs";
