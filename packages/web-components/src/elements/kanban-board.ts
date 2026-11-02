// Registers <minerva-kanban-board> and <minerva-kanban-column>.
import {
  MinervaKanbanBoard,
  MinervaKanbanColumn,
} from "../components/kanban-board/kanban-board";
import { defineElement } from "../internal/define";

defineElement(MinervaKanbanBoard);
defineElement(MinervaKanbanColumn);

export * from "../components/kanban-board/kanban-board";
