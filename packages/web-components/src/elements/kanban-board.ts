// Registers <minerva-kanban-board>, <minerva-kanban-column> and
// <minerva-kanban-card>.
import {
  MinervaKanbanBoard,
  MinervaKanbanCard,
  MinervaKanbanColumn,
} from "../components/kanban-board/kanban-board";
import { defineElement } from "../internal/define";

defineElement(MinervaKanbanBoard);
defineElement(MinervaKanbanColumn);
defineElement(MinervaKanbanCard);

export * from "../components/kanban-board/kanban-board";
