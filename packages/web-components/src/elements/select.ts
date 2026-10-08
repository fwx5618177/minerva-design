// Registers <minerva-select> and its parts (<minerva-option>,
// <minerva-option-group>, <minerva-select-label>, <minerva-select-separator>).
import {
  MinervaOption,
  MinervaOptionGroup,
  MinervaSelectLabel,
  MinervaSelectSeparator,
} from "../components/select/option";
import { MinervaSelect } from "../components/select/select";
import { defineElement } from "../internal/define";

defineElement(MinervaOption);
defineElement(MinervaOptionGroup);
defineElement(MinervaSelectLabel);
defineElement(MinervaSelectSeparator);
defineElement(MinervaSelect);

export * from "../components/select/option";
export * from "../components/select/select";
