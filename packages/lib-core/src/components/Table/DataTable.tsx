import { LuRefreshCw } from "react-icons/lu";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import Button from "../Button/Button";
import Pagination from "../Pagination/Pagination";
import { Table } from "./Table";
import type { DataTableProps } from "./types";
import styles from "./table.module.scss";

/**
 * DataTable: a `Table` with optional pagination and an error state with a
 * retry action. While loading it shows skeleton rows (even if `error` is set)
 * and marks itself busy.
 */
export function DataTable<T>({
  pagination,
  error,
  onRetry,
  retryLabel,
  loading,
  ...props
}: DataTableProps<T>) {
  const { t } = useI18n();
  const showError = Boolean(error) && !loading;

  return (
    <div
      className={cn(styles.dataTable, "ui-data-table")}
      aria-busy={loading || undefined}
    >
      {showError ? (
        <div className={cn(styles.error, "ui-empty-state")} role="alert">
          <div className={cn(styles.errorTitle, "ui-empty-state-title")}>
            {error}
          </div>
          {onRetry && (
            <div className="ui-empty-state-actions">
              <Button variant="secondary" size="small" onClick={onRetry}>
                <LuRefreshCw aria-hidden="true" className={styles.retryIcon} />
                {retryLabel ?? t("table.retry")}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <>
          <Table {...props} loading={loading} />
          {pagination && <Pagination {...pagination} />}
        </>
      )}
    </div>
  );
}
