import {
  DashboardColumns,
  DashboardCard,
  DashboardColumn,
  type DashboardColumnsProps,
  type DashboardCardMove,
  type DashboardCardProps,
  type DashboardColumnColor,
  type DashboardColumnProps,
} from "./DashboardColumns";

export {
  DashboardColumns,
  DashboardCard,
  DashboardColumn,
  type DashboardColumnsProps,
  type DashboardCardMove,
  type DashboardCardProps,
  type DashboardColumnColor,
  type DashboardColumnProps,
};

// Deprecated aliases (the component was called KanbanBoard), not documented.
/** @deprecated Use `DashboardColumns` */
export const KanbanBoard = DashboardColumns;
/** @deprecated Use `DashboardColumn` */
export const KanbanColumn = DashboardColumn;
/** @deprecated Use `DashboardCard` */
export const KanbanCard = DashboardCard;
/** @deprecated Use `DashboardColumnsProps` */
export type KanbanBoardProps = DashboardColumnsProps;
/** @deprecated Use `DashboardColumnProps` */
export type KanbanColumnProps = DashboardColumnProps;
/** @deprecated Use `DashboardCardProps` */
export type KanbanCardProps = DashboardCardProps;
/** @deprecated Use `DashboardCardMove` */
export type KanbanCardMove = DashboardCardMove;
/** @deprecated Use `DashboardColumnColor` */
export type KanbanColumnColor = DashboardColumnColor;
