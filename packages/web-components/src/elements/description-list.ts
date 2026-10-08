// Registers <minerva-description-list> and <minerva-description-item>.
import {
  MinervaDescriptionItem,
  MinervaDescriptionList,
} from "../components/description-list/description-list";
import { defineElement } from "../internal/define";

defineElement(MinervaDescriptionList);
defineElement(MinervaDescriptionItem);

export * from "../components/description-list/description-list";
