// Registers <minerva-data-table> (and <minerva-pagination>) and <minerva-table-cell-content>.
import {
  MinervaDataTable,
  MinervaTableCellContent,
} from "../components/data-table/data-table";
import { defineElement } from "../internal/define";
defineElement(MinervaDataTable);
defineElement(MinervaTableCellContent);
export * from "../components/data-table/data-table";
export { computeFixedColumnLayout } from "@minerva/core";
export type { FixedColumnLayout, FixedColumnLike } from "@minerva/core";
