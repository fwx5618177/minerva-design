// Deprecated entry (`minerva-design/web-components/kanban-board`): the
// KanbanBoard elements were renamed DashboardColumns. Registers the new
// elements (see ./dashboard-columns) and keeps the old tags working:
// <minerva-kanban-board>, <minerva-kanban-column> and <minerva-kanban-card>
// are trivial subclasses of the new elements. Not documented; will be removed
// in the next major version.
import {
  MinervaDashboardCard,
  MinervaDashboardColumn,
  MinervaDashboardColumns,
} from "../components/dashboard-columns/dashboard-columns";
import { defineElement } from "../internal/define";
import "./dashboard-columns";

class DeprecatedKanbanBoard extends MinervaDashboardColumns {
  static override tagName = "minerva-kanban-board";
}
class DeprecatedKanbanColumn extends MinervaDashboardColumn {
  static override tagName = "minerva-kanban-column";
}
class DeprecatedKanbanCard extends MinervaDashboardCard {
  static override tagName = "minerva-kanban-card";
}

defineElement(DeprecatedKanbanBoard);
defineElement(DeprecatedKanbanColumn);
defineElement(DeprecatedKanbanCard);

/** @deprecated Use `MinervaDashboardColumns` (`<minerva-dashboard-columns>`) */
export const MinervaKanbanBoard = MinervaDashboardColumns;
/** @deprecated Use `MinervaDashboardColumns` (`<minerva-dashboard-columns>`) */
export type MinervaKanbanBoard = MinervaDashboardColumns;
/** @deprecated Use `MinervaDashboardColumn` (`<minerva-dashboard-column>`) */
export const MinervaKanbanColumn = MinervaDashboardColumn;
/** @deprecated Use `MinervaDashboardColumn` (`<minerva-dashboard-column>`) */
export type MinervaKanbanColumn = MinervaDashboardColumn;
/** @deprecated Use `MinervaDashboardCard` (`<minerva-dashboard-card>`) */
export const MinervaKanbanCard = MinervaDashboardCard;
/** @deprecated Use `MinervaDashboardCard` (`<minerva-dashboard-card>`) */
export type MinervaKanbanCard = MinervaDashboardCard;

declare global {
  interface HTMLElementTagNameMap {
    /** @deprecated Use `<minerva-dashboard-columns>` */
    "minerva-kanban-board": MinervaDashboardColumns;
    /** @deprecated Use `<minerva-dashboard-column>` */
    "minerva-kanban-column": MinervaDashboardColumn;
    /** @deprecated Use `<minerva-dashboard-card>` */
    "minerva-kanban-card": MinervaDashboardCard;
  }
}
