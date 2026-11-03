// Registers <minerva-dashboard-columns>, <minerva-dashboard-column> and
// <minerva-dashboard-card>.
import {
  MinervaDashboardColumns,
  MinervaDashboardCard,
  MinervaDashboardColumn,
} from "../components/dashboard-columns/dashboard-columns";
import { defineElement } from "../internal/define";

defineElement(MinervaDashboardColumns);
defineElement(MinervaDashboardColumn);
defineElement(MinervaDashboardCard);

export * from "../components/dashboard-columns/dashboard-columns";
