// Registers <minerva-menu>, <minerva-context-menu> and the menu entry elements.
import {
  MinervaContextMenu,
  LONG_PRESS_DELAY,
} from "../components/menu/context-menu";
import { MinervaMenu } from "../components/menu/menu";
import { defineElement } from "../internal/define";

defineElement(MinervaMenu);
defineElement(MinervaContextMenu);

export * from "../components/menu/menu";
export { MinervaContextMenu, LONG_PRESS_DELAY };
