// Registers <minerva-list> and <minerva-list-item>.
import { MinervaList, MinervaListItem } from "../components/list/list";
import { defineElement } from "../internal/define";

defineElement(MinervaList);
defineElement(MinervaListItem);

export * from "../components/list/list";
